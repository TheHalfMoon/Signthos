'use strict';

const { types: utilTypes } = require('node:util');
const { init: initPdfium } = require('@embedpdf/pdfium');
const { extractPdfPageTextWithLocalWasm } = require('./pdf-text-runtime');

const RUNTIME_BINDING_INPUT_KEYS = Object.freeze([
  'bytes',
  'wasmBinary',
  'pageIndex',
  'maxChars',
]);

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

async function extractPdfPageTextWithExactPdfiumPackage(options) {
  if (!exactOwnDataKeys(options, RUNTIME_BINDING_INPUT_KEYS)) {
    throw new TypeError('PDF text exact-package runtime binding options must contain only qualified own data fields');
  }

  const bytes = ownData(options, 'bytes');
  const wasmBinary = ownData(options, 'wasmBinary');
  const pageIndex = ownData(options, 'pageIndex');
  const maxChars = ownData(options, 'maxChars');

  return extractPdfPageTextWithLocalWasm({
    bytes,
    wasmBinary,
    initPdfium,
    pageIndex,
    maxChars,
  });
}

module.exports = Object.freeze({ extractPdfPageTextWithExactPdfiumPackage });
