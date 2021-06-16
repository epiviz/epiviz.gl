import Drawer from "./drawer";
import { scale, initShaderProgram, deserialize } from "./utilities";
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

  receiveState(viewportData) {
    super.receiveState(viewportData);
    this.xScale = scale([this.minX, this.maxX], [-1, 1]);
    this.yScale = scale([this.minY, this.maxY], [-1, 1]);
  }

  getWebGLViewport() {
    // Calculate appropriate webgl viewport given current selection window
    const windowWidth = this.currentXRange[1] - this.currentXRange[0];
    const windowHeight = this.currentYRange[1] - this.currentYRange[0];

    const displayAsIfThisWide =
      ((this.maxX - this.minX) / windowWidth) * this.width;
    const displayAsIfThisHigh =
      ((this.maxY - this.minY) / windowHeight) * this.height;

    if (
      displayAsIfThisWide > this.maxWidth ||
      displayAsIfThisHigh > this.maxHeight
    ) {
      return;
    }

    const scaleXWindowSpace = scale(
      [this.minX, this.maxX],
      [0, -displayAsIfThisWide]
    );
    const scaleYWindowSpace = scale(
      [this.minY, this.maxY],
      [0, -displayAsIfThisHigh]
    );

    const toReturnX = scaleXWindowSpace(this.currentXRange[0]);
    const toReturnY = scaleYWindowSpace(this.currentYRange[0]);

    const pointSize = Math.max(
      1,
      Math.min(
        -Math.log2(windowWidth / (this.maxX - this.minX)),
        -Math.log2(windowHeight / (this.maxY - this.minY))
      )
    );

    return [
      toReturnX,
      toReturnY,
      displayAsIfThisWide,
      displayAsIfThisHigh,
      pointSize,
    ];
  }

  populateBuffers(data) {
    // Given raw data, populate the buffers

    const mapPointToSpace = deserialize(data.mapPointToSpace);
    const mapPointToColor = deserialize(data.mapPointToColor);
    data.data.forEach((row) => {
      const inSpace = mapPointToSpace(row);
      const asColor = mapPointToColor(row);
      this.positions.push(this.xScale(inSpace[0]), this.yScale(inSpace[1]));
      this.colors.push(asColor);
    });
  }

  clearBuffers() {
    this.positions = [];
    this.colors = [];
  }

  animate() {
    if (!this.needsAnimation) {
      this.lastFrame = requestAnimationFrame(this.animate.bind(this));
      this.tick();
      return;
    }

    const viewport = this.getWebGLViewport();
    if (viewport) {
      this.gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
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
