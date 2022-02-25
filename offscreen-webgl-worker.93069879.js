// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"samz6":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "a8fb9c35fdafe466";
module.bundle.HMR_BUNDLE_ID = "10bff04493069879";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"cHDZM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
/**
 * The offscreen webgl worker is meant to communicate from the {@link WebGLVis}
 * by sending a specification data to the drawer for management of shader program and
 * eventually drawing. Most messages passed are containing the new viewport
 * information for the drawer to process.
 */ var _webglDrawer = require("./webgl-drawer");
var _webglDrawerDefault = parcelHelpers.interopDefault(_webglDrawer);
class OffscreenWebGLDrawer extends _webglDrawerDefault.default {
    tick() {
        postMessage({
            type: "tick"
        });
    }
}
self.onmessage = (message)=>{
    switch(message.data.type){
        case "init":
            self.drawer = message.data.displayFPSMeter ? new OffscreenWebGLDrawer(message.data) : new _webglDrawerDefault.default(message.data);
            break;
        case "viewport":
            self.drawer.receiveViewport(message.data);
            break;
        case "render":
            self.drawer.receiveViewport(message.data);
            self.drawer.render();
            break;
        case "specification":
            self.drawer.setSpecification(message.data.specification);
            break;
        case "clearBuffers":
            self.drawer.clearBuffers();
            break;
        case "resize":
            self.drawer.canvas.width = message.data.width;
            self.drawer.canvas.height = message.data.height;
            self.drawer.gl.viewport(0, 0, message.data.width, message.data.height);
            break;
        default:
            console.error(`Received unknown message type: ${message.type}`);
    }
};

},{"./webgl-drawer":"bogiS","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"bogiS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _drawer = require("./drawer");
var _drawerDefault = parcelHelpers.interopDefault(_drawer);
var _specificationProcessor = require("./specification-processor");
var _specificationProcessorDefault = parcelHelpers.interopDefault(_specificationProcessor);
var _utilities = require("./utilities");
var _vertexCalculator = require("./vertex-calculator");
var _vertexCalculatorDefault = parcelHelpers.interopDefault(_vertexCalculator);
var _semanticZoomer = require("./semantic-zoomer");
var _semanticZoomerDefault = parcelHelpers.interopDefault(_semanticZoomer);
var _webglJs = require("./webgl.js");
var _twglJs = require("twgl.js");
const ALL_POTENTIAL_ATTRIBUTES = _webglJs.VertexShader.SUPPORTED_CHANNEL_ATTRIBUTES.map((attr)=>`a_${attr}`
).concat("a_VertexPosition");
class WebGLCanvasDrawer extends _drawerDefault.default {
    /**
   * Called whenever a frame has been successfully animated.
   */ tick() {
    }
    /**
   * Calculates the viewport for this.gl.viewport to control zooming. Also calculates point size.
   * @returns Array of 5 elements, first 4 are viewport parameters, last is pointSizeMultiplier:
   *   [xOffset, yOffset, displayAsIfThisWide, displayAsIfThisHigh, pointSizeMultiplier]
   */ getWebGLViewport() {
        // Calculate appropriate webgl viewport given current selection window
        // Transform current data coordinates to GPU cordinates
        const scaleXWindowSpace = _utilities.scale([
            this.minX,
            this.maxX
        ], [
            -1,
            1
        ]);
        const scaleYWindowSpace = _utilities.scale([
            this.minY,
            this.maxY
        ], [
            -1,
            1
        ]);
        // Multiply point size by the ratio of max dimension and current width
        const pointSize = Math.max(1.75, Math.min(1 / (scaleXWindowSpace(this.currentXRange[1]) - scaleXWindowSpace(this.currentXRange[0])), 1 / (scaleYWindowSpace(this.currentYRange[1]) - scaleYWindowSpace(this.currentYRange[0]))));
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
   * Sets the specification and begins the process of drawing it.
   *  1. Cancels any current animation
   *  2. Builds shaders for the tracks
   *  3. After data is loaded, calls populateBuffers.
   *
   * @param {Object} specification of visualization
   */ setSpecification(specification) {
        super.render(); // Cancels current animation frame
        // Populate buffers needs a trackShader built to know what buffers to fill
        this.trackShaders = _webglJs.VertexShader.fromSpecification(specification);
        new _specificationProcessorDefault.default(specification, this.populateBuffers.bind(this));
    }
    /**
   * Populate the buffers that are fed to webgl for drawing.
   *
   * @param {SpecificationProcessor} specificationHelper created in the setSpecification method
   */ populateBuffers(specificationHelper) {
        let currentTrack = specificationHelper.getNextTrack();
        let currentTrackShaderIndex = 0;
        this.semanticZoomer = new _semanticZoomerDefault.default(specificationHelper);
        while(currentTrack){
            // Construct calculator in track loop as calculator keeps internal state for each track
            let vertexCalculator = new _vertexCalculatorDefault.default(specificationHelper.xScale, specificationHelper.yScale, currentTrack.track // Access actual track specification
            );
            let currentMark = currentTrack.getNextMark();
            while(currentMark){
                // A lot of the heavy lifting occurs in the track shaders, this class is mostly boilerplate for webgl
                this.trackShaders[currentTrackShaderIndex].addMarkToBuffers(currentMark, vertexCalculator);
                currentMark = currentTrack.getNextMark();
            }
            currentTrack = specificationHelper.getNextTrack();
            currentTrackShaderIndex++;
        }
        this.render();
    }
    /**
   * Animates the frames by setting viewport, uniforms, blending, clearing, and calling webgl draw.
   */ animate() {
        if (!this.needsAnimation) {
            // Prevent pointless animation if canvas does not change
            this.lastFrame = requestAnimationFrame(this.animate.bind(this));
            this.tick();
            return;
        }
        const viewport = this.getWebGLViewport();
        this.globalUniforms.viewport = new Float32Array(viewport.slice(0, 4));
        this.globalUniforms.pointSizeModifier = viewport[4];
        // Clear the canvas before we start drawing on it.
        this.gl.clearColor(1, 1, 1, 1);
        // Set the blending function
        // Blend functions are weird, play with them:
        // https://mrdoob.github.io/webgl-blendfunctions/blendfunc.html
        // http://www.andersriggelsen.dk/glblendfunc.php
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        // For each track shader, use their shader program then draw it
        this.trackShaders.forEach((trackShader, index)=>{
            this.gl.useProgram(this.programInfos[index].program);
            _twglJs.setUniforms(this.programInfos[index], {
                ...this.globalUniforms,
                ...trackShader.uniforms
            });
            _twglJs.setBuffersAndAttributes(this.gl, this.programInfos[index], this.vertexArrayInfos[index]);
            _twglJs.drawBufferInfo(this.gl, this.vertexArrayInfos[index], this.gl[this.semanticZoomer.getRecommendedDrawingMode(trackShader, this.currentXRange, this.currentYRange)], trackShader.attributes.a_VertexPosition.data.length / 2);
        });
        this.needsAnimation = false;
        this.lastFrame = requestAnimationFrame(this.animate.bind(this));
        this.tick();
    }
    /**
   * Prepares animation by compiling shaders, setting uniforms, constructing buffers,
   * and handling additional boilerplate.
   */ render() {
        super.render();
        this.programInfos = this.trackShaders.map((trackShader)=>_twglJs.createProgramInfo(this.gl, [
                trackShader.buildShader(),
                _webglJs.varyingColorsFragmentShader
            ], ALL_POTENTIAL_ATTRIBUTES)
        );
        this.globalUniforms = {
            viewport: new Float32Array([
                -1,
                -1,
                1,
                1
            ]),
            pointSizeModifier: 1
        };
        this.vertexArrayInfos = this.trackShaders.map((trackShader)=>_twglJs.createVertexArrayInfo(this.gl, this.programInfos, _twglJs.createBufferInfoFromArrays(this.gl, trackShader.attributes))
        );
        this.needsAnimation = true;
        this.animate();
    }
    constructor(viewportData){
        super(viewportData);
        this.gl = this.canvas.getContext("webgl2", {
            // Setting these to false makes webgl handle more like opengl
            // Source: https://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html
            alpha: false,
            premultipliedAlpha: false
        });
        if (!this.gl) {
            console.error("Unable to initialize WebGL!");
            return;
        }
    }
}
exports.default = WebGLCanvasDrawer;

},{"./drawer":"2N5hs","./specification-processor":"6uffu","./utilities":"eousC","./vertex-calculator":"dcdY0","./semantic-zoomer":"iRnGr","./webgl.js":"dcZJJ","twgl.js":"8bCjB","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"2N5hs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Drawer {
    /**
   * Method to set the viewport for the drawer.
   *
   * @param {Object} viewportData object containing minX,maxX,minY,maxY,xRange,yRange viewport data for drawer
   */ receiveViewport(viewportData) {
        this.minX = viewportData.minX;
        this.maxX = viewportData.maxX;
        this.minY = viewportData.minY;
        this.maxY = viewportData.maxY;
        this.currentXRange = viewportData.xRange;
        this.currentYRange = viewportData.yRange;
        this.needsAnimation = true;
    }
    /**
   * Method to implement which signifies a frame has been processed. Used to
   * display FPS meter.
   */ tick() {
    }
    /**
   * Method to implement animating a frame.
   */ animate() {
    }
    /**
   * Method to implement preprocessing for rendering frames.
   */ render() {
        if (this.lastFrame) // Avoid overlapping animation requests
        cancelAnimationFrame(this.lastFrame);
    }
    /**
   * An interface for drawing on a canvas.
   *
   * @param {Object} drawingData object containing keys for {@link Drawer#receiveViewport}
   *  and canvas key used for drawing.
   */ constructor(drawingData){
        this.canvas = drawingData.canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.receiveViewport(drawingData);
    }
}
exports.default = Drawer;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"66abI":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6uffu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_CHANNELS", ()=>DEFAULT_CHANNELS
);
parcelHelpers.export(exports, "getDrawModeForTrack", ()=>getDrawModeForTrack
);
var _helpers = require("@swc/helpers");
var _utilities = require("./utilities");
var _vertexCalculator = require("./vertex-calculator");
var _d3ScaleChromatic = require("d3-scale-chromatic");
// Default channel values of specification which is passed to webgl drawer
const DEFAULT_CHANNELS = Object.freeze({
    size: {
        value: 1,
        numComponents: 1,
        type: "float"
    },
    color: {
        value: 16581375,
        numComponents: 1,
        type: "float"
    },
    x: {
        value: 0,
        numComponents: null,
        type: null
    },
    y: {
        value: 0,
        numComponents: null,
        type: null
    },
    opacity: {
        value: 1,
        numComponents: 1,
        type: "float"
    },
    shape: {
        value: "dot",
        numComponents: null,
        type: null
    },
    width: {
        // Default values for width and height add complications
        // to mapping geometry and creating tick vertices
        value: undefined,
        numComponents: 1,
        type: "float"
    },
    height: {
        value: undefined,
        numComponents: 1,
        type: "float"
    }
});
const DEFAULT_MAX_SIZE = 100;
const DEFAULT_MIN_SIZE = 0;
const DEFAULT_MIN_OPACITY = 0;
const DEFAULT_MIN_WIDTH = 0;
const DEFAULT_MIN_HEIGHT = 0;
const DEFAULT_MAX_WIDTH = 1 / _vertexCalculator.SIZE_UNITS;
const DEFAULT_MAX_HEIGHT = 1 / _vertexCalculator.SIZE_UNITS;
const DEFAULT_COLOR_SCHEME = "interpolateBrBG";
// first value is undefined as categories are 1-indexed
const SHAPES = [
    undefined,
    "dot",
    "triangle",
    "circle",
    "diamond"
];
/**
 * Given a track, determine the WebGL draw mode for it
 *
 * @param {Object} track from specification
 * @returns WebGLDrawMode as a string
 */ const getDrawModeForTrack = (track)=>{
    switch(track.mark){
        case "line":
            return "LINE_STRIP";
        case "tick":
        case "arc":
            return "LINES";
        case "point":
            if (track.shape && track.shape.value !== "dot") return "TRIANGLES";
            else return "POINTS";
        case "rect":
        case "area":
            return "TRIANGLES";
    }
};
class SpecificationProcessor {
    /**
   * Get the next track to process
   * @returns {@link Track}
   */ getNextTrack() {
        if (this.index >= this.tracks.length) return null;
        return this.tracks[this.index++];
    }
    /**
   * Process a specification by reading in the data, the channel information, and producing an
   * iterator like interface with getNextTrack to feed to a drawer.
   *
   * @param {Object} specification user defined specification
   * @param {Function} callback function to call after all the data has been loaded
   */ constructor(specification, callback){
        this.index = 0;
        this.specification = specification;
        if (typeof specification.defaultData === "string") // data is a url to get
        this.dataPromise = fetch(specification.defaultData).then((response)=>response.text()
        ).then((text)=>this.data = text.split("\n")
        );
        else if (specification.defaultData) {
            // default data is defined, assumed to be an object
            this.data = specification.defaultData;
            this.isInlineData = true;
        }
        this.tracks = specification.tracks.map((track)=>new Track(this, track)
        );
        const allPromises = this.tracks.map((track)=>track.dataPromise
        ).filter((p)=>p
        ); // Removes undefined
        if (this.dataPromise) allPromises.push(this.dataPromise);
        this.xScale = _utilities.getScaleForSpecification("x", specification);
        this.yScale = _utilities.getScaleForSpecification("y", specification);
        // When all tracks have acquired their data, call the callback
        // TODO: Allow tracks to be processed while waiting for others, need to keep in mind order
        Promise.all(allPromises).then(()=>callback(this)
        );
    }
}
class Track {
    /**
   * Read the headers from the first row of data and then build functions to map a data row
   * to a channel value for drawing. Ultimately a method due to clunky constructor.
   */ processHeadersAndMappers() {
        // Processing headers
        if (this.isInlineData) {
            this.headers = Object.keys(this.data);
            this.data.length = this.data[this.headers[0]].length; // assign length to data object for iteration
            this.index = 0;
        } else {
            this.headers = this.data[0].split(",");
            this.index = 1; // 1 to skip header
        }
        // Creating channel mappers
        this.channelMaps = new Map();
        Object.keys(DEFAULT_CHANNELS).forEach((channel)=>{
            this.channelMaps.set(channel, this.buildMapperForChannel(channel));
        });
    }
    /**
   * Get the next data point from the track. Returns null when all points have been returned.
   * @returns A data point with the x and y coordinates and other attributes from the header
   */ getNextDataPoint() {
        if (this.index >= this.data.length) return null;
        const toReturn = {
            geometry: {
                coordinates: [],
                dimensions: []
            }
        };
        let splitted;
        if (this.isInlineData) splitted = this.headers.map((header)=>this.data[header][this.index]
        );
        else {
            const currRow = this.data[this.index];
            splitted = currRow.split(",");
        }
        this.index++;
        this.headers.forEach((header, index)=>{
            toReturn[header] = splitted[index];
        });
        const rawHeight = this.channelMaps.get("height")(splitted);
        const rawWidth = this.channelMaps.get("width")(splitted);
        const x = this.channelMaps.get("x")(splitted);
        const y = this.channelMaps.get("y")(splitted);
        toReturn.geometry.coordinates.push(x, y);
        toReturn.geometry.dimensions.push(rawWidth, rawHeight);
        return toReturn;
    }
    /**
   * Get the next mark from the track for the drawer to process. Returns null when all
   * marks have been returned.
   * @returns An object containing information used to draw a mark for a row of data.
   */ getNextMark() {
        // Getting the next mark cannot modify the data objects as other tracks may refer to
        // the same data
        if (this.index >= this.data.length) return null;
        const toReturn = {
        };
        let splitted;
        if (this.isInlineData) splitted = this.headers.map((header)=>this.data[header][this.index]
        );
        else {
            const currRow = this.data[this.index];
            splitted = currRow.split(",");
        }
        this.index++;
        this.channelMaps.forEach((mapper, channel)=>{
            toReturn[channel] = mapper(splitted);
        });
        return toReturn;
    }
    /**
   * Process a track from a specification by loading data and producing an iterator
   * like interface with getNextDataPoint or getNextMark.
   *
   * @param {Object} specification user defined visualization
   * @param {Object} track user defined track
   */ constructor(specification, track){
        _helpers.defineProperty(this, /**
   * Builds a function which maps an attribute value to a channel value for use by the drawer.
   * The function will return a default if not present in the track, or a constant if
   * value is defined.
   *
   * @param {String} channel one of the channels listed in default channels
   * @returns the function
   */ "buildMapperForChannel", (channel)=>{
            if (channel in this.track) {
                const channelInfo = this.track[channel];
                if ("value" in channelInfo) {
                    if (channel === "color") channelInfo.value = _utilities.colorSpecifierToHex(channelInfo.value);
                    return ()=>channelInfo.value
                    ;
                } else {
                    const attributeIndex = this.headers.indexOf(channelInfo.attribute);
                    let attrMapper;
                    switch(channelInfo.type){
                        case "inline":
                            attrMapper = buildMapperForInlineChannel(channel, channelInfo);
                            break;
                        case "quantitative":
                            attrMapper = buildMapperForQuantitiveChannel(channel, channelInfo);
                            break;
                        case "categorical":
                            attrMapper = buildMapperForCategoricalChannel(channel, channelInfo);
                            break;
                        case "genomic":
                            const chrAttributeIndex = this.headers.indexOf(channelInfo.chrAttribute);
                            const geneAttributeIndex = this.headers.indexOf(channelInfo.geneAttribute);
                            attrMapper = buildMapperForGenomicChannel(channel, channelInfo);
                            return (row)=>attrMapper(row[chrAttributeIndex], row[geneAttributeIndex])
                            ;
                        case "genomicRange":
                            const genomicAttributeIndices = [
                                this.headers.indexOf(channelInfo.chrAttribute),
                                this.headers.indexOf(channelInfo.startAttribute),
                                this.headers.indexOf(channelInfo.endAttribute), 
                            ];
                            attrMapper = buildMapperForGenomicRangeChannel(channel, channelInfo);
                            return (row // Pass in values for the genomic attributes to mapper
                            )=>attrMapper(...genomicAttributeIndices.map((index)=>row[index]
                                ))
                            ;
                    }
                    return (row)=>attrMapper(row[attributeIndex])
                    ;
                }
            } else return ()=>DEFAULT_CHANNELS[channel].value
            ;
        });
        this.track = track;
        if (typeof track.data === "string") // Track has its own data to GET
        this.dataPromise = fetch(track.data).then((response)=>response.text()
        ).then((text)=>{
            this.data = text.split(/[\n\r]+/);
            this.processHeadersAndMappers();
            this.hasOwnData = true;
        });
        else if (track.data) {
            // Track has its own inline data
            this.data = track.data;
            this.isInlineData = true;
            this.processHeadersAndMappers();
            this.hasOwnData = true;
        } else if (specification.data) {
            // Track does not have its own data, but the specification has default data
            this.data = specification.data;
            this.isInlineData = specification.isInlineData;
            this.processHeadersAndMappers();
        } else if (specification.dataPromise) // Track does not have its own data, but the specification is GETting default data
        specification.dataPromise.then(()=>{
            this.data = specification.data;
            this.processHeadersAndMappers();
        });
        else console.error(`Could not find data (no defaultData in specification and no data specified for this track) for track ${track}.`);
    }
}
/**
 * Build a function which maps an attribute that is a channel value to a compatible value.
 *
 * @param {String} channel the name of the channel to build an inline mapper for
 * @param {Object} channelInfo the info of the channel from a track
 * @returns a function that maps attribute values to appropriate channel values.
 */ const buildMapperForInlineChannel = (channel, channelInfo)=>{
    switch(channel){
        case "width":
        case "height":
        case "size":
            return (dimension)=>parseFloat(dimension)
            ;
        case "color":
            return (color)=>_utilities.colorSpecifierToHex(color)
            ;
        default:
            console.info(`No special behavior for ${channel} as an inline attribute.`);
            return (inlineValue)=>inlineValue
            ;
    }
};
/**
 * Build a function which maps a numerical value for an attribute to a property of a mark
 * @param {*} channel the name of the quantitative channel to map
 * @param {*} channelInfo the object containing info for this channel from the specification
 * @returns a function that maps a data attribute value to a channel value
 */ const buildMapperForQuantitiveChannel = (channel, channelInfo)=>{
    switch(channel){
        case "x":
        case "y":
            // Map x and y to itself, but we need a function to do it
            return (coord)=>parseFloat(coord)
            ;
        case "opacity":
            return _utilities.scale(channelInfo.domain, [
                channelInfo.minOpacity || DEFAULT_MIN_OPACITY,
                1, 
            ]);
        case "size":
            return _utilities.scale(channelInfo.domain, [
                channelInfo.minSize || DEFAULT_MIN_SIZE,
                channelInfo.maxSize || DEFAULT_MAX_SIZE, 
            ]);
        case "color":
            const d3colorScale = !channelInfo.colorScheme || !(channelInfo.colorScheme in _d3ScaleChromatic) ? _d3ScaleChromatic[DEFAULT_COLOR_SCHEME] : _d3ScaleChromatic[channelInfo.colorScheme];
            const zeroToOneScale = _utilities.scale(channelInfo.domain, [
                0,
                1
            ]);
            return (attrValue)=>_utilities.rgbStringToHex(d3colorScale(zeroToOneScale(attrValue)))
            ;
        case "width":
            return _utilities.scale(channelInfo.domain, [
                channelInfo.minWidth || DEFAULT_MIN_WIDTH,
                channelInfo.maxWidth || DEFAULT_MAX_WIDTH, 
            ]);
        case "height":
            return _utilities.scale(channelInfo.domain, [
                channelInfo.minHeight || DEFAULT_MIN_HEIGHT,
                channelInfo.maxHeight || DEFAULT_MAX_WIDTH, 
            ]);
        default:
            console.error(`${channel} is not a supported channel for quantitative attributes!`);
    }
};
/**
 * Build a function which maps a discrete (integers are possible) value for an attribute
 * to a property of a mark
 * @param {*} channel the name of the categorical channel to map
 * @param {*} channelInfo the object containing info for this channel from the specification
 * @returns a function that maps a data attribute value to a channel value
 */ const buildMapperForCategoricalChannel = (channel, channelInfo)=>{
    const categoryTracker = new Map();
    let channelScale;
    switch(channel){
        case "x":
        case "y":
            // +1 here to avoid setting x or y at a boundary that makes it not visible
            channelScale = _utilities.scale([
                1,
                channelInfo.cardinality + 1
            ], [
                -1,
                1
            ]);
            break;
        case "opacity":
            channelScale = _utilities.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minOpacity || DEFAULT_MIN_OPACITY,
                1
            ]);
            break;
        case "size":
            channelScale = _utilities.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minSize || DEFAULT_MIN_SIZE,
                channelInfo.maxSize || DEFAULT_MAX_SIZE, 
            ]);
            break;
        case "shape":
            channelScale = (categoryId)=>SHAPES[categoryId % SHAPES.length]
            ;
            break;
        case "color":
            let d3colorScale = !channelInfo.colorScheme || !(channelInfo.colorScheme in _d3ScaleChromatic) ? _d3ScaleChromatic[DEFAULT_COLOR_SCHEME] : _d3ScaleChromatic[channelInfo.colorScheme];
            if (Array.isArray(d3colorScale)) {
                console.error("Currenty only interpolating color schemes are supported, using default");
                d3colorScale = _d3ScaleChromatic[DEFAULT_COLOR_SCHEME];
            }
            const zeroToOneScale = _utilities.scale([
                1,
                channelInfo.cardinality
            ], [
                0,
                1
            ]);
            channelScale = (categoryId)=>_utilities.rgbStringToHex(d3colorScale(zeroToOneScale(categoryId)))
            ;
            break;
        case "width":
            channelScale = _utilities.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minWidth || DEFAULT_MIN_WIDTH,
                channelInfo.maxWidth || DEFAULT_MAX_WIDTH, 
            ]);
            break;
        case "height":
            channelScale = _utilities.scale([
                1,
                channelInfo.cardinality
            ], [
                channelInfo.minHeight || DEFAULT_MIN_HEIGHT,
                channelInfo.maxHeight || DEFAULT_MAX_HEIGHT, 
            ]);
            break;
        default:
            console.error(`${channel} is not a supported channel for categorical attributes!`);
    }
    return (attrValue)=>{
        if (!categoryTracker.has(attrValue)) categoryTracker.set(attrValue, categoryTracker.size + 1);
        return channelScale(categoryTracker.get(attrValue));
    };
};
/**
 * Build a function which maps a genome chr, gene, to an object consumable by a GenomeScale
 * @param {*} channel either x or y
 * @param {*} channelInfo the object containing info for this channel from the specification
 * @returns a function that maps (genomeChr, geneLoc) -> [chrId, geneLocation]
 *  ex: ["X", 200]
 */ const buildMapperForGenomicChannel = (channel, channelInfo)=>{
    switch(channel){
        case "x":
        case "y":
            return (chr, gene)=>{
                let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
                return [
                    chrId,
                    parseInt(gene)
                ];
            };
        default:
            console.error(`${channel} is not a supported channel for genomic attributes!`);
    }
};
/**
 * Build a function which maps a genome chr, start, and end to an object consumable by a scale
 * @param {*} channel either x or y, width or height may be included if doing arc marks
 * @param {*} channelInfo the object containing info for this channel from the specification
 * @returns a function that maps (genomeChr, genomeStart, genomeEnd) -> an object containing mark metadata for position
 *  format: [chrId, geneLocation, chrId2, geneLocation2]
 *  ex: ["1", 1000, "X", 2000]
 */ const buildMapperForGenomicRangeChannel = (channel, channelInfo)=>{
    switch(channel){
        case "width":
        case "height":
        case "x":
        case "y":
            return (chr, genomeStart, genomeEnd)=>{
                let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
                return [
                    [
                        chrId,
                        parseInt(genomeStart)
                    ],
                    [
                        chrId,
                        parseInt(genomeEnd)
                    ], 
                ];
            };
        default:
            console.error(`${channel} is not a supported channel for genomic attributes!`);
    }
};
exports.default = SpecificationProcessor;

},{"@swc/helpers":"hZhpG","./utilities":"eousC","./vertex-calculator":"dcdY0","d3-scale-chromatic":"iNhJO","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"hZhpG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyDecoratedDescriptor", ()=>_applyDecoratedDescriptorDefault.default
);
parcelHelpers.export(exports, "arrayWithHoles", ()=>_arrayWithHolesDefault.default
);
parcelHelpers.export(exports, "arrayWithoutHoles", ()=>_arrayWithoutHolesDefault.default
);
parcelHelpers.export(exports, "assertThisInitialized", ()=>_assertThisInitializedDefault.default
);
parcelHelpers.export(exports, "asyncGenerator", ()=>_asyncGeneratorDefault.default
);
parcelHelpers.export(exports, "asyncGeneratorDelegate", ()=>_asyncGeneratorDelegateDefault.default
);
parcelHelpers.export(exports, "asyncIterator", ()=>_asyncIteratorDefault.default
);
parcelHelpers.export(exports, "asyncToGenerator", ()=>_asyncToGeneratorDefault.default
);
parcelHelpers.export(exports, "awaitAsyncGenerator", ()=>_awaitAsyncGeneratorDefault.default
);
parcelHelpers.export(exports, "awaitValue", ()=>_awaitValueDefault.default
);
parcelHelpers.export(exports, "classCallCheck", ()=>_classCallCheckDefault.default
);
parcelHelpers.export(exports, "classNameTDZError", ()=>_classNameTdzErrorDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldGet", ()=>_classPrivateFieldGetDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldLooseBase", ()=>_classPrivateFieldLooseBaseDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldSet", ()=>_classPrivateFieldSetDefault.default
);
parcelHelpers.export(exports, "classPrivateMethodGet", ()=>_classPrivateMethodGetDefault.default
);
parcelHelpers.export(exports, "classPrivateMethodSet", ()=>_classPrivateMethodSetDefault.default
);
parcelHelpers.export(exports, "classStaticPrivateFieldSpecGet", ()=>_classStaticPrivateFieldSpecGetDefault.default
);
parcelHelpers.export(exports, "classStaticPrivateFieldSpecSet", ()=>_classStaticPrivateFieldSpecSetDefault.default
);
parcelHelpers.export(exports, "construct", ()=>_constructDefault.default
);
parcelHelpers.export(exports, "createClass", ()=>_createClassDefault.default
);
parcelHelpers.export(exports, "decorate", ()=>_decorateDefault.default
);
parcelHelpers.export(exports, "defaults", ()=>_defaultsDefault.default
);
parcelHelpers.export(exports, "defineEnumerableProperties", ()=>_defineEnumerablePropertiesDefault.default
);
parcelHelpers.export(exports, "defineProperty", ()=>_definePropertyDefault.default
);
parcelHelpers.export(exports, "extends", ()=>_extendsDefault.default
);
parcelHelpers.export(exports, "get", ()=>_getDefault.default
);
parcelHelpers.export(exports, "getPrototypeOf", ()=>_getPrototypeOfDefault.default
);
parcelHelpers.export(exports, "inherits", ()=>_inheritsDefault.default
);
parcelHelpers.export(exports, "inheritsLoose", ()=>_inheritsLooseDefault.default
);
parcelHelpers.export(exports, "initializerDefineProperty", ()=>_initializerDefinePropertyDefault.default
);
parcelHelpers.export(exports, "initializerWarningHelper", ()=>_initializerWarningHelperDefault.default
);
parcelHelpers.export(exports, "_instanceof", ()=>_instanceofDefault.default
);
parcelHelpers.export(exports, "interopRequireDefault", ()=>_interopRequireDefaultDefault.default
);
parcelHelpers.export(exports, "interopRequireWildcard", ()=>_interopRequireWildcardDefault.default
);
parcelHelpers.export(exports, "isNativeFunction", ()=>_isNativeFunctionDefault.default
);
parcelHelpers.export(exports, "iterableToArray", ()=>_iterableToArrayDefault.default
);
parcelHelpers.export(exports, "iterableToArrayLimit", ()=>_iterableToArrayLimitDefault.default
);
parcelHelpers.export(exports, "iterableToArrayLimitLoose", ()=>_iterableToArrayLimitLooseDefault.default
);
parcelHelpers.export(exports, "jsx", ()=>_jsxDefault.default
);
parcelHelpers.export(exports, "newArrowCheck", ()=>_newArrowCheckDefault.default
);
parcelHelpers.export(exports, "nonIterableRest", ()=>_nonIterableRestDefault.default
);
parcelHelpers.export(exports, "nonIterableSpread", ()=>_nonIterableSpreadDefault.default
);
parcelHelpers.export(exports, "objectSpread", ()=>_objectSpreadDefault.default
);
parcelHelpers.export(exports, "objectWithoutProperties", ()=>_objectWithoutPropertiesDefault.default
);
parcelHelpers.export(exports, "objectWithoutPropertiesLoose", ()=>_objectWithoutPropertiesLooseDefault.default
);
parcelHelpers.export(exports, "possibleConstructorReturn", ()=>_possibleConstructorReturnDefault.default
);
parcelHelpers.export(exports, "readOnlyError", ()=>_readOnlyErrorDefault.default
);
parcelHelpers.export(exports, "set", ()=>_setDefault.default
);
parcelHelpers.export(exports, "setPrototypeOf", ()=>_setPrototypeOfDefault.default
);
parcelHelpers.export(exports, "skipFirstGeneratorNext", ()=>_skipFirstGeneratorNextDefault.default
);
parcelHelpers.export(exports, "slicedToArray", ()=>_slicedToArrayDefault.default
);
parcelHelpers.export(exports, "slicedToArrayLoose", ()=>_slicedToArrayLooseDefault.default
);
parcelHelpers.export(exports, "superPropBase", ()=>_superPropBaseDefault.default
);
parcelHelpers.export(exports, "taggedTemplateLiteral", ()=>_taggedTemplateLiteralDefault.default
);
parcelHelpers.export(exports, "taggedTemplateLiteralLoose", ()=>_taggedTemplateLiteralLooseDefault.default
);
parcelHelpers.export(exports, "_throw", ()=>_throwDefault.default
);
parcelHelpers.export(exports, "toArray", ()=>_toArrayDefault.default
);
parcelHelpers.export(exports, "toConsumableArray", ()=>_toConsumableArrayDefault.default
);
parcelHelpers.export(exports, "toPrimitive", ()=>_toPrimitiveDefault.default
);
parcelHelpers.export(exports, "toPropertyKey", ()=>_toPropertyKeyDefault.default
);
parcelHelpers.export(exports, "typeOf", ()=>_typeOfDefault.default
);
parcelHelpers.export(exports, "wrapAsyncGenerator", ()=>_wrapAsyncGeneratorDefault.default
);
parcelHelpers.export(exports, "wrapNativeSuper", ()=>_wrapNativeSuperDefault.default
);
var _applyDecoratedDescriptor = require("./_apply_decorated_descriptor");
var _applyDecoratedDescriptorDefault = parcelHelpers.interopDefault(_applyDecoratedDescriptor);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _arrayWithoutHoles = require("./_array_without_holes");
var _arrayWithoutHolesDefault = parcelHelpers.interopDefault(_arrayWithoutHoles);
var _assertThisInitialized = require("./_assert_this_initialized");
var _assertThisInitializedDefault = parcelHelpers.interopDefault(_assertThisInitialized);
var _asyncGenerator = require("./_async_generator");
var _asyncGeneratorDefault = parcelHelpers.interopDefault(_asyncGenerator);
var _asyncGeneratorDelegate = require("./_async_generator_delegate");
var _asyncGeneratorDelegateDefault = parcelHelpers.interopDefault(_asyncGeneratorDelegate);
var _asyncIterator = require("./_async_iterator");
var _asyncIteratorDefault = parcelHelpers.interopDefault(_asyncIterator);
var _asyncToGenerator = require("./_async_to_generator");
var _asyncToGeneratorDefault = parcelHelpers.interopDefault(_asyncToGenerator);
var _awaitAsyncGenerator = require("./_await_async_generator");
var _awaitAsyncGeneratorDefault = parcelHelpers.interopDefault(_awaitAsyncGenerator);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
var _classCallCheck = require("./_class_call_check");
var _classCallCheckDefault = parcelHelpers.interopDefault(_classCallCheck);
var _classNameTdzError = require("./_class_name_tdz_error");
var _classNameTdzErrorDefault = parcelHelpers.interopDefault(_classNameTdzError);
var _classPrivateFieldGet = require("./_class_private_field_get");
var _classPrivateFieldGetDefault = parcelHelpers.interopDefault(_classPrivateFieldGet);
var _classPrivateFieldLooseBase = require("./_class_private_field_loose_base");
var _classPrivateFieldLooseBaseDefault = parcelHelpers.interopDefault(_classPrivateFieldLooseBase);
var _classPrivateFieldSet = require("./_class_private_field_set");
var _classPrivateFieldSetDefault = parcelHelpers.interopDefault(_classPrivateFieldSet);
var _classPrivateMethodGet = require("./_class_private_method_get");
var _classPrivateMethodGetDefault = parcelHelpers.interopDefault(_classPrivateMethodGet);
var _classPrivateMethodSet = require("./_class_private_method_set");
var _classPrivateMethodSetDefault = parcelHelpers.interopDefault(_classPrivateMethodSet);
var _classStaticPrivateFieldSpecGet = require("./_class_static_private_field_spec_get");
var _classStaticPrivateFieldSpecGetDefault = parcelHelpers.interopDefault(_classStaticPrivateFieldSpecGet);
var _classStaticPrivateFieldSpecSet = require("./_class_static_private_field_spec_set");
var _classStaticPrivateFieldSpecSetDefault = parcelHelpers.interopDefault(_classStaticPrivateFieldSpecSet);
var _construct = require("./_construct");
var _constructDefault = parcelHelpers.interopDefault(_construct);
var _createClass = require("./_create_class");
var _createClassDefault = parcelHelpers.interopDefault(_createClass);
var _decorate = require("./_decorate");
var _decorateDefault = parcelHelpers.interopDefault(_decorate);
var _defaults = require("./_defaults");
var _defaultsDefault = parcelHelpers.interopDefault(_defaults);
var _defineEnumerableProperties = require("./_define_enumerable_properties");
var _defineEnumerablePropertiesDefault = parcelHelpers.interopDefault(_defineEnumerableProperties);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _extends = require("./_extends");
var _extendsDefault = parcelHelpers.interopDefault(_extends);
var _get = require("./_get");
var _getDefault = parcelHelpers.interopDefault(_get);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _inherits = require("./_inherits");
var _inheritsDefault = parcelHelpers.interopDefault(_inherits);
var _inheritsLoose = require("./_inherits_loose");
var _inheritsLooseDefault = parcelHelpers.interopDefault(_inheritsLoose);
var _initializerDefineProperty = require("./_initializer_define_property");
var _initializerDefinePropertyDefault = parcelHelpers.interopDefault(_initializerDefineProperty);
var _initializerWarningHelper = require("./_initializer_warning_helper");
var _initializerWarningHelperDefault = parcelHelpers.interopDefault(_initializerWarningHelper);
var _instanceof = require("./_instanceof");
var _instanceofDefault = parcelHelpers.interopDefault(_instanceof);
var _interopRequireDefault = require("./_interop_require_default");
var _interopRequireDefaultDefault = parcelHelpers.interopDefault(_interopRequireDefault);
var _interopRequireWildcard = require("./_interop_require_wildcard");
var _interopRequireWildcardDefault = parcelHelpers.interopDefault(_interopRequireWildcard);
var _isNativeFunction = require("./_is_native_function");
var _isNativeFunctionDefault = parcelHelpers.interopDefault(_isNativeFunction);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _iterableToArrayLimit = require("./_iterable_to_array_limit");
var _iterableToArrayLimitDefault = parcelHelpers.interopDefault(_iterableToArrayLimit);
var _iterableToArrayLimitLoose = require("./_iterable_to_array_limit_loose");
var _iterableToArrayLimitLooseDefault = parcelHelpers.interopDefault(_iterableToArrayLimitLoose);
var _jsx = require("./_jsx");
var _jsxDefault = parcelHelpers.interopDefault(_jsx);
var _newArrowCheck = require("./_new_arrow_check");
var _newArrowCheckDefault = parcelHelpers.interopDefault(_newArrowCheck);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
var _nonIterableSpread = require("./_non_iterable_spread");
var _nonIterableSpreadDefault = parcelHelpers.interopDefault(_nonIterableSpread);
var _objectSpread = require("./_object_spread");
var _objectSpreadDefault = parcelHelpers.interopDefault(_objectSpread);
var _objectWithoutProperties = require("./_object_without_properties");
var _objectWithoutPropertiesDefault = parcelHelpers.interopDefault(_objectWithoutProperties);
var _objectWithoutPropertiesLoose = require("./_object_without_properties_loose");
var _objectWithoutPropertiesLooseDefault = parcelHelpers.interopDefault(_objectWithoutPropertiesLoose);
var _possibleConstructorReturn = require("./_possible_constructor_return");
var _possibleConstructorReturnDefault = parcelHelpers.interopDefault(_possibleConstructorReturn);
var _readOnlyError = require("./_read_only_error");
var _readOnlyErrorDefault = parcelHelpers.interopDefault(_readOnlyError);
var _set = require("./_set");
var _setDefault = parcelHelpers.interopDefault(_set);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
var _skipFirstGeneratorNext = require("./_skip_first_generator_next");
var _skipFirstGeneratorNextDefault = parcelHelpers.interopDefault(_skipFirstGeneratorNext);
var _slicedToArray = require("./_sliced_to_array");
var _slicedToArrayDefault = parcelHelpers.interopDefault(_slicedToArray);
var _slicedToArrayLoose = require("./_sliced_to_array_loose");
var _slicedToArrayLooseDefault = parcelHelpers.interopDefault(_slicedToArrayLoose);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
var _taggedTemplateLiteral = require("./_tagged_template_literal");
var _taggedTemplateLiteralDefault = parcelHelpers.interopDefault(_taggedTemplateLiteral);
var _taggedTemplateLiteralLoose = require("./_tagged_template_literal_loose");
var _taggedTemplateLiteralLooseDefault = parcelHelpers.interopDefault(_taggedTemplateLiteralLoose);
var _throw = require("./_throw");
var _throwDefault = parcelHelpers.interopDefault(_throw);
var _toArray = require("./_to_array");
var _toArrayDefault = parcelHelpers.interopDefault(_toArray);
var _toConsumableArray = require("./_to_consumable_array");
var _toConsumableArrayDefault = parcelHelpers.interopDefault(_toConsumableArray);
var _toPrimitive = require("./_to_primitive");
var _toPrimitiveDefault = parcelHelpers.interopDefault(_toPrimitive);
var _toPropertyKey = require("./_to_property_key");
var _toPropertyKeyDefault = parcelHelpers.interopDefault(_toPropertyKey);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
var _wrapAsyncGenerator = require("./_wrap_async_generator");
var _wrapAsyncGeneratorDefault = parcelHelpers.interopDefault(_wrapAsyncGenerator);
var _wrapNativeSuper = require("./_wrap_native_super");
var _wrapNativeSuperDefault = parcelHelpers.interopDefault(_wrapNativeSuper);

},{"./_apply_decorated_descriptor":"8Yizz","./_array_with_holes":"c3AsU","./_array_without_holes":"a6Vyf","./_assert_this_initialized":"ahl85","./_async_generator":"2pNMp","./_async_generator_delegate":"ehHEd","./_async_iterator":"k0r6o","./_async_to_generator":"ascUm","./_await_async_generator":"1wrIf","./_await_value":"jBb4j","./_class_call_check":"3iM9V","./_class_name_tdz_error":"i3MOq","./_class_private_field_get":"egFCX","./_class_private_field_loose_base":"lzIpb","./_class_private_field_set":"30bh1","./_class_private_method_get":"gDuAt","./_class_private_method_set":"5soyt","./_class_static_private_field_spec_get":"9qYQR","./_class_static_private_field_spec_set":"gnGok","./_construct":"3YcXO","./_create_class":"34sNe","./_decorate":"cIHuz","./_defaults":"jK8lu","./_define_enumerable_properties":"3fw0o","./_define_property":"3z9h9","./_extends":"fuB43","./_get":"llcaT","./_get_prototype_of":"japC6","./_inherits":"iyhXz","./_inherits_loose":"iluuo","./_initializer_define_property":"9Pu0n","./_initializer_warning_helper":"duV7R","./_instanceof":"DszFx","./_interop_require_default":"9xGSo","./_interop_require_wildcard":"2fuD0","./_is_native_function":"gjDar","./_iterable_to_array":"ghgju","./_iterable_to_array_limit":"cPoAO","./_iterable_to_array_limit_loose":"7EuhG","./_jsx":"s7t55","./_new_arrow_check":"h5uFa","./_non_iterable_rest":"lRDzZ","./_non_iterable_spread":"gdOMd","./_object_spread":"jwAyI","./_object_without_properties":"icndG","./_object_without_properties_loose":"jUc0H","./_possible_constructor_return":"iSFj1","./_read_only_error":"483IM","./_set":"ajIlZ","./_set_prototype_of":"cuVIK","./_skip_first_generator_next":"1lBZO","./_sliced_to_array":"dxJni","./_sliced_to_array_loose":"fkb20","./_super_prop_base":"2lo6b","./_tagged_template_literal":"7zHwd","./_tagged_template_literal_loose":"8en5k","./_throw":"5Ze7U","./_to_array":"lGbgY","./_to_consumable_array":"24Ao1","./_to_primitive":"3i4Yp","./_to_property_key":"bezry","./_type_of":"6fYOq","./_wrap_async_generator":"3cWWb","./_wrap_native_super":"dJKRc","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"8Yizz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc1 = {
    };
    Object["keys"](descriptor).forEach(function(key) {
        desc1[key] = descriptor[key];
    });
    desc1.enumerable = !!desc1.enumerable;
    desc1.configurable = !!desc1.configurable;
    if ('value' in desc1 || desc1.initializer) desc1.writable = true;
    desc1 = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator ? decorator(target, property, desc) || desc : desc;
    }, desc1);
    if (context && desc1.initializer !== void 0) {
        desc1.value = desc1.initializer ? desc1.initializer.call(context) : void 0;
        desc1.initializer = undefined;
    }
    if (desc1.initializer === void 0) {
        Object["defineProperty"](target, property, desc1);
        desc1 = null;
    }
    return desc1;
}
exports.default = _applyDecoratedDescriptor;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"c3AsU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
exports.default = _arrayWithHoles;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"a6Vyf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)arr2[i] = arr[i];
        return arr2;
    }
}
exports.default = _arrayWithoutHoles;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"ahl85":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
exports.default = _assertThisInitialized;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"2pNMp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
function AsyncGenerator(gen) {
    var front, back;
    function send(key, arg) {
        return new Promise(function(resolve, reject) {
            var request = {
                key: key,
                arg: arg,
                resolve: resolve,
                reject: reject,
                next: null
            };
            if (back) back = back.next = request;
            else {
                front = back = request;
                resume(key, arg);
            }
        });
    }
    function resume(key, arg1) {
        try {
            var result = gen[key](arg1);
            var value = result.value;
            var wrappedAwait = value instanceof _awaitValueDefault.default;
            Promise.resolve(wrappedAwait ? value.wrapped : value).then(function(arg) {
                if (wrappedAwait) {
                    resume("next", arg);
                    return;
                }
                settle(result.done ? "return" : "normal", arg);
            }, function(err) {
                resume("throw", err);
            });
        } catch (err) {
            settle("throw", err);
        }
    }
    function settle(type, value) {
        switch(type){
            case "return":
                front.resolve({
                    value: value,
                    done: true
                });
                break;
            case "throw":
                front.reject(value);
                break;
            default:
                front.resolve({
                    value: value,
                    done: false
                });
                break;
        }
        front = front.next;
        if (front) resume(front.key, front.arg);
        else back = null;
    }
    this._invoke = send;
    if (typeof gen.return !== "function") this.return = undefined;
}
exports.default = AsyncGenerator;
if (typeof Symbol === "function" && Symbol.asyncIterator) AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
    return this;
};
AsyncGenerator.prototype.next = function(arg) {
    return this._invoke("next", arg);
};
AsyncGenerator.prototype.throw = function(arg) {
    return this._invoke("throw", arg);
};
AsyncGenerator.prototype.return = function(arg) {
    return this._invoke("return", arg);
};

},{"./_await_value":"jBb4j","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"jBb4j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _AwaitValue(value) {
    this.wrapped = value;
}
exports.default = _AwaitValue;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"ehHEd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {
    }, waiting = false;
    function pump(key, value) {
        waiting = true;
        value = new Promise(function(resolve) {
            resolve(inner[key](value));
        });
        return {
            done: false,
            value: awaitWrap(value)
        };
    }
    if (typeof Symbol === "function" && Symbol.iterator) iter[Symbol.iterator] = function() {
        return this;
    };
    iter.next = function(value) {
        if (waiting) {
            waiting = false;
            return value;
        }
        return pump("next", value);
    };
    if (typeof inner.throw === "function") iter.throw = function(value) {
        if (waiting) {
            waiting = false;
            throw value;
        }
        return pump("throw", value);
    };
    if (typeof inner.return === "function") iter.return = function(value) {
        return pump("return", value);
    };
    return iter;
}
exports.default = _asyncGeneratorDelegate;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"k0r6o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _asyncIterator(iterable) {
    var method;
    if (typeof Symbol === "function") {
        if (Symbol.asyncIterator) {
            method = iterable[Symbol.asyncIterator];
            if (method != null) return method.call(iterable);
        }
        if (Symbol.iterator) {
            method = iterable[Symbol.iterator];
            if (method != null) return method.call(iterable);
        }
    }
    throw new TypeError("Object is not async iterable");
}
exports.default = _asyncIterator;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"ascUm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
exports.default = _asyncToGenerator;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"1wrIf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
function _awaitAsyncGenerator(value) {
    return new _awaitValueDefault.default(value);
}
exports.default = _awaitAsyncGenerator;

},{"./_await_value":"jBb4j","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3iM9V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
exports.default = _classCallCheck;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"i3MOq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classNameTDZError(name) {
    throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
}
exports.default = _classNameTDZError;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"egFCX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver).value;
}
exports.default = _classPrivateFieldGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"lzIpb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) throw new TypeError("attempted to use private field on non-instance");
    return receiver;
}
exports.default = _classPrivateFieldBase;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"30bh1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
    var descriptor = privateMap.get(receiver);
    if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
    return value;
}
exports.default = _classPrivateFieldSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"gDuAt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
exports.default = _classPrivateMethodGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"5soyt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
}
exports.default = _classPrivateMethodSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9qYQR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) throw new TypeError("Private static access of wrong provenance");
    return descriptor.value;
}
exports.default = _classStaticPrivateFieldSpecGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"gnGok":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) throw new TypeError("Private static access of wrong provenance");
    if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
    return value;
}
exports.default = _classStaticPrivateFieldSpecSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3YcXO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function construct(Parent1, args1, Class1) {
    if (isNativeReflectConstruct()) construct = Reflect.construct;
    else construct = function construct(Parent, args, Class) {
        var a = [
            null
        ];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
    };
    return construct.apply(null, arguments);
}
function _construct(Parent, args, Class) {
    return construct.apply(null, arguments);
}
exports.default = _construct;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"34sNe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
exports.default = _createClass;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"cIHuz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _toArray = require("./_to_array");
var _toArrayDefault = parcelHelpers.interopDefault(_toArray);
var _toPropertyKey = require("./_to_property_key");
var _toPropertyKeyDefault = parcelHelpers.interopDefault(_toPropertyKey);
function _decorate(decorators, factory, superClass) {
    var r = factory(function initialize(O) {
        _initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
    _initializeClassElements(r.F, decorated.elements);
    return _runClassFinishers(r.F, decorated.finishers);
}
exports.default = _decorate;
function _createElementDescriptor(def) {
    var key = _toPropertyKeyDefault.default(def.key);
    var descriptor;
    if (def.kind === "method") {
        descriptor = {
            value: def.value,
            writable: true,
            configurable: true,
            enumerable: false
        };
        Object.defineProperty(def.value, "name", {
            value: _typeof(key) === "symbol" ? "" : key,
            configurable: true
        });
    } else if (def.kind === "get") descriptor = {
        get: def.value,
        configurable: true,
        enumerable: false
    };
    else if (def.kind === "set") descriptor = {
        set: def.value,
        configurable: true,
        enumerable: false
    };
    else if (def.kind === "field") descriptor = {
        configurable: true,
        writable: true,
        enumerable: true
    };
    var element = {
        kind: def.kind === "field" ? "field" : "method",
        key: key,
        placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
        descriptor: descriptor
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;
    return element;
}
function _coalesceGetterSetter(element, other) {
    if (element.descriptor.get !== undefined) other.descriptor.get = element.descriptor.get;
    else other.descriptor.set = element.descriptor.set;
}
function _coalesceClassElements(elements) {
    var newElements = [];
    var isSameElement = function isSameElement(other) {
        return other.kind === "method" && other.key === element.key && other.placement === element.placement;
    };
    for(var i = 0; i < elements.length; i++){
        var element = elements[i];
        var other1;
        if (element.kind === "method" && (other1 = newElements.find(isSameElement))) {
            if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other1.descriptor)) {
                if (_hasDecorators(element) || _hasDecorators(other1)) throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
                other1.descriptor = element.descriptor;
            } else {
                if (_hasDecorators(element)) {
                    if (_hasDecorators(other1)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + element.key + ").");
                    other1.decorators = element.decorators;
                }
                _coalesceGetterSetter(element, other1);
            }
        } else newElements.push(element);
    }
    return newElements;
}
function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
}
function _isDataDescriptor(desc) {
    return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}
function _initializeClassElements(F, elements) {
    var proto = F.prototype;
    [
        "method",
        "field"
    ].forEach(function(kind) {
        elements.forEach(function(element) {
            var placement = element.placement;
            if (element.kind === kind && (placement === "static" || placement === "prototype")) {
                var receiver = placement === "static" ? F : proto;
                _defineClassElement(receiver, element);
            }
        });
    });
}
function _initializeInstanceElements(O, elements) {
    [
        "method",
        "field"
    ].forEach(function(kind) {
        elements.forEach(function(element) {
            if (element.kind === kind && element.placement === "own") _defineClassElement(O, element);
        });
    });
}
function _defineClassElement(receiver, element) {
    var descriptor = element.descriptor;
    if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
    }
    Object.defineProperty(receiver, element.key, descriptor);
}
function _decorateClass(elements, decorators) {
    var newElements = [];
    var finishers = [];
    var placements = {
        static: [],
        prototype: [],
        own: []
    };
    elements.forEach(function(element) {
        _addElementPlacement(element, placements);
    });
    elements.forEach(function(element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = _decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
    });
    if (!decorators) return {
        elements: newElements,
        finishers: finishers
    };
    var result = _decorateConstructor(newElements, decorators);
    finishers.push.apply(finishers, result.finishers);
    result.finishers = finishers;
    return result;
}
function _addElementPlacement(element, placements, silent) {
    var keys = placements[element.placement];
    if (!silent && keys.indexOf(element.key) !== -1) throw new TypeError("Duplicated element (" + element.key + ")");
    keys.push(element.key);
}
function _decorateElement(element, placements) {
    var extras = [];
    var finishers = [];
    for(var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--){
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = _fromElementDescriptor(element);
        var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        _addElementPlacement(element, placements);
        if (elementFinisherExtras.finisher) finishers.push(elementFinisherExtras.finisher);
        var newExtras = elementFinisherExtras.extras;
        if (newExtras) {
            for(var j = 0; j < newExtras.length; j++)_addElementPlacement(newExtras[j], placements);
            extras.push.apply(extras, newExtras);
        }
    }
    return {
        element: element,
        finishers: finishers,
        extras: extras
    };
}
function _decorateConstructor(elements, decorators) {
    var finishers = [];
    for(var i = decorators.length - 1; i >= 0; i--){
        var obj = _fromClassDescriptor(elements);
        var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj);
        if (elementsAndFinisher.finisher !== undefined) finishers.push(elementsAndFinisher.finisher);
        if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;
            for(var j = 0; j < elements.length - 1; j++)for(var k = j + 1; k < elements.length; k++){
                if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) throw new TypeError("Duplicated element (" + elements[j].key + ")");
            }
        }
    }
    return {
        elements: elements,
        finishers: finishers
    };
}
function _fromElementDescriptor(element) {
    var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
    };
    var desc = {
        value: "Descriptor",
        configurable: true
    };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    if (element.kind === "field") obj.initializer = element.initializer;
    return obj;
}
function _toElementDescriptors(elementObjects) {
    if (elementObjects === undefined) return;
    return _toArrayDefault.default(elementObjects).map(function(elementObject) {
        var element = _toElementDescriptor(elementObject);
        _disallowProperty(elementObject, "finisher", "An element descriptor");
        _disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
    });
}
function _toElementDescriptor(elementObject) {
    var kind = String(elementObject.kind);
    if (kind !== "method" && kind !== "field") throw new TypeError("An element descriptor's .kind property must be either \"method\" or \"field\", but a decorator created an element descriptor with .kind \"" + kind + '"');
    var key = _toPropertyKeyDefault.default(elementObject.key);
    var placement = String(elementObject.placement);
    if (placement !== "static" && placement !== "prototype" && placement !== "own") throw new TypeError("An element descriptor's .placement property must be one of \"static\", \"prototype\" or \"own\", but a decorator created an element descriptor with .placement \"" + placement + '"');
    var descriptor = elementObject.descriptor;
    _disallowProperty(elementObject, "elements", "An element descriptor");
    var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({
        }, descriptor)
    };
    if (kind !== "field") _disallowProperty(elementObject, "initializer", "A method descriptor");
    else {
        _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
    }
    return element;
}
function _toElementFinisherExtras(elementObject) {
    var element = _toElementDescriptor(elementObject);
    var finisher = _optionalCallableProperty(elementObject, "finisher");
    var extras = _toElementDescriptors(elementObject.extras);
    return {
        element: element,
        finisher: finisher,
        extras: extras
    };
}
function _fromClassDescriptor(elements) {
    var obj = {
        kind: "class",
        elements: elements.map(_fromElementDescriptor)
    };
    var desc = {
        value: "Descriptor",
        configurable: true
    };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    return obj;
}
function _toClassDescriptor(obj) {
    var kind = String(obj.kind);
    if (kind !== "class") throw new TypeError("A class descriptor's .kind property must be \"class\", but a decorator created a class descriptor with .kind \"" + kind + '"');
    _disallowProperty(obj, "key", "A class descriptor");
    _disallowProperty(obj, "placement", "A class descriptor");
    _disallowProperty(obj, "descriptor", "A class descriptor");
    _disallowProperty(obj, "initializer", "A class descriptor");
    _disallowProperty(obj, "extras", "A class descriptor");
    var finisher = _optionalCallableProperty(obj, "finisher");
    var elements = _toElementDescriptors(obj.elements);
    return {
        elements: elements,
        finisher: finisher
    };
}
function _disallowProperty(obj, name, objectType) {
    if (obj[name] !== undefined) throw new TypeError(objectType + " can't have a ." + name + " property.");
}
function _optionalCallableProperty(obj, name) {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") throw new TypeError("Expected '" + name + "' to be a function");
    return value;
}
function _runClassFinishers(constructor, finishers) {
    for(var i = 0; i < finishers.length; i++){
        var newConstructor = (0, finishers[i])(constructor);
        if (newConstructor !== undefined) {
            if (typeof newConstructor !== "function") throw new TypeError("Finishers must return a constructor.");
            constructor = newConstructor;
        }
    }
    return constructor;
}

},{"./_to_array":"lGbgY","./_to_property_key":"bezry","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"lGbgY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
function _toArray(arr) {
    return _arrayWithHolesDefault.default(arr) || _iterableToArrayDefault.default(arr) || _nonIterableRestDefault.default();
}
exports.default = _toArray;

},{"./_array_with_holes":"c3AsU","./_iterable_to_array":"ghgju","./_non_iterable_rest":"lRDzZ","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"ghgju":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
exports.default = _iterableToArray;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"lRDzZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
exports.default = _nonIterableRest;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"bezry":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
var _toPrimitive = require("./_to_primitive");
var _toPrimitiveDefault = parcelHelpers.interopDefault(_toPrimitive);
function _toPropertyKey(arg) {
    var key = _toPrimitiveDefault.default(arg, "string");
    return _typeOfDefault.default(key) === "symbol" ? key : String(key);
}
exports.default = _toPropertyKey;

},{"./_type_of":"6fYOq","./_to_primitive":"3i4Yp","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"6fYOq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _typeof(obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
}
exports.default = _typeof;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3i4Yp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
function _toPrimitive(input, hint) {
    if (_typeOfDefault.default(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_typeOfDefault.default(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
exports.default = _toPrimitive;

},{"./_type_of":"6fYOq","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"jK8lu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        var value = Object.getOwnPropertyDescriptor(defaults, key);
        if (value && value.configurable && obj[key] === undefined) Object.defineProperty(obj, key, value);
    }
    return obj;
}
exports.default = _defaults;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3fw0o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineEnumerableProperties(obj, descs) {
    for(var key in descs){
        var desc = descs[key];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, key, desc);
    }
    if (Object.getOwnPropertySymbols) {
        var objectSymbols = Object.getOwnPropertySymbols(descs);
        for(var i = 0; i < objectSymbols.length; i++){
            var sym = objectSymbols[i];
            var desc = descs[sym];
            desc.configurable = desc.enumerable = true;
            if ("value" in desc) desc.writable = true;
            Object.defineProperty(obj, sym, desc);
        }
    }
    return obj;
}
exports.default = _defineEnumerableProperties;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3z9h9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
exports.default = _defineProperty;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"fuB43":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function extends_() {
    extends_ = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return extends_.apply(this, arguments);
}
function _extends() {
    return extends_.apply(this, arguments);
}
exports.default = _extends;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"llcaT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
function get(target1, property1, receiver1) {
    if (typeof Reflect !== "undefined" && Reflect.get) get = Reflect.get;
    else get = function get(target, property, receiver) {
        var base = _superPropBaseDefault.default(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) return desc.get.call(receiver || target);
        return desc.value;
    };
    return get(target1, property1, receiver1);
}
function _get(target, property, reciever) {
    return get(target, property, reciever);
}
exports.default = _get;

},{"./_super_prop_base":"2lo6b","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"2lo6b":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOfDefault.default(object);
        if (object === null) break;
    }
    return object;
}
exports.default = _superPropBase;

},{"./_get_prototype_of":"japC6","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"japC6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getPrototypeOf(o1) {
    getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return getPrototypeOf(o1);
}
function _getPrototypeOf(o) {
    return getPrototypeOf(o);
}
exports.default = _getPrototypeOf;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"iyhXz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOfDefault.default(subClass, superClass);
}
exports.default = _inherits;

},{"./_set_prototype_of":"cuVIK","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"cuVIK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function setPrototypeOf(o1, p1) {
    setPrototypeOf = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return setPrototypeOf(o1, p1);
}
function _setPrototypeOf(o, p) {
    return setPrototypeOf(o, p);
}
exports.default = _setPrototypeOf;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"iluuo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
exports.default = _inheritsLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9Pu0n":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}
exports.default = _initializerDefineProperty;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"duV7R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _initializerWarningHelper(descriptor, context) {
    throw new Error("Decorating class property failed. Please ensure that proposal-class-properties is enabled and set to use loose mode. To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2.");
}
exports.default = _initializerWarningHelper;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"DszFx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) return right[Symbol.hasInstance](left);
    else return left instanceof right;
}
exports.default = _instanceof;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9xGSo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports.default = _interopRequireDefault;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"2fuD0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {
                };
                if (desc.get || desc.set) Object.defineProperty(newObj, key, desc);
                else newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
exports.default = _interopRequireWildcard;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"gjDar":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
exports.default = _isNativeFunction;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"cPoAO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
exports.default = _iterableToArrayLimit;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"7EuhG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArrayLimitLoose(arr, i) {
    var _arr = [];
    for(var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;){
        _arr.push(_step.value);
        if (i && _arr.length === i) break;
    }
    return _arr;
}
exports.default = _iterableToArrayLimitLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"s7t55":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var REACT_ELEMENT_TYPE;
function _createRawReactElement(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 60103;
    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;
    if (!props && childrenLength !== 0) props = {
        children: void 0
    };
    if (props && defaultProps) {
        for(var propName in defaultProps)if (props[propName] === void 0) props[propName] = defaultProps[propName];
    } else if (!props) props = defaultProps || {
    };
    if (childrenLength === 1) props.children = children;
    else if (childrenLength > 1) {
        var childArray = new Array(childrenLength);
        for(var i = 0; i < childrenLength; i++)childArray[i] = arguments[i + 3];
        props.children = childArray;
    }
    return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key === undefined ? null : '' + key,
        ref: null,
        props: props,
        _owner: null
    };
}
exports.default = _createRawReactElement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"h5uFa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) throw new TypeError("Cannot instantiate an arrow function");
}
exports.default = _newArrowCheck;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"gdOMd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}
exports.default = _nonIterableSpread;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"jwAyI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            _definePropertyDefault.default(target, key, source[key]);
        });
    }
    return target;
}
exports.default = _objectSpread;

},{"./_define_property":"3z9h9","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"icndG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _objectWithoutPropertiesLoose = require("./_object_without_properties_loose");
var _objectWithoutPropertiesLooseDefault = parcelHelpers.interopDefault(_objectWithoutPropertiesLoose);
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {
    };
    var target = _objectWithoutPropertiesLooseDefault.default(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
exports.default = _objectWithoutProperties;

},{"./_object_without_properties_loose":"jUc0H","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"jUc0H":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {
    };
    var target = {
    };
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
exports.default = _objectWithoutPropertiesLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"iSFj1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _assertThisInitialized = require("./_assert_this_initialized");
var _assertThisInitializedDefault = parcelHelpers.interopDefault(_assertThisInitialized);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
function _possibleConstructorReturn(self, call) {
    if (call && (_typeOfDefault.default(call) === "object" || typeof call === "function")) return call;
    return _assertThisInitializedDefault.default(self);
}
exports.default = _possibleConstructorReturn;

},{"./_assert_this_initialized":"ahl85","./_type_of":"6fYOq","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"483IM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _readOnlyError(name) {
    throw new Error("\"" + name + "\" is read-only");
}
exports.default = _readOnlyError;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"ajIlZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
function set(target1, property1, value1, receiver1) {
    if (typeof Reflect !== "undefined" && Reflect.set) set = Reflect.set;
    else set = function set(target, property, value, receiver) {
        var base = _superPropBaseDefault.default(target, property);
        var desc;
        if (base) {
            desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.set) {
                desc.set.call(receiver, value);
                return true;
            } else if (!desc.writable) return false;
        }
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
            if (!desc.writable) return false;
            desc.value = value;
            Object.defineProperty(receiver, property, desc);
        } else _definePropertyDefault.default(receiver, property, value);
        return true;
    };
    return set(target1, property1, value1, receiver1);
}
function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) throw new Error('failed to set property');
    return value;
}
exports.default = _set;

},{"./_define_property":"3z9h9","./_super_prop_base":"2lo6b","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"1lBZO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _skipFirstGeneratorNext(fn) {
    return function() {
        var it = fn.apply(this, arguments);
        it.next();
        return it;
    };
}
exports.default = _skipFirstGeneratorNext;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"dxJni":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
function _slicedToArray(arr, i) {
    return _arrayWithHolesDefault.default(arr) || _iterableToArrayDefault.default(arr, i) || _nonIterableRestDefault.default();
}
exports.default = _slicedToArray;

},{"./_array_with_holes":"c3AsU","./_iterable_to_array":"ghgju","./_non_iterable_rest":"lRDzZ","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"fkb20":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _iterableToArrayLimitLoose = require("./_iterable_to_array_limit_loose");
var _iterableToArrayLimitLooseDefault = parcelHelpers.interopDefault(_iterableToArrayLimitLoose);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
function _slicedToArrayLoose(arr, i) {
    return _arrayWithHolesDefault.default(arr) || _iterableToArrayLimitLooseDefault.default(arr, i) || _nonIterableRestDefault.default();
}
exports.default = _slicedToArrayLoose;

},{"./_array_with_holes":"c3AsU","./_iterable_to_array_limit_loose":"7EuhG","./_non_iterable_rest":"lRDzZ","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"7zHwd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) raw = strings.slice(0);
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
exports.default = _taggedTemplateLiteral;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"8en5k":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) raw = strings.slice(0);
    strings.raw = raw;
    return strings;
}
exports.default = _taggedTemplateLiteralLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"5Ze7U":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _throw(e) {
    throw e;
}
exports.default = _throw;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"24Ao1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithoutHoles = require("./_array_without_holes");
var _arrayWithoutHolesDefault = parcelHelpers.interopDefault(_arrayWithoutHoles);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _nonIterableSpread = require("./_non_iterable_spread");
var _nonIterableSpreadDefault = parcelHelpers.interopDefault(_nonIterableSpread);
function _toConsumableArray(arr) {
    return _arrayWithoutHolesDefault.default(arr) || _iterableToArrayDefault.default(arr) || _nonIterableSpreadDefault.default();
}
exports.default = _toConsumableArray;

},{"./_array_without_holes":"a6Vyf","./_iterable_to_array":"ghgju","./_non_iterable_spread":"gdOMd","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3cWWb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _asyncGenerator = require("./_async_generator");
var _asyncGeneratorDefault = parcelHelpers.interopDefault(_asyncGenerator);
function _wrapAsyncGenerator(fn) {
    return function() {
        return new _asyncGeneratorDefault.default(fn.apply(this, arguments));
    };
}
exports.default = _wrapAsyncGenerator;

},{"./_async_generator":"2pNMp","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"dJKRc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _construct = require("./_construct");
var _constructDefault = parcelHelpers.interopDefault(_construct);
var _isNativeFunction = require("./_is_native_function");
var _isNativeFunctionDefault = parcelHelpers.interopDefault(_isNativeFunction);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
function wrapNativeSuper(Class1) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    wrapNativeSuper = function wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunctionDefault.default(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _constructDefault.default(Class, arguments, _getPrototypeOfDefault.default(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOfDefault.default(Wrapper, Class);
    };
    return wrapNativeSuper(Class1);
}
function _wrapNativeSuper(Class) {
    return wrapNativeSuper(Class);
}
exports.default = _wrapNativeSuper;

},{"./_construct":"3YcXO","./_is_native_function":"gjDar","./_get_prototype_of":"japC6","./_set_prototype_of":"cuVIK","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"eousC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scale", ()=>scale
);
parcelHelpers.export(exports, "rgbToHex", ()=>rgbToHex
);
parcelHelpers.export(exports, "rgbStringToHex", ()=>rgbStringToHex
);
parcelHelpers.export(exports, "getViewportForSpecification", ()=>getViewportForSpecification
);
parcelHelpers.export(exports, "colorSpecifierToHex", ()=>colorSpecifierToHex
);
parcelHelpers.export(exports, "getScaleForSpecification", ()=>getScaleForSpecification
);
parcelHelpers.export(exports, "getDimAndMarginStyleForSpecification", ()=>getDimAndMarginStyleForSpecification
);
parcelHelpers.export(exports, "getQuadraticBezierCurveForPoints", ()=>getQuadraticBezierCurveForPoints
);
parcelHelpers.export(exports, "DEFAULT_WIDTH", ()=>DEFAULT_WIDTH
);
parcelHelpers.export(exports, "DEFAULT_HEIGHT", ()=>DEFAULT_HEIGHT
);
var _genomeSizes = require("./genome-sizes");
var _d3Color = require("d3-color");
/**
 * Returns a linear scale to map elements in domain to elements in range.
 * @param {Array} domain array of length two containing minimum and maximum values
 * @param {Array} range array of length two containing minimum and maximum values
 * @returns linear scale mapping domain to range
 */ function scale(domain, range) {
    const domainLength = domain[1] - domain[0];
    const rangeLength = range[1] - range[0];
    const slope = rangeLength / domainLength;
    const intercept = range[1] - slope * domain[1];
    return (x)=>slope * x + intercept
    ;
}
/**
 * Maps RGB values to integer for webgl buffer.
 *
 * @param {Integer} red value from 0 to 255
 * @param {Integer} green value from 0 to 255
 * @param {Integer} blue value from 0 to 255
 * @returns RGB hex value as integer
 */ function rgbToHex(red, green, blue) {
    return red << 16 | green << 8 | blue << 0;
}
function rgbStringToHex(rgb) {
    const colorVals = rgb.substring(4, rgb.length - 1).split(",");
    return rgbToHex(...colorVals.map((asStr)=>parseInt(asStr)
    ));
}
function colorSpecifierToHex(specifier) {
    if (!isNaN(specifier)) // Specifier is already a hex value
    return Math.floor(specifier);
    const asColor = _d3Color.color(specifier);
    return rgbToHex(asColor.r, asColor.g, asColor.b);
}
/**
 * Get the VIEWPORT of the specification to be used by the mouseReader.
 * If all types for a dimension across tracks are categorical or genomic,
 * will default to [-1, 1] for that dimension for the mouseReader. If X or Y
 * has a fixed value, it will consider the width or height channel domains.
 *
 * @param {Object} specification of visualization
 * @returns [smallestX, largestX, smallestY, largestY] of viewport
 */ function getViewportForSpecification(specification) {
    let smallestX = Number.POSITIVE_INFINITY;
    let largestX = Number.NEGATIVE_INFINITY;
    let smallestY = Number.POSITIVE_INFINITY;
    let largestY = Number.NEGATIVE_INFINITY;
    specification.tracks.forEach((track)=>{
        let xDomain = track.x.domain;
        if (!xDomain && track.x.value !== undefined && track.width.domain !== undefined) xDomain = track.width.domain;
        let yDomain = track.y.domain;
        if (!yDomain && track.y.value !== undefined && track.height && track.height.domain !== undefined) yDomain = track.height.domain;
        if (xDomain) {
            smallestX = xDomain[0] < smallestX ? xDomain[0] : smallestX;
            largestX = xDomain[1] > largestX ? xDomain[1] : largestX;
        }
        if (yDomain) {
            smallestY = yDomain[0] < smallestY ? yDomain[0] : smallestY;
            largestY = yDomain[1] > largestY ? yDomain[1] : largestY;
        }
    });
    smallestX = smallestX === Number.POSITIVE_INFINITY ? -1 : smallestX;
    largestX = largestX === Number.NEGATIVE_INFINITY ? 1 : largestX;
    smallestY = smallestY === Number.POSITIVE_INFINITY ? -1 : smallestY;
    largestY = largestY === Number.NEGATIVE_INFINITY ? 1 : largestY;
    return [
        smallestX,
        largestX,
        smallestY,
        largestY
    ];
}
/**
 * Given a specification, return a SCALE to be used for mapping data points to clip space
 * for the drawer.
 *
 * @param {String} dimension either x or y
 * @param {Object} specification for the visualization
 * @returns function which can be used to map to an "x" or "y" value
 */ const getScaleForSpecification = (dimension, specification)=>{
    if (dimension !== "x" && dimension !== "y") console.error(`${dimension} is not x or y!`);
    let genomic = false;
    let genome;
    for (const track of specification.tracks)if (track[dimension].type && track[dimension].type.includes("genomic")) {
        genome = track[dimension].genome;
        genomic = true;
        break;
    }
    if (!genomic) {
        const viewport = getViewportForSpecification(specification);
        if (dimension === "x") return scale([
            viewport[0],
            viewport[1]
        ], [
            -1,
            1
        ]);
        return scale([
            viewport[2],
            viewport[3]
        ], [
            -1,
            1
        ]);
    }
    const geneScale = _genomeSizes.GenomeScale.completeScale(genome);
    let smallestGene = undefined;
    let smallestGeneValue = Number.POSITIVE_INFINITY;
    let largestGene = undefined;
    let largestGeneValue = Number.NEGATIVE_INFINITY;
    for (const track1 of specification.tracks){
        let xDomain = track1[dimension].domain;
        if (xDomain) {
            if (geneScale.toClipSpaceFromString(xDomain[0]) < smallestGeneValue) {
                smallestGeneValue = geneScale.toClipSpaceFromString(xDomain[0]);
                smallestGene = xDomain[0];
            }
            if (geneScale.toClipSpaceFromString(xDomain[1]) > largestGeneValue) {
                largestGeneValue = geneScale.toClipSpaceFromString(xDomain[1]);
                largestGene = xDomain[1];
            }
        }
    }
    const asScale = new _genomeSizes.GenomeScale(genome, [
        smallestGene,
        largestGene
    ]);
    return asScale.toCallable();
};
const RELATIVE_LENGTH_UNITS = [
    "em",
    "ex",
    "ch",
    "rem",
    "lh",
    "vw",
    "vh",
    "vmin",
    "vmax",
    "%", 
];
const getPixelMeasurement = (cssMeasurement)=>{
    if (RELATIVE_LENGTH_UNITS.some((unit)=>cssMeasurement.includes(unit)
    )) return false;
    const asFloat = parseFloat(cssMeasurement);
    return isNaN(asFloat) ? false : asFloat;
};
const DEFAULT_MARGIN = "50px";
const DEFAULT_WIDTH = "100%";
const DEFAULT_HEIGHT = DEFAULT_WIDTH;
const getDimAndMarginStyleForSpecification = (specification)=>{
    let toReturn = {
    };
    const calculatedMargins = {
    };
    if (specification.margins === undefined) {
        toReturn.margin = DEFAULT_MARGIN;
        calculatedMargins.top = DEFAULT_MARGIN;
        calculatedMargins.right = DEFAULT_MARGIN;
        calculatedMargins.bottom = DEFAULT_MARGIN;
        calculatedMargins.left = DEFAULT_MARGIN;
    } else {
        calculatedMargins.top = specification.margins.top === undefined ? DEFAULT_MARGIN : specification.margins.top;
        calculatedMargins.right = specification.margins.right === undefined ? DEFAULT_MARGIN : specification.margins.right;
        calculatedMargins.bottom = specification.margins.bottom === undefined ? DEFAULT_MARGIN : specification.margins.bottom;
        calculatedMargins.left = specification.margins.left === undefined ? DEFAULT_MARGIN : specification.margins.left;
        // Shorthand for top right bottom left
        toReturn.margin = `${calculatedMargins.top}
                       ${calculatedMargins.right}
                       ${calculatedMargins.bottom}
                       ${calculatedMargins.left}`;
    }
    const calculatedWidth = specification.width || DEFAULT_WIDTH;
    const calculatedHeight = specification.height || DEFAULT_HEIGHT;
    const allMeasurements = [
        calculatedMargins.top,
        calculatedMargins.right,
        calculatedMargins.bottom,
        calculatedMargins.left,
        calculatedWidth,
        calculatedHeight, 
    ];
    if (allMeasurements.every(getPixelMeasurement)) {
        // Let's encode as a number to allow users using typescript or doing weird DOM things able to define
        // the width and height explicitly
        toReturn.width = getPixelMeasurement(calculatedWidth) - getPixelMeasurement(calculatedMargins.left) - getPixelMeasurement(calculatedMargins.right);
        toReturn.height = getPixelMeasurement(calculatedHeight) - getPixelMeasurement(calculatedMargins.bottom) - getPixelMeasurement(calculatedMargins.top);
    } else {
        // If user is using css units in their margins and dimensions, then use css calc
        toReturn.width = `calc(
      ${calculatedWidth} - 
      ${calculatedMargins.left} - 
      ${calculatedMargins.right}
    )`;
        toReturn.height = `calc(
      ${calculatedHeight} - 
      ${calculatedMargins.top} - 
      ${calculatedMargins.bottom}
    )`;
    }
    return toReturn;
};
/**
 * We need to calculate points on the arc for that mark type, but it needs to be quick.
 * In addition, it shouldn't be a perfect circle, and also should look somewhat arc like.
 * This utility funciton returns function that takes a value between 0 and 1 where 0 maps
 * to the first control point, and 1 maps to the third control point.
 *
 * https://math.stackexchange.com/a/1361717
 *
 * @param {Array} P0 first control point
 * @param {Array} P1 second control point
 * @param {Array} P2 third control point
 * @returns a function [0, 1] -> point on curve
 */ const getQuadraticBezierCurveForPoints = (P0, P1, P2)=>{
    const x = (t)=>(1 - t) ** 2 * P0[0] + 2 * t * (1 - t) * P1[0] + t ** 2 * P2[0]
    ;
    const y = (t)=>(1 - t) ** 2 * P0[1] + 2 * t * (1 - t) * P1[1] + t ** 2 * P2[1]
    ;
    return (t)=>[
            x(t),
            y(t)
        ]
    ;
};

},{"./genome-sizes":"1j7Fy","d3-color":"gIpJt","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"1j7Fy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "genomeSizes", ()=>genomeSizes
);
parcelHelpers.export(exports, "GenomeScale", ()=>GenomeScale
);
var _utilities = require("./utilities");
var _d3Format = require("d3-format");
/**
 * Create a function which maps a genome pair to a location in the entire genome
 *
 * @param {String} genomeId key from genomeSizes object
 * @returns a function which maps a (chrId, pairNum) => to
 *  a number between 1 and total number of genes in the genome
 */ const createPairMapperToGenome = (genomeId)=>{
    let chrSizes = genomeSizes[genomeId];
    let chrStarts = new Map();
    let cumulativeTotal = 0;
    chrSizes.forEach((value, key)=>{
        chrStarts.set(key, cumulativeTotal);
        cumulativeTotal += value;
    });
    return (chr, pairNum)=>{
        return chrStarts.get(chr) + pairNum;
    };
};
class GenomeScale {
    /**
   * Map a genome pair to [-1, 1] with the parts.
   *
   * @param {String} chr id of chromosome in genome
   * @param {Number} pair location in chromosome
   * @returns value in [-1, 1] corresponding to genome range location
   */ toClipSpaceFromParts(chr, pair) {
        return this.mapGenomeIndexToClipSpace(this.mapPairToGenomeIndex(chr, pair));
    }
    /**
   * Utility method for calling this.toClipSpaceFromParts.
   *
   * @param {String} pairStr in form "chrID:geneNumber" ex: "chr1:1000"
   * @returns value in [-1, 1] corresponding to genome range location
   */ toClipSpaceFromString(pairStr) {
        let [chr, pair] = pairStr.substring(3).split(":");
        pair = parseInt(pair);
        return this.toClipSpaceFromParts(chr, pair);
    }
    /**
   * Get the gene id from a value between [-1, 1]
   *
   * @param {Number} num number between [-1, 1]
   * @param {String} formatting used for formatting gene number with d3-format
   * @returns `chr${chrId}:${chrLoc}`
   */ inverse(num, formatting = false) {
        let genomeSpot = Math.floor(this.mapGenomeIndexToClipSpaceInverse(num));
        let chrId;
        let chrLoc;
        let cumulativeTotal = 0;
        for (const [chrKey, pairCount] of genomeSizes[this.genomeId].entries()){
            if (cumulativeTotal + pairCount >= genomeSpot) {
                chrLoc = genomeSpot - cumulativeTotal;
                chrId = chrKey;
                break;
            }
            cumulativeTotal += pairCount;
        }
        return formatting ? `chr${chrId}:${_d3Format.format(formatting)(chrLoc)}` : `chr${chrId}:${chrLoc}`;
    }
    getMidpoint(chr1, gene1, chr2, gene2) {
        const x1 = this.toClipSpaceFromParts(chr1, gene1);
        const x2 = this.toClipSpaceFromParts(chr2, gene2);
        const middleGene = this.inverse((x1 + x2) / 2);
        const [chrId, gene] = middleGene.substring(3).split(":");
        return [
            chrId,
            parseInt(gene)
        ];
    }
    /**
   * Get a sequence of ticks for a range in the genome.
   *
   * @param {Number} start number between [-1, 1]
   * @param {Number} end number between [-1, 1] > start
   * @returns object with tickCoords and corresponding tickLabels property
   */ getTickCoordsAndLabels(start, end) {
        let [startChr, startPair] = this.inverse(start).substring(3).split(":");
        let [endChr, endPair] = this.inverse(end).substring(3).split(":");
        const toReturn = [];
        let suggestedFormat;
        if (startChr === endChr) {
            let difference = endPair - startPair;
            let magnitude = Math.floor(Math.log10(difference));
            let startingValue = startPair - startPair % 10 ** magnitude;
            suggestedFormat = _d3Format.precisionRound(10 ** magnitude, startingValue);
            for(let currValue = startingValue; currValue < endPair; currValue += 10 ** magnitude)toReturn.push(this.toClipSpaceFromParts(startChr, currValue));
        } else {
            suggestedFormat = "1";
            for (const chrId of genomeSizes[this.genomeId].keys())toReturn.push(this.toClipSpaceFromParts(chrId, 1));
        }
        return {
            tickCoords: toReturn,
            tickLabels: toReturn.map((coord)=>this.inverse(coord, _d3Format.format(`.${suggestedFormat}s`))
            )
        };
    }
    toCallable() {
        // TODO investigate if using this method in the vertex calculator leads to slow downs
        const func = (args)=>{
            return this.toClipSpaceFromParts(args[0], args[1]);
        };
        func.isGenomeScale = true;
        func.mapGenomeIndexToClipSpaceInverse = this.mapGenomeIndexToClipSpaceInverse.bind(this);
        func.getMidpoint = this.getMidpoint.bind(this);
        func.getTickCoordsAndLabels = this.getTickCoordsAndLabels.bind(this);
        return func;
    }
    /**
   * Utility method for getting a GenomeScale across an entire genome.
   *
   * @param {String} genomeId from genomeSizes
   * @returns a GenomeScale across an entire genome
   */ static completeScale(genomeId) {
        const chrSizes = genomeSizes[genomeId];
        const finalEntry = [
            ...chrSizes.entries()
        ][chrSizes.size - 1];
        return new GenomeScale(genomeId, [
            "chr1:1",
            `chr${finalEntry[0]}:${finalEntry[1]}`, 
        ]);
    }
    /**
   * A scale used to map a genome pair to a location between -1 and 1 for data visualization.
   * Also contains inverse and utility functions for getting labels for axis.
   *
   * @param {String} genomeId key from genomeSizes object
   * @param {Array} domain array of length 2 containing the start and end of the genome
   *   for the scale. ex: ["chr2:1000", "chr3:2000"]
   */ constructor(genomeId, domain){
        if (genomeSizes[genomeId] === undefined) console.error(`${genomeId} is not a recognized genome!`);
        this.genomeId = genomeId;
        this.domain = domain;
        let [startChr, startPair] = domain[0].substring(3) // Remove chr
        .split(":"); // split chromesome and pair number
        startPair = parseInt(startPair);
        let [endChr, endPair] = domain[1].substring(3).split(":");
        endPair = parseInt(endPair);
        this.mapPairToGenomeIndex = createPairMapperToGenome(genomeId);
        const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
        const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
        this.mapGenomeIndexToClipSpace = _utilities.scale([
            firstPairInDomain,
            lastPairInDomain
        ], [
            -1,
            1
        ]);
        this.mapGenomeIndexToClipSpaceInverse = _utilities.scale([
            -1,
            1
        ], [
            firstPairInDomain,
            lastPairInDomain
        ]);
    }
}
/**
 * Available genomes to visualize. Each genome is a map from chromosome id to number of genes in chromosome.
 * Order matters as maps remember insertion order.
 */ const genomeSizes = {
    hg38: new Map([
        [
            "1",
            248956422
        ],
        [
            "2",
            242193529
        ],
        [
            "3",
            198295559
        ],
        [
            "4",
            190214555
        ],
        [
            "5",
            181538259
        ],
        [
            "6",
            170805979
        ],
        [
            "7",
            159345973
        ],
        [
            "8",
            145138636
        ],
        [
            "9",
            138394717
        ],
        [
            "10",
            135086622
        ],
        [
            "11",
            133797422
        ],
        [
            "12",
            133275309
        ],
        [
            "13",
            114364328
        ],
        [
            "14",
            107043718
        ],
        [
            "15",
            101991189
        ],
        [
            "16",
            90338345
        ],
        [
            "17",
            83257441
        ],
        [
            "18",
            80373285
        ],
        [
            "19",
            58617616
        ],
        [
            "20",
            64444167
        ],
        [
            "21",
            46709983
        ],
        [
            "22",
            50818468
        ],
        [
            "X",
            156040895
        ],
        [
            "Y",
            57227415
        ]
    ]),
    hg19: new Map([
        [
            "1",
            249250621
        ],
        [
            "2",
            243199373
        ],
        [
            "3",
            198022430
        ],
        [
            "4",
            191154276
        ],
        [
            "5",
            180915260
        ],
        [
            "6",
            171115067
        ],
        [
            "7",
            159138663
        ],
        [
            "8",
            146364022
        ],
        [
            "9",
            141213431
        ],
        [
            "10",
            135534747
        ],
        [
            "11",
            135006516
        ],
        [
            "12",
            133851895
        ],
        [
            "13",
            115169878
        ],
        [
            "14",
            107349540
        ],
        [
            "15",
            102531392
        ],
        [
            "16",
            90354753
        ],
        [
            "17",
            81195210
        ],
        [
            "18",
            78077248
        ],
        [
            "19",
            59128983
        ],
        [
            "20",
            63025520
        ],
        [
            "21",
            48129895
        ],
        [
            "22",
            51304566
        ],
        [
            "X",
            155270560
        ],
        [
            "Y",
            59373566
        ]
    ]),
    mm9: new Map([
        [
            "1",
            197195432
        ],
        [
            "2",
            181748087
        ],
        [
            "3",
            159599783
        ],
        [
            "4",
            155630120
        ],
        [
            "5",
            152537259
        ],
        [
            "6",
            149517037
        ],
        [
            "7",
            152524553
        ],
        [
            "8",
            131738871
        ],
        [
            "9",
            124076172
        ],
        [
            "10",
            129993255
        ],
        [
            "11",
            121843856
        ],
        [
            "12",
            121257530
        ],
        [
            "13",
            120284312
        ],
        [
            "14",
            125194864
        ],
        [
            "15",
            103494974
        ],
        [
            "16",
            98319150
        ],
        [
            "17",
            95272651
        ],
        [
            "18",
            90772031
        ],
        [
            "19",
            61342430
        ],
        [
            "X",
            166650296
        ],
        [
            "Y",
            15902555
        ], 
    ]),
    mm10: new Map([
        [
            "1",
            195471971
        ],
        [
            "2",
            182113224
        ],
        [
            "3",
            160039680
        ],
        [
            "4",
            156508116
        ],
        [
            "5",
            151834684
        ],
        [
            "6",
            149736546
        ],
        [
            "7",
            145441459
        ],
        [
            "8",
            129401213
        ],
        [
            "9",
            124595110
        ],
        [
            "10",
            130694993
        ],
        [
            "11",
            122082543
        ],
        [
            "12",
            120129022
        ],
        [
            "13",
            120421639
        ],
        [
            "14",
            124902244
        ],
        [
            "15",
            104043685
        ],
        [
            "16",
            98207768
        ],
        [
            "17",
            94987271
        ],
        [
            "18",
            90702639
        ],
        [
            "19",
            61431566
        ],
        [
            "X",
            171031299
        ],
        [
            "Y",
            91744698
        ], 
    ]),
    mm39: new Map([
        [
            "1",
            195154279
        ],
        [
            "2",
            181755017
        ],
        [
            "3",
            159745316
        ],
        [
            "4",
            156860686
        ],
        [
            "5",
            151758149
        ],
        [
            "6",
            149588044
        ],
        [
            "7",
            144995196
        ],
        [
            "8",
            130127694
        ],
        [
            "9",
            124359700
        ],
        [
            "10",
            130530862
        ],
        [
            "11",
            121973369
        ],
        [
            "12",
            120092757
        ],
        [
            "13",
            120883175
        ],
        [
            "14",
            125139656
        ],
        [
            "15",
            104073951
        ],
        [
            "16",
            98008968
        ],
        [
            "17",
            95294699
        ],
        [
            "18",
            90720763
        ],
        [
            "19",
            61420004
        ],
        [
            "X",
            169476592
        ],
        [
            "Y",
            91455967
        ]
    ])
};

},{"./utilities":"eousC","d3-format":"gADln","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"gADln":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "formatDefaultLocale", ()=>_defaultLocaleJsDefault.default
);
parcelHelpers.export(exports, "format", ()=>_defaultLocaleJs.format
);
parcelHelpers.export(exports, "formatPrefix", ()=>_defaultLocaleJs.formatPrefix
);
parcelHelpers.export(exports, "formatLocale", ()=>_localeJsDefault.default
);
parcelHelpers.export(exports, "formatSpecifier", ()=>_formatSpecifierJsDefault.default
);
parcelHelpers.export(exports, "FormatSpecifier", ()=>_formatSpecifierJs.FormatSpecifier
);
parcelHelpers.export(exports, "precisionFixed", ()=>_precisionFixedJsDefault.default
);
parcelHelpers.export(exports, "precisionPrefix", ()=>_precisionPrefixJsDefault.default
);
parcelHelpers.export(exports, "precisionRound", ()=>_precisionRoundJsDefault.default
);
var _defaultLocaleJs = require("./defaultLocale.js");
var _defaultLocaleJsDefault = parcelHelpers.interopDefault(_defaultLocaleJs);
var _localeJs = require("./locale.js");
var _localeJsDefault = parcelHelpers.interopDefault(_localeJs);
var _formatSpecifierJs = require("./formatSpecifier.js");
var _formatSpecifierJsDefault = parcelHelpers.interopDefault(_formatSpecifierJs);
var _precisionFixedJs = require("./precisionFixed.js");
var _precisionFixedJsDefault = parcelHelpers.interopDefault(_precisionFixedJs);
var _precisionPrefixJs = require("./precisionPrefix.js");
var _precisionPrefixJsDefault = parcelHelpers.interopDefault(_precisionPrefixJs);
var _precisionRoundJs = require("./precisionRound.js");
var _precisionRoundJsDefault = parcelHelpers.interopDefault(_precisionRoundJs);

},{"./defaultLocale.js":"ashkf","./locale.js":"1EmPV","./formatSpecifier.js":"2XT1F","./precisionFixed.js":false,"./precisionPrefix.js":false,"./precisionRound.js":"dENQ5","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"ashkf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "format", ()=>format
);
parcelHelpers.export(exports, "formatPrefix", ()=>formatPrefix
);
var _localeJs = require("./locale.js");
var _localeJsDefault = parcelHelpers.interopDefault(_localeJs);
var locale;
var format;
var formatPrefix;
defaultLocale({
    thousands: ",",
    grouping: [
        3
    ],
    currency: [
        "$",
        ""
    ]
});
function defaultLocale(definition) {
    locale = _localeJsDefault.default(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
}
exports.default = defaultLocale;

},{"./locale.js":"1EmPV","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"1EmPV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _exponentJs = require("./exponent.js");
var _exponentJsDefault = parcelHelpers.interopDefault(_exponentJs);
var _formatGroupJs = require("./formatGroup.js");
var _formatGroupJsDefault = parcelHelpers.interopDefault(_formatGroupJs);
var _formatNumeralsJs = require("./formatNumerals.js");
var _formatNumeralsJsDefault = parcelHelpers.interopDefault(_formatNumeralsJs);
var _formatSpecifierJs = require("./formatSpecifier.js");
var _formatSpecifierJsDefault = parcelHelpers.interopDefault(_formatSpecifierJs);
var _formatTrimJs = require("./formatTrim.js");
var _formatTrimJsDefault = parcelHelpers.interopDefault(_formatTrimJs);
var _formatTypesJs = require("./formatTypes.js");
var _formatTypesJsDefault = parcelHelpers.interopDefault(_formatTypesJs);
var _formatPrefixAutoJs = require("./formatPrefixAuto.js");
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
var map = Array.prototype.map, prefixes = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "µ",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y"
];
exports.default = function(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? _identityJsDefault.default : _formatGroupJsDefault.default(map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? _identityJsDefault.default : _formatNumeralsJsDefault.default(map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "−" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
    function newFormat(specifier) {
        specifier = _formatSpecifierJsDefault.default(specifier);
        var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";
        else if (!_formatTypesJsDefault.default[type]) precision === undefined && (precision = 12), trim = true, type = "g";
        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";
        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = _formatTypesJsDefault.default[type], maybeSuffix = /[defgprs%]/.test(type);
        // Set the default precision if not specified,
        // or clamp the specified precision to the supported range.
        // For significant precision, it must be in [1, 21].
        // For fixed precision, it must be in [0, 20].
        precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
        function format(value) {
            var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
            if (type === "c") {
                valueSuffix = formatType(value) + valueSuffix;
                value = "";
            } else {
                value = +value;
                // Determine the sign. -0 is not less than 0, but 1 / -0 is!
                var valueNegative = value < 0 || 1 / value < 0;
                // Perform the initial formatting.
                value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
                // Trim insignificant zeros.
                if (trim) value = _formatTrimJsDefault.default(value);
                // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
                if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
                // Compute the prefix and suffix.
                valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
                valueSuffix = (type === "s" ? prefixes[8 + _formatPrefixAutoJs.prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
                // Break the formatted value into the integer “value” part that can be
                // grouped, and fractional or exponential “suffix” part that is not.
                if (maybeSuffix) {
                    i = -1, n = value.length;
                    while(++i < n)if (c = value.charCodeAt(i), 48 > c || c > 57) {
                        valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                        value = value.slice(0, i);
                        break;
                    }
                }
            }
            // If the fill character is not "0", grouping is applied before padding.
            if (comma && !zero) value = group(value, Infinity);
            // Compute the padding.
            var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
            // If the fill character is "0", grouping is applied after padding.
            if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
            // Reconstruct the final output based on the desired alignment.
            switch(align){
                case "<":
                    value = valuePrefix + value + valueSuffix + padding;
                    break;
                case "=":
                    value = valuePrefix + padding + value + valueSuffix;
                    break;
                case "^":
                    value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
                    break;
                default:
                    value = padding + valuePrefix + value + valueSuffix;
                    break;
            }
            return numerals(value);
        }
        format.toString = function() {
            return specifier + "";
        };
        return format;
    }
    function formatPrefix(specifier, value1) {
        var f = newFormat((specifier = _formatSpecifierJsDefault.default(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(_exponentJsDefault.default(value1) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
        return function(value) {
            return f(k * value) + prefix;
        };
    }
    return {
        format: newFormat,
        formatPrefix: formatPrefix
    };
};

},{"./exponent.js":"6I9UH","./formatGroup.js":"14Wuj","./formatNumerals.js":"impVg","./formatSpecifier.js":"2XT1F","./formatTrim.js":"9KSR0","./formatTypes.js":"8mmM0","./formatPrefixAuto.js":"39ncv","./identity.js":"7XbZp","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"6I9UH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _formatDecimalJs = require("./formatDecimal.js");
exports.default = function(x) {
    return x = _formatDecimalJs.formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
};

},{"./formatDecimal.js":"9oTE6","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9oTE6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
parcelHelpers.export(exports, "formatDecimalParts", ()=>formatDecimalParts
);
exports.default = function(x) {
    return Math.abs(x = Math.round(x)) >= 1000000000000000000000 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
};
function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);
    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
    ];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"14Wuj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(grouping, thousands) {
    return function(value, width) {
        var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
        while(i > 0 && g > 0){
            if (length + g + 1 > width) g = Math.max(1, width - length);
            t.push(value.substring(i -= g, i + g));
            if ((length += g + 1) > width) break;
            g = grouping[j = (j + 1) % grouping.length];
        }
        return t.reverse().join(thousands);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"impVg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(numerals) {
    return function(value) {
        return value.replace(/[0-9]/g, function(i) {
            return numerals[+i];
        });
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"2XT1F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FormatSpecifier", ()=>FormatSpecifier
);
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
        fill: match[1],
        align: match[2],
        sign: match[3],
        symbol: match[4],
        zero: match[5],
        width: match[6],
        comma: match[7],
        precision: match[8] && match[8].slice(1),
        trim: match[9],
        type: match[10]
    });
}
exports.default = formatSpecifier;
formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof
function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9KSR0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(s) {
    out: for(var n = s.length, i = 1, i0 = -1, i1; i < n; ++i)switch(s[i]){
        case ".":
            i0 = i1 = i;
            break;
        case "0":
            if (i0 === 0) i0 = i;
            i1 = i;
            break;
        default:
            if (!+s[i]) break out;
            if (i0 > 0) i0 = 0;
            break;
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"8mmM0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _formatDecimalJs = require("./formatDecimal.js");
var _formatDecimalJsDefault = parcelHelpers.interopDefault(_formatDecimalJs);
var _formatPrefixAutoJs = require("./formatPrefixAuto.js");
var _formatPrefixAutoJsDefault = parcelHelpers.interopDefault(_formatPrefixAutoJs);
var _formatRoundedJs = require("./formatRounded.js");
var _formatRoundedJsDefault = parcelHelpers.interopDefault(_formatRoundedJs);
exports.default = {
    "%": (x, p)=>(x * 100).toFixed(p)
    ,
    "b": (x)=>Math.round(x).toString(2)
    ,
    "c": (x)=>x + ""
    ,
    "d": _formatDecimalJsDefault.default,
    "e": (x, p)=>x.toExponential(p)
    ,
    "f": (x, p)=>x.toFixed(p)
    ,
    "g": (x, p)=>x.toPrecision(p)
    ,
    "o": (x)=>Math.round(x).toString(8)
    ,
    "p": (x, p)=>_formatRoundedJsDefault.default(x * 100, p)
    ,
    "r": _formatRoundedJsDefault.default,
    "s": _formatPrefixAutoJsDefault.default,
    "X": (x)=>Math.round(x).toString(16).toUpperCase()
    ,
    "x": (x)=>Math.round(x).toString(16)
};

},{"./formatDecimal.js":"9oTE6","./formatPrefixAuto.js":"39ncv","./formatRounded.js":"beydh","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"39ncv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "prefixExponent", ()=>prefixExponent
);
var _formatDecimalJs = require("./formatDecimal.js");
var prefixExponent;
exports.default = function(x, p) {
    var d = _formatDecimalJs.formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + _formatDecimalJs.formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
};

},{"./formatDecimal.js":"9oTE6","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"beydh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _formatDecimalJs = require("./formatDecimal.js");
exports.default = function(x, p) {
    var d = _formatDecimalJs.formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};

},{"./formatDecimal.js":"9oTE6","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"7XbZp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(x) {
    return x;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"dENQ5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _exponentJs = require("./exponent.js");
var _exponentJsDefault = parcelHelpers.interopDefault(_exponentJs);
exports.default = function(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, _exponentJsDefault.default(max) - _exponentJsDefault.default(step)) + 1;
};

},{"./exponent.js":"6I9UH","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"gIpJt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "color", ()=>_colorJsDefault.default
);
parcelHelpers.export(exports, "rgb", ()=>_colorJs.rgb
);
parcelHelpers.export(exports, "hsl", ()=>_colorJs.hsl
);
parcelHelpers.export(exports, "lab", ()=>_labJsDefault.default
);
parcelHelpers.export(exports, "hcl", ()=>_labJs.hcl
);
parcelHelpers.export(exports, "lch", ()=>_labJs.lch
);
parcelHelpers.export(exports, "gray", ()=>_labJs.gray
);
parcelHelpers.export(exports, "cubehelix", ()=>_cubehelixJsDefault.default
);
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
var _labJs = require("./lab.js");
var _labJsDefault = parcelHelpers.interopDefault(_labJs);
var _cubehelixJs = require("./cubehelix.js");
var _cubehelixJsDefault = parcelHelpers.interopDefault(_cubehelixJs);

},{"./color.js":"d4pwH","./lab.js":false,"./cubehelix.js":"hSyij","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"d4pwH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Color", ()=>Color
);
parcelHelpers.export(exports, "darker", ()=>darker
);
parcelHelpers.export(exports, "brighter", ()=>brighter
);
parcelHelpers.export(exports, "rgbConvert", ()=>rgbConvert
);
parcelHelpers.export(exports, "rgb", ()=>rgb
);
parcelHelpers.export(exports, "Rgb", ()=>Rgb
);
parcelHelpers.export(exports, "hslConvert", ()=>hslConvert
);
parcelHelpers.export(exports, "hsl", ()=>hsl
);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp("^rgb\\(" + [
    reI,
    reI,
    reI
] + "\\)$"), reRgbPercent = new RegExp("^rgb\\(" + [
    reP,
    reP,
    reP
] + "\\)$"), reRgbaInteger = new RegExp("^rgba\\(" + [
    reI,
    reI,
    reI,
    reN
] + "\\)$"), reRgbaPercent = new RegExp("^rgba\\(" + [
    reP,
    reP,
    reP,
    reN
] + "\\)$"), reHslPercent = new RegExp("^hsl\\(" + [
    reN,
    reP,
    reP
] + "\\)$"), reHslaPercent = new RegExp("^hsla\\(" + [
    reN,
    reP,
    reP,
    reN
] + "\\)$");
var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};
_defineJsDefault.default(Color, color, {
    copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: color_formatHex,
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
});
function color_formatHex() {
    return this.rgb().formatHex();
}
function color_formatHsl() {
    return hslConvert(this).formatHsl();
}
function color_formatRgb() {
    return this.rgb().formatRgb();
}
function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
     : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) // #f00
     : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) // #ff000000
     : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) // #f000
     : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
     : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
     : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
     : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
     : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
     : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
     : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
     : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
exports.default = color;
function rgbn(n) {
    return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
}
_defineJsDefault.default(Rgb, rgb, _defineJs.extend(Color, {
    brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
}));
function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
}
function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
    return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
_defineJsDefault.default(Hsl, hsl, _defineJs.extend(Color, {
    brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function() {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
    }
}));
/* From FvD 13.37, CSS Color Module Level 3 */ function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

},{"./define.js":"ek9pA","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"ek9pA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "extend", ()=>extend
);
exports.default = function(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
};
function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"hSyij":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Cubehelix", ()=>Cubehelix
);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
var _colorJs = require("./color.js");
var _mathJs = require("./math.js");
var A = -0.14861, B = 1.78277, C = -0.29227, D = -0.90649, E = 1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
function cubehelixConvert(o) {
    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof _colorJs.Rgb)) o = _colorJs.rgbConvert(o);
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * _mathJs.degrees - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
exports.default = cubehelix;
function Cubehelix(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
_defineJsDefault.default(Cubehelix, cubehelix, _defineJs.extend(_colorJs.Color, {
    brighter: function(k) {
        k = k == null ? _colorJs.brighter : Math.pow(_colorJs.brighter, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? _colorJs.darker : Math.pow(_colorJs.darker, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * _mathJs.radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
        return new _colorJs.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
    }
}));

},{"./define.js":"ek9pA","./color.js":"d4pwH","./math.js":"7bhOe","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"7bhOe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "radians", ()=>radians
);
parcelHelpers.export(exports, "degrees", ()=>degrees
);
const radians = Math.PI / 180;
const degrees = 180 / Math.PI;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"dcdY0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SIZE_UNITS", ()=>SIZE_UNITS
);
parcelHelpers.export(exports, "transformGenomicRangeArcToStandard", ()=>transformGenomicRangeArcToStandard
);
parcelHelpers.export(exports, "transformGenomicRangeToStandard", ()=>transformGenomicRangeToStandard
);
var _helpers = require("@swc/helpers");
var _specificationProcessor = require("./specification-processor");
var _utilities = require("./utilities");
// Each size unit refers to 1/200 of the clip space
// e.g. if the canvas is 1000x1000 pixels, and the size value for a mark
// is 10, then that mark takes up 10/200 = 1/20 of the clip space which
// is equal to 50 pixels
const SIZE_UNITS = 0.01;
const NUMBER_OF_VERTICES_PER_ARC = 20;
const ARC_HEIGHT_MODIFIER = 10;
/**
 * Get a curve representing the arc with given start and end points
 *
 * https://math.stackexchange.com/a/1484684
 *
 * @param {Array} P0 start of arc
 * @param {Array} P2 end of arc
 * @returns function mapping 0 to beginning of arc, and 1 to end of arc
 */ const getCurveForArc = (P0, P2)=>{
    const midpoint = [
        P0[0] / 2 + P2[0] / 2,
        P0[1] / 2 + P2[1] / 2
    ];
    const slope = (P2[1] - P0[1]) / (P2[0] - P0[0]);
    const distance = Math.sqrt((P2[1] - P0[1]) ** 2 + (P2[0] - P0[0]) ** 2);
    if (!isFinite(slope)) // vertical slope
    return _utilities.getQuadraticBezierCurveForPoints(P0, [
        P0[0] - distance,
        midpoint[1]
    ], P2);
    const parameterized = (t)=>[
            midpoint[0] + t / distance * (P0[1] - P2[1]),
            midpoint[1] + t / distance * (P2[0] - P0[0]), 
        ]
    ;
    return _utilities.getQuadraticBezierCurveForPoints(P0, parameterized(distance * ARC_HEIGHT_MODIFIER), P2);
};
/**
 * Transform a mark with a range for coordinates into a simpler mark to draw.
 *
 * @param {Object} mark that contains ranges for x or y
 * @returns mark with fixed x and y but with appropriate width and height for drawing
 */ const transformGenomicRangeToStandard = (mark, xScale, yScale)=>{
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
        let x1 = xScale(mark.x[0]);
        x = mark.x[0];
        width = (xScale(mark.x[1]) - x1) / SIZE_UNITS;
    } else {
        x = mark.x;
        width = mark.width;
    }
    if (Array.isArray(mark.y)) {
        let y1 = yScale(mark.y[0]);
        y = mark.y[0];
        height = (yScale(mark.y[1]) - y1) / SIZE_UNITS;
    } else {
        y = mark.y;
        height = mark.height;
    }
    return {
        x,
        y,
        width,
        height
    };
};
/**
 * Transform a mark with a range for coordinates and a range for width or height into a simpler mark to draw.
 *
 * @param {Object} mark that contains ranges for x and y, and potentially ranges for width and height
 * @returns mark with fixed x, y, width, and height for drawing
 */ const transformGenomicRangeArcToStandard = (mark, xScale, yScale)=>{
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
        x = xScale.getMidpoint(mark.x[0][0], mark.x[0][1], mark.x[1][0], mark.x[1][1]);
        let x2 = xScale.getMidpoint(mark.width[0][0], mark.width[0][1], mark.width[1][0], mark.width[1][1]);
        let x1ClipSpace = xScale(x);
        let x2ClipSpace = xScale(x2);
        x = x1ClipSpace < x2ClipSpace ? x : x2;
        width = Math.abs(xScale(x2) - x1ClipSpace) / SIZE_UNITS;
    } else {
        x = mark.x;
        width = mark.width;
    }
    if (Array.isArray(mark.y)) {
        y = yScale.getMidpoint(mark.y[0][0], mark.y[0][1], mark.y[1][0], mark.y[1][1]);
        let y2 = yScale.getMidpoint(mark.height[0][0], mark.height[0][1], mark.height[1][0], mark.height[1][1]);
        let y1ClipSpace = xScale(y);
        let y2ClipSpace = xScale(y2);
        y = y1ClipSpace < y2ClipSpace ? y : y2;
        height = Math.abs(yScale(y2) - y1ClipSpace) / SIZE_UNITS;
    } else {
        y = mark.y;
        height = mark.height;
    }
    return {
        x,
        y,
        width,
        height
    };
};
class VertexCalculator {
    /**
   * Construct the vertices of a mark.
   *
   * @param {Object} mark to draw
   * @returns vertices of mark
   */ calculateForMark(mark) {
        if (this.track.x.type === "genomicRange" || this.track.y.type === "genomicRange") {
            if (this.track.mark === "arc") return this._calculateForMark(transformGenomicRangeArcToStandard(mark, this.xScale, this.yScale));
            return this._calculateForMark(transformGenomicRangeToStandard(mark, this.xScale, this.yScale));
        }
        return this._calculateForMark(mark);
    }
    _calculateForMark(mark) {
        if (this.track.mark === "area") {
            const toReturn = this._getVerticesForAreaSection(mark);
            this.lastMark = mark;
            return toReturn;
        }
        if (this.track.mark === "tick") return this._getVerticesForTick(mark);
        if (this.track.mark === "line") return this._getVertexForDot(mark);
        if (this.track.mark === "rect") return this._getVerticesForRect(mark);
        if (this.track.mark === "arc") return this._getVerticesForArc(mark);
        switch(mark.shape){
            case "dot":
                if (this.drawMode === "POINTS") return this._getVertexForDot(mark);
                else return this._getVerticesForSquare(mark);
            case "triangle":
                return this._getVerticesForTriangle(mark);
            case "diamond":
                return this._getVerticesForPolygon(mark, 4);
            case "pentagon":
                return this._getVerticesForPolygon(mark, 5);
            case "hexagon":
                return this._getVerticesForPolygon(mark, 6);
            case "circle":
                return this._getVerticesForPolygon(mark, 16);
            case "cross":
                return this._getVerticesForCross(mark);
            default:
                console.error(`${mark.shape} is not a valid shape!`);
        }
    }
    _mapToGPUSpace(vertices) {
        let isX = false;
        return vertices.map((coord)=>{
            isX = !isX;
            return isX ? this.xScale(coord) : this.yScale(coord);
        });
    }
    _getVerticesForArc(mark) {
        const startPoint = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        const quadraticCurve = getCurveForArc(startPoint, [
            startPoint[0] + mark.width * SIZE_UNITS,
            startPoint[1] + mark.height * SIZE_UNITS, 
        ]);
        const vertices = [
            ...quadraticCurve(0),
            ...quadraticCurve(1 / NUMBER_OF_VERTICES_PER_ARC), 
        ];
        for(let i = 2; i < NUMBER_OF_VERTICES_PER_ARC + 1; i++){
            const nextPoint = quadraticCurve(i / NUMBER_OF_VERTICES_PER_ARC);
            vertices.push(vertices[vertices.length - 2], vertices[vertices.length - 1], nextPoint[0], nextPoint[1]);
        }
        return vertices;
    }
    _getVerticesForAreaSection(mark) {
        if (!this.lastMark) return [];
        return this._mapToGPUSpace([
            mark.x,
            mark.y,
            this.lastMark.x,
            this.lastMark.y,
            mark.x,
            0,
            this.lastMark.x,
            this.lastMark.y,
            this.lastMark.x,
            0,
            mark.x,
            0, 
        ]);
    }
    _getVerticesForPolygon(mark, sides) {
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        const vertices = [];
        for(let theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / sides)vertices.push(center[0], center[1], center[0] + mark.size / 2 * Math.cos(theta) * SIZE_UNITS, center[1] + mark.size / 2 * Math.sin(theta) * SIZE_UNITS, center[0] + mark.size / 2 * Math.cos(theta + 2 * Math.PI / sides) * SIZE_UNITS, center[1] + mark.size / 2 * Math.sin(theta + 2 * Math.PI / sides) * SIZE_UNITS);
        return vertices;
    }
    _getVerticesForTriangle(mark) {
        //     1
        //    / \
        //   2---3
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        return [
            center[0],
            center[1] + mark.size / 2 * SIZE_UNITS,
            center[0] - mark.size / 2 * SIZE_UNITS,
            center[1] - mark.size / 2 * SIZE_UNITS,
            center[0] + mark.size / 2 * SIZE_UNITS,
            center[1] - mark.size / 2 * SIZE_UNITS, 
        ];
    }
    _getVerticesForSquare(mark) {
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        return [
            center[0] + mark.size / 2 * SIZE_UNITS,
            center[1] + mark.size / 2 * SIZE_UNITS,
            center[0] - mark.size / 2 * SIZE_UNITS,
            center[1] + mark.size / 2 * SIZE_UNITS,
            center[0] - mark.size / 2 * SIZE_UNITS,
            center[1] - mark.size / 2 * SIZE_UNITS,
            center[0] + mark.size / 2 * SIZE_UNITS,
            center[1] + mark.size / 2 * SIZE_UNITS,
            center[0] - mark.size / 2 * SIZE_UNITS,
            center[1] - mark.size / 2 * SIZE_UNITS,
            center[0] + mark.size / 2 * SIZE_UNITS,
            center[1] - mark.size / 2 * SIZE_UNITS, 
        ];
    }
    _getVerticesForRect(mark) {
        //  1-----------3,6
        //  |       /    |
        //  |     /      |
        // 2,5-----------4
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        return [
            center[0],
            center[1] + mark.height * SIZE_UNITS,
            center[0],
            center[1],
            center[0] + mark.width * SIZE_UNITS,
            center[1] + mark.height * SIZE_UNITS,
            center[0] + mark.width * SIZE_UNITS,
            center[1],
            center[0],
            center[1],
            center[0] + mark.width * SIZE_UNITS,
            center[1] + mark.height * SIZE_UNITS, 
        ];
    }
    _getVerticesForTick(mark) {
        const center = this._mapToGPUSpace([
            mark.x,
            mark.y
        ]);
        // 1----2
        if (this.track.width) return [
            center[0],
            center[1],
            center[0] + mark.width * SIZE_UNITS,
            center[1], 
        ];
        // 1
        // |
        // 2
        if (mark.height) // default to mark value which has default if height never specified in track
        return [
            center[0],
            center[1],
            center[0],
            center[1] + mark.height * SIZE_UNITS, 
        ];
    }
    /**
   * A class used to construct the vertices of marks that are given to the drawer to draw.
   *
   * @param {Function or GenomeScale} xScale maps the x values of the data to clip space [-1, 1]
   * @param {Function or GenomeScale} yScale maps the y values of the data to clip space [-1, 1]
   * @param {Object} track from specification
   */ constructor(xScale, yScale, track){
        _helpers.defineProperty(this, "_getVertexForDot", (mark)=>this._mapToGPUSpace([
                mark.x,
                mark.y
            ])
        );
        this.xScale = xScale;
        this.yScale = yScale;
        this.track = track;
        this.drawMode = _specificationProcessor.getDrawModeForTrack(track);
    }
}
exports.default = VertexCalculator;

},{"@swc/helpers":"hZhpG","./specification-processor":"6uffu","./utilities":"eousC","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"iNhJO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "schemeCategory10", ()=>_category10JsDefault.default
);
parcelHelpers.export(exports, "schemeAccent", ()=>_accentJsDefault.default
);
parcelHelpers.export(exports, "schemeDark2", ()=>_dark2JsDefault.default
);
parcelHelpers.export(exports, "schemePaired", ()=>_pairedJsDefault.default
);
parcelHelpers.export(exports, "schemePastel1", ()=>_pastel1JsDefault.default
);
parcelHelpers.export(exports, "schemePastel2", ()=>_pastel2JsDefault.default
);
parcelHelpers.export(exports, "schemeSet1", ()=>_set1JsDefault.default
);
parcelHelpers.export(exports, "schemeSet2", ()=>_set2JsDefault.default
);
parcelHelpers.export(exports, "schemeSet3", ()=>_set3JsDefault.default
);
parcelHelpers.export(exports, "schemeTableau10", ()=>_tableau10JsDefault.default
);
parcelHelpers.export(exports, "interpolateBrBG", ()=>_brBGJsDefault.default
);
parcelHelpers.export(exports, "schemeBrBG", ()=>_brBGJs.scheme
);
parcelHelpers.export(exports, "interpolatePRGn", ()=>_prgnJsDefault.default
);
parcelHelpers.export(exports, "schemePRGn", ()=>_prgnJs.scheme
);
parcelHelpers.export(exports, "interpolatePiYG", ()=>_piYGJsDefault.default
);
parcelHelpers.export(exports, "schemePiYG", ()=>_piYGJs.scheme
);
parcelHelpers.export(exports, "interpolatePuOr", ()=>_puOrJsDefault.default
);
parcelHelpers.export(exports, "schemePuOr", ()=>_puOrJs.scheme
);
parcelHelpers.export(exports, "interpolateRdBu", ()=>_rdBuJsDefault.default
);
parcelHelpers.export(exports, "schemeRdBu", ()=>_rdBuJs.scheme
);
parcelHelpers.export(exports, "interpolateRdGy", ()=>_rdGyJsDefault.default
);
parcelHelpers.export(exports, "schemeRdGy", ()=>_rdGyJs.scheme
);
parcelHelpers.export(exports, "interpolateRdYlBu", ()=>_rdYlBuJsDefault.default
);
parcelHelpers.export(exports, "schemeRdYlBu", ()=>_rdYlBuJs.scheme
);
parcelHelpers.export(exports, "interpolateRdYlGn", ()=>_rdYlGnJsDefault.default
);
parcelHelpers.export(exports, "schemeRdYlGn", ()=>_rdYlGnJs.scheme
);
parcelHelpers.export(exports, "interpolateSpectral", ()=>_spectralJsDefault.default
);
parcelHelpers.export(exports, "schemeSpectral", ()=>_spectralJs.scheme
);
parcelHelpers.export(exports, "interpolateBuGn", ()=>_buGnJsDefault.default
);
parcelHelpers.export(exports, "schemeBuGn", ()=>_buGnJs.scheme
);
parcelHelpers.export(exports, "interpolateBuPu", ()=>_buPuJsDefault.default
);
parcelHelpers.export(exports, "schemeBuPu", ()=>_buPuJs.scheme
);
parcelHelpers.export(exports, "interpolateGnBu", ()=>_gnBuJsDefault.default
);
parcelHelpers.export(exports, "schemeGnBu", ()=>_gnBuJs.scheme
);
parcelHelpers.export(exports, "interpolateOrRd", ()=>_orRdJsDefault.default
);
parcelHelpers.export(exports, "schemeOrRd", ()=>_orRdJs.scheme
);
parcelHelpers.export(exports, "interpolatePuBuGn", ()=>_puBuGnJsDefault.default
);
parcelHelpers.export(exports, "schemePuBuGn", ()=>_puBuGnJs.scheme
);
parcelHelpers.export(exports, "interpolatePuBu", ()=>_puBuJsDefault.default
);
parcelHelpers.export(exports, "schemePuBu", ()=>_puBuJs.scheme
);
parcelHelpers.export(exports, "interpolatePuRd", ()=>_puRdJsDefault.default
);
parcelHelpers.export(exports, "schemePuRd", ()=>_puRdJs.scheme
);
parcelHelpers.export(exports, "interpolateRdPu", ()=>_rdPuJsDefault.default
);
parcelHelpers.export(exports, "schemeRdPu", ()=>_rdPuJs.scheme
);
parcelHelpers.export(exports, "interpolateYlGnBu", ()=>_ylGnBuJsDefault.default
);
parcelHelpers.export(exports, "schemeYlGnBu", ()=>_ylGnBuJs.scheme
);
parcelHelpers.export(exports, "interpolateYlGn", ()=>_ylGnJsDefault.default
);
parcelHelpers.export(exports, "schemeYlGn", ()=>_ylGnJs.scheme
);
parcelHelpers.export(exports, "interpolateYlOrBr", ()=>_ylOrBrJsDefault.default
);
parcelHelpers.export(exports, "schemeYlOrBr", ()=>_ylOrBrJs.scheme
);
parcelHelpers.export(exports, "interpolateYlOrRd", ()=>_ylOrRdJsDefault.default
);
parcelHelpers.export(exports, "schemeYlOrRd", ()=>_ylOrRdJs.scheme
);
parcelHelpers.export(exports, "interpolateBlues", ()=>_bluesJsDefault.default
);
parcelHelpers.export(exports, "schemeBlues", ()=>_bluesJs.scheme
);
parcelHelpers.export(exports, "interpolateGreens", ()=>_greensJsDefault.default
);
parcelHelpers.export(exports, "schemeGreens", ()=>_greensJs.scheme
);
parcelHelpers.export(exports, "interpolateGreys", ()=>_greysJsDefault.default
);
parcelHelpers.export(exports, "schemeGreys", ()=>_greysJs.scheme
);
parcelHelpers.export(exports, "interpolatePurples", ()=>_purplesJsDefault.default
);
parcelHelpers.export(exports, "schemePurples", ()=>_purplesJs.scheme
);
parcelHelpers.export(exports, "interpolateReds", ()=>_redsJsDefault.default
);
parcelHelpers.export(exports, "schemeReds", ()=>_redsJs.scheme
);
parcelHelpers.export(exports, "interpolateOranges", ()=>_orangesJsDefault.default
);
parcelHelpers.export(exports, "schemeOranges", ()=>_orangesJs.scheme
);
parcelHelpers.export(exports, "interpolateCividis", ()=>_cividisJsDefault.default
);
parcelHelpers.export(exports, "interpolateCubehelixDefault", ()=>_cubehelixJsDefault.default
);
parcelHelpers.export(exports, "interpolateRainbow", ()=>_rainbowJsDefault.default
);
parcelHelpers.export(exports, "interpolateWarm", ()=>_rainbowJs.warm
);
parcelHelpers.export(exports, "interpolateCool", ()=>_rainbowJs.cool
);
parcelHelpers.export(exports, "interpolateSinebow", ()=>_sinebowJsDefault.default
);
parcelHelpers.export(exports, "interpolateTurbo", ()=>_turboJsDefault.default
);
parcelHelpers.export(exports, "interpolateViridis", ()=>_viridisJsDefault.default
);
parcelHelpers.export(exports, "interpolateMagma", ()=>_viridisJs.magma
);
parcelHelpers.export(exports, "interpolateInferno", ()=>_viridisJs.inferno
);
parcelHelpers.export(exports, "interpolatePlasma", ()=>_viridisJs.plasma
);
var _category10Js = require("./categorical/category10.js");
var _category10JsDefault = parcelHelpers.interopDefault(_category10Js);
var _accentJs = require("./categorical/Accent.js");
var _accentJsDefault = parcelHelpers.interopDefault(_accentJs);
var _dark2Js = require("./categorical/Dark2.js");
var _dark2JsDefault = parcelHelpers.interopDefault(_dark2Js);
var _pairedJs = require("./categorical/Paired.js");
var _pairedJsDefault = parcelHelpers.interopDefault(_pairedJs);
var _pastel1Js = require("./categorical/Pastel1.js");
var _pastel1JsDefault = parcelHelpers.interopDefault(_pastel1Js);
var _pastel2Js = require("./categorical/Pastel2.js");
var _pastel2JsDefault = parcelHelpers.interopDefault(_pastel2Js);
var _set1Js = require("./categorical/Set1.js");
var _set1JsDefault = parcelHelpers.interopDefault(_set1Js);
var _set2Js = require("./categorical/Set2.js");
var _set2JsDefault = parcelHelpers.interopDefault(_set2Js);
var _set3Js = require("./categorical/Set3.js");
var _set3JsDefault = parcelHelpers.interopDefault(_set3Js);
var _tableau10Js = require("./categorical/Tableau10.js");
var _tableau10JsDefault = parcelHelpers.interopDefault(_tableau10Js);
var _brBGJs = require("./diverging/BrBG.js");
var _brBGJsDefault = parcelHelpers.interopDefault(_brBGJs);
var _prgnJs = require("./diverging/PRGn.js");
var _prgnJsDefault = parcelHelpers.interopDefault(_prgnJs);
var _piYGJs = require("./diverging/PiYG.js");
var _piYGJsDefault = parcelHelpers.interopDefault(_piYGJs);
var _puOrJs = require("./diverging/PuOr.js");
var _puOrJsDefault = parcelHelpers.interopDefault(_puOrJs);
var _rdBuJs = require("./diverging/RdBu.js");
var _rdBuJsDefault = parcelHelpers.interopDefault(_rdBuJs);
var _rdGyJs = require("./diverging/RdGy.js");
var _rdGyJsDefault = parcelHelpers.interopDefault(_rdGyJs);
var _rdYlBuJs = require("./diverging/RdYlBu.js");
var _rdYlBuJsDefault = parcelHelpers.interopDefault(_rdYlBuJs);
var _rdYlGnJs = require("./diverging/RdYlGn.js");
var _rdYlGnJsDefault = parcelHelpers.interopDefault(_rdYlGnJs);
var _spectralJs = require("./diverging/Spectral.js");
var _spectralJsDefault = parcelHelpers.interopDefault(_spectralJs);
var _buGnJs = require("./sequential-multi/BuGn.js");
var _buGnJsDefault = parcelHelpers.interopDefault(_buGnJs);
var _buPuJs = require("./sequential-multi/BuPu.js");
var _buPuJsDefault = parcelHelpers.interopDefault(_buPuJs);
var _gnBuJs = require("./sequential-multi/GnBu.js");
var _gnBuJsDefault = parcelHelpers.interopDefault(_gnBuJs);
var _orRdJs = require("./sequential-multi/OrRd.js");
var _orRdJsDefault = parcelHelpers.interopDefault(_orRdJs);
var _puBuGnJs = require("./sequential-multi/PuBuGn.js");
var _puBuGnJsDefault = parcelHelpers.interopDefault(_puBuGnJs);
var _puBuJs = require("./sequential-multi/PuBu.js");
var _puBuJsDefault = parcelHelpers.interopDefault(_puBuJs);
var _puRdJs = require("./sequential-multi/PuRd.js");
var _puRdJsDefault = parcelHelpers.interopDefault(_puRdJs);
var _rdPuJs = require("./sequential-multi/RdPu.js");
var _rdPuJsDefault = parcelHelpers.interopDefault(_rdPuJs);
var _ylGnBuJs = require("./sequential-multi/YlGnBu.js");
var _ylGnBuJsDefault = parcelHelpers.interopDefault(_ylGnBuJs);
var _ylGnJs = require("./sequential-multi/YlGn.js");
var _ylGnJsDefault = parcelHelpers.interopDefault(_ylGnJs);
var _ylOrBrJs = require("./sequential-multi/YlOrBr.js");
var _ylOrBrJsDefault = parcelHelpers.interopDefault(_ylOrBrJs);
var _ylOrRdJs = require("./sequential-multi/YlOrRd.js");
var _ylOrRdJsDefault = parcelHelpers.interopDefault(_ylOrRdJs);
var _bluesJs = require("./sequential-single/Blues.js");
var _bluesJsDefault = parcelHelpers.interopDefault(_bluesJs);
var _greensJs = require("./sequential-single/Greens.js");
var _greensJsDefault = parcelHelpers.interopDefault(_greensJs);
var _greysJs = require("./sequential-single/Greys.js");
var _greysJsDefault = parcelHelpers.interopDefault(_greysJs);
var _purplesJs = require("./sequential-single/Purples.js");
var _purplesJsDefault = parcelHelpers.interopDefault(_purplesJs);
var _redsJs = require("./sequential-single/Reds.js");
var _redsJsDefault = parcelHelpers.interopDefault(_redsJs);
var _orangesJs = require("./sequential-single/Oranges.js");
var _orangesJsDefault = parcelHelpers.interopDefault(_orangesJs);
var _cividisJs = require("./sequential-multi/cividis.js");
var _cividisJsDefault = parcelHelpers.interopDefault(_cividisJs);
var _cubehelixJs = require("./sequential-multi/cubehelix.js");
var _cubehelixJsDefault = parcelHelpers.interopDefault(_cubehelixJs);
var _rainbowJs = require("./sequential-multi/rainbow.js");
var _rainbowJsDefault = parcelHelpers.interopDefault(_rainbowJs);
var _sinebowJs = require("./sequential-multi/sinebow.js");
var _sinebowJsDefault = parcelHelpers.interopDefault(_sinebowJs);
var _turboJs = require("./sequential-multi/turbo.js");
var _turboJsDefault = parcelHelpers.interopDefault(_turboJs);
var _viridisJs = require("./sequential-multi/viridis.js");
var _viridisJsDefault = parcelHelpers.interopDefault(_viridisJs);

},{"./categorical/category10.js":"iDflh","./categorical/Accent.js":"zTJOf","./categorical/Dark2.js":"fpjb9","./categorical/Paired.js":"3pQ2s","./categorical/Pastel1.js":"1UNig","./categorical/Pastel2.js":"3oNKD","./categorical/Set1.js":"bnSyi","./categorical/Set2.js":"apdy1","./categorical/Set3.js":"7h8hE","./categorical/Tableau10.js":"4X0Cu","./diverging/BrBG.js":"gekaJ","./diverging/PRGn.js":"hpgRa","./diverging/PiYG.js":"i7WNK","./diverging/PuOr.js":"91WeG","./diverging/RdBu.js":"sGu9A","./diverging/RdGy.js":"2gRWZ","./diverging/RdYlBu.js":"6hr52","./diverging/RdYlGn.js":"9tMRq","./diverging/Spectral.js":"9SUWO","./sequential-multi/BuGn.js":"LLZV8","./sequential-multi/BuPu.js":"9ChWQ","./sequential-multi/GnBu.js":"1rQNN","./sequential-multi/OrRd.js":"bc1Ca","./sequential-multi/PuBuGn.js":"kIcUL","./sequential-multi/PuBu.js":"pYVlP","./sequential-multi/PuRd.js":"9LNvx","./sequential-multi/RdPu.js":"lUQPD","./sequential-multi/YlGnBu.js":"KeMYl","./sequential-multi/YlGn.js":"hkb0l","./sequential-multi/YlOrBr.js":"bOt2b","./sequential-multi/YlOrRd.js":"fAK5t","./sequential-single/Blues.js":"3cCVl","./sequential-single/Greens.js":"fma8H","./sequential-single/Greys.js":"3FfDV","./sequential-single/Purples.js":"4tJ9X","./sequential-single/Reds.js":"4ukv2","./sequential-single/Oranges.js":"BaIOz","./sequential-multi/cividis.js":"iXNgG","./sequential-multi/cubehelix.js":"b4cDI","./sequential-multi/rainbow.js":"bzVhh","./sequential-multi/sinebow.js":"efBce","./sequential-multi/turbo.js":"ebD2X","./sequential-multi/viridis.js":"9l724","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"iDflh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"eYmm1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(specifier) {
    var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
    while(i < n)colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
    return colors;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"zTJOf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"fpjb9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3pQ2s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"1UNig":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3oNKD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"bnSyi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"apdy1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"7h8hE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"4X0Cu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
exports.default = _colorsJsDefault.default("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"gekaJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"hwCyk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Interpolate = require("d3-interpolate");
exports.default = (scheme)=>_d3Interpolate.interpolateRgbBasis(scheme[scheme.length - 1])
;

},{"d3-interpolate":"diZln","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"diZln":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "interpolate", ()=>_valueJsDefault.default
);
parcelHelpers.export(exports, "interpolateArray", ()=>_arrayJsDefault.default
);
parcelHelpers.export(exports, "interpolateBasis", ()=>_basisJsDefault.default
);
parcelHelpers.export(exports, "interpolateBasisClosed", ()=>_basisClosedJsDefault.default
);
parcelHelpers.export(exports, "interpolateDate", ()=>_dateJsDefault.default
);
parcelHelpers.export(exports, "interpolateDiscrete", ()=>_discreteJsDefault.default
);
parcelHelpers.export(exports, "interpolateHue", ()=>_hueJsDefault.default
);
parcelHelpers.export(exports, "interpolateNumber", ()=>_numberJsDefault.default
);
parcelHelpers.export(exports, "interpolateNumberArray", ()=>_numberArrayJsDefault.default
);
parcelHelpers.export(exports, "interpolateObject", ()=>_objectJsDefault.default
);
parcelHelpers.export(exports, "interpolateRound", ()=>_roundJsDefault.default
);
parcelHelpers.export(exports, "interpolateString", ()=>_stringJsDefault.default
);
parcelHelpers.export(exports, "interpolateTransformCss", ()=>_indexJs.interpolateTransformCss
);
parcelHelpers.export(exports, "interpolateTransformSvg", ()=>_indexJs.interpolateTransformSvg
);
parcelHelpers.export(exports, "interpolateZoom", ()=>_zoomJsDefault.default
);
parcelHelpers.export(exports, "interpolateRgb", ()=>_rgbJsDefault.default
);
parcelHelpers.export(exports, "interpolateRgbBasis", ()=>_rgbJs.rgbBasis
);
parcelHelpers.export(exports, "interpolateRgbBasisClosed", ()=>_rgbJs.rgbBasisClosed
);
parcelHelpers.export(exports, "interpolateHsl", ()=>_hslJsDefault.default
);
parcelHelpers.export(exports, "interpolateHslLong", ()=>_hslJs.hslLong
);
parcelHelpers.export(exports, "interpolateLab", ()=>_labJsDefault.default
);
parcelHelpers.export(exports, "interpolateHcl", ()=>_hclJsDefault.default
);
parcelHelpers.export(exports, "interpolateHclLong", ()=>_hclJs.hclLong
);
parcelHelpers.export(exports, "interpolateCubehelix", ()=>_cubehelixJsDefault.default
);
parcelHelpers.export(exports, "interpolateCubehelixLong", ()=>_cubehelixJs.cubehelixLong
);
parcelHelpers.export(exports, "piecewise", ()=>_piecewiseJsDefault.default
);
parcelHelpers.export(exports, "quantize", ()=>_quantizeJsDefault.default
);
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _basisJs = require("./basis.js");
var _basisJsDefault = parcelHelpers.interopDefault(_basisJs);
var _basisClosedJs = require("./basisClosed.js");
var _basisClosedJsDefault = parcelHelpers.interopDefault(_basisClosedJs);
var _dateJs = require("./date.js");
var _dateJsDefault = parcelHelpers.interopDefault(_dateJs);
var _discreteJs = require("./discrete.js");
var _discreteJsDefault = parcelHelpers.interopDefault(_discreteJs);
var _hueJs = require("./hue.js");
var _hueJsDefault = parcelHelpers.interopDefault(_hueJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var _numberArrayJs = require("./numberArray.js");
var _numberArrayJsDefault = parcelHelpers.interopDefault(_numberArrayJs);
var _objectJs = require("./object.js");
var _objectJsDefault = parcelHelpers.interopDefault(_objectJs);
var _roundJs = require("./round.js");
var _roundJsDefault = parcelHelpers.interopDefault(_roundJs);
var _stringJs = require("./string.js");
var _stringJsDefault = parcelHelpers.interopDefault(_stringJs);
var _indexJs = require("./transform/index.js");
var _zoomJs = require("./zoom.js");
var _zoomJsDefault = parcelHelpers.interopDefault(_zoomJs);
var _rgbJs = require("./rgb.js");
var _rgbJsDefault = parcelHelpers.interopDefault(_rgbJs);
var _hslJs = require("./hsl.js");
var _hslJsDefault = parcelHelpers.interopDefault(_hslJs);
var _labJs = require("./lab.js");
var _labJsDefault = parcelHelpers.interopDefault(_labJs);
var _hclJs = require("./hcl.js");
var _hclJsDefault = parcelHelpers.interopDefault(_hclJs);
var _cubehelixJs = require("./cubehelix.js");
var _cubehelixJsDefault = parcelHelpers.interopDefault(_cubehelixJs);
var _piecewiseJs = require("./piecewise.js");
var _piecewiseJsDefault = parcelHelpers.interopDefault(_piecewiseJs);
var _quantizeJs = require("./quantize.js");
var _quantizeJsDefault = parcelHelpers.interopDefault(_quantizeJs);

},{"./value.js":false,"./array.js":false,"./basis.js":"1Ooet","./basisClosed.js":"M9QtQ","./date.js":false,"./discrete.js":false,"./hue.js":false,"./number.js":false,"./numberArray.js":false,"./object.js":false,"./round.js":false,"./string.js":false,"./transform/index.js":false,"./zoom.js":false,"./rgb.js":"1j4Fa","./hsl.js":false,"./lab.js":false,"./hcl.js":false,"./cubehelix.js":"1QaVa","./piecewise.js":false,"./quantize.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"1Ooet":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "basis", ()=>basis
);
function basis(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
exports.default = function(values) {
    var n = values.length - 1;
    return function(t) {
        var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
        return basis((t - i / n) * n, v0, v1, v2, v3);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"M9QtQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _basisJs = require("./basis.js");
exports.default = function(values) {
    var n = values.length;
    return function(t) {
        var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
        return _basisJs.basis((t - i / n) * n, v0, v1, v2, v3);
    };
};

},{"./basis.js":"1Ooet","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"1j4Fa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "rgbBasis", ()=>rgbBasis
);
parcelHelpers.export(exports, "rgbBasisClosed", ()=>rgbBasisClosed
);
var _d3Color = require("d3-color");
var _basisJs = require("./basis.js");
var _basisJsDefault = parcelHelpers.interopDefault(_basisJs);
var _basisClosedJs = require("./basisClosed.js");
var _basisClosedJsDefault = parcelHelpers.interopDefault(_basisClosedJs);
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
exports.default = (function rgbGamma(y) {
    var color = _colorJs.gamma(y);
    function rgb(start, end) {
        var r = color((start = _d3Color.rgb(start)).r, (end = _d3Color.rgb(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = _colorJsDefault.default(start.opacity, end.opacity);
        return function(t) {
            start.r = r(t);
            start.g = g(t);
            start.b = b(t);
            start.opacity = opacity(t);
            return start + "";
        };
    }
    rgb.gamma = rgbGamma;
    return rgb;
})(1);
function rgbSpline(spline) {
    return function(colors) {
        var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
        for(i = 0; i < n; ++i){
            color = _d3Color.rgb(colors[i]);
            r[i] = color.r || 0;
            g[i] = color.g || 0;
            b[i] = color.b || 0;
        }
        r = spline(r);
        g = spline(g);
        b = spline(b);
        color.opacity = 1;
        return function(t) {
            color.r = r(t);
            color.g = g(t);
            color.b = b(t);
            return color + "";
        };
    };
}
var rgbBasis = rgbSpline(_basisJsDefault.default);
var rgbBasisClosed = rgbSpline(_basisClosedJsDefault.default);

},{"d3-color":"gIpJt","./basis.js":"1Ooet","./basisClosed.js":"M9QtQ","./color.js":"frXEc","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"frXEc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hue", ()=>hue
);
parcelHelpers.export(exports, "gamma", ()=>gamma
);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
function linear(a, d) {
    return function(t) {
        return a + t * d;
    };
}
function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
    };
}
function hue(a, b) {
    var d = b - a;
    return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : _constantJsDefault.default(isNaN(a) ? b : a);
}
function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : _constantJsDefault.default(isNaN(a) ? b : a);
    };
}
function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : _constantJsDefault.default(isNaN(a) ? b : a);
}
exports.default = nogamma;

},{"./constant.js":"k7aM6","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"k7aM6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = (x)=>()=>x
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"1QaVa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cubehelixLong", ()=>cubehelixLong
);
var _d3Color = require("d3-color");
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
function cubehelix(hue) {
    return (function cubehelixGamma(y) {
        y = +y;
        function cubehelix1(start, end) {
            var h = hue((start = _d3Color.cubehelix(start)).h, (end = _d3Color.cubehelix(end)).h), s = _colorJsDefault.default(start.s, end.s), l = _colorJsDefault.default(start.l, end.l), opacity = _colorJsDefault.default(start.opacity, end.opacity);
            return function(t) {
                start.h = h(t);
                start.s = s(t);
                start.l = l(Math.pow(t, y));
                start.opacity = opacity(t);
                return start + "";
            };
        }
        cubehelix1.gamma = cubehelixGamma;
        return cubehelix1;
    })(1);
}
exports.default = cubehelix(_colorJs.hue);
var cubehelixLong = cubehelix(_colorJsDefault.default);

},{"d3-color":"gIpJt","./color.js":"frXEc","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"hpgRa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"i7WNK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"91WeG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"sGu9A":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"2gRWZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"6hr52":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9tMRq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9SUWO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"LLZV8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9ChWQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"1rQNN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"bc1Ca":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"kIcUL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"pYVlP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9LNvx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"lUQPD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"KeMYl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"hkb0l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"bOt2b":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"fAK5t":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3cCVl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"fma8H":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"3FfDV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"4tJ9X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"4ukv2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"BaIOz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scheme", ()=>scheme
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
var _rampJs = require("../ramp.js");
var _rampJsDefault = parcelHelpers.interopDefault(_rampJs);
var scheme = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(_colorsJsDefault.default);
exports.default = _rampJsDefault.default(scheme);

},{"../colors.js":"eYmm1","../ramp.js":"hwCyk","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"iXNgG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(t) {
    t = Math.max(0, Math.min(1, t));
    return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"b4cDI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Color = require("d3-color");
var _d3Interpolate = require("d3-interpolate");
exports.default = _d3Interpolate.interpolateCubehelixLong(_d3Color.cubehelix(300, 0.5, 0), _d3Color.cubehelix(-240, 0.5, 1));

},{"d3-color":"gIpJt","d3-interpolate":"diZln","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"bzVhh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "warm", ()=>warm
);
parcelHelpers.export(exports, "cool", ()=>cool
);
var _d3Color = require("d3-color");
var _d3Interpolate = require("d3-interpolate");
var warm = _d3Interpolate.interpolateCubehelixLong(_d3Color.cubehelix(-100, 0.75, 0.35), _d3Color.cubehelix(80, 1.5, 0.8));
var cool = _d3Interpolate.interpolateCubehelixLong(_d3Color.cubehelix(260, 0.75, 0.35), _d3Color.cubehelix(80, 1.5, 0.8));
var c = _d3Color.cubehelix();
exports.default = function(t) {
    if (t < 0 || t > 1) t -= Math.floor(t);
    var ts = Math.abs(t - 0.5);
    c.h = 360 * t - 100;
    c.s = 1.5 - 1.5 * ts;
    c.l = 0.8 - 0.9 * ts;
    return c + "";
};

},{"d3-color":"gIpJt","d3-interpolate":"diZln","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"efBce":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Color = require("d3-color");
var c = _d3Color.rgb(), pi_1_3 = Math.PI / 3, pi_2_3 = Math.PI * 2 / 3;
exports.default = function(t) {
    var x;
    t = (0.5 - t) * Math.PI;
    c.r = 255 * (x = Math.sin(t)) * x;
    c.g = 255 * (x = Math.sin(t + pi_1_3)) * x;
    c.b = 255 * (x = Math.sin(t + pi_2_3)) * x;
    return c + "";
};

},{"d3-color":"gIpJt","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"ebD2X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(t) {
    t = Math.max(0, Math.min(1, t));
    return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"9l724":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "magma", ()=>magma
);
parcelHelpers.export(exports, "inferno", ()=>inferno
);
parcelHelpers.export(exports, "plasma", ()=>plasma
);
var _colorsJs = require("../colors.js");
var _colorsJsDefault = parcelHelpers.interopDefault(_colorsJs);
function ramp(range) {
    var n = range.length;
    return function(t) {
        return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
    };
}
exports.default = ramp(_colorsJsDefault.default("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var magma = ramp(_colorsJsDefault.default("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno = ramp(_colorsJsDefault.default("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var plasma = ramp(_colorsJsDefault.default("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

},{"../colors.js":"eYmm1","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"iRnGr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const sizeOfGeneRangeForTriangles = 1000000;
class SemanticZoomer {
    getRecommendedDrawingMode(trackShader, currentXRange, currentYRange) {
        if (trackShader.drawMode !== "TRIANGLES") return trackShader.drawMode;
        if (!this.specificationHelper.xScale.isGenomeScale && !this.specificationHelper.yScale.isGenomeScale) // Currently only used for genome tracks
        return "TRIANGLES";
        if (this.specificationHelper.xScale.isGenomeScale) {
            const numberOfGenes = this.specificationHelper.xScale.mapGenomeIndexToClipSpaceInverse(currentXRange[1]) - this.specificationHelper.xScale.mapGenomeIndexToClipSpaceInverse(currentXRange[0]);
            if (numberOfGenes < sizeOfGeneRangeForTriangles) return "TRIANGLES";
        }
        if (this.specificationHelper.yScale.isGenomeScale) {
            const numberOfGenes = this.specificationHelper.yScale.mapGenomeIndexToClipSpaceInverse(currentYRange[1]) - this.specificationHelper.yScale.mapGenomeIndexToClipSpaceInverse(currentYRange[0]);
            if (numberOfGenes < sizeOfGeneRangeForTriangles) return "TRIANGLES";
        }
        return "LINES";
    }
    /**
   * Gives guidance or takes control over canvas when semantic zooming
   * is necessary. Developers should extend this class to create semantic zooming
   * behavior.
   * @param {SpecificationProcessor} specificationHelper
   */ constructor(specificationHelper){
        this.specificationHelper = specificationHelper;
    }
}
exports.default = SemanticZoomer;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"dcZJJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "varyingColorsFragmentShader", ()=>varyingColorsFragmentShader
);
parcelHelpers.export(exports, "VertexShader", ()=>VertexShader
);
var _helpers = require("@swc/helpers");
var _specificationProcessor = require("./specification-processor");
var _utilities = require("./utilities");
/**
 * A vertex shader meant to take in positions, colors, and contain uniforms for zooming and panning.
 */ const baseVertexShader = `#version 300 es
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
 */ const vertexShaderSuffix = (opacityName, colorName, sizeName)=>`
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
`
;
/**
 * A fragment shader which chooses color simply passed to by vertex shader.
 */ const varyingColorsFragmentShader = `#version 300 es
  precision highp float;

  in vec4 vColor;

  out vec4 outColor;

  void main(void) {
    // outColor = vColor;
    float d = distance(gl_PointCoord, vec2(0.5, 0.5));
    
    if(d < .5) { 
        outColor = vColor;
    }
    else { discard; }
  }
`;
class VertexShader {
    /**
   * Add a mark to the buffers by calculating its vertices, then adding its
   * attributes such as size, color, or opacity to the buffers.
   *
   * @param {Object} mark passed in from SpecificationHelper in webgl-drawer.js
   * @param {VertexCalculator} vertexCalculator used to calculate vertices for a track
   */ addMarkToBuffers(mark, vertexCalculator) {
        const vertices = vertexCalculator.calculateForMark(mark);
        this.attributes.a_VertexPosition.data.push(...vertices);
        for (const channel of Object.keys(this.attributes)){
            if (channel === "a_VertexPosition") continue;
            for(let i = 0; i < vertices.length / 2; i++)this.attributes[channel].data.push(mark[channel.substring(2)]); // Remove "a_" prefix
        }
        this.lastMark = mark;
    }
    /**
   * Set the webgl draw mode to use
   * @param {String} drawMode
   */ setDrawMode(drawMode) {
        this.drawMode = drawMode;
    }
    /**
   * Signify this channel varies from mark to mark, so build buffers to carry this info
   * for the program. Also add desclaration to shader code.
   *
   * @param {String} channel such as opacity, color, size
   * @param {Number} numComponents number of components of this attribute to pull in, usually 1
   * @returns this
   */ addChannelBuffer(channel, numComponents = 1) {
        this.attributes[`a_${channel}`] = {
            numComponents,
            data: []
        };
        this.shader += `in float a_${channel};\n`;
        return this;
    }
    /**
   * Signify this channel is the same for every mark, so set a uniform to refer to.
   *
   * @param {String} channel such as opacity, color, size
   * @param {Number} uniform value to set uniform to, must be a float
   * @returns this
   */ setChannelUniform(channel, uniform) {
        this.uniforms[`u_${channel}`] = uniform;
        this.shader += `uniform float u_${channel};\n`;
        return this;
    }
    /**
   * Build the shader code after uniforms and attributes have been finalized.
   *
   * @returns shader code to compile
   */ buildShader() {
        // Assumes color, opacity, size channels have been used in
        // addChannelBuffer or addChannelUniform
        if (this.built) return this.shader;
        const colorName = "a_color" in this.attributes ? "a_color" : "u_color";
        const opacityName = "a_opacity" in this.attributes ? "a_opacity" : "u_opacity";
        const sizeName = "a_size" in this.attributes ? "a_size" : "u_size";
        this.shader += vertexShaderSuffix(opacityName, colorName, sizeName);
        this.built = true;
        return this.shader;
    }
    /**
   * Construct the vertex shaders for each track in the specification.
   *
   * @param {Object} specification of visualization
   * @returns an array of {@link VertexShaders}s
   */ static fromSpecification(specification) {
        // Returns one per track
        return specification.tracks.map(VertexShader.fromTrack);
    }
    /**
   * Construct the vertex shader a track including setting attributes, uniforms, drawMode.
   *
   * @param {Object} track from specification
   * @returns a {@link VertexShaders}
   */ static fromTrack(track) {
        // Given a track produce attributes and uniforms that describe a webgl drawing
        const vsBuilder = new VertexShader();
        vsBuilder.setDrawMode(_specificationProcessor.getDrawModeForTrack(track));
        for (let channel of Object.keys(_specificationProcessor.DEFAULT_CHANNELS)){
            if (channel === "shape") continue;
            if (channel in track) {
                // Specification specifies channel
                if (track[channel].value) {
                    // Channel has default value
                    if (channel === "color") track[channel].value = _utilities.colorSpecifierToHex(track[channel].value);
                    vsBuilder.setChannelUniform(channel, track[channel].value);
                } else {
                    // Set Channel as attribute, x and y will always reach here
                    if (channel === "y" || channel === "x") continue;
                    // These are currently the only supported channels for shader usage
                    if (VertexShader.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) vsBuilder.addChannelBuffer(channel, _specificationProcessor.DEFAULT_CHANNELS[channel].numComponents);
                }
            } else // Channel not listed, set default
            if (VertexShader.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) vsBuilder.setChannelUniform(channel, _specificationProcessor.DEFAULT_CHANNELS[channel].value);
        }
        return vsBuilder;
    }
    /**
   * A class meant to contain all the relevant information for a shader program, such as uniforms
   * attributes, and ultimately the vertices. Do not use the constructor. Use VertexShader.fromSpecification
   * or fromTrack instead.
   */ constructor(){
        this.shader = baseVertexShader;
        this.uniforms = {
        };
        // Add position buffers here since x and y channels don't map nicely to shader code
        this.attributes = {
            a_VertexPosition: {
                numComponents: 2,
                data: []
            }
        };
    }
}
_helpers.defineProperty(VertexShader, "SUPPORTED_CHANNEL_ATTRIBUTES", Object.freeze([
    "color",
    "size",
    "opacity", 
]));

},{"@swc/helpers":"hZhpG","./specification-processor":"6uffu","./utilities":"eousC","@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}],"8bCjB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addExtensionsToContext", ()=>addExtensionsToContext
);
parcelHelpers.export(exports, "attributes", ()=>attributes
);
parcelHelpers.export(exports, "bindFramebufferInfo", ()=>bindFramebufferInfo
);
parcelHelpers.export(exports, "bindTransformFeedbackInfo", ()=>bindTransformFeedbackInfo
);
parcelHelpers.export(exports, "bindUniformBlock", ()=>bindUniformBlock
);
parcelHelpers.export(exports, "canFilter", ()=>canFilter
);
parcelHelpers.export(exports, "canGenerateMipmap", ()=>canGenerateMipmap
);
parcelHelpers.export(exports, "createAttribsFromArrays", ()=>createAttribsFromArrays
);
parcelHelpers.export(exports, "createAttributeSetters", ()=>createAttributeSetters
);
parcelHelpers.export(exports, "createBufferFromArray", ()=>createBufferFromArray
);
parcelHelpers.export(exports, "createBufferFromTypedArray", ()=>createBufferFromTypedArray
);
parcelHelpers.export(exports, "createBufferInfoFromArrays", ()=>createBufferInfoFromArrays
);
parcelHelpers.export(exports, "createBuffersFromArrays", ()=>createBuffersFromArrays
);
parcelHelpers.export(exports, "createFramebufferInfo", ()=>createFramebufferInfo
);
parcelHelpers.export(exports, "createProgram", ()=>createProgram
);
parcelHelpers.export(exports, "createProgramFromScripts", ()=>createProgramFromScripts
);
parcelHelpers.export(exports, "createProgramFromSources", ()=>createProgramFromSources
);
parcelHelpers.export(exports, "createProgramInfo", ()=>createProgramInfo
);
parcelHelpers.export(exports, "createProgramInfoFromProgram", ()=>createProgramInfoFromProgram
);
parcelHelpers.export(exports, "createSampler", ()=>createSampler
);
parcelHelpers.export(exports, "createSamplers", ()=>createSamplers
);
parcelHelpers.export(exports, "createTexture", ()=>createTexture
);
parcelHelpers.export(exports, "createTextures", ()=>createTextures
);
parcelHelpers.export(exports, "createTransformFeedback", ()=>createTransformFeedback
);
parcelHelpers.export(exports, "createTransformFeedbackInfo", ()=>createTransformFeedbackInfo
);
parcelHelpers.export(exports, "createUniformBlockInfo", ()=>createUniformBlockInfo
);
parcelHelpers.export(exports, "createUniformBlockInfoFromProgram", ()=>createUniformBlockInfoFromProgram
);
parcelHelpers.export(exports, "createUniformBlockSpecFromProgram", ()=>createUniformBlockSpecFromProgram
);
parcelHelpers.export(exports, "createUniformSetters", ()=>createUniformSetters
);
parcelHelpers.export(exports, "createVAOAndSetAttributes", ()=>createVAOAndSetAttributes
);
parcelHelpers.export(exports, "createVAOFromBufferInfo", ()=>createVAOFromBufferInfo
);
parcelHelpers.export(exports, "createVertexArrayInfo", ()=>createVertexArrayInfo
);
parcelHelpers.export(exports, "draw", ()=>draw
);
parcelHelpers.export(exports, "drawBufferInfo", ()=>drawBufferInfo
);
parcelHelpers.export(exports, "drawObjectList", ()=>drawObjectList
);
parcelHelpers.export(exports, "framebuffers", ()=>framebuffers
);
parcelHelpers.export(exports, "getArray_", ()=>getArray
);
parcelHelpers.export(exports, "getBytesPerElementForInternalFormat", ()=>getBytesPerElementForInternalFormat
);
parcelHelpers.export(exports, "getContext", ()=>getContext
);
parcelHelpers.export(exports, "getFormatAndTypeForInternalFormat", ()=>getFormatAndTypeForInternalFormat
);
parcelHelpers.export(exports, "getGLTypeForTypedArray", ()=>getGLTypeForTypedArray
);
parcelHelpers.export(exports, "getGLTypeForTypedArrayType", ()=>getGLTypeForTypedArrayType
);
parcelHelpers.export(exports, "getNumComponentsForFormat", ()=>getNumComponentsForFormat
);
parcelHelpers.export(exports, "getNumComponents_", ()=>getNumComponents
);
parcelHelpers.export(exports, "getTypedArrayTypeForGLType", ()=>getTypedArrayTypeForGLType
);
parcelHelpers.export(exports, "getWebGLContext", ()=>getWebGLContext
);
parcelHelpers.export(exports, "glEnumToString", ()=>glEnumToString
);
parcelHelpers.export(exports, "isArrayBuffer", ()=>isArrayBuffer
);
parcelHelpers.export(exports, "isWebGL1", ()=>isWebGL1
);
parcelHelpers.export(exports, "isWebGL2", ()=>isWebGL2
);
parcelHelpers.export(exports, "loadTextureFromUrl", ()=>loadTextureFromUrl
);
parcelHelpers.export(exports, "m4", ()=>m4
);
parcelHelpers.export(exports, "primitives", ()=>primitives
);
parcelHelpers.export(exports, "programs", ()=>programs
);
parcelHelpers.export(exports, "resizeCanvasToDisplaySize", ()=>resizeCanvasToDisplaySize
);
parcelHelpers.export(exports, "resizeFramebufferInfo", ()=>resizeFramebufferInfo
);
parcelHelpers.export(exports, "resizeTexture", ()=>resizeTexture
);
parcelHelpers.export(exports, "setAttribInfoBufferFromArray", ()=>setAttribInfoBufferFromArray
);
parcelHelpers.export(exports, "setAttributeDefaults_", ()=>setDefaults
);
parcelHelpers.export(exports, "setAttributePrefix", ()=>setAttributePrefix
);
parcelHelpers.export(exports, "setAttributes", ()=>setAttributes
);
parcelHelpers.export(exports, "setBlockUniforms", ()=>setBlockUniforms
);
parcelHelpers.export(exports, "setBuffersAndAttributes", ()=>setBuffersAndAttributes
);
parcelHelpers.export(exports, "setDefaultTextureColor", ()=>setDefaultTextureColor
);
parcelHelpers.export(exports, "setDefaults", ()=>setDefaults$2
);
parcelHelpers.export(exports, "setEmptyTexture", ()=>setEmptyTexture
);
parcelHelpers.export(exports, "setSamplerParameters", ()=>setSamplerParameters
);
parcelHelpers.export(exports, "setTextureDefaults_", ()=>setDefaults$1
);
parcelHelpers.export(exports, "setTextureFilteringForSize", ()=>setTextureFilteringForSize
);
parcelHelpers.export(exports, "setTextureFromArray", ()=>setTextureFromArray
);
parcelHelpers.export(exports, "setTextureFromElement", ()=>setTextureFromElement
);
parcelHelpers.export(exports, "setTextureParameters", ()=>setTextureParameters
);
parcelHelpers.export(exports, "setUniformBlock", ()=>setUniformBlock
);
parcelHelpers.export(exports, "setUniforms", ()=>setUniforms
);
parcelHelpers.export(exports, "setUniformsAndBindTextures", ()=>setUniformsAndBindTextures
);
parcelHelpers.export(exports, "textures", ()=>textures
);
parcelHelpers.export(exports, "typedarrays", ()=>typedarrays
);
parcelHelpers.export(exports, "utils", ()=>utils
);
parcelHelpers.export(exports, "v3", ()=>v3
);
parcelHelpers.export(exports, "vertexArrays", ()=>vertexArrays
);
/* @license twgl.js 4.21.2 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/twgl.js for details */ /*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 *
 * Vec3 math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new Vec3. In other words you can do this
 *
 *     var v = v3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
 *
 * or
 *
 *     var v = v3.create();
 *     v3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any vector as the destination. So for example
 *
 *     v3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 * @module twgl/v3
 */ let VecType = Float32Array;
/**
 * A JavaScript array with 3 values or a Float32Array with 3 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/v3.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Vec3
 * @memberOf module:twgl/v3
 */ /**
 * Sets the type this library creates for a Vec3
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Vec3
 * @memberOf module:twgl/v3
 */ function setDefaultType(ctor) {
    const oldType = VecType;
    VecType = ctor;
    return oldType;
}
/**
 * Creates a vec3; may be called with x, y, z to set initial values.
 * @param {number} [x] Initial x value.
 * @param {number} [y] Initial y value.
 * @param {number} [z] Initial z value.
 * @return {module:twgl/v3.Vec3} the created vector
 * @memberOf module:twgl/v3
 */ function create(x, y, z) {
    const dst = new VecType(3);
    if (x) dst[0] = x;
    if (y) dst[1] = y;
    if (z) dst[2] = z;
    return dst;
}
/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector tha tis the sum of a and b.
 * @memberOf module:twgl/v3
 */ function add(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
    dst[2] = a[2] + b[2];
    return dst;
}
/**
 * Subtracts two vectors.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector that is the difference of a and b.
 * @memberOf module:twgl/v3
 */ function subtract(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    return dst;
}
/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {number} t Interpolation coefficient.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The linear interpolated result.
 * @memberOf module:twgl/v3
 */ function lerp(a, b, t, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] + t * (b[0] - a[0]);
    dst[1] = a[1] + t * (b[1] - a[1]);
    dst[2] = a[2] + t * (b[2] - a[2]);
    return dst;
}
/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient vector t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} t Interpolation coefficients vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} the linear interpolated result.
 * @memberOf module:twgl/v3
 */ function lerpV(a, b, t, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] + t[0] * (b[0] - a[0]);
    dst[1] = a[1] + t[1] * (b[1] - a[1]);
    dst[2] = a[2] + t[2] * (b[2] - a[2]);
    return dst;
}
/**
 * Return max values of two vectors.
 * Given vectors a and b returns
 * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The max components vector.
 * @memberOf module:twgl/v3
 */ function max(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = Math.max(a[0], b[0]);
    dst[1] = Math.max(a[1], b[1]);
    dst[2] = Math.max(a[2], b[2]);
    return dst;
}
/**
 * Return min values of two vectors.
 * Given vectors a and b returns
 * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The min components vector.
 * @memberOf module:twgl/v3
 */ function min(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = Math.min(a[0], b[0]);
    dst[1] = Math.min(a[1], b[1]);
    dst[2] = Math.min(a[2], b[2]);
    return dst;
}
/**
 * Multiplies a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */ function mulScalar(v, k, dst) {
    dst = dst || new VecType(3);
    dst[0] = v[0] * k;
    dst[1] = v[1] * k;
    dst[2] = v[2] * k;
    return dst;
}
/**
 * Divides a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */ function divScalar(v, k, dst) {
    dst = dst || new VecType(3);
    dst[0] = v[0] / k;
    dst[1] = v[1] / k;
    dst[2] = v[2] / k;
    return dst;
}
/**
 * Computes the cross product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of a cross b.
 * @memberOf module:twgl/v3
 */ function cross(a, b, dst) {
    dst = dst || new VecType(3);
    const t1 = a[2] * b[0] - a[0] * b[2];
    const t2 = a[0] * b[1] - a[1] * b[0];
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = t1;
    dst[2] = t2;
    return dst;
}
/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @return {number} dot product
 * @memberOf module:twgl/v3
 */ function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} length of vector.
 * @memberOf module:twgl/v3
 */ function length$1(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}
/**
 * Computes the square of the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} square of the length of vector.
 * @memberOf module:twgl/v3
 */ function lengthSq(v) {
    return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
/**
 * Computes the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} distance between a and b
 * @memberOf module:twgl/v3
 */ function distance(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
/**
 * Computes the square of the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} square of the distance between a and b
 * @memberOf module:twgl/v3
 */ function distanceSq(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
}
/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param {module:twgl/v3.Vec3} a The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The normalized vector.
 * @memberOf module:twgl/v3
 */ function normalize(a, dst) {
    dst = dst || new VecType(3);
    const lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    const len = Math.sqrt(lenSq);
    if (len > 0.00001) {
        dst[0] = a[0] / len;
        dst[1] = a[1] / len;
        dst[2] = a[2] / len;
    } else {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
    }
    return dst;
}
/**
 * Negates a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} -v.
 * @memberOf module:twgl/v3
 */ function negate(v, dst) {
    dst = dst || new VecType(3);
    dst[0] = -v[0];
    dst[1] = -v[1];
    dst[2] = -v[2];
    return dst;
}
/**
 * Copies a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A copy of v.
 * @memberOf module:twgl/v3
 */ function copy(v, dst) {
    dst = dst || new VecType(3);
    dst[0] = v[0];
    dst[1] = v[1];
    dst[2] = v[2];
    return dst;
}
/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of products of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */ function multiply(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] * b[0];
    dst[1] = a[1] * b[1];
    dst[2] = a[2] * b[2];
    return dst;
}
/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of quotients of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */ function divide(a, b, dst) {
    dst = dst || new VecType(3);
    dst[0] = a[0] / b[0];
    dst[1] = a[1] / b[1];
    dst[2] = a[2] / b[2];
    return dst;
}
var v3 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    add: add,
    copy: copy,
    create: create,
    cross: cross,
    distance: distance,
    distanceSq: distanceSq,
    divide: divide,
    divScalar: divScalar,
    dot: dot,
    lerp: lerp,
    lerpV: lerpV,
    length: length$1,
    lengthSq: lengthSq,
    max: max,
    min: min,
    mulScalar: mulScalar,
    multiply: multiply,
    negate: negate,
    normalize: normalize,
    setDefaultType: setDefaultType,
    subtract: subtract
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * 4x4 Matrix math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new matrix. In other words you can do this
 *
 *     const mat = m4.translation([1, 2, 3]);  // Creates a new translation matrix
 *
 * or
 *
 *     const mat = m4.create();
 *     m4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any matrix as the destination. So for example
 *
 *     const mat = m4.identity();
 *     const trans = m4.translation([1, 2, 3]);
 *     m4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
 *
 * @module twgl/m4
 */ let MatType = Float32Array;
/**
 * A JavaScript array with 16 values or a Float32Array with 16 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/m4.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Mat4
 * @memberOf module:twgl/m4
 */ /**
 * Sets the type this library creates for a Mat4
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Mat4
 * @memberOf module:twgl/m4
 */ function setDefaultType$1(ctor) {
    const oldType = MatType;
    MatType = ctor;
    return oldType;
}
/**
 * Negates a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} -m.
 * @memberOf module:twgl/m4
 */ function negate$1(m, dst) {
    dst = dst || new MatType(16);
    dst[0] = -m[0];
    dst[1] = -m[1];
    dst[2] = -m[2];
    dst[3] = -m[3];
    dst[4] = -m[4];
    dst[5] = -m[5];
    dst[6] = -m[6];
    dst[7] = -m[7];
    dst[8] = -m[8];
    dst[9] = -m[9];
    dst[10] = -m[10];
    dst[11] = -m[11];
    dst[12] = -m[12];
    dst[13] = -m[13];
    dst[14] = -m[14];
    dst[15] = -m[15];
    return dst;
}
/**
 * Copies a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] The matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A copy of m.
 * @memberOf module:twgl/m4
 */ function copy$1(m, dst) {
    dst = dst || new MatType(16);
    dst[0] = m[0];
    dst[1] = m[1];
    dst[2] = m[2];
    dst[3] = m[3];
    dst[4] = m[4];
    dst[5] = m[5];
    dst[6] = m[6];
    dst[7] = m[7];
    dst[8] = m[8];
    dst[9] = m[9];
    dst[10] = m[10];
    dst[11] = m[11];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
    return dst;
}
/**
 * Creates an n-by-n identity matrix.
 *
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} An n-by-n identity matrix.
 * @memberOf module:twgl/m4
 */ function identity(dst) {
    dst = dst || new MatType(16);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Takes the transpose of a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The transpose of m.
 * @memberOf module:twgl/m4
 */ function transpose(m, dst) {
    dst = dst || new MatType(16);
    if (dst === m) {
        let t;
        t = m[1];
        m[1] = m[4];
        m[4] = t;
        t = m[2];
        m[2] = m[8];
        m[8] = t;
        t = m[3];
        m[3] = m[12];
        m[12] = t;
        t = m[6];
        m[6] = m[9];
        m[9] = t;
        t = m[7];
        m[7] = m[13];
        m[13] = t;
        t = m[11];
        m[11] = m[14];
        m[14] = t;
        return dst;
    }
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    dst[0] = m00;
    dst[1] = m10;
    dst[2] = m20;
    dst[3] = m30;
    dst[4] = m01;
    dst[5] = m11;
    dst[6] = m21;
    dst[7] = m31;
    dst[8] = m02;
    dst[9] = m12;
    dst[10] = m22;
    dst[11] = m32;
    dst[12] = m03;
    dst[13] = m13;
    dst[14] = m23;
    dst[15] = m33;
    return dst;
}
/**
 * Computes the inverse of a 4-by-4 matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The inverse of m.
 * @memberOf module:twgl/m4
 */ function inverse(m, dst) {
    dst = dst || new MatType(16);
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    const tmp_0 = m22 * m33;
    const tmp_1 = m32 * m23;
    const tmp_2 = m12 * m33;
    const tmp_3 = m32 * m13;
    const tmp_4 = m12 * m23;
    const tmp_5 = m22 * m13;
    const tmp_6 = m02 * m33;
    const tmp_7 = m32 * m03;
    const tmp_8 = m02 * m23;
    const tmp_9 = m22 * m03;
    const tmp_10 = m02 * m13;
    const tmp_11 = m12 * m03;
    const tmp_12 = m20 * m31;
    const tmp_13 = m30 * m21;
    const tmp_14 = m10 * m31;
    const tmp_15 = m30 * m11;
    const tmp_16 = m10 * m21;
    const tmp_17 = m20 * m11;
    const tmp_18 = m00 * m31;
    const tmp_19 = m30 * m01;
    const tmp_20 = m00 * m21;
    const tmp_21 = m20 * m01;
    const tmp_22 = m00 * m11;
    const tmp_23 = m10 * m01;
    const t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    const t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    const t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    const t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
    const d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
    return dst;
}
/**
 * Multiplies two 4-by-4 matrices with a on the left and b on the right
 * @param {module:twgl/m4.Mat4} a The matrix on the left.
 * @param {module:twgl/m4.Mat4} b The matrix on the right.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix product of a and b.
 * @memberOf module:twgl/m4
 */ function multiply$1(a, b, dst) {
    dst = dst || new MatType(16);
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];
    const b00 = b[0];
    const b01 = b[1];
    const b02 = b[2];
    const b03 = b[3];
    const b10 = b[4];
    const b11 = b[5];
    const b12 = b[6];
    const b13 = b[7];
    const b20 = b[8];
    const b21 = b[9];
    const b22 = b[10];
    const b23 = b[11];
    const b30 = b[12];
    const b31 = b[13];
    const b32 = b[14];
    const b33 = b[15];
    dst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    dst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    dst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    dst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
    dst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    dst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    dst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    dst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
    dst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    dst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
    dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
    return dst;
}
/**
 * Sets the translation component of a 4-by-4 matrix to the given
 * vector.
 * @param {module:twgl/m4.Mat4} a The matrix.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with translation set.
 * @memberOf module:twgl/m4
 */ function setTranslation(a, v, dst) {
    dst = dst || identity();
    if (a !== dst) {
        dst[0] = a[0];
        dst[1] = a[1];
        dst[2] = a[2];
        dst[3] = a[3];
        dst[4] = a[4];
        dst[5] = a[5];
        dst[6] = a[6];
        dst[7] = a[7];
        dst[8] = a[8];
        dst[9] = a[9];
        dst[10] = a[10];
        dst[11] = a[11];
    }
    dst[12] = v[0];
    dst[13] = v[1];
    dst[14] = v[2];
    dst[15] = 1;
    return dst;
}
/**
 * Returns the translation component of a 4-by-4 matrix as a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The translation component of m.
 * @memberOf module:twgl/m4
 */ function getTranslation(m, dst) {
    dst = dst || create();
    dst[0] = m[12];
    dst[1] = m[13];
    dst[2] = m[14];
    return dst;
}
/**
 * Returns an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} axis The axis 0 = x, 1 = y, 2 = z;
 * @return {module:twgl/v3.Vec3} [dst] vector.
 * @return {module:twgl/v3.Vec3} The axis component of m.
 * @memberOf module:twgl/m4
 */ function getAxis(m, axis, dst) {
    dst = dst || create();
    const off = axis * 4;
    dst[0] = m[off + 0];
    dst[1] = m[off + 1];
    dst[2] = m[off + 2];
    return dst;
}
/**
 * Sets an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v the axis vector
 * @param {number} axis The axis  0 = x, 1 = y, 2 = z;
 * @param {module:twgl/m4.Mat4} [dst] The matrix to set. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with axis set.
 * @memberOf module:twgl/m4
 */ function setAxis(a, v, axis, dst) {
    if (dst !== a) dst = copy$1(a, dst);
    const off = axis * 4;
    dst[off + 0] = v[0];
    dst[off + 1] = v[1];
    dst[off + 2] = v[2];
    return dst;
}
/**
 * Computes a 4-by-4 perspective transformation matrix given the angular height
 * of the frustum, the aspect ratio, and the near and far clipping planes.  The
 * arguments define a frustum extending in the negative z direction.  The given
 * angle is the vertical angle of the frustum, and the horizontal angle is
 * determined to produce the given aspect ratio.  The arguments near and far are
 * the distances to the near and far clipping planes.  Note that near and far
 * are not z coordinates, but rather they are distances along the negative
 * z-axis.  The matrix generated sends the viewing frustum to the unit box.
 * We assume a unit box extending from -1 to 1 in the x and y dimensions and
 * from 0 to 1 in the z dimension.
 * @param {number} fieldOfViewYInRadians The camera angle from top to bottom (in radians).
 * @param {number} aspect The aspect ratio width / height.
 * @param {number} zNear The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} zFar The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */ function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
    dst = dst || new MatType(16);
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
    const rangeInv = 1 / (zNear - zFar);
    dst[0] = f / aspect;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = f;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = (zNear + zFar) * rangeInv;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = zNear * zFar * rangeInv * 2;
    dst[15] = 0;
    return dst;
}
/**
 * Computes a 4-by-4 orthogonal transformation matrix given the left, right,
 * bottom, and top dimensions of the near clipping plane as well as the
 * near and far clipping plane distances.
 * @param {number} left Left side of the near clipping plane viewport.
 * @param {number} right Right side of the near clipping plane viewport.
 * @param {number} bottom Bottom of the near clipping plane viewport.
 * @param {number} top Top of the near clipping plane viewport.
 * @param {number} near The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} far The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */ function ortho(left, right, bottom, top, near, far, dst) {
    dst = dst || new MatType(16);
    dst[0] = 2 / (right - left);
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 / (top - bottom);
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 2 / (near - far);
    dst[11] = 0;
    dst[12] = (right + left) / (left - right);
    dst[13] = (top + bottom) / (bottom - top);
    dst[14] = (far + near) / (near - far);
    dst[15] = 1;
    return dst;
}
/**
 * Computes a 4-by-4 perspective transformation matrix given the left, right,
 * top, bottom, near and far clipping planes. The arguments define a frustum
 * extending in the negative z direction. The arguments near and far are the
 * distances to the near and far clipping planes. Note that near and far are not
 * z coordinates, but rather they are distances along the negative z-axis. The
 * matrix generated sends the viewing frustum to the unit box. We assume a unit
 * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
 * dimension.
 * @param {number} left The x coordinate of the left plane of the box.
 * @param {number} right The x coordinate of the right plane of the box.
 * @param {number} bottom The y coordinate of the bottom plane of the box.
 * @param {number} top The y coordinate of the right plane of the box.
 * @param {number} near The negative z coordinate of the near plane of the box.
 * @param {number} far The negative z coordinate of the far plane of the box.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective projection matrix.
 * @memberOf module:twgl/m4
 */ function frustum(left, right, bottom, top, near, far, dst) {
    dst = dst || new MatType(16);
    const dx = right - left;
    const dy = top - bottom;
    const dz = near - far;
    dst[0] = 2 * near / dx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 * near / dy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = (left + right) / dx;
    dst[9] = (top + bottom) / dy;
    dst[10] = far / dz;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = near * far / dz;
    dst[15] = 0;
    return dst;
}
let xAxis;
let yAxis;
let zAxis;
/**
 * Computes a 4-by-4 look-at transformation.
 *
 * This is a matrix which positions the camera itself. If you want
 * a view matrix (a matrix which moves things in front of the camera)
 * take the inverse of this.
 *
 * @param {module:twgl/v3.Vec3} eye The position of the eye.
 * @param {module:twgl/v3.Vec3} target The position meant to be viewed.
 * @param {module:twgl/v3.Vec3} up A vector pointing up.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The look-at matrix.
 * @memberOf module:twgl/m4
 */ function lookAt(eye, target, up, dst) {
    dst = dst || new MatType(16);
    xAxis = xAxis || create();
    yAxis = yAxis || create();
    zAxis = zAxis || create();
    normalize(subtract(eye, target, zAxis), zAxis);
    normalize(cross(up, zAxis, xAxis), xAxis);
    normalize(cross(zAxis, xAxis, yAxis), yAxis);
    dst[0] = xAxis[0];
    dst[1] = xAxis[1];
    dst[2] = xAxis[2];
    dst[3] = 0;
    dst[4] = yAxis[0];
    dst[5] = yAxis[1];
    dst[6] = yAxis[2];
    dst[7] = 0;
    dst[8] = zAxis[0];
    dst[9] = zAxis[1];
    dst[10] = zAxis[2];
    dst[11] = 0;
    dst[12] = eye[0];
    dst[13] = eye[1];
    dst[14] = eye[2];
    dst[15] = 1;
    return dst;
}
/**
 * Creates a 4-by-4 matrix which translates by the given vector v.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translation matrix.
 * @memberOf module:twgl/m4
 */ function translation(v, dst) {
    dst = dst || new MatType(16);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = v[0];
    dst[13] = v[1];
    dst[14] = v[2];
    dst[15] = 1;
    return dst;
}
/**
 * Translates the given 4-by-4 matrix by the given vector v.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translated matrix.
 * @memberOf module:twgl/m4
 */ function translate(m, v, dst) {
    dst = dst || new MatType(16);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const m30 = m[12];
    const m31 = m[13];
    const m32 = m[14];
    const m33 = m[15];
    if (m !== dst) {
        dst[0] = m00;
        dst[1] = m01;
        dst[2] = m02;
        dst[3] = m03;
        dst[4] = m10;
        dst[5] = m11;
        dst[6] = m12;
        dst[7] = m13;
        dst[8] = m20;
        dst[9] = m21;
        dst[10] = m22;
        dst[11] = m23;
    }
    dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
    dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
    dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
    dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */ function rotationX(angleInRadians, dst) {
    dst = dst || new MatType(16);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = c;
    dst[6] = s;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = -s;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the x-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function rotateX(m, angleInRadians, dst) {
    dst = dst || new MatType(16);
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[4] = c * m10 + s * m20;
    dst[5] = c * m11 + s * m21;
    dst[6] = c * m12 + s * m22;
    dst[7] = c * m13 + s * m23;
    dst[8] = c * m20 - s * m10;
    dst[9] = c * m21 - s * m11;
    dst[10] = c * m22 - s * m12;
    dst[11] = c * m23 - s * m13;
    if (m !== dst) {
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[3];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */ function rotationY(angleInRadians, dst) {
    dst = dst || new MatType(16);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c;
    dst[1] = 0;
    dst[2] = -s;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = s;
    dst[9] = 0;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the y-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function rotateY(m, angleInRadians, dst) {
    dst = dst || new MatType(16);
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c * m00 - s * m20;
    dst[1] = c * m01 - s * m21;
    dst[2] = c * m02 - s * m22;
    dst[3] = c * m03 - s * m23;
    dst[8] = c * m20 + s * m00;
    dst[9] = c * m21 + s * m01;
    dst[10] = c * m22 + s * m02;
    dst[11] = c * m23 + s * m03;
    if (m !== dst) {
        dst[4] = m[4];
        dst[5] = m[5];
        dst[6] = m[6];
        dst[7] = m[7];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */ function rotationZ(angleInRadians, dst) {
    dst = dst || new MatType(16);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c;
    dst[1] = s;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = -s;
    dst[5] = c;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the z-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function rotateZ(m, angleInRadians, dst) {
    dst = dst || new MatType(16);
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    dst[0] = c * m00 + s * m10;
    dst[1] = c * m01 + s * m11;
    dst[2] = c * m02 + s * m12;
    dst[3] = c * m03 + s * m13;
    dst[4] = c * m10 - s * m00;
    dst[5] = c * m11 - s * m01;
    dst[6] = c * m12 - s * m02;
    dst[7] = c * m13 - s * m03;
    if (m !== dst) {
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
        dst[11] = m[11];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which rotates around the given axis by the given
 * angle.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A matrix which rotates angle radians
 *     around the axis.
 * @memberOf module:twgl/m4
 */ function axisRotation(axis, angleInRadians, dst) {
    dst = dst || new MatType(16);
    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    const n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    const xx = x * x;
    const yy = y * y;
    const zz = z * z;
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    const oneMinusCosine = 1 - c;
    dst[0] = xx + (1 - xx) * c;
    dst[1] = x * y * oneMinusCosine + z * s;
    dst[2] = x * z * oneMinusCosine - y * s;
    dst[3] = 0;
    dst[4] = x * y * oneMinusCosine - z * s;
    dst[5] = yy + (1 - yy) * c;
    dst[6] = y * z * oneMinusCosine + x * s;
    dst[7] = 0;
    dst[8] = x * z * oneMinusCosine + y * s;
    dst[9] = y * z * oneMinusCosine - x * s;
    dst[10] = zz + (1 - zz) * c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Rotates the given 4-by-4 matrix around the given axis by the
 * given angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */ function axisRotate(m, axis, angleInRadians, dst) {
    dst = dst || new MatType(16);
    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    const n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    const xx = x * x;
    const yy = y * y;
    const zz = z * z;
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    const oneMinusCosine = 1 - c;
    const r00 = xx + (1 - xx) * c;
    const r01 = x * y * oneMinusCosine + z * s;
    const r02 = x * z * oneMinusCosine - y * s;
    const r10 = x * y * oneMinusCosine - z * s;
    const r11 = yy + (1 - yy) * c;
    const r12 = y * z * oneMinusCosine + x * s;
    const r20 = x * z * oneMinusCosine + y * s;
    const r21 = y * z * oneMinusCosine - x * s;
    const r22 = zz + (1 - zz) * c;
    const m00 = m[0];
    const m01 = m[1];
    const m02 = m[2];
    const m03 = m[3];
    const m10 = m[4];
    const m11 = m[5];
    const m12 = m[6];
    const m13 = m[7];
    const m20 = m[8];
    const m21 = m[9];
    const m22 = m[10];
    const m23 = m[11];
    dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
    dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
    dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
    dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
    dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
    dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
    dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
    dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
    dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
    dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
    dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
    dst[11] = r20 * m03 + r21 * m13 + r22 * m23;
    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Creates a 4-by-4 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param {module:twgl/v3.Vec3} v A vector of
 *     three entries specifying the factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaling matrix.
 * @memberOf module:twgl/m4
 */ function scaling(v, dst) {
    dst = dst || new MatType(16);
    dst[0] = v[0];
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = v[1];
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = v[2];
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
}
/**
 * Scales the given 4-by-4 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * three entries.
 * @param {module:twgl/m4.Mat4} m The matrix to be modified.
 * @param {module:twgl/v3.Vec3} v A vector of three entries specifying the
 *     factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaled matrix.
 * @memberOf module:twgl/m4
 */ function scale(m, v, dst) {
    dst = dst || new MatType(16);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * m[0];
    dst[1] = v0 * m[1];
    dst[2] = v0 * m[2];
    dst[3] = v0 * m[3];
    dst[4] = v1 * m[4];
    dst[5] = v1 * m[5];
    dst[6] = v1 * m[6];
    dst[7] = v1 * m[7];
    dst[8] = v2 * m[8];
    dst[9] = v2 * m[9];
    dst[10] = v2 * m[10];
    dst[11] = v2 * m[11];
    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }
    return dst;
}
/**
 * Takes a 4-by-4 matrix and a vector with 3 entries,
 * interprets the vector as a point, transforms that point by the matrix, and
 * returns the result as a vector with 3 entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The point.
 * @param {module:twgl/v3.Vec3} [dst] optional vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed point.
 * @memberOf module:twgl/m4
 */ function transformPoint(m, v, dst) {
    dst = dst || create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const d = v0 * m[3] + v1 * m[7] + v2 * m[11] + m[15];
    dst[0] = (v0 * m[0] + v1 * m[4] + v2 * m[8] + m[12]) / d;
    dst[1] = (v0 * m[1] + v1 * m[5] + v2 * m[9] + m[13]) / d;
    dst[2] = (v0 * m[2] + v1 * m[6] + v2 * m[10] + m[14]) / d;
    return dst;
}
/**
 * Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
 * direction, transforms that direction by the matrix, and returns the result;
 * assumes the transformation of 3-dimensional space represented by the matrix
 * is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion. Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The direction.
 * @param {module:twgl/v3.Vec3} [dst] optional Vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed direction.
 * @memberOf module:twgl/m4
 */ function transformDirection(m, v, dst) {
    dst = dst || create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * m[0] + v1 * m[4] + v2 * m[8];
    dst[1] = v0 * m[1] + v1 * m[5] + v2 * m[9];
    dst[2] = v0 * m[2] + v1 * m[6] + v2 * m[10];
    return dst;
}
/**
 * Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
 * as a normal to a surface, and computes a vector which is normal upon
 * transforming that surface by the matrix. The effect of this function is the
 * same as transforming v (as a direction) by the inverse-transpose of m.  This
 * function assumes the transformation of 3-dimensional space represented by the
 * matrix is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion.  Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The normal.
 * @param {module:twgl/v3.Vec3} [dst] The direction. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed normal.
 * @memberOf module:twgl/m4
 */ function transformNormal(m, v, dst) {
    dst = dst || create();
    const mi = inverse(m);
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * mi[0] + v1 * mi[1] + v2 * mi[2];
    dst[1] = v0 * mi[4] + v1 * mi[5] + v2 * mi[6];
    dst[2] = v0 * mi[8] + v1 * mi[9] + v2 * mi[10];
    return dst;
}
var m4 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    axisRotate: axisRotate,
    axisRotation: axisRotation,
    copy: copy$1,
    frustum: frustum,
    getAxis: getAxis,
    getTranslation: getTranslation,
    identity: identity,
    inverse: inverse,
    lookAt: lookAt,
    multiply: multiply$1,
    negate: negate$1,
    ortho: ortho,
    perspective: perspective,
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
    rotationX: rotationX,
    rotationY: rotationY,
    rotationZ: rotationZ,
    scale: scale,
    scaling: scaling,
    setAxis: setAxis,
    setDefaultType: setDefaultType$1,
    setTranslation: setTranslation,
    transformDirection: transformDirection,
    transformNormal: transformNormal,
    transformPoint: transformPoint,
    translate: translate,
    translation: translation,
    transpose: transpose
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /* DataType */ const BYTE = 5120;
const UNSIGNED_BYTE = 5121;
const SHORT = 5122;
const UNSIGNED_SHORT = 5123;
const INT = 5124;
const UNSIGNED_INT = 5125;
const FLOAT = 5126;
const UNSIGNED_SHORT_4_4_4_4 = 32819;
const UNSIGNED_SHORT_5_5_5_1 = 32820;
const UNSIGNED_SHORT_5_6_5 = 33635;
const HALF_FLOAT = 5131;
const UNSIGNED_INT_2_10_10_10_REV = 33640;
const UNSIGNED_INT_10F_11F_11F_REV = 35899;
const UNSIGNED_INT_5_9_9_9_REV = 35902;
const FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
const UNSIGNED_INT_24_8 = 34042;
const glTypeToTypedArray = {
};
{
    const tt = glTypeToTypedArray;
    tt[BYTE] = Int8Array;
    tt[UNSIGNED_BYTE] = Uint8Array;
    tt[SHORT] = Int16Array;
    tt[UNSIGNED_SHORT] = Uint16Array;
    tt[INT] = Int32Array;
    tt[UNSIGNED_INT] = Uint32Array;
    tt[FLOAT] = Float32Array;
    tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
    tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
    tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
    tt[HALF_FLOAT] = Uint16Array;
    tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
    tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
    tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
    tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
    tt[UNSIGNED_INT_24_8] = Uint32Array;
}/**
 * Get the GL type for a typedArray
 * @param {ArrayBufferView} typedArray a typedArray
 * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */ function getGLTypeForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) return BYTE;
     // eslint-disable-line
    if (typedArray instanceof Uint8Array) return UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArray instanceof Uint8ClampedArray) return UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArray instanceof Int16Array) return SHORT;
     // eslint-disable-line
    if (typedArray instanceof Uint16Array) return UNSIGNED_SHORT;
     // eslint-disable-line
    if (typedArray instanceof Int32Array) return INT;
     // eslint-disable-line
    if (typedArray instanceof Uint32Array) return UNSIGNED_INT;
     // eslint-disable-line
    if (typedArray instanceof Float32Array) return FLOAT;
     // eslint-disable-line
    throw new Error('unsupported typed array type');
}
/**
 * Get the GL type for a typedArray type
 * @param {ArrayBufferView} typedArrayType a typedArray constructor
 * @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */ function getGLTypeForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) return BYTE;
     // eslint-disable-line
    if (typedArrayType === Uint8Array) return UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArrayType === Uint8ClampedArray) return UNSIGNED_BYTE;
     // eslint-disable-line
    if (typedArrayType === Int16Array) return SHORT;
     // eslint-disable-line
    if (typedArrayType === Uint16Array) return UNSIGNED_SHORT;
     // eslint-disable-line
    if (typedArrayType === Int32Array) return INT;
     // eslint-disable-line
    if (typedArrayType === Uint32Array) return UNSIGNED_INT;
     // eslint-disable-line
    if (typedArrayType === Float32Array) return FLOAT;
     // eslint-disable-line
    throw new Error('unsupported typed array type');
}
/**
 * Get the typed array constructor for a given GL type
 * @param {number} type the GL type. (eg: `gl.UNSIGNED_INT`)
 * @return {function} the constructor for a the corresponding typed array. (eg. `Uint32Array`).
 * @memberOf module:twgl/typedArray
 */ function getTypedArrayTypeForGLType(type) {
    const CTOR = glTypeToTypedArray[type];
    if (!CTOR) throw new Error('unknown gl type');
    return CTOR;
}
const isArrayBuffer = typeof SharedArrayBuffer !== 'undefined' ? function isArrayBufferOrSharedArrayBuffer(a) {
    return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
} : function isArrayBuffer(a) {
    return a && a.buffer && a.buffer instanceof ArrayBuffer;
};
var typedarrays = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getGLTypeForTypedArray: getGLTypeForTypedArray,
    getGLTypeForTypedArrayType: getGLTypeForTypedArrayType,
    getTypedArrayTypeForGLType: getTypedArrayTypeForGLType,
    isArrayBuffer: isArrayBuffer
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /* eslint no-console: "off" */ /**
 * Copy named properties
 *
 * @param {string[]} names names of properties to copy
 * @param {object} src object to copy properties from
 * @param {object} dst object to copy properties to
 * @private
 */ function copyNamedProperties(names, src, dst) {
    names.forEach(function(name) {
        const value = src[name];
        if (value !== undefined) dst[name] = value;
    });
}
/**
 * Copies properties from source to dest only if a matching key is in dest
 *
 * @param {Object.<string, ?>} src the source
 * @param {Object.<string, ?>} dst the dest
 * @private
 */ function copyExistingProperties(src, dst) {
    Object.keys(dst).forEach(function(key) {
        if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) dst[key] = src[key];
    });
}
function error(...args) {
    console.error(...args);
}
function warn(...args) {
    console.warn(...args);
}
function isBuffer(gl, t) {
    return typeof WebGLBuffer !== 'undefined' && t instanceof WebGLBuffer;
}
function isRenderbuffer(gl, t) {
    return typeof WebGLRenderbuffer !== 'undefined' && t instanceof WebGLRenderbuffer;
}
function isShader(gl, t) {
    return typeof WebGLShader !== 'undefined' && t instanceof WebGLShader;
}
function isTexture(gl, t) {
    return typeof WebGLTexture !== 'undefined' && t instanceof WebGLTexture;
}
function isSampler(gl, t) {
    return typeof WebGLSampler !== 'undefined' && t instanceof WebGLSampler;
}
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const STATIC_DRAW = 35044;
const ARRAY_BUFFER = 34962;
const ELEMENT_ARRAY_BUFFER = 34963;
const BUFFER_SIZE = 34660;
const BYTE$1 = 5120;
const UNSIGNED_BYTE$1 = 5121;
const SHORT$1 = 5122;
const UNSIGNED_SHORT$1 = 5123;
const INT$1 = 5124;
const UNSIGNED_INT$1 = 5125;
const FLOAT$1 = 5126;
const defaults = {
    attribPrefix: ""
};
/**
 * Sets the default attrib prefix
 *
 * When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 * as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 * In other words I'll create arrays of geometry like this
 *
 *     var arrays = {
 *       position: ...
 *       normal: ...
 *       texcoord: ...
 *     };
 *
 * But need those mapped to attributes and my attributes start with `a_`.
 *
 * @deprecated see {@link module:twgl.setDefaults}
 * @param {string} prefix prefix for attribs
 * @memberOf module:twgl/attributes
 */ function setAttributePrefix(prefix) {
    defaults.attribPrefix = prefix;
}
function setDefaults(newDefaults) {
    copyExistingProperties(newDefaults, defaults);
}
function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, array, drawType || STATIC_DRAW);
}
/**
 * Given typed array creates a WebGLBuffer and copies the typed array
 * into it.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|WebGLBuffer} typedArray the typed array. Note: If a WebGLBuffer is passed in it will just be returned. No action will be taken
 * @param {number} [type] the GL bind type for the buffer. Default = `gl.ARRAY_BUFFER`.
 * @param {number} [drawType] the GL draw type for the buffer. Default = 'gl.STATIC_DRAW`.
 * @return {WebGLBuffer} the created WebGLBuffer
 * @memberOf module:twgl/attributes
 */ function createBufferFromTypedArray(gl, typedArray, type, drawType) {
    if (isBuffer(gl, typedArray)) return typedArray;
    type = type || ARRAY_BUFFER;
    const buffer = gl.createBuffer();
    setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
    return buffer;
}
function isIndices(name) {
    return name === "indices";
}
// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function getNormalizationForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) return true;
     // eslint-disable-line
    if (typedArray instanceof Uint8Array) return true;
     // eslint-disable-line
    return false;
}
// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function getNormalizationForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) return true;
     // eslint-disable-line
    if (typedArrayType === Uint8Array) return true;
     // eslint-disable-line
    return false;
}
function getArray(array) {
    return array.length ? array : array.data;
}
const texcoordRE = /coord|texture/i;
const colorRE = /color|colour/i;
function guessNumComponentsFromName(name, length) {
    let numComponents;
    if (texcoordRE.test(name)) numComponents = 2;
    else if (colorRE.test(name)) numComponents = 4;
    else numComponents = 3; // position, normals, indices ...
    if (length % numComponents > 0) throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length} values is not evenly divisible by ${numComponents}. You should specify it.`);
    return numComponents;
}
function getNumComponents(array, arrayName) {
    return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
}
function makeTypedArray(array, name) {
    if (isArrayBuffer(array)) return array;
    if (isArrayBuffer(array.data)) return array.data;
    if (Array.isArray(array)) array = {
        data: array
    };
    let Type = array.type;
    if (!Type) {
        if (isIndices(name)) Type = Uint16Array;
        else Type = Float32Array;
    }
    return new Type(array.data);
}
/**
 * The info for an attribute. This is effectively just the arguments to `gl.vertexAttribPointer` plus the WebGLBuffer
 * for the attribute.
 *
 * @typedef {Object} AttribInfo
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {number} [numComponents] the number of components for this attribute.
 * @property {number} [size] synonym for `numComponents`.
 * @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
 * @property {boolean} [normalize] whether or not to normalize the data. Default = false
 * @property {number} [offset] offset into buffer in bytes. Default = 0
 * @property {number} [stride] the stride in bytes per element. Default = 0
 * @property {number} [divisor] the divisor in instances. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
 *    where as anything else = do call it with this value
 * @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
 * @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
 * @memberOf module:twgl
 */ /**
 * Use this type of array spec when TWGL can't guess the type or number of components of an array
 * @typedef {Object} FullArraySpec
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {(number|number[]|ArrayBufferView)} data The data of the array. A number alone becomes the number of elements of type.
 * @property {number} [numComponents] number of components for `vertexAttribPointer`. Default is based on the name of the array.
 *    If `coord` is in the name assumes `numComponents = 2`.
 *    If `color` is in the name assumes `numComponents = 4`.
 *    otherwise assumes `numComponents = 3`
 * @property {constructor} [type] type. This is only used if `data` is a JavaScript array. It is the constructor for the typedarray. (eg. `Uint8Array`).
 * For example if you want colors in a `Uint8Array` you might have a `FullArraySpec` like `{ type: Uint8Array, data: [255,0,255,255, ...], }`.
 * @property {number} [size] synonym for `numComponents`.
 * @property {boolean} [normalize] normalize for `vertexAttribPointer`. Default is true if type is `Int8Array` or `Uint8Array` otherwise false.
 * @property {number} [stride] stride for `vertexAttribPointer`. Default = 0
 * @property {number} [offset] offset for `vertexAttribPointer`. Default = 0
 * @property {number} [divisor] divisor for `vertexAttribDivisor`. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
 *    where as anything else = do call it with this value
 * @property {string} [attrib] name of attribute this array maps to. Defaults to same name as array prefixed by the default attribPrefix.
 * @property {string} [name] synonym for `attrib`.
 * @property {string} [attribName] synonym for `attrib`.
 * @property {WebGLBuffer} [buffer] Buffer to use for this attribute. This lets you use your own buffer
 *    but you will need to supply `numComponents` and `type`. You can effectively pass an `AttribInfo`
 *    to provide this. Example:
 *
 *         const bufferInfo1 = twgl.createBufferInfoFromArrays(gl, {
 *           position: [1, 2, 3, ... ],
 *         });
 *         const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, {
 *           position: bufferInfo1.attribs.position,  // use the same buffer from bufferInfo1
 *         });
 *
 * @memberOf module:twgl
 */ /**
 * An individual array in {@link module:twgl.Arrays}
 *
 * When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
 * the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
 * be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
 *
 * @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
 * @memberOf module:twgl
 */ /**
 * This is a JavaScript object of arrays by name. The names should match your shader's attributes. If your
 * attributes have a common prefix you can specify it by calling {@link module:twgl.setAttributePrefix}.
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * Objects with various fields. See {@link module:twgl.FullArraySpec}.
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 * @typedef {Object.<string, module:twgl.ArraySpec>} Arrays
 * @memberOf module:twgl
 */ /**
 * Creates a set of attribute data and WebGLBuffers from set of arrays
 *
 * Given
 *
 *      var arrays = {
 *        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
 *        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *      };
 *
 * returns something like
 *
 *      var attribs = {
 *        position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
 *      };
 *
 * notes:
 *
 * *   Arrays can take various forms
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * @param {WebGLRenderingContext} gl The webgl rendering context.
 * @param {module:twgl.Arrays} arrays The arrays
 * @param {module:twgl.BufferInfo} [srcBufferInfo] a BufferInfo to copy from
 *   This lets you share buffers. Any arrays you supply will override
 *   the buffers from srcBufferInfo.
 * @return {Object.<string, module:twgl.AttribInfo>} the attribs
 * @memberOf module:twgl/attributes
 */ function createAttribsFromArrays(gl, arrays) {
    const attribs = {
    };
    Object.keys(arrays).forEach(function(arrayName) {
        if (!isIndices(arrayName)) {
            const array = arrays[arrayName];
            const attribName = array.attrib || array.name || array.attribName || defaults.attribPrefix + arrayName;
            if (array.value) {
                if (!Array.isArray(array.value) && !isArrayBuffer(array.value)) throw new Error('array.value is not array or typedarray');
                attribs[attribName] = {
                    value: array.value
                };
            } else {
                let buffer;
                let type;
                let normalization;
                let numComponents;
                if (array.buffer && array.buffer instanceof WebGLBuffer) {
                    buffer = array.buffer;
                    numComponents = array.numComponents || array.size;
                    type = array.type;
                    normalization = array.normalize;
                } else if (typeof array === "number" || typeof array.data === "number") {
                    const numValues = array.data || array;
                    const arrayType = array.type || Float32Array;
                    const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
                    type = getGLTypeForTypedArrayType(arrayType);
                    normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArrayType(arrayType);
                    numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
                    buffer = gl.createBuffer();
                    gl.bindBuffer(ARRAY_BUFFER, buffer);
                    gl.bufferData(ARRAY_BUFFER, numBytes, array.drawType || STATIC_DRAW);
                } else {
                    const typedArray = makeTypedArray(array, arrayName);
                    buffer = createBufferFromTypedArray(gl, typedArray, undefined, array.drawType);
                    type = getGLTypeForTypedArray(typedArray);
                    normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArray(typedArray);
                    numComponents = getNumComponents(array, arrayName);
                }
                attribs[attribName] = {
                    buffer: buffer,
                    numComponents: numComponents,
                    type: type,
                    normalize: normalization,
                    stride: array.stride || 0,
                    offset: array.offset || 0,
                    divisor: array.divisor === undefined ? undefined : array.divisor,
                    drawType: array.drawType
                };
            }
        }
    });
    gl.bindBuffer(ARRAY_BUFFER, null);
    return attribs;
}
/**
 * Sets the contents of a buffer attached to an attribInfo
 *
 * This is helper function to dynamically update a buffer.
 *
 * Let's say you make a bufferInfo
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *     var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
 *
 *  And you want to dynamically update the positions. You could do this
 *
 *     // assuming arrays.position has already been updated with new data.
 *     twgl.setAttribInfoBufferFromArray(gl, bufferInfo.attribs.position, arrays.position);
 *
 * @param {WebGLRenderingContext} gl
 * @param {AttribInfo} attribInfo The attribInfo who's buffer contents to set. NOTE: If you have an attribute prefix
 *   the name of the attribute will include the prefix.
 * @param {ArraySpec} array Note: it is arguably inefficient to pass in anything but a typed array because anything
 *    else will have to be converted to a typed array before it can be used by WebGL. During init time that
 *    inefficiency is usually not important but if you're updating data dynamically best to be efficient.
 * @param {number} [offset] an optional offset into the buffer. This is only an offset into the WebGL buffer
 *    not the array. To pass in an offset into the array itself use a typed array and create an `ArrayBufferView`
 *    for the portion of the array you want to use.
 *
 *        var someArray = new Float32Array(1000); // an array with 1000 floats
 *        var someSubArray = new Float32Array(someArray.buffer, offsetInBytes, sizeInUnits); // a view into someArray
 *
 *    Now you can pass `someSubArray` into setAttribInfoBufferFromArray`
 * @memberOf module:twgl/attributes
 */ function setAttribInfoBufferFromArray(gl, attribInfo, array, offset) {
    array = makeTypedArray(array);
    if (offset !== undefined) {
        gl.bindBuffer(ARRAY_BUFFER, attribInfo.buffer);
        gl.bufferSubData(ARRAY_BUFFER, offset, array);
    } else setBufferFromTypedArray(gl, ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
}
function getBytesPerValueForGLType(gl, type) {
    if (type === BYTE$1) return 1; // eslint-disable-line
    if (type === UNSIGNED_BYTE$1) return 1; // eslint-disable-line
    if (type === SHORT$1) return 2; // eslint-disable-line
    if (type === UNSIGNED_SHORT$1) return 2; // eslint-disable-line
    if (type === INT$1) return 4; // eslint-disable-line
    if (type === UNSIGNED_INT$1) return 4; // eslint-disable-line
    if (type === FLOAT$1) return 4; // eslint-disable-line
    return 0;
}
// Tries to get the number of elements from a set of arrays.
const positionKeys = [
    'position',
    'positions',
    'a_position'
];
function getNumElementsFromNonIndexedArrays(arrays) {
    let key;
    let ii;
    for(ii = 0; ii < positionKeys.length; ++ii){
        key = positionKeys[ii];
        if (key in arrays) break;
    }
    if (ii === positionKeys.length) key = Object.keys(arrays)[0];
    const array = arrays[key];
    const length = getArray(array).length;
    const numComponents = getNumComponents(array, key);
    const numElements = length / numComponents;
    if (length % numComponents > 0) throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
    return numElements;
}
function getNumElementsFromAttributes(gl, attribs) {
    let key;
    let ii;
    for(ii = 0; ii < positionKeys.length; ++ii){
        key = positionKeys[ii];
        if (key in attribs) break;
        key = defaults.attribPrefix + key;
        if (key in attribs) break;
    }
    if (ii === positionKeys.length) key = Object.keys(attribs)[0];
    const attrib = attribs[key];
    gl.bindBuffer(ARRAY_BUFFER, attrib.buffer);
    const numBytes = gl.getBufferParameter(ARRAY_BUFFER, BUFFER_SIZE);
    gl.bindBuffer(ARRAY_BUFFER, null);
    const bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
    const totalElements = numBytes / bytesPerValue;
    const numComponents = attrib.numComponents || attrib.size;
    // TODO: check stride
    const numElements = totalElements / numComponents;
    if (numElements % 1 !== 0) throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
    return numElements;
}
/**
 * @typedef {Object} BufferInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
 * @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
 * @memberOf module:twgl
 */ /**
 * Creates a BufferInfo from an object of arrays.
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * Given an object like
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 *  Creates an BufferInfo like this
 *
 *     bufferInfo = {
 *       numElements: 4,        // or whatever the number of elements is
 *       indices: WebGLBuffer,  // this property will not exist if there are no indices
 *       attribs: {
 *         position: { buffer: WebGLBuffer, numComponents: 3, },
 *         normal:   { buffer: WebGLBuffer, numComponents: 3, },
 *         texcoord: { buffer: WebGLBuffer, numComponents: 2, },
 *       },
 *     };
 *
 *  The properties of arrays can be JavaScript arrays in which case the number of components
 *  will be guessed.
 *
 *     var arrays = {
 *        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
 *        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
 *        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
 *        indices:  [0, 1, 2, 1, 2, 3],
 *     };
 *
 *  They can also be TypedArrays
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *
 *  Or AugmentedTypedArrays
 *
 *     var positions = createAugmentedTypedArray(3, 4);
 *     var texcoords = createAugmentedTypedArray(2, 4);
 *     var normals   = createAugmentedTypedArray(3, 4);
 *     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
 *
 *     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
 *     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
 *     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
 *     indices.push([0, 1, 2, 1, 2, 3]);
 *
 *     var arrays = {
 *        position: positions,
 *        texcoord: texcoords,
 *        normal:   normals,
 *        indices:  indices,
 *     };
 *
 * For the last example it is equivalent to
 *
 *     var bufferInfo = {
 *       attribs: {
 *         position: { numComponents: 3, buffer: gl.createBuffer(), },
 *         texcoord: { numComponents: 2, buffer: gl.createBuffer(), },
 *         normal: { numComponents: 3, buffer: gl.createBuffer(), },
 *       },
 *       indices: gl.createBuffer(),
 *       numElements: 6,
 *     };
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.position.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.texcoord.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.normal.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
 *     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.Arrays} arrays Your data
 * @param {module:twgl.BufferInfo} [srcBufferInfo] An existing
 *        buffer info to start from. WebGLBuffers etc specified
 *        in the srcBufferInfo will be used in a new BufferInfo
 *        with any arrays specified overriding the ones in
 *        srcBufferInfo.
 * @return {module:twgl.BufferInfo} A BufferInfo
 * @memberOf module:twgl/attributes
 */ function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
    const newAttribs = createAttribsFromArrays(gl, arrays);
    const bufferInfo = Object.assign({
    }, srcBufferInfo ? srcBufferInfo : {
    });
    bufferInfo.attribs = Object.assign({
    }, srcBufferInfo ? srcBufferInfo.attribs : {
    }, newAttribs);
    const indices = arrays.indices;
    if (indices) {
        const newIndices = makeTypedArray(indices, "indices");
        bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, ELEMENT_ARRAY_BUFFER);
        bufferInfo.numElements = newIndices.length;
        bufferInfo.elementType = getGLTypeForTypedArray(newIndices);
    } else if (!bufferInfo.numElements) bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
    return bufferInfo;
}
/**
 * Creates a buffer from an array, typed array, or array spec
 *
 * Given something like this
 *
 *     [1, 2, 3],
 *
 * or
 *
 *     new Uint16Array([1,2,3]);
 *
 * or
 *
 *     {
 *        data: [1, 2, 3],
 *        type: Uint8Array,
 *     }
 *
 * returns a WebGLBuffer that contains the given data.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.ArraySpec} array an array, typed array, or array spec.
 * @param {string} arrayName name of array. Used to guess the type if type can not be derived otherwise.
 * @return {WebGLBuffer} a WebGLBuffer containing the data in array.
 * @memberOf module:twgl/attributes
 */ function createBufferFromArray(gl, array, arrayName) {
    const type = arrayName === "indices" ? ELEMENT_ARRAY_BUFFER : ARRAY_BUFFER;
    const typedArray = makeTypedArray(array, arrayName);
    return createBufferFromTypedArray(gl, typedArray, type);
}
/**
 * Creates buffers from arrays or typed arrays
 *
 * Given something like this
 *
 *     var arrays = {
 *        positions: [1, 2, 3],
 *        normals: [0, 0, 1],
 *     }
 *
 * returns something like
 *
 *     buffers = {
 *       positions: WebGLBuffer,
 *       normals: WebGLBuffer,
 *     }
 *
 * If the buffer is named 'indices' it will be made an ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.Arrays} arrays
 * @return {Object<string, WebGLBuffer>} returns an object with one WebGLBuffer per array
 * @memberOf module:twgl/attributes
 */ function createBuffersFromArrays(gl, arrays) {
    const buffers = {
    };
    Object.keys(arrays).forEach(function(key) {
        buffers[key] = createBufferFromArray(gl, arrays[key], key);
    });
    // Ugh!
    if (arrays.indices) {
        buffers.numElements = arrays.indices.length;
        buffers.elementType = getGLTypeForTypedArray(makeTypedArray(arrays.indices));
    } else buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
    return buffers;
}
var attributes = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createAttribsFromArrays: createAttribsFromArrays,
    createBuffersFromArrays: createBuffersFromArrays,
    createBufferFromArray: createBufferFromArray,
    createBufferFromTypedArray: createBufferFromTypedArray,
    createBufferInfoFromArrays: createBufferInfoFromArrays,
    setAttribInfoBufferFromArray: setAttribInfoBufferFromArray,
    setAttributePrefix: setAttributePrefix,
    setAttributeDefaults_: setDefaults,
    getNumComponents_: getNumComponents,
    getArray_: getArray
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const getArray$1 = getArray; // eslint-disable-line
const getNumComponents$1 = getNumComponents; // eslint-disable-line
/**
 * @typedef {(Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array)} TypedArray
 */ /**
 * Add `push` to a typed array. It just keeps a 'cursor'
 * and allows use to `push` values into the array so we
 * don't have to manually compute offsets
 * @param {TypedArray} typedArray TypedArray to augment
 * @param {number} numComponents number of components.
 * @private
 */ function augmentTypedArray(typedArray, numComponents) {
    let cursor = 0;
    typedArray.push = function() {
        for(let ii = 0; ii < arguments.length; ++ii){
            const value = arguments[ii];
            if (value instanceof Array || isArrayBuffer(value)) for(let jj = 0; jj < value.length; ++jj)typedArray[cursor++] = value[jj];
            else typedArray[cursor++] = value;
        }
    };
    typedArray.reset = function(opt_index) {
        cursor = opt_index || 0;
    };
    typedArray.numComponents = numComponents;
    Object.defineProperty(typedArray, 'numElements', {
        get: function() {
            return this.length / this.numComponents | 0;
        }
    });
    return typedArray;
}
/**
 * creates a typed array with a `push` function attached
 * so that you can easily *push* values.
 *
 * `push` can take multiple arguments. If an argument is an array each element
 * of the array will be added to the typed array.
 *
 * Example:
 *
 *     const array = createAugmentedTypedArray(3, 2);  // creates a Float32Array with 6 values
 *     array.push(1, 2, 3);
 *     array.push([4, 5, 6]);
 *     // array now contains [1, 2, 3, 4, 5, 6]
 *
 * Also has `numComponents` and `numElements` properties.
 *
 * @param {number} numComponents number of components
 * @param {number} numElements number of elements. The total size of the array will be `numComponents * numElements`.
 * @param {constructor} opt_type A constructor for the type. Default = `Float32Array`.
 * @return {ArrayBufferView} A typed array.
 * @memberOf module:twgl/primitives
 */ function createAugmentedTypedArray(numComponents, numElements, opt_type) {
    const Type = opt_type || Float32Array;
    return augmentTypedArray(new Type(numComponents * numElements), numComponents);
}
function allButIndices(name) {
    return name !== "indices";
}
/**
 * Given indexed vertices creates a new set of vertices un-indexed by expanding the indexed vertices.
 * @param {Object.<string, TypedArray>} vertices The indexed vertices to deindex
 * @return {Object.<string, TypedArray>} The deindexed vertices
 * @memberOf module:twgl/primitives
 */ function deindexVertices(vertices) {
    const indices = vertices.indices;
    const newVertices = {
    };
    const numElements = indices.length;
    function expandToUnindexed(channel) {
        const srcBuffer = vertices[channel];
        const numComponents = srcBuffer.numComponents;
        const dstBuffer = createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
        for(let ii = 0; ii < numElements; ++ii){
            const ndx = indices[ii];
            const offset = ndx * numComponents;
            for(let jj = 0; jj < numComponents; ++jj)dstBuffer.push(srcBuffer[offset + jj]);
        }
        newVertices[channel] = dstBuffer;
    }
    Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);
    return newVertices;
}
/**
 * flattens the normals of deindexed vertices in place.
 * @param {Object.<string, TypedArray>} vertices The deindexed vertices who's normals to flatten
 * @return {Object.<string, TypedArray>} The flattened vertices (same as was passed in)
 * @memberOf module:twgl/primitives
 */ function flattenNormals(vertices) {
    if (vertices.indices) throw new Error('can not flatten normals of indexed vertices. deindex them first');
    const normals = vertices.normal;
    const numNormals = normals.length;
    for(let ii = 0; ii < numNormals; ii += 9){
        // pull out the 3 normals for this triangle
        const nax = normals[ii + 0];
        const nay = normals[ii + 1];
        const naz = normals[ii + 2];
        const nbx = normals[ii + 3];
        const nby = normals[ii + 4];
        const nbz = normals[ii + 5];
        const ncx = normals[ii + 6];
        const ncy = normals[ii + 7];
        const ncz = normals[ii + 8];
        // add them
        let nx = nax + nbx + ncx;
        let ny = nay + nby + ncy;
        let nz = naz + nbz + ncz;
        // normalize them
        const length = Math.sqrt(nx * nx + ny * ny + nz * nz);
        nx /= length;
        ny /= length;
        nz /= length;
        // copy them back in
        normals[ii + 0] = nx;
        normals[ii + 1] = ny;
        normals[ii + 2] = nz;
        normals[ii + 3] = nx;
        normals[ii + 4] = ny;
        normals[ii + 5] = nz;
        normals[ii + 6] = nx;
        normals[ii + 7] = ny;
        normals[ii + 8] = nz;
    }
    return vertices;
}
function applyFuncToV3Array(array, matrix, fn) {
    const len = array.length;
    const tmp = new Float32Array(3);
    for(let ii = 0; ii < len; ii += 3){
        fn(matrix, [
            array[ii],
            array[ii + 1],
            array[ii + 2]
        ], tmp);
        array[ii] = tmp[0];
        array[ii + 1] = tmp[1];
        array[ii + 2] = tmp[2];
    }
}
function transformNormal$1(mi, v, dst) {
    dst = dst || create();
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    dst[0] = v0 * mi[0] + v1 * mi[1] + v2 * mi[2];
    dst[1] = v0 * mi[4] + v1 * mi[5] + v2 * mi[6];
    dst[2] = v0 * mi[8] + v1 * mi[9] + v2 * mi[10];
    return dst;
}
/**
 * Reorients directions by the given matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */ function reorientDirections(array, matrix) {
    applyFuncToV3Array(array, matrix, transformDirection);
    return array;
}
/**
 * Reorients normals by the inverse-transpose of the given
 * matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */ function reorientNormals(array, matrix) {
    applyFuncToV3Array(array, inverse(matrix), transformNormal$1);
    return array;
}
/**
 * Reorients positions by the given matrix. In other words, it
 * multiplies each vertex by the given matrix.
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */ function reorientPositions(array, matrix) {
    applyFuncToV3Array(array, matrix, transformPoint);
    return array;
}
/**
 * @typedef {(number[]|TypedArray)} NativeArrayOrTypedArray
 */ /**
 * Reorients arrays by the given matrix. Assumes arrays have
 * names that contains 'pos' could be reoriented as positions,
 * 'binorm' or 'tan' as directions, and 'norm' as normals.
 *
 * @param {Object.<string, NativeArrayOrTypedArray>} arrays The vertices to reorient
 * @param {module:twgl/m4.Mat4} matrix matrix to reorient by.
 * @return {Object.<string, NativeArrayOrTypedArray>} same arrays that were passed in.
 * @memberOf module:twgl/primitives
 */ function reorientVertices(arrays, matrix) {
    Object.keys(arrays).forEach(function(name) {
        const array = arrays[name];
        if (name.indexOf("pos") >= 0) reorientPositions(array, matrix);
        else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) reorientDirections(array, matrix);
        else if (name.indexOf("norm") >= 0) reorientNormals(array, matrix);
    });
    return arrays;
}
/**
 * Creates XY quad BufferInfo
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, WebGLBuffer>} the created XY Quad BufferInfo
 * @memberOf module:twgl/primitives
 * @function createXYQuadBuffers
 */ /**
 * Creates XY quad Buffers
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {module:twgl.BufferInfo} the created XY Quad buffers
 * @memberOf module:twgl/primitives
 * @function createXYQuadBufferInfo
 */ /**
 * Creates XY quad vertices
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0, 0.5);
 *
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, TypedArray>} the created XY Quad vertices
 * @memberOf module:twgl/primitives
 */ function createXYQuadVertices(size, xOffset, yOffset) {
    size = size || 2;
    xOffset = xOffset || 0;
    yOffset = yOffset || 0;
    size *= 0.5;
    return {
        position: {
            numComponents: 2,
            data: [
                xOffset + -1 * size,
                yOffset + -1 * size,
                xOffset + 1 * size,
                yOffset + -1 * size,
                xOffset + -1 * size,
                yOffset + 1 * size,
                xOffset + 1 * size,
                yOffset + 1 * size, 
            ]
        },
        normal: [
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            1, 
        ],
        texcoord: [
            0,
            0,
            1,
            0,
            0,
            1,
            1,
            1, 
        ],
        indices: [
            0,
            1,
            2,
            2,
            1,
            3
        ]
    };
}
/**
 * Creates XZ plane BufferInfo.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {module:twgl.BufferInfo} The created plane BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createPlaneBufferInfo
 */ /**
 * Creates XZ plane buffers.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, WebGLBuffer>} The created plane buffers.
 * @memberOf module:twgl/primitives
 * @function createPlaneBuffers
 */ /**
 * Creates XZ plane vertices.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, TypedArray>} The created plane vertices.
 * @memberOf module:twgl/primitives
 */ function createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
    width = width || 1;
    depth = depth || 1;
    subdivisionsWidth = subdivisionsWidth || 1;
    subdivisionsDepth = subdivisionsDepth || 1;
    matrix = matrix || identity();
    const numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    for(let z = 0; z <= subdivisionsDepth; z++)for(let x = 0; x <= subdivisionsWidth; x++){
        const u = x / subdivisionsWidth;
        const v = z / subdivisionsDepth;
        positions.push(width * u - width * 0.5, 0, depth * v - depth * 0.5);
        normals.push(0, 1, 0);
        texcoords.push(u, v);
    }
    const numVertsAcross = subdivisionsWidth + 1;
    const indices = createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
    for(let z1 = 0; z1 < subdivisionsDepth; z1++)for(let x1 = 0; x1 < subdivisionsWidth; x1++){
        // Make triangle 1 of quad.
        indices.push((z1 + 0) * numVertsAcross + x1, (z1 + 1) * numVertsAcross + x1, (z1 + 0) * numVertsAcross + x1 + 1);
        // Make triangle 2 of quad.
        indices.push((z1 + 1) * numVertsAcross + x1, (z1 + 1) * numVertsAcross + x1 + 1, (z1 + 0) * numVertsAcross + x1 + 1);
    }
    const arrays = reorientVertices({
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    }, matrix);
    return arrays;
}
/**
 * Creates sphere BufferInfo.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {module:twgl.BufferInfo} The created sphere BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createSphereBufferInfo
 */ /**
 * Creates sphere buffers.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, WebGLBuffer>} The created sphere buffers.
 * @memberOf module:twgl/primitives
 * @function createSphereBuffers
 */ /**
 * Creates sphere vertices.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, TypedArray>} The created sphere vertices.
 * @memberOf module:twgl/primitives
 */ function createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
    if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) throw new Error('subdivisionAxis and subdivisionHeight must be > 0');
    opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
    opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
    opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
    opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
    const latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
    const longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
    // We are going to generate our sphere by iterating through its
    // spherical coordinates and generating 2 triangles for each quad on a
    // ring of the sphere.
    const numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    // Generate the individual vertices in our vertex buffer.
    for(let y = 0; y <= subdivisionsHeight; y++)for(let x = 0; x <= subdivisionsAxis; x++){
        // Generate a vertex based on its spherical coordinates
        const u = x / subdivisionsAxis;
        const v = y / subdivisionsHeight;
        const theta = longRange * u + opt_startLongitudeInRadians;
        const phi = latRange * v + opt_startLatitudeInRadians;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        const ux = cosTheta * sinPhi;
        const uy = cosPhi;
        const uz = sinTheta * sinPhi;
        positions.push(radius * ux, radius * uy, radius * uz);
        normals.push(ux, uy, uz);
        texcoords.push(1 - u, v);
    }
    const numVertsAround = subdivisionsAxis + 1;
    const indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
    for(let x2 = 0; x2 < subdivisionsAxis; x2++)for(let y1 = 0; y1 < subdivisionsHeight; y1++){
        // Make triangle 1 of quad.
        indices.push((y1 + 0) * numVertsAround + x2, (y1 + 0) * numVertsAround + x2 + 1, (y1 + 1) * numVertsAround + x2);
        // Make triangle 2 of quad.
        indices.push((y1 + 1) * numVertsAround + x2, (y1 + 0) * numVertsAround + x2 + 1, (y1 + 1) * numVertsAround + x2 + 1);
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Array of the indices of corners of each face of a cube.
 * @type {Array.<number[]>}
 * @private
 */ const CUBE_FACE_INDICES = [
    [
        3,
        7,
        5,
        1
    ],
    [
        6,
        2,
        0,
        4
    ],
    [
        6,
        7,
        3,
        2
    ],
    [
        0,
        1,
        5,
        4
    ],
    [
        7,
        6,
        4,
        5
    ],
    [
        2,
        3,
        1,
        0
    ]
];
/**
 * Creates a BufferInfo for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCubeBufferInfo
 */ /**
 * Creates the buffers and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCubeBuffers
 */ /**
 * Creates the vertices and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function createCubeVertices(size) {
    size = size || 1;
    const k = size / 2;
    const cornerVertices = [
        [
            -k,
            -k,
            -k
        ],
        [
            +k,
            -k,
            -k
        ],
        [
            -k,
            +k,
            -k
        ],
        [
            +k,
            +k,
            -k
        ],
        [
            -k,
            -k,
            +k
        ],
        [
            +k,
            -k,
            +k
        ],
        [
            -k,
            +k,
            +k
        ],
        [
            +k,
            +k,
            +k
        ], 
    ];
    const faceNormals = [
        [
            1,
            0,
            0
        ],
        [
            -1,
            0,
            0
        ],
        [
            0,
            1,
            0
        ],
        [
            0,
            -1,
            0
        ],
        [
            0,
            0,
            1
        ],
        [
            0,
            0,
            -1
        ], 
    ];
    const uvCoords = [
        [
            1,
            0
        ],
        [
            0,
            0
        ],
        [
            0,
            1
        ],
        [
            1,
            1
        ], 
    ];
    const numVertices = 24;
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    const indices = createAugmentedTypedArray(3, 12, Uint16Array);
    for(let f = 0; f < 6; ++f){
        const faceIndices = CUBE_FACE_INDICES[f];
        for(let v = 0; v < 4; ++v){
            const position = cornerVertices[faceIndices[v]];
            const normal = faceNormals[f];
            const uv = uvCoords[v];
            // Each face needs all four vertices because the normals and texture
            // coordinates are not all the same.
            positions.push(position);
            normals.push(normal);
            texcoords.push(uv);
        }
        // Two triangles make a square face.
        const offset = 4 * f;
        indices.push(offset + 0, offset + 1, offset + 2);
        indices.push(offset + 0, offset + 2, offset + 3);
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Creates a BufferInfo for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created cone BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBufferInfo
 */ /**
 * Creates buffers for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, WebGLBuffer>} The created cone buffers.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBuffers
 */ /**
 * Creates vertices for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis. .
 *
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, TypedArray>} The created cone vertices.
 * @memberOf module:twgl/primitives
 */ function createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
    if (radialSubdivisions < 3) throw new Error('radialSubdivisions must be 3 or greater');
    if (verticalSubdivisions < 1) throw new Error('verticalSubdivisions must be 1 or greater');
    const topCap = opt_topCap === undefined ? true : opt_topCap;
    const bottomCap = opt_bottomCap === undefined ? true : opt_bottomCap;
    const extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
    const numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    const indices = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);
    const vertsAroundEdge = radialSubdivisions + 1;
    // The slant of the cone is constant across its surface
    const slant = Math.atan2(bottomRadius - topRadius, height);
    const cosSlant = Math.cos(slant);
    const sinSlant = Math.sin(slant);
    const start = topCap ? -2 : 0;
    const end = verticalSubdivisions + (bottomCap ? 2 : 0);
    for(let yy = start; yy <= end; ++yy){
        let v = yy / verticalSubdivisions;
        let y = height * v;
        let ringRadius;
        if (yy < 0) {
            y = 0;
            v = 1;
            ringRadius = bottomRadius;
        } else if (yy > verticalSubdivisions) {
            y = height;
            v = 1;
            ringRadius = topRadius;
        } else ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
        if (yy === -2 || yy === verticalSubdivisions + 2) {
            ringRadius = 0;
            v = 0;
        }
        y -= height / 2;
        for(let ii = 0; ii < vertsAroundEdge; ++ii){
            const sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
            const cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
            positions.push(sin * ringRadius, y, cos * ringRadius);
            if (yy < 0) normals.push(0, -1, 0);
            else if (yy > verticalSubdivisions) normals.push(0, 1, 0);
            else if (ringRadius === 0) normals.push(0, 0, 0);
            else normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
            texcoords.push(ii / radialSubdivisions, 1 - v);
        }
    }
    for(let yy1 = 0; yy1 < verticalSubdivisions + extra; ++yy1){
        if (yy1 === 1 && topCap || yy1 === verticalSubdivisions + extra - 2 && bottomCap) continue;
        for(let ii = 0; ii < radialSubdivisions; ++ii){
            indices.push(vertsAroundEdge * (yy1 + 0) + 0 + ii, vertsAroundEdge * (yy1 + 0) + 1 + ii, vertsAroundEdge * (yy1 + 1) + 1 + ii);
            indices.push(vertsAroundEdge * (yy1 + 0) + 0 + ii, vertsAroundEdge * (yy1 + 1) + 1 + ii, vertsAroundEdge * (yy1 + 1) + 0 + ii);
        }
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Expands RLE data
 * @param {number[]} rleData data in format of run-length, x, y, z, run-length, x, y, z
 * @param {number[]} [padding] value to add each entry with.
 * @return {number[]} the expanded rleData
 * @private
 */ function expandRLEData(rleData, padding) {
    padding = padding || [];
    const data = [];
    for(let ii = 0; ii < rleData.length; ii += 4){
        const runLength = rleData[ii];
        const element = rleData.slice(ii + 1, ii + 4);
        element.push.apply(element, padding);
        for(let jj = 0; jj < runLength; ++jj)data.push.apply(data, element);
    }
    return data;
}
/**
 * Creates 3D 'F' BufferInfo.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function create3DFBufferInfo
 */ /**
 * Creates 3D 'F' buffers.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function create3DFBuffers
 */ /**
 * Creates 3D 'F' vertices.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color arrays.
 *
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function create3DFVertices() {
    const positions = [
        // left column front
        0,
        0,
        0,
        0,
        150,
        0,
        30,
        0,
        0,
        0,
        150,
        0,
        30,
        150,
        0,
        30,
        0,
        0,
        // top rung front
        30,
        0,
        0,
        30,
        30,
        0,
        100,
        0,
        0,
        30,
        30,
        0,
        100,
        30,
        0,
        100,
        0,
        0,
        // middle rung front
        30,
        60,
        0,
        30,
        90,
        0,
        67,
        60,
        0,
        30,
        90,
        0,
        67,
        90,
        0,
        67,
        60,
        0,
        // left column back
        0,
        0,
        30,
        30,
        0,
        30,
        0,
        150,
        30,
        0,
        150,
        30,
        30,
        0,
        30,
        30,
        150,
        30,
        // top rung back
        30,
        0,
        30,
        100,
        0,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        100,
        0,
        30,
        100,
        30,
        30,
        // middle rung back
        30,
        60,
        30,
        67,
        60,
        30,
        30,
        90,
        30,
        30,
        90,
        30,
        67,
        60,
        30,
        67,
        90,
        30,
        // top
        0,
        0,
        0,
        100,
        0,
        0,
        100,
        0,
        30,
        0,
        0,
        0,
        100,
        0,
        30,
        0,
        0,
        30,
        // top rung front
        100,
        0,
        0,
        100,
        30,
        0,
        100,
        30,
        30,
        100,
        0,
        0,
        100,
        30,
        30,
        100,
        0,
        30,
        // under top rung
        30,
        30,
        0,
        30,
        30,
        30,
        100,
        30,
        30,
        30,
        30,
        0,
        100,
        30,
        30,
        100,
        30,
        0,
        // between top rung and middle
        30,
        30,
        0,
        30,
        60,
        30,
        30,
        30,
        30,
        30,
        30,
        0,
        30,
        60,
        0,
        30,
        60,
        30,
        // top of middle rung
        30,
        60,
        0,
        67,
        60,
        30,
        30,
        60,
        30,
        30,
        60,
        0,
        67,
        60,
        0,
        67,
        60,
        30,
        // front of middle rung
        67,
        60,
        0,
        67,
        90,
        30,
        67,
        60,
        30,
        67,
        60,
        0,
        67,
        90,
        0,
        67,
        90,
        30,
        // bottom of middle rung.
        30,
        90,
        0,
        30,
        90,
        30,
        67,
        90,
        30,
        30,
        90,
        0,
        67,
        90,
        30,
        67,
        90,
        0,
        // front of bottom
        30,
        90,
        0,
        30,
        150,
        30,
        30,
        90,
        30,
        30,
        90,
        0,
        30,
        150,
        0,
        30,
        150,
        30,
        // bottom
        0,
        150,
        0,
        0,
        150,
        30,
        30,
        150,
        30,
        0,
        150,
        0,
        30,
        150,
        30,
        30,
        150,
        0,
        // left side
        0,
        0,
        0,
        0,
        0,
        30,
        0,
        150,
        30,
        0,
        0,
        0,
        0,
        150,
        30,
        0,
        150,
        0, 
    ];
    const texcoords = [
        // left column front
        0.22,
        0.19,
        0.22,
        0.79,
        0.34,
        0.19,
        0.22,
        0.79,
        0.34,
        0.79,
        0.34,
        0.19,
        // top rung front
        0.34,
        0.19,
        0.34,
        0.31,
        0.62,
        0.19,
        0.34,
        0.31,
        0.62,
        0.31,
        0.62,
        0.19,
        // middle rung front
        0.34,
        0.43,
        0.34,
        0.55,
        0.49,
        0.43,
        0.34,
        0.55,
        0.49,
        0.55,
        0.49,
        0.43,
        // left column back
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        // top rung back
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        // middle rung back
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        // top
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        // top rung front
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        // under top rung
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        // between top rung and middle
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // top of middle rung
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // front of middle rung
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // bottom of middle rung.
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        // front of bottom
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        // bottom
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        // left side
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0, 
    ];
    const normals = expandRLEData([
        // left column front
        // top rung front
        // middle rung front
        18,
        0,
        0,
        1,
        // left column back
        // top rung back
        // middle rung back
        18,
        0,
        0,
        -1,
        // top
        6,
        0,
        1,
        0,
        // top rung front
        6,
        1,
        0,
        0,
        // under top rung
        6,
        0,
        -1,
        0,
        // between top rung and middle
        6,
        1,
        0,
        0,
        // top of middle rung
        6,
        0,
        1,
        0,
        // front of middle rung
        6,
        1,
        0,
        0,
        // bottom of middle rung.
        6,
        0,
        -1,
        0,
        // front of bottom
        6,
        1,
        0,
        0,
        // bottom
        6,
        0,
        -1,
        0,
        // left side
        6,
        -1,
        0,
        0, 
    ]);
    const colors = expandRLEData([
        // left column front
        // top rung front
        // middle rung front
        18,
        200,
        70,
        120,
        // left column back
        // top rung back
        // middle rung back
        18,
        80,
        70,
        200,
        // top
        6,
        70,
        200,
        210,
        // top rung front
        6,
        200,
        200,
        70,
        // under top rung
        6,
        210,
        100,
        70,
        // between top rung and middle
        6,
        210,
        160,
        70,
        // top of middle rung
        6,
        70,
        180,
        210,
        // front of middle rung
        6,
        100,
        70,
        210,
        // bottom of middle rung.
        6,
        76,
        210,
        100,
        // front of bottom
        6,
        140,
        210,
        80,
        // bottom
        6,
        90,
        130,
        110,
        // left side
        6,
        160,
        160,
        220, 
    ], [
        255
    ]);
    const numVerts = positions.length / 3;
    const arrays = {
        position: createAugmentedTypedArray(3, numVerts),
        texcoord: createAugmentedTypedArray(2, numVerts),
        normal: createAugmentedTypedArray(3, numVerts),
        color: createAugmentedTypedArray(4, numVerts, Uint8Array),
        indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
    };
    arrays.position.push(positions);
    arrays.texcoord.push(texcoords);
    arrays.normal.push(normals);
    arrays.color.push(colors);
    for(let ii = 0; ii < numVerts; ++ii)arrays.indices.push(ii);
    return arrays;
}
/**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCresentBufferInfo
 */ /**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */ /**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */ /**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCrescentBufferInfo
 */ /**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCrescentBuffers
 */ /**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function createCrescentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
    if (subdivisionsDown <= 0) throw new Error('subdivisionDown must be > 0');
    startOffset = startOffset || 0;
    endOffset = endOffset || 1;
    const subdivisionsThick = 2;
    const offsetRange = endOffset - startOffset;
    const numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    function lerp1(a, b, s) {
        return a + (b - a) * s;
    }
    function createArc(arcRadius, x, normalMult, normalAdd, uMult, uAdd) {
        for(let z = 0; z <= subdivisionsDown; z++){
            const uBack = x / (subdivisionsThick - 1);
            const v = z / subdivisionsDown;
            const xBack = (uBack - 0.5) * 2;
            const angle = (startOffset + v * offsetRange) * Math.PI;
            const s = Math.sin(angle);
            const c = Math.cos(angle);
            const radius = lerp1(verticalRadius, arcRadius, s);
            const px = xBack * thickness;
            const py = c * verticalRadius;
            const pz = s * radius;
            positions.push(px, py, pz);
            const n = add(multiply([
                0,
                s,
                c
            ], normalMult), normalAdd);
            normals.push(n);
            texcoords.push(uBack * uMult + uAdd, v);
        }
    }
    // Generate the individual vertices in our vertex buffer.
    for(let x3 = 0; x3 < subdivisionsThick; x3++){
        const uBack = (x3 / (subdivisionsThick - 1) - 0.5) * 2;
        createArc(outerRadius, x3, [
            1,
            1,
            1
        ], [
            0,
            0,
            0
        ], 1, 0);
        createArc(outerRadius, x3, [
            0,
            0,
            0
        ], [
            uBack,
            0,
            0
        ], 0, 0);
        createArc(innerRadius, x3, [
            1,
            1,
            1
        ], [
            0,
            0,
            0
        ], 1, 0);
        createArc(innerRadius, x3, [
            0,
            0,
            0
        ], [
            uBack,
            0,
            0
        ], 0, 1);
    }
    // Do outer surface.
    const indices = createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
    function createSurface(leftArcOffset, rightArcOffset) {
        for(let z = 0; z < subdivisionsDown; ++z){
            // Make triangle 1 of quad.
            indices.push(leftArcOffset + z + 0, leftArcOffset + z + 1, rightArcOffset + z + 0);
            // Make triangle 2 of quad.
            indices.push(leftArcOffset + z + 1, rightArcOffset + z + 1, rightArcOffset + z + 0);
        }
    }
    const numVerticesDown = subdivisionsDown + 1;
    // front
    createSurface(numVerticesDown * 0, numVerticesDown * 4);
    // right
    createSurface(numVerticesDown * 5, numVerticesDown * 7);
    // back
    createSurface(numVerticesDown * 6, numVerticesDown * 2);
    // left
    createSurface(numVerticesDown * 3, numVerticesDown * 1);
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Creates cylinder BufferInfo. The cylinder will be created around the origin
 * along the y-axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of cylinder.
 * @param {number} height Height of cylinder.
 * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
 * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
 * @param {boolean} [topCap] Create top cap. Default = true.
 * @param {boolean} [bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCylinderBufferInfo
 */ /**
  * Creates cylinder buffers. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, WebGLBuffer>} The created buffers.
  * @memberOf module:twgl/primitives
  * @function createCylinderBuffers
  */ /**
  * Creates cylinder vertices. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, TypedArray>} The created vertices.
  * @memberOf module:twgl/primitives
  */ function createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
    return createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
}
/**
 * Creates BufferInfo for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTorusBufferInfo
 */ /**
 * Creates buffers for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createTorusBuffers
 */ /**
 * Creates vertices for a torus
 *
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
    if (radialSubdivisions < 3) throw new Error('radialSubdivisions must be 3 or greater');
    if (bodySubdivisions < 3) throw new Error('verticalSubdivisions must be 3 or greater');
    startAngle = startAngle || 0;
    endAngle = endAngle || Math.PI * 2;
    const range = endAngle - startAngle;
    const radialParts = radialSubdivisions + 1;
    const bodyParts = bodySubdivisions + 1;
    const numVertices = radialParts * bodyParts;
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    const indices = createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
    for(let slice = 0; slice < bodyParts; ++slice){
        const v = slice / bodySubdivisions;
        const sliceAngle = v * Math.PI * 2;
        const sliceSin = Math.sin(sliceAngle);
        const ringRadius = radius + sliceSin * thickness;
        const ny = Math.cos(sliceAngle);
        const y = ny * thickness;
        for(let ring = 0; ring < radialParts; ++ring){
            const u = ring / radialSubdivisions;
            const ringAngle = startAngle + u * range;
            const xSin = Math.sin(ringAngle);
            const zCos = Math.cos(ringAngle);
            const x = xSin * ringRadius;
            const z = zCos * ringRadius;
            const nx = xSin * sliceSin;
            const nz = zCos * sliceSin;
            positions.push(x, y, z);
            normals.push(nx, ny, nz);
            texcoords.push(u, 1 - v);
        }
    }
    for(let slice1 = 0; slice1 < bodySubdivisions; ++slice1)for(let ring = 0; ring < radialSubdivisions; ++ring){
        const nextRingIndex = 1 + ring;
        const nextSliceIndex = 1 + slice1;
        indices.push(radialParts * slice1 + ring, radialParts * nextSliceIndex + ring, radialParts * slice1 + nextRingIndex);
        indices.push(radialParts * nextSliceIndex + ring, radialParts * nextSliceIndex + nextRingIndex, radialParts * slice1 + nextRingIndex);
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * Creates a disc BufferInfo. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createDiscBufferInfo
 */ /**
 * Creates disc buffers. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createDiscBuffers
 */ /**
 * Creates disc vertices. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */ function createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
    if (divisions < 3) throw new Error('divisions must be at least 3');
    stacks = stacks ? stacks : 1;
    stackPower = stackPower ? stackPower : 1;
    innerRadius = innerRadius ? innerRadius : 0;
    // Note: We don't share the center vertex because that would
    // mess up texture coordinates.
    const numVertices = (divisions + 1) * (stacks + 1);
    const positions = createAugmentedTypedArray(3, numVertices);
    const normals = createAugmentedTypedArray(3, numVertices);
    const texcoords = createAugmentedTypedArray(2, numVertices);
    const indices = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
    let firstIndex = 0;
    const radiusSpan = radius - innerRadius;
    const pointsPerStack = divisions + 1;
    // Build the disk one stack at a time.
    for(let stack = 0; stack <= stacks; ++stack){
        const stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
        for(let i = 0; i <= divisions; ++i){
            const theta = 2 * Math.PI * i / divisions;
            const x = stackRadius * Math.cos(theta);
            const z = stackRadius * Math.sin(theta);
            positions.push(x, 0, z);
            normals.push(0, 1, 0);
            texcoords.push(1 - i / divisions, stack / stacks);
            if (stack > 0 && i !== divisions) {
                // a, b, c and d are the indices of the vertices of a quad.  unless
                // the current stack is the one closest to the center, in which case
                // the vertices a and b connect to the center vertex.
                const a = firstIndex + (i + 1);
                const b = firstIndex + i;
                const c = firstIndex + i - pointsPerStack;
                const d = firstIndex + (i + 1) - pointsPerStack;
                // Make a quad of the vertices a, b, c, d.
                indices.push(a, b, c);
                indices.push(a, c, d);
            }
        }
        firstIndex += divisions + 1;
    }
    return {
        position: positions,
        normal: normals,
        texcoord: texcoords,
        indices: indices
    };
}
/**
 * creates a random integer between 0 and range - 1 inclusive.
 * @param {number} range
 * @return {number} random value between 0 and range - 1 inclusive.
 * @private
 */ function randInt(range) {
    return Math.random() * range | 0;
}
/**
 * Used to supply random colors
 * @callback RandomColorFunc
 * @param {number} ndx index of triangle/quad if unindexed or index of vertex if indexed
 * @param {number} channel 0 = red, 1 = green, 2 = blue, 3 = alpha
 * @return {number} a number from 0 to 255
 * @memberOf module:twgl/primitives
 */ /**
 * @typedef {Object} RandomVerticesOptions
 * @property {number} [vertsPerColor] Defaults to 3 for non-indexed vertices
 * @property {module:twgl/primitives.RandomColorFunc} [rand] A function to generate random numbers
 * @memberOf module:twgl/primitives
 */ /**
 * Creates an augmentedTypedArray of random vertex colors.
 * If the vertices are indexed (have an indices array) then will
 * just make random colors. Otherwise assumes they are triangles
 * and makes one random color for every 3 vertices.
 * @param {Object.<string, AugmentedTypedArray>} vertices Vertices as returned from one of the createXXXVertices functions.
 * @param {module:twgl/primitives.RandomVerticesOptions} [options] options.
 * @return {Object.<string, AugmentedTypedArray>} same vertices as passed in with `color` added.
 * @memberOf module:twgl/primitives
 */ function makeRandomVertexColors(vertices, options) {
    options = options || {
    };
    const numElements = vertices.position.numElements;
    const vColors = createAugmentedTypedArray(4, numElements, Uint8Array);
    const rand = options.rand || function(ndx, channel) {
        return channel < 3 ? randInt(256) : 255;
    };
    vertices.color = vColors;
    if (vertices.indices) // just make random colors if index
    for(let ii = 0; ii < numElements; ++ii)vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
    else {
        // make random colors per triangle
        const numVertsPerColor = options.vertsPerColor || 3;
        const numSets = numElements / numVertsPerColor;
        for(let ii = 0; ii < numSets; ++ii){
            const color = [
                rand(ii, 0),
                rand(ii, 1),
                rand(ii, 2),
                rand(ii, 3)
            ];
            for(let jj = 0; jj < numVertsPerColor; ++jj)vColors.push(color);
        }
    }
    return vertices;
}
/**
 * creates a function that calls fn to create vertices and then
 * creates a buffers for them
 * @private
 */ function createBufferFunc(fn) {
    return function(gl) {
        const arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
        return createBuffersFromArrays(gl, arrays);
    };
}
/**
 * creates a function that calls fn to create vertices and then
 * creates a bufferInfo object for them
 * @private
 */ function createBufferInfoFunc(fn) {
    return function(gl) {
        const arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
        return createBufferInfoFromArrays(gl, arrays);
    };
}
const arraySpecPropertyNames = [
    "numComponents",
    "size",
    "type",
    "normalize",
    "stride",
    "offset",
    "attrib",
    "name",
    "attribName", 
];
/**
 * Copy elements from one array to another
 *
 * @param {Array|TypedArray} src source array
 * @param {Array|TypedArray} dst dest array
 * @param {number} dstNdx index in dest to copy src
 * @param {number} [offset] offset to add to copied values
 * @private
 */ function copyElements(src, dst, dstNdx, offset) {
    offset = offset || 0;
    const length = src.length;
    for(let ii = 0; ii < length; ++ii)dst[dstNdx + ii] = src[ii] + offset;
}
/**
 * Creates an array of the same time
 *
 * @param {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} srcArray array who's type to copy
 * @param {number} length size of new array
 * @return {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} array with same type as srcArray
 * @private
 */ function createArrayOfSameType(srcArray, length) {
    const arraySrc = getArray$1(srcArray);
    const newArray = new arraySrc.constructor(length);
    let newArraySpec = newArray;
    // If it appears to have been augmented make new one augmented
    if (arraySrc.numComponents && arraySrc.numElements) augmentTypedArray(newArray, arraySrc.numComponents);
    // If it was a full spec make new one a full spec
    if (srcArray.data) {
        newArraySpec = {
            data: newArray
        };
        copyNamedProperties(arraySpecPropertyNames, srcArray, newArraySpec);
    }
    return newArraySpec;
}
/**
 * Concatenates sets of vertices
 *
 * Assumes the vertices match in composition. For example
 * if one set of vertices has positions, normals, and indices
 * all sets of vertices must have positions, normals, and indices
 * and of the same type.
 *
 * Example:
 *
 *      const cubeVertices = twgl.primitives.createCubeVertices(2);
 *      const sphereVertices = twgl.primitives.createSphereVertices(1, 10, 10);
 *      // move the sphere 2 units up
 *      twgl.primitives.reorientVertices(
 *          sphereVertices, twgl.m4.translation([0, 2, 0]));
 *      // merge the sphere with the cube
 *      const cubeSphereVertices = twgl.primitives.concatVertices(
 *          [cubeVertices, sphereVertices]);
 *      // turn them into WebGL buffers and attrib data
 *      const bufferInfo = twgl.createBufferInfoFromArrays(gl, cubeSphereVertices);
 *
 * @param {module:twgl.Arrays[]} arrays Array of arrays of vertices
 * @return {module:twgl.Arrays} The concatenated vertices.
 * @memberOf module:twgl/primitives
 */ function concatVertices(arrayOfArrays) {
    const names = {
    };
    let baseName;
    // get names of all arrays.
    // and numElements for each set of vertices
    for(let ii1 = 0; ii1 < arrayOfArrays.length; ++ii1){
        const arrays = arrayOfArrays[ii1];
        Object.keys(arrays).forEach(function(name) {
            if (!names[name]) names[name] = [];
            if (!baseName && name !== 'indices') baseName = name;
            const arrayInfo = arrays[name];
            const numComponents = getNumComponents$1(arrayInfo, name);
            const array = getArray$1(arrayInfo);
            const numElements = array.length / numComponents;
            names[name].push(numElements);
        });
    }
    // compute length of combined array
    // and return one for reference
    function getLengthOfCombinedArrays(name) {
        let length = 0;
        let arraySpec;
        for(let ii = 0; ii < arrayOfArrays.length; ++ii){
            const arrays = arrayOfArrays[ii];
            const arrayInfo = arrays[name];
            const array = getArray$1(arrayInfo);
            length += array.length;
            if (!arraySpec || arrayInfo.data) arraySpec = arrayInfo;
        }
        return {
            length: length,
            spec: arraySpec
        };
    }
    function copyArraysToNewArray(name, base, newArray) {
        let baseIndex = 0;
        let offset = 0;
        for(let ii = 0; ii < arrayOfArrays.length; ++ii){
            const arrays = arrayOfArrays[ii];
            const arrayInfo = arrays[name];
            const array = getArray$1(arrayInfo);
            if (name === 'indices') {
                copyElements(array, newArray, offset, baseIndex);
                baseIndex += base[ii];
            } else copyElements(array, newArray, offset);
            offset += array.length;
        }
    }
    const base1 = names[baseName];
    const newArrays = {
    };
    Object.keys(names).forEach(function(name) {
        const info = getLengthOfCombinedArrays(name);
        const newArraySpec = createArrayOfSameType(info.spec, info.length);
        copyArraysToNewArray(name, base1, getArray$1(newArraySpec));
        newArrays[name] = newArraySpec;
    });
    return newArrays;
}
/**
 * Creates a duplicate set of vertices
 *
 * This is useful for calling reorientVertices when you
 * also want to keep the original available
 *
 * @param {module:twgl.Arrays} arrays of vertices
 * @return {module:twgl.Arrays} The duplicated vertices.
 * @memberOf module:twgl/primitives
 */ function duplicateVertices(arrays) {
    const newArrays = {
    };
    Object.keys(arrays).forEach(function(name) {
        const arraySpec = arrays[name];
        const srcArray = getArray$1(arraySpec);
        const newArraySpec = createArrayOfSameType(arraySpec, srcArray.length);
        copyElements(srcArray, getArray$1(newArraySpec), 0);
        newArrays[name] = newArraySpec;
    });
    return newArrays;
}
const create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
const create3DFBuffers = createBufferFunc(create3DFVertices);
const createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
const createCubeBuffers = createBufferFunc(createCubeVertices);
const createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
const createPlaneBuffers = createBufferFunc(createPlaneVertices);
const createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
const createSphereBuffers = createBufferFunc(createSphereVertices);
const createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
const createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
const createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
const createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
const createCrescentBufferInfo = createBufferInfoFunc(createCrescentVertices);
const createCrescentBuffers = createBufferFunc(createCrescentVertices);
const createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
const createCylinderBuffers = createBufferFunc(createCylinderVertices);
const createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
const createTorusBuffers = createBufferFunc(createTorusVertices);
const createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
const createDiscBuffers = createBufferFunc(createDiscVertices);
// these were mis-spelled until 4.12
const createCresentBufferInfo = createCrescentBufferInfo;
const createCresentBuffers = createCrescentBuffers;
const createCresentVertices = createCrescentVertices;
var primitives = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create3DFBufferInfo: create3DFBufferInfo,
    create3DFBuffers: create3DFBuffers,
    create3DFVertices: create3DFVertices,
    createAugmentedTypedArray: createAugmentedTypedArray,
    createCubeBufferInfo: createCubeBufferInfo,
    createCubeBuffers: createCubeBuffers,
    createCubeVertices: createCubeVertices,
    createPlaneBufferInfo: createPlaneBufferInfo,
    createPlaneBuffers: createPlaneBuffers,
    createPlaneVertices: createPlaneVertices,
    createSphereBufferInfo: createSphereBufferInfo,
    createSphereBuffers: createSphereBuffers,
    createSphereVertices: createSphereVertices,
    createTruncatedConeBufferInfo: createTruncatedConeBufferInfo,
    createTruncatedConeBuffers: createTruncatedConeBuffers,
    createTruncatedConeVertices: createTruncatedConeVertices,
    createXYQuadBufferInfo: createXYQuadBufferInfo,
    createXYQuadBuffers: createXYQuadBuffers,
    createXYQuadVertices: createXYQuadVertices,
    createCresentBufferInfo: createCresentBufferInfo,
    createCresentBuffers: createCresentBuffers,
    createCresentVertices: createCresentVertices,
    createCrescentBufferInfo: createCrescentBufferInfo,
    createCrescentBuffers: createCrescentBuffers,
    createCrescentVertices: createCrescentVertices,
    createCylinderBufferInfo: createCylinderBufferInfo,
    createCylinderBuffers: createCylinderBuffers,
    createCylinderVertices: createCylinderVertices,
    createTorusBufferInfo: createTorusBufferInfo,
    createTorusBuffers: createTorusBuffers,
    createTorusVertices: createTorusVertices,
    createDiscBufferInfo: createDiscBufferInfo,
    createDiscBuffers: createDiscBuffers,
    createDiscVertices: createDiscVertices,
    deindexVertices: deindexVertices,
    flattenNormals: flattenNormals,
    makeRandomVertexColors: makeRandomVertexColors,
    reorientDirections: reorientDirections,
    reorientNormals: reorientNormals,
    reorientPositions: reorientPositions,
    reorientVertices: reorientVertices,
    concatVertices: concatVertices,
    duplicateVertices: duplicateVertices
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * Gets the gl version as a number
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {number} version of gl
 * @private
 */ //function getVersionAsNumber(gl) {
//  return parseFloat(gl.getParameter(gl.VERSION).substr(6));
//}
/**
 * Check if context is WebGL 2.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 2.0
 * @memberOf module:twgl
 */ function isWebGL2(gl) {
    // This is the correct check but it's slow
    //  return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
    // This might also be the correct check but I'm assuming it's slow-ish
    // return gl instanceof WebGL2RenderingContext;
    return !!gl.texStorage2D;
}
/**
 * Check if context is WebGL 1.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 1.0
 * @memberOf module:twgl
 */ function isWebGL1(gl) {
    // This is the correct check but it's slow
    // const version = getVersionAsNumber(gl);
    // return version <= 1.0 && version > 0.0;  // because as of 2016/5 Edge returns 0.96
    // This might also be the correct check but I'm assuming it's slow-ish
    // return gl instanceof WebGLRenderingContext;
    return !gl.texStorage2D;
}
/**
 * Gets a string for WebGL enum
 *
 * Note: Several enums are the same. Without more
 * context (which function) it's impossible to always
 * give the correct enum. As it is, for matching values
 * it gives all enums. Checking the WebGL2RenderingContext
 * that means
 *
 *      0     = ZERO | POINT | NONE | NO_ERROR
 *      1     = ONE | LINES | SYNC_FLUSH_COMMANDS_BIT
 *      32777 = BLEND_EQUATION_RGB | BLEND_EQUATION_RGB
 *      36662 = COPY_READ_BUFFER | COPY_READ_BUFFER_BINDING
 *      36663 = COPY_WRITE_BUFFER | COPY_WRITE_BUFFER_BINDING
 *      36006 = FRAMEBUFFER_BINDING | DRAW_FRAMEBUFFER_BINDING
 *
 * It's also not useful for bits really unless you pass in individual bits.
 * In other words
 *
 *     const bits = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
 *     twgl.glEnumToString(gl, bits);  // not going to work
 *
 * Note that some enums only exist on extensions. If you
 * want them to show up you need to pass the extension at least
 * once. For example
 *
 *     const ext = gl.getExtension('WEBGL_compressed_texture_s3tc');
 *     if (ext) {
 *        twgl.glEnumToString(ext, 0);  // just prime the function
 *
 *        ..later..
 *
 *        const internalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
 *        console.log(twgl.glEnumToString(gl, internalFormat));
 *
 * Notice I didn't have to pass the extension the second time. This means
 * you can have place that generically gets an enum for texture formats for example.
 * and as long as you primed the function with the extensions
 *
 * If you're using `twgl.addExtensionsToContext` to enable your extensions
 * then twgl will automatically get the extension's enums.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext or any extension object
 * @param {number} value the value of the enum you want to look up.
 * @return {string} enum string or hex value
 * @memberOf module:twgl
 * @function glEnumToString
 */ const glEnumToString = function() {
    const haveEnumsForType = {
    };
    const enums = {
    };
    function addEnums(gl) {
        const type = gl.constructor.name;
        if (!haveEnumsForType[type]) {
            for(const key in gl)if (typeof gl[key] === 'number') {
                const existing = enums[gl[key]];
                enums[gl[key]] = existing ? `${existing} | ${key}` : key;
            }
            haveEnumsForType[type] = true;
        }
    }
    return function glEnumToString(gl, value) {
        addEnums(gl);
        return enums[value] || (typeof value === 'number' ? `0x${value.toString(16)}` : value);
    };
}();
var utils = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    glEnumToString: glEnumToString,
    isWebGL1: isWebGL1,
    isWebGL2: isWebGL2
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const defaults$1 = {
    textureColor: new Uint8Array([
        128,
        192,
        255,
        255
    ]),
    textureOptions: {
    },
    crossOrigin: undefined
};
const isArrayBuffer$1 = isArrayBuffer;
// Should we make this on demand?
const getShared2DContext = function() {
    let s_ctx;
    return function getShared2DContext() {
        s_ctx = s_ctx || (typeof document !== 'undefined' && document.createElement ? document.createElement("canvas").getContext("2d") : null);
        return s_ctx;
    };
}();
// NOTE: Chrome supports 2D canvas in a Worker (behind flag as of v64 but
//       not only does Firefox NOT support it but Firefox freezes immediately
//       if you try to create one instead of just returning null and continuing.
//  : (global.OffscreenCanvas && (new global.OffscreenCanvas(1, 1)).getContext("2d"));  // OffscreenCanvas may not support 2d
// NOTE: We can maybe remove some of the need for the 2d canvas. In WebGL2
// we can use the various unpack settings. Otherwise we could try using
// the ability of an ImageBitmap to be cut. Unfortunately cutting an ImageBitmap
// is async and the current TWGL code expects a non-Async result though that
// might not be a problem. ImageBitmap though is not available in Edge or Safari
// as of 2018-01-02
/* PixelFormat */ const ALPHA = 6406;
const RGB = 6407;
const RGBA = 6408;
const LUMINANCE = 6409;
const LUMINANCE_ALPHA = 6410;
const DEPTH_COMPONENT = 6402;
const DEPTH_STENCIL = 34041;
/* TextureWrapMode */ // const REPEAT                         = 0x2901;
// const MIRRORED_REPEAT                = 0x8370;
const CLAMP_TO_EDGE = 33071;
/* TextureMagFilter */ const NEAREST = 9728;
const LINEAR = 9729;
/* TextureMinFilter */ // const NEAREST_MIPMAP_NEAREST         = 0x2700;
// const LINEAR_MIPMAP_NEAREST          = 0x2701;
// const NEAREST_MIPMAP_LINEAR          = 0x2702;
// const LINEAR_MIPMAP_LINEAR           = 0x2703;
/* Texture Target */ const TEXTURE_2D = 3553;
const TEXTURE_CUBE_MAP = 34067;
const TEXTURE_3D = 32879;
const TEXTURE_2D_ARRAY = 35866;
/* Cubemap Targets */ const TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
const TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
const TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
const TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
const TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
const TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
/* Texture Parameters */ const TEXTURE_MIN_FILTER = 10241;
const TEXTURE_MAG_FILTER = 10240;
const TEXTURE_WRAP_S = 10242;
const TEXTURE_WRAP_T = 10243;
const TEXTURE_WRAP_R = 32882;
const TEXTURE_MIN_LOD = 33082;
const TEXTURE_MAX_LOD = 33083;
const TEXTURE_BASE_LEVEL = 33084;
const TEXTURE_MAX_LEVEL = 33085;
/* Pixel store */ const UNPACK_ALIGNMENT = 3317;
const UNPACK_ROW_LENGTH = 3314;
const UNPACK_IMAGE_HEIGHT = 32878;
const UNPACK_SKIP_PIXELS = 3316;
const UNPACK_SKIP_ROWS = 3315;
const UNPACK_SKIP_IMAGES = 32877;
const UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
const UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
const UNPACK_FLIP_Y_WEBGL = 37440;
const R8 = 33321;
const R8_SNORM = 36756;
const R16F = 33325;
const R32F = 33326;
const R8UI = 33330;
const R8I = 33329;
const RG16UI = 33338;
const RG16I = 33337;
const RG32UI = 33340;
const RG32I = 33339;
const RG8 = 33323;
const RG8_SNORM = 36757;
const RG16F = 33327;
const RG32F = 33328;
const RG8UI = 33336;
const RG8I = 33335;
const R16UI = 33332;
const R16I = 33331;
const R32UI = 33334;
const R32I = 33333;
const RGB8 = 32849;
const SRGB8 = 35905;
const RGB565 = 36194;
const RGB8_SNORM = 36758;
const R11F_G11F_B10F = 35898;
const RGB9_E5 = 35901;
const RGB16F = 34843;
const RGB32F = 34837;
const RGB8UI = 36221;
const RGB8I = 36239;
const RGB16UI = 36215;
const RGB16I = 36233;
const RGB32UI = 36209;
const RGB32I = 36227;
const RGBA8 = 32856;
const SRGB8_ALPHA8 = 35907;
const RGBA8_SNORM = 36759;
const RGB5_A1 = 32855;
const RGBA4 = 32854;
const RGB10_A2 = 32857;
const RGBA16F = 34842;
const RGBA32F = 34836;
const RGBA8UI = 36220;
const RGBA8I = 36238;
const RGB10_A2UI = 36975;
const RGBA16UI = 36214;
const RGBA16I = 36232;
const RGBA32I = 36226;
const RGBA32UI = 36208;
const DEPTH_COMPONENT16 = 33189;
const DEPTH_COMPONENT24 = 33190;
const DEPTH_COMPONENT32F = 36012;
const DEPTH32F_STENCIL8 = 36013;
const DEPTH24_STENCIL8 = 35056;
/* DataType */ const BYTE$2 = 5120;
const UNSIGNED_BYTE$2 = 5121;
const SHORT$2 = 5122;
const UNSIGNED_SHORT$2 = 5123;
const INT$2 = 5124;
const UNSIGNED_INT$2 = 5125;
const FLOAT$2 = 5126;
const UNSIGNED_SHORT_4_4_4_4$1 = 32819;
const UNSIGNED_SHORT_5_5_5_1$1 = 32820;
const UNSIGNED_SHORT_5_6_5$1 = 33635;
const HALF_FLOAT$1 = 5131;
const HALF_FLOAT_OES = 36193; // Thanks Khronos for making this different >:(
const UNSIGNED_INT_2_10_10_10_REV$1 = 33640;
const UNSIGNED_INT_10F_11F_11F_REV$1 = 35899;
const UNSIGNED_INT_5_9_9_9_REV$1 = 35902;
const FLOAT_32_UNSIGNED_INT_24_8_REV$1 = 36269;
const UNSIGNED_INT_24_8$1 = 34042;
const RG = 33319;
const RG_INTEGER = 33320;
const RED = 6403;
const RED_INTEGER = 36244;
const RGB_INTEGER = 36248;
const RGBA_INTEGER = 36249;
const formatInfo = {
};
{
    // NOTE: this is named `numColorComponents` vs `numComponents` so we can let Uglify mangle
    // the name.
    const f = formatInfo;
    f[ALPHA] = {
        numColorComponents: 1
    };
    f[LUMINANCE] = {
        numColorComponents: 1
    };
    f[LUMINANCE_ALPHA] = {
        numColorComponents: 2
    };
    f[RGB] = {
        numColorComponents: 3
    };
    f[RGBA] = {
        numColorComponents: 4
    };
    f[RED] = {
        numColorComponents: 1
    };
    f[RED_INTEGER] = {
        numColorComponents: 1
    };
    f[RG] = {
        numColorComponents: 2
    };
    f[RG_INTEGER] = {
        numColorComponents: 2
    };
    f[RGB] = {
        numColorComponents: 3
    };
    f[RGB_INTEGER] = {
        numColorComponents: 3
    };
    f[RGBA] = {
        numColorComponents: 4
    };
    f[RGBA_INTEGER] = {
        numColorComponents: 4
    };
    f[DEPTH_COMPONENT] = {
        numColorComponents: 1
    };
    f[DEPTH_STENCIL] = {
        numColorComponents: 2
    };
}/**
 * @typedef {Object} TextureFormatDetails
 * @property {number} textureFormat format to pass texImage2D and similar functions.
 * @property {boolean} colorRenderable true if you can render to this format of texture.
 * @property {boolean} textureFilterable true if you can filter the texture, false if you can ony use `NEAREST`.
 * @property {number[]} type Array of possible types you can pass to texImage2D and similar function
 * @property {Object.<number,number>} bytesPerElementMap A map of types to bytes per element
 * @private
 */ let s_textureInternalFormatInfo;
function getTextureInternalFormatInfo(internalFormat) {
    if (!s_textureInternalFormatInfo) {
        // NOTE: these properties need unique names so we can let Uglify mangle the name.
        const t = {
        };
        // unsized formats
        t[ALPHA] = {
            textureFormat: ALPHA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                1,
                2,
                2,
                4
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2
            ]
        };
        t[LUMINANCE] = {
            textureFormat: LUMINANCE,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                1,
                2,
                2,
                4
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2
            ]
        };
        t[LUMINANCE_ALPHA] = {
            textureFormat: LUMINANCE_ALPHA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                2,
                4,
                4,
                8
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2
            ]
        };
        t[RGB] = {
            textureFormat: RGB,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                3,
                6,
                6,
                12,
                2
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2,
                UNSIGNED_SHORT_5_6_5$1
            ]
        };
        t[RGBA] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4,
                8,
                8,
                16,
                2,
                2
            ],
            type: [
                UNSIGNED_BYTE$2,
                HALF_FLOAT$1,
                HALF_FLOAT_OES,
                FLOAT$2,
                UNSIGNED_SHORT_4_4_4_4$1,
                UNSIGNED_SHORT_5_5_5_1$1
            ]
        };
        t[DEPTH_COMPONENT] = {
            textureFormat: DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2,
                4
            ],
            type: [
                UNSIGNED_INT$2,
                UNSIGNED_SHORT$2
            ]
        };
        // sized formats
        t[R8] = {
            textureFormat: RED,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                1
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[R8_SNORM] = {
            textureFormat: RED,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                1
            ],
            type: [
                BYTE$2
            ]
        };
        t[R16F] = {
            textureFormat: RED,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                4,
                2
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1
            ]
        };
        t[R32F] = {
            textureFormat: RED,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                FLOAT$2
            ]
        };
        t[R8UI] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                1
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[R8I] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                1
            ],
            type: [
                BYTE$2
            ]
        };
        t[R16UI] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                UNSIGNED_SHORT$2
            ]
        };
        t[R16I] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                SHORT$2
            ]
        };
        t[R32UI] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        t[R32I] = {
            textureFormat: RED_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                INT$2
            ]
        };
        t[RG8] = {
            textureFormat: RG,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                2
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RG8_SNORM] = {
            textureFormat: RG,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                2
            ],
            type: [
                BYTE$2
            ]
        };
        t[RG16F] = {
            textureFormat: RG,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                8,
                4
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1
            ]
        };
        t[RG32F] = {
            textureFormat: RG,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                FLOAT$2
            ]
        };
        t[RG8UI] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RG8I] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2
            ],
            type: [
                BYTE$2
            ]
        };
        t[RG16UI] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_SHORT$2
            ]
        };
        t[RG16I] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                SHORT$2
            ]
        };
        t[RG32UI] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        t[RG32I] = {
            textureFormat: RG_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                INT$2
            ]
        };
        t[RGB8] = {
            textureFormat: RGB,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                3
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[SRGB8] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                3
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RGB565] = {
            textureFormat: RGB,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                3,
                2
            ],
            type: [
                UNSIGNED_BYTE$2,
                UNSIGNED_SHORT_5_6_5$1
            ]
        };
        t[RGB8_SNORM] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                3
            ],
            type: [
                BYTE$2
            ]
        };
        t[R11F_G11F_B10F] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                12,
                6,
                4
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1,
                UNSIGNED_INT_10F_11F_11F_REV$1
            ]
        };
        t[RGB9_E5] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                12,
                6,
                4
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1,
                UNSIGNED_INT_5_9_9_9_REV$1
            ]
        };
        t[RGB16F] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                12,
                6
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1
            ]
        };
        t[RGB32F] = {
            textureFormat: RGB,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                12
            ],
            type: [
                FLOAT$2
            ]
        };
        t[RGB8UI] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                3
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RGB8I] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                3
            ],
            type: [
                BYTE$2
            ]
        };
        t[RGB16UI] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                6
            ],
            type: [
                UNSIGNED_SHORT$2
            ]
        };
        t[RGB16I] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                6
            ],
            type: [
                SHORT$2
            ]
        };
        t[RGB32UI] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                12
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        t[RGB32I] = {
            textureFormat: RGB_INTEGER,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                12
            ],
            type: [
                INT$2
            ]
        };
        t[RGBA8] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[SRGB8_ALPHA8] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RGBA8_SNORM] = {
            textureFormat: RGBA,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                BYTE$2
            ]
        };
        t[RGB5_A1] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4,
                2,
                4
            ],
            type: [
                UNSIGNED_BYTE$2,
                UNSIGNED_SHORT_5_5_5_1$1,
                UNSIGNED_INT_2_10_10_10_REV$1
            ]
        };
        t[RGBA4] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4,
                2
            ],
            type: [
                UNSIGNED_BYTE$2,
                UNSIGNED_SHORT_4_4_4_4$1
            ]
        };
        t[RGB10_A2] = {
            textureFormat: RGBA,
            colorRenderable: true,
            textureFilterable: true,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT_2_10_10_10_REV$1
            ]
        };
        t[RGBA16F] = {
            textureFormat: RGBA,
            colorRenderable: false,
            textureFilterable: true,
            bytesPerElement: [
                16,
                8
            ],
            type: [
                FLOAT$2,
                HALF_FLOAT$1
            ]
        };
        t[RGBA32F] = {
            textureFormat: RGBA,
            colorRenderable: false,
            textureFilterable: false,
            bytesPerElement: [
                16
            ],
            type: [
                FLOAT$2
            ]
        };
        t[RGBA8UI] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_BYTE$2
            ]
        };
        t[RGBA8I] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                BYTE$2
            ]
        };
        t[RGB10_A2UI] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT_2_10_10_10_REV$1
            ]
        };
        t[RGBA16UI] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                UNSIGNED_SHORT$2
            ]
        };
        t[RGBA16I] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                8
            ],
            type: [
                SHORT$2
            ]
        };
        t[RGBA32I] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                16
            ],
            type: [
                INT$2
            ]
        };
        t[RGBA32UI] = {
            textureFormat: RGBA_INTEGER,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                16
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        // Sized Internal
        t[DEPTH_COMPONENT16] = {
            textureFormat: DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                2,
                4
            ],
            type: [
                UNSIGNED_SHORT$2,
                UNSIGNED_INT$2
            ]
        };
        t[DEPTH_COMPONENT24] = {
            textureFormat: DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT$2
            ]
        };
        t[DEPTH_COMPONENT32F] = {
            textureFormat: DEPTH_COMPONENT,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                FLOAT$2
            ]
        };
        t[DEPTH24_STENCIL8] = {
            textureFormat: DEPTH_STENCIL,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                UNSIGNED_INT_24_8$1
            ]
        };
        t[DEPTH32F_STENCIL8] = {
            textureFormat: DEPTH_STENCIL,
            colorRenderable: true,
            textureFilterable: false,
            bytesPerElement: [
                4
            ],
            type: [
                FLOAT_32_UNSIGNED_INT_24_8_REV$1
            ]
        };
        Object.keys(t).forEach(function(internalFormat) {
            const info = t[internalFormat];
            info.bytesPerElementMap = {
            };
            info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
                const type = info.type[ndx];
                info.bytesPerElementMap[type] = bytesPerElement;
            });
        });
        s_textureInternalFormatInfo = t;
    }
    return s_textureInternalFormatInfo[internalFormat];
}
/**
 * Gets the number of bytes per element for a given internalFormat / type
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @param {number} type The type parameter for texImage2D etc..
 * @return {number} the number of bytes per element for the given internalFormat, type combo
 * @memberOf module:twgl/textures
 */ function getBytesPerElementForInternalFormat(internalFormat, type) {
    const info = getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    const bytesPerElement = info.bytesPerElementMap[type];
    if (bytesPerElement === undefined) throw "unknown internal format";
    return bytesPerElement;
}
/**
 * Info related to a specific texture internalFormat as returned
 * from {@link module:twgl/textures.getFormatAndTypeForInternalFormat}.
 *
 * @typedef {Object} TextureFormatInfo
 * @property {number} format Format to pass to texImage2D and related functions
 * @property {number} type Type to pass to texImage2D and related functions
 * @memberOf module:twgl/textures
 */ /**
 * Gets the format and type for a given internalFormat
 *
 * @param {number} internalFormat The internal format
 * @return {module:twgl/textures.TextureFormatInfo} the corresponding format and type,
 * @memberOf module:twgl/textures
 */ function getFormatAndTypeForInternalFormat(internalFormat) {
    const info = getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    return {
        format: info.textureFormat,
        type: info.type[0]
    };
}
/**
 * Returns true if value is power of 2
 * @param {number} value number to check.
 * @return true if value is power of 2
 * @private
 */ function isPowerOf2(value) {
    return (value & value - 1) === 0;
}
/**
 * Gets whether or not we can generate mips for the given
 * internal format.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number} width The width parameter from texImage2D etc..
 * @param {number} height The height parameter from texImage2D etc..
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */ function canGenerateMipmap(gl, width, height, internalFormat) {
    if (!isWebGL2(gl)) return isPowerOf2(width) && isPowerOf2(height);
    const info = getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    return info.colorRenderable && info.textureFilterable;
}
/**
 * Gets whether or not we can generate mips for the given format
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */ function canFilter(internalFormat) {
    const info = getTextureInternalFormatInfo(internalFormat);
    if (!info) throw "unknown internal format";
    return info.textureFilterable;
}
/**
 * Gets the number of components for a given image format.
 * @param {number} format the format.
 * @return {number} the number of components for the format.
 * @memberOf module:twgl/textures
 */ function getNumComponentsForFormat(format) {
    const info = formatInfo[format];
    if (!info) throw "unknown format: " + format;
    return info.numColorComponents;
}
/**
 * Gets the texture type for a given array type.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @return {number} the gl texture type
 * @private
 */ function getTextureTypeForArrayType(gl, src, defaultType) {
    if (isArrayBuffer$1(src)) return getGLTypeForTypedArray(src);
    return defaultType || UNSIGNED_BYTE$2;
}
function guessDimensions(gl, target, width, height, numElements) {
    if (numElements % 1 !== 0) throw "can't guess dimensions";
    if (!width && !height) {
        const size = Math.sqrt(numElements / (target === TEXTURE_CUBE_MAP ? 6 : 1));
        if (size % 1 === 0) {
            width = size;
            height = size;
        } else {
            width = numElements;
            height = 1;
        }
    } else if (!height) {
        height = numElements / width;
        if (height % 1) throw "can't guess dimensions";
    } else if (!width) {
        width = numElements / height;
        if (width % 1) throw "can't guess dimensions";
    }
    return {
        width: width,
        height: height
    };
}
/**
 * Sets the default texture color.
 *
 * The default texture color is used when loading textures from
 * urls. Because the URL will be loaded async we'd like to be
 * able to use the texture immediately. By putting a 1x1 pixel
 * color in the texture we can start using the texture before
 * the URL has loaded.
 *
 * @param {number[]} color Array of 4 values in the range 0 to 1
 * @deprecated see {@link module:twgl.setDefaults}
 * @memberOf module:twgl/textures
 */ function setDefaultTextureColor(color) {
    defaults$1.textureColor = new Uint8Array([
        color[0] * 255,
        color[1] * 255,
        color[2] * 255,
        color[3] * 255
    ]);
}
function setDefaults$1(newDefaults) {
    copyExistingProperties(newDefaults, defaults$1);
    if (newDefaults.textureColor) setDefaultTextureColor(newDefaults.textureColor);
}
/**
 * A function to generate the source for a texture.
 * @callback TextureFunc
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options the texture options
 * @return {*} Returns any of the things documented for `src` for {@link module:twgl.TextureOptions}.
 * @memberOf module:twgl
 */ /**
 * Texture options passed to most texture functions. Each function will use whatever options
 * are appropriate for its needs. This lets you pass the same options to all functions.
 *
 * Note: A `TexImageSource` is defined in the WebGL spec as a `HTMLImageElement`, `HTMLVideoElement`,
 * `HTMLCanvasElement`, `ImageBitmap`, or `ImageData`.
 *
 * @typedef {Object} TextureOptions
 * @property {number} [target] the type of texture `gl.TEXTURE_2D` or `gl.TEXTURE_CUBE_MAP`. Defaults to `gl.TEXTURE_2D`.
 * @property {number} [level] the mip level to affect. Defaults to 0. Note, if set auto will be considered false unless explicitly set to true.
 * @property {number} [width] the width of the texture. Only used if src is an array or typed array or null.
 * @property {number} [height] the height of a texture. Only used if src is an array or typed array or null.
 * @property {number} [depth] the depth of a texture. Only used if src is an array or type array or null and target is `TEXTURE_3D` .
 * @property {number} [min] the min filter setting (eg. `gl.LINEAR`). Defaults to `gl.NEAREST_MIPMAP_LINEAR`
 *     or if texture is not a power of 2 on both dimensions then defaults to `gl.LINEAR`.
 * @property {number} [mag] the mag filter setting (eg. `gl.LINEAR`). Defaults to `gl.LINEAR`
 * @property {number} [minMag] both the min and mag filter settings.
 * @property {number} [internalFormat] internal format for texture. Defaults to `gl.RGBA`
 * @property {number} [format] format for texture. Defaults to `gl.RGBA`.
 * @property {number} [type] type for texture. Defaults to `gl.UNSIGNED_BYTE` unless `src` is ArrayBufferView. If `src`
 *     is ArrayBufferView defaults to type that matches ArrayBufferView type.
 * @property {number} [wrap] Texture wrapping for both S and T (and R if TEXTURE_3D or WebGLSampler). Defaults to `gl.REPEAT` for 2D unless src is WebGL1 and src not npot and `gl.CLAMP_TO_EDGE` for cube
 * @property {number} [wrapS] Texture wrapping for S. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapT] Texture wrapping for T. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapR] Texture wrapping for R. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [minLod] TEXTURE_MIN_LOD setting
 * @property {number} [maxLod] TEXTURE_MAX_LOD setting
 * @property {number} [baseLevel] TEXTURE_BASE_LEVEL setting
 * @property {number} [maxLevel] TEXTURE_MAX_LEVEL setting
 * @property {number} [unpackAlignment] The `gl.UNPACK_ALIGNMENT` used when uploading an array. Defaults to 1.
 * @property {number[]|ArrayBufferView} [color] Color to initialize this texture with if loading an image asynchronously.
 *     The default use a blue 1x1 pixel texture. You can set another default by calling `twgl.setDefaults`
 *     or you can set an individual texture's initial color by setting this property. Example: `[1, .5, .5, 1]` = pink
 * @property {number} [premultiplyAlpha] Whether or not to premultiply alpha. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [flipY] Whether or not to flip the texture vertically on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [colorspaceConversion] Whether or not to let the browser do colorspace conversion of the texture on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {boolean} [auto] If `undefined` or `true`, in WebGL1, texture filtering is set automatically for non-power of 2 images and
 *    mips are generated for power of 2 images. In WebGL2 mips are generated if they can be. Note: if `level` is set above
 *    then then `auto` is assumed to be `false` unless explicity set to `true`.
 * @property {number[]} [cubeFaceOrder] The order that cube faces are pulled out of an img or set of images. The default is
 *
 *     [gl.TEXTURE_CUBE_MAP_POSITIVE_X,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
 *
 * @property {(number[]|ArrayBufferView|TexImageSource|TexImageSource[]|string|string[]|module:twgl.TextureFunc)} [src] source for texture
 *
 *    If `string` then it's assumed to be a URL to an image. The image will be downloaded async. A usable
 *    1x1 pixel texture will be returned immediately. The texture will be updated once the image has downloaded.
 *    If `target` is `gl.TEXTURE_CUBE_MAP` will attempt to divide image into 6 square pieces. 1x6, 6x1, 3x2, 2x3.
 *    The pieces will be uploaded in `cubeFaceOrder`
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_CUBE_MAP` then it must have 6 entries, one for each face of a cube map.
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_2D_ARRAY` then each entry is a slice of the a 2d array texture
 *    and will be scaled to the specified width and height OR to the size of the first image that loads.
 *
 *    If `TexImageSource` then it wil be used immediately to create the contents of the texture. Examples `HTMLImageElement`,
 *    `HTMLCanvasElement`, `HTMLVideoElement`.
 *
 *    If `number[]` or `ArrayBufferView` it's assumed to be data for a texture. If `width` or `height` is
 *    not specified it is guessed as follows. First the number of elements is computed by `src.length / numComponents`
 *    where `numComponents` is derived from `format`. If `target` is `gl.TEXTURE_CUBE_MAP` then `numElements` is divided
 *    by 6. Then
 *
 *    *   If neither `width` nor `height` are specified and `sqrt(numElements)` is an integer then width and height
 *        are set to `sqrt(numElements)`. Otherwise `width = numElements` and `height = 1`.
 *
 *    *   If only one of `width` or `height` is specified then the other equals `numElements / specifiedDimension`.
 *
 * If `number[]` will be converted to `type`.
 *
 * If `src` is a function it will be called with a `WebGLRenderingContext` and these options.
 * Whatever it returns is subject to these rules. So it can return a string url, an `HTMLElement`
 * an array etc...
 *
 * If `src` is undefined then an empty texture will be created of size `width` by `height`.
 *
 * @property {string} [crossOrigin] What to set the crossOrigin property of images when they are downloaded.
 *    default: undefined. Also see {@link module:twgl.setDefaults}.
 *
 * @memberOf module:twgl
 */ /**
 * Sets any packing state that will be set based on the options.
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @private
 */ function setPackState(gl, options) {
    if (options.colorspaceConversion !== undefined) gl.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
    if (options.premultiplyAlpha !== undefined) gl.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
    if (options.flipY !== undefined) gl.pixelStorei(UNPACK_FLIP_Y_WEBGL, options.flipY);
}
/**
 * Set skip state to defaults
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @private
 */ function setSkipStateToDefault(gl) {
    gl.pixelStorei(UNPACK_ALIGNMENT, 4);
    if (isWebGL2(gl)) {
        gl.pixelStorei(UNPACK_ROW_LENGTH, 0);
        gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
        gl.pixelStorei(UNPACK_SKIP_PIXELS, 0);
        gl.pixelStorei(UNPACK_SKIP_ROWS, 0);
        gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
    }
}
/**
 * Sets the parameters of a texture or sampler
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number|WebGLSampler} target texture target or sampler
 * @param {function()} parameteriFn texParameteri or samplerParameteri fn
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @private
 */ function setTextureSamplerParameters(gl, target, parameteriFn, options) {
    if (options.minMag) {
        parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.minMag);
        parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.minMag);
    }
    if (options.min) parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.min);
    if (options.mag) parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.mag);
    if (options.wrap) {
        parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrap);
        parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrap);
        if (target === TEXTURE_3D || isSampler(gl, target)) parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrap);
    }
    if (options.wrapR) parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrapR);
    if (options.wrapS) parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrapS);
    if (options.wrapT) parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrapT);
    if (options.minLod) parameteriFn.call(gl, target, TEXTURE_MIN_LOD, options.minLod);
    if (options.maxLod) parameteriFn.call(gl, target, TEXTURE_MAX_LOD, options.maxLod);
    if (options.baseLevel) parameteriFn.call(gl, target, TEXTURE_BASE_LEVEL, options.baseLevel);
    if (options.maxLevel) parameteriFn.call(gl, target, TEXTURE_MAX_LEVEL, options.maxLevel);
}
/**
 * Sets the texture parameters of a texture.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */ function setTextureParameters(gl, tex, options) {
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    setTextureSamplerParameters(gl, target, gl.texParameteri, options);
}
/**
 * Sets the sampler parameters of a sampler.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLSampler} sampler the WebGLSampler to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */ function setSamplerParameters(gl, sampler, options) {
    setTextureSamplerParameters(gl, sampler, gl.samplerParameteri, options);
}
/**
 * Creates a new sampler object and sets parameters.
 *
 * Example:
 *
 *      const sampler = twgl.createSampler(gl, {
 *        minMag: gl.NEAREST,         // sets both TEXTURE_MIN_FILTER and TEXTURE_MAG_FILTER
 *        wrap: gl.CLAMP_TO_NEAREST,  // sets both TEXTURE_WRAP_S and TEXTURE_WRAP_T and TEXTURE_WRAP_R
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per sampler.
 * @return {Object.<string,WebGLSampler>} the created samplers by name
 * @private
 */ function createSampler(gl, options) {
    const sampler = gl.createSampler();
    setSamplerParameters(gl, sampler, options);
    return sampler;
}
/**
 * Creates a multiple sampler objects and sets parameters on each.
 *
 * Example:
 *
 *      const samplers = twgl.createSamplers(gl, {
 *        nearest: {
 *          minMag: gl.NEAREST,
 *        },
 *        nearestClampS: {
 *          minMag: gl.NEAREST,
 *          wrapS: gl.CLAMP_TO_NEAREST,
 *        },
 *        linear: {
 *          minMag: gl.LINEAR,
 *        },
 *        nearestClamp: {
 *          minMag: gl.NEAREST,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClamp: {
 *          minMag: gl.LINEAR,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClampT: {
 *          minMag: gl.LINEAR,
 *          wrapT: gl.CLAMP_TO_EDGE,
 *        },
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set on the sampler
 * @private
 */ function createSamplers(gl, samplerOptions) {
    const samplers = {
    };
    Object.keys(samplerOptions).forEach(function(name) {
        samplers[name] = createSampler(gl, samplerOptions[name]);
    });
    return samplers;
}
/**
 * Makes a 1x1 pixel
 * If no color is passed in uses the default color which can be set by calling `setDefaultTextureColor`.
 * @param {(number[]|ArrayBufferView)} [color] The color using 0-1 values
 * @return {Uint8Array} Unit8Array with color.
 * @private
 */ function make1Pixel(color) {
    color = color || defaults$1.textureColor;
    if (isArrayBuffer$1(color)) return color;
    return new Uint8Array([
        color[0] * 255,
        color[1] * 255,
        color[2] * 255,
        color[3] * 255
    ]);
}
/**
 * Sets filtering or generates mips for texture based on width or height
 * If width or height is not passed in uses `options.width` and//or `options.height`
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @param {number} [width] width of texture
 * @param {number} [height] height of texture
 * @param {number} [internalFormat] The internalFormat parameter from texImage2D etc..
 * @memberOf module:twgl/textures
 */ function setTextureFilteringForSize(gl, tex, options, width, height, internalFormat) {
    options = options || defaults$1.textureOptions;
    internalFormat = internalFormat || RGBA;
    const target = options.target || TEXTURE_2D;
    width = width || options.width;
    height = height || options.height;
    gl.bindTexture(target, tex);
    if (canGenerateMipmap(gl, width, height, internalFormat)) gl.generateMipmap(target);
    else {
        const filtering = canFilter(internalFormat) ? LINEAR : NEAREST;
        gl.texParameteri(target, TEXTURE_MIN_FILTER, filtering);
        gl.texParameteri(target, TEXTURE_MAG_FILTER, filtering);
        gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
        gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
    }
}
function shouldAutomaticallySetTextureFilteringForSize(options) {
    return options.auto === true || options.auto === undefined && options.level === undefined;
}
/**
 * Gets an array of cubemap face enums
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @return {number[]} cubemap face enums
 * @private
 */ function getCubeFaceOrder(gl, options) {
    options = options || {
    };
    return options.cubeFaceOrder || [
        TEXTURE_CUBE_MAP_POSITIVE_X,
        TEXTURE_CUBE_MAP_NEGATIVE_X,
        TEXTURE_CUBE_MAP_POSITIVE_Y,
        TEXTURE_CUBE_MAP_NEGATIVE_Y,
        TEXTURE_CUBE_MAP_POSITIVE_Z,
        TEXTURE_CUBE_MAP_NEGATIVE_Z, 
    ];
}
/**
 * @typedef {Object} FaceInfo
 * @property {number} face gl enum for texImage2D
 * @property {number} ndx face index (0 - 5) into source data
 * @ignore
 */ /**
 * Gets an array of FaceInfos
 * There's a bug in some NVidia drivers that will crash the driver if
 * `gl.TEXTURE_CUBE_MAP_POSITIVE_X` is not uploaded first. So, we take
 * the user's desired order from his faces to WebGL and make sure we
 * do the faces in WebGL order
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @return {FaceInfo[]} cubemap face infos. Arguably the `face` property of each element is redundant but
 *    it's needed internally to sort the array of `ndx` properties by `face`.
 * @private
 */ function getCubeFacesWithNdx(gl, options) {
    const faces = getCubeFaceOrder(gl, options);
    // work around bug in NVidia drivers. We have to upload the first face first else the driver crashes :(
    const facesWithNdx = faces.map(function(face, ndx) {
        return {
            face: face,
            ndx: ndx
        };
    });
    facesWithNdx.sort(function(a, b) {
        return a.face - b.face;
    });
    return facesWithNdx;
}
/**
 * Set a texture from the contents of an element. Will also set
 * texture filtering or generate mips based on the dimensions of the element
 * unless `options.auto === false`. If `target === gl.TEXTURE_CUBE_MAP` will
 * attempt to slice image into 1x6, 2x3, 3x2, or 6x1 images, one for each face.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {HTMLElement} element a canvas, img, or video element.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 * @kind function
 */ function setTextureFromElement(gl, tex, element, options) {
    options = options || defaults$1.textureOptions;
    const target = options.target || TEXTURE_2D;
    const level = options.level || 0;
    let width = element.width;
    let height = element.height;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || formatType.type;
    setPackState(gl, options);
    gl.bindTexture(target, tex);
    if (target === TEXTURE_CUBE_MAP) {
        // guess the parts
        const imgWidth = element.width;
        const imgHeight = element.height;
        let size;
        let slices;
        if (imgWidth / 6 === imgHeight) {
            // It's 6x1
            size = imgHeight;
            slices = [
                0,
                0,
                1,
                0,
                2,
                0,
                3,
                0,
                4,
                0,
                5,
                0
            ];
        } else if (imgHeight / 6 === imgWidth) {
            // It's 1x6
            size = imgWidth;
            slices = [
                0,
                0,
                0,
                1,
                0,
                2,
                0,
                3,
                0,
                4,
                0,
                5
            ];
        } else if (imgWidth / 3 === imgHeight / 2) {
            // It's 3x2
            size = imgWidth / 3;
            slices = [
                0,
                0,
                1,
                0,
                2,
                0,
                0,
                1,
                1,
                1,
                2,
                1
            ];
        } else if (imgWidth / 2 === imgHeight / 3) {
            // It's 2x3
            size = imgWidth / 2;
            slices = [
                0,
                0,
                1,
                0,
                0,
                1,
                1,
                1,
                0,
                2,
                1,
                2
            ];
        } else throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
        const ctx = getShared2DContext();
        if (ctx) {
            ctx.canvas.width = size;
            ctx.canvas.height = size;
            width = size;
            height = size;
            getCubeFacesWithNdx(gl, options).forEach(function(f) {
                const xOffset = slices[f.ndx * 2 + 0] * size;
                const yOffset = slices[f.ndx * 2 + 1] * size;
                ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
                gl.texImage2D(f.face, level, internalFormat, format, type, ctx.canvas);
            });
            // Free up the canvas memory
            ctx.canvas.width = 1;
            ctx.canvas.height = 1;
        } else if (typeof createImageBitmap !== 'undefined') {
            // NOTE: It seems like we should prefer ImageBitmap because unlike canvas it's
            // note lossy? (alpha is not premultiplied? although I'm not sure what
            width = size;
            height = size;
            getCubeFacesWithNdx(gl, options).forEach(function(f) {
                const xOffset = slices[f.ndx * 2 + 0] * size;
                const yOffset = slices[f.ndx * 2 + 1] * size;
                // We can't easily use a default texture color here as it would have to match
                // the type across all faces where as with a 2D one there's only one face
                // so we're replacing everything all at once. It also has to be the correct size.
                // On the other hand we need all faces to be the same size so as one face loads
                // the rest match else the texture will be un-renderable.
                gl.texImage2D(f.face, level, internalFormat, size, size, 0, format, type, null);
                createImageBitmap(element, xOffset, yOffset, size, size, {
                    premultiplyAlpha: 'none',
                    colorSpaceConversion: 'none'
                }).then(function(imageBitmap) {
                    setPackState(gl, options);
                    gl.bindTexture(target, tex);
                    gl.texImage2D(f.face, level, internalFormat, format, type, imageBitmap);
                    if (shouldAutomaticallySetTextureFilteringForSize(options)) setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
                });
            });
        }
    } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
        const smallest = Math.min(element.width, element.height);
        const largest = Math.max(element.width, element.height);
        const depth = largest / smallest;
        if (depth % 1 !== 0) throw "can not compute 3D dimensions of element";
        const xMult = element.width === largest ? 1 : 0;
        const yMult = element.height === largest ? 1 : 0;
        gl.pixelStorei(UNPACK_ALIGNMENT, 1);
        gl.pixelStorei(UNPACK_ROW_LENGTH, element.width);
        gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
        gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
        gl.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
        for(let d = 0; d < depth; ++d){
            const srcX = d * smallest * xMult;
            const srcY = d * smallest * yMult;
            gl.pixelStorei(UNPACK_SKIP_PIXELS, srcX);
            gl.pixelStorei(UNPACK_SKIP_ROWS, srcY);
            gl.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
        }
        setSkipStateToDefault(gl);
    } else gl.texImage2D(target, level, internalFormat, format, type, element);
    if (shouldAutomaticallySetTextureFilteringForSize(options)) setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
    setTextureParameters(gl, tex, options);
}
function noop() {
}
/**
 * Checks whether the url's origin is the same so that we can set the `crossOrigin`
 * @param {string} url url to image
 * @returns {boolean} true if the window's origin is the same as image's url
 * @private
 */ function urlIsSameOrigin(url) {
    if (typeof document !== 'undefined') {
        // for IE really
        const a = document.createElement('a');
        a.href = url;
        return a.hostname === location.hostname && a.port === location.port && a.protocol === location.protocol;
    } else {
        const localOrigin = new URL(location.href).origin;
        const urlOrigin = new URL(url, location.href).origin;
        return urlOrigin === localOrigin;
    }
}
function setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
    return crossOrigin === undefined && !urlIsSameOrigin(url) ? 'anonymous' : crossOrigin;
}
/**
 * Loads an image
 * @param {string} url url to image
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @return {HTMLImageElement} the image being loaded.
 * @private
 */ function loadImage(url, crossOrigin, callback) {
    callback = callback || noop;
    let img;
    crossOrigin = crossOrigin !== undefined ? crossOrigin : defaults$1.crossOrigin;
    crossOrigin = setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
    if (typeof Image !== 'undefined') {
        img = new Image();
        if (crossOrigin !== undefined) img.crossOrigin = crossOrigin;
        const clearEventHandlers = function clearEventHandlers() {
            img.removeEventListener('error', onError); // eslint-disable-line
            img.removeEventListener('load', onLoad); // eslint-disable-line
            img = null;
        };
        const onError = function onError() {
            const msg = "couldn't load image: " + url;
            error(msg);
            callback(msg, img);
            clearEventHandlers();
        };
        const onLoad = function onLoad() {
            callback(null, img);
            clearEventHandlers();
        };
        img.addEventListener('error', onError);
        img.addEventListener('load', onLoad);
        img.src = url;
        return img;
    } else if (typeof ImageBitmap !== 'undefined') {
        let err;
        let bm;
        const cb = function cb() {
            callback(err, bm);
        };
        const options = {
        };
        if (crossOrigin) options.mode = 'cors'; // TODO: not sure how to translate image.crossOrigin
        fetch(url, options).then(function(response) {
            if (!response.ok) throw response;
            return response.blob();
        }).then(function(blob) {
            return createImageBitmap(blob, {
                premultiplyAlpha: 'none',
                colorSpaceConversion: 'none'
            });
        }).then(function(bitmap) {
            // not sure if this works. We don't want
            // to catch the user's error. So, call
            // the callback in a timeout so we're
            // not in this scope inside the promise.
            bm = bitmap;
            setTimeout(cb);
        }).catch(function(e) {
            err = e;
            setTimeout(cb);
        });
        img = null;
    }
    return img;
}
/**
 * check if object is a TexImageSource
 *
 * @param {Object} obj Object to test
 * @return {boolean} true if object is a TexImageSource
 * @private
 */ function isTexImageSource(obj) {
    return typeof ImageBitmap !== 'undefined' && obj instanceof ImageBitmap || typeof ImageData !== 'undefined' && obj instanceof ImageData || typeof HTMLElement !== 'undefined' && obj instanceof HTMLElement;
}
/**
 * if obj is an TexImageSource then just
 * uses it otherwise if obj is a string
 * then load it first.
 *
 * @param {string|TexImageSource} obj
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @private
 */ function loadAndUseImage(obj, crossOrigin, callback) {
    if (isTexImageSource(obj)) {
        setTimeout(function() {
            callback(null, obj);
        });
        return obj;
    }
    return loadImage(obj, crossOrigin, callback);
}
/**
 * Sets a texture to a 1x1 pixel color. If `options.color === false` is nothing happens. If it's not set
 * the default texture color is used which can be set by calling `setDefaultTextureColor`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */ function setTextureTo1PixelColor(gl, tex, options) {
    options = options || defaults$1.textureOptions;
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    if (options.color === false) return;
    // Assume it's a URL
    // Put 1x1 pixels in texture. That makes it renderable immediately regardless of filtering.
    const color = make1Pixel(options.color);
    if (target === TEXTURE_CUBE_MAP) for(let ii = 0; ii < 6; ++ii)gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
    else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, 0, RGBA, 1, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
    else gl.texImage2D(target, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
}
/**
 * The src image(s) used to create a texture.
 *
 * When you call {@link module:twgl.createTexture} or {@link module:twgl.createTextures}
 * you can pass in urls for images to load into the textures. If it's a single url
 * then this will be a single HTMLImageElement. If it's an array of urls used for a cubemap
 * this will be a corresponding array of images for the cubemap.
 *
 * @typedef {HTMLImageElement|HTMLImageElement[]} TextureSrc
 * @memberOf module:twgl
 */ /**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback TextureReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} texture the texture.
 * @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
 * @memberOf module:twgl
 */ /**
 * A callback for when all images have finished downloading and been uploaded into their respective textures
 * @callback TexturesReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
 * @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
 * @memberOf module:twgl
 */ /**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback CubemapReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each face.
 * @memberOf module:twgl
 */ /**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback ThreeDReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each slice.
 * @memberOf module:twgl
 */ /**
 * Loads a texture from an image from a Url as specified in `options.src`
 * If `options.color !== false` will set the texture to a 1x1 pixel color so that the texture is
 * immediately useable. It will be updated with the contents of the image once the image has finished
 * downloading. Filtering options will be set as appropriate for image unless `options.auto === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A function to be called when the image has finished loading. err will
 *    be non null if there was an error.
 * @return {HTMLImageElement} the image being downloaded.
 * @memberOf module:twgl/textures
 */ function loadTextureFromUrl(gl, tex, options, callback) {
    callback = callback || noop;
    options = options || defaults$1.textureOptions;
    setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({
    }, options);
    const img1 = loadAndUseImage(options.src, options.crossOrigin, function(err, img) {
        if (err) callback(err, tex, img);
        else {
            setTextureFromElement(gl, tex, img, options);
            callback(null, tex, img);
        }
    });
    return img1;
}
/**
 * Loads a cubemap from 6 urls or TexImageSources as specified in `options.src`. Will set the cubemap to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.CubemapReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 */ function loadCubemapFromUrls(gl, tex, options, callback) {
    callback = callback || noop;
    const urls = options.src;
    if (urls.length !== 6) throw "there must be 6 urls for a cubemap";
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || UNSIGNED_BYTE$2;
    const target = options.target || TEXTURE_2D;
    if (target !== TEXTURE_CUBE_MAP) throw "target must be TEXTURE_CUBE_MAP";
    setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({
    }, options);
    let numToLoad = 6;
    const errors = [];
    const faces = getCubeFaceOrder(gl, options);
    let imgs; // eslint-disable-line
    function uploadImg(faceTarget) {
        return function(err, img) {
            --numToLoad;
            if (err) errors.push(err);
            else if (img.width !== img.height) errors.push("cubemap face img is not a square: " + img.src);
            else {
                setPackState(gl, options);
                gl.bindTexture(target, tex);
                // So assuming this is the first image we now have one face that's img sized
                // and 5 faces that are 1x1 pixel so size the other faces
                if (numToLoad === 5) // use the default order
                getCubeFaceOrder().forEach(function(otherTarget) {
                    // Should we re-use the same face or a color?
                    gl.texImage2D(otherTarget, level, internalFormat, format, type, img);
                });
                else gl.texImage2D(faceTarget, level, internalFormat, format, type, img);
                if (shouldAutomaticallySetTextureFilteringForSize(options)) gl.generateMipmap(target);
            }
            if (numToLoad === 0) callback(errors.length ? errors : undefined, tex, imgs);
        };
    }
    imgs = urls.map(function(url, ndx) {
        return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
    });
}
/**
 * Loads a 2d array or 3d texture from urls OR TexImageSources as specified in `options.src`.
 * Will set the texture to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 *
 * If the width and height is not specified the width and height of the first
 * image loaded will be used. Note that since images are loaded async
 * which image downloads first is unknown.
 *
 * If an image is not the same size as the width and height it will be scaled
 * to that width and height.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.ThreeDReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 */ function loadSlicesFromUrls(gl, tex, options, callback) {
    callback = callback || noop;
    const urls = options.src;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || UNSIGNED_BYTE$2;
    const target = options.target || TEXTURE_2D_ARRAY;
    if (target !== TEXTURE_3D && target !== TEXTURE_2D_ARRAY) throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
    setTextureTo1PixelColor(gl, tex, options);
    // Because it's async we need to copy the options.
    options = Object.assign({
    }, options);
    let numToLoad = urls.length;
    const errors = [];
    let imgs; // eslint-disable-line
    const level = options.level || 0;
    let width = options.width;
    let height = options.height;
    const depth = urls.length;
    let firstImage = true;
    function uploadImg(slice) {
        return function(err, img) {
            --numToLoad;
            if (err) errors.push(err);
            else {
                setPackState(gl, options);
                gl.bindTexture(target, tex);
                if (firstImage) {
                    firstImage = false;
                    width = options.width || img.width;
                    height = options.height || img.height;
                    gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
                    // put it in every slice otherwise some slices will be 0,0,0,0
                    for(let s = 0; s < depth; ++s)gl.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
                } else {
                    let src = img;
                    let ctx;
                    if (img.width !== width || img.height !== height) {
                        // Size the image to fix
                        ctx = getShared2DContext();
                        src = ctx.canvas;
                        ctx.canvas.width = width;
                        ctx.canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                    }
                    gl.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);
                    // free the canvas memory
                    if (ctx && src === ctx.canvas) {
                        ctx.canvas.width = 0;
                        ctx.canvas.height = 0;
                    }
                }
                if (shouldAutomaticallySetTextureFilteringForSize(options)) gl.generateMipmap(target);
            }
            if (numToLoad === 0) callback(errors.length ? errors : undefined, tex, imgs);
        };
    }
    imgs = urls.map(function(url, ndx) {
        return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
    });
}
/**
 * Sets a texture from an array or typed array. If the width or height is not provided will attempt to
 * guess the size. See {@link module:twgl.TextureOptions}.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {(number[]|ArrayBufferView)} src An array or typed arry with texture data.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */ function setTextureFromArray(gl, tex, src, options) {
    options = options || defaults$1.textureOptions;
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    let width = options.width;
    let height = options.height;
    let depth = options.depth;
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
    if (!isArrayBuffer$1(src)) {
        const Type = getTypedArrayTypeForGLType(type);
        src = new Type(src);
    } else if (src instanceof Uint8ClampedArray) src = new Uint8Array(src.buffer);
    const bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
    const numElements = src.byteLength / bytesPerElement; // TODO: check UNPACK_ALIGNMENT?
    if (numElements % 1) throw "length wrong size for format: " + glEnumToString(gl, format);
    let dimensions;
    if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
        if (!width && !height && !depth) {
            const size = Math.cbrt(numElements);
            if (size % 1 !== 0) throw "can't guess cube size of array of numElements: " + numElements;
            width = size;
            height = size;
            depth = size;
        } else if (width && (!height || !depth)) {
            dimensions = guessDimensions(gl, target, height, depth, numElements / width);
            height = dimensions.width;
            depth = dimensions.height;
        } else if (height && (!width || !depth)) {
            dimensions = guessDimensions(gl, target, width, depth, numElements / height);
            width = dimensions.width;
            depth = dimensions.height;
        } else {
            dimensions = guessDimensions(gl, target, width, height, numElements / depth);
            width = dimensions.width;
            height = dimensions.height;
        }
    } else {
        dimensions = guessDimensions(gl, target, width, height, numElements);
        width = dimensions.width;
        height = dimensions.height;
    }
    setSkipStateToDefault(gl);
    gl.pixelStorei(UNPACK_ALIGNMENT, options.unpackAlignment || 1);
    setPackState(gl, options);
    if (target === TEXTURE_CUBE_MAP) {
        const elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
        const faceSize = numElements / 6 * elementsPerElement;
        getCubeFacesWithNdx(gl, options).forEach((f)=>{
            const offset = faceSize * f.ndx;
            const data = src.subarray(offset, offset + faceSize);
            gl.texImage2D(f.face, level, internalFormat, width, height, 0, format, type, data);
        });
    } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
    else gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
    return {
        width: width,
        height: height,
        depth: depth,
        type: type
    };
}
/**
 * Sets a texture with no contents of a certain size. In other words calls `gl.texImage2D` with `null`.
 * You must set `options.width` and `options.height`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */ function setEmptyTexture(gl, tex, options) {
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    const type = options.type || formatType.type;
    setPackState(gl, options);
    if (target === TEXTURE_CUBE_MAP) for(let ii = 0; ii < 6; ++ii)gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
    else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
    else gl.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
}
/**
 * Creates a texture based on the options passed in.
 *
 * Note: may reset UNPACK_ALIGNMENT, UNPACK_ROW_LENGTH, UNPACK_IMAGE_HEIGHT, UNPACK_SKIP_IMAGES
 * UNPACK_SKIP_PIXELS, and UNPACK_SKIP_ROWS
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A callback called when an image has been downloaded and uploaded to the texture.
 * @return {WebGLTexture} the created texture.
 * @memberOf module:twgl/textures
 */ function createTexture(gl, options, callback) {
    callback = callback || noop;
    options = options || defaults$1.textureOptions;
    const tex = gl.createTexture();
    const target = options.target || TEXTURE_2D;
    let width = options.width || 1;
    let height = options.height || 1;
    const internalFormat = options.internalFormat || RGBA;
    gl.bindTexture(target, tex);
    if (target === TEXTURE_CUBE_MAP) {
        // this should have been the default for cubemaps :(
        gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
        gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
    }
    let src = options.src;
    if (src) {
        if (typeof src === "function") src = src(gl, options);
        if (typeof src === "string") loadTextureFromUrl(gl, tex, options, callback);
        else if (isArrayBuffer$1(src) || Array.isArray(src) && (typeof src[0] === 'number' || Array.isArray(src[0]) || isArrayBuffer$1(src[0]))) {
            const dimensions = setTextureFromArray(gl, tex, src, options);
            width = dimensions.width;
            height = dimensions.height;
        } else if (Array.isArray(src) && (typeof src[0] === 'string' || isTexImageSource(src[0]))) {
            if (target === TEXTURE_CUBE_MAP) loadCubemapFromUrls(gl, tex, options, callback);
            else loadSlicesFromUrls(gl, tex, options, callback);
        } else {
            setTextureFromElement(gl, tex, src, options);
            width = src.width;
            height = src.height;
        }
    } else setEmptyTexture(gl, tex, options);
    if (shouldAutomaticallySetTextureFilteringForSize(options)) setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
    setTextureParameters(gl, tex, options);
    return tex;
}
/**
 * Resizes a texture based on the options passed in.
 *
 * Note: This is not a generic resize anything function.
 * It's mostly used by {@link module:twgl.resizeFramebufferInfo}
 * It will use `options.src` if it exists to try to determine a `type`
 * otherwise it will assume `gl.UNSIGNED_BYTE`. No data is provided
 * for the texture. Texture parameters will be set accordingly
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the texture to resize
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {number} [width] the new width. If not passed in will use `options.width`
 * @param {number} [height] the new height. If not passed in will use `options.height`
 * @param {number} [depth] the new depth. If not passed in will use `options.depth`
 * @memberOf module:twgl/textures
 */ function resizeTexture(gl, tex, options, width, height, depth) {
    width = width || options.width;
    height = height || options.height;
    depth = depth || options.depth;
    const target = options.target || TEXTURE_2D;
    gl.bindTexture(target, tex);
    const level = options.level || 0;
    const internalFormat = options.internalFormat || options.format || RGBA;
    const formatType = getFormatAndTypeForInternalFormat(internalFormat);
    const format = options.format || formatType.format;
    let type;
    const src = options.src;
    if (!src) type = options.type || formatType.type;
    else if (isArrayBuffer$1(src) || Array.isArray(src) && typeof src[0] === 'number') type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
    else type = options.type || formatType.type;
    if (target === TEXTURE_CUBE_MAP) for(let ii = 0; ii < 6; ++ii)gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
    else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
    else gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
}
/**
 * Check if a src is an async request.
 * if src is a string we're going to download an image
 * if src is an array of strings we're going to download cubemap images
 * @param {*} src The src from a TextureOptions
 * @returns {bool} true if src is async.
 * @private
 */ function isAsyncSrc(src) {
    return typeof src === 'string' || Array.isArray(src) && typeof src[0] === 'string';
}
/**
 * Creates a bunch of textures based on the passed in options.
 *
 * Example:
 *
 *     const textures = twgl.createTextures(gl, {
 *       // a power of 2 image
 *       hftIcon: { src: "images/hft-icon-16.png", mag: gl.NEAREST },
 *       // a non-power of 2 image
 *       clover: { src: "images/clover.jpg" },
 *       // From a canvas
 *       fromCanvas: { src: ctx.canvas },
 *       // A cubemap from 6 images
 *       yokohama: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: [
 *           'images/yokohama/posx.jpg',
 *           'images/yokohama/negx.jpg',
 *           'images/yokohama/posy.jpg',
 *           'images/yokohama/negy.jpg',
 *           'images/yokohama/posz.jpg',
 *           'images/yokohama/negz.jpg',
 *         ],
 *       },
 *       // A cubemap from 1 image (can be 1x6, 2x3, 3x2, 6x1)
 *       goldengate: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: 'images/goldengate.jpg',
 *       },
 *       // A 2x2 pixel texture from a JavaScript array
 *       checker: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         src: [
 *           255,255,255,255,
 *           192,192,192,255,
 *           192,192,192,255,
 *           255,255,255,255,
 *         ],
 *       },
 *       // a 1x2 pixel texture from a typed array.
 *       stripe: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         format: gl.LUMINANCE,
 *         src: new Uint8Array([
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *         ]),
 *         width: 1,
 *       },
 *     });
 *
 * Now
 *
 * *   `textures.hftIcon` will be a 2d texture
 * *   `textures.clover` will be a 2d texture
 * *   `textures.fromCanvas` will be a 2d texture
 * *   `textures.yohohama` will be a cubemap texture
 * *   `textures.goldengate` will be a cubemap texture
 * *   `textures.checker` will be a 2d texture
 * *   `textures.stripe` will be a 2d texture
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per texture.
 * @param {module:twgl.TexturesReadyCallback} [callback] A callback called when all textures have been downloaded.
 * @return {Object.<string,WebGLTexture>} the created textures by name
 * @memberOf module:twgl/textures
 */ function createTextures(gl, textureOptions, callback) {
    callback = callback || noop;
    let numDownloading = 0;
    const errors = [];
    const textures1 = {
    };
    const images = {
    };
    function callCallbackIfReady() {
        if (numDownloading === 0) setTimeout(function() {
            callback(errors.length ? errors : undefined, textures1, images);
        }, 0);
    }
    Object.keys(textureOptions).forEach(function(name) {
        const options = textureOptions[name];
        let onLoadFn;
        if (isAsyncSrc(options.src)) {
            onLoadFn = function(err, tex, img) {
                images[name] = img;
                --numDownloading;
                if (err) errors.push(err);
                callCallbackIfReady();
            };
            ++numDownloading;
        }
        textures1[name] = createTexture(gl, options, onLoadFn);
    });
    // queue the callback if there are no images to download.
    // We do this because if your code is structured to wait for
    // images to download but then you comment out all the async
    // images your code would break.
    callCallbackIfReady();
    return textures1;
}
var textures = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    setTextureDefaults_: setDefaults$1,
    createSampler: createSampler,
    createSamplers: createSamplers,
    setSamplerParameters: setSamplerParameters,
    createTexture: createTexture,
    setEmptyTexture: setEmptyTexture,
    setTextureFromArray: setTextureFromArray,
    loadTextureFromUrl: loadTextureFromUrl,
    setTextureFromElement: setTextureFromElement,
    setTextureFilteringForSize: setTextureFilteringForSize,
    setTextureParameters: setTextureParameters,
    setDefaultTextureColor: setDefaultTextureColor,
    createTextures: createTextures,
    resizeTexture: resizeTexture,
    canGenerateMipmap: canGenerateMipmap,
    canFilter: canFilter,
    getNumComponentsForFormat: getNumComponentsForFormat,
    getBytesPerElementForInternalFormat: getBytesPerElementForInternalFormat,
    getFormatAndTypeForInternalFormat: getFormatAndTypeForInternalFormat
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * Low level shader program related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.programs` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/programs
 */ const error$1 = error;
const warn$1 = warn;
function getElementById(id) {
    return typeof document !== 'undefined' && document.getElementById ? document.getElementById(id) : null;
}
const TEXTURE0 = 33984;
const DYNAMIC_DRAW = 35048;
const ARRAY_BUFFER$1 = 34962;
const ELEMENT_ARRAY_BUFFER$1 = 34963;
const UNIFORM_BUFFER = 35345;
const TRANSFORM_FEEDBACK_BUFFER = 35982;
const TRANSFORM_FEEDBACK = 36386;
const COMPILE_STATUS = 35713;
const LINK_STATUS = 35714;
const FRAGMENT_SHADER = 35632;
const VERTEX_SHADER = 35633;
const SEPARATE_ATTRIBS = 35981;
const ACTIVE_UNIFORMS = 35718;
const ACTIVE_ATTRIBUTES = 35721;
const TRANSFORM_FEEDBACK_VARYINGS = 35971;
const ACTIVE_UNIFORM_BLOCKS = 35382;
const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
const UNIFORM_BLOCK_DATA_SIZE = 35392;
const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
const FLOAT$3 = 5126;
const FLOAT_VEC2 = 35664;
const FLOAT_VEC3 = 35665;
const FLOAT_VEC4 = 35666;
const INT$3 = 5124;
const INT_VEC2 = 35667;
const INT_VEC3 = 35668;
const INT_VEC4 = 35669;
const BOOL = 35670;
const BOOL_VEC2 = 35671;
const BOOL_VEC3 = 35672;
const BOOL_VEC4 = 35673;
const FLOAT_MAT2 = 35674;
const FLOAT_MAT3 = 35675;
const FLOAT_MAT4 = 35676;
const SAMPLER_2D = 35678;
const SAMPLER_CUBE = 35680;
const SAMPLER_3D = 35679;
const SAMPLER_2D_SHADOW = 35682;
const FLOAT_MAT2x3 = 35685;
const FLOAT_MAT2x4 = 35686;
const FLOAT_MAT3x2 = 35687;
const FLOAT_MAT3x4 = 35688;
const FLOAT_MAT4x2 = 35689;
const FLOAT_MAT4x3 = 35690;
const SAMPLER_2D_ARRAY = 36289;
const SAMPLER_2D_ARRAY_SHADOW = 36292;
const SAMPLER_CUBE_SHADOW = 36293;
const UNSIGNED_INT$3 = 5125;
const UNSIGNED_INT_VEC2 = 36294;
const UNSIGNED_INT_VEC3 = 36295;
const UNSIGNED_INT_VEC4 = 36296;
const INT_SAMPLER_2D = 36298;
const INT_SAMPLER_3D = 36299;
const INT_SAMPLER_CUBE = 36300;
const INT_SAMPLER_2D_ARRAY = 36303;
const UNSIGNED_INT_SAMPLER_2D = 36306;
const UNSIGNED_INT_SAMPLER_3D = 36307;
const UNSIGNED_INT_SAMPLER_CUBE = 36308;
const UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
const TEXTURE_2D$1 = 3553;
const TEXTURE_CUBE_MAP$1 = 34067;
const TEXTURE_3D$1 = 32879;
const TEXTURE_2D_ARRAY$1 = 35866;
const typeMap = {
};
/**
 * Returns the corresponding bind point for a given sampler type
 */ function getBindPointForSamplerType(gl, type) {
    return typeMap[type].bindPoint;
}
// This kind of sucks! If you could compose functions as in `var fn = gl[name];`
// this code could be a lot smaller but that is sadly really slow (T_T)
function floatSetter(gl, location) {
    return function(v) {
        gl.uniform1f(location, v);
    };
}
function floatArraySetter(gl, location) {
    return function(v) {
        gl.uniform1fv(location, v);
    };
}
function floatVec2Setter(gl, location) {
    return function(v) {
        gl.uniform2fv(location, v);
    };
}
function floatVec3Setter(gl, location) {
    return function(v) {
        gl.uniform3fv(location, v);
    };
}
function floatVec4Setter(gl, location) {
    return function(v) {
        gl.uniform4fv(location, v);
    };
}
function intSetter(gl, location) {
    return function(v) {
        gl.uniform1i(location, v);
    };
}
function intArraySetter(gl, location) {
    return function(v) {
        gl.uniform1iv(location, v);
    };
}
function intVec2Setter(gl, location) {
    return function(v) {
        gl.uniform2iv(location, v);
    };
}
function intVec3Setter(gl, location) {
    return function(v) {
        gl.uniform3iv(location, v);
    };
}
function intVec4Setter(gl, location) {
    return function(v) {
        gl.uniform4iv(location, v);
    };
}
function uintSetter(gl, location) {
    return function(v) {
        gl.uniform1ui(location, v);
    };
}
function uintArraySetter(gl, location) {
    return function(v) {
        gl.uniform1uiv(location, v);
    };
}
function uintVec2Setter(gl, location) {
    return function(v) {
        gl.uniform2uiv(location, v);
    };
}
function uintVec3Setter(gl, location) {
    return function(v) {
        gl.uniform3uiv(location, v);
    };
}
function uintVec4Setter(gl, location) {
    return function(v) {
        gl.uniform4uiv(location, v);
    };
}
function floatMat2Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix2fv(location, false, v);
    };
}
function floatMat3Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix3fv(location, false, v);
    };
}
function floatMat4Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix4fv(location, false, v);
    };
}
function floatMat23Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix2x3fv(location, false, v);
    };
}
function floatMat32Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix3x2fv(location, false, v);
    };
}
function floatMat24Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix2x4fv(location, false, v);
    };
}
function floatMat42Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix4x2fv(location, false, v);
    };
}
function floatMat34Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix3x4fv(location, false, v);
    };
}
function floatMat43Setter(gl, location) {
    return function(v) {
        gl.uniformMatrix4x3fv(location, false, v);
    };
}
function samplerSetter(gl, type, unit, location) {
    const bindPoint = getBindPointForSamplerType(gl, type);
    return isWebGL2(gl) ? function(textureOrPair) {
        let texture;
        let sampler;
        if (isTexture(gl, textureOrPair)) {
            texture = textureOrPair;
            sampler = null;
        } else {
            texture = textureOrPair.texture;
            sampler = textureOrPair.sampler;
        }
        gl.uniform1i(location, unit);
        gl.activeTexture(TEXTURE0 + unit);
        gl.bindTexture(bindPoint, texture);
        gl.bindSampler(unit, sampler);
    } : function(texture) {
        gl.uniform1i(location, unit);
        gl.activeTexture(TEXTURE0 + unit);
        gl.bindTexture(bindPoint, texture);
    };
}
function samplerArraySetter(gl, type, unit, location, size) {
    const bindPoint = getBindPointForSamplerType(gl, type);
    const units = new Int32Array(size);
    for(let ii = 0; ii < size; ++ii)units[ii] = unit + ii;
    return isWebGL2(gl) ? function(textures2) {
        gl.uniform1iv(location, units);
        textures2.forEach(function(textureOrPair, index) {
            gl.activeTexture(TEXTURE0 + units[index]);
            let texture;
            let sampler;
            if (isTexture(gl, textureOrPair)) {
                texture = textureOrPair;
                sampler = null;
            } else {
                texture = textureOrPair.texture;
                sampler = textureOrPair.sampler;
            }
            gl.bindSampler(unit, sampler);
            gl.bindTexture(bindPoint, texture);
        });
    } : function(textures3) {
        gl.uniform1iv(location, units);
        textures3.forEach(function(texture, index) {
            gl.activeTexture(TEXTURE0 + units[index]);
            gl.bindTexture(bindPoint, texture);
        });
    };
}
typeMap[FLOAT$3] = {
    Type: Float32Array,
    size: 4,
    setter: floatSetter,
    arraySetter: floatArraySetter
};
typeMap[FLOAT_VEC2] = {
    Type: Float32Array,
    size: 8,
    setter: floatVec2Setter,
    cols: 2
};
typeMap[FLOAT_VEC3] = {
    Type: Float32Array,
    size: 12,
    setter: floatVec3Setter,
    cols: 3
};
typeMap[FLOAT_VEC4] = {
    Type: Float32Array,
    size: 16,
    setter: floatVec4Setter,
    cols: 4
};
typeMap[INT$3] = {
    Type: Int32Array,
    size: 4,
    setter: intSetter,
    arraySetter: intArraySetter
};
typeMap[INT_VEC2] = {
    Type: Int32Array,
    size: 8,
    setter: intVec2Setter,
    cols: 2
};
typeMap[INT_VEC3] = {
    Type: Int32Array,
    size: 12,
    setter: intVec3Setter,
    cols: 3
};
typeMap[INT_VEC4] = {
    Type: Int32Array,
    size: 16,
    setter: intVec4Setter,
    cols: 4
};
typeMap[UNSIGNED_INT$3] = {
    Type: Uint32Array,
    size: 4,
    setter: uintSetter,
    arraySetter: uintArraySetter
};
typeMap[UNSIGNED_INT_VEC2] = {
    Type: Uint32Array,
    size: 8,
    setter: uintVec2Setter,
    cols: 2
};
typeMap[UNSIGNED_INT_VEC3] = {
    Type: Uint32Array,
    size: 12,
    setter: uintVec3Setter,
    cols: 3
};
typeMap[UNSIGNED_INT_VEC4] = {
    Type: Uint32Array,
    size: 16,
    setter: uintVec4Setter,
    cols: 4
};
typeMap[BOOL] = {
    Type: Uint32Array,
    size: 4,
    setter: intSetter,
    arraySetter: intArraySetter
};
typeMap[BOOL_VEC2] = {
    Type: Uint32Array,
    size: 8,
    setter: intVec2Setter,
    cols: 2
};
typeMap[BOOL_VEC3] = {
    Type: Uint32Array,
    size: 12,
    setter: intVec3Setter,
    cols: 3
};
typeMap[BOOL_VEC4] = {
    Type: Uint32Array,
    size: 16,
    setter: intVec4Setter,
    cols: 4
};
typeMap[FLOAT_MAT2] = {
    Type: Float32Array,
    size: 32,
    setter: floatMat2Setter,
    rows: 2,
    cols: 2
};
typeMap[FLOAT_MAT3] = {
    Type: Float32Array,
    size: 48,
    setter: floatMat3Setter,
    rows: 3,
    cols: 3
};
typeMap[FLOAT_MAT4] = {
    Type: Float32Array,
    size: 64,
    setter: floatMat4Setter,
    rows: 4,
    cols: 4
};
typeMap[FLOAT_MAT2x3] = {
    Type: Float32Array,
    size: 32,
    setter: floatMat23Setter,
    rows: 2,
    cols: 3
};
typeMap[FLOAT_MAT2x4] = {
    Type: Float32Array,
    size: 32,
    setter: floatMat24Setter,
    rows: 2,
    cols: 4
};
typeMap[FLOAT_MAT3x2] = {
    Type: Float32Array,
    size: 48,
    setter: floatMat32Setter,
    rows: 3,
    cols: 2
};
typeMap[FLOAT_MAT3x4] = {
    Type: Float32Array,
    size: 48,
    setter: floatMat34Setter,
    rows: 3,
    cols: 4
};
typeMap[FLOAT_MAT4x2] = {
    Type: Float32Array,
    size: 64,
    setter: floatMat42Setter,
    rows: 4,
    cols: 2
};
typeMap[FLOAT_MAT4x3] = {
    Type: Float32Array,
    size: 64,
    setter: floatMat43Setter,
    rows: 4,
    cols: 3
};
typeMap[SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D$1
};
typeMap[SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_3D$1
};
typeMap[SAMPLER_2D_SHADOW] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D$1
};
typeMap[SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D_ARRAY$1
};
typeMap[SAMPLER_2D_ARRAY_SHADOW] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D_ARRAY$1
};
typeMap[SAMPLER_CUBE_SHADOW] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[INT_SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D$1
};
typeMap[INT_SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_3D$1
};
typeMap[INT_SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[INT_SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D_ARRAY$1
};
typeMap[UNSIGNED_INT_SAMPLER_2D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D$1
};
typeMap[UNSIGNED_INT_SAMPLER_3D] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_3D$1
};
typeMap[UNSIGNED_INT_SAMPLER_CUBE] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
    Type: null,
    size: 0,
    setter: samplerSetter,
    arraySetter: samplerArraySetter,
    bindPoint: TEXTURE_2D_ARRAY$1
};
function floatAttribSetter(gl, index) {
    return function(b) {
        if (b.value) {
            gl.disableVertexAttribArray(index);
            switch(b.value.length){
                case 4:
                    gl.vertexAttrib4fv(index, b.value);
                    break;
                case 3:
                    gl.vertexAttrib3fv(index, b.value);
                    break;
                case 2:
                    gl.vertexAttrib2fv(index, b.value);
                    break;
                case 1:
                    gl.vertexAttrib1fv(index, b.value);
                    break;
                default:
                    throw new Error('the length of a float constant value must be between 1 and 4!');
            }
        } else {
            gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribPointer(index, b.numComponents || b.size, b.type || FLOAT$3, b.normalize || false, b.stride || 0, b.offset || 0);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index, b.divisor);
        }
    };
}
function intAttribSetter(gl, index) {
    return function(b) {
        if (b.value) {
            gl.disableVertexAttribArray(index);
            if (b.value.length === 4) gl.vertexAttrib4iv(index, b.value);
            else throw new Error('The length of an integer constant value must be 4!');
        } else {
            gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || INT$3, b.stride || 0, b.offset || 0);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index, b.divisor);
        }
    };
}
function uintAttribSetter(gl, index) {
    return function(b) {
        if (b.value) {
            gl.disableVertexAttribArray(index);
            if (b.value.length === 4) gl.vertexAttrib4uiv(index, b.value);
            else throw new Error('The length of an unsigned integer constant value must be 4!');
        } else {
            gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || UNSIGNED_INT$3, b.stride || 0, b.offset || 0);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index, b.divisor);
        }
    };
}
function matAttribSetter(gl, index, typeInfo1) {
    const defaultSize = typeInfo1.size;
    const count = typeInfo1.count;
    return function(b) {
        gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
        const numComponents = b.size || b.numComponents || defaultSize;
        const size = numComponents / count;
        const type = b.type || FLOAT$3;
        const typeInfo = typeMap[type];
        const stride = typeInfo.size * numComponents;
        const normalize1 = b.normalize || false;
        const offset = b.offset || 0;
        const rowOffset = stride / count;
        for(let i = 0; i < count; ++i){
            gl.enableVertexAttribArray(index + i);
            gl.vertexAttribPointer(index + i, size, type, normalize1, stride, offset + rowOffset * i);
            if (b.divisor !== undefined) gl.vertexAttribDivisor(index + i, b.divisor);
        }
    };
}
const attrTypeMap = {
};
attrTypeMap[FLOAT$3] = {
    size: 4,
    setter: floatAttribSetter
};
attrTypeMap[FLOAT_VEC2] = {
    size: 8,
    setter: floatAttribSetter
};
attrTypeMap[FLOAT_VEC3] = {
    size: 12,
    setter: floatAttribSetter
};
attrTypeMap[FLOAT_VEC4] = {
    size: 16,
    setter: floatAttribSetter
};
attrTypeMap[INT$3] = {
    size: 4,
    setter: intAttribSetter
};
attrTypeMap[INT_VEC2] = {
    size: 8,
    setter: intAttribSetter
};
attrTypeMap[INT_VEC3] = {
    size: 12,
    setter: intAttribSetter
};
attrTypeMap[INT_VEC4] = {
    size: 16,
    setter: intAttribSetter
};
attrTypeMap[UNSIGNED_INT$3] = {
    size: 4,
    setter: uintAttribSetter
};
attrTypeMap[UNSIGNED_INT_VEC2] = {
    size: 8,
    setter: uintAttribSetter
};
attrTypeMap[UNSIGNED_INT_VEC3] = {
    size: 12,
    setter: uintAttribSetter
};
attrTypeMap[UNSIGNED_INT_VEC4] = {
    size: 16,
    setter: uintAttribSetter
};
attrTypeMap[BOOL] = {
    size: 4,
    setter: intAttribSetter
};
attrTypeMap[BOOL_VEC2] = {
    size: 8,
    setter: intAttribSetter
};
attrTypeMap[BOOL_VEC3] = {
    size: 12,
    setter: intAttribSetter
};
attrTypeMap[BOOL_VEC4] = {
    size: 16,
    setter: intAttribSetter
};
attrTypeMap[FLOAT_MAT2] = {
    size: 4,
    setter: matAttribSetter,
    count: 2
};
attrTypeMap[FLOAT_MAT3] = {
    size: 9,
    setter: matAttribSetter,
    count: 3
};
attrTypeMap[FLOAT_MAT4] = {
    size: 16,
    setter: matAttribSetter,
    count: 4
};
const errorRE = /ERROR:\s*\d+:(\d+)/gi;
function addLineNumbersWithError(src, log = '', lineOffset = 0) {
    // Note: Error message formats are not defined by any spec so this may or may not work.
    const matches = [
        ...log.matchAll(errorRE)
    ];
    const lineNoToErrorMap = new Map(matches.map((m, ndx)=>{
        const lineNo = parseInt(m[1]);
        const next = matches[ndx + 1];
        const end = next ? next.index : log.length;
        const msg = log.substring(m.index, end);
        return [
            lineNo - 1,
            msg
        ];
    }));
    return src.split('\n').map((line, lineNo)=>{
        const err = lineNoToErrorMap.get(lineNo);
        return `${lineNo + 1 + lineOffset}: ${line}${err ? `\n\n^^^ ${err}` : ''}`;
    }).join('\n');
}
/**
 * Error Callback
 * @callback ErrorCallback
 * @param {string} msg error message.
 * @param {number} [lineOffset] amount to add to line number
 * @memberOf module:twgl
 */ const spaceRE = /^[ \t]*\n/;
/**
 * Loads a shader.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} shaderSource The shader source.
 * @param {number} shaderType The type of shader.
 * @param {module:twgl.ErrorCallback} opt_errorCallback callback for errors.
 * @return {WebGLShader} The created shader.
 * @private
 */ function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
    const errFn = opt_errorCallback || error$1;
    // Create the shader object
    const shader = gl.createShader(shaderType);
    // Remove the first end of line because WebGL 2.0 requires
    // #version 300 es
    // as the first line. No whitespace allowed before that line
    // so
    //
    // <script>
    // #version 300 es
    // </script>
    //
    // Has one line before it which is invalid according to GLSL ES 3.00
    //
    let lineOffset = 0;
    if (spaceRE.test(shaderSource)) {
        lineOffset = 1;
        shaderSource = shaderSource.replace(spaceRE, '');
    }
    // Load the shader source
    gl.shaderSource(shader, shaderSource);
    // Compile the shader
    gl.compileShader(shader);
    // Check the compile status
    const compiled = gl.getShaderParameter(shader, COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        const lastError = gl.getShaderInfoLog(shader);
        errFn(`${addLineNumbersWithError(shaderSource, lastError, lineOffset)}\nError compiling ${glEnumToString(gl, shaderType)}: ${lastError}`);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
/**
 * @typedef {Object} ProgramOptions
 * @property {function(string)} [errorCallback] callback for errors
 * @property {Object.<string,number>} [attribLocations] a attribute name to location map
 * @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
 *   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
 *   you can pass an array of names.
 * @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
 * @memberOf module:twgl
 */ /**
 * Gets the program options based on all these optional arguments
 * @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
 * @private
 */ function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
    let transformFeedbackVaryings;
    let transformFeedbackMode;
    if (typeof opt_locations === 'function') {
        opt_errorCallback = opt_locations;
        opt_locations = undefined;
    }
    if (typeof opt_attribs === 'function') {
        opt_errorCallback = opt_attribs;
        opt_attribs = undefined;
    } else if (opt_attribs && !Array.isArray(opt_attribs)) {
        // If we have an errorCallback we can just return this object
        // Otherwise we need to construct one with default errorCallback
        if (opt_attribs.errorCallback) return opt_attribs;
        const opt = opt_attribs;
        opt_errorCallback = opt.errorCallback;
        opt_attribs = opt.attribLocations;
        transformFeedbackVaryings = opt.transformFeedbackVaryings;
        transformFeedbackMode = opt.transformFeedbackMode;
    }
    const options = {
        errorCallback: opt_errorCallback || error$1,
        transformFeedbackVaryings: transformFeedbackVaryings,
        transformFeedbackMode: transformFeedbackMode
    };
    if (opt_attribs) {
        let attribLocations = {
        };
        if (Array.isArray(opt_attribs)) opt_attribs.forEach(function(attrib, ndx) {
            attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
        });
        else attribLocations = opt_attribs;
        options.attribLocations = attribLocations;
    }
    return options;
}
const defaultShaderType = [
    "VERTEX_SHADER",
    "FRAGMENT_SHADER", 
];
function getShaderTypeFromScriptType(gl, scriptType) {
    if (scriptType.indexOf("frag") >= 0) return FRAGMENT_SHADER;
    else if (scriptType.indexOf("vert") >= 0) return VERTEX_SHADER;
    return undefined;
}
function deleteShaders(gl, shaders) {
    shaders.forEach(function(shader) {
        gl.deleteShader(shader);
    });
}
/**
 * Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
 * program and calls useProgram.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgram(gl, [vs, fs], options);
 *     twgl.createProgram(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error.
 * @memberOf module:twgl/programs
 */ function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const realShaders = [];
    const newShaders = [];
    for(let ndx = 0; ndx < shaders.length; ++ndx){
        let shader = shaders[ndx];
        if (typeof shader === 'string') {
            const elem = getElementById(shader);
            const src = elem ? elem.text : shader;
            let type = gl[defaultShaderType[ndx]];
            if (elem && elem.type) type = getShaderTypeFromScriptType(gl, elem.type) || type;
            shader = loadShader(gl, src, type, progOptions.errorCallback);
            newShaders.push(shader);
        }
        if (isShader(gl, shader)) realShaders.push(shader);
    }
    if (realShaders.length !== shaders.length) {
        progOptions.errorCallback("not enough shaders for program");
        deleteShaders(gl, newShaders);
        return null;
    }
    const program = gl.createProgram();
    realShaders.forEach(function(shader) {
        gl.attachShader(program, shader);
    });
    if (progOptions.attribLocations) Object.keys(progOptions.attribLocations).forEach(function(attrib) {
        gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
    });
    let varyings = progOptions.transformFeedbackVaryings;
    if (varyings) {
        if (varyings.attribs) varyings = varyings.attribs;
        if (!Array.isArray(varyings)) varyings = Object.keys(varyings);
        gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || SEPARATE_ATTRIBS);
    }
    gl.linkProgram(program);
    // Check the link status
    const linked = gl.getProgramParameter(program, LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        const lastError = gl.getProgramInfoLog(program);
        progOptions.errorCallback(`${realShaders.map((shader)=>{
            const src = addLineNumbersWithError(gl.getShaderSource(shader), '', 0);
            const type = gl.getShaderParameter(shader, gl.SHADER_TYPE);
            return `${glEnumToString(gl, type)}\n${src}}`;
        }).join('\n')}\nError in program linking: ${lastError}`);
        gl.deleteProgram(program);
        deleteShaders(gl, newShaders);
        return null;
    }
    return program;
}
/**
 * Loads a shader from a script tag.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} scriptId The id of the script tag.
 * @param {number} [opt_shaderType] The type of shader. If not passed in it will
 *     be derived from the type of the script tag.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors.
 * @return {WebGLShader?} The created shader or null if error.
 * @private
 */ function createShaderFromScript(gl, scriptId, opt_shaderType, opt_errorCallback) {
    let shaderSource = "";
    const shaderScript = getElementById(scriptId);
    if (!shaderScript) throw new Error(`unknown script element: ${scriptId}`);
    shaderSource = shaderScript.text;
    const shaderType = opt_shaderType || getShaderTypeFromScriptType(gl, shaderScript.type);
    if (!shaderType) throw new Error('unknown shader type');
    return loadShader(gl, shaderSource, shaderType, opt_errorCallback);
}
/**
 * Creates a program from 2 script tags.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderScriptIds Array of ids of the script
 *        tags for the shaders. The first is assumed to be the
 *        vertex shader, the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error.
 * @memberOf module:twgl/programs
 */ function createProgramFromScripts(gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const shaders = [];
    for(let ii = 0; ii < shaderScriptIds.length; ++ii){
        const shader = createShaderFromScript(gl, shaderScriptIds[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
        if (!shader) return null;
        shaders.push(shader);
    }
    return createProgram(gl, shaders, progOptions);
}
/**
 * Creates a program from 2 sources.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error.
 * @memberOf module:twgl/programs
 */ function createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const shaders = [];
    for(let ii = 0; ii < shaderSources.length; ++ii){
        const shader = loadShader(gl, shaderSources[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
        if (!shader) return null;
        shaders.push(shader);
    }
    return createProgram(gl, shaders, progOptions);
}
/**
 * Returns true if attribute/uniform is a reserved/built in
 *
 * It makes no sense to me why GL returns these because it's
 * illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
 * with names that start with `gl_` (and `webgl_` in WebGL)
 *
 * I can only assume they are there because they might count
 * when computing the number of uniforms/attributes used when you want to
 * know if you are near the limit. That doesn't really make sense
 * to me but the fact that these get returned are in the spec.
 *
 * @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
 *    `gl.getActiveAttrib`.
 * @return {bool} true if it's reserved
 * @private
 */ function isBuiltIn(info) {
    const name = info.name;
    return name.startsWith("gl_") || name.startsWith("webgl_");
}
const tokenRE = /(\.|\[|]|\w+)/g;
const isDigit = (s)=>s >= '0' && s <= '9'
;
function addSetterToUniformTree(fullPath, setter, node1, uniformSetters) {
    const tokens = fullPath.split(tokenRE).filter((s)=>s !== ''
    );
    let tokenNdx = 0;
    let path = '';
    for(;;){
        const token = tokens[tokenNdx++]; // has to be name or number
        path += token;
        const isArrayIndex = isDigit(token[0]);
        const accessor = isArrayIndex ? parseInt(token) : token;
        if (isArrayIndex) path += tokens[tokenNdx++]; // skip ']'
        const isLastToken = tokenNdx === tokens.length;
        if (isLastToken) {
            node1[accessor] = setter;
            break;
        } else {
            const token = tokens[tokenNdx++]; // has to be . or [
            const isArray = token === '[';
            const child = node1[accessor] || (isArray ? [] : {
            });
            node1[accessor] = child;
            node1 = child;
            uniformSetters[path] = uniformSetters[path] || (function(node) {
                return function(value) {
                    setUniformTree(node, value);
                };
            })(child);
            path += token;
        }
    }
}
/**
 * Creates setter functions for all uniforms of a shader
 * program.
 *
 * @see {@link module:twgl.setUniforms}
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @returns {Object.<string, function>} an object with a setter by name for each uniform
 * @memberOf module:twgl/programs
 */ function createUniformSetters(gl, program) {
    let textureUnit = 0;
    /**
   * Creates a setter for a uniform of the given program with it's
   * location embedded in the setter.
   * @param {WebGLProgram} program
   * @param {WebGLUniformInfo} uniformInfo
   * @returns {function} the created setter.
   */ function createUniformSetter(program, uniformInfo, location) {
        const isArray = uniformInfo.name.endsWith("[0]");
        const type = uniformInfo.type;
        const typeInfo = typeMap[type];
        if (!typeInfo) throw new Error(`unknown type: 0x${type.toString(16)}`); // we should never get here.
        let setter;
        if (typeInfo.bindPoint) {
            // it's a sampler
            const unit = textureUnit;
            textureUnit += uniformInfo.size;
            if (isArray) setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
            else setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
        } else if (typeInfo.arraySetter && isArray) setter = typeInfo.arraySetter(gl, location);
        else setter = typeInfo.setter(gl, location);
        setter.location = location;
        return setter;
    }
    const uniformSetters = {
    };
    const uniformTree = {
    };
    const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
    for(let ii = 0; ii < numUniforms; ++ii){
        const uniformInfo = gl.getActiveUniform(program, ii);
        if (isBuiltIn(uniformInfo)) continue;
        let name = uniformInfo.name;
        // remove the array suffix.
        if (name.endsWith("[0]")) name = name.substr(0, name.length - 3);
        const location = gl.getUniformLocation(program, uniformInfo.name);
        // the uniform will have no location if it's in a uniform block
        if (location) {
            const setter = createUniformSetter(program, uniformInfo, location);
            uniformSetters[name] = setter;
            addSetterToUniformTree(name, setter, uniformTree, uniformSetters);
        }
    }
    return uniformSetters;
}
/**
 * @typedef {Object} TransformFeedbackInfo
 * @property {number} index index of transform feedback
 * @property {number} type GL type
 * @property {number} size 1 - 4
 * @memberOf module:twgl
 */ /**
 * Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {Object<string, module:twgl.TransformFeedbackInfo>}
 * @memberOf module:twgl
 */ function createTransformFeedbackInfo(gl, program) {
    const info = {
    };
    const numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
    for(let ii = 0; ii < numVaryings; ++ii){
        const varying = gl.getTransformFeedbackVarying(program, ii);
        info[varying.name] = {
            index: ii,
            type: varying.type,
            size: varying.size
        };
    }
    return info;
}
/**
 * Binds buffers for transform feedback.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {(module:twgl.ProgramInfo|Object<string, module:twgl.TransformFeedbackInfo>)} transformFeedbackInfo A ProgramInfo or TransformFeedbackInfo.
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @memberOf module:twgl
 */ function bindTransformFeedbackInfo(gl, transformFeedbackInfo, bufferInfo) {
    if (transformFeedbackInfo.transformFeedbackInfo) transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
    if (bufferInfo.attribs) bufferInfo = bufferInfo.attribs;
    for(const name in bufferInfo){
        const varying = transformFeedbackInfo[name];
        if (varying) {
            const buf = bufferInfo[name];
            if (buf.offset) gl.bindBufferRange(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
            else gl.bindBufferBase(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
        }
    }
}
/**
 * Creates a transform feedback and sets the buffers
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @return {WebGLTransformFeedback} the created transform feedback
 * @memberOf module:twgl
 */ function createTransformFeedback(gl, programInfo, bufferInfo) {
    const tf = gl.createTransformFeedback();
    gl.bindTransformFeedback(TRANSFORM_FEEDBACK, tf);
    gl.useProgram(programInfo.program);
    bindTransformFeedbackInfo(gl, programInfo, bufferInfo);
    gl.bindTransformFeedback(TRANSFORM_FEEDBACK, null);
    return tf;
}
/**
 * @typedef {Object} UniformData
 * @property {string} name The name of the uniform
 * @property {number} type The WebGL type enum for this uniform
 * @property {number} size The number of elements for this uniform
 * @property {number} blockNdx The block index this uniform appears in
 * @property {number} offset The byte offset in the block for this uniform's value
 * @memberOf module:twgl
 */ /**
 * The specification for one UniformBlockObject
 *
 * @typedef {Object} BlockSpec
 * @property {number} index The index of the block.
 * @property {number} size The size in bytes needed for the block
 * @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
 *    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
 * @property {bool} usedByVertexShader Self explanatory
 * @property {bool} usedByFragmentShader Self explanatory
 * @property {bool} used Self explanatory
 * @memberOf module:twgl
 */ /**
 * A `UniformBlockSpec` represents the data needed to create and bind
 * UniformBlockObjects for a given program
 *
 * @typedef {Object} UniformBlockSpec
 * @property {Object.<string, module:twgl.BlockSpec>} blockSpecs The BlockSpec for each block by block name
 * @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
 * @memberOf module:twgl
 */ /**
 * Creates a UniformBlockSpec for the given program.
 *
 * A UniformBlockSpec represents the data needed to create and bind
 * UniformBlockObjects
 *
 * @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
 * @param {WebGLProgram} program A WebGLProgram for a successfully linked program
 * @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
 * @memberOf module:twgl/programs
 */ function createUniformBlockSpecFromProgram(gl, program) {
    const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
    const uniformData = [];
    const uniformIndices = [];
    for(let ii = 0; ii < numUniforms; ++ii){
        uniformIndices.push(ii);
        uniformData.push({
        });
        const uniformInfo = gl.getActiveUniform(program, ii);
        uniformData[ii].name = uniformInfo.name;
    }
    [
        [
            "UNIFORM_TYPE",
            "type"
        ],
        [
            "UNIFORM_SIZE",
            "size"
        ],
        [
            "UNIFORM_BLOCK_INDEX",
            "blockNdx"
        ],
        [
            "UNIFORM_OFFSET",
            "offset", 
        ], 
    ].forEach(function(pair) {
        const pname = pair[0];
        const key = pair[1];
        gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
            uniformData[ndx][key] = value;
        });
    });
    const blockSpecs = {
    };
    const numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
    for(let ii2 = 0; ii2 < numUniformBlocks; ++ii2){
        const name = gl.getActiveUniformBlockName(program, ii2);
        const blockSpec = {
            index: gl.getUniformBlockIndex(program, name),
            usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii2, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
            usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii2, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
            size: gl.getActiveUniformBlockParameter(program, ii2, UNIFORM_BLOCK_DATA_SIZE),
            uniformIndices: gl.getActiveUniformBlockParameter(program, ii2, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
        };
        blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
        blockSpecs[name] = blockSpec;
    }
    return {
        blockSpecs: blockSpecs,
        uniformData: uniformData
    };
}
const arraySuffixRE = /\[\d+\]\.$/; // better way to check?
const pad = (v, padding)=>((v + (padding - 1)) / padding | 0) * padding
;
function createUniformBlockUniformSetter(view, isArray, rows, cols) {
    if (isArray || rows) {
        cols = cols || 1;
        const numElements = view.length;
        const totalRows = numElements / 4;
        return function(value) {
            let dst = 0;
            let src = 0;
            for(let row = 0; row < totalRows; ++row){
                for(let col = 0; col < cols; ++col)view[dst++] = value[src++];
                dst += 4 - cols;
            }
        };
    } else return function(value) {
        if (value.length) view.set(value);
        else view[0] = value;
    };
}
/**
 * Represents a UniformBlockObject including an ArrayBuffer with all the uniform values
 * and a corresponding WebGLBuffer to hold those values on the GPU
 *
 * @typedef {Object} UniformBlockInfo
 * @property {string} name The name of the block
 * @property {ArrayBuffer} array The array buffer that contains the uniform values
 * @property {Float32Array} asFloat A float view on the array buffer. This is useful
 *    inspecting the contents of the buffer in the debugger.
 * @property {WebGLBuffer} buffer A WebGL buffer that will hold a copy of the uniform values for rendering.
 * @property {number} [offset] offset into buffer
 * @property {Object<string, ArrayBufferView>} uniforms A uniform name to ArrayBufferView map.
 *   each Uniform has a correctly typed `ArrayBufferView` into array at the correct offset
 *   and length of that uniform. So for example a float uniform would have a 1 float `Float32Array`
 *   view. A single mat4 would have a 16 element `Float32Array` view. An ivec2 would have an
 *   `Int32Array` view, etc.
 * @property {Object<string, function>} setters A setter for this uniform.
 *   The reason to use setters is elements of arrays are padded to vec4 sizes which
 *   means if you want to set an array of 4 floats you'd need to set 16 values
 *   (or set elements 0, 4, 8, 12). In other words
 *   `someBlockInfo.uniforms.some4FloatArrayUniform.set([0, , , , 1, , , , 2, , , , 3])`
 *   where as the setter handles just passing in [0, 1, 2, 3] either directly as in
 *   `someBlockInfo.setter.some4FloatArrayUniform.set([0, 1, 2, 3])` (not recommended)
 *   or via {@link module:twgl.setBlockUniforms}
 * @memberOf module:twgl
 */ /**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {WebGLProgram} program A WebGLProgram
 * @param {module:twgl.UniformBlockSpec} uniformBlockSpec. A UniformBlockSpec as returned
 *     from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {string} blockName The name of the block.
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */ function createUniformBlockInfoFromProgram(gl, program, uniformBlockSpec, blockName) {
    const blockSpecs = uniformBlockSpec.blockSpecs;
    const uniformData = uniformBlockSpec.uniformData;
    const blockSpec = blockSpecs[blockName];
    if (!blockSpec) {
        warn$1("no uniform block object named:", blockName);
        return {
            name: blockName,
            uniforms: {
            }
        };
    }
    const array = new ArrayBuffer(blockSpec.size);
    const buffer = gl.createBuffer();
    const uniformBufferIndex = blockSpec.index;
    gl.bindBuffer(UNIFORM_BUFFER, buffer);
    gl.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
    let prefix = blockName + ".";
    if (arraySuffixRE.test(prefix)) prefix = prefix.replace(arraySuffixRE, ".");
    const uniforms = {
    };
    const setters = {
    };
    const setterTree = {
    };
    blockSpec.uniformIndices.forEach(function(uniformNdx) {
        const data = uniformData[uniformNdx];
        let name = data.name;
        if (name.startsWith(prefix)) name = name.substr(prefix.length);
        const isArray = name.endsWith('[0]');
        if (isArray) name = name.substr(0, name.length - 3);
        const typeInfo = typeMap[data.type];
        const Type = typeInfo.Type;
        const byteLength = isArray ? pad(typeInfo.size, 16) * data.size : typeInfo.size * data.size;
        const uniformView = new Type(array, data.offset, byteLength / Type.BYTES_PER_ELEMENT);
        uniforms[name] = uniformView;
        // Note: I'm not sure what to do here. The original
        // idea was to create TypedArray views into each part
        // of the block. This is useful, for example if you have
        // a block with { mat4: model; mat4 view; mat4 projection; }
        // you'll get a Float32Array for each one suitable for
        // passing to most JS math libraries including twgl's and glMatrix.js.
        //
        // But, if you have a an array of structures, especially if that
        // array is large, you get a whole bunch of TypedArray views.
        // Every one of them has overhead and switching between them all
        // is probably a cache miss. In that case it would really be better
        // to just have one view (asFloat) and have all the setters
        // just reference the correct portion. But, then you can't easily
        // treat a matrix, or a vec4, as a standalone thing like you can
        // with all the views.
        //
        // Another problem with the views is they are not shared. With
        // uniforms you have one set of setters. With UniformBlockInfo
        // you have a set of setters *pre block instance*. That's because
        // TypedArray views can't be mapped to different buffers.
        //
        // My gut right now is if you really want the speed and compactness
        // then you should probably roll your own solution. TWGL's goal
        // here is ease of use as AFAICT there is no simple generic efficient
        // solution.
        const setter = createUniformBlockUniformSetter(uniformView, isArray, typeInfo.rows, typeInfo.cols);
        setters[name] = setter;
        addSetterToUniformTree(name, setter, setterTree, setters);
    });
    return {
        name: blockName,
        array,
        asFloat: new Float32Array(array),
        buffer,
        uniforms,
        setters
    };
}
/**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {module:twgl.ProgramInfo} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo}
 * @param {string} blockName The name of the block.
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */ function createUniformBlockInfo(gl, programInfo, blockName) {
    return createUniformBlockInfoFromProgram(gl, programInfo.program, programInfo.uniformBlockSpec, blockName);
}
/**
 * Binds a uniform block to the matching uniform block point.
 * Matches by blocks by name so blocks must have the same name not just the same
 * structure.
 *
 * If you have changed any values and you upload the values into the corresponding WebGLBuffer
 * call {@link module:twgl.setUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @return {bool} true if buffer was bound. If the programInfo has no block with the same block name
 *     no buffer is bound.
 * @memberOf module:twgl/programs
 */ function bindUniformBlock(gl, programInfo, uniformBlockInfo) {
    const uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
    const blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
    if (blockSpec) {
        const bufferBindIndex = blockSpec.index;
        gl.bindBufferRange(UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
        return true;
    }
    return false;
}
/**
 * Uploads the current uniform values to the corresponding WebGLBuffer
 * and binds that buffer to the program's corresponding bind point for the uniform block object.
 *
 * If you haven't changed any values and you only need to bind the uniform block object
 * call {@link module:twgl.bindUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @memberOf module:twgl/programs
 */ function setUniformBlock(gl, programInfo, uniformBlockInfo) {
    if (bindUniformBlock(gl, programInfo, uniformBlockInfo)) gl.bufferData(UNIFORM_BUFFER, uniformBlockInfo.array, DYNAMIC_DRAW);
}
/**
 * Sets values of a uniform block object
 *
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo A UniformBlockInfo as returned by {@link module:twgl.createUniformBlockInfo}.
 * @param {Object.<string, ?>} values A uniform name to value map where the value is correct for the given
 *    type of uniform. So for example given a block like
 *
 *       uniform SomeBlock {
 *         float someFloat;
 *         vec2 someVec2;
 *         vec3 someVec3Array[2];
 *         int someInt;
 *       }
 *
 *  You can set the values of the uniform block with
 *
 *       twgl.setBlockUniforms(someBlockInfo, {
 *          someFloat: 12.3,
 *          someVec2: [1, 2],
 *          someVec3Array: [1, 2, 3, 4, 5, 6],
 *          someInt: 5,
 *       }
 *
 *  Arrays can be JavaScript arrays or typed arrays
 *
 *  You can also fill out structure and array values either via
 *  shortcut. Example
 *
 *     // -- in shader --
 *     struct Light {
 *       float intensity;
 *       vec4 color;
 *     };
 *     uniform Lights {
 *       Light lights[2];
 *     };
 *
 *     // in JavaScript
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       lights: [
 *         { intensity: 5.0, color: [1, 0, 0, 1] },
 *         { intensity: 2.0, color: [0, 0, 1, 1] },
 *       ],
 *     });
 *
 *     // or the more traditional way
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       "lights[0].intensity": 5.0,
 *       "lights[0].color": [1, 0, 0, 1],
 *       "lights[1].intensity": 2.0,
 *       "lights[1].color": [0, 0, 1, 1],
 *     });
 *
 *   You can also specify partial paths
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       'lights[1]: { intensity: 5.0, color: [1, 0, 0, 1] },
 *     });
 *
 *   But you can not specify leaf array indices.
 *
 *  **IMPORTANT!**, packing in a UniformBlock is unintuitive.
 *  For example the actual layout of `someVec3Array` above in memory
 *  is `1, 2, 3, unused, 4, 5, 6, unused`. twgl takes in 6 values
 *  as shown about and copies them, skipping the padding. This might
 *  be confusing if you're already familiar with Uniform blocks.
 *
 *  If you want to deal with the padding yourself you can access the array
 *  buffer views directly. eg:
 *
 *      someBlockInfo.someVec3Array.set([1, 2, 3, 0, 4, 5, 6, 0]);
 *
 *  Any name that doesn't match will be ignored
 * @memberOf module:twgl/programs
 */ function setBlockUniforms(uniformBlockInfo, values) {
    const setters = uniformBlockInfo.setters;
    for(const name in values){
        const setter = setters[name];
        if (setter) {
            const value = values[name];
            setter(value);
        }
    }
}
function setUniformTree(tree, values) {
    for(const name in values){
        const prop = tree[name];
        if (typeof prop === 'function') prop(values[name]);
        else setUniformTree(tree[name], values[name]);
    }
}
/**
 * Set uniforms and binds related textures.
 *
 * example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs"]);
 *
 *     const tex1 = gl.createTexture();
 *     const tex2 = gl.createTexture();
 *
 *     ... assume we setup the textures with data ...
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     gl.useProgram(program);
 *
 * This will automatically bind the textures AND set the
 * uniforms.
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *
 * For the example above it is equivalent to
 *
 *     var texUnit = 0;
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex1);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex2);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
 *     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
 *     gl.uniformMatrix4fv(u_someMatrix, false, [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ]);
 *
 * Note it is perfectly reasonable to call `setUniforms` multiple times. For example
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *     };
 *
 *     const moreUniforms {
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *     twgl.setUniforms(programInfo, moreUniforms);
 *
 * You can also add WebGLSamplers to uniform samplers as in
 *
 *     const uniforms = {
 *       u_someSampler: {
 *         texture: someWebGLTexture,
 *         sampler: someWebGLSampler,
 *       },
 *     };
 *
 * In which case both the sampler and texture will be bound to the
 * same unit.
 *
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 *        uniforms.
 *   You can pass multiple objects by putting them in an array or by calling with more arguments.For example
 *
 *     const sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     const localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     twgl.setUniforms(programInfo, sharedUniforms, localUniforms);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, [sharedUniforms, localUniforms]);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, sharedUniforms);
 *     twgl.setUniforms(programInfo, localUniforms};
 *
 *   You can also fill out structure and array values either via
 *   shortcut. Example
 *
 *     // -- in shader --
 *     struct Light {
 *       float intensity;
 *       vec4 color;
 *     };
 *     uniform Light lights[2];
 *
 *     // in JavaScript
 *
 *     twgl.setUniforms(programInfo, {
 *       lights: [
 *         { intensity: 5.0, color: [1, 0, 0, 1] },
 *         { intensity: 2.0, color: [0, 0, 1, 1] },
 *       ],
 *     });
 *
 *   or the more traditional way
 *
 *     twgl.setUniforms(programInfo, {
 *       "lights[0].intensity": 5.0,
 *       "lights[0].color": [1, 0, 0, 1],
 *       "lights[1].intensity": 2.0,
 *       "lights[1].color": [0, 0, 1, 1],
 *     });
 *
 *   You can also specify partial paths
 *
 *     twgl.setUniforms(programInfo, {
 *       'lights[1]: { intensity: 5.0, color: [1, 0, 0, 1] },
 *     });
 *
 *   But you can not specify leaf array indices
 *
 * @memberOf module:twgl/programs
 */ function setUniforms(setters, ...args) {
    const actualSetters = setters.uniformSetters || setters;
    const numArgs = args.length;
    for(let aNdx = 0; aNdx < numArgs; ++aNdx){
        const values = args[aNdx];
        if (Array.isArray(values)) {
            const numValues = values.length;
            for(let ii = 0; ii < numValues; ++ii)setUniforms(actualSetters, values[ii]);
        } else for(const name in values){
            const setter = actualSetters[name];
            if (setter) setter(values[name]);
        }
    }
}
/**
 * Alias for `setUniforms`
 * @function
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 * @memberOf module:twgl/programs
 */ const setUniformsAndBindTextures = setUniforms;
/**
 * Creates setter functions for all attributes of a shader
 * program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
 *
 * @see {@link module:twgl.setAttributes} for example
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @return {Object.<string, function>} an object with a setter for each attribute by name.
 * @memberOf module:twgl/programs
 */ function createAttributeSetters(gl, program) {
    const attribSetters = {
    };
    const numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
    for(let ii = 0; ii < numAttribs; ++ii){
        const attribInfo = gl.getActiveAttrib(program, ii);
        if (isBuiltIn(attribInfo)) continue;
        const index = gl.getAttribLocation(program, attribInfo.name);
        const typeInfo = attrTypeMap[attribInfo.type];
        const setter = typeInfo.setter(gl, index, typeInfo);
        setter.location = index;
        attribSetters[attribInfo.name] = setter;
    }
    return attribSetters;
}
/**
 * Sets attributes and binds buffers (deprecated... use {@link module:twgl.setBuffersAndAttributes})
 *
 * Example:
 *
 *     const program = createProgramFromScripts(
 *         gl, ["some-vs", "some-fs");
 *
 *     const attribSetters = createAttributeSetters(program);
 *
 *     const positionBuffer = gl.createBuffer();
 *     const texcoordBuffer = gl.createBuffer();
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *     };
 *
 *     gl.useProgram(program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setAttributes(attribSetters, attribs);
 *
 * Properties of attribs. For each attrib you can add
 * properties:
 *
 * *   type: the type of data in the buffer. Default = gl.FLOAT
 * *   normalize: whether or not to normalize the data. Default = false
 * *   stride: the stride. Default = 0
 * *   offset: offset into the buffer. Default = 0
 * *   divisor: the divisor for instances. Default = undefined
 *
 * For example if you had 3 value float positions, 2 value
 * float texcoord and 4 value uint8 colors you'd setup your
 * attribs like this
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *       a_color: {
 *         buffer: colorBuffer,
 *         numComponents: 4,
 *         type: gl.UNSIGNED_BYTE,
 *         normalize: true,
 *       },
 *     };
 *
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} buffers AttribInfos mapped by attribute name.
 * @memberOf module:twgl/programs
 * @deprecated use {@link module:twgl.setBuffersAndAttributes}
 */ function setAttributes(setters, buffers) {
    for(const name in buffers){
        const setter = setters[name];
        if (setter) setter(buffers[name]);
    }
}
/**
 * Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
 *
 * Example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs");
 *
 *     const arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *     };
 *
 *     const bufferInfo = createBufferInfoFromArrays(gl, arrays);
 *
 *     gl.useProgram(programInfo.program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setBuffersAndAttributes(gl, programInfo, bufferInfo);
 *
 * For the example above it is equivalent to
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 *     gl.enableVertexAttribArray(a_positionLocation);
 *     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
 *     gl.enableVertexAttribArray(a_texcoordLocation);
 *     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters A `ProgramInfo` as returned from {@link module:twgl.createProgramInfo} or Attribute setters as returned from {@link module:twgl.createAttributeSetters}
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} buffers a `BufferInfo` as returned from {@link module:twgl.createBufferInfoFromArrays}.
 *   or a `VertexArrayInfo` as returned from {@link module:twgl.createVertexArrayInfo}
 * @memberOf module:twgl/programs
 */ function setBuffersAndAttributes(gl, programInfo, buffers) {
    if (buffers.vertexArrayObject) gl.bindVertexArray(buffers.vertexArrayObject);
    else {
        setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
        if (buffers.indices) gl.bindBuffer(ELEMENT_ARRAY_BUFFER$1, buffers.indices);
    }
}
/**
 * @typedef {Object} ProgramInfo
 * @property {WebGLProgram} program A shader program
 * @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
 * @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
 * @property {module:twgl.UniformBlockSpec} [uniformBlockSpec] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
 * @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
 * @memberOf module:twgl
 */ /**
 * Creates a ProgramInfo from an existing program.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {module:twgl.ProgramInfo} The created ProgramInfo.
 * @memberOf module:twgl/programs
 */ function createProgramInfoFromProgram(gl, program) {
    const uniformSetters = createUniformSetters(gl, program);
    const attribSetters = createAttributeSetters(gl, program);
    const programInfo = {
        program,
        uniformSetters,
        attribSetters
    };
    if (isWebGL2(gl)) {
        programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
        programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
    }
    return programInfo;
}
/**
 * Creates a ProgramInfo from 2 sources.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramInfo(gl, [vs, fs], options);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders or ids. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
 * @memberOf module:twgl/programs
 */ function createProgramInfo(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    let good = true;
    shaderSources = shaderSources.map(function(source) {
        // Lets assume if there is no \n it's an id
        if (source.indexOf("\n") < 0) {
            const script = getElementById(source);
            if (!script) {
                progOptions.errorCallback("no element with id: " + source);
                good = false;
            } else source = script.text;
        }
        return source;
    });
    if (!good) return null;
    const program = createProgramFromSources(gl, shaderSources, progOptions);
    if (!program) return null;
    return createProgramInfoFromProgram(gl, program);
}
var programs = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createAttributeSetters: createAttributeSetters,
    createProgram: createProgram,
    createProgramFromScripts: createProgramFromScripts,
    createProgramFromSources: createProgramFromSources,
    createProgramInfo: createProgramInfo,
    createProgramInfoFromProgram: createProgramInfoFromProgram,
    createUniformSetters: createUniformSetters,
    createUniformBlockSpecFromProgram: createUniformBlockSpecFromProgram,
    createUniformBlockInfoFromProgram: createUniformBlockInfoFromProgram,
    createUniformBlockInfo: createUniformBlockInfo,
    createTransformFeedback: createTransformFeedback,
    createTransformFeedbackInfo: createTransformFeedbackInfo,
    bindTransformFeedbackInfo: bindTransformFeedbackInfo,
    setAttributes: setAttributes,
    setBuffersAndAttributes: setBuffersAndAttributes,
    setUniforms: setUniforms,
    setUniformsAndBindTextures: setUniformsAndBindTextures,
    setUniformBlock: setUniformBlock,
    setBlockUniforms: setBlockUniforms,
    bindUniformBlock: bindUniformBlock
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const TRIANGLES = 4;
const UNSIGNED_SHORT$3 = 5123;
/**
 * Drawing related functions
 *
 * For backward compatibility they are available at both `twgl.draw` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/draw
 */ /**
 * Calls `gl.drawElements` or `gl.drawArrays`, whichever is appropriate
 *
 * normally you'd call `gl.drawElements` or `gl.drawArrays` yourself
 * but calling this means if you switch from indexed data to non-indexed
 * data you don't have to remember to update your draw call.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} bufferInfo A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays} or
 *   a VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @param {number} [type] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...). Defaults to `gl.TRIANGLES`
 * @param {number} [count] An optional count. Defaults to bufferInfo.numElements
 * @param {number} [offset] An optional offset. Defaults to 0.
 * @param {number} [instanceCount] An optional instanceCount. if set then `drawArraysInstanced` or `drawElementsInstanced` will be called
 * @memberOf module:twgl/draw
 */ function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
    type = type === undefined ? TRIANGLES : type;
    const indices = bufferInfo.indices;
    const elementType = bufferInfo.elementType;
    const numElements = count === undefined ? bufferInfo.numElements : count;
    offset = offset === undefined ? 0 : offset;
    if (elementType || indices) {
        if (instanceCount !== undefined) gl.drawElementsInstanced(type, numElements, elementType === undefined ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset, instanceCount);
        else gl.drawElements(type, numElements, elementType === undefined ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset);
    } else if (instanceCount !== undefined) gl.drawArraysInstanced(type, offset, numElements, instanceCount);
    else gl.drawArrays(type, offset, numElements);
}
/**
 * A DrawObject is useful for putting objects in to an array and passing them to {@link module:twgl.drawObjectList}.
 *
 * You need either a `BufferInfo` or a `VertexArrayInfo`.
 *
 * @typedef {Object} DrawObject
 * @property {boolean} [active] whether or not to draw. Default = `true` (must be `false` to be not true). In other words `undefined` = `true`
 * @property {number} [type] type to draw eg. `gl.TRIANGLES`, `gl.LINES`, etc...
 * @property {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @property {module:twgl.BufferInfo} [bufferInfo] A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays}
 * @property {module:twgl.VertexArrayInfo} [vertexArrayInfo] A VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @property {Object<string, ?>} uniforms The values for the uniforms.
 *   You can pass multiple objects by putting them in an array. For example
 *
 *     var sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     var localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     var drawObj = {
 *       ...
 *       uniforms: [sharedUniforms, localUniforms],
 *     };
 *
 * @property {number} [offset] the offset to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to 0.
 * @property {number} [count] the count to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to bufferInfo.numElements.
 * @property {number} [instanceCount] the number of instances. Defaults to undefined.
 * @memberOf module:twgl
 */ /**
 * Draws a list of objects
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {DrawObject[]} objectsToDraw an array of objects to draw.
 * @memberOf module:twgl/draw
 */ function drawObjectList(gl, objectsToDraw) {
    let lastUsedProgramInfo = null;
    let lastUsedBufferInfo = null;
    objectsToDraw.forEach(function(object) {
        if (object.active === false) return;
        const programInfo = object.programInfo;
        const bufferInfo = object.vertexArrayInfo || object.bufferInfo;
        let bindBuffers = false;
        const type = object.type === undefined ? TRIANGLES : object.type;
        if (programInfo !== lastUsedProgramInfo) {
            lastUsedProgramInfo = programInfo;
            gl.useProgram(programInfo.program);
            // We have to rebind buffers when changing programs because we
            // only bind buffers the program uses. So if 2 programs use the same
            // bufferInfo but the 1st one uses only positions the when the
            // we switch to the 2nd one some of the attributes will not be on.
            bindBuffers = true;
        }
        // Setup all the needed attributes.
        if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
            if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) gl.bindVertexArray(null);
            lastUsedBufferInfo = bufferInfo;
            setBuffersAndAttributes(gl, programInfo, bufferInfo);
        }
        // Set the uniforms.
        setUniforms(programInfo, object.uniforms);
        // Draw
        drawBufferInfo(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
    });
    if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) gl.bindVertexArray(null);
}
var draw = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    drawBufferInfo: drawBufferInfo,
    drawObjectList: drawObjectList
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const FRAMEBUFFER = 36160;
const RENDERBUFFER = 36161;
const TEXTURE_2D$2 = 3553;
const UNSIGNED_BYTE$3 = 5121;
/* PixelFormat */ const DEPTH_COMPONENT$1 = 6402;
const RGBA$1 = 6408;
const DEPTH_COMPONENT24$1 = 33190;
const DEPTH_COMPONENT32F$1 = 36012;
const DEPTH24_STENCIL8$1 = 35056;
const DEPTH32F_STENCIL8$1 = 36013;
/* Framebuffer Object. */ const RGBA4$1 = 32854;
const RGB5_A1$1 = 32855;
const RGB565$1 = 36194;
const DEPTH_COMPONENT16$1 = 33189;
const STENCIL_INDEX = 6401;
const STENCIL_INDEX8 = 36168;
const DEPTH_STENCIL$1 = 34041;
const COLOR_ATTACHMENT0 = 36064;
const DEPTH_ATTACHMENT = 36096;
const STENCIL_ATTACHMENT = 36128;
const DEPTH_STENCIL_ATTACHMENT = 33306;
/* TextureWrapMode */ const CLAMP_TO_EDGE$1 = 33071;
/* TextureMagFilter */ const LINEAR$1 = 9729;
/**
 * The options for a framebuffer attachment.
 *
 * Note: For a `format` that is a texture include all the texture
 * options from {@link module:twgl.TextureOptions} for example
 * `min`, `mag`, `clamp`, etc... Note that unlike {@link module:twgl.TextureOptions}
 * `auto` defaults to `false` for attachment textures but `min` and `mag` default
 * to `gl.LINEAR` and `wrap` defaults to `CLAMP_TO_EDGE`
 *
 * @typedef {Object} AttachmentOptions
 * @property {number} [attachmentPoint] The attachment point. Defaults
 *   to `gl.COLOR_ATTACHMENT0 + ndx` unless type is a depth or stencil type
 *   then it's gl.DEPTH_ATTACHMENT or `gl.DEPTH_STENCIL_ATTACHMENT` depending
 *   on the format or attachment type.
 * @property {number} [format] The format. If one of `gl.RGBA4`,
 *   `gl.RGB565`, `gl.RGB5_A1`, `gl.DEPTH_COMPONENT16`,
 *   `gl.STENCIL_INDEX8` or `gl.DEPTH_STENCIL` then will create a
 *   renderbuffer. Otherwise will create a texture. Default = `gl.RGBA`
 * @property {number} [type] The type. Used for texture. Default = `gl.UNSIGNED_BYTE`.
 * @property {number} [target] The texture target for `gl.framebufferTexture2D`.
 *   Defaults to `gl.TEXTURE_2D`. Set to appropriate face for cube maps.
 * @property {number} [level] level for `gl.framebufferTexture2D`. Defaults to 0.
 * @property {number} [layer] layer for `gl.framebufferTextureLayer`. Defaults to undefined.
 *   If set then `gl.framebufferTextureLayer` is called, if not then `gl.framebufferTexture2D`
 * @property {(WebGLRenderbuffer | WebGLTexture)} [attachment] An existing renderbuffer or texture.
 *    If provided will attach this Object. This allows you to share
 *    attachments across framebuffers.
 * @memberOf module:twgl
 * @mixes module:twgl.TextureOptions
 */ const defaultAttachments = [
    {
        format: RGBA$1,
        type: UNSIGNED_BYTE$3,
        min: LINEAR$1,
        wrap: CLAMP_TO_EDGE$1
    },
    {
        format: DEPTH_STENCIL$1
    }, 
];
const attachmentsByFormat = {
};
attachmentsByFormat[DEPTH_STENCIL$1] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT16$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT24$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT32F$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH24_STENCIL8$1] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH32F_STENCIL8$1] = DEPTH_STENCIL_ATTACHMENT;
function getAttachmentPointForFormat(format, internalFormat) {
    return attachmentsByFormat[format] || attachmentsByFormat[internalFormat];
}
const renderbufferFormats = {
};
renderbufferFormats[RGBA4$1] = true;
renderbufferFormats[RGB5_A1$1] = true;
renderbufferFormats[RGB565$1] = true;
renderbufferFormats[DEPTH_STENCIL$1] = true;
renderbufferFormats[DEPTH_COMPONENT16$1] = true;
renderbufferFormats[STENCIL_INDEX] = true;
renderbufferFormats[STENCIL_INDEX8] = true;
function isRenderbufferFormat(format) {
    return renderbufferFormats[format];
}
/**
 * @typedef {Object} FramebufferInfo
 * @property {WebGLFramebuffer} framebuffer The WebGLFramebuffer for this framebufferInfo
 * @property {Array.<(WebGLRenderbuffer | WebGLTexture)>} attachments The created attachments in the same order as passed in to {@link module:twgl.createFramebufferInfo}.
 * @property {number} width The width of the framebuffer and its attachments
 * @property {number} height The width of the framebuffer and its attachments
 * @memberOf module:twgl
 */ /**
 * Creates a framebuffer and attachments.
 *
 * This returns a {@link module:twgl.FramebufferInfo} because it needs to return the attachments as well as the framebuffer.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 * Passing in a specific size
 *
 *     const width = 256;
 *     const height = 256;
 *     const fbi = twgl.createFramebufferInfo(gl, attachments, width, height);
 *
 * **Note!!** It is up to you to check if the framebuffer is renderable by calling `gl.checkFramebufferStatus`.
 * [WebGL1 only guarantees 3 combinations of attachments work](https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.6).
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.AttachmentOptions[]} [attachments] which attachments to create. If not provided the default is a framebuffer with an
 *    `RGBA`, `UNSIGNED_BYTE` texture `COLOR_ATTACHMENT0` and a `DEPTH_STENCIL` renderbuffer `DEPTH_STENCIL_ATTACHMENT`.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @return {module:twgl.FramebufferInfo} the framebuffer and attachments.
 * @memberOf module:twgl/framebuffers
 */ function createFramebufferInfo(gl, attachments, width, height) {
    const target = FRAMEBUFFER;
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(target, fb);
    width = width || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;
    attachments = attachments || defaultAttachments;
    let colorAttachmentCount = 0;
    const framebufferInfo = {
        framebuffer: fb,
        attachments: [],
        width: width,
        height: height
    };
    attachments.forEach(function(attachmentOptions) {
        let attachment = attachmentOptions.attachment;
        const format = attachmentOptions.format;
        let attachmentPoint = attachmentOptions.attachmentPoint || getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
        if (!attachmentPoint) attachmentPoint = COLOR_ATTACHMENT0 + colorAttachmentCount++;
        if (!attachment) {
            if (isRenderbufferFormat(format)) {
                attachment = gl.createRenderbuffer();
                gl.bindRenderbuffer(RENDERBUFFER, attachment);
                gl.renderbufferStorage(RENDERBUFFER, format, width, height);
            } else {
                const textureOptions = Object.assign({
                }, attachmentOptions);
                textureOptions.width = width;
                textureOptions.height = height;
                if (textureOptions.auto === undefined) {
                    textureOptions.auto = false;
                    textureOptions.min = textureOptions.min || textureOptions.minMag || LINEAR$1;
                    textureOptions.mag = textureOptions.mag || textureOptions.minMag || LINEAR$1;
                    textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || CLAMP_TO_EDGE$1;
                    textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || CLAMP_TO_EDGE$1;
                }
                attachment = createTexture(gl, textureOptions);
            }
        }
        if (isRenderbuffer(gl, attachment)) gl.framebufferRenderbuffer(target, attachmentPoint, RENDERBUFFER, attachment);
        else if (isTexture(gl, attachment)) {
            if (attachmentOptions.layer !== undefined) gl.framebufferTextureLayer(target, attachmentPoint, attachment, attachmentOptions.level || 0, attachmentOptions.layer);
            else gl.framebufferTexture2D(target, attachmentPoint, attachmentOptions.target || TEXTURE_2D$2, attachment, attachmentOptions.level || 0);
        } else throw new Error('unknown attachment type');
        framebufferInfo.attachments.push(attachment);
    });
    return framebufferInfo;
}
/**
 * Resizes the attachments of a framebuffer.
 *
 * You need to pass in the same `attachments` as you passed in {@link module:twgl.createFramebufferInfo}
 * because TWGL has no idea the format/type of each attachment.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments
 *         twgl.resizeFramebufferInfo(gl, fbi);
 *       }
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments to match
 *         twgl.resizeFramebufferInfo(gl, fbi, attachments);
 *       }
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo} framebufferInfo a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 * @param {module:twgl.AttachmentOptions[]} [attachments] the same attachments options as passed to {@link module:twgl.createFramebufferInfo}.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @memberOf module:twgl/framebuffers
 */ function resizeFramebufferInfo(gl, framebufferInfo, attachments, width, height) {
    width = width || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;
    framebufferInfo.width = width;
    framebufferInfo.height = height;
    attachments = attachments || defaultAttachments;
    attachments.forEach(function(attachmentOptions, ndx) {
        const attachment = framebufferInfo.attachments[ndx];
        const format = attachmentOptions.format;
        if (isRenderbuffer(gl, attachment)) {
            gl.bindRenderbuffer(RENDERBUFFER, attachment);
            gl.renderbufferStorage(RENDERBUFFER, format, width, height);
        } else if (isTexture(gl, attachment)) resizeTexture(gl, attachment, attachmentOptions, width, height);
        else throw new Error('unknown attachment type');
    });
}
/**
 * Binds a framebuffer
 *
 * This function pretty much solely exists because I spent hours
 * trying to figure out why something I wrote wasn't working only
 * to realize I forget to set the viewport dimensions.
 * My hope is this function will fix that.
 *
 * It is effectively the same as
 *
 *     gl.bindFramebuffer(gl.FRAMEBUFFER, someFramebufferInfo.framebuffer);
 *     gl.viewport(0, 0, someFramebufferInfo.width, someFramebufferInfo.height);
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo|null} [framebufferInfo] a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 *   If falsy will bind the canvas.
 * @param {number} [target] The target. If not passed `gl.FRAMEBUFFER` will be used.
 * @memberOf module:twgl/framebuffers
 */ function bindFramebufferInfo(gl, framebufferInfo, target) {
    target = target || FRAMEBUFFER;
    if (framebufferInfo) {
        gl.bindFramebuffer(target, framebufferInfo.framebuffer);
        gl.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
    } else {
        gl.bindFramebuffer(target, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
}
var framebuffers = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    bindFramebufferInfo: bindFramebufferInfo,
    createFramebufferInfo: createFramebufferInfo,
    resizeFramebufferInfo: resizeFramebufferInfo
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ /**
 * vertex array object related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.attributes` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/vertexArrays
 */ const ELEMENT_ARRAY_BUFFER$2 = 34963;
/**
 * @typedef {Object} VertexArrayInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLVertexArrayObject} [vertexArrayObject] a vertex array object
 * @memberOf module:twgl
 */ /**
 * Creates a VertexArrayInfo from a BufferInfo and one or more ProgramInfos
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * > **IMPORTANT:** Vertex Array Objects are **not** a direct analog for a BufferInfo. Vertex Array Objects
 *   assign buffers to specific attributes at creation time. That means they can only be used with programs
 *   who's attributes use the same attribute locations for the same purposes.
 *
 * > Bind your attribute locations by passing an array of attribute names to {@link module:twgl.createProgramInfo}
 *   or use WebGL 2's GLSL ES 3's `layout(location = <num>)` to make sure locations match.
 *
 * also
 *
 * > **IMPORTANT:** After calling twgl.setBuffersAndAttribute with a BufferInfo that uses a Vertex Array Object
 *   that Vertex Array Object will be bound. That means **ANY MANIPULATION OF ELEMENT_ARRAY_BUFFER or ATTRIBUTES**
 *   will affect the Vertex Array Object state.
 *
 * > Call `gl.bindVertexArray(null)` to get back manipulating the global attributes and ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.ProgramInfo|module:twgl.ProgramInfo[]} programInfo a programInfo or array of programInfos
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 *
 *    You need to make sure every attribute that will be used is bound. So for example assume shader 1
 *    uses attributes A, B, C and shader 2 uses attributes A, B, D. If you only pass in the programInfo
 *    for shader 1 then only attributes A, B, and C will have their attributes set because TWGL doesn't
 *    now attribute D's location.
 *
 *    So, you can pass in both shader 1 and shader 2's programInfo
 *
 * @return {module:twgl.VertexArrayInfo} The created VertexArrayInfo
 *
 * @memberOf module:twgl/vertexArrays
 */ function createVertexArrayInfo(gl, programInfos, bufferInfo) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    if (!programInfos.length) programInfos = [
        programInfos
    ];
    programInfos.forEach(function(programInfo) {
        setBuffersAndAttributes(gl, programInfo, bufferInfo);
    });
    gl.bindVertexArray(null);
    return {
        numElements: bufferInfo.numElements,
        elementType: bufferInfo.elementType,
        vertexArrayObject: vao
    };
}
/**
 * Creates a vertex array object and then sets the attributes on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} attribs AttribInfos mapped by attribute name.
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 * @memberOf module:twgl/vertexArrays
 */ function createVAOAndSetAttributes(gl, setters, attribs, indices) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    setAttributes(setters, attribs);
    if (indices) gl.bindBuffer(ELEMENT_ARRAY_BUFFER$2, indices);
    // We unbind this because otherwise any change to ELEMENT_ARRAY_BUFFER
    // like when creating buffers for other stuff will mess up this VAO's binding
    gl.bindVertexArray(null);
    return vao;
}
/**
 * Creates a vertex array object and then sets the attributes
 * on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {Object.<string, function>| module:twgl.ProgramInfo} programInfo as returned from createProgramInfo or Attribute setters as returned from createAttributeSetters
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 * @memberOf module:twgl/vertexArrays
 */ function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
    return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
}
var vertexArrays = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createVertexArrayInfo: createVertexArrayInfo,
    createVAOAndSetAttributes: createVAOAndSetAttributes,
    createVAOFromBufferInfo: createVAOFromBufferInfo
});
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */ const defaults$2 = {
    addExtensionsToContext: true
};
/**
 * Various default settings for twgl.
 *
 * Note: You can call this any number of times. Example:
 *
 *     twgl.setDefaults({ textureColor: [1, 0, 0, 1] });
 *     twgl.setDefaults({ attribPrefix: 'a_' });
 *
 * is equivalent to
 *
 *     twgl.setDefaults({
 *       textureColor: [1, 0, 0, 1],
 *       attribPrefix: 'a_',
 *     });
 *
 * @typedef {Object} Defaults
 * @property {string} [attribPrefix] The prefix to stick on attributes
 *
 *   When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 *   as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 *   In other words I'll create arrays of geometry like this
 *
 *       const arrays = {
 *         position: ...
 *         normal: ...
 *         texcoord: ...
 *       };
 *
 *   But need those mapped to attributes and my attributes start with `a_`.
 *
 *   Default: `""`
 *
 * @property {number[]} [textureColor] Array of 4 values in the range 0 to 1
 *
 *   The default texture color is used when loading textures from
 *   urls. Because the URL will be loaded async we'd like to be
 *   able to use the texture immediately. By putting a 1x1 pixel
 *   color in the texture we can start using the texture before
 *   the URL has loaded.
 *
 *   Default: `[0.5, 0.75, 1, 1]`
 *
 * @property {string} [crossOrigin]
 *
 *   If not undefined sets the crossOrigin attribute on images
 *   that twgl creates when downloading images for textures.
 *
 *   Also see {@link module:twgl.TextureOptions}.
 *
 * @property {bool} [addExtensionsToContext]
 *
 *   If true, then, when twgl will try to add any supported WebGL extensions
 *   directly to the context under their normal GL names. For example
 *   if ANGLE_instances_arrays exists then twgl would enable it,
 *   add the functions `vertexAttribDivisor`, `drawArraysInstanced`,
 *   `drawElementsInstanced`, and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR`
 *   to the `WebGLRenderingContext`.
 *
 * @memberOf module:twgl
 */ /**
 * Sets various defaults for twgl.
 *
 * In the interest of terseness which is kind of the point
 * of twgl I've integrated a few of the older functions here
 *
 * @param {module:twgl.Defaults} newDefaults The default settings.
 * @memberOf module:twgl
 */ function setDefaults$2(newDefaults) {
    copyExistingProperties(newDefaults, defaults$2);
    setDefaults(newDefaults); // eslint-disable-line
    setDefaults$1(newDefaults); // eslint-disable-line
}
const prefixRE = /^(.*?)_/;
function addExtensionToContext(gl, extensionName) {
    glEnumToString(gl, 0);
    const ext = gl.getExtension(extensionName);
    if (ext) {
        const enums = {
        };
        const fnSuffix = prefixRE.exec(extensionName)[1];
        const enumSuffix = '_' + fnSuffix;
        for(const key in ext){
            const value = ext[key];
            const isFunc = typeof value === 'function';
            const suffix = isFunc ? fnSuffix : enumSuffix;
            let name = key;
            // examples of where this is not true are WEBGL_compressed_texture_s3tc
            // and WEBGL_compressed_texture_pvrtc
            if (key.endsWith(suffix)) name = key.substring(0, key.length - suffix.length);
            if (gl[name] !== undefined) {
                if (!isFunc && gl[name] !== value) warn(name, gl[name], value, key);
            } else if (isFunc) gl[name] = (function(origFn) {
                return function() {
                    return origFn.apply(ext, arguments);
                };
            })(value);
            else {
                gl[name] = value;
                enums[name] = value;
            }
        }
        // pass the modified enums to glEnumToString
        enums.constructor = {
            name: ext.constructor.name
        };
        glEnumToString(enums, 0);
    }
    return ext;
}
/*
 * If you're wondering why the code doesn't just iterate
 * over all extensions using `gl.getExtensions` is that it's possible
 * some future extension is incompatible with this code. Rather than
 * have thing suddenly break it seems better to manually add to this
 * list.
 *
 */ const supportedExtensions = [
    'ANGLE_instanced_arrays',
    'EXT_blend_minmax',
    'EXT_color_buffer_float',
    'EXT_color_buffer_half_float',
    'EXT_disjoint_timer_query',
    'EXT_disjoint_timer_query_webgl2',
    'EXT_frag_depth',
    'EXT_sRGB',
    'EXT_shader_texture_lod',
    'EXT_texture_filter_anisotropic',
    'OES_element_index_uint',
    'OES_standard_derivatives',
    'OES_texture_float',
    'OES_texture_float_linear',
    'OES_texture_half_float',
    'OES_texture_half_float_linear',
    'OES_vertex_array_object',
    'WEBGL_color_buffer_float',
    'WEBGL_compressed_texture_atc',
    'WEBGL_compressed_texture_etc1',
    'WEBGL_compressed_texture_pvrtc',
    'WEBGL_compressed_texture_s3tc',
    'WEBGL_compressed_texture_s3tc_srgb',
    'WEBGL_depth_texture',
    'WEBGL_draw_buffers', 
];
/**
 * Attempts to enable all of the following extensions
 * and add their functions and constants to the
 * `WebGLRenderingContext` using their normal non-extension like names.
 *
 *      ANGLE_instanced_arrays
 *      EXT_blend_minmax
 *      EXT_color_buffer_float
 *      EXT_color_buffer_half_float
 *      EXT_disjoint_timer_query
 *      EXT_disjoint_timer_query_webgl2
 *      EXT_frag_depth
 *      EXT_sRGB
 *      EXT_shader_texture_lod
 *      EXT_texture_filter_anisotropic
 *      OES_element_index_uint
 *      OES_standard_derivatives
 *      OES_texture_float
 *      OES_texture_float_linear
 *      OES_texture_half_float
 *      OES_texture_half_float_linear
 *      OES_vertex_array_object
 *      WEBGL_color_buffer_float
 *      WEBGL_compressed_texture_atc
 *      WEBGL_compressed_texture_etc1
 *      WEBGL_compressed_texture_pvrtc
 *      WEBGL_compressed_texture_s3tc
 *      WEBGL_compressed_texture_s3tc_srgb
 *      WEBGL_depth_texture
 *      WEBGL_draw_buffers
 *
 * For example if `ANGLE_instanced_arrays` exists then the functions
 * `drawArraysInstanced`, `drawElementsInstanced`, `vertexAttribDivisor`
 * and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR` are added to the
 * `WebGLRenderingContext`.
 *
 * Note that if you want to know if the extension exists you should
 * probably call `gl.getExtension` for each extension. Alternatively
 * you can check for the existence of the functions or constants that
 * are expected to be added. For example
 *
 *    if (gl.drawBuffers) {
 *      // Either WEBGL_draw_buffers was enabled OR you're running in WebGL2
 *      ....
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @memberOf module:twgl
 */ function addExtensionsToContext(gl) {
    for(let ii = 0; ii < supportedExtensions.length; ++ii)addExtensionToContext(gl, supportedExtensions[ii]);
}
/**
 * Creates a webgl context.
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 * @private
 */ function create3DContext(canvas, opt_attribs) {
    const names = [
        "webgl",
        "experimental-webgl"
    ];
    let context = null;
    for(let ii = 0; ii < names.length; ++ii){
        context = canvas.getContext(names[ii], opt_attribs);
        if (context) {
            if (defaults$2.addExtensionsToContext) addExtensionsToContext(context);
            break;
        }
    }
    return context;
}
/**
 * Gets a WebGL1 context.
 *
 * Note: Will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 */ function getWebGLContext(canvas, opt_attribs) {
    const gl = create3DContext(canvas, opt_attribs);
    return gl;
}
/**
 * Creates a webgl context.
 *
 * Will return a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *     twgl.isWebGL2(gl);
 *
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 */ function createContext(canvas, opt_attribs) {
    const names = [
        "webgl2",
        "webgl",
        "experimental-webgl"
    ];
    let context = null;
    for(let ii = 0; ii < names.length; ++ii){
        context = canvas.getContext(names[ii], opt_attribs);
        if (context) {
            if (defaults$2.addExtensionsToContext) addExtensionsToContext(context);
            break;
        }
    }
    return context;
}
/**
 * Gets a WebGL context.  Will create a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *    function isWebGL2(gl) {
 *      return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0 ") == 0;
 *    }
 *
 * Note: For a WebGL1 context will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 */ function getContext(canvas, opt_attribs) {
    const gl = createContext(canvas, opt_attribs);
    return gl;
}
/**
 * Resize a canvas to match the size it's displayed.
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] So you can pass in `window.devicePixelRatio` or other scale value if you want to.
 * @return {boolean} true if the canvas was resized.
 * @memberOf module:twgl
 */ function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    multiplier = Math.max(0, multiplier);
    const width = canvas.clientWidth * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"66abI"}]},["samz6","cHDZM"], "cHDZM", "parcelRequire9975")

//# sourceMappingURL=offscreen-webgl-worker.93069879.js.map
