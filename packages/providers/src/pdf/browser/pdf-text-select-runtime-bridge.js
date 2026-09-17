'use strict';

const { types: utilTypes } = require('node:util');
const { composePdfTextSelectResult } = require('./pdf-text-select-provider');
const { SUPERVISOR_KIND } = require('./pdf-text-select-runtime-supervisor');

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

const SUCCESS_SELECT_KEYS = Object.freeze([
  'openSucceeded',
  'pageIndex',
  'pageCount',
  'charCount',
  'startIndex',
  'selectCount',
  'rectCount',
  'rectsTruncated',
  'unicodeMapError',
  'text',
  'rects',
]);

const REJECTED_SELECT_KEYS = Object.freeze(['openSucceeded', 'pdfiumLastError']);

const RECT_KEYS = Object.freeze(['left', 'top', 'right', 'bottom']);

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

function validRect(value) {
  if (!isStrictObject(value)) return false;
  if (!exactOwnDataKeys(value, RECT_KEYS)) return false;
  const left = ownData(value, 'left');
  const top = ownData(value, 'top');
  const right = ownData(value, 'right');
  const bottom = ownData(value, 'bottom');
  return Number.isFinite(left) && Number.isFinite(top)
    && Number.isFinite(right) && Number.isFinite(bottom)
    && left <= right;
}

function validateRawObservation(value) {
  if (!isStrictObject(value)) throw new TypeError('supervised raw observation must be a strict plain object');
  const openSucceeded = ownData(value, 'openSucceeded');
  if (openSucceeded === true) {
    if (!exactOwnDataKeys(value, SUCCESS_SELECT_KEYS)) {
      throw new TypeError('supervised successful raw text selection observation has an invalid shape');
    }
    const pageIndex = ownData(value, 'pageIndex');
    const pageCount = ownData(value, 'pageCount');
    const charCount = ownData(value, 'charCount');
    const startIndex = ownData(value, 'startIndex');
    const selectCount = ownData(value, 'selectCount');
    const rectCount = ownData(value, 'rectCount');
    const rectsTruncated = ownData(value, 'rectsTruncated');
    const unicodeMapError = ownData(value, 'unicodeMapError');
    if (!Number.isSafeInteger(pageIndex) || pageIndex < 0
        || !Number.isSafeInteger(pageCount) || pageCount < 0
        || !Number.isSafeInteger(charCount) || charCount < 0
        || !Number.isSafeInteger(startIndex) || startIndex < 0
        || !Number.isSafeInteger(selectCount) || selectCount < 0
        || !Number.isSafeInteger(rectCount) || rectCount < 0) {
      throw new TypeError('supervised successful raw text selection observation has invalid selection fields');
    }
    if (typeof rectsTruncated !== 'boolean' || typeof unicodeMapError !== 'boolean') {
      throw new TypeError('supervised successful raw text selection observation has invalid selection flags');
    }
    if (typeof ownData(value, 'text') !== 'string') {
      throw new TypeError('supervised successful raw text selection observation has invalid text');
    }
    const rects = ownData(value, 'rects');
    if (!Array.isArray(rects) || utilTypes.isProxy(rects) || !rects.every(validRect)) {
      throw new TypeError('supervised successful raw text selection observation has invalid selection rects');
    }
    return value;
  }
  if (openSucceeded === false) {
    if (!exactOwnDataKeys(value, REJECTED_SELECT_KEYS)
        || ownData(value, 'pdfiumLastError') !== PDFIUM_FORMAT_ERROR_CODE) {
      throw new TypeError('supervised rejected raw text selection observation has an invalid shape');
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

function composeSupervisedPdfTextSelectResult({
  bytes,
  request,
  availability,
  supervisedResult,
}) {
  if (!Buffer.isBuffer(bytes)) {
    throw new TypeError('bytes must be a Buffer at the PDF text selection semantic bridge boundary');
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
    return composePdfTextSelectResult({
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
    return composePdfTextSelectResult({
      bytes,
      request,
      availability,
      textEvidence: null,
      terminalOutcomeEvidence,
    });
  }

  throw new TypeError('supervisedResult contains an unknown supervisor kind');
}

module.exports = Object.freeze({ composeSupervisedPdfTextSelectResult });
