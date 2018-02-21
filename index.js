const buf = require('./build/wasm.js')

module.exports = async () => {
  return (await WebAssembly.instantiate(new Uint8Array(buf))).instance.exports
}
