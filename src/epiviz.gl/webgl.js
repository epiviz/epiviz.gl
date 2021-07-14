import { DEFAULT_CHANNELS, getDrawModeForTrack } from "./schema-processor";
import { colorSpecifierToHex } from "./utilities";

/**
 * A vertex shader meant to take in positions, colors, and contain uniforms for zooming and panning.
 */
const baseVertexShader = `#version 300 es
  precision highp float;

  in vec2 a_VertexPosition;

  uniform float pointSizeModifier;
  // [x1, y1,x2, y2] of viewing window
  uniform vec4 viewport;

  out vec4 vColor;
`;

/**
 * Appended to end of vertex shader. Includes math for zooming and panning,
 * ability to unpack colors and send to fragment shader.
 */
const vertexShaderSuffix = (opacityName, colorName, sizeName) => `
  vec3 unpackColor(float f) {
    vec3 colorVec;
    colorVec.r = floor(f / 65536.0);
    colorVec.g = floor((f - colorVec.r * 65536.0) / 256.0);
    colorVec.b = floor(f - colorVec.r * 65536.0 - colorVec.g * 256.0);
    return colorVec / 256.0;
  }

  void main(void) {
    // Subtract each vertex by midpoint of the viewport 
    // window to center points. Then scale by ratio of max window size to window size
    gl_Position = vec4(
       (a_VertexPosition.x - (viewport.z + viewport.x)/2.0) * 2.0/(viewport.z - viewport.x),
       (a_VertexPosition.y - (viewport.w + viewport.y)/2.0) * 2.0/(viewport.w - viewport.y),
        0,
        1
    );
    vec3 unpackedValues = unpackColor(${colorName});

    vColor = vec4(
      unpackedValues.rgb,
      ${opacityName}
    );
    gl_PointSize = ${sizeName} * pointSizeModifier;
  }
`;

/**
 * A fragment shader which chooses color simply passed to by vertex shader.
 */
const varyingColorsFragmentShader = `#version 300 es
  precision highp float;

  in vec4 vColor;

  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }
`;

class VertexShader {
  static SUPPORTED_CHANNEL_ATTRIBUTES = Object.freeze([
    "color",
    "size",
    "opacity",
  ]);

  /**
   * A class meant to contain all the relevant information for a shader program, such as uniforms
   * attributes, and ultimately the vertices. Do not use the constructor. Use VertexShader.fromSchema
   * or fromTrack instead.
   */
  constructor() {
    this.shader = baseVertexShader;
    this.uniforms = {};

    // Add position buffers here since x and y channels don't map nicely to shader code
    this.attributes = {
      a_VertexPosition: {
        numComponents: 2,
        data: [],
      },
    };
  }

  /**
   * Add a mark to the buffers by calculating its vertices, then adding its
   * attributes such as size, color, or opacity to the buffers.
   *
   * @param {Object} mark passed in from SchemaHelper in webgl-drawer.js
   * @param {VertexCalculator} vertexCalculator used to calculate vertices for a track
   */
  addMarkToBuffers(mark, vertexCalculator) {
    const vertices = vertexCalculator.calculateForMark(mark);
    this.attributes.a_VertexPosition.data.push(...vertices);

    for (const channel of Object.keys(this.attributes)) {
      if (channel === "a_VertexPosition") {
        // handled above
        continue;
      }

      for (let i = 0; i < vertices.length / 2; i++) {
        this.attributes[channel].data.push(mark[channel.substring(2)]); // Remove "a_" prefix
      }
    }

    this.lastMark = mark;
  }

  /**
   * Set the webgl draw mode to use
   * @param {String} drawMode
   */
  setDrawMode(drawMode) {
    this.drawMode = drawMode;
  }

  /**
   * Signify this channel varies from mark to mark, so build buffers to carry this info
   * for the program. Also add desclaration to shader code.
   *
   * @param {String} channel such as opacity, color, size
   * @param {Number} numComponents number of components of this attribute to pull in, usually 1
   * @returns this
   */
  addChannelBuffer(channel, numComponents = 1) {
    this.attributes[`a_${channel}`] = { numComponents, data: [] };
    this.shader += `in float a_${channel};\n`;
    return this;
  }

  /**
   * Signify this channel is the same for every mark, so set a uniform to refer to.
   *
   * @param {String} channel such as opacity, color, size
   * @param {Number} uniform value to set uniform to, must be a float
   * @returns this
   */
  setChannelUniform(channel, uniform) {
    this.uniforms[`u_${channel}`] = uniform;
    this.shader += `uniform float u_${channel};\n`;
    return this;
  }

  /**
   * Build the shader code after uniforms and attributes have been finalized.
   *
   * @returns shader code to compile
   */
  buildShader() {
    // Assumes color, opacity, size channels have been used in
    // addChannelBuffer or addChannelUniform
    if (this.built) {
      return this.shader;
    }

    const colorName = "a_color" in this.attributes ? "a_color" : "u_color";
    const opacityName =
      "a_opacity" in this.attributes ? "a_opacity" : "u_opacity";
    const sizeName = "a_size" in this.attributes ? "a_size" : "u_size";

    this.shader += vertexShaderSuffix(opacityName, colorName, sizeName);
    this.built = true;
    return this.shader;
  }

  /**
   * Construct the vertex shaders for each track in the schema.
   *
   * @param {Object} schema of visualization
   * @returns an array of {@link VertexShaders}s
   */
  static fromSchema(schema) {
    // Returns one per track
    return schema.tracks.map(VertexShader.fromTrack);
  }

  /**
   * Construct the vertex shader a track including setting attributes, uniforms, drawMode.
   *
   * @param {Object} track from schema
   * @returns a {@link VertexShaders}
   */
  static fromTrack(track) {
    // Given a track produce attributes and uniforms that describe a webgl drawing

    const vsBuilder = new VertexShader();
    vsBuilder.setDrawMode(getDrawModeForTrack(track));

    for (let channel of Object.keys(DEFAULT_CHANNELS)) {
      if (channel === "shape") {
        // Changes vertex positions and draw mode, does not change shader code
        continue;
      }
      if (channel in track) {
        // Schema specifies channel
        if (track[channel].value) {
          // Channel has default value
          if (channel === "color") {
            track[channel].value = colorSpecifierToHex(track[channel].value);
          }
          vsBuilder.setChannelUniform(channel, track[channel].value);
        } else {
          // Set Channel as attribute, x and y will always reach here
          if (channel === "y" || channel === "x") {
            // Skip for x and y as handled in constructor
            continue;
          }

          // These are currently the only supported channels for shader usage
          if (VertexShader.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) {
            vsBuilder.addChannelBuffer(
              channel,
              DEFAULT_CHANNELS[channel].numComponents
            );
          }
        }
      } else {
        // Channel not listed, set default
        if (VertexShader.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) {
          vsBuilder.setChannelUniform(channel, DEFAULT_CHANNELS[channel].value);
        }
      }
    }

    return vsBuilder;
  }
}

export { varyingColorsFragmentShader, VertexShader };
