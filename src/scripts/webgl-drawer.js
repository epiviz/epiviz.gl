import Drawer from "./drawer";
import SchemaProcessor from "./schema-processor";
import { scale } from "./utilities";

import { VertexShaderBuilder, varyingColorsFragmentShader } from "./webgl.js";

const twgl = require("twgl.js");

// Largely taken from
// https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample2/webgl-demo.js

class WebGLCanvasDrawer extends Drawer {
  constructor(viewportData) {
    super(viewportData);

    this.gl = this.canvas.getContext("webgl");

    if (!this.gl) {
      console.error("Unable to initialize WebGL!");
      return;
    }
  }

  receiveViewport(viewportData) {
    super.receiveViewport(viewportData);
    this.xScale = scale([this.minX, this.maxX], [-1, 1]);
    this.yScale = scale([this.minY, this.maxY], [-1, 1]);
  }

  /**
   * Calculates the viewport for this.gl.viewport to control zooming. Also calculates point size.
   * @returns Array of 5 elements, first 4 are viewport parameters, last is pointSizeMultiplier:
   *   [xOffset, yOffset, displayAsIfThisWide, displayAsIfThisHigh, pointSizeMultiplier]
   */
  getWebGLViewport() {
    // Calculate appropriate webgl viewport given current selection window

    // Transform current data coordinates to GPU cordinates
    const scaleXWindowSpace = scale([this.minX, this.maxX], [-1, 1]);
    const scaleYWindowSpace = scale([this.minY, this.maxY], [-1, 1]);

    // Multiply point size by the ratio of max dimension and current width
    const pointSize = Math.max(
      1,
      Math.min(
        1 /
          (scaleXWindowSpace(this.currentXRange[1]) -
            scaleXWindowSpace(this.currentXRange[0])),
        1 /
          (scaleYWindowSpace(this.currentYRange[1]) -
            scaleYWindowSpace(this.currentYRange[0]))
      )
    );
    // Return [x1, y1, x2, y2] and pointsize, camera corners coordinates in GPU space
    // Which becomes uniform in vertex shader
    return [
      scaleXWindowSpace(this.currentXRange[0]),
      scaleYWindowSpace(this.currentYRange[0]),
      scaleXWindowSpace(this.currentXRange[1]),
      scaleYWindowSpace(this.currentYRange[1]),
      pointSize,
    ];
  }

  setSchema(schema) {
    this.positions = [];

    // Populate buffers needs a schemaShader built to know what buffers to fill and uniforms to set
    this.schemaShader = VertexShaderBuilder.fromSchema(schema)[0];

    new SchemaProcessor(schema, this.populateBuffersAndSetUniforms.bind(this));
  }

  addMarkToBuffers(mark) {
    for (const channel of Object.keys(mark)) {
      if (channel === "y" || channel === "shape") {
        continue; // y is handled during "x" case and shape is not seen by shader
      } else if (channel === "x") {
        this.positions.push(this.xScale(mark.x), this.yScale(mark.y));
      } else if (channel in this.schemaShader.attributes) {
        this.schemaShader.attributes[channel].data.push(mark[channel]);
      }
    }
  }

  populateBuffersAndSetUniforms(schemaHelper) {
    let currentTrack = schemaHelper.getNextTrack();
    while (currentTrack) {
      let currentMark = currentTrack.getNextMark();
      while (currentMark) {
        this.addMarkToBuffers(currentMark);
        currentMark = currentTrack.getNextMark();
      }
      currentTrack = schemaHelper.getNextTrack();
    }
    console.log(this.schemaShader);
    // for (const channel of Object.keys(this.schemaShader.uniforms)) {
    //   this.schemaShader.uniforms[channel] = mark[channel];
    // }

    this.render();
  }

  /**
   * Animates the frames by setting viewport, blending, clearing, and calling webgl draw.
   */
  animate() {
    if (!this.needsAnimation) {
      this.lastFrame = requestAnimationFrame(this.animate.bind(this));
      this.tick();
      return;
    }

    const viewport = this.getWebGLViewport();

    twgl.setUniforms(this.programInfo, {
      viewport: new Float32Array(viewport.slice(0, 4)),
      pointSizeModifier: viewport[4],
      ...this.schemaShader.uniforms,
    });

    // Set the blending function
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_COLOR, this.gl.DST_COLOR);

    // Clear the canvas before we start drawing on it.
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    twgl.drawBufferInfo(
      this.gl,
      this.bufferInfo,
      this.gl.POINTS,
      this.positions.length / 2
    );

    this.needsAnimation = false;
    this.lastFrame = requestAnimationFrame(this.animate.bind(this));
    this.tick();
  }

  /**
   * Prepares animation by compiling shaders, setting uniforms, constructing buffers,
   * and handling additional boilerplate.
   */
  render() {
    super.render();

    console.log(this.schemaShader);
    this.programInfo = twgl.createProgramInfo(this.gl, [
      this.schemaShader.buildShader(),
      varyingColorsFragmentShader,
    ]);

    this.attributes = {
      aVertexPosition: { numComponents: 2, data: this.positions },
      ...this.schemaShader.attributes,
    };

    this.uniforms = {
      ...this.schemaShader.uniforms,
      viewport: new Float32Array([-1, -1, 1, 1]),
      pointsModifier: 1,
    };

    console.log(this.uniforms);

    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.attributes);

    this.gl.useProgram(this.programInfo.program);

    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);

    this.needsAnimation = true;
    this.animate();
  }
}

export default WebGLCanvasDrawer;
