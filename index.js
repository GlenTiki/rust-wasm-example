const fs = require('fs')
const buf = fs.readFileSync('./build/module.min.wasm')

module.exports = async () => {
  return (await WebAssembly.instantiate(new Uint8Array(buf))).instance.exports
}
