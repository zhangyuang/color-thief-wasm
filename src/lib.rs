mod utils;

use std::vec;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
use color_thief::{Color, ColorFormat};
use js_sys;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub fn color(colors: &[u8]) -> js_sys::Array {
    for i in colors {
        console_log!("{:?}", i)
    }
    let array = js_sys::Array::new();
    array.push(&JsValue::from_str("1"));
    // color_thief::get_palette(colors, ColorFormat::Rgb, 5, 5)
    //     .unwrap()
    //     .iter()
    //     .for_each(|x| {
    //         let Color { r, g, b } = x;
    //         let (r, g, b) = (
    //             JsValue::from_f64(r),
    //             JsValue::from_f64(g),
    //             JsValue::from_f64(b),
    //         );
    //         let arr = js_sys::Array::new();
    //         arr.push(&r);
    //         arr.push(&g);
    //         arr.push(&b);

    //         array.push(JsValue::f);
    //     });

    array
}
