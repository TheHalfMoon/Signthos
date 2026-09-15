'use strict';

const { init: initPdfium } = require('@embedpdf/pdfium');
const { inspectPdfWithLocalWasm } = require('./pdf-inspect-runtime');

async function inspectPdfWithExactPdfiumPackage({ bytes, wasmBinary }) {
  return inspectPdfWithLocalWasm({
    bytes,
    wasmBinary,
    initPdfium,
  });
}

module.exports = Object.freeze({ inspectPdfWithExactPdfiumPackage });
