var { factorial, recursiveFactorial } = require('./index')
var Benchmark = require('benchmark')

function factorialJS (num) {
  let result = 1
  for (var i = 1; i < num + 1; i++) {
    result = result * i
  }
  return result
}

function recursiveFactorialJS (num) {
  if (num <= 0) return 1
  return num * recursiveFactorialJS(num - 1)
}

const increments = [5, 10, 20, 40, 80, 160]

increments.map((i) => {
  return new Benchmark.Suite(`Benchmark factorial for increment ${i}`)
    .add(`factorial WASM for increment ${i}`, function () {
      factorial(i)
    }).add(`factorial JS for increment ${i}`, function () {
      factorialJS(i)
    }).on('cycle', function (event) {
      console.log(String(event.target))
    }).on('complete', function () {
      console.log(this.name)
      console.log('Fastest is ' + this.filter('fastest').map('name'))
      console.log('--------')
    })
}).forEach(benchmark => benchmark.run())

increments.map((i) => {
  return new Benchmark.Suite(`Benchmark recursiveFactorial for increment ${i}`)
    .add(`recursive_factorial WASM for increment ${i}`, function () {
      recursiveFactorial(i)
    }).add(`recursive_factorial JS for increment ${i}`, function () {
      recursiveFactorialJS(i)
    }).on('cycle', function (event) {
      console.log(String(event.target))
    }).on('complete', function () {
      console.log(this.name)
      console.log('Fastest is ' + this.filter('fastest').map('name'))
      console.log('--------')
    })
}).forEach(benchmark => benchmark.run())
