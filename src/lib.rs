mod utils;

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
use utils::set_panic_hook;
fn pre_process(img: &[u8], pixel_count: i32, quality: i32) -> Vec<u8> {
    let mut pixel_arr = vec![];
    let mut i = 0;

    while i < pixel_count {
        let offset = i * 4;
        if offset + 3 > img.len() as i32 {
            break;
        }
        let r = img[(offset + 0) as usize];
        let g = img[(offset + 1) as usize];
        let b = img[(offset + 2) as usize];
        let a = img[(offset + 3) as usize];
        if a >= 125 && (!(r > 250 && g > 250 && b > 250)) {
            pixel_arr.push(r);
            pixel_arr.push(g);
            pixel_arr.push(b);
        }
        i += quality;
    }
    pixel_arr
}

#[wasm_bindgen]
pub fn get_color_thief(
    colors: &[u8],
    pixel_count: i32,
    quality: u8,
    colors_count: u8,
) -> js_sys::Array {
    set_panic_hook();
    let colors = pre_process(colors, pixel_count, quality as i32);
    let colors: &[u8] = colors.as_slice();
    let array = color_thief::get_palette(colors, ColorFormat::Rgb, quality, colors_count)
        .unwrap()
        .iter()
        .map(|x| {
            let Color { r, g, b } = *x;
            let (r, g, b) = (
                JsValue::from(r),
                JsValue::from(g),
                JsValue::from(b),
            );
            let color_palette = js_sys::Array::new();
            color_palette.push(&r);
            color_palette.push(&g);
            color_palette.push(&b);
            color_palette
        }).collect::<js_sys::Array>();
    array
}
