'use strict';

const crypto = require('node:crypto');
const { types: utilTypes } = require('node:util');
const { inspectPdfWithLocalWasm } = require('./pdf-inspect-runtime');
const { placePdfMarkWithLocalWasm } = require('./pdf-mark-runtime');

const EXPECTED_OPTION_KEYS = Object.freeze([
  'bytes',
  'wasmBinary',
  'initPdfium',
  'startNumber',
  'x',
  'y',
  'fontSize',
  'angleDegrees',
  'red',
  'green',
  'blue',
  'alpha',
]);

const MAX_COORDINATE = 10000;
const MAX_FONT_SIZE = 144;
const MAX_ANGLE_DEGREES = 360;
const MAX_CHANNEL = 255;
const MAX_PAGES = 10000;

const PROVIDER_PACKAGE = '@embedpdf/pdfium';
const PROVIDER_VERSION = '2.15.0';
const EXPECTED_WASM_BYTE_LENGTH = 4633788;
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';

const MAX_INPUT_BYTES = 64 * 1024 * 1024;
const MAX_OUTPUT_BYTES = 64 * 1024 * 1024;

function isByteView(value) {
  return value instanceof Uint8Array && value.byteLength > 0;
}

function copyByteView(value) {
  const copy = new Uint8Array(value.byteLength);
  copy.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
  return copy;
}

function byteViewEquals(value, expected) {
  if (!(value instanceof Uint8Array) || value.byteLength !== expected.byteLength) return false;
  const current = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  for (let index = 0; index < current.length; index += 1) {
    if (current[index] !== expected[index]) return false;
  }
  return true;
}

function isStrictObject(value) {
  if (!value || typeof value !== 'object') return false;
  if (utilTypes.isProxy(value)) return false;
  if (Array.isArray(value)) return false;
  if (Buffer.isBuffer(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function readOwnData(value, key) {
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, 'value')) return undefined;
  return { present: true, data: descriptor.value };
}

function isPlacementCoordinate(value) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= MAX_COORDINATE;
}

function isChannel(value) {
  return Number.isSafeInteger(value) && value >= 0 && value <= MAX_CHANNEL;
}

function sha256Hex(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function readValidatedOptions(options) {
  if (!isStrictObject(options)) {
    throw new TypeError('options must be a plain object');
  }
  const actualKeys = Reflect.ownKeys(options);
  if (actualKeys.length !== EXPECTED_OPTION_KEYS.length
      || actualKeys.some((key) => typeof key !== 'string' || !EXPECTED_OPTION_KEYS.includes(key))) {
    throw new TypeError('options has unknown or missing fields');
  }
  const entries = {};
  for (const key of EXPECTED_OPTION_KEYS) {
    const entry = readOwnData(options, key);
    if (!entry) throw new TypeError('options fields must be plain data values');
    entries[key] = entry.data;
  }
  if (!isByteView(entries.bytes)) throw new TypeError('bytes must be a non-empty Uint8Array');
  if (!isByteView(entries.wasmBinary)) throw new TypeError('wasmBinary must be a non-empty Uint8Array');
  if (typeof entries.initPdfium !== 'function') throw new TypeError('initPdfium must be a function');
  if (!Number.isSafeInteger(entries.startNumber) || entries.startNumber < 0) {
    throw new TypeError('startNumber must be a safe integer >= 0');
  }
  if (!isPlacementCoordinate(entries.x) || !isPlacementCoordinate(entries.y)) {
    throw new TypeError('x and y must be finite coordinates within bounds');
  }
  if (typeof entries.fontSize !== 'number' || !Number.isFinite(entries.fontSize)
      || entries.fontSize <= 0 || entries.fontSize > MAX_FONT_SIZE) {
    throw new TypeError('fontSize must be a finite size within bounds');
  }
  if (typeof entries.angleDegrees !== 'number' || !Number.isFinite(entries.angleDegrees)
      || Math.abs(entries.angleDegrees) > MAX_ANGLE_DEGREES) {
    throw new TypeError('angleDegrees must be a finite angle within bounds');
  }
  for (const channel of ['red', 'green', 'blue', 'alpha']) {
    if (!isChannel(entries[channel])) {
      throw new TypeError(`${channel} must be a safe integer within 0..255`);
    }
  }
  return entries;
}

async function numberPdfPagesWithLocalWasm(options) {
  const {
    bytes, wasmBinary, initPdfium, startNumber, x, y, fontSize,
    angleDegrees, red, green, blue, alpha,
  } = readValidatedOptions(options);
  if (bytes.byteLength > MAX_INPUT_BYTES) {
    throw new Error('PDF input exceeds the page-number resource budget');
  }

  const inputSnapshot = copyByteView(bytes);
  const wasmSnapshot = copyByteView(wasmBinary);
  const inputDigest = sha256Hex(inputSnapshot);
  let result = null;
  let primaryError = null;

  try {
    const inspection = await inspectPdfWithLocalWasm({
      bytes: inputSnapshot,
      wasmBinary: wasmSnapshot,
      initPdfium,
    });
    const pageCount = inspection.pageCount;
    if (!Number.isSafeInteger(pageCount) || pageCount < 0) {
      throw new Error('PDFium returned an invalid page count');
    }
    if (pageCount > MAX_PAGES) {
      throw new Error('PDF page count exceeds the page-number resource budget');
    }
    if (pageCount > 0 && startNumber + pageCount - 1 > Number.MAX_SAFE_INTEGER) {
      throw new Error('page numbers exceed the safe integer range');
    }

    const placedTexts = [];
    let current = inputSnapshot;
    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      const placed = await placePdfMarkWithLocalWasm({
        bytes: current,
        wasmBinary: wasmSnapshot,
        initPdfium,
        pageIndex,
        text: String(startNumber + pageIndex),
        x,
        y,
        fontSize,
        angleDegrees,
        red,
        green,
        blue,
        alpha,
      });
      placedTexts.push(placed.placedText);
      current = placed.outputBytes;
    }
    const outputBytes = pageCount === 0 ? copyByteView(inputSnapshot) : current;
    if (outputBytes.byteLength > MAX_OUTPUT_BYTES) {
      throw new Error('PDF output exceeds the page-number resource budget');
    }
    result = Object.freeze({
      succeeded: true,
      inputByteLength: inputSnapshot.byteLength,
      inputDigest: Object.freeze({ algorithm: 'sha256', value: inputDigest }),
      pageCount,
      startNumber,
      placedTexts: Object.freeze(placedTexts.slice()),
      outputBytes,
      outputByteLength: outputBytes.byteLength,
      outputDigest: Object.freeze({ algorithm: 'sha256', value: sha256Hex(outputBytes) }),
      providerIdentity: Object.freeze({
        package: PROVIDER_PACKAGE,
        version: PROVIDER_VERSION,
        wasmByteLength: EXPECTED_WASM_BYTE_LENGTH,
        wasmDigest: EXPECTED_WASM_SHA256,
      }),
    });
  } catch (error) {
    primaryError = error;
    result = null;
  }

  const cleanupErrors = [];
  if (!byteViewEquals(bytes, inputSnapshot)) {
    cleanupErrors.push(new Error('source bytes changed during PDFium page numbering'));
  }
  if (!byteViewEquals(wasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('caller WASM bytes changed during PDFium page numbering'));
  }

  if (primaryError && cleanupErrors.length > 0) {
    throw new AggregateError([primaryError, ...cleanupErrors], 'PDFium page numbering and cleanup failed');
  }
  if (primaryError) throw primaryError;
  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, 'PDFium cleanup failed');
  }
  if (!result) throw new Error('PDFium page numbering produced no result');
  return result;
}

module.exports = Object.freeze({
  numberPdfPagesWithLocalWasm,
  NUMBER_RESOURCE_BUDGETS: Object.freeze({
    maxInputBytes: MAX_INPUT_BYTES,
    maxOutputBytes: MAX_OUTPUT_BYTES,
    maxPages: MAX_PAGES,
    maxCoordinate: MAX_COORDINATE,
    maxFontSize: MAX_FONT_SIZE,
    maxAngleDegrees: MAX_ANGLE_DEGREES,
    maxChannel: MAX_CHANNEL,
  }),
});
