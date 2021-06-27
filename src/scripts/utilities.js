/**
 * Returns a linear scale to map elements in domain to elements in range.
 * @param {Array} domain array of length two containing minimum and maximum values
 * @param {Array} range array of length two containing minimum and maximum values
 * @returns linear scale mapping domain to range
 */
function scale(domain, range) {
  const domainLength = domain[1] - domain[0];
  const rangeLength = range[1] - range[0];
  const slope = rangeLength / domainLength;
  const intercept = range[1] - slope * domain[1];
  return (x) => slope * x + intercept;
}

/**
 * Maps RGB values to integer for webgl buffer.
 *
 * @param {Integer} red value from 0 to 255
 * @param {Integer} green value from 0 to 255
 * @param {Integer} blue value from 0 to 255
 * @returns RGB hex value as integer
 */
function rgbToHex(red, green, blue) {
  return (red << 16) | (green << 8) | (blue << 0);
}

/**
 * Recommended by serialize-js https://github.com/yahoo/serialize-javascript#deserializing
 *
 * @param {String} serializedJavascript from "serialize-js"
 * @returns deserialized JavaScript
 */
function deserialize(serializedJavascript) {
  return eval("(" + serializedJavascript + ")");
}

export { scale, rgbToHex, deserialize };
