import Drawer from "./drawer";
import SchemaProcessor from "./schema-processor";
import { scale } from "./utilities";
import calculateVerticesForMark from "./vertex-calculator";

import { VertexShaderBuilder, varyingColorsFragmentShader } from "./webgl.js";

const twgl = require("twgl.js");

// Largely taken from
// https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample2/webgl-demo.js

class WebGLCanvasDrawer extends Drawer {
  constructor(viewportData) {
    super(viewportData);

    this.gl = this.canvas.getContext("webgl2", {
      // Setting these to false makes webgl handle more like opengl
      // Source: https://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html
      alpha: false,
      premultipliedAlpha: false,
    });

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
    super.render(); // Cancels current animation frame

    // Populate buffers needs a trackShader built to know what buffers to fill and uniforms to set
    this.trackShaders = VertexShaderBuilder.fromSchema(schema);
    this.trackShaders.forEach(
      // Add position buffers here since x and y channels don't map nicely to shader code
      (trackShader) =>
        (trackShader.attributes.aVertexPosition = {
          numComponents: 2,
          data: [],
        })
    );

    new SchemaProcessor(schema, this.populateBuffersAndSetUniforms.bind(this));
  }

  addMarkToBuffers(mark, markType, trackShader) {
    const vertices = calculateVerticesForMark(
      mark,
      markType,
      trackShader.drawMode,
      this.lastMark
    );

    let isX = false; // alternatively map vertex coordinates to clip space
    trackShader.attributes.aVertexPosition.data.push(
      ...vertices.map((coord) => {
        isX = !isX;
        if (isX) return this.xScale(coord);
        return this.yScale(coord);
      })
    );

    for (const channel of Object.keys(mark)) {
      if (channel === "x" || channel === "y" || channel === "shape") {
        continue; // x and y is handled above and shape is not seen by shader
      } else if (channel in trackShader.attributes) {
        // If we are adding triangles, they will need these attributes set for each vertex
        for (let i = 0; i < vertices.length / 2; i++) {
          trackShader.attributes[channel].data.push(mark[channel]);
        }
      }
    }
    this.lastMark = mark;
  }

  populateBuffersAndSetUniforms(schemaHelper) {
    let currentTrack = schemaHelper.getNextTrack();
    let currenttrackShaderIndex = 0;
    this.lastMark = undefined; // Used by area charts, needs to note we are in a new schema

    while (currentTrack) {
      let currentMark = currentTrack.getNextMark();

      while (currentMark) {
        this.addMarkToBuffers(
          currentMark,
          currentTrack.track.mark,
          this.trackShaders[currenttrackShaderIndex]
        );

        currentMark = currentTrack.getNextMark();
      }

      currentTrack = schemaHelper.getNextTrack();
      currenttrackShaderIndex++;
    }

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
    this.globalUniforms.viewport = new Float32Array(viewport.slice(0, 4));
    this.globalUniforms.pointSizeModifier = viewport[4];

    this.trackShaders.forEach((trackShader, index) => {
      this.gl.useProgram(this.programInfos[index].program);

      twgl.setUniforms(this.programInfos[index], {
        ...this.globalUniforms,
        ...trackShader.uniforms,
      });
    });

    // Clear the canvas before we start drawing on it.
    this.gl.clearColor(1, 1, 1, 1);

    // Set the blending function
    // Blend functions are weird, play with them:
    // https://mrdoob.github.io/webgl-blendfunctions/blendfunc.html
    // http://www.andersriggelsen.dk/glblendfunc.php
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.trackShaders.forEach((trackShader, index) => {
      this.gl.useProgram(this.programInfos[index].program);
      twgl.setBuffersAndAttributes(
        this.gl,
        this.programInfos[index],
        this.bufferInfos[index]
      );
      twgl.drawBufferInfo(
        this.gl,
        this.bufferInfos[index],
        this.gl[trackShader.drawMode],
        trackShader.attributes.aVertexPosition.data.length / 2
      );
    });

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

    this.programInfos = this.trackShaders.map((trackShader) =>
      twgl.createProgramInfo(this.gl, [
        trackShader.buildShader(),
        varyingColorsFragmentShader,
      ])
    );

    this.globalUniforms = {
      viewport: new Float32Array([-1, -1, 1, 1]),
      pointSizeModifier: 1,
    };

    this.bufferInfos = this.trackShaders.map((trackShader) =>
      twgl.createBufferInfoFromArrays(this.gl, trackShader.attributes)
    );

    this.needsAnimation = true;
    this.animate();
  }
}

export default WebGLCanvasDrawer;
