'use strict';

const { types: utilTypes } = require('node:util');
const { exactByteIdentity } = require('../../content-identity-admission');
const {
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  TERMINAL_EVIDENCE_SCHEMA,
  TERMINAL_OUTCOME,
} = require('./pdf-metadata-provider');

const RUNTIME_BINDING_KEYS = Object.freeze([
  'providerId',
  'providerCapabilityVersion',
  'inputExactBytesDigest',
  'byteLength',
  'resourceBudgetRef',
]);

const TERMINATION_CONFIRMATION_KEYS = Object.freeze([
  'runtimeEvidenceRef',
  'partialOutputDiscarded',
]);

const TERMINAL_EVENT_KEYS = Object.freeze(['terminalOutcome']);
const CONTROL_KEYS = Object.freeze(['subscribe']);
const SUPERVISOR_KIND = Object.freeze({
  RUNTIME_COMPLETED: 'RUNTIME_COMPLETED',
  RUNTIME_TERMINAL: 'RUNTIME_TERMINAL',
});

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

function isStrictObject(value) {
  if (!value || typeof value !== 'object' || utilTypes.isProxy(value) || Array.isArray(value) || Buffer.isBuffer(value)) {
    return false;
  }
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
  for (const key of actualKeys) {
    if (!expected.has(key)) return false;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, 'value')) return false;
  }
  return true;
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function digestMatches(value, expected) {
  return exactOwnDataKeys(value, ['algorithm', 'value'])
    && ownData(value, 'algorithm') === expected.algorithm
    && ownData(value, 'value') === expected.value;
}

function exactIdentityFor(bytes) {
  const bufferView = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return exactByteIdentity(bufferView);
}

function validateRuntimeBinding(bytes, runtimeBinding) {
  if (!exactOwnDataKeys(runtimeBinding, RUNTIME_BINDING_KEYS)) {
    throw new TypeError('runtimeBinding must contain only qualified own data fields');
  }
  const identity = exactIdentityFor(bytes);
  if (ownData(runtimeBinding, 'providerId') !== PROVIDER_DESCRIPTOR.providerId
      || ownData(runtimeBinding, 'providerCapabilityVersion') !== PROVIDER_CAPABILITY_VERSION
      || ownData(runtimeBinding, 'byteLength') !== identity.byteLength
      || !digestMatches(ownData(runtimeBinding, 'inputExactBytesDigest'), identity.inputExactBytesDigest)
      || !nonEmptyString(ownData(runtimeBinding, 'resourceBudgetRef'))) {
    throw new TypeError('runtimeBinding does not match the qualified PDF_METADATA_READ_V1 input binding');
  }
  return Object.freeze({
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    inputExactBytesDigest: Object.freeze({ ...identity.inputExactBytesDigest }),
    byteLength: identity.byteLength,
    resourceBudgetRef: ownData(runtimeBinding, 'resourceBudgetRef'),
  });
}

function runtimeBindingStillMatches(runtimeBinding, normalized) {
  if (!exactOwnDataKeys(runtimeBinding, RUNTIME_BINDING_KEYS)) return false;
  return ownData(runtimeBinding, 'providerId') === normalized.providerId
    && ownData(runtimeBinding, 'providerCapabilityVersion') === normalized.providerCapabilityVersion
    && ownData(runtimeBinding, 'byteLength') === normalized.byteLength
    && ownData(runtimeBinding, 'resourceBudgetRef') === normalized.resourceBudgetRef
    && digestMatches(ownData(runtimeBinding, 'inputExactBytesDigest'), normalized.inputExactBytesDigest);
}

function validMetadataValue(value) {
  return value === null || typeof value === 'string';
}

function validateRawObservation(value) {
  if (!isStrictObject(value)) throw new TypeError('runtime completion must be a strict plain raw observation');
  const openSucceeded = ownData(value, 'openSucceeded');
  if (openSucceeded === true) {
    if (!exactOwnDataKeys(value, SUCCESS_METADATA_KEYS)) {
      throw new TypeError('successful raw metadata observation has an invalid shape');
    }
    const metadata = ownData(value, 'metadata');
    if (!exactOwnDataKeys(metadata, METADATA_FIELD_KEYS)) {
      throw new TypeError('successful raw metadata observation has invalid metadata fields');
    }
    const fields = {};
    for (const key of METADATA_FIELD_KEYS) {
      const field = ownData(metadata, key);
      if (!validMetadataValue(field)) {
        throw new TypeError('successful raw metadata observation has an invalid metadata value');
      }
      fields[key] = field;
    }
    return Object.freeze({
      openSucceeded: true,
      metadata: Object.freeze(fields),
    });
  }
  if (openSucceeded === false) {
    if (!exactOwnDataKeys(value, REJECTED_METADATA_KEYS)) {
      throw new TypeError('rejected raw metadata observation has an invalid shape');
    }
    const pdfiumLastError = ownData(value, 'pdfiumLastError');
    if (pdfiumLastError !== PDFIUM_FORMAT_ERROR_CODE) {
      throw new TypeError('rejected raw metadata observation has an unqualified pdfiumLastError');
    }
    return Object.freeze({ openSucceeded: false, pdfiumLastError });
  }
  throw new TypeError('raw observation must contain an own boolean openSucceeded field');
}

function validateTerminalControl(terminalControl) {
  if (!exactOwnDataKeys(terminalControl, CONTROL_KEYS)) {
    throw new TypeError('terminalControl must contain only an own subscribe function');
  }
  const subscribe = ownData(terminalControl, 'subscribe');
  if (typeof subscribe !== 'function') throw new TypeError('terminalControl.subscribe must be a function');
  return subscribe;
}

function validateTerminalEvent(event) {
  if (!exactOwnDataKeys(event, TERMINAL_EVENT_KEYS)) {
    throw new TypeError('terminal event must contain only terminalOutcome');
  }
  const terminalOutcome = ownData(event, 'terminalOutcome');
  if (!Object.values(TERMINAL_OUTCOME).includes(terminalOutcome)) {
    throw new TypeError('terminal event contains an unqualified outcome');
  }
  return terminalOutcome;
}

function validateTerminationConfirmation(value) {
  if (!exactOwnDataKeys(value, TERMINATION_CONFIRMATION_KEYS)) {
    throw new TypeError('termination confirmation has an invalid shape');
  }
  const runtimeEvidenceRef = ownData(value, 'runtimeEvidenceRef');
  const partialOutputDiscarded = ownData(value, 'partialOutputDiscarded');
  if (!nonEmptyString(runtimeEvidenceRef) || partialOutputDiscarded !== true) {
    throw new TypeError('termination confirmation is not qualified');
  }
  return runtimeEvidenceRef;
}

function makeTerminalEvidence(binding, terminalOutcome, runtimeEvidenceRef) {
  return Object.freeze({
    schema: TERMINAL_EVIDENCE_SCHEMA,
    terminalOutcome,
    providerId: binding.providerId,
    providerCapabilityVersion: binding.providerCapabilityVersion,
    inputExactBytesDigest: Object.freeze({ ...binding.inputExactBytesDigest }),
    byteLength: binding.byteLength,
    resourceBudgetRef: binding.resourceBudgetRef,
    runtimeEvidenceRef,
    partialOutputDiscarded: true,
  });
}

function combineFailure(primaryError, cleanupError) {
  if (primaryError && cleanupError) {
    return new AggregateError([primaryError, cleanupError], 'PDF metadata read runtime supervision and cleanup failed');
  }
  return primaryError || cleanupError;
}

async function supervisePdfMetadataReadRuntime({
  bytes,
  runtimeBinding,
  runRuntime,
  terminalControl,
  terminateRuntime,
}) {
  if (!isByteView(bytes)) throw new TypeError('bytes must be a non-empty Uint8Array');
  if (typeof runRuntime !== 'function') throw new TypeError('runRuntime must be a function');
  if (typeof terminateRuntime !== 'function') throw new TypeError('terminateRuntime must be a function');

  const inputSnapshot = copyByteView(bytes);
  const binding = validateRuntimeBinding(bytes, runtimeBinding);
  const subscribe = validateTerminalControl(terminalControl);
  const originalSubscribe = subscribe;

  let signalSettled = false;
  let resolveSignal;
  const signalPromise = new Promise((resolve) => { resolveSignal = resolve; });
  let disposer = null;
  let disposed = false;

  try {
    disposer = subscribe((event) => {
      if (signalSettled) return;
      signalSettled = true;
      try {
        resolveSignal({ type: 'TERMINAL_SIGNAL', terminalOutcome: validateTerminalEvent(event) });
      } catch (error) {
        resolveSignal({ type: 'TERMINAL_SIGNAL_INVALID', error });
      }
    });
  } catch (error) {
    throw error;
  }
  if (typeof disposer !== 'function') {
    throw new TypeError('terminalControl.subscribe must return a disposer function');
  }

  let runtimeEvent;
  if (signalSettled) {
    runtimeEvent = new Promise(() => {});
  } else {
    let runtimePromise;
    try {
      runtimePromise = Promise.resolve(runRuntime());
    } catch (error) {
      runtimePromise = Promise.reject(error);
    }
    runtimeEvent = runtimePromise.then(
      (value) => ({ type: 'RUNTIME_COMPLETED', value }),
      (error) => ({ type: 'RUNTIME_FAILED', error }),
    );
  }

  let primaryError = null;
  let output = null;
  try {
    const winner = await Promise.race([runtimeEvent, signalPromise]);
    if (winner.type === 'TERMINAL_SIGNAL_INVALID') {
      primaryError = winner.error instanceof Error ? winner.error : new Error(String(winner.error));
    } else if (winner.type === 'TERMINAL_SIGNAL') {
      const terminalOutcome = winner.terminalOutcome;
      const confirmation = await terminateRuntime(Object.freeze({ terminalOutcome }));
      const runtimeEvidenceRef = validateTerminationConfirmation(confirmation);
      output = Object.freeze({
        kind: SUPERVISOR_KIND.RUNTIME_TERMINAL,
        terminalOutcomeEvidence: makeTerminalEvidence(binding, terminalOutcome, runtimeEvidenceRef),
      });
    } else if (winner.type === 'RUNTIME_FAILED') {
      primaryError = winner.error instanceof Error ? winner.error : new Error(String(winner.error));
    } else {
      output = Object.freeze({
        kind: SUPERVISOR_KIND.RUNTIME_COMPLETED,
        rawObservation: validateRawObservation(winner.value),
      });
    }
  } catch (error) {
    primaryError = error;
  }

  let cleanupError = null;
  if (!disposed) {
    disposed = true;
    try {
      disposer();
    } catch (error) {
      cleanupError = error instanceof Error ? error : new Error(String(error));
    }
  }

  if (!byteViewEquals(bytes, inputSnapshot)) {
    primaryError = combineFailure(primaryError, new Error('source bytes changed during runtime supervision'));
  }
  if (!runtimeBindingStillMatches(runtimeBinding, binding)) {
    primaryError = combineFailure(primaryError, new Error('runtime binding changed during runtime supervision'));
  }
  if (!exactOwnDataKeys(terminalControl, CONTROL_KEYS) || ownData(terminalControl, 'subscribe') !== originalSubscribe) {
    primaryError = combineFailure(primaryError, new Error('terminal control changed during runtime supervision'));
  }

  const failure = combineFailure(primaryError, cleanupError);
  if (failure) throw failure;
  if (!output) throw new Error('runtime supervision produced no result');
  return output;
}

module.exports = Object.freeze({
  RUNTIME_BINDING_KEYS,
  SUPERVISOR_KIND,
  supervisePdfMetadataReadRuntime,
});
