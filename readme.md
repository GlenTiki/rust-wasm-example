# Rust WASM

A basic example of how to package a rust module into WASM for comsumption as an npm module.

We don't care about publishing to cargo for now, we just want to get our WASM onto npm for users to install and use!

## Usage

You can install this module and start using the WASM generated within today!

```sh
npm i rust-wasm
```

This library exports a lib that has the functions `add_one`, `factorial`, `recursiveFactorial` and `callJs` within it.

Example:
```js
const lib = require('rust-wasm')
lib.add_one(41)
lib.factorial(10)
lib.recursiveFactorial(10)
lib.callJs()
```

## Benchmarks

I benchmarked the WASM generated against similar JS fuctionality. The output is collapsed below. The WASM generated can be up to 5x faster than JS when running a recursive factorial function, but when running a factorial function that uses a loop, the difference ends up being insignificant for larger factorials, and non-beneficial to use WASM for small factorials (js ended up 2x faster for `5!`).

All benchmarks were run on a MacBook Pro (Retina, 13-inch, Early 2015) with 2.7 GHz Intel i5 CPU & 8 GB 1867 MHz DDR3 RAM using node v8.6.0.

<details>
<summary>Benchmark output</summary>
factorial WASM for increment 5 x 44,887,847 ops/sec ±14.47% (65 runs sampled) <br/>
factorial JS for increment 5 x 93,934,846 ops/sec ±3.36% (86 runs sampled) <br/>
Benchmark factorial for increment 5 <br/>
Fastest is factorial JS for increment 5 <br/>

factorial WASM for increment 10 x 58,868,287 ops/sec ±1.39% (84 runs sampled) <br/>
factorial JS for increment 10 x 54,040,767 ops/sec ±7.30% (79 runs sampled)<br/>
Benchmark factorial for increment 10<br/>
Fastest is factorial WASM for increment 10<br/>

factorial WASM for increment 20 x 35,854,560 ops/sec ±1.99% (89 runs sampled)<br/>
factorial JS for increment 20 x 31,035,880 ops/sec ±2.70% (84 runs sampled)<br/>
Benchmark factorial for increment 20<br/>
Fastest is factorial WASM for increment 20<br/>

factorial WASM for increment 40 x 17,120,968 ops/sec ±7.02% (77 runs sampled)<br/>
factorial JS for increment 40 x 13,932,862 ops/sec ±3.40% (85 runs sampled)<br/>
Benchmark factorial for increment 40<br/>
Fastest is factorial WASM for increment 40<br/>

factorial WASM for increment 80 x 8,029,735 ops/sec ±4.43% (82 runs sampled)<br/>
factorial JS for increment 80 x 5,960,309 ops/sec ±6.79% (71 runs sampled)<br/>
Benchmark factorial for increment 80<br/>
Fastest is factorial WASM for increment 80<br/>

factorial WASM for increment 160 x 5,005,555 ops/sec ±4.18% (88 runs sampled)<br/>
factorial JS for increment 160 x 4,608,722 ops/sec ±3.24% (88 runs sampled)<br/>
Benchmark factorial for increment 160<br/>
Fastest is factorial WASM for increment 160<br/>

recursive_factorial WASM for increment 5 x 62,107,376 ops/sec ±2.57% (84 runs sampled)<br/>
recursive_factorial JS for increment 5 x 25,075,719 ops/sec ±2.85% (92 runs sampled)<br/>
Benchmark recursiveFactorial for increment 5<br/>
Fastest is recursive_factorial WASM for increment 5<br/>

recursive_factorial WASM for increment 10 x 52,741,036 ops/sec ±2.04% (88 runs sampled)<br/>
recursive_factorial JS for increment 10 x 12,485,573 ops/sec ±1.78% (87 runs sampled)<br/>
Benchmark recursiveFactorial for increment 10<br/>
Fastest is recursive_factorial WASM for increment 10<br/>

recursive_factorial WASM for increment 20 x 31,810,722 ops/sec ±3.25% (90 runs sampled)<br/>
recursive_factorial JS for increment 20 x 5,432,902 ops/sec ±0.54% (94 runs sampled)<br/>
Benchmark recursiveFactorial for increment 20<br/>
Fastest is recursive_factorial WASM for increment 20<br/>

recursive_factorial WASM for increment 40 x 13,918,201 ops/sec ±3.44% (81 runs sampled)<br/>
recursive_factorial JS for increment 40 x 2,919,241 ops/sec ±1.73% (91 runs sampled)<br/>
Benchmark recursiveFactorial for increment 40<br/>
Fastest is recursive_factorial WASM for increment 40<br/>

recursive_factorial WASM for increment 80 x 8,184,447 ops/sec ±1.55% (88 runs sampled)<br/>
recursive_factorial JS for increment 80 x 1,516,359 ops/sec ±2.53% (90 runs sampled)<br/>
Benchmark recursiveFactorial for increment 80<br/>
Fastest is recursive_factorial WASM for increment 80<br/>

recursive_factorial WASM for increment 160 x 5,023,411 ops/sec ±0.99% (94 runs sampled)<br/>
recursive_factorial JS for increment 160 x 764,093 ops/sec ±2.52% (91 runs sampled)<br/>
Benchmark recursiveFactorial for increment 160<br/>
Fastest is recursive_factorial WASM for increment 160<br/>
</details>

## Local dev/setup

You need rust nightly installed and the toolchain needed to compile to wasm32-unknown-unknown. You need the wasm-gc module installed, too.

First up, install [rustup](https://github.com/rust-lang-nursery/rustup.rs)

Then run the following:

```
rustup install nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
cargo install --git https://github.com/alexcrichton/wasm-gc
```

This should get the toolchain needed to develop your rust modules for npm!

## Initialising your own repos

To create a similar repo, follow the following steps:

1. Create your repo folder with cargo `cargo +nightly new module`
    Note - Its important what you name your folder/module. this will become the name of the generate .wasm file.
2. npm init in your folder of choice
3. Setup your build step as needed in your package.json. I've hacked something together to use cargo and wasm-gc under the hood in this repo.
    Note - Its a good idea to package your WASM into a requirable .js file for browser package users, as adding a file to the npm package to be read as a dependency can be tricky. See my `requirify-wasm` section in my package.json to see how to do this.
4. Create an index file that exports your module!
    Note - I export my module synchronously, which will compile and load my WASM in one step. This might not be well suited for larger libs.
5. Publish.

I may have glossed over some details :P This example repo + the description above should be enough to get you started though! :D

## Licence

MIT