import Drawer from "./drawer";
import { scale, initShaderProgram, rgbToHex } from "./utilities";
import {
  varyingColorsVertexShader,
  varyingColorsFragmentShader,
} from "./webgl.js";

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
   * @returns Array of 5 elements, first 4 are viewport parameters, last is pointSize:
   *   [xOffset, yOffset, displayAsIfThisWide, displayAsIfThisHigh, pointSize]
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

  /**
   * Populates the buffers needed for rendering points.
   *
   * @param {Object} data with keys for data, mapPointToSpace, mapPointToColor
   */
  populateBuffers(data) {
    // Given raw data, populate the buffers
    const mapPointToSpace = data.mapPointToSpace;
    const mapPointToColor = data.mapPointToColor;

    if (data.options && data.options.colorMapIsCategorical) {
      let colorMap = new Map();
      data.data.forEach((row) => {
        const colorCategory = mapPointToColor(row);
        if (!colorMap.has(colorCategory)) {
          colorMap.set(
            colorCategory,
            rgbToHex(
              Math.floor(255 * Math.random()),
              Math.floor(255 * Math.random()),
              Math.floor(255 * Math.random())
            )
          );
        }
        this.colors.push(colorMap.get(colorCategory));
      });
    } else {
      data.data.forEach((row) => {
        const asColor = mapPointToColor(row);
        this.colors.push(asColor);
      });
    }

    data.data.forEach((row) => {
      const inSpace = mapPointToSpace(row);
      this.positions.push(this.xScale(inSpace[0]), this.yScale(inSpace[1]));
    });
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
      this.gl.uniform4fv(
        this.programInfo.uniformLocations.viewport,
        new Float32Array(viewport.slice(0, 4))
      );

      this.gl.uniform1f(
        this.programInfo.uniformLocations.pointSize,
        viewport[4]
      );
    }

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_COLOR, this.gl.DST_COLOR);

    // Clear the canvas before we start drawing on it.
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.drawArrays(
      this.gl.POINTS,
      0, // stride
      this.vertexCount // vertex count
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

    this.maxWidth = this.gl.getParameter(this.gl.MAX_VIEWPORT_DIMS)[0];
    this.maxHeight = this.gl.getParameter(this.gl.MAX_VIEWPORT_DIMS)[1];

    this.shaderProgram = initShaderProgram(
      this.gl,
      varyingColorsVertexShader,
      varyingColorsFragmentShader
    );

    this.programInfo = {
      program: this.shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(
          this.shaderProgram,
          "aVertexPosition"
        ),
        vertexColor: this.gl.getAttribLocation(
          this.shaderProgram,
          "aVertexColor"
        ),
      },
      uniformLocations: {
        pointSize: this.gl.getUniformLocation(this.shaderProgram, "pointSize"),
        opacity: this.gl.getUniformLocation(this.shaderProgram, "opacity"),
        viewport: this.gl.getUniformLocation(this.shaderProgram, "viewport"),
      },
    };

    // this.positions and this.colors populated by populateBuffers method used in Handler
    this.vertexCount = this.positions.length / 2;
    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.positions),
      this.gl.STATIC_DRAW
    );

    this.colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.colors),
      this.gl.STATIC_DRAW
    );

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.vertexAttribPointer(
      this.programInfo.attribLocations.vertexPosition,
      2, // numComponents
      this.gl.FLOAT, // type
      false, // normalize
      0, // stride
      0 // offset
    );
    this.gl.enableVertexAttribArray(
      this.programInfo.attribLocations.vertexPosition
    );

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.vertexAttribPointer(
      this.programInfo.attribLocations.vertexColor,
      1, // numComponents
      this.gl.FLOAT, // type
      false, // normalize
      0, // stride
      0 // offset
    );
    this.gl.enableVertexAttribArray(
      this.programInfo.attribLocations.vertexColor
    );

    this.gl.useProgram(this.programInfo.program);

    this.gl.uniform1f(this.programInfo.uniformLocations.opacity, 0.1);
    this.needsAnimation = true;
    this.animate();
  }
}

export default WebGLCanvasDrawer;
