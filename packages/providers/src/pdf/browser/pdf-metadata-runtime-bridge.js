'use strict';

const { types: utilTypes } = require('node:util');
const { composePdfMetadataResult } = require('./pdf-metadata-provider');
const { SUPERVISOR_KIND } = require('./pdf-metadata-runtime-supervisor');

const COMPLETED_ENVELOPE_KEYS = Object.freeze(['kind', 'rawObservation']);
const TERMINAL_ENVELOPE_KEYS = Object.freeze(['kind', 'terminalOutcomeEvidence']);
const TERMINAL_EVIDENCE_KEYS = Object.freeze([
  'schema',
  'terminalOutcome',
  'providerId',
  'providerCapabilityVersion',
  'inputExactBytesDigest',
  'byteLength',
  'resourceBudgetRef',
  'runtimeEvidenceRef',
  'partialOutputDiscarded',
]);

const SUCCESS_METADATA_KEYS = Object.freeze(['openSucceeded', 'metadata']);

const REJECTED_METADATA_KEYS = Object.freeze(['openSucceeded', 'pdfiumLastError']);

const METADATA_FIELD_KEYS = Object.freeze([
  'title',
  'author',
  'subject',
  'keywords',
  'creator',
  'producer',
  'creationDate',
  'modDate',
]);

const PDFIUM_FORMAT_ERROR_CODE = 3;

function isStrictObject(value) {
  if (!value || typeof value !== 'object' || utilTypes.isProxy(value)
      || Array.isArray(value) || Buffer.isBuffer(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function ownData(value, key) {
  if (!isStrictObject(value)) return null;
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, 'value')) return null;
  return descriptor.value;
}

function exactOwnDataKeys(value, expectedKeys) {
  if (!isStrictObject(value)) return false;
  const actualKeys = Reflect.ownKeys(value);
  if (actualKeys.some((key) => typeof key !== 'string')) return false;
  if (actualKeys.length !== expectedKeys.length) return false;
  const expected = new Set(expectedKeys);
  return actualKeys.every((key) => {
    if (!expected.has(key)) return false;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return Boolean(descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value'));
  });
}

function validMetadataValue(value) {
  return value === null || typeof value === 'string';
}

function validateRawObservation(value) {
  if (!isStrictObject(value)) throw new TypeError('supervised raw observation must be a strict plain object');
  const openSucceeded = ownData(value, 'openSucceeded');
  if (openSucceeded === true) {
    if (!exactOwnDataKeys(value, SUCCESS_METADATA_KEYS)) {
      throw new TypeError('supervised successful raw metadata observation has an invalid shape');
    }
    const metadata = ownData(value, 'metadata');
    if (!exactOwnDataKeys(metadata, METADATA_FIELD_KEYS)) {
      throw new TypeError('supervised successful raw metadata observation has invalid metadata fields');
    }
    for (const key of METADATA_FIELD_KEYS) {
      if (!validMetadataValue(ownData(metadata, key))) {
        throw new TypeError('supervised successful raw metadata observation has an invalid metadata value');
      }
    }
    return value;
  }
  if (openSucceeded === false) {
    if (!exactOwnDataKeys(value, REJECTED_METADATA_KEYS)
        || ownData(value, 'pdfiumLastError') !== PDFIUM_FORMAT_ERROR_CODE) {
      throw new TypeError('supervised rejected raw metadata observation has an invalid shape');
    }
    return value;
  }
  throw new TypeError('supervised raw observation must carry own boolean openSucceeded');
}

function validateTerminalEvidenceShape(value) {
  if (!exactOwnDataKeys(value, TERMINAL_EVIDENCE_KEYS)) {
    throw new TypeError('supervised terminal evidence has an invalid shape');
  }
  if (!exactOwnDataKeys(ownData(value, 'inputExactBytesDigest'), ['algorithm', 'value'])) {
    throw new TypeError('supervised terminal evidence digest has an invalid shape');
  }
  return value;
}

function composeSupervisedPdfMetadataResult({
  bytes,
  request,
  availability,
  supervisedResult,
}) {
  if (!Buffer.isBuffer(bytes)) {
    throw new TypeError('bytes must be a Buffer at the PDF metadata read semantic bridge boundary');
  }
  if (!isStrictObject(supervisedResult)) {
    throw new TypeError('supervisedResult must be a strict plain supervisor envelope');
  }

  const kind = ownData(supervisedResult, 'kind');
  if (kind === SUPERVISOR_KIND.RUNTIME_COMPLETED) {
    if (!exactOwnDataKeys(supervisedResult, COMPLETED_ENVELOPE_KEYS)) {
      throw new TypeError('runtime-completed supervisor envelope has an invalid shape');
    }
    const metadataEvidence = validateRawObservation(ownData(supervisedResult, 'rawObservation'));
    return composePdfMetadataResult({
      bytes,
      request,
      availability,
      metadataEvidence,
      terminalOutcomeEvidence: null,
    });
  }

  if (kind === SUPERVISOR_KIND.RUNTIME_TERMINAL) {
    if (!exactOwnDataKeys(supervisedResult, TERMINAL_ENVELOPE_KEYS)) {
      throw new TypeError('runtime-terminal supervisor envelope has an invalid shape');
    }
    const terminalOutcomeEvidence = validateTerminalEvidenceShape(
      ownData(supervisedResult, 'terminalOutcomeEvidence'),
    );
    return composePdfMetadataResult({
      bytes,
      request,
      availability,
      metadataEvidence: null,
      terminalOutcomeEvidence,
    });
  }

  throw new TypeError('supervisedResult contains an unknown supervisor kind');
}

module.exports = Object.freeze({ composeSupervisedPdfMetadataResult });
