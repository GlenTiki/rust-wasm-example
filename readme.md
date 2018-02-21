# Rust WASM

A basic example of how to package a rust module into WASM for comsumption as an npm module.

We don't care about publishing to cargo for now, we just want to get our WASM onto npm for users to install and use!

## Usage

You can install this module and start using the WASM generated within today!

This library exports a lib that has a function `add_one` on it. Check test.js to see how its expected to be used.

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