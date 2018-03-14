const {test} = require('tap')
const lib = require('./index')

test('it loaded the module and worked!', async (t) => {
  t.equal(lib.digest('Type here'), 'd2c87462cd5d408c3264250d0b81218a08b51863')
  t.equal(lib.digest('testing'), 'dc724af18fbdd4e59189f5fe768a5f8311527050')
  t.equal(lib.digest('Hey my name is Glen'), '0f3294467c28e6feefb714392f42dbeee407498c')
  t.end()
})
