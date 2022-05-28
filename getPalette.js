const quantize = require('quantize');

function createPixelArray(imgData, pixelCount, quality) {
  const pixels = imgData;
  const pixelArray = [];
  for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
    offset = i * 4;
    r = pixels[offset + 0];
    g = pixels[offset + 1];
    b = pixels[offset + 2];
    a = pixels[offset + 3];
    if (a >= 125) {
      if (!(r > 250 && g > 250 && b > 250)) {
        pixelArray.push([r, g, b]);
      }
    }
  }
  return pixelArray;
}



function getPalette(img, colorCount, quality) {
  const pixelArray = createPixelArray(img, 64 * 64, quality);
  const cmap = quantize(pixelArray, colorCount);
  const palette = cmap ? cmap.palette() : null;

  return palette;

}

module.exports = {
  getPalette
}