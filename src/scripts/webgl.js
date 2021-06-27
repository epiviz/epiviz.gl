import { DEFAULT_CHANNELS } from "./schema-processor";

/**
 * A vertex shader meant to take in positions and colors.
 */
const baseVertexShader = `
  precision mediump float;

  attribute vec2 aVertexPosition;

  uniform float pointSizeModifier;
  // [x1, y1,x2, y2] of viewing window
  uniform vec4 viewport;

  varying vec4 vColor;
`;

const vertexShaderSuffix = `
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
    vec3 unpackedValues = unpackColor(color);

    vColor = vec4(
      unpackedValues.rgb,
      opacity
    );
    gl_PointSize = size * pointSizeModifier;
  }
`;

/**
 * A fragment shader which chooses color simply passed to by vertex shader.
 */
const varyingColorsFragmentShader = `
  varying mediump vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`;

class VertexShaderBuilder {
  constructor() {
    this.shader = baseVertexShader;
    this.uniforms = {};
    this.attributes = {};
  }

  addChannelBuffer(channel, numComponents = 1) {
    this.attributes[channel] = { numComponents, data: [] };
    this.shader += `attribute float ${channel};\n`;
  }

  setChannelUniform(channel, uniform) {
    this.uniforms[channel] = uniform;
    this.shader += `uniform float ${channel};\n`;
    return this;
  }

  buildShader() {
    // Assumes color, opacity, size channels have been used in
    // addChannelBuffer or addChannelUniform
    if (this.built) {
      return this.shader;
    }
    this.shader += vertexShaderSuffix;
    this.built = true;
    return this.shader;
  }

  getShaderDetails() {}

  static fromSchema(schema) {
    // Returns one per track
    return schema.tracks.map(VertexShaderBuilder.fromTrack);
  }

  static fromTrack(track) {
    // Given a track produce attributes and uniforms that describe a webgl drawing

    const vsBuilder = new VertexShaderBuilder();
    for (let channel of Object.keys(DEFAULT_CHANNELS)) {
      if (channel === "shape") {
        // Changes vertex positions and draw mode, does not change shader code
        continue;
      }
      if (channel in track) {
        // Schema specifies channel
        if (track[channel].value) {
          // Channel has default value
          vsBuilder.setChannelUniform(channel, track[channel].value);
        } else {
          // Set Channel as attribute, x and y will always reach here
          if (channel === "y" || channel === "x") {
            // Skip for x and y as handled in the webgl-drawer
            continue;
          }
          vsBuilder.addChannelBuffer(
            channel,
            DEFAULT_CHANNELS[channel].numComponents
          );
        }
      } else {
        // Channel not listed, set default
        vsBuilder.setChannelUniform(channel, DEFAULT_CHANNELS[channel].value);
      }
    }

    return vsBuilder;
  }
}

export { varyingColorsFragmentShader, VertexShaderBuilder };
