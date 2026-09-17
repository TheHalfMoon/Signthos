'use strict';

const { types: utilTypes } = require('node:util');
const { composePdfTextSearchResult } = require('./pdf-text-search-provider');
const { SUPERVISOR_KIND } = require('./pdf-text-search-runtime-supervisor');

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

const SUCCESS_SEARCH_KEYS = Object.freeze([
  'openSucceeded',
  'pageIndex',
  'pageCount',
  'charCount',
  'queryLength',
  'matchCount',
  'matchesTruncated',
  'matches',
]);

const REJECTED_SEARCH_KEYS = Object.freeze(['openSucceeded', 'pdfiumLastError']);

const MATCH_KEYS = Object.freeze(['index', 'length']);

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

function validMatch(value) {
  if (!isStrictObject(value)) return false;
  if (!exactOwnDataKeys(value, MATCH_KEYS)) return false;
  const index = ownData(value, 'index');
  const length = ownData(value, 'length');
  return Number.isSafeInteger(index) && index >= 0
    && Number.isSafeInteger(length) && length >= 1;
}

function validateRawObservation(value) {
  if (!isStrictObject(value)) throw new TypeError('supervised raw observation must be a strict plain object');
  const openSucceeded = ownData(value, 'openSucceeded');
  if (openSucceeded === true) {
    if (!exactOwnDataKeys(value, SUCCESS_SEARCH_KEYS)) {
      throw new TypeError('supervised successful raw text search observation has an invalid shape');
    }
    const pageIndex = ownData(value, 'pageIndex');
    const pageCount = ownData(value, 'pageCount');
    const charCount = ownData(value, 'charCount');
    const queryLength = ownData(value, 'queryLength');
    const matchCount = ownData(value, 'matchCount');
    const matchesTruncated = ownData(value, 'matchesTruncated');
    if (!Number.isSafeInteger(pageIndex) || pageIndex < 0
        || !Number.isSafeInteger(pageCount) || pageCount < 0
        || !Number.isSafeInteger(charCount) || charCount < 0
        || !Number.isSafeInteger(queryLength) || queryLength < 1
        || !Number.isSafeInteger(matchCount) || matchCount < 0) {
      throw new TypeError('supervised successful raw text search observation has invalid search fields');
    }
    if (typeof matchesTruncated !== 'boolean') {
      throw new TypeError('supervised successful raw text search observation has invalid search flags');
    }
    const matches = ownData(value, 'matches');
    if (!Array.isArray(matches) || utilTypes.isProxy(matches) || !matches.every(validMatch)) {
      throw new TypeError('supervised successful raw text search observation has invalid search matches');
    }
    return value;
  }
  if (openSucceeded === false) {
    if (!exactOwnDataKeys(value, REJECTED_SEARCH_KEYS)
        || ownData(value, 'pdfiumLastError') !== PDFIUM_FORMAT_ERROR_CODE) {
      throw new TypeError('supervised rejected raw text search observation has an invalid shape');
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

function composeSupervisedPdfTextSearchResult({
  bytes,
  request,
  availability,
  supervisedResult,
}) {
  if (!Buffer.isBuffer(bytes)) {
    throw new TypeError('bytes must be a Buffer at the PDF text search semantic bridge boundary');
  }
  if (!isStrictObject(supervisedResult)) {
    throw new TypeError('supervisedResult must be a strict plain supervisor envelope');
  }

  const kind = ownData(supervisedResult, 'kind');
  if (kind === SUPERVISOR_KIND.RUNTIME_COMPLETED) {
    if (!exactOwnDataKeys(supervisedResult, COMPLETED_ENVELOPE_KEYS)) {
      throw new TypeError('runtime-completed supervisor envelope has an invalid shape');
    }
    const textEvidence = validateRawObservation(ownData(supervisedResult, 'rawObservation'));
    return composePdfTextSearchResult({
      bytes,
      request,
      availability,
      textEvidence,
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
    return composePdfTextSearchResult({
      bytes,
      request,
      availability,
      textEvidence: null,
      terminalOutcomeEvidence,
    });
  }

  throw new TypeError('supervisedResult contains an unknown supervisor kind');
}

module.exports = Object.freeze({ composeSupervisedPdfTextSearchResult });
