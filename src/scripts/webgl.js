const varyingColorsVertexShader = `
  uniform lowp float pointSize;
  uniform lowp float opacity;

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
    gl_Position = aVertexPosition;
    vec3 unpackedValues = unpackColor(aVertexColor);

    vColor = vec4(
      unpackedValues.rgb,
      opacity
    );
    gl_PointSize = pointSize;
  }
`;

const varyingColorsFragmentShader = `
  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`;

export { varyingColorsVertexShader, varyingColorsFragmentShader };
