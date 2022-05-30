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
    import init,{
        get_color_thief
    } from "./pkg-web/color_thief_wasm.js"
    init().then(() => {
      const colors = get_color_thief(data, 64 * 64, 10, 5)
      console.log(colors)
    })
</script>
```

In miniprogram，we must modify wasm-pack build output content for compatable 

ref: [wasm-pack + miniprogram](https://juejin.cn/post/7041161141162082340)


```js
import init, { get_color_thief } from 'color-thief-wasm-miniprogram/color_thief_wasm'
await init('/xxxpath/color_thief_wasm_bg.wasm') // there must provide absolute path
const colors = get_color_thief(data, 64 * 64, 10, 5)
```

Or you can copy pkg-miniprogram to your project for convenience that you can 

```bash
$ tree ./ -I node_modules -L 2
./
├── miniprogram
│   ├── app.json
│   ├── app.less
│   ├── app.ts
│   ├── pages
│   ├── pkg-miniprogram
│   └── utils
├── package-lock.json
├── package.json
├── project.config.json
├── tsconfig.json
├── typings
│   ├── index.d.ts
│   └── types
```

```js
// pages/index/index.js
import init, { get_color_thief } from '../../pkg-miniprogram/color_thief_wasm'
await init('/pkg-miniprogram/color_thief_wasm_bg.wasm') // there must provide absolute path
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