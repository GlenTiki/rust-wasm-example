const loader = require('initialise-wasm')
const buf = require('./build/wasm.js')

module.exports = loader(buf, { promise: false }).exports
