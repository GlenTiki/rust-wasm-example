const {test} = require('tap')
const lib = require('./index')

test('it loaded the module and worked!', async (t) => {
  t.equal(lib.digest('Type here'), 'd2c87462cd5d408c3264250d0b81218a08b51863')
  t.end()
})
