'use strict';

const { types: utilTypes } = require('node:util');
const { supervisePdfRenderRuntime } = require('./pdf-render-runtime-supervisor');
const { composeSupervisedPdfRenderResult } = require('./pdf-render-runtime-bridge');

const ORCHESTRATOR_INPUT_KEYS = Object.freeze([
  'bytes',
  'request',
  'availability',
  'runtimeBinding',
  'runRuntime',
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

function safeOwnDataObject(value) {
  if (!isStrictObject(value)) return false;
  return Reflect.ownKeys(value).every((key) => {
    if (typeof key !== 'string') return false;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return Boolean(descriptor && Object.prototype.hasOwnProperty.call(descriptor, 'value'));
  });
}

function digestBindingMatches(requestDigest, runtimeDigest) {
  return exactOwnDataKeys(requestDigest, ['algorithm', 'value'])
    && exactOwnDataKeys(runtimeDigest, ['algorithm', 'value'])
    && ownData(requestDigest, 'algorithm') === ownData(runtimeDigest, 'algorithm')
    && ownData(requestDigest, 'value') === ownData(runtimeDigest, 'value');
}

function validateCrossLayerBinding(request, runtimeBinding) {
  if (!safeOwnDataObject(request) || !safeOwnDataObject(runtimeBinding)) {
    throw new TypeError('semantic request and runtime binding must be safe own-data objects');
  }
  if (ownData(request, 'providerId') !== ownData(runtimeBinding, 'providerId')
      || ownData(request, 'providerCapabilityVersion') !== ownData(runtimeBinding, 'providerCapabilityVersion')
      || ownData(request, 'inputByteLength') !== ownData(runtimeBinding, 'byteLength')
      || ownData(request, 'resourceBudgetRef') !== ownData(runtimeBinding, 'resourceBudgetRef')
      || !digestBindingMatches(ownData(request, 'inputExactBytesDigest'), ownData(runtimeBinding, 'inputExactBytesDigest'))) {
    throw new TypeError('semantic request and runtime binding do not describe the same PDF render operation');
  }
}

async function orchestratePdfRender(options) {
  if (!exactOwnDataKeys(options, ORCHESTRATOR_INPUT_KEYS)) {
    throw new TypeError('PDF render orchestrator options must contain only qualified own data fields');
  }

  const bytes = ownData(options, 'bytes');
  const request = ownData(options, 'request');
  const availability = ownData(options, 'availability');
  const runtimeBinding = ownData(options, 'runtimeBinding');
  const runRuntime = ownData(options, 'runRuntime');
  const terminalControl = ownData(options, 'terminalControl');
  const terminateRuntime = ownData(options, 'terminateRuntime');

  if (!Buffer.isBuffer(bytes)) {
    throw new TypeError('bytes must be a Buffer at the supervised semantic orchestrator boundary');
  }
  if (typeof runRuntime !== 'function') throw new TypeError('runRuntime must be a function');
  if (typeof terminateRuntime !== 'function') throw new TypeError('terminateRuntime must be a function');
  validateCrossLayerBinding(request, runtimeBinding);

  const supervisedResult = await supervisePdfRenderRuntime({
    bytes,
    runtimeBinding,
    runRuntime,
    terminalControl,
    terminateRuntime,
  });

  validateCrossLayerBinding(request, runtimeBinding);

  return composeSupervisedPdfRenderResult({
    bytes,
    request,
    availability,
    supervisedResult,
  });
}

module.exports = Object.freeze({ orchestratePdfRender });
