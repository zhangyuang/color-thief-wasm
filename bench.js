const b = require('benny')
const { getPalette } = require('./getPalette')
const { get_color_thief } = require('./pkg/color_thief_wasm.js')
const { data } = require('./tests/mock')

async function run() {
  await b.suite(
    'GetColorThief',

    b.add('Wasm GetColorThief', () => {
      get_color_thief(data, 64 * 64, 10, 5)
    }),

    b.add('JavaScript GetColorThief', () => {
      getPalette(data, 5, 10)
    }),

    b.cycle(),
    b.complete()
  )
}

run().catch((e) => {
  console.error(e)
})