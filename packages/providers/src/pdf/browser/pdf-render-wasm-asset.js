'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { types: utilTypes } = require('node:util');

const ASSET_INPUT_KEYS = Object.freeze(['packageRoot']);

const EXPECTED_PACKAGE_NAME = '@embedpdf/pdfium';
const EXPECTED_PACKAGE_VERSION = '2.15.0';
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';
const EXPECTED_WASM_BYTE_LENGTH = 4633788;

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

function sha256Hex(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function readPackageMetadata(packageRoot) {
  let raw;
  try {
    raw = fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8');
  } catch (error) {
    throw new Error('exact PDFium package metadata is unreadable');
  }
  let metadata;
  try {
    metadata = JSON.parse(raw);
  } catch (error) {
    throw new Error('exact PDFium package metadata is not valid JSON');
  }
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    throw new Error('exact PDFium package metadata has an invalid shape');
  }
  return metadata;
}

function verifyPackageIdentity(metadata) {
  if (metadata.name !== EXPECTED_PACKAGE_NAME
      || metadata.version !== EXPECTED_PACKAGE_VERSION
      || metadata.dependencies !== undefined) {
    throw new Error('PDFium package identity does not match the adopted exact package');
  }
}

function readWasmBytes(packageRoot) {
  try {
    return fs.readFileSync(path.join(packageRoot, 'dist', 'pdfium.wasm'));
  } catch (error) {
    throw new Error('exact PDFium WASM bytes are unreadable');
  }
}

function verifyWasmIdentity(wasmBytes) {
  if (!Buffer.isBuffer(wasmBytes)
      || wasmBytes.byteLength !== EXPECTED_WASM_BYTE_LENGTH
      || sha256Hex(wasmBytes) !== EXPECTED_WASM_SHA256) {
    throw new Error('PDFium WASM bytes do not match the adopted exact WASM identity');
  }
}

function loadExactPdfiumWasmAsset(options) {
  if (!exactOwnDataKeys(options, ASSET_INPUT_KEYS)) {
    throw new TypeError('PDF render WASM asset options must contain only qualified own data fields');
  }
  const packageRoot = ownData(options, 'packageRoot');
  if (typeof packageRoot !== 'string' || packageRoot.length === 0) {
    throw new TypeError('packageRoot must be a non-empty string');
  }

  const metadata = readPackageMetadata(packageRoot);
  verifyPackageIdentity(metadata);
  const wasmBytes = readWasmBytes(packageRoot);
  verifyWasmIdentity(wasmBytes);
  return Buffer.from(wasmBytes);
}

module.exports = Object.freeze({ loadExactPdfiumWasmAsset });
