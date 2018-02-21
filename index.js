const buf = require('./build/wasm.js')

module.exports = new WebAssembly.Instance(WebAssembly.Module(buf)).exports
