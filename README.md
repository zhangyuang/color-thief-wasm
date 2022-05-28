# WebAssembly for Color Thief algorithm

Use WASM implement Color Thief algorithm for high performance

## Install

You can install specify dependcines for different platform.

### Node.js

```bash
$ npm i color-thief-wasm
```

### Web

```bash
$ npm i color-thief-wasm-web
```

### Bundler(Webpack)

```bash
$ npm i color-thief-wasm-bundler
```


## How to use

In Node.js

```js
const {
    get_color_thief
} = require('color-thief-wasm')
// export function get_color_thief(colors: Uint8Array, pixel_count: number, quality: number, colors_count: number): Array<any>;
const colors = get_color_thief(data, 64 * 64, 10, 5)
```

In web

```html
<script type="module">
    import {
        get_color_thief
    } from "./node_modules/color-thief-wasm-web"
    const colors = get_color_thief(data, 64 * 64, 10, 5)
</script>
```

## How to build

Before Build, must install `rust` `wasm-pack` and `pnpm`

```js
$ npm run build
```

## benchmark

```bash
$ npm run bench
> color-thief-wasm@1.0.2 bench
> node bench.js

Running "GetColorThief" suite...
Progress: 100%

  Wasm GetColorThief:
    12 983 ops/s, ±3.27%   | fastest

  JavaScript GetColorThief:
    2 021 ops/s, ±6.99%    | slowest, 84.43% slower

Finished 2 cases!
  Fastest: Wasm GetColorThief
  Slowest: JavaScript GetColorThief
```

## Publish

```bash
$ npm version patch && git push origin master
```