const loader = require('initialise-wasm')
const buf = require('./build/wasm.js')
const isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
const getStringBytes = (buffer, startPtr) => buffer.slice(startPtr, buffer.findIndex((byte, currPtr) => byte === 0 && currPtr > startPtr))

function copyCStr (module, ptr) {
  const stringBytes = getStringBytes(new Uint8Array(module.memory.buffer), ptr)
  const string = isNode ? Buffer.from(stringBytes).toString() : new TextDecoder('UTF-8').decode(stringBytes) // eslint-disable-line no-undef

  module.dealloc_str(ptr)

  return string
}

function newString (module, str) {
  const stringBytes = isNode ? Buffer.from(str, 'utf8') : new TextEncoder('UTF-8').encode(str) // eslint-disable-line no-undef
  let len = stringBytes.length
  let ptr = module.alloc(len + 1)

  const memory = new Uint8Array(module.memory.buffer)
  for (let i = 0; i < len; i++) {
    memory[ptr + i] = stringBytes[i]
  }
  memory[ptr + len] = 0

  return ptr
}

const mod = loader(buf, { promise: false }) // eslint-disable-line no-undef
const Module = {
  alloc: mod.exports.alloc,
  dealloc: mod.exports.dealloc,
  dealloc_str: mod.exports.dealloc_str,
  digest: mod.exports.digest,
  memory: mod.exports.memory
}

module.exports = {
  digest: function (str) {
    let inptr = newString(Module, str)
    let outptr = Module.digest(inptr)
    let result = copyCStr(Module, outptr)

    Module.dealloc_str(inptr)
    return result
  }
}
