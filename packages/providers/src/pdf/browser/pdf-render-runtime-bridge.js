'use strict';

const { types: utilTypes } = require('node:util');
const { composePdfRenderResult } = require('./pdf-render-provider');
const { SUPERVISOR_KIND } = require('./pdf-render-runtime-supervisor');

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

const SUCCESS_RENDER_KEYS = Object.freeze([
  'openSucceeded',
  'pageIndex',
  'pageCount',
  'width',
  'height',
  'pixelFormat',
  'bytesPerPixel',
  'stride',
  'pixels',
]);

const REJECTED_RENDER_KEYS = Object.freeze(['openSucceeded', 'pdfiumLastError']);

const PIXEL_FORMAT_BGRA = 'BGRA';
const BYTES_PER_PIXEL_BGRA = 4;
const PDFIUM_FORMAT_ERROR_CODE = 3;

// Intrinsic typed-array length read: an observation pixel buffer may carry own
// `byteLength`/`length` shadows, so the property is never read directly here.
const UINT8_BYTE_LENGTH_GETTER = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(Uint8Array.prototype),
  'byteLength',
).get;

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

function trueByteLength(view) {
  try {
    return Reflect.apply(UINT8_BYTE_LENGTH_GETTER, view, []);
  } catch {
    return -1;
  }
}

function isNonEmptyPixelView(value) {
  if (!value || typeof value !== 'object' || utilTypes.isProxy(value)) return false;
  if (!(value instanceof Uint8Array)) return false;
  return trueByteLength(value) > 0;
}

function validateRawObservation(value) {
  if (!isStrictObject(value)) throw new TypeError('supervised raw observation must be a strict plain object');
  const openSucceeded = ownData(value, 'openSucceeded');
  if (openSucceeded === true) {
    if (!exactOwnDataKeys(value, SUCCESS_RENDER_KEYS)) {
      throw new TypeError('supervised successful raw render observation has an invalid shape');
    }
    const pageIndex = ownData(value, 'pageIndex');
    const pageCount = ownData(value, 'pageCount');
    const width = ownData(value, 'width');
    const height = ownData(value, 'height');
    const stride = ownData(value, 'stride');
    if (!Number.isSafeInteger(pageIndex) || pageIndex < 0
        || !Number.isSafeInteger(pageCount) || pageCount < 0
        || !Number.isSafeInteger(width) || width < 1
        || !Number.isSafeInteger(height) || height < 1
        || !Number.isSafeInteger(stride) || stride < 1) {
      throw new TypeError('supervised successful raw render observation has invalid page or dimension fields');
    }
    if (ownData(value, 'pixelFormat') !== PIXEL_FORMAT_BGRA
        || ownData(value, 'bytesPerPixel') !== BYTES_PER_PIXEL_BGRA) {
      throw new TypeError('supervised successful raw render observation has invalid pixel format markers');
    }
    if (!isNonEmptyPixelView(ownData(value, 'pixels'))) {
      throw new TypeError('supervised successful raw render observation has invalid pixels');
    }
    return value;
  }
  if (openSucceeded === false) {
    if (!exactOwnDataKeys(value, REJECTED_RENDER_KEYS)
        || ownData(value, 'pdfiumLastError') !== PDFIUM_FORMAT_ERROR_CODE) {
      throw new TypeError('supervised rejected raw render observation has an invalid shape');
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

function composeSupervisedPdfRenderResult({
  bytes,
  request,
  availability,
  supervisedResult,
}) {
  if (!Buffer.isBuffer(bytes)) {
    throw new TypeError('bytes must be a Buffer at the PDF render semantic bridge boundary');
  }
  if (!isStrictObject(supervisedResult)) {
    throw new TypeError('supervisedResult must be a strict plain supervisor envelope');
  }

  const kind = ownData(supervisedResult, 'kind');
  if (kind === SUPERVISOR_KIND.RUNTIME_COMPLETED) {
    if (!exactOwnDataKeys(supervisedResult, COMPLETED_ENVELOPE_KEYS)) {
      throw new TypeError('runtime-completed supervisor envelope has an invalid shape');
    }
    const renderEvidence = validateRawObservation(ownData(supervisedResult, 'rawObservation'));
    return composePdfRenderResult({
      bytes,
      request,
      availability,
      renderEvidence,
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
    return composePdfRenderResult({
      bytes,
      request,
      availability,
      renderEvidence: null,
      terminalOutcomeEvidence,
    });
  }

  throw new TypeError('supervisedResult contains an unknown supervisor kind');
}

module.exports = Object.freeze({ composeSupervisedPdfRenderResult });
