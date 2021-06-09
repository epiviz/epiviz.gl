const vertexShader = `
  attribute vec4 aVertexPosition;

  void main() {
      gl_Position = aVertexPosition;
  }
`;

const squaresFragmentShader = `
  precision mediump float;
  uniform float uGridSize;
  uniform vec4 viewport;
  void main() {
    vec4 ndcPos;
    // Reverse calculations from window space to clip space (normalized device coordinates)
    ndcPos.xy = ((2.0 * gl_FragCoord.xy) - (2.0 * viewport.xy)) / (viewport.zw) - 1.0;
    ndcPos.xy = ndcPos.xy - mod(ndcPos.xy, 1.0 / uGridSize);
    gl_FragColor = vec4(ndcPos.x/2.0 + 0.5 , 0, ndcPos.y/2.0 + 0.5, 1.0);
  }
`;

const colorPointsVertexShader = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;

  varying lowp vec4 vColor;

  void main(void) {
    gl_Position = aVertexPosition;
    vColor = aVertexColor;
    gl_PointSize = 1.0;
  }
`;

const colorPointsFragmentShader = `
  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`;

export {
  vertexShader,
  squaresFragmentShader,
  colorPointsVertexShader,
  colorPointsFragmentShader,
};
