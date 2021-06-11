(function () {
  class $096cbbd24171b95fe813134720003e1e$export$default {
    constructor(data) {
      this.canvas = data.canvas;
      this.width = data.canvas.width;
      this.height = data.canvas.height;
      this.receiveState(data);
    }
    receiveState(data) {
      this.minX = data.minX;
      this.maxX = data.maxX;
      this.minY = data.minY;
      this.maxY = data.maxY;
      this.currentXRange = [...data.currentXRange];
      this.currentYRange = [...data.currentYRange];
      this.needsAnimation = true;
    }
    tick() {}
    animate() {}
    render() {
      if (this.lastFrame) {
        // Avoid overlapping animation requests
        cancelAnimationFrame(this.lastFrame);
      }
    }
  }
  function $aa6955df6e83d0bfaadb4927ac8c0161$export$scale(domain, range) {
    const domainLength = domain[1] - domain[0];
    const rangeLength = range[1] - range[0];
    const slope = rangeLength / domainLength;
    const intercept = range[1] - slope * domain[1];
    return x => slope * x + intercept;
  }
  function $aa6955df6e83d0bfaadb4927ac8c0161$export$loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Could not compile shader: ${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
  function $aa6955df6e83d0bfaadb4927ac8c0161$export$initShaderProgram(gl, vertexSource, fragmentSource) {
    const vertexShader = $aa6955df6e83d0bfaadb4927ac8c0161$export$loadShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = $aa6955df6e83d0bfaadb4927ac8c0161$export$loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
      return null;
    }
    return shaderProgram;
  }
  function $aa6955df6e83d0bfaadb4927ac8c0161$var$componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  function $aa6955df6e83d0bfaadb4927ac8c0161$export$rgbToHex(r, g, b) {
    return parseInt(Number("0x" + $aa6955df6e83d0bfaadb4927ac8c0161$var$componentToHex(r) + $aa6955df6e83d0bfaadb4927ac8c0161$var$componentToHex(g) + $aa6955df6e83d0bfaadb4927ac8c0161$var$componentToHex(b)), 10);
  }
  const $d4db4b0835c4c7737bdcc08b6fbcb412$export$vertexShader = `
  attribute vec4 aVertexPosition;

  void main() {
      gl_Position = aVertexPosition;
  }
`;
  const $d4db4b0835c4c7737bdcc08b6fbcb412$export$squaresFragmentShader = `
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
  const $d4db4b0835c4c7737bdcc08b6fbcb412$export$colorPointsVertexShader = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;

  varying lowp vec4 vColor;

  void main(void) {
    gl_Position = aVertexPosition;
    vColor = aVertexColor;
    gl_PointSize = 1.0;
  }
`;
  const $d4db4b0835c4c7737bdcc08b6fbcb412$export$colorPointsFragmentShader = `
  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`;
  // Largely taken from
  // https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample2/webgl-demo.js
  class $0c18ffc750436f069dcee349fd830c62$export$default extends $096cbbd24171b95fe813134720003e1e$export$default {
    constructor(data) {
      super(data);
      this.gl = this.canvas.getContext("webgl");
      if (!this.gl) {
        console.error("Unable to initialize WebGL!");
        return;
      }
      // Specific to t-SNE Dataset
      this.sampleColors = new Map(// Create colors for sample type
      ("ABCDEFGHIJKLMNOPQRSTUVWXYZ012").split("").map(letter => [letter, [Math.random(), Math.random(), Math.random(), 0.01]]));
      this.xTSNEScale = $aa6955df6e83d0bfaadb4927ac8c0161$export$scale([-10, 10], [-1, 1]);
      this.yTSNEScale = $aa6955df6e83d0bfaadb4927ac8c0161$export$scale([-10, 10], [-1, 1]);
      this.positions = [];
      this.colors = [];
    }
    getWebGLViewport() {
      // Calculate appropriate webgl viewport given current selection window
      const windowWidth = this.currentXRange[1] - this.currentXRange[0];
      const windowHeight = this.currentYRange[1] - this.currentYRange[0];
      const displayAsIfThisWide = (this.maxX - this.minX) / windowWidth * this.width;
      const displayAsIfThisHigh = (this.maxY - this.minY) / windowHeight * this.height;
      const scaleXWindowSpace = $aa6955df6e83d0bfaadb4927ac8c0161$export$scale([this.minX, this.maxX], [0, -displayAsIfThisWide]);
      const scaleYWindowSpace = $aa6955df6e83d0bfaadb4927ac8c0161$export$scale([this.minY, this.maxY], [0, -displayAsIfThisHigh]);
      const toReturnX = scaleXWindowSpace(this.currentXRange[0]);
      const toReturnY = scaleYWindowSpace(this.currentYRange[0]);
      return [toReturnX, toReturnY, displayAsIfThisWide, displayAsIfThisHigh];
    }
    populateBuffers(data) {
      // Given raw data, populate the buffers
      // Specific to t-SNE data
      console.log(data);
      data.split("\n").forEach(line => {
        const parts = line.split(",");
        const x = parseFloat(parts[1]);
        const y = parseFloat(parts[2]);
        if (!parts[0] || !x || !y) {
          return;
        }
        this.positions.push(this.xTSNEScale(x), this.yTSNEScale(y));
        console.log(parts);
        console.log(this.sampleColors.get(parts[0]));
        this.colors.push(...this.sampleColors.get(parts[0]));
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
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_COLOR, this.gl.DST_COLOR);
      // Clear the canvas before we start drawing on it.
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      const viewport = this.getWebGLViewport();
      this.gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
      this.gl.drawArrays(this.gl.POINTS, 0, // stride
      this.vertexCount);
      this.needsAnimation = false;
      this.lastFrame = requestAnimationFrame(this.animate.bind(this));
      this.tick();
    }
    render() {
      super.render();
      this.shaderProgram = $aa6955df6e83d0bfaadb4927ac8c0161$export$initShaderProgram(this.gl, $d4db4b0835c4c7737bdcc08b6fbcb412$export$colorPointsVertexShader, $d4db4b0835c4c7737bdcc08b6fbcb412$export$colorPointsFragmentShader);
      this.programInfo = {
        program: this.shaderProgram,
        attribLocations: {
          vertexPosition: this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition"),
          vertexColor: this.gl.getAttribLocation(this.shaderProgram, "aVertexColor")
        }
      };
      // this.positions and this.colors populated by populateBuffers method used in Handler
      this.vertexCount = this.positions.length / 2;
      this.positionBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
      this.colorBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.colors), this.gl.STATIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, // numComponents
      this.gl.FLOAT, // type
      false, // normalize
      0, // stride
      0);
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexColor, 4, // numComponents
      this.gl.FLOAT, // type
      false, // normalize
      0, // stride
      0);
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);
      this.gl.useProgram(this.programInfo.program);
      if (this.lastFrame) {
        cancelAnimationFrame(this.lastFrame);
      }
      this.needsAnimation = true;
      this.animate();
    }
  }
  class $587f3b939a351f7416b8a5ab7e7e2081$var$OffscreenWebGLDrawer extends $0c18ffc750436f069dcee349fd830c62$export$default {
    tick() {
      postMessage({
        type: "tick"
      });
    }
  }
  self.onmessage = message => {
    switch (message.data.type) {
      case "init":
        self.drawer = new $587f3b939a351f7416b8a5ab7e7e2081$var$OffscreenWebGLDrawer(message.data);
        break;
      case "state":
        self.drawer.receiveState(message.data);
        break;
      case "render":
        self.drawer.receiveState(message.data);
        self.drawer.render();
        break;
      case "buffer":
        self.drawer.populateBuffers(message.data.responseData);
        break;
      case "clearBuffers":
        self.drawer.clearBuffers();
        break;
      default:
        console.error(`Received unknown message type: ${message.type}`);
    }
  };
})();

//# sourceMappingURL=offscreen-webgl-worker.3905f97a.js.map
