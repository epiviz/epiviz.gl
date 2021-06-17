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
 * Loads a shader.
 *
 * @param {WebGLRenderingContext} gl webgl rendering context
 * @param {gl.VERTEX_SHADER or gl.FRAGMENT_SHADER} type of shader
 * @param {String} source of the shader
 * @returns compiled shader
 */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`Could not compile shader: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Initialize a shader program.
 *
 * @param {WebGLRenderingContext} gl webgl rendering context
 * @param {String} vertexSource source of the vertex shader
 * @param {String} fragmentSource source of the fragment shader
 * @returns a complete shader program
 */
function initShaderProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
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

export { scale, initShaderProgram, loadShader, rgbToHex, deserialize };
