'use strict';

const { types: utilTypes } = require('node:util');
const { orchestratePdfMetadataRead } = require('./pdf-metadata-orchestrator');
const { readPdfMetadataWithExactPdfiumPackage } = require('./pdf-metadata-runtime-binding');

const FACADE_INPUT_KEYS = Object.freeze([
  'bytes',
  'request',
  'availability',
  'runtimeBinding',
  'wasmBinary',
  'terminalControl',
  'terminateRuntime',
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

function isByteView(value) {
  return !utilTypes.isProxy(value) && value instanceof Uint8Array && value.byteLength > 0;
}

function copyByteView(value) {
  const copy = new Uint8Array(value.byteLength);
  copy.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
  return copy;
}

function byteViewEquals(value, expected) {
  if (!isByteView(value) || value.byteLength !== expected.byteLength) return false;
  const current = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  for (let index = 0; index < current.length; index += 1) {
    if (current[index] !== expected[index]) return false;
  }
  return true;
}

async function readPdfMetadataWithExactPackageSupervisedSemantics(options) {
  if (!exactOwnDataKeys(options, FACADE_INPUT_KEYS)) {
    throw new TypeError('PDF metadata read exact-package facade options must contain only qualified own data fields');
  }

  const bytes = ownData(options, 'bytes');
  const request = ownData(options, 'request');
  const availability = ownData(options, 'availability');
  const runtimeBinding = ownData(options, 'runtimeBinding');
  const wasmBinary = ownData(options, 'wasmBinary');
  const terminalControl = ownData(options, 'terminalControl');
  const terminateRuntime = ownData(options, 'terminateRuntime');

  if (!isByteView(wasmBinary)) {
    throw new TypeError('wasmBinary must be a non-empty Uint8Array at the exact-package facade boundary');
  }

  const wasmSnapshot = copyByteView(wasmBinary);
  const runRuntime = () => readPdfMetadataWithExactPdfiumPackage({ bytes, wasmBinary });

  let result = null;
  let primaryError = null;
  try {
    result = await orchestratePdfMetadataRead({
      bytes,
      request,
      availability,
      runtimeBinding,
      runRuntime,
      terminalControl,
      terminateRuntime,
    });
  } catch (error) {
    primaryError = error;
  }

  if (!byteViewEquals(wasmBinary, wasmSnapshot)) {
    const wasmError = new Error('caller WASM bytes changed during exact-package supervised semantic execution');
    if (primaryError) {
      throw new AggregateError(
        [primaryError, wasmError],
        'PDF metadata exact-package orchestration and WASM integrity check failed',
      );
    }
    throw wasmError;
  }
  if (primaryError) throw primaryError;
  return result;
}

module.exports = Object.freeze({ readPdfMetadataWithExactPackageSupervisedSemantics });
