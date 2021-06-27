import Drawer from "./drawer";
import SchemaProcessor from "./schema-processor";
import { scale } from "./utilities";

import {
  varyingColorsVertexShader,
  varyingColorsFragmentShader,
} from "./webgl.js";

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

    this.positions = [];
    this.colors = [];
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
    this.clearBuffers();
    new SchemaProcessor(schema, this.populateBuffers.bind(this));
  }

  addMarkToBuffers(mark) {
    this.positions.push(this.xScale(mark.x), this.yScale(mark.y));
    this.colors.push(mark.color);
  }

  populateBuffers(schemaHelper) {
    let currentTrack = schemaHelper.getNextTrack();
    while (currentTrack) {
      let currentMark = currentTrack.getNextMark();
      while (currentMark) {
        this.addMarkToBuffers(currentMark);
        currentMark = currentTrack.getNextMark();
      }
      currentTrack = schemaHelper.getNextTrack();
    }

    this.render();
  }

  /**
   * Clear the rendering buffers.
   */
  clearBuffers() {
    this.positions = [];
    this.colors = [];
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
    if (viewport) {
      this.uniforms.viewport = new Float32Array(viewport.slice(0, 4));
      this.uniforms.pointSize = viewport[4];
      twgl.setUniforms(this.programInfo, this.uniforms);
    }

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

    this.programInfo = twgl.createProgramInfo(this.gl, [
      varyingColorsVertexShader,
      varyingColorsFragmentShader,
    ]);

    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, {
      aVertexPosition: { numComponents: 2, data: this.positions },
      aVertexColor: { numComponents: 1, data: this.colors },
    });

    this.uniforms = {
      pointSize: 1,
      opacity: 0.05,
      viewport: new Float32Array([-1, -1, 1, 1]),
    };

    this.gl.useProgram(this.programInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);

    twgl.setUniforms(this.programInfo, this.uniforms);
    this.needsAnimation = true;
    this.animate();
  }
}

export default WebGLCanvasDrawer;
