/**
 * A vertex shader meant to take in positions and colors.
 */
const varyingColorsVertexShader = `
  uniform lowp float pointSize;
  uniform lowp float opacity;

  // [x1, y1,x2, y2] of viewing window
  uniform vec4 viewport;

  attribute vec4 aVertexPosition;
  attribute float aVertexColor;

  varying lowp vec4 vColor;

  vec3 unpackColor(float f) {
    vec3 color;
    color.r = floor(f / 65536.0);
    color.g = floor((f - color.r * 65536.0) / 256.0);
    color.b = floor(f - color.r * 65536.0 - color.g * 256.0);
    return color / 256.0;
  }

  void main(void) {
    // Subtract each vertex by midpoint of the viewport 
    // window to center points. Then scale by ratio of max window size to window size
    gl_Position = vec4(
       (aVertexPosition.x - (viewport.z + viewport.x)/2.0) * 2.0/(viewport.z - viewport.x),
       (aVertexPosition.y - (viewport.w + viewport.y)/2.0) * 2.0/(viewport.w - viewport.y),
        0,
        1
    );
    vec3 unpackedValues = unpackColor(aVertexColor);

    vColor = vec4(
      unpackedValues.rgb,
      opacity
    );
    gl_PointSize = pointSize;
  }
`;

/**
 * A fragment shader which chooses color simply passed to by vertex shader.
 */
const varyingColorsFragmentShader = `
  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`;

export { varyingColorsVertexShader, varyingColorsFragmentShader };
