// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"QHfG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Drawer =
/*#__PURE__*/
function () {
  function Drawer(data) {
    _classCallCheck(this, Drawer);

    this.canvas = data.canvas;
    this.width = data.canvas.width;
    this.height = data.canvas.height;
    this.receiveState(data);
  }

  _createClass(Drawer, [{
    key: "receiveState",
    value: function receiveState(data) {
      this.minX = data.minX;
      this.maxX = data.maxX;
      this.minY = data.minY;
      this.maxY = data.maxY;
      this.currentXRange = _toConsumableArray(data.currentXRange);
      this.currentYRange = _toConsumableArray(data.currentYRange);
      this.needsAnimation = true;
    }
  }, {
    key: "tick",
    value: function tick() {}
  }, {
    key: "animate",
    value: function animate() {}
  }, {
    key: "render",
    value: function render() {
      if (this.lastFrame) {
        // Avoid overlapping animation requests
        cancelAnimationFrame(this.lastFrame);
      }
    }
  }]);

  return Drawer;
}();

var _default = Drawer;
exports.default = _default;
},{}],"DFiv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scale = scale;
exports.initShaderProgram = initShaderProgram;
exports.loadShader = loadShader;
exports.rgbToHex = rgbToHex;

function scale(domain, range) {
  var domainLength = domain[1] - domain[0];
  var rangeLength = range[1] - range[0];
  var slope = rangeLength / domainLength;
  var intercept = range[1] - slope * domain[1];
  return function (x) {
    return slope * x + intercept;
  };
}

function loadShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Could not compile shader: ".concat(gl.getShaderInfoLog(shader)));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initShaderProgram(gl, vertexSource, fragmentSource) {
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("Unable to initialize the shader program: ".concat(gl.getProgramInfoLog(shaderProgram)));
    return null;
  }

  return shaderProgram;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return parseInt(Number("0x" + componentToHex(r) + componentToHex(g) + componentToHex(b)), 10);
}
},{}],"j7dC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorPointsFragmentShader = exports.colorPointsVertexShader = exports.squaresFragmentShader = exports.vertexShader = void 0;
var vertexShader = "\n  attribute vec4 aVertexPosition;\n\n  void main() {\n      gl_Position = aVertexPosition;\n  }\n";
exports.vertexShader = vertexShader;
var squaresFragmentShader = "\n  precision mediump float;\n  uniform float uGridSize;\n  uniform vec4 viewport;\n  void main() {\n    vec4 ndcPos;\n    // Reverse calculations from window space to clip space (normalized device coordinates)\n    ndcPos.xy = ((2.0 * gl_FragCoord.xy) - (2.0 * viewport.xy)) / (viewport.zw) - 1.0;\n    ndcPos.xy = ndcPos.xy - mod(ndcPos.xy, 1.0 / uGridSize);\n    gl_FragColor = vec4(ndcPos.x/2.0 + 0.5 , 0, ndcPos.y/2.0 + 0.5, 1.0);\n  }\n";
exports.squaresFragmentShader = squaresFragmentShader;
var colorPointsVertexShader = "\n  attribute vec4 aVertexPosition;\n  attribute vec4 aVertexColor;\n\n  varying lowp vec4 vColor;\n\n  void main(void) {\n    gl_Position = aVertexPosition;\n    vColor = aVertexColor;\n    gl_PointSize = 1.0;\n  }\n";
exports.colorPointsVertexShader = colorPointsVertexShader;
var colorPointsFragmentShader = "\n  varying lowp vec4 vColor;\n\n  void main(void) {\n    gl_FragColor = vColor;\n  }\n";
exports.colorPointsFragmentShader = colorPointsFragmentShader;
},{}],"83PL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drawer = _interopRequireDefault(require("./drawer"));

var _utilities = require("./utilities");

var _webgl = require("./webgl.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// Largely taken from
// https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample2/webgl-demo.js
var WebGLCanvasDrawer =
/*#__PURE__*/
function (_Drawer) {
  _inherits(WebGLCanvasDrawer, _Drawer);

  var _super = _createSuper(WebGLCanvasDrawer);

  function WebGLCanvasDrawer(data) {
    var _this;

    _classCallCheck(this, WebGLCanvasDrawer);

    _this = _super.call(this, data);
    _this.gl = _this.canvas.getContext("webgl");

    if (!_this.gl) {
      console.error("Unable to initialize WebGL!");
      return _possibleConstructorReturn(_this);
    } // Specific to t-SNE Dataset


    _this.sampleColors = new Map( // Create colors for sample type
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ012".split("").map(function (letter) {
      return [letter, [Math.random(), Math.random(), Math.random(), 0.01]];
    }));
    _this.xTSNEScale = (0, _utilities.scale)([-10, 10], [-1, 1]);
    _this.yTSNEScale = (0, _utilities.scale)([-10, 10], [-1, 1]);
    _this.positions = [];
    _this.colors = [];
    return _this;
  }

  _createClass(WebGLCanvasDrawer, [{
    key: "getWebGLViewport",
    value: function getWebGLViewport() {
      // Calculate appropriate webgl viewport given current selection window
      var windowWidth = this.currentXRange[1] - this.currentXRange[0];
      var windowHeight = this.currentYRange[1] - this.currentYRange[0];
      var displayAsIfThisWide = (this.maxX - this.minX) / windowWidth * this.width;
      var displayAsIfThisHigh = (this.maxY - this.minY) / windowHeight * this.height;
      var scaleXWindowSpace = (0, _utilities.scale)([this.minX, this.maxX], [0, -displayAsIfThisWide]);
      var scaleYWindowSpace = (0, _utilities.scale)([this.minY, this.maxY], [0, -displayAsIfThisHigh]);
      var toReturnX = scaleXWindowSpace(this.currentXRange[0]);
      var toReturnY = scaleYWindowSpace(this.currentYRange[0]);
      return [toReturnX, toReturnY, displayAsIfThisWide, displayAsIfThisHigh];
    }
  }, {
    key: "populateBuffers",
    value: function populateBuffers(data) {
      var _this2 = this;

      // Given raw data, populate the buffers
      // Specific to t-SNE data
      data.split("\n").forEach(function (line) {
        var _this2$colors;

        var parts = line.split(",");
        var x = parseFloat(parts[1]);
        var y = parseFloat(parts[2]);

        if (!parts[0] || !x || !y) {
          return; // skip bad rows
        }

        _this2.positions.push(_this2.xTSNEScale(x), _this2.yTSNEScale(y));

        (_this2$colors = _this2.colors).push.apply(_this2$colors, _toConsumableArray(_this2.sampleColors.get(parts[0])));
      });
    }
  }, {
    key: "clearBuffers",
    value: function clearBuffers() {
      this.positions = [];
      this.colors = [];
    }
  }, {
    key: "animate",
    value: function animate() {
      if (!this.needsAnimation) {
        this.lastFrame = requestAnimationFrame(this.animate.bind(this));
        this.tick();
        return;
      }

      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_COLOR, this.gl.DST_COLOR); // Clear the canvas before we start drawing on it.

      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      var viewport = this.getWebGLViewport();
      this.gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
      this.gl.drawArrays(this.gl.POINTS, 0, // stride
      this.vertexCount // vertex count
      );
      this.needsAnimation = false;
      this.lastFrame = requestAnimationFrame(this.animate.bind(this));
      this.tick();
    }
  }, {
    key: "render",
    value: function render() {
      _get(_getPrototypeOf(WebGLCanvasDrawer.prototype), "render", this).call(this);

      this.shaderProgram = (0, _utilities.initShaderProgram)(this.gl, _webgl.colorPointsVertexShader, _webgl.colorPointsFragmentShader);
      this.programInfo = {
        program: this.shaderProgram,
        attribLocations: {
          vertexPosition: this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition"),
          vertexColor: this.gl.getAttribLocation(this.shaderProgram, "aVertexColor")
        }
      }; // this.positions and this.colors populated by populateBuffers method used in Handler

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
      0 // offset
      );
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexColor, 4, // numComponents
      this.gl.FLOAT, // type
      false, // normalize
      0, // stride
      0 // offset
      );
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);
      this.gl.useProgram(this.programInfo.program);

      if (this.lastFrame) {
        cancelAnimationFrame(this.lastFrame);
      }

      this.needsAnimation = true;
      this.animate();
    }
  }]);

  return WebGLCanvasDrawer;
}(_drawer.default);

var _default = WebGLCanvasDrawer;
exports.default = _default;
},{"./drawer":"QHfG","./utilities":"DFiv","./webgl.js":"j7dC"}],"HYUx":[function(require,module,exports) {
"use strict";

var _webglDrawer = _interopRequireDefault(require("./webgl-drawer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var OffscreenWebGLDrawer =
/*#__PURE__*/
function (_WebGLDrawer) {
  _inherits(OffscreenWebGLDrawer, _WebGLDrawer);

  var _super = _createSuper(OffscreenWebGLDrawer);

  function OffscreenWebGLDrawer() {
    _classCallCheck(this, OffscreenWebGLDrawer);

    return _super.apply(this, arguments);
  }

  _createClass(OffscreenWebGLDrawer, [{
    key: "tick",
    value: function tick() {
      postMessage({
        type: "tick"
      });
    }
  }]);

  return OffscreenWebGLDrawer;
}(_webglDrawer.default);

self.onmessage = function (message) {
  switch (message.data.type) {
    case "init":
      self.drawer = new OffscreenWebGLDrawer(message.data);
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
      console.error("Received unknown message type: ".concat(message.type));
  }
};
},{"./webgl-drawer":"83PL"}]},{},["HYUx"], null)
//# sourceMappingURL=offscreen-webgl-worker.1e800b4b.js.map