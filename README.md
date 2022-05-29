# WebAssembly for Color Thief algorithm

Use WASM implement Color Thief algorithm for high performance

ref: [color-thief](https://github.com/lokesh/color-thief)

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

### miniprogram

```bash
$ npm i color-thief-wasm-miniprogram
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

In miniprogram，we must modify wasm-pack build output content for compatable 

ref: [wasm-pack + miniprogram](https://juejin.cn/post/7041161141162082340)


```js
import init, { get_color_thief } from 'color-thief-wasm-miniprogram/color_thief_wasm'
// or download project and import init, {get_color_thief} from './pkg-miniprogram/color_thief_wasm'
await init('color-thief-wasm-miniprogram/color_thief_wasm_bg.wasm')
const colors = get_color_thief(data, 64 * 64, 10, 5)
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