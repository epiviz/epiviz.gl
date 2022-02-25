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
})({"6pGph":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "ba41afb566944471";
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

},{}],"2nuXh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _toolbar = require("./toolbar");
var _toolbarDefault = parcelHelpers.interopDefault(_toolbar);
var _ = require("../../src/");
var _Default = parcelHelpers.interopDefault(_);
var _store = require("./store");
var _storeDefault = parcelHelpers.interopDefault(_store);
class App {
    /**
   * The webgl visualization components are meant to leave application
   * state up to the developers, and this subscription is an example of
   * using redux to update the plot.
   */ subscription() {
        const currState = this.store.getState();
        const specification = _store.getIfChanged("specification");
        if (specification) document.getElementById("specification-editor").value = specification;
        this.visualization.setViewOptions({
            ...currState
        });
    }
    onSpecificationSubmit() {
        const specificationAsString = document.getElementById("specification-editor").value;
        const specification = JSON.parse(specificationAsString);
        this.visualization.setSpecification(specification);
    }
    onWindowResize() {
        this.visualization.setCanvasSize(this.visualization.parent.clientWidth, this.visualization.parent.clientHeight);
    }
    /*
      The App class is meant to emulate an app that may use the webgl visualization as a component
  */ constructor(){
        const container = document.querySelector(".content");
        this.visualization = new _Default.default(container);
        this.visualization.addToDom(true);
        // Demonstration of adding mouse events
        this.visualization.addEventListener("zoomIn", (event)=>console.log("zoomIn", event)
        );
        this.visualization.addEventListener("zoomOut", (event)=>console.log("zoomOut", event)
        );
        this.visualization.addEventListener("onSelection", (event)=>console.log("onSelection", event)
        );
        this.visualization.addEventListener("onSelectionEnd", (event)=>console.log("onSelectionEnd", event)
        );
        this.visualization.addEventListener("pointHovered", (event)=>console.log("pointHovered", event)
        );
        this.visualization.addEventListener("pan", (event)=>console.log("pan", event)
        );
        this.store = _storeDefault.default;
        this.store.subscribe(this.subscription.bind(this));
        const toolbar = new _toolbarDefault.default(this.store.dispatch);
        toolbar.init();
        document.getElementById("refresh-specification").onclick = this.onSpecificationSubmit.bind(this);
        window.addEventListener("resize", this.onWindowResize.bind(this));
        // choose the tsne as the default visualization
        let selem = document.getElementById("specification-select");
        selem.value = "tsne-10th";
        selem.dispatchEvent(new Event('change'));
        document.getElementById("refresh-specification").click();
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    window.app = new App(); // Add to window for testing purposes
});

},{"./toolbar":"dB9U1","../../src/":"8lqZg","./store":"6khvc","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"dB9U1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _reducers = require("./reducers");
var _areaChart = require("../examples/area-chart");
var _areaChartDefault = parcelHelpers.interopDefault(_areaChart);
var _doubleLinePlot = require("../examples/double-line-plot");
var _doubleLinePlotDefault = parcelHelpers.interopDefault(_doubleLinePlot);
var _linePlot = require("../examples/line-plot");
var _linePlotDefault = parcelHelpers.interopDefault(_linePlot);
var _stackedAreaChart = require("../examples/stacked-area-chart");
var _stackedAreaChartDefault = parcelHelpers.interopDefault(_stackedAreaChart);
var _tickChart = require("../examples/tick-chart");
var _tickChartDefault = parcelHelpers.interopDefault(_tickChart);
var _tsne = require("../examples/tsne");
var _tsneDefault = parcelHelpers.interopDefault(_tsne);
var _tsne10Th = require("../examples/tsne-10th");
var _tsne10ThDefault = parcelHelpers.interopDefault(_tsne10Th);
var _tsne100Th = require("../examples/tsne-100th");
var _tsne100ThDefault = parcelHelpers.interopDefault(_tsne100Th);
var _inlineData = require("../examples/inline-data");
var _inlineDataDefault = parcelHelpers.interopDefault(_inlineData);
var _doubleInlineData = require("../examples/double-inline-data");
var _doubleInlineDataDefault = parcelHelpers.interopDefault(_doubleInlineData);
var _tinyScatter = require("../examples/tiny-scatter");
var _tinyScatterDefault = parcelHelpers.interopDefault(_tinyScatter);
var _scatterGrid = require("../examples/scatter-grid");
var _scatterGridDefault = parcelHelpers.interopDefault(_scatterGrid);
var _scatterGridMargins = require("../examples/scatter-grid-margins");
var _scatterGridMarginsDefault = parcelHelpers.interopDefault(_scatterGridMargins);
var _heatmap = require("../examples/heatmap");
var _heatmapDefault = parcelHelpers.interopDefault(_heatmap);
var _signedBarChart = require("../examples/signed-bar-chart");
var _signedBarChartDefault = parcelHelpers.interopDefault(_signedBarChart);
var _verticalSignedBarChart = require("../examples/vertical-signed-bar-chart");
var _verticalSignedBarChartDefault = parcelHelpers.interopDefault(_verticalSignedBarChart);
var _arcTrack = require("../examples/arc-track");
var _arcTrackDefault = parcelHelpers.interopDefault(_arcTrack);
var _boxTrack = require("../examples/box-track");
var _boxTrackDefault = parcelHelpers.interopDefault(_boxTrack);
var _lineTrack = require("../examples/line-track");
var _lineTrackDefault = parcelHelpers.interopDefault(_lineTrack);
var _allTracks = require("../examples/all-tracks");
var _allTracksDefault = parcelHelpers.interopDefault(_allTracks);
var _matrix = require("../examples/matrix");
var _matrixDefault = parcelHelpers.interopDefault(_matrix);
var _dataDefinedChannels = require("../examples/data-defined-channels");
var _dataDefinedChannelsDefault = parcelHelpers.interopDefault(_dataDefinedChannels);
const exampleMap = new Map([
    [
        "area-chart",
        _areaChartDefault.default
    ],
    [
        "double-line-plot",
        _doubleLinePlotDefault.default
    ],
    [
        "line-plot",
        _linePlotDefault.default
    ],
    [
        "stacked-area-chart",
        _stackedAreaChartDefault.default
    ],
    [
        "tick-chart",
        _tickChartDefault.default
    ],
    [
        "tsne",
        _tsneDefault.default
    ],
    [
        "tsne-10th",
        _tsne10ThDefault.default
    ],
    [
        "tsne-100th",
        _tsne100ThDefault.default
    ],
    [
        "inline-data",
        _inlineDataDefault.default
    ],
    [
        "double-inline-data",
        _doubleInlineDataDefault.default
    ],
    [
        "tiny-scatter",
        _tinyScatterDefault.default
    ],
    [
        "scatter-grid",
        _scatterGridDefault.default
    ],
    [
        "heatmap",
        _heatmapDefault.default
    ],
    [
        "signed-bar-chart",
        _signedBarChartDefault.default
    ],
    [
        "vertical-signed-bar-chart",
        _verticalSignedBarChartDefault.default
    ],
    [
        "arc-track",
        _arcTrackDefault.default
    ],
    [
        "box-track",
        _boxTrackDefault.default
    ],
    [
        "line-track",
        _lineTrackDefault.default
    ],
    [
        "all-tracks",
        _allTracksDefault.default
    ],
    [
        "scatter-grid-margins",
        _scatterGridMarginsDefault.default
    ],
    [
        "matrix",
        _matrixDefault.default
    ],
    [
        "data-defined-channels",
        _dataDefinedChannelsDefault.default
    ], 
]);
class Toolbar {
    /**
   * Initializes the tool bar by adding event listeners
   */ init() {
        document.getElementById("lock-x").addEventListener("change", (event)=>{
            this.dispatch(_reducers.setScroll({
                axis: "x",
                checked: event.target.checked
            }));
        });
        document.getElementById("lock-y").addEventListener("change", (event)=>{
            this.dispatch(_reducers.setScroll({
                axis: "y",
                checked: event.target.checked
            }));
        });
        document.getElementById("specification-select").value = this.specification;
        this.dispatch(_reducers.setSpecification(exampleMap.get(this.specification)));
        document.getElementById("specification-select").addEventListener("change", (event)=>{
            this.specification = event.target.value;
            this.dispatch(_reducers.setSpecification(exampleMap.get(this.specification)));
        });
        this.prevIcon = null; // force only 1 icon to have selected class
        document.querySelectorAll(".controls img").forEach((icon)=>{
            icon.addEventListener("click", ()=>{
                // useless hack to save lines of code
                if (this.prevIcon) this.prevIcon.classList.remove("selected");
                this.mouseAction = icon.alt.substring(0, icon.alt.indexOf(" "));
                this.dispatch(_reducers.setTool(this.mouseAction));
                icon.classList.add("selected");
                this.prevIcon = icon;
            });
        });
    }
    /**
   * Sets the display for the current selection window in the toolbar
   *
   * @param {Array} currentXRange array of length 2 with current X range
   * @param {Array} currentYRange array of length 2 with current Y range
   */ updateSelectionWindowDisplay(currentXRange, currentYRange) {
        // This may slow down the rendering since it needs to call the DOM before animating, may need to remove for true benchmark
        document.querySelector(".selection-window").textContent = `[${currentXRange[0].toFixed(4)}, ${currentXRange[1].toFixed(4)}] x [${currentYRange[0].toFixed(4)}, ${currentYRange[1].toFixed(4)}]`;
    }
    /**
   * A class meant to handle changing options on the scatter plot
   * @param {Function} dispatch method from store to dispatch redux actions
   */ constructor(dispatch){
        this.dispatch = dispatch;
        this.mouseAction = "pan";
        this.specification = "csv10";
    }
}
exports.default = Toolbar;

},{"./reducers":"2CYeh","../examples/area-chart":"c1xED","../examples/double-line-plot":"8qOwi","../examples/line-plot":"eJjvn","../examples/stacked-area-chart":"7DR17","../examples/tick-chart":"iZia4","../examples/tsne":"jscmt","../examples/tsne-10th":"awbvc","../examples/tsne-100th":"b2QWF","../examples/inline-data":"2mTRJ","../examples/double-inline-data":"deqtp","../examples/tiny-scatter":"HwNk8","../examples/scatter-grid":"kscvo","../examples/scatter-grid-margins":"8hY3s","../examples/heatmap":"kkyRp","../examples/signed-bar-chart":"euJgB","../examples/vertical-signed-bar-chart":"hZRNf","../examples/arc-track":"kUs70","../examples/box-track":"dwpb9","../examples/line-track":"5dxPu","../examples/all-tracks":"cIB1u","../examples/matrix":"aLChf","../examples/data-defined-channels":"9nZ8g","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2CYeh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setSpecification", ()=>setSpecification
);
parcelHelpers.export(exports, "setTool", ()=>setTool
);
parcelHelpers.export(exports, "setScroll", ()=>setScroll
);
var _toolkit = require("@reduxjs/toolkit");
var _tsne10Th = require("../examples/tsne-10th");
var _tsne10ThDefault = parcelHelpers.interopDefault(_tsne10Th);
const controlsSlice = _toolkit.createSlice({
    name: "webglControls",
    initialState: {
        tool: "pan",
        specification: _tsne10ThDefault.default,
        lockedX: false,
        lockedY: false
    },
    reducers: {
        setSpecification (state, action) {
            state.specification = action.payload;
        },
        setTool (state, action) {
            state.tool = action.payload;
        },
        setScroll (state, action) {
            if (action.payload.axis === "x") state.lockedX = action.payload.checked;
            else if (action.payload.axis === "y") state.lockedY = action.payload.checked;
        }
    }
});
const { setSpecification , setTool , setScroll  } = controlsSlice.actions;
exports.default = controlsSlice.reducer;

},{"@reduxjs/toolkit":"lL1Ef","../examples/tsne-10th":"awbvc","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"lL1Ef":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MiddlewareArray", ()=>MiddlewareArray
);
parcelHelpers.export(exports, "configureStore", ()=>configureStore
);
parcelHelpers.export(exports, "createAction", ()=>createAction
);
parcelHelpers.export(exports, "createAsyncThunk", ()=>createAsyncThunk
);
parcelHelpers.export(exports, "createDraftSafeSelector", ()=>createDraftSafeSelector
);
parcelHelpers.export(exports, "createEntityAdapter", ()=>createEntityAdapter
);
parcelHelpers.export(exports, "createImmutableStateInvariantMiddleware", ()=>createImmutableStateInvariantMiddleware
);
parcelHelpers.export(exports, "createNextState", ()=>_immerDefault.default
);
parcelHelpers.export(exports, "createReducer", ()=>createReducer
);
parcelHelpers.export(exports, "createSelector", ()=>_reselect.createSelector
);
parcelHelpers.export(exports, "createSerializableStateInvariantMiddleware", ()=>createSerializableStateInvariantMiddleware
);
parcelHelpers.export(exports, "createSlice", ()=>createSlice
);
parcelHelpers.export(exports, "current", ()=>_immer.current
);
parcelHelpers.export(exports, "findNonSerializableValue", ()=>findNonSerializableValue
);
parcelHelpers.export(exports, "freeze", ()=>_immer.freeze
);
parcelHelpers.export(exports, "getDefaultMiddleware", ()=>getDefaultMiddleware
);
parcelHelpers.export(exports, "getType", ()=>getType
);
parcelHelpers.export(exports, "isAllOf", ()=>isAllOf
);
parcelHelpers.export(exports, "isAnyOf", ()=>isAnyOf
);
parcelHelpers.export(exports, "isAsyncThunkAction", ()=>isAsyncThunkAction
);
parcelHelpers.export(exports, "isDraft", ()=>_immer.isDraft
);
parcelHelpers.export(exports, "isFulfilled", ()=>isFulfilled
);
parcelHelpers.export(exports, "isImmutableDefault", ()=>isImmutableDefault
);
parcelHelpers.export(exports, "isPending", ()=>isPending
);
parcelHelpers.export(exports, "isPlain", ()=>isPlain
);
parcelHelpers.export(exports, "isPlainObject", ()=>isPlainObject
);
parcelHelpers.export(exports, "isRejected", ()=>isRejected
);
parcelHelpers.export(exports, "isRejectedWithValue", ()=>isRejectedWithValue
);
parcelHelpers.export(exports, "miniSerializeError", ()=>miniSerializeError
);
parcelHelpers.export(exports, "nanoid", ()=>nanoid
);
parcelHelpers.export(exports, "original", ()=>_immer.original
);
parcelHelpers.export(exports, "unwrapResult", ()=>unwrapResult
);
// src/index.ts
var _immer = require("immer");
var _immerDefault = parcelHelpers.interopDefault(_immer);
var _reselect = require("reselect");
// src/configureStore.ts
var _redux = require("redux");
// src/getDefaultMiddleware.ts
var _reduxThunk = require("redux-thunk");
var _reduxThunkDefault = parcelHelpers.interopDefault(_reduxThunk);
parcelHelpers.exportAll(_redux, exports);
var __extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
};
var __spreadArray = undefined && undefined.__spreadArray || function(to, from) {
    for(var i = 0, il = from.length, j = to.length; i < il; i++, j++)to[j] = from[i];
    return to;
};
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function(obj, key, value) {
    return key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value
    }) : obj[key] = value;
};
var __spreadValues = function(a, b) {
    for(var prop in b || (b = {
    }))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for(var _i = 0, _b = __getOwnPropSymbols(b); _i < _b.length; _i++){
        var prop = _b[_i];
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = function(a, b) {
    return __defProps(a, __getOwnPropDescs(b));
};
var __async = function(__this, __arguments, generator) {
    return new Promise(function(resolve, reject) {
        var fulfilled = function(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function(x) {
            return x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(__this, __arguments)).next());
    });
};
var createDraftSafeSelector = function() {
    var args = [];
    for(var _i1 = 0; _i1 < arguments.length; _i1++)args[_i1] = arguments[_i1];
    var selector = _reselect.createSelector.apply(void 0, args);
    var wrappedSelector = function(value) {
        var rest = [];
        for(var _i = 1; _i < arguments.length; _i++)rest[_i - 1] = arguments[_i];
        return selector.apply(void 0, __spreadArray([
            _immer.isDraft(value) ? _immer.current(value) : value
        ], rest));
    };
    return wrappedSelector;
};
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
    if (arguments.length === 0) return void 0;
    if (typeof arguments[0] === "object") return _redux.compose;
    return _redux.compose.apply(null, arguments);
};
var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
    return function(noop) {
        return noop;
    };
};
// src/isPlainObject.ts
function isPlainObject(value) {
    if (typeof value !== "object" || value === null) return false;
    var proto = value;
    while(Object.getPrototypeOf(proto) !== null)proto = Object.getPrototypeOf(proto);
    return Object.getPrototypeOf(value) === proto;
}
// src/utils.ts
function getTimeMeasureUtils(maxDelay, fnName) {
    var elapsed = 0;
    return {
        measureTime: function(fn) {
            var started = Date.now();
            try {
                return fn();
            } finally{
                var finished = Date.now();
                elapsed += finished - started;
            }
        },
        warnIfExceeded: function() {
            if (elapsed > maxDelay) console.warn(fnName + " took " + elapsed + "ms, which is more than the warning threshold of " + maxDelay + "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.");
        }
    };
}
var MiddlewareArray = function(_super) {
    __extends(MiddlewareArray1, _super);
    function MiddlewareArray1() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        var _this = _super.apply(this, args) || this;
        Object.setPrototypeOf(_this, MiddlewareArray1.prototype);
        return _this;
    }
    Object.defineProperty(MiddlewareArray1, Symbol.species, {
        get: function() {
            return MiddlewareArray1;
        },
        enumerable: false,
        configurable: true
    });
    MiddlewareArray1.prototype.concat = function() {
        var arr = [];
        for(var _i = 0; _i < arguments.length; _i++)arr[_i] = arguments[_i];
        return _super.prototype.concat.apply(this, arr);
    };
    MiddlewareArray1.prototype.prepend = function() {
        var arr = [];
        for(var _i = 0; _i < arguments.length; _i++)arr[_i] = arguments[_i];
        if (arr.length === 1 && Array.isArray(arr[0])) return new (MiddlewareArray1.bind.apply(MiddlewareArray1, __spreadArray([
            void 0
        ], arr[0].concat(this))))();
        return new (MiddlewareArray1.bind.apply(MiddlewareArray1, __spreadArray([
            void 0
        ], arr.concat(this))))();
    };
    return MiddlewareArray1;
}(Array);
// src/immutableStateInvariantMiddleware.ts
var isProduction = false;
var prefix = "Invariant failed";
function invariant(condition, message) {
    if (condition) return;
    if (isProduction) throw new Error(prefix);
    throw new Error(prefix + ": " + (message || ""));
}
function stringify(obj, serializer, indent, decycler) {
    return JSON.stringify(obj, getSerialize(serializer, decycler), indent);
}
function getSerialize(serializer, decycler) {
    var stack = [], keys = [];
    if (!decycler) decycler = function(_, value) {
        if (stack[0] === value) return "[Circular ~]";
        return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
    };
    return function(key, value) {
        if (stack.length > 0) {
            var thisPos = stack.indexOf(this);
            ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
            ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
            if (~stack.indexOf(value)) value = decycler.call(this, key, value);
        } else stack.push(value);
        return serializer == null ? value : serializer.call(this, key, value);
    };
}
function isImmutableDefault(value) {
    return typeof value !== "object" || value === null || typeof value === "undefined" || Object.isFrozen(value);
}
function trackForMutations(isImmutable, ignorePaths, obj) {
    var trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
    return {
        detectMutations: function() {
            return detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
        }
    };
}
function trackProperties(isImmutable, ignorePaths, obj, path) {
    if (ignorePaths === void 0) ignorePaths = [];
    if (path === void 0) path = "";
    var tracked = {
        value: obj
    };
    if (!isImmutable(obj)) {
        tracked.children = {
        };
        for(var key in obj){
            var childPath = path ? path + "." + key : key;
            if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) continue;
            tracked.children[key] = trackProperties(isImmutable, ignorePaths, obj[key], childPath);
        }
    }
    return tracked;
}
function detectMutations(isImmutable, ignorePaths, trackedProperty, obj, sameParentRef, path) {
    if (ignorePaths === void 0) ignorePaths = [];
    if (sameParentRef === void 0) sameParentRef = false;
    if (path === void 0) path = "";
    var prevObj = trackedProperty ? trackedProperty.value : void 0;
    var sameRef = prevObj === obj;
    if (sameParentRef && !sameRef && !Number.isNaN(obj)) return {
        wasMutated: true,
        path: path
    };
    if (isImmutable(prevObj) || isImmutable(obj)) return {
        wasMutated: false
    };
    var keysToDetect = {
    };
    for(var key in trackedProperty.children)keysToDetect[key] = true;
    for(var key in obj)keysToDetect[key] = true;
    for(var key in keysToDetect){
        var childPath = path ? path + "." + key : key;
        if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) continue;
        var result = detectMutations(isImmutable, ignorePaths, trackedProperty.children[key], obj[key], sameRef, childPath);
        if (result.wasMutated) return result;
    }
    return {
        wasMutated: false
    };
}
function createImmutableStateInvariantMiddleware(options) {
    if (options === void 0) options = {
    };
    var next1, action1;
    var _b1 = options.isImmutable, isImmutable = _b1 === void 0 ? isImmutableDefault : _b1, ignoredPaths = options.ignoredPaths, _c = options.warnAfter, warnAfter = _c === void 0 ? 32 : _c, ignore = options.ignore;
    ignoredPaths = ignoredPaths || ignore;
    var track = trackForMutations.bind(null, isImmutable, ignoredPaths);
    return function(_b) {
        var getState = _b.getState;
        var state = getState();
        var tracker = track(state);
        var result;
        return function(next) {
            return function(action) {
                var measureUtils = getTimeMeasureUtils(warnAfter, "ImmutableStateInvariantMiddleware");
                measureUtils.measureTime(function() {
                    state = getState();
                    result = tracker.detectMutations();
                    tracker = track(state);
                    invariant(!result.wasMutated, "A state mutation was detected between dispatches, in the path '" + (result.path || "") + "'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
                });
                var dispatchedAction = next(action);
                measureUtils.measureTime(function() {
                    state = getState();
                    result = tracker.detectMutations();
                    tracker = track(state);
                    result.wasMutated && invariant(!result.wasMutated, "A state mutation was detected inside a dispatch, in the path: " + (result.path || "") + ". Take a look at the reducer(s) handling the action " + stringify(action) + ". (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
                });
                measureUtils.warnIfExceeded();
                return dispatchedAction;
            };
        };
    };
}
// src/serializableStateInvariantMiddleware.ts
function isPlain(val) {
    var type = typeof val;
    return type === "undefined" || val === null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || isPlainObject(val);
}
function findNonSerializableValue(value, path, isSerializable, getEntries, ignoredPaths) {
    if (path === void 0) path = "";
    if (isSerializable === void 0) isSerializable = isPlain;
    if (ignoredPaths === void 0) ignoredPaths = [];
    var foundNestedSerializable;
    if (!isSerializable(value)) return {
        keyPath: path || "<root>",
        value: value
    };
    if (typeof value !== "object" || value === null) return false;
    var entries = getEntries != null ? getEntries(value) : Object.entries(value);
    var hasIgnoredPaths = ignoredPaths.length > 0;
    for(var _i = 0, entries_1 = entries; _i < entries_1.length; _i++){
        var _b = entries_1[_i], key = _b[0], nestedValue = _b[1];
        var nestedPath = path ? path + "." + key : key;
        if (hasIgnoredPaths && ignoredPaths.indexOf(nestedPath) >= 0) continue;
        if (!isSerializable(nestedValue)) return {
            keyPath: nestedPath,
            value: nestedValue
        };
        if (typeof nestedValue === "object") {
            foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths);
            if (foundNestedSerializable) return foundNestedSerializable;
        }
    }
    return false;
}
function createSerializableStateInvariantMiddleware(options) {
    if (options === void 0) options = {
    };
    var next2, action2;
    var _b = options.isSerializable, isSerializable = _b === void 0 ? isPlain : _b, getEntries = options.getEntries, _c = options.ignoredActions, ignoredActions = _c === void 0 ? [] : _c, _d = options.ignoredActionPaths, ignoredActionPaths = _d === void 0 ? [
        "meta.arg",
        "meta.baseQueryMeta"
    ] : _d, _e = options.ignoredPaths, ignoredPaths = _e === void 0 ? [] : _e, _f = options.warnAfter, warnAfter = _f === void 0 ? 32 : _f, _g = options.ignoreState, ignoreState = _g === void 0 ? false : _g;
    return function(storeAPI) {
        return function(next) {
            return function(action) {
                if (ignoredActions.length && ignoredActions.indexOf(action.type) !== -1) return next(action);
                var measureUtils = getTimeMeasureUtils(warnAfter, "SerializableStateInvariantMiddleware");
                measureUtils.measureTime(function() {
                    var foundActionNonSerializableValue = findNonSerializableValue(action, "", isSerializable, getEntries, ignoredActionPaths);
                    if (foundActionNonSerializableValue) {
                        var keyPath = foundActionNonSerializableValue.keyPath, value = foundActionNonSerializableValue.value;
                        console.error("A non-serializable value was detected in an action, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the logic that dispatched this action: ", action, "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)", "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)");
                    }
                });
                var result = next(action);
                if (!ignoreState) {
                    measureUtils.measureTime(function() {
                        var state = storeAPI.getState();
                        var foundStateNonSerializableValue = findNonSerializableValue(state, "", isSerializable, getEntries, ignoredPaths);
                        if (foundStateNonSerializableValue) {
                            var keyPath = foundStateNonSerializableValue.keyPath, value = foundStateNonSerializableValue.value;
                            console.error("A non-serializable value was detected in the state, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the reducer(s) handling this action type: " + action.type + ".\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)");
                        }
                    });
                    measureUtils.warnIfExceeded();
                }
                return result;
            };
        };
    };
}
// src/getDefaultMiddleware.ts
function isBoolean(x) {
    return typeof x === "boolean";
}
function curryGetDefaultMiddleware() {
    return function curriedGetDefaultMiddleware(options) {
        return getDefaultMiddleware(options);
    };
}
function getDefaultMiddleware(options) {
    if (options === void 0) options = {
    };
    var _b = options.thunk, thunk = _b === void 0 ? true : _b, _c = options.immutableCheck, immutableCheck = _c === void 0 ? true : _c, _d = options.serializableCheck, serializableCheck = _d === void 0 ? true : _d;
    var middlewareArray = new MiddlewareArray();
    if (thunk) {
        if (isBoolean(thunk)) middlewareArray.push(_reduxThunkDefault.default);
        else middlewareArray.push(_reduxThunkDefault.default.withExtraArgument(thunk.extraArgument));
    }
    if (immutableCheck) {
        var immutableOptions = {
        };
        if (!isBoolean(immutableCheck)) immutableOptions = immutableCheck;
        middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
    }
    if (serializableCheck) {
        var serializableOptions = {
        };
        if (!isBoolean(serializableCheck)) serializableOptions = serializableCheck;
        middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
    }
    return middlewareArray;
}
// src/configureStore.ts
var IS_PRODUCTION = false;
function configureStore(options) {
    var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
    var _b = options || {
    }, _c = _b.reducer, reducer = _c === void 0 ? void 0 : _c, _d = _b.middleware, middleware = _d === void 0 ? curriedGetDefaultMiddleware() : _d, _e = _b.devTools, devTools = _e === void 0 ? true : _e, _f = _b.preloadedState, preloadedState = _f === void 0 ? void 0 : _f, _g = _b.enhancers, enhancers = _g === void 0 ? void 0 : _g;
    var rootReducer;
    if (typeof reducer === "function") rootReducer = reducer;
    else if (isPlainObject(reducer)) rootReducer = _redux.combineReducers(reducer);
    else throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
    var finalMiddleware = middleware;
    if (typeof finalMiddleware === "function") {
        finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
        if (!IS_PRODUCTION && !Array.isArray(finalMiddleware)) throw new Error("when using a middleware builder function, an array of middleware must be returned");
    }
    if (!IS_PRODUCTION && finalMiddleware.some(function(item) {
        return typeof item !== "function";
    })) throw new Error("each middleware provided to configureStore must be a function");
    var middlewareEnhancer = _redux.applyMiddleware.apply(void 0, finalMiddleware);
    var finalCompose = _redux.compose;
    if (devTools) finalCompose = composeWithDevTools(__spreadValues({
        trace: !IS_PRODUCTION
    }, typeof devTools === "object" && devTools));
    var storeEnhancers = [
        middlewareEnhancer
    ];
    if (Array.isArray(enhancers)) storeEnhancers = __spreadArray([
        middlewareEnhancer
    ], enhancers);
    else if (typeof enhancers === "function") storeEnhancers = enhancers(storeEnhancers);
    var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
    return _redux.createStore(rootReducer, preloadedState, composedEnhancer);
}
// src/createAction.ts
function createAction(type, prepareAction) {
    function actionCreator() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (prepareAction) {
            var prepared = prepareAction.apply(void 0, args);
            if (!prepared) throw new Error("prepareAction did not return an object");
            return __spreadValues(__spreadValues({
                type: type,
                payload: prepared.payload
            }, "meta" in prepared && {
                meta: prepared.meta
            }), "error" in prepared && {
                error: prepared.error
            });
        }
        return {
            type: type,
            payload: args[0]
        };
    }
    actionCreator.toString = function() {
        return "" + type;
    };
    actionCreator.type = type;
    actionCreator.match = function(action) {
        return action.type === type;
    };
    return actionCreator;
}
function isFSA(action) {
    return isPlainObject(action) && typeof action.type === "string" && Object.keys(action).every(isValidKey);
}
function isValidKey(key) {
    return [
        "type",
        "payload",
        "error",
        "meta"
    ].indexOf(key) > -1;
}
function getType(actionCreator) {
    return "" + actionCreator;
}
// src/mapBuilders.ts
function executeReducerBuilderCallback(builderCallback) {
    var actionsMap = {
    };
    var actionMatchers = [];
    var defaultCaseReducer;
    var builder = {
        addCase: function(typeOrActionCreator, reducer) {
            if (actionMatchers.length > 0) throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");
            if (defaultCaseReducer) throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");
            var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
            if (type in actionsMap) throw new Error("addCase cannot be called with two reducers for the same action type");
            actionsMap[type] = reducer;
            return builder;
        },
        addMatcher: function(matcher, reducer) {
            if (defaultCaseReducer) throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
            actionMatchers.push({
                matcher: matcher,
                reducer: reducer
            });
            return builder;
        },
        addDefaultCase: function(reducer) {
            if (defaultCaseReducer) throw new Error("`builder.addDefaultCase` can only be called once");
            defaultCaseReducer = reducer;
            return builder;
        }
    };
    builderCallback(builder);
    return [
        actionsMap,
        actionMatchers,
        defaultCaseReducer
    ];
}
// src/createReducer.ts
function createReducer(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
    if (actionMatchers === void 0) actionMatchers = [];
    var _b2 = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [
        mapOrBuilderCallback,
        actionMatchers,
        defaultCaseReducer
    ], actionsMap = _b2[0], finalActionMatchers = _b2[1], finalDefaultCaseReducer = _b2[2];
    var frozenInitialState = _immerDefault.default(initialState, function() {
    });
    return function(state, action) {
        if (state === void 0) state = frozenInitialState;
        var caseReducers = __spreadArray([
            actionsMap[action.type]
        ], finalActionMatchers.filter(function(_b) {
            var matcher = _b.matcher;
            return matcher(action);
        }).map(function(_b) {
            var reducer = _b.reducer;
            return reducer;
        }));
        if (caseReducers.filter(function(cr) {
            return !!cr;
        }).length === 0) caseReducers = [
            finalDefaultCaseReducer
        ];
        return caseReducers.reduce(function(previousState, caseReducer) {
            if (caseReducer) {
                if (_immer.isDraft(previousState)) {
                    var draft = previousState;
                    var result = caseReducer(draft, action);
                    if (typeof result === "undefined") return previousState;
                    return result;
                } else if (!_immer.isDraftable(previousState)) {
                    var result = caseReducer(previousState, action);
                    if (typeof result === "undefined") {
                        if (previousState === null) return previousState;
                        throw Error("A case reducer on a non-draftable value must not return undefined");
                    }
                    return result;
                } else return _immerDefault.default(previousState, function(draft) {
                    return caseReducer(draft, action);
                });
            }
            return previousState;
        }, state);
    };
}
// src/createSlice.ts
function getType2(slice, actionKey) {
    return slice + "/" + actionKey;
}
function createSlice(options) {
    var name = options.name, initialState = options.initialState;
    if (!name) throw new Error("`name` is a required option for createSlice");
    var reducers = options.reducers || {
    };
    var _b = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [
        options.extraReducers
    ], _c = _b[0], extraReducers = _c === void 0 ? {
    } : _c, _d = _b[1], actionMatchers = _d === void 0 ? [] : _d, _e = _b[2], defaultCaseReducer = _e === void 0 ? void 0 : _e;
    var reducerNames = Object.keys(reducers);
    var sliceCaseReducersByName = {
    };
    var sliceCaseReducersByType = {
    };
    var actionCreators = {
    };
    reducerNames.forEach(function(reducerName) {
        var maybeReducerWithPrepare = reducers[reducerName];
        var type = getType2(name, reducerName);
        var caseReducer;
        var prepareCallback;
        if ("reducer" in maybeReducerWithPrepare) {
            caseReducer = maybeReducerWithPrepare.reducer;
            prepareCallback = maybeReducerWithPrepare.prepare;
        } else caseReducer = maybeReducerWithPrepare;
        sliceCaseReducersByName[reducerName] = caseReducer;
        sliceCaseReducersByType[type] = caseReducer;
        actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
    });
    var finalCaseReducers = __spreadValues(__spreadValues({
    }, extraReducers), sliceCaseReducersByType);
    var reducer = createReducer(initialState, finalCaseReducers, actionMatchers, defaultCaseReducer);
    return {
        name: name,
        reducer: reducer,
        actions: actionCreators,
        caseReducers: sliceCaseReducersByName
    };
}
// src/entities/entity_state.ts
function getInitialEntityState() {
    return {
        ids: [],
        entities: {
        }
    };
}
function createInitialStateFactory() {
    function getInitialState(additionalState) {
        if (additionalState === void 0) additionalState = {
        };
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return {
        getInitialState: getInitialState
    };
}
// src/entities/state_selectors.ts
function createSelectorsFactory() {
    function getSelectors(selectState) {
        var selectIds = function(state) {
            return state.ids;
        };
        var selectEntities = function(state) {
            return state.entities;
        };
        var selectAll = createDraftSafeSelector(selectIds, selectEntities, function(ids, entities) {
            return ids.map(function(id) {
                return entities[id];
            });
        });
        var selectId = function(_, id) {
            return id;
        };
        var selectById = function(entities, id) {
            return entities[id];
        };
        var selectTotal = createDraftSafeSelector(selectIds, function(ids) {
            return ids.length;
        });
        if (!selectState) return {
            selectIds: selectIds,
            selectEntities: selectEntities,
            selectAll: selectAll,
            selectTotal: selectTotal,
            selectById: createDraftSafeSelector(selectEntities, selectId, selectById)
        };
        var selectGlobalizedEntities = createDraftSafeSelector(selectState, selectEntities);
        return {
            selectIds: createDraftSafeSelector(selectState, selectIds),
            selectEntities: selectGlobalizedEntities,
            selectAll: createDraftSafeSelector(selectState, selectAll),
            selectTotal: createDraftSafeSelector(selectState, selectTotal),
            selectById: createDraftSafeSelector(selectGlobalizedEntities, selectId, selectById)
        };
    }
    return {
        getSelectors: getSelectors
    };
}
function createSingleArgumentStateOperator(mutator) {
    var operator = createStateOperator(function(_, state) {
        return mutator(state);
    });
    return function operation(state) {
        return operator(state, void 0);
    };
}
function createStateOperator(mutator) {
    return function operation(state, arg) {
        function isPayloadActionArgument(arg2) {
            return isFSA(arg2);
        }
        var runMutator = function(draft) {
            if (isPayloadActionArgument(arg)) mutator(arg.payload, draft);
            else mutator(arg, draft);
        };
        if (_immer.isDraft(state)) {
            runMutator(state);
            return state;
        } else return _immerDefault.default(state, runMutator);
    };
}
// src/entities/utils.ts
function selectIdValue(entity, selectId) {
    var key = selectId(entity);
    if (key === void 0) console.warn("The entity passed to the `selectId` implementation returned undefined.", "You should probably provide your own `selectId` implementation.", "The entity that was passed:", entity, "The `selectId` implementation:", selectId.toString());
    return key;
}
function ensureEntitiesArray(entities) {
    if (!Array.isArray(entities)) entities = Object.values(entities);
    return entities;
}
function splitAddedUpdatedEntities(newEntities, selectId, state) {
    newEntities = ensureEntitiesArray(newEntities);
    var added = [];
    var updated = [];
    for(var _i = 0, newEntities_1 = newEntities; _i < newEntities_1.length; _i++){
        var entity = newEntities_1[_i];
        var id = selectIdValue(entity, selectId);
        if (id in state.entities) updated.push({
            id: id,
            changes: entity
        });
        else added.push(entity);
    }
    return [
        added,
        updated
    ];
}
// src/entities/unsorted_state_adapter.ts
function createUnsortedStateAdapter(selectId) {
    function addOneMutably(entity, state) {
        var key = selectIdValue(entity, selectId);
        if (key in state.entities) return;
        state.ids.push(key);
        state.entities[key] = entity;
    }
    function addManyMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        for(var _i = 0, newEntities_2 = newEntities; _i < newEntities_2.length; _i++){
            var entity = newEntities_2[_i];
            addOneMutably(entity, state);
        }
    }
    function setOneMutably(entity, state) {
        var key = selectIdValue(entity, selectId);
        if (!(key in state.entities)) state.ids.push(key);
        state.entities[key] = entity;
    }
    function setManyMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        for(var _i = 0, newEntities_3 = newEntities; _i < newEntities_3.length; _i++){
            var entity = newEntities_3[_i];
            setOneMutably(entity, state);
        }
    }
    function setAllMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        state.ids = [];
        state.entities = {
        };
        addManyMutably(newEntities, state);
    }
    function removeOneMutably(key, state) {
        return removeManyMutably([
            key
        ], state);
    }
    function removeManyMutably(keys, state) {
        var didMutate = false;
        keys.forEach(function(key) {
            if (key in state.entities) {
                delete state.entities[key];
                didMutate = true;
            }
        });
        if (didMutate) state.ids = state.ids.filter(function(id) {
            return id in state.entities;
        });
    }
    function removeAllMutably(state) {
        Object.assign(state, {
            ids: [],
            entities: {
            }
        });
    }
    function takeNewKey(keys, update, state) {
        var original2 = state.entities[update.id];
        var updated = Object.assign({
        }, original2, update.changes);
        var newKey = selectIdValue(updated, selectId);
        var hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([
            update
        ], state);
    }
    function updateManyMutably(updates, state) {
        var newKeys = {
        };
        var updatesPerEntity = {
        };
        updates.forEach(function(update) {
            if (update.id in state.entities) updatesPerEntity[update.id] = {
                id: update.id,
                changes: __spreadValues(__spreadValues({
                }, updatesPerEntity[update.id] ? updatesPerEntity[update.id].changes : null), update.changes)
            };
        });
        updates = Object.values(updatesPerEntity);
        var didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            var didMutateIds = updates.filter(function(update) {
                return takeNewKey(newKeys, update, state);
            }).length > 0;
            if (didMutateIds) state.ids = state.ids.map(function(id) {
                return newKeys[id] || id;
            });
        }
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([
            entity
        ], state);
    }
    function upsertManyMutably(newEntities, state) {
        var _b = splitAddedUpdatedEntities(newEntities, selectId, state), added = _b[0], updated = _b[1];
        updateManyMutably(updated, state);
        addManyMutably(added, state);
    }
    return {
        removeAll: createSingleArgumentStateOperator(removeAllMutably),
        addOne: createStateOperator(addOneMutably),
        addMany: createStateOperator(addManyMutably),
        setOne: createStateOperator(setOneMutably),
        setMany: createStateOperator(setManyMutably),
        setAll: createStateOperator(setAllMutably),
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably)
    };
}
// src/entities/sorted_state_adapter.ts
function createSortedStateAdapter(selectId, sort) {
    var _b3 = createUnsortedStateAdapter(selectId), removeOne = _b3.removeOne, removeMany = _b3.removeMany, removeAll = _b3.removeAll;
    function addOneMutably(entity, state) {
        return addManyMutably([
            entity
        ], state);
    }
    function addManyMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        var models = newEntities.filter(function(model) {
            return !(selectIdValue(model, selectId) in state.entities);
        });
        if (models.length !== 0) merge(models, state);
    }
    function setOneMutably(entity, state) {
        return setManyMutably([
            entity
        ], state);
    }
    function setManyMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        if (newEntities.length !== 0) merge(newEntities, state);
    }
    function setAllMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        state.entities = {
        };
        state.ids = [];
        addManyMutably(newEntities, state);
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([
            update
        ], state);
    }
    function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) return false;
        var original2 = state.entities[update.id];
        var updated = Object.assign({
        }, original2, update.changes);
        var newKey = selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
    }
    function updateManyMutably(updates, state) {
        var models = [];
        updates.forEach(function(update) {
            return takeUpdatedModel(models, update, state);
        });
        if (models.length !== 0) merge(models, state);
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([
            entity
        ], state);
    }
    function upsertManyMutably(newEntities, state) {
        var _b = splitAddedUpdatedEntities(newEntities, selectId, state), added = _b[0], updated = _b[1];
        updateManyMutably(updated, state);
        addManyMutably(added, state);
    }
    function areArraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for(var i = 0; i < a.length && i < b.length; i++){
            if (a[i] === b[i]) continue;
            return false;
        }
        return true;
    }
    function merge(models, state) {
        models.forEach(function(model) {
            state.entities[selectId(model)] = model;
        });
        var allEntities = Object.values(state.entities);
        allEntities.sort(sort);
        var newSortedIds = allEntities.map(selectId);
        var ids = state.ids;
        if (!areArraysEqual(ids, newSortedIds)) state.ids = newSortedIds;
    }
    return {
        removeOne: removeOne,
        removeMany: removeMany,
        removeAll: removeAll,
        addOne: createStateOperator(addOneMutably),
        updateOne: createStateOperator(updateOneMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        setOne: createStateOperator(setOneMutably),
        setMany: createStateOperator(setManyMutably),
        setAll: createStateOperator(setAllMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertMany: createStateOperator(upsertManyMutably)
    };
}
// src/entities/create_adapter.ts
function createEntityAdapter(options) {
    if (options === void 0) options = {
    };
    var _b = __spreadValues({
        sortComparer: false,
        selectId: function(instance) {
            return instance.id;
        }
    }, options), selectId = _b.selectId, sortComparer = _b.sortComparer;
    var stateFactory = createInitialStateFactory();
    var selectorsFactory = createSelectorsFactory();
    var stateAdapter = sortComparer ? createSortedStateAdapter(selectId, sortComparer) : createUnsortedStateAdapter(selectId);
    return __spreadValues(__spreadValues(__spreadValues({
        selectId: selectId,
        sortComparer: sortComparer
    }, stateFactory), selectorsFactory), stateAdapter);
}
// src/nanoid.ts
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = function(size) {
    if (size === void 0) size = 21;
    var id = "";
    var i = size;
    while(i--)id += urlAlphabet[Math.random() * 64 | 0];
    return id;
};
// src/createAsyncThunk.ts
var commonProperties = [
    "name",
    "message",
    "stack",
    "code"
];
var RejectWithValue = function() {
    function RejectWithValue1(payload, meta) {
        this.payload = payload;
        this.meta = meta;
    }
    return RejectWithValue1;
}();
var FulfillWithMeta = function() {
    function FulfillWithMeta1(payload, meta) {
        this.payload = payload;
        this.meta = meta;
    }
    return FulfillWithMeta1;
}();
var miniSerializeError = function(value) {
    if (typeof value === "object" && value !== null) {
        var simpleError = {
        };
        for(var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++){
            var property = commonProperties_1[_i];
            if (typeof value[property] === "string") simpleError[property] = value[property];
        }
        return simpleError;
    }
    return {
        message: String(value)
    };
};
function createAsyncThunk(typePrefix, payloadCreator, options) {
    var fulfilled = createAction(typePrefix + "/fulfilled", function(payload, requestId, arg, meta) {
        return {
            payload: payload,
            meta: __spreadProps(__spreadValues({
            }, meta || {
            }), {
                arg: arg,
                requestId: requestId,
                requestStatus: "fulfilled"
            })
        };
    });
    var pending = createAction(typePrefix + "/pending", function(requestId, arg, meta) {
        return {
            payload: void 0,
            meta: __spreadProps(__spreadValues({
            }, meta || {
            }), {
                arg: arg,
                requestId: requestId,
                requestStatus: "pending"
            })
        };
    });
    var rejected = createAction(typePrefix + "/rejected", function(error, requestId, arg, payload, meta) {
        return {
            payload: payload,
            error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
            meta: __spreadProps(__spreadValues({
            }, meta || {
            }), {
                arg: arg,
                requestId: requestId,
                rejectedWithValue: !!payload,
                requestStatus: "rejected",
                aborted: (error == null ? void 0 : error.name) === "AbortError",
                condition: (error == null ? void 0 : error.name) === "ConditionError"
            })
        };
    });
    var displayedWarning = false;
    var AC = typeof AbortController !== "undefined" ? AbortController : function() {
        function class_1() {
            this.signal = {
                aborted: false,
                addEventListener: function() {
                },
                dispatchEvent: function() {
                    return false;
                },
                onabort: function() {
                },
                removeEventListener: function() {
                }
            };
        }
        class_1.prototype.abort = function() {
            if (!displayedWarning) {
                displayedWarning = true;
                console.info("This platform does not implement AbortController. \nIf you want to use the AbortController to react to `abort` events, please consider importing a polyfill like 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'.");
            }
        };
        return class_1;
    }();
    function actionCreator(arg) {
        return function(dispatch, getState, extra) {
            var _a;
            var requestId = ((_a = options == null ? void 0 : options.idGenerator) != null ? _a : nanoid)();
            var abortController = new AC();
            var abortReason;
            var abortedPromise = new Promise(function(_, reject) {
                return abortController.signal.addEventListener("abort", function() {
                    return reject({
                        name: "AbortError",
                        message: abortReason || "Aborted"
                    });
                });
            });
            var started = false;
            function abort(reason) {
                if (started) {
                    abortReason = reason;
                    abortController.abort();
                }
            }
            var promise = function() {
                return __async(this, null, function() {
                    var _a2, finalAction, err_1, skipDispatch;
                    return __generator(this, function(_b) {
                        switch(_b.label){
                            case 0:
                                _b.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                if (options && options.condition && options.condition(arg, {
                                    getState: getState,
                                    extra: extra
                                }) === false) throw {
                                    name: "ConditionError",
                                    message: "Aborted due to condition callback returning false."
                                };
                                started = true;
                                dispatch(pending(requestId, arg, (_a2 = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _a2.call(options, {
                                    requestId: requestId,
                                    arg: arg
                                }, {
                                    getState: getState,
                                    extra: extra
                                })));
                                return [
                                    4 /*yield*/ ,
                                    Promise.race([
                                        abortedPromise,
                                        Promise.resolve(payloadCreator(arg, {
                                            dispatch: dispatch,
                                            getState: getState,
                                            extra: extra,
                                            requestId: requestId,
                                            signal: abortController.signal,
                                            rejectWithValue: function(value, meta) {
                                                return new RejectWithValue(value, meta);
                                            },
                                            fulfillWithValue: function(value, meta) {
                                                return new FulfillWithMeta(value, meta);
                                            }
                                        })).then(function(result) {
                                            if (result instanceof RejectWithValue) throw result;
                                            if (result instanceof FulfillWithMeta) return fulfilled(result.payload, requestId, arg, result.meta);
                                            return fulfilled(result, requestId, arg);
                                        })
                                    ])
                                ];
                            case 1:
                                finalAction = _b.sent();
                                return [
                                    3 /*break*/ ,
                                    3
                                ];
                            case 2:
                                err_1 = _b.sent();
                                finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                                return [
                                    3 /*break*/ ,
                                    3
                                ];
                            case 3:
                                skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                                if (!skipDispatch) dispatch(finalAction);
                                return [
                                    2 /*return*/ ,
                                    finalAction
                                ];
                        }
                    });
                });
            }();
            return Object.assign(promise, {
                abort: abort,
                requestId: requestId,
                arg: arg,
                unwrap: function() {
                    return promise.then(unwrapResult);
                }
            });
        };
    }
    return Object.assign(actionCreator, {
        pending: pending,
        rejected: rejected,
        fulfilled: fulfilled,
        typePrefix: typePrefix
    });
}
function unwrapResult(action) {
    if (action.meta && action.meta.rejectedWithValue) throw action.payload;
    if (action.error) throw action.error;
    return action.payload;
}
// src/tsHelpers.ts
var hasMatchFunction = function(v) {
    return v && typeof v.match === "function";
};
// src/matchers.ts
var matches = function(matcher, action) {
    if (hasMatchFunction(matcher)) return matcher.match(action);
    else return matcher(action);
};
function isAnyOf() {
    var matchers = [];
    for(var _i = 0; _i < arguments.length; _i++)matchers[_i] = arguments[_i];
    return function(action) {
        return matchers.some(function(matcher) {
            return matches(matcher, action);
        });
    };
}
function isAllOf() {
    var matchers = [];
    for(var _i = 0; _i < arguments.length; _i++)matchers[_i] = arguments[_i];
    return function(action) {
        return matchers.every(function(matcher) {
            return matches(matcher, action);
        });
    };
}
function hasExpectedRequestMetadata(action, validStatus) {
    if (!action || !action.meta) return false;
    var hasValidRequestId = typeof action.meta.requestId === "string";
    var hasValidRequestStatus = validStatus.indexOf(action.meta.requestStatus) > -1;
    return hasValidRequestId && hasValidRequestStatus;
}
function isAsyncThunkArray(a) {
    return typeof a[0] === "function" && "pending" in a[0] && "fulfilled" in a[0] && "rejected" in a[0];
}
function isPending() {
    var asyncThunks = [];
    for(var _i = 0; _i < arguments.length; _i++)asyncThunks[_i] = arguments[_i];
    if (asyncThunks.length === 0) return function(action) {
        return hasExpectedRequestMetadata(action, [
            "pending"
        ]);
    };
    if (!isAsyncThunkArray(asyncThunks)) return isPending()(asyncThunks[0]);
    return function(action) {
        var matchers = asyncThunks.map(function(asyncThunk) {
            return asyncThunk.pending;
        });
        var combinedMatcher = isAnyOf.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
function isRejected() {
    var asyncThunks = [];
    for(var _i = 0; _i < arguments.length; _i++)asyncThunks[_i] = arguments[_i];
    if (asyncThunks.length === 0) return function(action) {
        return hasExpectedRequestMetadata(action, [
            "rejected"
        ]);
    };
    if (!isAsyncThunkArray(asyncThunks)) return isRejected()(asyncThunks[0]);
    return function(action) {
        var matchers = asyncThunks.map(function(asyncThunk) {
            return asyncThunk.rejected;
        });
        var combinedMatcher = isAnyOf.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
function isRejectedWithValue() {
    var asyncThunks = [];
    for(var _i = 0; _i < arguments.length; _i++)asyncThunks[_i] = arguments[_i];
    var hasFlag = function(action) {
        return action && action.meta && action.meta.rejectedWithValue;
    };
    if (asyncThunks.length === 0) return function(action) {
        var combinedMatcher = isAllOf(isRejected.apply(void 0, asyncThunks), hasFlag);
        return combinedMatcher(action);
    };
    if (!isAsyncThunkArray(asyncThunks)) return isRejectedWithValue()(asyncThunks[0]);
    return function(action) {
        var combinedMatcher = isAllOf(isRejected.apply(void 0, asyncThunks), hasFlag);
        return combinedMatcher(action);
    };
}
function isFulfilled() {
    var asyncThunks = [];
    for(var _i = 0; _i < arguments.length; _i++)asyncThunks[_i] = arguments[_i];
    if (asyncThunks.length === 0) return function(action) {
        return hasExpectedRequestMetadata(action, [
            "fulfilled"
        ]);
    };
    if (!isAsyncThunkArray(asyncThunks)) return isFulfilled()(asyncThunks[0]);
    return function(action) {
        var matchers = asyncThunks.map(function(asyncThunk) {
            return asyncThunk.fulfilled;
        });
        var combinedMatcher = isAnyOf.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
function isAsyncThunkAction() {
    var asyncThunks = [];
    for(var _i2 = 0; _i2 < arguments.length; _i2++)asyncThunks[_i2] = arguments[_i2];
    if (asyncThunks.length === 0) return function(action) {
        return hasExpectedRequestMetadata(action, [
            "pending",
            "fulfilled",
            "rejected"
        ]);
    };
    if (!isAsyncThunkArray(asyncThunks)) return isAsyncThunkAction()(asyncThunks[0]);
    return function(action) {
        var matchers = [];
        for(var _i = 0, asyncThunks_1 = asyncThunks; _i < asyncThunks_1.length; _i++){
            var asyncThunk = asyncThunks_1[_i];
            matchers.push(asyncThunk.pending, asyncThunk.rejected, asyncThunk.fulfilled);
        }
        var combinedMatcher = isAnyOf.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
// src/index.ts
_immer.enableES5();

},{"immer":"4sfoz","reselect":"isIsC","redux":"cDNB3","redux-thunk":"iFVTZ","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"4sfoz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Immer", ()=>un
);
parcelHelpers.export(exports, "applyPatches", ()=>pn
);
parcelHelpers.export(exports, "castDraft", ()=>K
);
parcelHelpers.export(exports, "castImmutable", ()=>$
);
parcelHelpers.export(exports, "createDraft", ()=>ln
);
parcelHelpers.export(exports, "current", ()=>D
);
parcelHelpers.export(exports, "enableAllPlugins", ()=>J
);
parcelHelpers.export(exports, "enableES5", ()=>N
);
parcelHelpers.export(exports, "enableMapSet", ()=>C
);
parcelHelpers.export(exports, "enablePatches", ()=>T
);
parcelHelpers.export(exports, "finishDraft", ()=>dn
);
parcelHelpers.export(exports, "freeze", ()=>d
);
parcelHelpers.export(exports, "immerable", ()=>L
);
parcelHelpers.export(exports, "isDraft", ()=>t
);
parcelHelpers.export(exports, "isDraftable", ()=>r
);
parcelHelpers.export(exports, "nothing", ()=>H
);
parcelHelpers.export(exports, "original", ()=>e
);
parcelHelpers.export(exports, "produce", ()=>fn
);
parcelHelpers.export(exports, "produceWithPatches", ()=>cn
);
parcelHelpers.export(exports, "setAutoFreeze", ()=>sn
);
parcelHelpers.export(exports, "setUseProxies", ()=>vn
);
function n(n1) {
    for(var t1 = arguments.length, r1 = Array(t1 > 1 ? t1 - 1 : 0), e1 = 1; e1 < t1; e1++)r1[e1 - 1] = arguments[e1];
    var i1 = Y[n1], o1 = i1 ? "function" == typeof i1 ? i1.apply(null, r1) : i1 : "unknown error nr: " + n1;
    throw Error("[Immer] " + o1);
    throw Error("[Immer] minified error nr: " + n1 + (r1.length ? " " + r1.map(function(n2) {
        return "'" + n2 + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function t(n3) {
    return !!n3 && !!n3[Q];
}
function r(n4) {
    return !!n4 && ((function(n5) {
        if (!n5 || "object" != typeof n5) return !1;
        var t2 = Object.getPrototypeOf(n5);
        if (null === t2) return !0;
        var r2 = Object.hasOwnProperty.call(t2, "constructor") && t2.constructor;
        return r2 === Object || "function" == typeof r2 && Function.toString.call(r2) === Z;
    })(n4) || Array.isArray(n4) || !!n4[L] || !!n4.constructor[L] || s(n4) || v(n4));
}
function e(r3) {
    return t(r3) || n(23, r3), r3[Q].t;
}
function i(n6, t3, r4) {
    void 0 === r4 && (r4 = !1), 0 === o(n6) ? (r4 ? Object.keys : nn)(n6).forEach(function(e2) {
        r4 && "symbol" == typeof e2 || t3(e2, n6[e2], n6);
    }) : n6.forEach(function(r5, e3) {
        return t3(e3, r5, n6);
    });
}
function o(n7) {
    var t4 = n7[Q];
    return t4 ? t4.i > 3 ? t4.i - 4 : t4.i : Array.isArray(n7) ? 1 : s(n7) ? 2 : v(n7) ? 3 : 0;
}
function u(n8, t5) {
    return 2 === o(n8) ? n8.has(t5) : Object.prototype.hasOwnProperty.call(n8, t5);
}
function a(n9, t6) {
    return 2 === o(n9) ? n9.get(t6) : n9[t6];
}
function f(n10, t7, r6) {
    var e4 = o(n10);
    2 === e4 ? n10.set(t7, r6) : 3 === e4 ? (n10.delete(t7), n10.add(r6)) : n10[t7] = r6;
}
function c(n11, t8) {
    return n11 === t8 ? 0 !== n11 || 1 / n11 == 1 / t8 : n11 != n11 && t8 != t8;
}
function s(n12) {
    return X && n12 instanceof Map;
}
function v(n13) {
    return q && n13 instanceof Set;
}
function p(n14) {
    return n14.o || n14.t;
}
function l(n15) {
    if (Array.isArray(n15)) return Array.prototype.slice.call(n15);
    var t9 = tn(n15);
    delete t9[Q];
    for(var r7 = nn(t9), e5 = 0; e5 < r7.length; e5++){
        var i = r7[e5], o2 = t9[i];
        !1 === o2.writable && (o2.writable = !0, o2.configurable = !0), (o2.get || o2.set) && (t9[i] = {
            configurable: !0,
            writable: !0,
            enumerable: o2.enumerable,
            value: n15[i]
        });
    }
    return Object.create(Object.getPrototypeOf(n15), t9);
}
function d(n16, e6) {
    return void 0 === e6 && (e6 = !1), y(n16) || t(n16) || !r(n16) ? n16 : (o(n16) > 1 && (n16.set = n16.add = n16.clear = n16.delete = h), Object.freeze(n16), e6 && i(n16, function(n, t10) {
        return d(t10, !0);
    }, !0), n16);
}
function h() {
    n(2);
}
function y(n17) {
    return null == n17 || "object" != typeof n17 || Object.isFrozen(n17);
}
function b(t11) {
    var r8 = rn[t11];
    return r8 || n(18, t11), r8;
}
function m(n, t12) {
    rn[n] || (rn[n] = t12);
}
function _() {
    return U || n(0), U;
}
function j(n18, t13) {
    t13 && (b("Patches"), n18.u = [], n18.s = [], n18.v = t13);
}
function O(n19) {
    g(n19), n19.p.forEach(S), n19.p = null;
}
function g(n20) {
    n20 === U && (U = n20.l);
}
function w(n21) {
    return U = {
        p: [],
        l: U,
        h: n21,
        m: !0,
        _: 0
    };
}
function S(n22) {
    var t14 = n22[Q];
    0 === t14.i || 1 === t14.i ? t14.j() : t14.O = !0;
}
function P(t15, e7) {
    e7._ = e7.p.length;
    var i2 = e7.p[0], o3 = void 0 !== t15 && t15 !== i2;
    return e7.h.g || b("ES5").S(e7, t15, o3), o3 ? (i2[Q].P && (O(e7), n(4)), r(t15) && (t15 = M(e7, t15), e7.l || x(e7, t15)), e7.u && b("Patches").M(i2[Q], t15, e7.u, e7.s)) : t15 = M(e7, i2, []), O(e7), e7.u && e7.v(e7.u, e7.s), t15 !== H ? t15 : void 0;
}
function M(n23, t16, r9) {
    if (y(t16)) return t16;
    var e8 = t16[Q];
    if (!e8) return i(t16, function(i3, o5) {
        return A(n23, e8, t16, i3, o5, r9);
    }, !0), t16;
    if (e8.A !== n23) return t16;
    if (!e8.P) return x(n23, e8.t, !0), e8.t;
    if (!e8.I) {
        e8.I = !0, e8.A._--;
        var o4 = 4 === e8.i || 5 === e8.i ? e8.o = l(e8.k) : e8.o;
        i(3 === e8.i ? new Set(o4) : o4, function(t17, i4) {
            return A(n23, e8, o4, t17, i4, r9);
        }), x(n23, o4, !1), r9 && n23.u && b("Patches").R(e8, r9, n23.u, n23.s);
    }
    return e8.o;
}
function A(e9, i5, o6, a1, c1, s1) {
    if (c1 === o6 && n(5), t(c1)) {
        var v1 = M(e9, c1, s1 && i5 && 3 !== i5.i && !u(i5.D, a1) ? s1.concat(a1) : void 0);
        if (f(o6, a1, v1), !t(v1)) return;
        e9.m = !1;
    }
    if (r(c1) && !y(c1)) {
        if (!e9.h.F && e9._ < 1) return;
        M(e9, c1), i5 && i5.A.l || x(e9, c1);
    }
}
function x(n24, t18, r10) {
    void 0 === r10 && (r10 = !1), n24.h.F && n24.m && d(t18, r10);
}
function z(n25, t) {
    var r11 = n25[Q];
    return (r11 ? p(r11) : n25)[t];
}
function I(n26, t19) {
    if (t19 in n26) for(var r12 = Object.getPrototypeOf(n26); r12;){
        var e10 = Object.getOwnPropertyDescriptor(r12, t19);
        if (e10) return e10;
        r12 = Object.getPrototypeOf(r12);
    }
}
function k(n27) {
    n27.P || (n27.P = !0, n27.l && k(n27.l));
}
function E(n28) {
    n28.o || (n28.o = l(n28.t));
}
function R(n29, t20, r13) {
    var e11 = s(t20) ? b("MapSet").N(t20, r13) : v(t20) ? b("MapSet").T(t20, r13) : n29.g ? function(n30, t21) {
        var r14 = Array.isArray(n30), e12 = {
            i: r14 ? 1 : 0,
            A: t21 ? t21.A : _(),
            P: !1,
            I: !1,
            D: {
            },
            l: t21,
            t: n30,
            k: null,
            o: null,
            j: null,
            C: !1
        }, i6 = e12, o7 = en;
        r14 && (i6 = [
            e12
        ], o7 = on);
        var u1 = Proxy.revocable(i6, o7), a2 = u1.revoke, f1 = u1.proxy;
        return e12.k = f1, e12.j = a2, f1;
    }(t20, r13) : b("ES5").J(t20, r13);
    return (r13 ? r13.A : _()).p.push(e11), e11;
}
function D(e13) {
    return t(e13) || n(22, e13), (function n31(t22) {
        if (!r(t22)) return t22;
        var e14, u2 = t22[Q], c2 = o(t22);
        if (u2) {
            if (!u2.P && (u2.i < 4 || !b("ES5").K(u2))) return u2.t;
            u2.I = !0, e14 = F(t22, c2), u2.I = !1;
        } else e14 = F(t22, c2);
        return i(e14, function(t23, r15) {
            u2 && a(u2.t, t23) === r15 || f(e14, t23, n31(r15));
        }), 3 === c2 ? new Set(e14) : e14;
    })(e13);
}
function F(n32, t24) {
    switch(t24){
        case 2:
            return new Map(n32);
        case 3:
            return Array.from(n32);
    }
    return l(n32);
}
function N() {
    function r16(n33, t25) {
        var r17 = s2[n33];
        return r17 ? r17.enumerable = t25 : s2[n33] = r17 = {
            configurable: !0,
            enumerable: t25,
            get: function() {
                var t26 = this[Q];
                return f2(t26), en.get(t26, n33);
            },
            set: function(t27) {
                var r18 = this[Q];
                f2(r18), en.set(r18, n33, t27);
            }
        }, r17;
    }
    function e15(n34) {
        for(var t28 = n34.length - 1; t28 >= 0; t28--){
            var r19 = n34[t28][Q];
            if (!r19.P) switch(r19.i){
                case 5:
                    a3(r19) && k(r19);
                    break;
                case 4:
                    o8(r19) && k(r19);
            }
        }
    }
    function o8(n35) {
        for(var t29 = n35.t, r20 = n35.k, e16 = nn(r20), i7 = e16.length - 1; i7 >= 0; i7--){
            var o9 = e16[i7];
            if (o9 !== Q) {
                var a4 = t29[o9];
                if (void 0 === a4 && !u(t29, o9)) return !0;
                var f3 = r20[o9], s3 = f3 && f3[Q];
                if (s3 ? s3.t !== a4 : !c(f3, a4)) return !0;
            }
        }
        var v2 = !!t29[Q];
        return e16.length !== nn(t29).length + (v2 ? 0 : 1);
    }
    function a3(n36) {
        var t30 = n36.k;
        if (t30.length !== n36.t.length) return !0;
        var r21 = Object.getOwnPropertyDescriptor(t30, t30.length - 1);
        return !(!r21 || r21.get);
    }
    function f2(t31) {
        t31.O && n(3, JSON.stringify(p(t31)));
    }
    var s2 = {
    };
    m("ES5", {
        J: function(n37, t32) {
            var e17 = Array.isArray(n37), i8 = function(n38, t33) {
                if (n38) {
                    for(var e18 = Array(t33.length), i9 = 0; i9 < t33.length; i9++)Object.defineProperty(e18, "" + i9, r16(i9, !0));
                    return e18;
                }
                var o11 = tn(t33);
                delete o11[Q];
                for(var u3 = nn(o11), a5 = 0; a5 < u3.length; a5++){
                    var f4 = u3[a5];
                    o11[f4] = r16(f4, n38 || !!o11[f4].enumerable);
                }
                return Object.create(Object.getPrototypeOf(t33), o11);
            }(e17, n37), o10 = {
                i: e17 ? 5 : 4,
                A: t32 ? t32.A : _(),
                P: !1,
                I: !1,
                D: {
                },
                l: t32,
                t: n37,
                k: i8,
                o: null,
                O: !1,
                C: !1
            };
            return Object.defineProperty(i8, Q, {
                value: o10,
                writable: !0
            }), i8;
        },
        S: function(n39, r22, o12) {
            o12 ? t(r22) && r22[Q].A === n39 && e15(n39.p) : (n39.u && (function n40(t34) {
                if (t34 && "object" == typeof t34) {
                    var r23 = t34[Q];
                    if (r23) {
                        var e19 = r23.t, o13 = r23.k, f5 = r23.D, c3 = r23.i;
                        if (4 === c3) i(o13, function(t35) {
                            t35 !== Q && (void 0 !== e19[t35] || u(e19, t35) ? f5[t35] || n40(o13[t35]) : (f5[t35] = !0, k(r23)));
                        }), i(e19, function(n41) {
                            void 0 !== o13[n41] || u(o13, n41) || (f5[n41] = !1, k(r23));
                        });
                        else if (5 === c3) {
                            if (a3(r23) && (k(r23), f5.length = !0), o13.length < e19.length) for(var s4 = o13.length; s4 < e19.length; s4++)f5[s4] = !1;
                            else for(var v3 = e19.length; v3 < o13.length; v3++)f5[v3] = !0;
                            for(var p1 = Math.min(o13.length, e19.length), l1 = 0; l1 < p1; l1++)void 0 === f5[l1] && n40(o13[l1]);
                        }
                    }
                }
            })(n39.p[0]), e15(n39.p));
        },
        K: function(n42) {
            return 4 === n42.i ? o8(n42) : a3(n42);
        }
    });
}
function T() {
    function e20(n43) {
        if (!r(n43)) return n43;
        if (Array.isArray(n43)) return n43.map(e20);
        if (s(n43)) return new Map(Array.from(n43.entries()).map(function(n44) {
            return [
                n44[0],
                e20(n44[1])
            ];
        }));
        if (v(n43)) return new Set(Array.from(n43).map(e20));
        var t36 = Object.create(Object.getPrototypeOf(n43));
        for(var i in n43)t36[i] = e20(n43[i]);
        return u(n43, L) && (t36[L] = n43[L]), t36;
    }
    function f6(n45) {
        return t(n45) ? e20(n45) : n45;
    }
    var c4 = "add";
    m("Patches", {
        $: function(t37, r24) {
            return r24.forEach(function(r25) {
                for(var i10 = r25.path, u4 = r25.op, f7 = t37, s5 = 0; s5 < i10.length - 1; s5++){
                    var v4 = o(f7), p2 = "" + i10[s5];
                    0 !== v4 && 1 !== v4 || "__proto__" !== p2 && "constructor" !== p2 || n(24), "function" == typeof f7 && "prototype" === p2 && n(24), "object" != typeof (f7 = a(f7, p2)) && n(15, i10.join("/"));
                }
                var l2 = o(f7), d1 = e20(r25.value), h1 = i10[i10.length - 1];
                switch(u4){
                    case "replace":
                        switch(l2){
                            case 2:
                                return f7.set(h1, d1);
                            case 3:
                                n(16);
                            default:
                                return f7[h1] = d1;
                        }
                    case c4:
                        switch(l2){
                            case 1:
                                return f7.splice(h1, 0, d1);
                            case 2:
                                return f7.set(h1, d1);
                            case 3:
                                return f7.add(d1);
                            default:
                                return f7[h1] = d1;
                        }
                    case "remove":
                        switch(l2){
                            case 1:
                                return f7.splice(h1, 1);
                            case 2:
                                return f7.delete(h1);
                            case 3:
                                return f7.delete(r25.value);
                            default:
                                return delete f7[h1];
                        }
                    default:
                        n(17, u4);
                }
            }), t37;
        },
        R: function(n46, t38, r26, e21) {
            switch(n46.i){
                case 0:
                case 4:
                case 2:
                    return (function(n47, t39, r27, e22) {
                        var o14 = n47.t, s6 = n47.o;
                        i(n47.D, function(n48, i11) {
                            var v5 = a(o14, n48), p3 = a(s6, n48), l3 = i11 ? u(o14, n48) ? "replace" : c4 : "remove";
                            if (v5 !== p3 || "replace" !== l3) {
                                var d2 = t39.concat(n48);
                                r27.push("remove" === l3 ? {
                                    op: l3,
                                    path: d2
                                } : {
                                    op: l3,
                                    path: d2,
                                    value: p3
                                }), e22.push(l3 === c4 ? {
                                    op: "remove",
                                    path: d2
                                } : "remove" === l3 ? {
                                    op: c4,
                                    path: d2,
                                    value: f6(v5)
                                } : {
                                    op: "replace",
                                    path: d2,
                                    value: f6(v5)
                                });
                            }
                        });
                    })(n46, t38, r26, e21);
                case 5:
                case 1:
                    return (function(n49, t40, r28, e23) {
                        var i12 = n49.t, o15 = n49.D, u5 = n49.o;
                        if (u5.length < i12.length) {
                            var a6 = [
                                u5,
                                i12
                            ];
                            i12 = a6[0], u5 = a6[1];
                            var s7 = [
                                e23,
                                r28
                            ];
                            r28 = s7[0], e23 = s7[1];
                        }
                        for(var v6 = 0; v6 < i12.length; v6++)if (o15[v6] && u5[v6] !== i12[v6]) {
                            var p4 = t40.concat([
                                v6
                            ]);
                            r28.push({
                                op: "replace",
                                path: p4,
                                value: f6(u5[v6])
                            }), e23.push({
                                op: "replace",
                                path: p4,
                                value: f6(i12[v6])
                            });
                        }
                        for(var l4 = i12.length; l4 < u5.length; l4++){
                            var d3 = t40.concat([
                                l4
                            ]);
                            r28.push({
                                op: c4,
                                path: d3,
                                value: f6(u5[l4])
                            });
                        }
                        i12.length < u5.length && e23.push({
                            op: "replace",
                            path: t40.concat([
                                "length"
                            ]),
                            value: i12.length
                        });
                    })(n46, t38, r26, e21);
                case 3:
                    return (function(n50, t41, r29, e24) {
                        var i13 = n50.t, o16 = n50.o, u6 = 0;
                        i13.forEach(function(n51) {
                            if (!o16.has(n51)) {
                                var i14 = t41.concat([
                                    u6
                                ]);
                                r29.push({
                                    op: "remove",
                                    path: i14,
                                    value: n51
                                }), e24.unshift({
                                    op: c4,
                                    path: i14,
                                    value: n51
                                });
                            }
                            u6++;
                        }), u6 = 0, o16.forEach(function(n52) {
                            if (!i13.has(n52)) {
                                var o17 = t41.concat([
                                    u6
                                ]);
                                r29.push({
                                    op: c4,
                                    path: o17,
                                    value: n52
                                }), e24.unshift({
                                    op: "remove",
                                    path: o17,
                                    value: n52
                                });
                            }
                            u6++;
                        });
                    })(n46, t38, r26, e21);
            }
        },
        M: function(n53, t42, r30, e25) {
            r30.push({
                op: "replace",
                path: [],
                value: t42 === H ? void 0 : t42
            }), e25.push({
                op: "replace",
                path: [],
                value: n53.t
            });
        }
    });
}
function C() {
    function t43(n54, t44) {
        function r31() {
            this.constructor = n54;
        }
        a7(n54, t44), n54.prototype = (r31.prototype = t44.prototype, new r31);
    }
    function e26(n55) {
        n55.o || (n55.D = new Map, n55.o = new Map(n55.t));
    }
    function o18(n56) {
        n56.o || (n56.o = new Set, n56.t.forEach(function(t45) {
            if (r(t45)) {
                var e27 = R(n56.A.h, t45, n56);
                n56.p.set(t45, e27), n56.o.add(e27);
            } else n56.o.add(t45);
        }));
    }
    function u7(t46) {
        t46.O && n(3, JSON.stringify(p(t46)));
    }
    var a7 = function(n57, t47) {
        return (a7 = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n58, t48) {
            n58.__proto__ = t48;
        } || function(n59, t49) {
            for(var r32 in t49)t49.hasOwnProperty(r32) && (n59[r32] = t49[r32]);
        })(n57, t47);
    }, f8 = function() {
        function n60(n61, t50) {
            return this[Q] = {
                i: 2,
                l: t50,
                A: t50 ? t50.A : _(),
                P: !1,
                I: !1,
                o: void 0,
                D: void 0,
                t: n61,
                k: this,
                C: !1,
                O: !1
            }, this;
        }
        t43(n60, Map);
        var o19 = n60.prototype;
        return Object.defineProperty(o19, "size", {
            get: function() {
                return p(this[Q]).size;
            }
        }), o19.has = function(n62) {
            return p(this[Q]).has(n62);
        }, o19.set = function(n63, t51) {
            var r33 = this[Q];
            return u7(r33), p(r33).has(n63) && p(r33).get(n63) === t51 || (e26(r33), k(r33), r33.D.set(n63, !0), r33.o.set(n63, t51), r33.D.set(n63, !0)), this;
        }, o19.delete = function(n64) {
            if (!this.has(n64)) return !1;
            var t52 = this[Q];
            return u7(t52), e26(t52), k(t52), t52.D.set(n64, !1), t52.o.delete(n64), !0;
        }, o19.clear = function() {
            var n65 = this[Q];
            u7(n65), p(n65).size && (e26(n65), k(n65), n65.D = new Map, i(n65.t, function(t53) {
                n65.D.set(t53, !1);
            }), n65.o.clear());
        }, o19.forEach = function(n66, t54) {
            var r34 = this;
            p(this[Q]).forEach(function(e, i15) {
                n66.call(t54, r34.get(i15), i15, r34);
            });
        }, o19.get = function(n67) {
            var t55 = this[Q];
            u7(t55);
            var i16 = p(t55).get(n67);
            if (t55.I || !r(i16)) return i16;
            if (i16 !== t55.t.get(n67)) return i16;
            var o20 = R(t55.A.h, i16, t55);
            return e26(t55), t55.o.set(n67, o20), o20;
        }, o19.keys = function() {
            return p(this[Q]).keys();
        }, o19.values = function() {
            var n68, t56 = this, r35 = this.keys();
            return (n68 = {
            })[V] = function() {
                return t56.values();
            }, n68.next = function() {
                var n69 = r35.next();
                return n69.done ? n69 : {
                    done: !1,
                    value: t56.get(n69.value)
                };
            }, n68;
        }, o19.entries = function() {
            var n70, t57 = this, r36 = this.keys();
            return (n70 = {
            })[V] = function() {
                return t57.entries();
            }, n70.next = function() {
                var n71 = r36.next();
                if (n71.done) return n71;
                var e28 = t57.get(n71.value);
                return {
                    done: !1,
                    value: [
                        n71.value,
                        e28
                    ]
                };
            }, n70;
        }, o19[V] = function() {
            return this.entries();
        }, n60;
    }(), c5 = function() {
        function n72(n73, t58) {
            return this[Q] = {
                i: 3,
                l: t58,
                A: t58 ? t58.A : _(),
                P: !1,
                I: !1,
                o: void 0,
                t: n73,
                k: this,
                p: new Map,
                O: !1,
                C: !1
            }, this;
        }
        t43(n72, Set);
        var r37 = n72.prototype;
        return Object.defineProperty(r37, "size", {
            get: function() {
                return p(this[Q]).size;
            }
        }), r37.has = function(n74) {
            var t59 = this[Q];
            return u7(t59), t59.o ? !!t59.o.has(n74) || !(!t59.p.has(n74) || !t59.o.has(t59.p.get(n74))) : t59.t.has(n74);
        }, r37.add = function(n75) {
            var t60 = this[Q];
            return u7(t60), this.has(n75) || (o18(t60), k(t60), t60.o.add(n75)), this;
        }, r37.delete = function(n76) {
            if (!this.has(n76)) return !1;
            var t61 = this[Q];
            return u7(t61), o18(t61), k(t61), t61.o.delete(n76) || !!t61.p.has(n76) && t61.o.delete(t61.p.get(n76));
        }, r37.clear = function() {
            var n77 = this[Q];
            u7(n77), p(n77).size && (o18(n77), k(n77), n77.o.clear());
        }, r37.values = function() {
            var n78 = this[Q];
            return u7(n78), o18(n78), n78.o.values();
        }, r37.entries = function() {
            var n79 = this[Q];
            return u7(n79), o18(n79), n79.o.entries();
        }, r37.keys = function() {
            return this.values();
        }, r37[V] = function() {
            return this.values();
        }, r37.forEach = function(n80, t62) {
            for(var r38 = this.values(), e29 = r38.next(); !e29.done;)n80.call(t62, e29.value, e29.value, this), e29 = r38.next();
        }, n72;
    }();
    m("MapSet", {
        N: function(n81, t63) {
            return new f8(n81, t63);
        },
        T: function(n82, t64) {
            return new c5(n82, t64);
        }
    });
}
function J() {
    N(), C(), T();
}
function K(n83) {
    return n83;
}
function $(n84) {
    return n84;
}
var G, U, W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"), X = "undefined" != typeof Map, q = "undefined" != typeof Set, B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect, H = W ? Symbol.for("immer-nothing") : ((G = {
})["immer-nothing"] = !0, G), L = W ? Symbol.for("immer-draftable") : "__$immer_draftable", Q = W ? Symbol.for("immer-state") : "__$immer_state", V = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator", Y = {
    0: "Illegal state",
    1: "Immer drafts cannot have computed properties",
    2: "This object has been frozen and should not be mutated",
    3: function(n85) {
        return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n85;
    },
    4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
    5: "Immer forbids circular references",
    6: "The first or second argument to `produce` must be a function",
    7: "The third argument to `produce` must be a function or undefined",
    8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
    9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
    10: "The given draft is already finalized",
    11: "Object.defineProperty() cannot be used on an Immer draft",
    12: "Object.setPrototypeOf() cannot be used on an Immer draft",
    13: "Immer only supports deleting array indices",
    14: "Immer only supports setting array indices and the 'length' property",
    15: function(n86) {
        return "Cannot apply patch, path doesn't resolve: " + n86;
    },
    16: 'Sets cannot have "replace" patches.',
    17: function(n87) {
        return "Unsupported patch operation: " + n87;
    },
    18: function(n88) {
        return "The plugin for '" + n88 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n88 + "()` when initializing your application.";
    },
    20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",
    21: function(n89) {
        return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n89 + "'";
    },
    22: function(n90) {
        return "'current' expects a draft, got: " + n90;
    },
    23: function(n91) {
        return "'original' expects a draft, got: " + n91;
    },
    24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
}, Z = "" + Object.prototype.constructor, nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n92) {
    return Object.getOwnPropertyNames(n92).concat(Object.getOwnPropertySymbols(n92));
} : Object.getOwnPropertyNames, tn = Object.getOwnPropertyDescriptors || function(n93) {
    var t65 = {
    };
    return nn(n93).forEach(function(r39) {
        t65[r39] = Object.getOwnPropertyDescriptor(n93, r39);
    }), t65;
}, rn = {
}, en = {
    get: function(n94, t66) {
        if (t66 === Q) return n94;
        var e30 = p(n94);
        if (!u(e30, t66)) return (function(n95, t67, r40) {
            var e31, i18 = I(t67, r40);
            return i18 ? "value" in i18 ? i18.value : null === (e31 = i18.get) || void 0 === e31 ? void 0 : e31.call(n95.k) : void 0;
        })(n94, e30, t66);
        var i17 = e30[t66];
        return n94.I || !r(i17) ? i17 : i17 === z(n94.t, t66) ? (E(n94), n94.o[t66] = R(n94.A.h, i17, n94)) : i17;
    },
    has: function(n96, t68) {
        return t68 in p(n96);
    },
    ownKeys: function(n97) {
        return Reflect.ownKeys(p(n97));
    },
    set: function(n98, t69, r41) {
        var e32 = I(p(n98), t69);
        if (null == e32 ? void 0 : e32.set) return e32.set.call(n98.k, r41), !0;
        if (!n98.P) {
            var i19 = z(p(n98), t69), o21 = null == i19 ? void 0 : i19[Q];
            if (o21 && o21.t === r41) return n98.o[t69] = r41, n98.D[t69] = !1, !0;
            if (c(r41, i19) && (void 0 !== r41 || u(n98.t, t69))) return !0;
            E(n98), k(n98);
        }
        return n98.o[t69] === r41 && "number" != typeof r41 && (void 0 !== r41 || t69 in n98.o) || (n98.o[t69] = r41, n98.D[t69] = !0, !0);
    },
    deleteProperty: function(n99, t70) {
        return void 0 !== z(n99.t, t70) || t70 in n99.t ? (n99.D[t70] = !1, E(n99), k(n99)) : delete n99.D[t70], n99.o && delete n99.o[t70], !0;
    },
    getOwnPropertyDescriptor: function(n100, t71) {
        var r42 = p(n100), e33 = Reflect.getOwnPropertyDescriptor(r42, t71);
        return e33 ? {
            writable: !0,
            configurable: 1 !== n100.i || "length" !== t71,
            enumerable: e33.enumerable,
            value: r42[t71]
        } : e33;
    },
    defineProperty: function() {
        n(11);
    },
    getPrototypeOf: function(n101) {
        return Object.getPrototypeOf(n101.t);
    },
    setPrototypeOf: function() {
        n(12);
    }
}, on = {
};
i(en, function(n, t72) {
    on[n] = function() {
        return arguments[0] = arguments[0][0], t72.apply(this, arguments);
    };
}), on.deleteProperty = function(t73, r43) {
    return isNaN(parseInt(r43)) && n(13), en.deleteProperty.call(this, t73[0], r43);
}, on.set = function(t74, r44, e34) {
    return "length" !== r44 && isNaN(parseInt(r44)) && n(14), en.set.call(this, t74[0], r44, e34, t74[0]);
};
var un = function() {
    function e35(t75) {
        var e36 = this;
        this.g = B, this.F = !0, this.produce = function(t76, i21, o22) {
            if ("function" == typeof t76 && "function" != typeof i21) {
                var u8 = i21;
                i21 = t76;
                var a8 = e36;
                return function(n102) {
                    var t77 = this;
                    void 0 === n102 && (n102 = u8);
                    for(var r45 = arguments.length, e37 = Array(r45 > 1 ? r45 - 1 : 0), o23 = 1; o23 < r45; o23++)e37[o23 - 1] = arguments[o23];
                    return a8.produce(n102, function(n103) {
                        var r46;
                        return (r46 = i21).call.apply(r46, [
                            t77,
                            n103
                        ].concat(e37));
                    });
                };
            }
            var f9;
            if ("function" != typeof i21 && n(6), void 0 !== o22 && "function" != typeof o22 && n(7), r(t76)) {
                var c6 = w(e36), s8 = R(e36, t76, void 0), v7 = !0;
                try {
                    f9 = i21(s8), v7 = !1;
                } finally{
                    v7 ? O(c6) : g(c6);
                }
                return "undefined" != typeof Promise && f9 instanceof Promise ? f9.then(function(n104) {
                    return j(c6, o22), P(n104, c6);
                }, function(n105) {
                    throw O(c6), n105;
                }) : (j(c6, o22), P(f9, c6));
            }
            if (!t76 || "object" != typeof t76) {
                if ((f9 = i21(t76)) === H) return;
                return void 0 === f9 && (f9 = t76), e36.F && d(f9, !0), f9;
            }
            n(21, t76);
        }, this.produceWithPatches = function(n106, t78) {
            var r47, i22;
            return "function" == typeof n106 ? function(t79) {
                for(var r48 = arguments.length, i23 = Array(r48 > 1 ? r48 - 1 : 0), o24 = 1; o24 < r48; o24++)i23[o24 - 1] = arguments[o24];
                return e36.produceWithPatches(t79, function(t80) {
                    return n106.apply(void 0, [
                        t80
                    ].concat(i23));
                });
            } : [
                e36.produce(n106, t78, function(n107, t81) {
                    r47 = n107, i22 = t81;
                }),
                r47,
                i22
            ];
        }, "boolean" == typeof (null == t75 ? void 0 : t75.useProxies) && this.setUseProxies(t75.useProxies), "boolean" == typeof (null == t75 ? void 0 : t75.autoFreeze) && this.setAutoFreeze(t75.autoFreeze);
    }
    var i20 = e35.prototype;
    return i20.createDraft = function(e38) {
        r(e38) || n(8), t(e38) && (e38 = D(e38));
        var i24 = w(this), o25 = R(this, e38, void 0);
        return o25[Q].C = !0, g(i24), o25;
    }, i20.finishDraft = function(t82, r49) {
        var e39 = t82 && t82[Q];
        e39 && e39.C || n(9), e39.I && n(10);
        var i25 = e39.A;
        return j(i25, r49), P(void 0, i25);
    }, i20.setAutoFreeze = function(n108) {
        this.F = n108;
    }, i20.setUseProxies = function(t83) {
        t83 && !B && n(20), this.g = t83;
    }, i20.applyPatches = function(n109, r50) {
        var e40;
        for(e40 = r50.length - 1; e40 >= 0; e40--){
            var i26 = r50[e40];
            if (0 === i26.path.length && "replace" === i26.op) {
                n109 = i26.value;
                break;
            }
        }
        var o26 = b("Patches").$;
        return t(n109) ? o26(n109, r50) : this.produce(n109, function(n110) {
            return o26(n110, r50.slice(e40 + 1));
        });
    }, e35;
}(), an = new un, fn = an.produce, cn = an.produceWithPatches.bind(an), sn = an.setAutoFreeze.bind(an), vn = an.setUseProxies.bind(an), pn = an.applyPatches.bind(an), ln = an.createDraft.bind(an), dn = an.finishDraft.bind(an);
exports.default = fn;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"9FYyo":[function(require,module,exports) {
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

},{}],"isIsC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultMemoize", ()=>defaultMemoize
);
parcelHelpers.export(exports, "createSelectorCreator", ()=>createSelectorCreator
);
parcelHelpers.export(exports, "createSelector", ()=>createSelector
);
parcelHelpers.export(exports, "createStructuredSelector", ()=>createStructuredSelector
);
function defaultEqualityCheck(a, b) {
    return a === b;
}
function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
    if (prev === null || next === null || prev.length !== next.length) return false;
    // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
    var length = prev.length;
    for(var i = 0; i < length; i++){
        if (!equalityCheck(prev[i], next[i])) return false;
    }
    return true;
}
function defaultMemoize(func) {
    var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;
    var lastArgs = null;
    var lastResult = null;
    // we reference arguments instead of spreading them for performance reasons
    return function() {
        if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) // apply arguments instead of spreading for performance.
        lastResult = func.apply(null, arguments);
        lastArgs = arguments;
        return lastResult;
    };
}
function getDependencies(funcs) {
    var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
    if (!dependencies.every(function(dep) {
        return typeof dep === 'function';
    })) {
        var dependencyTypes = dependencies.map(function(dep) {
            return typeof dep;
        }).join(', ');
        throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
    }
    return dependencies;
}
function createSelectorCreator(memoize) {
    for(var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)memoizeOptions[_key - 1] = arguments[_key];
    return function() {
        for(var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++)funcs[_key2] = arguments[_key2];
        var recomputations = 0;
        var resultFunc = funcs.pop();
        var dependencies = getDependencies(funcs);
        var memoizedResultFunc = memoize.apply(undefined, [
            function() {
                recomputations++;
                // apply arguments instead of spreading for performance.
                return resultFunc.apply(null, arguments);
            }
        ].concat(memoizeOptions));
        // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
        var selector = memoize(function() {
            var params = [];
            var length = dependencies.length;
            for(var i = 0; i < length; i++)// apply arguments instead of spreading and mutate a local list of params for performance.
            params.push(dependencies[i].apply(null, arguments));
            // apply arguments instead of spreading for performance.
            return memoizedResultFunc.apply(null, params);
        });
        selector.resultFunc = resultFunc;
        selector.dependencies = dependencies;
        selector.recomputations = function() {
            return recomputations;
        };
        selector.resetRecomputations = function() {
            return recomputations = 0;
        };
        return selector;
    };
}
var createSelector = createSelectorCreator(defaultMemoize);
function createStructuredSelector(selectors) {
    var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;
    if (typeof selectors !== 'object') throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
    var objectKeys = Object.keys(selectors);
    return selectorCreator(objectKeys.map(function(key) {
        return selectors[key];
    }), function() {
        for(var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++)values[_key3] = arguments[_key3];
        return values.reduce(function(composition, value, index) {
            composition[objectKeys[index]] = value;
            return composition;
        }, {
        });
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"cDNB3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__DO_NOT_USE__ActionTypes", ()=>ActionTypes
);
parcelHelpers.export(exports, "applyMiddleware", ()=>applyMiddleware
);
parcelHelpers.export(exports, "bindActionCreators", ()=>bindActionCreators
);
parcelHelpers.export(exports, "combineReducers", ()=>combineReducers
);
parcelHelpers.export(exports, "compose", ()=>compose
);
parcelHelpers.export(exports, "createStore", ()=>createStore
);
var _objectSpread2 = require("@babel/runtime/helpers/esm/objectSpread2");
var _objectSpread2Default = parcelHelpers.interopDefault(_objectSpread2);
/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */ function formatProdErrorMessage(code) {
    return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}
// Inlined version of the `symbol-observable` polyfill
var $$observable = function() {
    return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();
/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */ var randomString = function randomString() {
    return Math.random().toString(36).substring(7).split('').join('.');
};
var ActionTypes = {
    INIT: "@@redux/INIT" + randomString(),
    REPLACE: "@@redux/REPLACE" + randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
        return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
    }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */ function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    var proto = obj;
    while(Object.getPrototypeOf(proto) !== null)proto = Object.getPrototypeOf(proto);
    return Object.getPrototypeOf(obj) === proto;
}
function kindOf(val1) {
    var typeOfVal = typeof val1;
    {
        // Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
        function miniKindOf(val) {
            if (val === void 0) return 'undefined';
            if (val === null) return 'null';
            var type = typeof val;
            switch(type){
                case 'boolean':
                case 'string':
                case 'number':
                case 'symbol':
                case 'function':
                    return type;
            }
            if (Array.isArray(val)) return 'array';
            if (isDate(val)) return 'date';
            if (isError(val)) return 'error';
            var constructorName = ctorName(val);
            switch(constructorName){
                case 'Symbol':
                case 'Promise':
                case 'WeakMap':
                case 'WeakSet':
                case 'Map':
                case 'Set':
                    return constructorName;
            } // other
            return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
        }
        function ctorName(val) {
            return typeof val.constructor === 'function' ? val.constructor.name : null;
        }
        function isError(val) {
            return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
        }
        function isDate(val) {
            if (val instanceof Date) return true;
            return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
        }
        typeOfVal = miniKindOf(val1);
    }
    return typeOfVal;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */ function createStore(reducer, preloadedState, enhancer) {
    var _ref2;
    if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState;
        preloadedState = undefined;
    }
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') throw new Error("Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
        return enhancer(createStore)(reducer, preloadedState);
    }
    if (typeof reducer !== 'function') throw new Error("Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
    var currentReducer = reducer;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */ function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) nextListeners = currentListeners.slice();
    }
    /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */ function getState() {
        if (isDispatching) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
        return currentState;
    }
    /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */ function subscribe(listener) {
        if (typeof listener !== 'function') throw new Error("Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
        if (isDispatching) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
        var isSubscribed = true;
        ensureCanMutateNextListeners();
        nextListeners.push(listener);
        return function unsubscribe() {
            if (!isSubscribed) return;
            if (isDispatching) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
            isSubscribed = false;
            ensureCanMutateNextListeners();
            var index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
            currentListeners = null;
        };
    }
    /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */ function dispatch(action) {
        if (!isPlainObject(action)) throw new Error("Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
        if (typeof action.type === 'undefined') throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
        if (isDispatching) throw new Error('Reducers may not dispatch actions.');
        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        } finally{
            isDispatching = false;
        }
        var listeners = currentListeners = nextListeners;
        for(var i = 0; i < listeners.length; i++){
            var listener = listeners[i];
            listener();
        }
        return action;
    }
    /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */ function replaceReducer(nextReducer) {
        if (typeof nextReducer !== 'function') throw new Error("Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
        currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
        // Any reducers that existed in both the new and old rootReducer
        // will receive the previous state. This effectively populates
        // the new state tree with any relevant data from the old one.
        dispatch({
            type: ActionTypes.REPLACE
        });
    }
    /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */ function observable() {
        var _ref;
        var outerSubscribe = subscribe;
        return _ref = {
            /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */ subscribe: function subscribe(observer) {
                if (typeof observer !== 'object' || observer === null) throw new Error("Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
                function observeState() {
                    if (observer.next) observer.next(getState());
                }
                observeState();
                var unsubscribe = outerSubscribe(observeState);
                return {
                    unsubscribe: unsubscribe
                };
            }
        }, _ref[$$observable] = function() {
            return this;
        }, _ref;
    } // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.
    dispatch({
        type: ActionTypes.INIT
    });
    return _ref2 = {
        dispatch: dispatch,
        subscribe: subscribe,
        getState: getState,
        replaceReducer: replaceReducer
    }, _ref2[$$observable] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */ function warning(message) {
    /* eslint-disable no-console */ if (typeof console !== 'undefined' && typeof console.error === 'function') console.error(message);
    /* eslint-enable no-console */ try {
        // This error was thrown as a convenience so that if you enable
        // "break on all exceptions" in your console,
        // it would pause the execution at this line.
        throw new Error(message);
    } catch (e) {
    } // eslint-disable-line no-empty
}
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
    var reducerKeys = Object.keys(reducers);
    var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
    if (reducerKeys.length === 0) return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
    if (!isPlainObject(inputState)) return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
    var unexpectedKeys = Object.keys(inputState).filter(function(key) {
        return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
    });
    unexpectedKeys.forEach(function(key) {
        unexpectedKeyCache[key] = true;
    });
    if (action && action.type === ActionTypes.REPLACE) return;
    if (unexpectedKeys.length > 0) return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
}
function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function(key) {
        var reducer = reducers[key];
        var initialState = reducer(undefined, {
            type: ActionTypes.INIT
        });
        if (typeof initialState === 'undefined') throw new Error("The slice reducer for key \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
        if (typeof reducer(undefined, {
            type: ActionTypes.PROBE_UNKNOWN_ACTION()
        }) === 'undefined') throw new Error("The slice reducer for key \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle '" + ActionTypes.INIT + "' or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */ function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {
    };
    for(var i = 0; i < reducerKeys.length; i++){
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'undefined') warning("No reducer provided for key \"" + key + "\"");
        if (typeof reducers[key] === 'function') finalReducers[key] = reducers[key];
    }
    var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
    // keys multiple times.
    var unexpectedKeyCache;
    unexpectedKeyCache = {
    };
    var shapeAssertionError;
    try {
        assertReducerShape(finalReducers);
    } catch (e) {
        shapeAssertionError = e;
    }
    return function combination(state, action) {
        if (state === void 0) state = {
        };
        if (shapeAssertionError) throw shapeAssertionError;
        var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
        if (warningMessage) warning(warningMessage);
        var hasChanged = false;
        var nextState = {
        };
        for(var _i = 0; _i < finalReducerKeys.length; _i++){
            var _key = finalReducerKeys[_i];
            var reducer = finalReducers[_key];
            var previousStateForKey = state[_key];
            var nextStateForKey = reducer(previousStateForKey, action);
            if (typeof nextStateForKey === 'undefined') {
                var actionType = action && action.type;
                throw new Error("When called with an action of type " + (actionType ? "\"" + String(actionType) + "\"" : '(unknown type)') + ", the slice reducer for key \"" + _key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.");
            }
            nextState[_key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
        return hasChanged ? nextState : state;
    };
}
function bindActionCreator(actionCreator, dispatch) {
    return function() {
        return dispatch(actionCreator.apply(this, arguments));
    };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */ function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') return bindActionCreator(actionCreators, dispatch);
    if (typeof actionCreators !== 'object' || actionCreators === null) throw new Error("bindActionCreators expected an object or a function, but instead received: '" + kindOf(actionCreators) + "'. " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
    var boundActionCreators = {
    };
    for(var key in actionCreators){
        var actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
    return boundActionCreators;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */ function compose() {
    for(var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++)funcs[_key] = arguments[_key];
    if (funcs.length === 0) return function(arg) {
        return arg;
    };
    if (funcs.length === 1) return funcs[0];
    return funcs.reduce(function(a, b) {
        return function() {
            return a(b.apply(void 0, arguments));
        };
    });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */ function applyMiddleware() {
    for(var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++)middlewares[_key] = arguments[_key];
    return function(createStore1) {
        return function() {
            var store = createStore1.apply(void 0, arguments);
            var _dispatch = function dispatch() {
                throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
            };
            var middlewareAPI = {
                getState: store.getState,
                dispatch: function dispatch() {
                    return _dispatch.apply(void 0, arguments);
                }
            };
            var chain = middlewares.map(function(middleware) {
                return middleware(middlewareAPI);
            });
            _dispatch = compose.apply(void 0, chain)(store.dispatch);
            return _objectSpread2Default.default(_objectSpread2Default.default({
            }, store), {
            }, {
                dispatch: _dispatch
            });
        };
    };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */ function isCrushed() {
}
if (typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') warning("You are currently using minified code outside of NODE_ENV === \"production\". This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) to ensure you have the correct code for your production build.");

},{"@babel/runtime/helpers/esm/objectSpread2":"bS0uk","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"bS0uk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _definePropertyJs = require("./defineProperty.js");
var _definePropertyJsDefault = parcelHelpers.interopDefault(_definePropertyJs);
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) ownKeys(Object(source), true).forEach(function(key) {
            _definePropertyJsDefault.default(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
exports.default = _objectSpread2;

},{"./defineProperty.js":"hbmCA","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"hbmCA":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"iFVTZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function createThunkMiddleware(extraArgument) {
    return function(_ref) {
        var dispatch = _ref.dispatch, getState = _ref.getState;
        return function(next) {
            return function(action) {
                if (typeof action === 'function') return action(dispatch, getState, extraArgument);
                return next(action);
            };
        };
    };
}
var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
exports.default = thunk;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"awbvc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tsneTenthCsv = require("url:./data/tsne_tenth.csv");
var _tsneTenthCsvDefault = parcelHelpers.interopDefault(_tsneTenthCsv);
exports.default = JSON.stringify({
    defaultData: _tsneTenthCsvDefault.default,
    xAxis: "none",
    yAxis: "none",
    tracks: [
        {
            tooltips: 0.01,
            mark: "point",
            layout: "linear",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            color: {
                attribute: "sample",
                type: "categorical",
                cardinality: 32,
                colorScheme: "interpolateRainbow"
            },
            opacity: {
                value: 1
            }
        }, 
    ]
}, null, 2);

},{"url:./data/tsne_tenth.csv":"AP817","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"AP817":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "tsne_tenth.cbb14bf2.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {
};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"c1xED":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _strawberriesCsv = require("url:./data/strawberries.csv");
var _strawberriesCsvDefault = parcelHelpers.interopDefault(_strawberriesCsv);
exports.default = JSON.stringify({
    defaultData: _strawberriesCsvDefault.default,
    xAxis: "bottom",
    yAxis: "left",
    tracks: [
        {
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        }, 
    ]
}, null, 2);

},{"url:./data/strawberries.csv":"hmteq","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"hmteq":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "strawberries.8cf0b9f8.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"8qOwi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _strawberriesCsv = require("url:./data/strawberries.csv");
var _strawberriesCsvDefault = parcelHelpers.interopDefault(_strawberriesCsv);
var _broccoliCsv = require("url:./data/broccoli.csv");
var _broccoliCsvDefault = parcelHelpers.interopDefault(_broccoliCsv);
exports.default = JSON.stringify({
    tracks: [
        {
            data: _strawberriesCsvDefault.default,
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        },
        {
            data: _broccoliCsvDefault.default,
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "green"
            },
            shape: {
                value: "diamond"
            }
        }, 
    ]
}, null, 2);

},{"url:./data/strawberries.csv":"hmteq","url:./data/broccoli.csv":"1DXGz","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1DXGz":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "broccoli.c492f194.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"eJjvn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _strawberriesCsv = require("url:./data/strawberries.csv");
var _strawberriesCsvDefault = parcelHelpers.interopDefault(_strawberriesCsv);
exports.default = JSON.stringify({
    defaultData: _strawberriesCsvDefault.default,
    tracks: [
        {
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        }, 
    ]
}, null, 2);

},{"url:./data/strawberries.csv":"hmteq","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"7DR17":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _strawberriesCsv = require("url:./data/strawberries.csv");
var _strawberriesCsvDefault = parcelHelpers.interopDefault(_strawberriesCsv);
var _broccoliCsv = require("url:./data/broccoli.csv");
var _broccoliCsvDefault = parcelHelpers.interopDefault(_broccoliCsv);
exports.default = JSON.stringify({
    xAxis: "zero",
    yAxis: "left",
    tracks: [
        {
            order: 1,
            data: _strawberriesCsvDefault.default,
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        },
        {
            order: 2,
            data: _broccoliCsvDefault.default,
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "green"
            },
            shape: {
                value: "diamond"
            }
        }, 
    ]
}, null, 2);

},{"url:./data/strawberries.csv":"hmteq","url:./data/broccoli.csv":"1DXGz","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"iZia4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _signalsCsv = require("url:./data/signals.csv");
var _signalsCsvDefault = parcelHelpers.interopDefault(_signalsCsv);
exports.default = JSON.stringify({
    defaultData: _signalsCsvDefault.default,
    xAxis: "top",
    yAxis: "left",
    tracks: [
        {
            tooltips: 1,
            mark: "tick",
            layout: "linear",
            x: {
                attribute: "time",
                type: "quantitative",
                domain: [
                    0,
                    10
                ]
            },
            y: {
                attribute: "sample",
                type: "categorical",
                cardinality: 3
            },
            color: {
                attribute: "strength",
                type: "quantitative",
                domain: [
                    0,
                    1
                ],
                colorScheme: "interpolateCool"
            },
            height: {
                value: 10
            }
        }, 
    ]
}, null, 2);

},{"url:./data/signals.csv":"6EluC","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"6EluC":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "signals.0556938c.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"jscmt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tsneCsv = require("url:./data/tsne.csv");
var _tsneCsvDefault = parcelHelpers.interopDefault(_tsneCsv);
exports.default = JSON.stringify({
    xAxis: "none",
    yAxis: "none",
    defaultData: _tsneCsvDefault.default,
    tracks: [
        {
            tooltips: 0.01,
            mark: "point",
            layout: "linear",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            color: {
                attribute: "sample",
                type: "categorical",
                cardinality: 32,
                colorScheme: "interpolateRainbow"
            },
            opacity: {
                value: 0.7
            }
        }, 
    ]
}, null, 2);

},{"url:./data/tsne.csv":"jqBp2","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"jqBp2":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "tsne.3463aca6.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"b2QWF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tsneHundrethCsv = require("url:./data/tsne_hundreth.csv");
var _tsneHundrethCsvDefault = parcelHelpers.interopDefault(_tsneHundrethCsv);
exports.default = JSON.stringify({
    defaultData: _tsneHundrethCsvDefault.default,
    xAxis: "none",
    yAxis: "none",
    tracks: [
        {
            tooltips: 0.01,
            mark: "point",
            layout: "linear",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -10,
                    10
                ],
                scale: "linear"
            },
            color: {
                attribute: "sample",
                type: "categorical",
                cardinality: 32,
                colorScheme: "interpolateRainbow"
            },
            opacity: {
                value: 0.95
            }
        }, 
    ]
}, null, 2);

},{"url:./data/tsne_hundreth.csv":"kIFzo","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kIFzo":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "tsne_hundreth.c3c3ba37.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"2mTRJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = JSON.stringify({
    defaultData: {
        day: [
            1,
            2,
            3
        ],
        price: [
            10,
            22,
            35
        ]
    },
    tracks: [
        {
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        }, 
    ]
}, null, 2);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"deqtp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = JSON.stringify({
    xAxis: "top",
    yAxis: "right",
    tracks: [
        {
            order: 1,
            data: {
                day: [
                    1,
                    2,
                    3
                ],
                price: [
                    5,
                    15,
                    30
                ]
            },
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        },
        {
            order: 2,
            data: {
                day: [
                    1,
                    2,
                    3
                ],
                price: [
                    15,
                    25,
                    40
                ]
            },
            tooltips: 1,
            mark: "area",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    1,
                    10
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "green"
            },
            shape: {
                value: "diamond"
            }
        }, 
    ]
}, null, 2);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"HwNk8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = JSON.stringify({
    defaultData: {
        day: [
            1,
            2,
            3,
            4
        ],
        price: [
            10,
            22,
            35,
            20
        ]
    },
    tracks: [
        {
            tooltips: 1,
            mark: "point",
            layout: "linear",
            x: {
                attribute: "day",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            y: {
                attribute: "price",
                type: "quantitative",
                domain: [
                    0,
                    40
                ],
                scale: "linear"
            },
            color: {
                value: "red"
            },
            shape: {
                value: "circle"
            }
        }, 
    ]
}, null, 2);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kscvo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const buildGrid = (cellsPerRow)=>{
    const toReturn = {
        x: [],
        y: []
    };
    for(let i = 0; i < cellsPerRow; i++)for(let j = 0; j < cellsPerRow; j++){
        toReturn.x.push(i / cellsPerRow);
        toReturn.y.push(j / cellsPerRow);
    }
    return toReturn;
};
exports.default = JSON.stringify({
    defaultData: buildGrid(5),
    tracks: [
        {
            tooltips: 1,
            mark: "point",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    1
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    1
                ]
            },
            size: {
                value: 5
            }
        }, 
    ]
}, null, 2);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8hY3s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const buildGrid = (cellsPerRow)=>{
    const toReturn = {
        x: [],
        y: []
    };
    for(let i = 0; i < cellsPerRow; i++)for(let j = 0; j < cellsPerRow; j++){
        toReturn.x.push(i / cellsPerRow);
        toReturn.y.push(j / cellsPerRow);
    }
    return toReturn;
};
exports.default = JSON.stringify({
    margins: {
        top: "2em",
        bottom: "100px",
        left: "5%",
        right: "1em"
    },
    defaultData: buildGrid(5),
    tracks: [
        {
            tooltips: 1,
            mark: "point",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    1
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    1
                ]
            },
            size: {
                value: 5
            }
        }, 
    ]
}, null, 2);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kkyRp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _heatmapCsv = require("url:./data/heatmap.csv");
var _heatmapCsvDefault = parcelHelpers.interopDefault(_heatmapCsv);
exports.default = JSON.stringify({
    margins: {
        top: "4em",
        left: "3em",
        bottom: "0",
        right: "0"
    },
    labels: [
        {
            x: -0.5,
            y: 1.1,
            text: "SUBJECT VS SAMPLE MAP",
            fixedX: true,
            fixedY: true
        },
        {
            x: -0.8,
            y: 1.05,
            text: "a",
            fixedY: true
        },
        {
            x: -0.3,
            y: 1.05,
            text: "b",
            fixedY: true
        },
        {
            x: 0.2,
            y: 1.05,
            text: "c",
            fixedY: true
        },
        {
            x: 0.7,
            y: 1.05,
            text: "d",
            fixedY: true
        },
        {
            x: -1.1,
            y: 0.8,
            text: "a",
            fixedX: true
        },
        {
            x: -1.1,
            y: 0.3,
            text: "b",
            fixedX: true
        },
        {
            x: -1.1,
            y: -0.3,
            text: "c",
            fixedX: true
        },
        {
            x: -1.1,
            y: -0.8,
            text: "d",
            fixedX: true
        }, 
    ],
    xAxis: "none",
    yAxis: "none",
    defaultData: _heatmapCsvDefault.default,
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            x: {
                attribute: "sample",
                type: "categorical",
                cardinality: 4,
                scale: "linear"
            },
            y: {
                attribute: "subject",
                type: "categorical",
                cardinality: 4,
                scale: "linear"
            },
            color: {
                attribute: "strength",
                type: "quantitative",
                domain: [
                    0,
                    1
                ],
                colorScheme: "interpolateReds"
            },
            width: {
                value: 50
            },
            height: {
                value: 50
            }
        }, 
    ]
}, null, 2);

},{"url:./data/heatmap.csv":"21YYl","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"21YYl":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "heatmap.3e569673.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"euJgB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = JSON.stringify({
    defaultData: {
        x: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ],
        y: [
            10,
            -10,
            5,
            15,
            -15,
            -1,
            1,
            15
        ],
        type: [
            "a",
            "b",
            "c",
            "b",
            "a",
            "c",
            "b",
            "c"
        ]
    },
    xAxis: "zero",
    yAxis: "right",
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            layout: "linear",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    10
                ]
            },
            y: {
                value: 0,
                scale: "linear"
            },
            color: {
                attribute: "type",
                type: "categorical",
                cardinality: 3
            },
            width: {
                value: 10
            },
            height: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -20,
                    20
                ],
                minHeight: -100,
                maxHeight: 100
            }
        }, 
    ]
}, null, 2);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"hZRNf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = JSON.stringify({
    defaultData: {
        x: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ],
        y: [
            10,
            -10,
            5,
            15,
            -15,
            -1,
            1,
            15
        ],
        type: [
            "a",
            "b",
            "c",
            "b",
            "a",
            "c",
            "b",
            "c"
        ]
    },
    xAxis: "bottom",
    yAxis: "zero",
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            layout: "linear",
            x: {
                value: 0
            },
            y: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    10
                ]
            },
            color: {
                attribute: "type",
                type: "categorical",
                cardinality: 3
            },
            height: {
                value: 10
            },
            width: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    -20,
                    20
                ],
                minWidth: -100,
                maxWidth: 100
            }
        }, 
    ]
}, null, 2);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kUs70":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arcsCsv = require("url:./data/arcs.csv");
var _arcsCsvDefault = parcelHelpers.interopDefault(_arcsCsv);
exports.default = JSON.stringify({
    xAxis: "zero",
    yAxis: "none",
    defaultData: _arcsCsvDefault.default,
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:46000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 0
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBlues"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "rect",
            x: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 0
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateReds"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "arc",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            width: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 0.1
            },
            height: {
                value: 0
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBuGn"
            }
        }, 
    ]
}, null, 2);

},{"url:./data/arcs.csv":"f94Dq","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"f94Dq":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "arcs.040ab6c3.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"dwpb9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _boxTrackCsv = require("url:./data/box-track.csv");
var _boxTrackCsvDefault = parcelHelpers.interopDefault(_boxTrackCsv);
exports.default = JSON.stringify({
    margins: {
        left: "4em"
    },
    labels: [
        {
            y: 0.05,
            x: -1.3,
            text: "Box 1",
            fixedX: true
        }, 
    ],
    xAxis: "zero",
    yAxis: "none",
    defaultData: _boxTrackCsvDefault.default,
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            layout: "linear",
            x: {
                type: "genomicRange",
                chrAttribute: "chr",
                startAttribute: "start",
                endAttribute: "end",
                domain: [
                    "chr2:3049800",
                    "chr2:9001000"
                ],
                genome: "hg38"
            },
            y: {
                value: 0
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "score",
                domain: [
                    0,
                    8
                ],
                colorScheme: "interpolateBlues"
            }
        }, 
    ]
}, null, 2);

},{"url:./data/box-track.csv":"3z4Ig","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"3z4Ig":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "box-track.dc37f751.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"5dxPu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _boxTrackCsv = require("url:./data/box-track.csv");
var _boxTrackCsvDefault = parcelHelpers.interopDefault(_boxTrackCsv);
exports.default = JSON.stringify({
    defaultData: _boxTrackCsvDefault.default,
    tracks: [
        {
            tooltips: 1,
            mark: "line",
            layout: "linear",
            x: {
                type: "genomic",
                chrAttribute: "chr",
                geneAttribute: "start",
                domain: [
                    "chr2:3049800",
                    "chr2:9001000"
                ],
                genome: "hg38"
            },
            y: {
                type: "quantitative",
                attribute: "score",
                domain: [
                    0,
                    10
                ],
                colorScheme: "interpolateBlues"
            },
            color: {
                type: "quantitative",
                attribute: "score",
                domain: [
                    0,
                    8
                ],
                colorScheme: "interpolateBlues"
            }
        }, 
    ]
}, null, 2);

},{"url:./data/box-track.csv":"3z4Ig","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"cIB1u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arcsCsv = require("url:./data/arcs.csv");
var _arcsCsvDefault = parcelHelpers.interopDefault(_arcsCsv);
exports.default = JSON.stringify({
    xAxis: "zero",
    yAxis: "none",
    defaultData: _arcsCsvDefault.default,
    tracks: [
        {
            tooltips: 1,
            mark: "rect",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:46000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 100
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBlues"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "rect",
            x: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 100
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateReds"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "arc",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            width: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                value: 108
            },
            height: {
                value: 0
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBuGn"
            }
        },
        {
            tooltips: 1,
            mark: "line",
            x: {
                type: "genomicRange",
                chrAttribute: "region2Chrom",
                startAttribute: "region2Start",
                endAttribute: "region2End",
                domain: [
                    "chr2:38000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    160
                ]
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateReds"
            },
            opacity: {
                value: 0.25
            }
        },
        {
            tooltips: 1,
            mark: "line",
            x: {
                type: "genomicRange",
                chrAttribute: "region1Chrom",
                startAttribute: "region1Start",
                endAttribute: "regionEnd",
                domain: [
                    "chr2:46000",
                    "chr2:243149000"
                ],
                genome: "hg19"
            },
            y: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    160
                ]
            },
            height: {
                value: 10
            },
            color: {
                type: "quantitative",
                attribute: "value",
                domain: [
                    0,
                    60
                ],
                colorScheme: "interpolateBlues"
            },
            opacity: {
                value: 0.25
            }
        }, 
    ]
}, null, 2);

},{"url:./data/arcs.csv":"f94Dq","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aLChf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _matrixCsv = require("url:./data/matrix.csv");
var _matrixCsvDefault = parcelHelpers.interopDefault(_matrixCsv);
exports.default = JSON.stringify({
    margins: {
        left: "10%"
    },
    xAxis: "top",
    yAxis: "left",
    defaultData: _matrixCsvDefault.default,
    tracks: [
        {
            mark: "tick",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    32738
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    2700
                ]
            },
            color: {
                attribute: "value",
                type: "quantitative",
                domain: [
                    0,
                    100
                ],
                colorScheme: "interpolateReds"
            },
            opacity: {
                attribute: "value",
                type: "quantitative",
                minOpacity: 0.1,
                domain: [
                    0,
                    100
                ]
            },
            height: {
                value: 200 / 2700
            },
            size: {
                value: 200 / 2700
            }
        }, 
    ]
}, null, 2);

},{"url:./data/matrix.csv":"fkcyJ","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"fkcyJ":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fZrfd') + "matrix.08d463ac.csv" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"9nZ8g":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = JSON.stringify({
    defaultData: {
        x: [
            1,
            2,
            3,
            4
        ],
        y: [
            1,
            2,
            3,
            4
        ],
        width: [
            20,
            12,
            5,
            10
        ],
        height: [
            10,
            5,
            12,
            30
        ],
        size: [
            10,
            20,
            30,
            40
        ],
        color: [
            "red",
            "#00FF00",
            16581375,
            "rgb(0,0,200)"
        ]
    },
    tracks: [
        {
            mark: "rect",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            color: {
                attribute: "color",
                type: "inline"
            },
            width: {
                type: "inline",
                attribute: "width"
            },
            height: {
                type: "inline",
                attribute: "height"
            },
            opacity: {
                value: 0.4
            }
        },
        {
            mark: "point",
            x: {
                attribute: "x",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            y: {
                attribute: "y",
                type: "quantitative",
                domain: [
                    0,
                    5
                ]
            },
            color: {
                attribute: "color",
                type: "inline"
            },
            size: {
                type: "inline",
                attribute: "size"
            },
            opacity: {
                value: 0.4
            },
            shape: {
                value: "diamond"
            }
        }, 
    ]
}, null, 2);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8lqZg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _webglVis = require("./epiviz.gl/webgl-vis");
var _webglVisDefault = parcelHelpers.interopDefault(_webglVis);
exports.default = _webglVisDefault.default;

},{"./epiviz.gl/webgl-vis":"bkPJ7","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"bkPJ7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _helpers = require("@swc/helpers");
var _fpsmeter = require("fpsmeter");
var _mouseReader = require("./mouse-reader");
var _mouseReaderDefault = parcelHelpers.interopDefault(_mouseReader);
var _index = require("./specification-validation/index");
var _indexDefault = parcelHelpers.interopDefault(_index);
var _utilities = require("./utilities");
class WebGLVis {
    /**
   * Resize the canvas to a particular size and rerender the data
   *
   * @param {Number} width in pixels to resize the canvas to
   * @param {Number} height in pixels to resize the canvas to
   */ setCanvasSize(width, height) {
        this.webglWorker.postMessage({
            type: "resize",
            width,
            height
        });
        this.canvas.style.width = width;
        this.canvas.style.height = height;
        this.mouseReader.width = width;
        this.mouseReader.height = height;
        this.sendDrawerState(this.mouseReader.getViewport());
    }
    /**
   * This method does three things, and should only be called once. If changing the specification
   * use setSpecification.
   *  1. Add the canvas and mousereader to the DOM for use.
   *  2. Creates the WebWorkers that render and process the data.
   *  3. Exposes the messages the webworkers send back to the main thread under this.dataWorkerStream
   *
   * @param {Boolean} displayFPSMeter whether or not to display an fps meter
   */ addToDom(displayFPSMeter) {
        this.container.appendChild(this.parent);
        this.parent.appendChild(this.canvas);
        this.parent.appendChild(this.mouseReader.element);
        if (displayFPSMeter) this.initFpsmeter();
        const offscreenCanvas = this.canvas.transferControlToOffscreen();
        this.webglWorker = new Worker(require("961f357d0ed48cbf"));
        this.webglWorker.postMessage({
            type: "init",
            canvas: offscreenCanvas,
            displayFPSMeter
        }, [
            offscreenCanvas
        ]);
        // Allow OffScreenWebGLDrawer to tick FPS meter
        this.webglWorker.onmessage = (e)=>{
            if (e.data.type === "tick") this.meter.tick();
        };
        this.dataWorkerStream = [];
        this.dataWorker = new Worker(require("7b408fe4a4a4ac79"));
        this.dataWorker.onmessage = (message)=>{
            if (message.data.type === "getClosestPoint") {
                if (message.data.closestPoint === undefined) return;
                this.parent.dispatchEvent(new CustomEvent("pointHovered", {
                    detail: message
                }));
            } else if (message.data.type === "getClickPoint") {
                if (message.data.closestPoint === undefined) return;
                this.parent.dispatchEvent(new CustomEvent("pointClicked", {
                    detail: message
                }));
            } else if (message.data.type === "selectBox" || message.data.type === "selectLasso") {
                this.parent.dispatchEvent(new CustomEvent("onSelectionEnd", {
                    detail: message
                }));
                this.dataWorkerStream.push(message);
                console.log(this.dataWorkerStream);
            }
        };
        // Needs to be called at the end of addToDOM so mouseReader has correct dimensions to work with
        this.mouseReader.init();
    }
    /**
   * The main method for changing the state of the visualization, such as active tool,
   * viewport, locking axis, or changing the zoom.
   *
   * The format of the options:
   *   lockedX: boolean
   *   lockedY: boolean
   *   viewport: [minX, maxX, minY, maxY] (all Numbers)
   *   currentXRange: [x1, x2] (Numbers that should be within the viewport minX and maxX)
   *   currentYRange: [y1, y2] (Numbers that should be within the viewport minY and maxY)
   *   tool: one of ["pan", "box", "lasso"]
   *
   * @param {Object} options with keys under WebGLVis.POSSIBLE_MOUSE_READER_OPTIONS
   */ setViewOptions(options) {
        for (const option of this.POSSIBLE_MOUSE_READER_OPTIONS)if (option in options) this.mouseReader[option] = options[option];
        this.sendDrawerState(this.mouseReader.getViewport());
    }
    _setMargins(specification) {
        const styles = _utilities.getDimAndMarginStyleForSpecification(specification);
        this.parent.style.width = specification.width || _utilities.DEFAULT_WIDTH;
        this.parent.style.height = specification.height || _utilities.DEFAULT_HEIGHT;
        this.canvas.style.width = styles.width;
        this.canvas.style.height = styles.height;
        this.canvas.style.margin = styles.margin;
        if (isNaN(styles.width) || isNaN(styles.height)) {
            // Using css calc
            const canvasBox = this.canvas.getBoundingClientRect();
            this.setCanvasSize(canvasBox.width, canvasBox.height);
        } else this.setCanvasSize(styles.width, styles.height);
    }
    /**
   * Set the specification of the visualization, and then render it.
   *
   * @param {Object} specification describing visualization
   * @returns boolean on whether the specification was accepted
   */ setSpecification(specification) {
        if (!_indexDefault.default(specification)) return false;
        this._setMargins(specification);
        this.mouseReader.setSpecification(specification);
        this.sendDrawerState(this.mouseReader.getViewport());
        this.webglWorker.postMessage({
            type: "specification",
            specification
        });
        this.dataWorker.postMessage({
            type: "init",
            specification
        });
        return true;
    }
    /**
   * Send the viewport to the drawer. Use setViewOptions to change the viewport.
   *
   * @param {Object} viewport likely from this.mouseReader.getViewport()
   */ sendDrawerState(viewport) {
        this.webglWorker.postMessage({
            type: "viewport",
            ...viewport
        });
    }
    /**
   * Calls render in the drawer.
   */ forceDrawerRender() {
        this.webglWorker.postMessage({
            type: "render",
            ...this.mouseReader.getViewport()
        });
    }
    /**
   * Utility method to have data worker call {@link DataProcessor#selectBox} or
   * {@link DataProcessor#selectLasso}.
   *
   * Does not return, posts result to this.dataWorkerStream.
   * @param {Array} points array in format [x1,y1,x2,y2,x3,y3,...]
   *  if points.length == 4, does a box select, if points.length >= 6 does a lasso select
   *    using points as a polygon
   */ selectPoints(points) {
        if (points.length === 4) this.dataWorker.postMessage({
            type: "selectBox",
            points
        });
        else if (points.length >= 6) this.dataWorker.postMessage({
            type: "selectLasso",
            points
        });
    }
    /**
   * Utility method to have data worker call {@link DataProcessor#getClosestPoint}.
   * Does not return, posts result to this.dataWorkerStream.
   *
   * @param {Array} point to get closest point to
   */ getClosestPoint(point) {
        this.dataWorker.postMessage({
            type: "getClosestPoint",
            point
        });
    }
    /**
   * Utility method to have data worker call {@link DataProcessor#getClosestPoint}.
   * Does not return, posts result to this.dataWorkerStream.
   *
   * @param {Array} point to get closest point to
   */ getClickPoint(point) {
        this.dataWorker.postMessage({
            type: "getClickPoint",
            point
        });
    }
    /**
   * Initializes the FPS meter.
   */ initFpsmeter() {
        this.meter = new window.FPSMeter(document.querySelector("footer"), {
            graph: 1,
            heat: 1,
            theme: "light",
            history: 25,
            top: "-20px",
            left: `100px`,
            transform: "translateX(-100%)"
        });
    }
    /**
   * Adds an event listener to visualization on the appropriate component.
   * Current event types that are supported are
   * "zoomIn": fires when user zooms in
   * "zoomOut": fires when user zooms out
   * "pan": fires when user pans
   * "onSelection": fires while user is changing the selection box/lasso
   * "onSelectionEnd": fires when a selection has been completed and the results are in the dataWorkerStream
   * "pointHovered": fires when pointer hovers over a datapoint
   *
   * For information on the parameters and functionality see:
   *   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   *
   * @param {String} type
   * @param {Function} listener
   * @param {Object} options
   */ addEventListener(type, listener, options) {
        this.parent.addEventListener(type, listener, options);
    }
    /**
   * Clears the polygon selection on the visualization
   */ clearSelection() {
        this.mouseReader.clear();
    }
    /**
   * A class meant to display a visualization based off a given specification using webgl.
   *
   * @param {HTMLElement} container <div> or other container element meant to contain the visualization and its mousereader
   */ constructor(container){
        _helpers.defineProperty(this, "POSSIBLE_MOUSE_READER_OPTIONS", Object.freeze([
            "lockedX",
            "lockedY",
            "tool",
            "viewport",
            "currentXRange",
            "currentYRange", 
        ]));
        this.container = container;
        this.mouseReader = new _mouseReaderDefault.default(document.createElement("div"), this);
        this.parent = document.createElement("div");
        this.parent.style.position = "relative";
        this.parent.style.overflow = "hidden";
        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "absolute";
    }
}
exports.default = WebGLVis;

},{"@swc/helpers":"drvtq","fpsmeter":"5gLhw","./mouse-reader":"oUhap","./specification-validation/index":"46aZj","./utilities":"8sDGp","961f357d0ed48cbf":"90xhh","7b408fe4a4a4ac79":"jHhP4","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"drvtq":[function(require,module,exports) {
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

},{"./_apply_decorated_descriptor":"h2JET","./_array_with_holes":"a97Db","./_array_without_holes":"1WkKC","./_assert_this_initialized":"2RE0F","./_async_generator":"kkVrc","./_async_generator_delegate":"jY3hC","./_async_iterator":"3Nn3t","./_async_to_generator":"8UpGS","./_await_async_generator":"eaDHJ","./_await_value":"6bNm8","./_class_call_check":"dN30F","./_class_name_tdz_error":"2vbr0","./_class_private_field_get":"2bT6h","./_class_private_field_loose_base":"i7oz9","./_class_private_field_set":"imMdi","./_class_private_method_get":"6t0RS","./_class_private_method_set":"lUMkT","./_class_static_private_field_spec_get":"eeWgk","./_class_static_private_field_spec_set":"eiY5U","./_construct":"aqUmq","./_create_class":"lPxyf","./_decorate":"3uLYu","./_defaults":"IvP2b","./_define_enumerable_properties":"cXuQO","./_define_property":"8Bcx4","./_extends":"d4hrD","./_get":"eUyae","./_get_prototype_of":"4jAbP","./_inherits":"7a9ym","./_inherits_loose":"2tRjp","./_initializer_define_property":"9uMaB","./_initializer_warning_helper":"3aMW7","./_instanceof":"aOEca","./_interop_require_default":"ez8jf","./_interop_require_wildcard":"8UJR5","./_is_native_function":"9MoIw","./_iterable_to_array":"emWKT","./_iterable_to_array_limit":"99GCl","./_iterable_to_array_limit_loose":"aQIL9","./_jsx":"gLVPT","./_new_arrow_check":"kyjWm","./_non_iterable_rest":"bR7Fn","./_non_iterable_spread":"jUueg","./_object_spread":"kCAYq","./_object_without_properties":"dGFkK","./_object_without_properties_loose":"aaPZb","./_possible_constructor_return":"dZfHk","./_read_only_error":"65xft","./_set":"ljHdU","./_set_prototype_of":"3srT5","./_skip_first_generator_next":"e15Wz","./_sliced_to_array":"1oJbI","./_sliced_to_array_loose":"cs9Ol","./_super_prop_base":"aVBS2","./_tagged_template_literal":"5IZUq","./_tagged_template_literal_loose":"Iz9M6","./_throw":"2F2qL","./_to_array":"i3uJH","./_to_consumable_array":"gDQja","./_to_primitive":"c2QgB","./_to_property_key":"byvnE","./_type_of":"6XIIo","./_wrap_async_generator":"lYeqb","./_wrap_native_super":"7j8pM","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"h2JET":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"a97Db":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
exports.default = _arrayWithHoles;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1WkKC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)arr2[i] = arr[i];
        return arr2;
    }
}
exports.default = _arrayWithoutHoles;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2RE0F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
exports.default = _assertThisInitialized;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kkVrc":[function(require,module,exports) {
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

},{"./_await_value":"6bNm8","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"6bNm8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _AwaitValue(value) {
    this.wrapped = value;
}
exports.default = _AwaitValue;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"jY3hC":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"3Nn3t":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8UpGS":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"eaDHJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
function _awaitAsyncGenerator(value) {
    return new _awaitValueDefault.default(value);
}
exports.default = _awaitAsyncGenerator;

},{"./_await_value":"6bNm8","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"dN30F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
exports.default = _classCallCheck;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2vbr0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classNameTDZError(name) {
    throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
}
exports.default = _classNameTDZError;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2bT6h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver).value;
}
exports.default = _classPrivateFieldGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"i7oz9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) throw new TypeError("attempted to use private field on non-instance");
    return receiver;
}
exports.default = _classPrivateFieldBase;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"imMdi":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"6t0RS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
exports.default = _classPrivateMethodGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"lUMkT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
}
exports.default = _classPrivateMethodSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"eeWgk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) throw new TypeError("Private static access of wrong provenance");
    return descriptor.value;
}
exports.default = _classStaticPrivateFieldSpecGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"eiY5U":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) throw new TypeError("Private static access of wrong provenance");
    if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
    return value;
}
exports.default = _classStaticPrivateFieldSpecSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aqUmq":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"lPxyf":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"3uLYu":[function(require,module,exports) {
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

},{"./_to_array":"i3uJH","./_to_property_key":"byvnE","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"i3uJH":[function(require,module,exports) {
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

},{"./_array_with_holes":"a97Db","./_iterable_to_array":"emWKT","./_non_iterable_rest":"bR7Fn","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"emWKT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
exports.default = _iterableToArray;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"bR7Fn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
exports.default = _nonIterableRest;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"byvnE":[function(require,module,exports) {
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

},{"./_type_of":"6XIIo","./_to_primitive":"c2QgB","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"6XIIo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _typeof(obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
}
exports.default = _typeof;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"c2QgB":[function(require,module,exports) {
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

},{"./_type_of":"6XIIo","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"IvP2b":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"cXuQO":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8Bcx4":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"d4hrD":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"eUyae":[function(require,module,exports) {
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

},{"./_super_prop_base":"aVBS2","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aVBS2":[function(require,module,exports) {
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

},{"./_get_prototype_of":"4jAbP","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"4jAbP":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"7a9ym":[function(require,module,exports) {
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

},{"./_set_prototype_of":"3srT5","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"3srT5":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2tRjp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
exports.default = _inheritsLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"9uMaB":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"3aMW7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _initializerWarningHelper(descriptor, context) {
    throw new Error("Decorating class property failed. Please ensure that proposal-class-properties is enabled and set to use loose mode. To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2.");
}
exports.default = _initializerWarningHelper;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aOEca":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) return right[Symbol.hasInstance](left);
    else return left instanceof right;
}
exports.default = _instanceof;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"ez8jf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports.default = _interopRequireDefault;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8UJR5":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"9MoIw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
exports.default = _isNativeFunction;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"99GCl":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aQIL9":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"gLVPT":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kyjWm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) throw new TypeError("Cannot instantiate an arrow function");
}
exports.default = _newArrowCheck;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"jUueg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}
exports.default = _nonIterableSpread;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kCAYq":[function(require,module,exports) {
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

},{"./_define_property":"8Bcx4","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"dGFkK":[function(require,module,exports) {
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

},{"./_object_without_properties_loose":"aaPZb","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aaPZb":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"dZfHk":[function(require,module,exports) {
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

},{"./_assert_this_initialized":"2RE0F","./_type_of":"6XIIo","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"65xft":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _readOnlyError(name) {
    throw new Error("\"" + name + "\" is read-only");
}
exports.default = _readOnlyError;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"ljHdU":[function(require,module,exports) {
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

},{"./_define_property":"8Bcx4","./_super_prop_base":"aVBS2","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"e15Wz":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1oJbI":[function(require,module,exports) {
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

},{"./_array_with_holes":"a97Db","./_iterable_to_array":"emWKT","./_non_iterable_rest":"bR7Fn","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"cs9Ol":[function(require,module,exports) {
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

},{"./_array_with_holes":"a97Db","./_iterable_to_array_limit_loose":"aQIL9","./_non_iterable_rest":"bR7Fn","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"5IZUq":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"Iz9M6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) raw = strings.slice(0);
    strings.raw = raw;
    return strings;
}
exports.default = _taggedTemplateLiteralLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2F2qL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _throw(e) {
    throw e;
}
exports.default = _throw;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"gDQja":[function(require,module,exports) {
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

},{"./_array_without_holes":"1WkKC","./_iterable_to_array":"emWKT","./_non_iterable_spread":"jUueg","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"lYeqb":[function(require,module,exports) {
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

},{"./_async_generator":"kkVrc","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"7j8pM":[function(require,module,exports) {
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

},{"./_construct":"aqUmq","./_is_native_function":"9MoIw","./_get_prototype_of":"4jAbP","./_set_prototype_of":"3srT5","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"5gLhw":[function(require,module,exports) {
(function(w, undefined) {
    /**
	 * Create a new element.
	 *
	 * @param  {String} name Element type name.
	 *
	 * @return {Element}
	 */ function newEl(name) {
        return document.createElement(name);
    }
    /**
	 * Apply theme CSS properties to element.
	 *
	 * @param  {Element} element DOM element.
	 * @param  {Object}  theme   Theme object.
	 *
	 * @return {Element}
	 */ function applyTheme(element, theme) {
        for(var name in theme)try {
            element.style[name] = theme[name];
        } catch (e) {
        }
        return element;
    }
    /**
	 * Return type of the value.
	 *
	 * @param  {Mixed} value
	 *
	 * @return {String}
	 */ function type(value) {
        if (value == null) return String(value);
        if (typeof value === 'object' || typeof value === 'function') return Object.prototype.toString.call(value).match(/\s([a-z]+)/i)[1].toLowerCase() || 'object';
        return typeof value;
    }
    /**
	 * Check whether the value is in an array.
	 *
	 * @param  {Mixed} value
	 * @param  {Array} array
	 *
	 * @return {Integer} Array index or -1 when not found.
	 */ function inArray(value, array) {
        if (type(array) !== 'array') return -1;
        if (array.indexOf) return array.indexOf(value);
        for(var i = 0, l = array.length; i < l; i++){
            if (array[i] === value) return i;
        }
        return -1;
    }
    /**
	 * Poor man's deep object extend.
	 *
	 * Example:
	 *   extend({}, defaults, options);
	 *
	 * @return {Void}
	 */ function extend() {
        var args = arguments;
        for(var key in args[1])if (args[1].hasOwnProperty(key)) switch(type(args[1][key])){
            case 'object':
                args[0][key] = extend({
                }, args[0][key], args[1][key]);
                break;
            case 'array':
                args[0][key] = args[1][key].slice(0);
                break;
            default:
                args[0][key] = args[1][key];
        }
        return args.length > 2 ? extend.apply(null, [
            args[0]
        ].concat(Array.prototype.slice.call(args, 2))) : args[0];
    }
    /**
	 * Convert HSL color to HEX string.
	 *
	 * @param  {Array} hsl Array with [hue, saturation, lightness].
	 *
	 * @return {Array} Array with [red, green, blue].
	 */ function hslToHex(h, s, l) {
        var r, g, b;
        var v, min, sv, sextant, fract, vsf;
        if (l <= 0.5) v = l * (1 + s);
        else v = l + s - l * s;
        if (v === 0) return '#000';
        else {
            min = 2 * l - v;
            sv = (v - min) / v;
            h = 6 * h;
            sextant = Math.floor(h);
            fract = h - sextant;
            vsf = v * sv * fract;
            if (sextant === 0 || sextant === 6) {
                r = v;
                g = min + vsf;
                b = min;
            } else if (sextant === 1) {
                r = v - vsf;
                g = v;
                b = min;
            } else if (sextant === 2) {
                r = min;
                g = v;
                b = min + vsf;
            } else if (sextant === 3) {
                r = min;
                g = v - vsf;
                b = v;
            } else if (sextant === 4) {
                r = min + vsf;
                g = min;
                b = v;
            } else {
                r = v;
                g = min;
                b = v - vsf;
            }
            return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
    }
    /**
	 * Helper function for hslToHex.
	 */ function componentToHex(c) {
        c = Math.round(c * 255).toString(16);
        return c.length === 1 ? '0' + c : c;
    }
    /**
	 * Manage element event listeners.
	 *
	 * @param  {Node}     element
	 * @param  {Event}    eventName
	 * @param  {Function} handler
	 * @param  {Bool}     remove
	 *
	 * @return {Void}
	 */ function listener(element, eventName, handler, remove) {
        if (element.addEventListener) element[remove ? 'removeEventListener' : 'addEventListener'](eventName, handler, false);
        else if (element.attachEvent) element[remove ? 'detachEvent' : 'attachEvent']('on' + eventName, handler);
    }
    // Preferred timing funtion
    var getTime;
    (function() {
        var perf = w.performance;
        if (perf && (perf.now || perf.webkitNow)) {
            var perfNow = perf.now ? 'now' : 'webkitNow';
            getTime = perf[perfNow].bind(perf);
        } else getTime = function() {
            return +new Date();
        };
    })();
    // Local WindowAnimationTiming interface polyfill
    var cAF = w.cancelAnimationFrame || w.cancelRequestAnimationFrame;
    var rAF = w.requestAnimationFrame;
    (function() {
        var vendors = [
            'moz',
            'webkit',
            'o'
        ];
        var lastTime = 0;
        // For a more accurate WindowAnimationTiming interface implementation, ditch the native
        // requestAnimationFrame when cancelAnimationFrame is not present (older versions of Firefox)
        for(var i = 0, l = vendors.length; i < l && !cAF; ++i){
            cAF = w[vendors[i] + 'CancelAnimationFrame'] || w[vendors[i] + 'CancelRequestAnimationFrame'];
            rAF = cAF && w[vendors[i] + 'RequestAnimationFrame'];
        }
        if (!cAF) {
            rAF = function(callback) {
                var currTime = getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                lastTime = currTime + timeToCall;
                return w.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
            };
            cAF = function(id) {
                clearTimeout(id);
            };
        }
    })();
    // Property name for assigning element text content
    var textProp = type(document.createElement('div').textContent) === 'string' ? 'textContent' : 'innerText';
    /**
	 * FPSMeter class.
	 *
	 * @param {Element} anchor  Element to append the meter to. Default is document.body.
	 * @param {Object}  options Object with options.
	 */ function FPSMeter(anchor, options) {
        // Optional arguments
        if (type(anchor) === 'object' && anchor.nodeType === undefined) {
            options = anchor;
            anchor = document.body;
        }
        if (!anchor) anchor = document.body;
        // Private properties
        var self = this;
        var o = extend({
        }, FPSMeter.defaults, options || {
        });
        var el = {
        };
        var cols = [];
        var theme, heatmaps;
        var heatDepth = 100;
        var heating = [];
        var thisFrameTime = 0;
        var frameTime = o.threshold;
        var frameStart = 0;
        var lastLoop = getTime() - frameTime;
        var time;
        var fpsHistory = [];
        var durationHistory = [];
        var frameID, renderID;
        var showFps = o.show === 'fps';
        var graphHeight, count, i, j;
        // Exposed properties
        self.options = o;
        self.fps = 0;
        self.duration = 0;
        self.isPaused = 0;
        /**
		 * Tick start for measuring the actual rendering duration.
		 *
		 * @return {Void}
		 */ self.tickStart = function() {
            frameStart = getTime();
        };
        /**
		 * FPS tick.
		 *
		 * @return {Void}
		 */ self.tick = function() {
            time = getTime();
            thisFrameTime = time - lastLoop;
            frameTime += (thisFrameTime - frameTime) / o.smoothing;
            self.fps = 1000 / frameTime;
            self.duration = frameStart < lastLoop ? frameTime : time - frameStart;
            lastLoop = time;
        };
        /**
		 * Pause display rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.pause = function() {
            if (frameID) {
                self.isPaused = 1;
                clearTimeout(frameID);
                cAF(frameID);
                cAF(renderID);
                frameID = renderID = 0;
            }
            return self;
        };
        /**
		 * Resume display rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.resume = function() {
            if (!frameID) {
                self.isPaused = 0;
                requestRender();
            }
            return self;
        };
        /**
		 * Update options.
		 *
		 * @param {String} name  Option name.
		 * @param {Mixed}  value New value.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.set = function(name, value) {
            o[name] = value;
            showFps = o.show === 'fps';
            // Rebuild or reposition elements when specific option has been updated
            if (inArray(name, rebuilders) !== -1) createMeter();
            if (inArray(name, repositioners) !== -1) positionMeter();
            return self;
        };
        /**
		 * Change meter into rendering duration mode.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.showDuration = function() {
            self.set('show', 'ms');
            return self;
        };
        /**
		 * Change meter into FPS mode.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.showFps = function() {
            self.set('show', 'fps');
            return self;
        };
        /**
		 * Toggles between show: 'fps' and show: 'duration'.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.toggle = function() {
            self.set('show', showFps ? 'ms' : 'fps');
            return self;
        };
        /**
		 * Hide the FPSMeter. Also pauses the rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.hide = function() {
            self.pause();
            el.container.style.display = 'none';
            return self;
        };
        /**
		 * Show the FPSMeter. Also resumes the rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */ self.show = function() {
            self.resume();
            el.container.style.display = 'block';
            return self;
        };
        /**
		 * Check the current FPS and save it in history.
		 *
		 * @return {Void}
		 */ function historyTick() {
            for(i = o.history; i--;){
                fpsHistory[i] = i === 0 ? self.fps : fpsHistory[i - 1];
                durationHistory[i] = i === 0 ? self.duration : durationHistory[i - 1];
            }
        }
        /**
		 * Returns heat hex color based on values passed.
		 *
		 * @param  {Integer} heatmap
		 * @param  {Integer} value
		 * @param  {Integer} min
		 * @param  {Integer} max
		 *
		 * @return {Integer}
		 */ function getHeat(heatmap, value, min, max) {
            return heatmaps[0 | heatmap][Math.round(Math.min((value - min) / (max - min) * heatDepth, heatDepth))];
        }
        /**
		 * Update counter number and legend.
		 *
		 * @return {Void}
		 */ function updateCounter() {
            // Update legend only when changed
            if (el.legend.fps !== showFps) {
                el.legend.fps = showFps;
                el.legend[textProp] = showFps ? 'FPS' : 'ms';
            }
            // Update counter with a nicely formated & readable number
            count = showFps ? self.fps : self.duration;
            el.count[textProp] = count > 999 ? '999+' : count.toFixed(count > 99 ? 0 : o.decimals);
        }
        /**
		 * Render current FPS state.
		 *
		 * @return {Void}
		 */ function render() {
            time = getTime();
            // If renderer stopped reporting, do a simulated drop to 0 fps
            if (lastLoop < time - o.threshold) {
                self.fps -= self.fps / Math.max(1, o.smoothing * 60 / o.interval);
                self.duration = 1000 / self.fps;
            }
            historyTick();
            updateCounter();
            // Apply heat to elements
            if (o.heat) {
                if (heating.length) for(i = heating.length; i--;)heating[i].el.style[theme[heating[i].name].heatOn] = showFps ? getHeat(theme[heating[i].name].heatmap, self.fps, 0, o.maxFps) : getHeat(theme[heating[i].name].heatmap, self.duration, o.threshold, 0);
                if (el.graph && theme.column.heatOn) for(i = cols.length; i--;)cols[i].style[theme.column.heatOn] = showFps ? getHeat(theme.column.heatmap, fpsHistory[i], 0, o.maxFps) : getHeat(theme.column.heatmap, durationHistory[i], o.threshold, 0);
            }
            // Update graph columns height
            if (el.graph) for(j = 0; j < o.history; j++)cols[j].style.height = (showFps ? fpsHistory[j] ? Math.round(graphHeight / o.maxFps * Math.min(fpsHistory[j], o.maxFps)) : 0 : durationHistory[j] ? Math.round(graphHeight / o.threshold * Math.min(durationHistory[j], o.threshold)) : 0) + 'px';
        }
        /**
		 * Request rendering loop.
		 *
		 * @return {Int} Animation frame index.
		 */ function requestRender() {
            if (o.interval < 20) {
                frameID = rAF(requestRender);
                render();
            } else {
                frameID = setTimeout(requestRender, o.interval);
                renderID = rAF(render);
            }
        }
        /**
		 * Meter events handler.
		 *
		 * @return {Void}
		 */ function eventHandler(event) {
            event = event || window.event;
            if (event.preventDefault) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.returnValue = false;
                event.cancelBubble = true;
            }
            self.toggle();
        }
        /**
		 * Destroys the current FPSMeter instance.
		 *
		 * @return {Void}
		 */ self.destroy = function() {
            // Stop rendering
            self.pause();
            // Remove elements
            removeMeter();
            // Stop listening
            self.tick = self.tickStart = function() {
            };
        };
        /**
		 * Remove meter element.
		 *
		 * @return {Void}
		 */ function removeMeter() {
            // Unbind listeners
            if (o.toggleOn) listener(el.container, o.toggleOn, eventHandler, 1);
            // Detach element
            anchor.removeChild(el.container);
        }
        /**
		 * Sets the theme, and generates heatmaps when needed.
		 */ function setTheme() {
            theme = FPSMeter.theme[o.theme];
            // Generate heatmaps
            heatmaps = theme.compiledHeatmaps || [];
            if (!heatmaps.length && theme.heatmaps.length) {
                for(j = 0; j < theme.heatmaps.length; j++){
                    heatmaps[j] = [];
                    for(i = 0; i <= heatDepth; i++)heatmaps[j][i] = hslToHex(0.33 / heatDepth * i, theme.heatmaps[j].saturation, theme.heatmaps[j].lightness);
                }
                theme.compiledHeatmaps = heatmaps;
            }
        }
        /**
		 * Creates and attaches the meter element.
		 *
		 * @return {Void}
		 */ function createMeter() {
            // Remove old meter if present
            if (el.container) removeMeter();
            // Set theme
            setTheme();
            // Create elements
            el.container = applyTheme(newEl('div'), theme.container);
            el.count = el.container.appendChild(applyTheme(newEl('div'), theme.count));
            el.legend = el.container.appendChild(applyTheme(newEl('div'), theme.legend));
            el.graph = o.graph ? el.container.appendChild(applyTheme(newEl('div'), theme.graph)) : 0;
            // Add elements to heating array
            heating.length = 0;
            for(var key in el)if (el[key] && theme[key].heatOn) heating.push({
                name: key,
                el: el[key]
            });
            // Graph
            cols.length = 0;
            if (el.graph) {
                // Create graph
                el.graph.style.width = o.history * theme.column.width + (o.history - 1) * theme.column.spacing + 'px';
                // Add columns
                for(i = 0; i < o.history; i++){
                    cols[i] = el.graph.appendChild(applyTheme(newEl('div'), theme.column));
                    cols[i].style.position = 'absolute';
                    cols[i].style.bottom = 0;
                    cols[i].style.right = i * theme.column.width + i * theme.column.spacing + 'px';
                    cols[i].style.width = theme.column.width + 'px';
                    cols[i].style.height = '0px';
                }
            }
            // Set the initial state
            positionMeter();
            updateCounter();
            // Append container to anchor
            anchor.appendChild(el.container);
            // Retrieve graph height after it was appended to DOM
            if (el.graph) graphHeight = el.graph.clientHeight;
            // Add event listeners
            if (o.toggleOn) {
                if (o.toggleOn === 'click') el.container.style.cursor = 'pointer';
                listener(el.container, o.toggleOn, eventHandler);
            }
        }
        /**
		 * Positions the meter based on options.
		 *
		 * @return {Void}
		 */ function positionMeter() {
            applyTheme(el.container, o);
        }
        (function() {
            // Create meter element
            createMeter();
            // Start rendering
            requestRender();
        })();
    }
    // Expose the extend function
    FPSMeter.extend = extend;
    // Expose the FPSMeter class
    window.FPSMeter = FPSMeter;
    // Default options
    FPSMeter.defaults = {
        interval: 100,
        smoothing: 10,
        show: 'fps',
        toggleOn: 'click',
        decimals: 1,
        maxFps: 60,
        threshold: 100,
        // Meter position
        position: 'absolute',
        zIndex: 10,
        left: '5px',
        top: '5px',
        right: 'auto',
        bottom: 'auto',
        margin: '0 0 0 0',
        // Theme
        theme: 'dark',
        heat: 0,
        // Graph
        graph: 0,
        history: 20 // How many history states to show in a graph.
    };
    // Option names that trigger FPSMeter rebuild or reposition when modified
    var rebuilders = [
        'toggleOn',
        'theme',
        'heat',
        'graph',
        'history'
    ];
    var repositioners = [
        'position',
        'zIndex',
        'left',
        'top',
        'right',
        'bottom',
        'margin'
    ];
})(window);
(function(w, FPSMeter, undefined) {
    // Themes object
    FPSMeter.theme = {
    };
    // Base theme with layout, no colors
    var base = FPSMeter.theme.base = {
        heatmaps: [],
        container: {
            // Settings
            heatOn: null,
            heatmap: null,
            // Styles
            padding: '5px',
            minWidth: '95px',
            height: '30px',
            lineHeight: '30px',
            textAlign: 'right',
            textShadow: 'none'
        },
        count: {
            // Settings
            heatOn: null,
            heatmap: null,
            // Styles
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '5px 10px',
            height: '30px',
            fontSize: '24px',
            fontFamily: 'Consolas, Andale Mono, monospace',
            zIndex: 2
        },
        legend: {
            // Settings
            heatOn: null,
            heatmap: null,
            // Styles
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '5px 10px',
            height: '30px',
            fontSize: '12px',
            lineHeight: '32px',
            fontFamily: 'sans-serif',
            textAlign: 'left',
            zIndex: 2
        },
        graph: {
            // Settings
            heatOn: null,
            heatmap: null,
            // Styles
            position: 'relative',
            boxSizing: 'padding-box',
            MozBoxSizing: 'padding-box',
            height: '100%',
            zIndex: 1
        },
        column: {
            // Settings
            width: 4,
            spacing: 1,
            heatOn: null,
            heatmap: null
        }
    };
    // Dark theme
    FPSMeter.theme.dark = FPSMeter.extend({
    }, base, {
        heatmaps: [
            {
                saturation: 0.8,
                lightness: 0.8
            }
        ],
        container: {
            background: '#222',
            color: '#fff',
            border: '1px solid #1a1a1a',
            textShadow: '1px 1px 0 #222'
        },
        count: {
            heatOn: 'color'
        },
        column: {
            background: '#3f3f3f'
        }
    });
    // Light theme
    FPSMeter.theme.light = FPSMeter.extend({
    }, base, {
        heatmaps: [
            {
                saturation: 0.5,
                lightness: 0.5
            }
        ],
        container: {
            color: '#666',
            background: '#fff',
            textShadow: '1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)'
        },
        count: {
            heatOn: 'color'
        },
        column: {
            background: '#eaeaea'
        }
    });
    // Colorful theme
    FPSMeter.theme.colorful = FPSMeter.extend({
    }, base, {
        heatmaps: [
            {
                saturation: 0.5,
                lightness: 0.6
            }
        ],
        container: {
            heatOn: 'backgroundColor',
            background: '#888',
            color: '#fff',
            textShadow: '1px 1px 0 rgba(0,0,0,.2)',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)'
        },
        column: {
            background: '#777',
            backgroundColor: 'rgba(0,0,0,.2)'
        }
    });
    // Transparent theme
    FPSMeter.theme.transparent = FPSMeter.extend({
    }, base, {
        heatmaps: [
            {
                saturation: 0.8,
                lightness: 0.5
            }
        ],
        container: {
            padding: 0,
            color: '#fff',
            textShadow: '1px 1px 0 rgba(0,0,0,.5)'
        },
        count: {
            padding: '0 5px',
            height: '40px',
            lineHeight: '40px'
        },
        legend: {
            padding: '0 5px',
            height: '40px',
            lineHeight: '42px'
        },
        graph: {
            height: '40px'
        },
        column: {
            width: 5,
            background: '#999',
            heatOn: 'backgroundColor',
            opacity: 0.5
        }
    });
})(window, FPSMeter);

},{}],"oUhap":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilities = require("./utilities");
var _svgInteractor = require("./svg-interactor");
var _svgInteractorDefault = parcelHelpers.interopDefault(_svgInteractor);
/**
 * event.layerX and event.layerY are deprecated. We will use them if they are on the event, but
 * if not we will use a manual calculation.
 *
 * @param {Event} event
 * @returns layerX and layerY, coordinates of event with origin at top right corner of bounding box
 */ const getLayerXandYFromEvent = (event)=>{
    if (event.layerX !== undefined && event.layerY !== undefined) return [
        event.layerX,
        event.layerY
    ];
    const bbox = event.target.getBoundingClientRect();
    const x = event.clientX - bbox.left;
    const y = event.clientY - bbox.top;
    return [
        x,
        y
    ];
};
class MouseReader {
    /**
   * Set the specification of the mouse reader and the svg interaction
   * @param {Object} specification
   */ setSpecification(specification) {
        const styles = _utilities.getDimAndMarginStyleForSpecification(specification);
        this.element.style.width = styles.width;
        this.element.style.height = styles.height;
        this.element.style.margin = styles.margin;
        this.viewport = _utilities.getViewportForSpecification(specification);
        this.SVGInteractor.setSpecification(specification);
        this._updateSVG();
    }
    /**
   * Set the viewport in the format mouseReader.viewport = [minX, maxX, minY, maxY].
   * Mostly used to make WebGLVis.setViewOptions simpler.
   */ set viewport(toSet) {
        this.minX = toSet[0];
        this.maxX = toSet[1];
        this.minY = toSet[2];
        this.maxY = toSet[3];
        this.currentXRange = [
            this.minX,
            this.maxX
        ];
        this.currentYRange = [
            this.minY,
            this.maxY
        ];
    }
    /**
   * Init the mouse reader by adding its elements to DOM and adding event handlers
   */ init() {
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.element.parentElement.appendChild(this.SVGInteractor.svg);
        this.SVGInteractor.init();
        this._updateSVG();
        this.element.addEventListener("wheel", this._onWheel.bind(this), false);
        let mouseDown = false;
        this.element.addEventListener("mousedown", (event)=>{
            mouseDown = true;
            switch(this.tool){
                case "pan":
                    break;
                case "box":
                case "lasso":
                    this._currentSelectionPoints = [
                        ...this._calculateViewportSpot(...getLayerXandYFromEvent(event)), 
                    ];
                    break;
            }
        }, false);
        this.element.addEventListener("mousemove", (event)=>{
            this.handler.getClosestPoint(this._calculateViewportSpot(...getLayerXandYFromEvent(event)));
            if (!mouseDown) return;
            switch(this.tool){
                case "pan":
                    this._onPan(event);
                    break;
                case "box":
                    this._currentSelectionPoints = this._currentSelectionPoints.slice(0, 2).concat(this._calculateViewportSpot(...getLayerXandYFromEvent(event)));
                    this.element.parentElement.dispatchEvent(new CustomEvent("onSelection", {
                        detail: {
                            bounds: this._currentSelectionPoints,
                            type: this.tool
                        }
                    }));
                    break;
                case "lasso":
                    this._currentSelectionPoints.push(...this._calculateViewportSpot(...getLayerXandYFromEvent(event)));
                    this.element.parentElement.dispatchEvent(new CustomEvent("onSelection", {
                        detail: {
                            bounds: this._currentSelectionPoints,
                            type: this.tool
                        }
                    }));
                    break;
                case "tooltip":
                    break;
            }
            this._updateSVG();
        }, false);
        this.element.addEventListener("mouseup", (event)=>{
            mouseDown = false;
            switch(this.tool){
                case "pan":
                    break;
                case "box":
                    if (this._currentSelectionPoints.length !== 4) {
                        this._currentSelectionPoints = [];
                        return;
                    }
                    this._onSelect();
                    break;
                case "lasso":
                    if (this._currentSelectionPoints.length < 6) {
                        this._currentSelectionPoints = [];
                        this._updateSVG();
                        return;
                    }
                    this._onSelect();
                    break;
            }
        });
        this.element.addEventListener("mouseleave", ()=>{
            switch(this.tool){
                case "pan":
                    mouseDown = false;
                    break;
                case "box":
                    break;
                case "lasso":
                    break;
                case "tooltip":
                    break;
            }
        });
        this.element.addEventListener("dblclick", (event)=>{
            this.handler.getClickPoint(this._calculateViewportSpot(...getLayerXandYFromEvent(event)));
        }, false);
    }
    /**
   * Get current viewport info such as min/max bounds and current ranges
   *
   * @returns Current viewport information the mouse reader has calculated
   */ getViewport() {
        return {
            minX: this.minX,
            maxX: this.maxX,
            minY: this.minY,
            maxY: this.maxY,
            xRange: this.currentXRange,
            yRange: this.currentYRange
        };
    }
    /**
   * Method to handle wheel events for zooming in and out of canvas
   *
   * @param {WheelEvent} event
   */ _onWheel(event) {
        event.preventDefault();
        if (!this.lockedX) {
            const previousX = [
                ...this.currentXRange
            ]; // ... to avoid aliasing
            const t = -event.wheelDelta / 1000;
            const inDataSpace = this._calculateViewportSpot(...getLayerXandYFromEvent(event));
            this.currentXRange[0] = t * inDataSpace[0] + (1 - t) * this.currentXRange[0];
            this.currentXRange[1] = t * inDataSpace[0] + (1 - t) * this.currentXRange[1];
            this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
            this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);
            if (!this._validateXRange()) // Zoom in limit
            this.currentXRange = previousX;
        }
        if (!this.lockedY) {
            const previousY = [
                ...this.currentYRange
            ];
            const t = -event.wheelDelta / 1000;
            const inDataSpace = this._calculateViewportSpot(...getLayerXandYFromEvent(event));
            this.currentYRange[0] = t * inDataSpace[1] + (1 - t) * this.currentYRange[0];
            this.currentYRange[1] = t * inDataSpace[1] + (1 - t) * this.currentYRange[1];
            this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
            this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);
            if (!this._validateYRange()) // Zoom in limit
            this.currentYRange = previousY;
        }
        this.element.parentElement.dispatchEvent(new CustomEvent(event.wheelDelta < 0 ? "zoomIn" : "zoomOut", {
            detail: {
                viewport: this.getViewport(),
                type: this.tool
            }
        }));
        this.handler.sendDrawerState(this.getViewport());
        this._updateSVG();
    }
    /**
   * Method to handle a clicked mouse moving around canvas to pan around canvas.
   *
   * @param {MouseEvent} event from "mousemove" event
   */ _onPan(event) {
        if (!this.lockedX) {
            const previousX = [
                ...this.currentXRange
            ]; // ... to avoid aliasing
            const xDampen = (this.currentXRange[1] - this.currentXRange[0]) / 1000;
            this.currentXRange[0] -= event.movementX * xDampen;
            this.currentXRange[1] -= event.movementX * xDampen;
            // this.currentXRange[0] = Math.max(this.currentXRange[0], this.minX);
            // this.currentXRange[1] = Math.min(this.currentXRange[1], this.maxX);
            if (!this._validateXRange()) this.currentXRange = previousX;
        }
        if (!this.lockedY) {
            const previousY = [
                ...this.currentYRange
            ];
            const yDampen = (this.currentYRange[1] - this.currentYRange[0]) / 1000;
            this.currentYRange[0] += event.movementY * yDampen;
            this.currentYRange[1] += event.movementY * yDampen;
            // this.currentYRange[0] = Math.max(this.currentYRange[0], this.minY);
            // this.currentYRange[1] = Math.min(this.currentYRange[1], this.maxY);
            if (!this._validateYRange()) this.currentYRange = previousY;
        }
        this.element.parentElement.dispatchEvent(new CustomEvent("pan", {
            detail: {
                viewport: this.getViewport(),
                type: this.tool
            }
        }));
        this.handler.sendDrawerState(this.getViewport());
        this._updateSVG();
    }
    /**
   * Checks if this.currentXRange is valid with first element less than second
   * and if viewport zoom is not above webgl max zoom.
   *
   * @return true if range is valid, false otherwise
   */ _validateXRange() {
        return this.currentXRange[1] >= this.currentXRange[0];
    }
    /**
   * Checks if this.currentYRange is valid with first element less than second
   * and if viewport zoom is not above webgl max zoom.
   *
   * @return true if range is valid, false otherwise
   */ _validateYRange() {
        return this.currentYRange[1] >= this.currentYRange[0];
    }
    /**
   * Updates the DOM component used to show user selection or axis.
   * Calls methods from SVGInteractor.
   */ _updateSVG() {
        this.SVGInteractor.updateView(this.currentXRange, this.currentYRange, this.width, this.height);
        this.SVGInteractor.updateSelectView(this._currentSelectionPoints);
    }
    /**
   * Executes when user has confirmed selection points (typically by releasing mouse)
   */ _onSelect() {
        this.handler.selectPoints(this._currentSelectionPoints);
    }
    /**
   * Calculate the location on the real coordinate space a point on the canvas corresponds to.
   *
   * @param {Float} canvasX likely from event.layerX or getLayerXandYFromEvent
   * @param {Float} canvasY likely from event.layerY or getLayerXandYFromEvent
   * @returns viewport coordinate as array
   */ _calculateViewportSpot(canvasX, canvasY) {
        const scaleX = _utilities.scale([
            0,
            this.width
        ], this.currentXRange);
        // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
        const scaleY = _utilities.scale([
            this.height,
            0
        ], this.currentYRange);
        return [
            scaleX(canvasX),
            scaleY(canvasY)
        ];
    }
    /**
   * Clears the polygon selection on the visualization
   */ clear() {
        this._currentSelectionPoints = [];
        this.SVGInteractor.clear();
    }
    /**
   *
   * @param {HTMLElement} element meant to read mouse events, necessary since OffscreenCanvas cannot read DOM events
   * @param {WebGLVis} handler WebGLVis that is using this mousereader
   */ constructor(element, handler){
        this.element = element;
        this.element.style.position = "absolute";
        this.element.style.width = "100%";
        this.element.style.height = "100%";
        this.handler = handler;
        this._currentSelectionPoints = [];
        this.tool = "pan";
        // Initializing elements to show user their current selection
        this.SVGInteractor = new _svgInteractorDefault.default(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    }
}
exports.default = MouseReader;

},{"./utilities":"8sDGp","./svg-interactor":"crqYP","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8sDGp":[function(require,module,exports) {
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

},{"./genome-sizes":"eljsq","d3-color":"grhaa","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"eljsq":[function(require,module,exports) {
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

},{"./utilities":"8sDGp","d3-format":"4XOv2","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"4XOv2":[function(require,module,exports) {
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

},{"./defaultLocale.js":"g4Ai7","./locale.js":"8sic5","./formatSpecifier.js":"4gfsY","./precisionFixed.js":"kCBOH","./precisionPrefix.js":"anfJX","./precisionRound.js":"djznD","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"g4Ai7":[function(require,module,exports) {
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

},{"./locale.js":"8sic5","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8sic5":[function(require,module,exports) {
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

},{"./exponent.js":"7L05r","./formatGroup.js":"97wNI","./formatNumerals.js":"bnEku","./formatSpecifier.js":"4gfsY","./formatTrim.js":"cGiOx","./formatTypes.js":"aVp9c","./formatPrefixAuto.js":"lOwtK","./identity.js":"9nHXj","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"7L05r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _formatDecimalJs = require("./formatDecimal.js");
exports.default = function(x) {
    return x = _formatDecimalJs.formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
};

},{"./formatDecimal.js":"fkS16","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"fkS16":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"97wNI":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"bnEku":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(numerals) {
    return function(value) {
        return value.replace(/[0-9]/g, function(i) {
            return numerals[+i];
        });
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"4gfsY":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"cGiOx":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aVp9c":[function(require,module,exports) {
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

},{"./formatDecimal.js":"fkS16","./formatPrefixAuto.js":"lOwtK","./formatRounded.js":"gq71u","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"lOwtK":[function(require,module,exports) {
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

},{"./formatDecimal.js":"fkS16","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"gq71u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _formatDecimalJs = require("./formatDecimal.js");
exports.default = function(x, p) {
    var d = _formatDecimalJs.formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};

},{"./formatDecimal.js":"fkS16","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"9nHXj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(x) {
    return x;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kCBOH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _exponentJs = require("./exponent.js");
var _exponentJsDefault = parcelHelpers.interopDefault(_exponentJs);
exports.default = function(step) {
    return Math.max(0, -_exponentJsDefault.default(Math.abs(step)));
};

},{"./exponent.js":"7L05r","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"anfJX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _exponentJs = require("./exponent.js");
var _exponentJsDefault = parcelHelpers.interopDefault(_exponentJs);
exports.default = function(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(_exponentJsDefault.default(value) / 3))) * 3 - _exponentJsDefault.default(Math.abs(step)));
};

},{"./exponent.js":"7L05r","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"djznD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _exponentJs = require("./exponent.js");
var _exponentJsDefault = parcelHelpers.interopDefault(_exponentJs);
exports.default = function(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, _exponentJsDefault.default(max) - _exponentJsDefault.default(step)) + 1;
};

},{"./exponent.js":"7L05r","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"grhaa":[function(require,module,exports) {
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

},{"./color.js":"cNCyv","./lab.js":false,"./cubehelix.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"cNCyv":[function(require,module,exports) {
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

},{"./define.js":"avQOe","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"avQOe":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"crqYP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilities = require("./utilities");
var _d3Axis = require("d3-axis");
var _d3Scale = require("d3-scale");
var _d3Selection = require("d3-selection");
class SVGInteractor {
    /**
   * Set the specification for this class to refer to.
   *
   * @param {Object} specification
   */ setSpecification(specification) {
        this.specification = specification;
        const styles = _utilities.getDimAndMarginStyleForSpecification(specification);
        this.svg.style.width = styles.width;
        this.svg.style.height = styles.height;
        this.svg.style.margin = styles.margin;
        this.initialX = undefined; // used for updating labels
        this.initialY = undefined;
        _d3Selection.select(this._labelMarker).selectAll("*").remove();
        for (const _ of this.specification.labels || [])_d3Selection.select(this._labelMarker).append("text");
    }
    /**
   * Add svg elements to the DOM
   */ init() {
        this.svg.appendChild(this._selectMarker);
        this.svg.appendChild(this._labelMarker);
        this.xAxisAnchor = this.d3SVG.append("g");
        this.yAxisAnchor = this.d3SVG.append("g");
    }
    /**
   * Update the svg using the new viewport information
   * @param {Array} currentXRange of mousereader
   * @param {Array} currentYRange of mousereader
   * @param {Number} width of mousereader
   * @param {Number} height of mousereader
   */ updateView(currentXRange, currentYRange, width, height) {
        this.currentXRange = currentXRange;
        this.currentYRange = currentYRange;
        this.width = width;
        this.height = height;
        if (this.currentXRange) {
            this.xAxis = this._calculateAxis("x", this.specification.xAxis, this.specification, _utilities.getScaleForSpecification("x", this.specification), this.xAxisAnchor);
            if (this.specification.labels) this.updateLabels();
        }
        if (this.xAxis) this.xAxisAnchor.call(this.xAxis);
        if (this.currentYRange) this.yAxis = this._calculateAxis("y", this.specification.yAxis, this.specification, _utilities.getScaleForSpecification("y", this.specification), this.yAxisAnchor);
        if (this.yAxis) this.yAxisAnchor.call(this.yAxis);
    }
    updateLabels() {
        if (!this.initialX && this.specification.labels) this.initialX = this.specification.labels.map((label)=>this._calculateViewportSpotInverse(label.x, label.y)[0]
        );
        if (!this.initialY && this.specification.labels) this.initialY = this.specification.labels.map((label)=>this._calculateViewportSpotInverse(label.x, label.y)[1]
        );
        _d3Selection.select(this._labelMarker).selectAll("text").data(this.specification.labels).text((d)=>d.text
        ).attr("x", (d, i)=>{
            if (d.fixedX) return this.initialX[i];
            return this._calculateViewportSpotInverse(d.x, d.y)[0];
        }).attr("y", (d, i)=>{
            if (d.fixedY) return this.initialY[i];
            return this._calculateViewportSpotInverse(d.x, d.y)[1];
        }).each(function(d) {
            // Set any possible svg properties specified in label
            for(const property in d){
                if ([
                    "x",
                    "y",
                    "text"
                ].includes(property)) continue;
                _d3Selection.select(this).attr(property, d[property]);
            }
        });
    }
    _calculateAxis(dimension, orientation, specification, genomeScale, anchor) {
        let axis, domain, range;
        if (dimension === "x") {
            domain = this.currentXRange;
            range = [
                0,
                this.width
            ];
            switch(orientation){
                case "none":
                    anchor.attr("transform", `translate(-1000000, -1000000)`);
                    return null;
                case "top":
                    axis = _d3Axis.axisTop();
                    anchor.attr("transform", `translate(0, 0)`);
                    break;
                case "center":
                    axis = _d3Axis.axisBottom();
                    anchor.attr("transform", `translate(0, ${this.height / 2})`);
                    break;
                case "zero":
                    const yScale = _d3Scale.scaleLinear().domain(this.currentYRange).range([
                        this.height,
                        0
                    ]);
                    axis = _d3Axis.axisBottom();
                    anchor.attr("transform", `translate(0, ${yScale(0)})`);
                    break;
                case "bottom":
                default:
                    axis = _d3Axis.axisBottom();
                    anchor.attr("transform", `translate(0, ${this.height})`);
                    break;
            }
        }
        if (dimension === "y") {
            domain = this.currentYRange;
            range = [
                this.height,
                0
            ];
            switch(orientation){
                case "none":
                    anchor.attr("transform", `translate(-1000000, -1000000)`);
                    return null;
                case "center":
                    axis = _d3Axis.axisRight();
                    anchor.attr("transform", `translate(${this.width / 2}, 0)`);
                    break;
                case "right":
                    axis = _d3Axis.axisRight();
                    anchor.attr("transform", `translate(${this.width}, 0)`);
                    break;
                case "zero":
                    const xScale = _d3Scale.scaleLinear().domain(this.currentXRange).range([
                        0,
                        this.width
                    ]);
                    axis = _d3Axis.axisLeft();
                    anchor.attr("transform", `translate(${xScale(0)}, 0)`);
                    break;
                case "left":
                default:
                    axis = _d3Axis.axisLeft();
                    anchor.attr("transform", `translate(0, 0)`);
                    break;
            }
        }
        let genomic = false;
        for (const track of specification.tracks)if (track[dimension].type && track[dimension].type.includes("genomic")) genomic = true;
        if (!genomic) return axis.scale(_d3Scale.scaleLinear().domain(domain).range(range));
        let tickInfo;
        if (dimension === "x") tickInfo = genomeScale.getTickCoordsAndLabels(domain[0], domain[1]);
        else tickInfo = genomeScale.getTickCoordsAndLabels(range[0], range[1]);
        return axis.scale(_d3Scale.scaleLinear().domain(domain).range(range)).tickValues(tickInfo.tickCoords).tickFormat((_, index)=>tickInfo.tickLabels[index]
        );
    }
    /**
   * Updates user selection view if they have selected a box
   */ _updateBoxSelectView(points) {
        if (points.length !== 4) return;
        const topLeftCorner = this._calculateViewportSpotInverse(points[0], points[1]);
        const bottomRightCorner = this._calculateViewportSpotInverse(points[2], points[3]);
        let pointAttr = `${topLeftCorner[0]},${topLeftCorner[1]} 
                     ${topLeftCorner[0]},${bottomRightCorner[1]}, 
                     ${bottomRightCorner[0]},${bottomRightCorner[1]}
                     ${bottomRightCorner[0]},${topLeftCorner[1]}
                     `;
        this._selectMarker.setAttribute("points", pointAttr);
    }
    /**
   * Update the selection box/lasso with the points as bounds
   *
   * @param {Array} points 1D array of coordinates that are used for selection ex. [x1,y1,x2,y2,...]
   */ updateSelectView(points) {
        if (points.length === 4) {
            this._updateBoxSelectView(points);
            return;
        }
        if (points.length < 6) {
            this._selectMarker.setAttribute("points", "");
            return;
        }
        let pointAttr = "";
        for(let i = 0; i < points.length; i += 2){
            const asCanvasPoint = this._calculateViewportSpotInverse(points[i], points[i + 1]);
            pointAttr += `${asCanvasPoint[0]}, ${asCanvasPoint[1]} `;
        }
        this._selectMarker.setAttribute("points", pointAttr);
    }
    /**
   * Calculate the location on the canvas a real coordniate corresponds to.
   *
   * @param {Float} viewportX x coordinate of data space
   * @param {Float} viewportY y coordniate of data space
   * @returns canvas coordindate as array
   */ _calculateViewportSpotInverse(viewportX, viewportY) {
        const inverseScaleX = _utilities.scale(this.currentXRange, [
            0,
            this.width
        ]);
        // Flipped for Y since canvas using typical graphics coordinates but GPU clipspace is typical cartesian coordinates
        const inverseScaleY = _utilities.scale(this.currentYRange, [
            this.height,
            0
        ]);
        return [
            inverseScaleX(viewportX),
            inverseScaleY(viewportY)
        ];
    }
    /**
   * Clears the polygon selection on the visualization
   */ clear() {
        this._selectMarker.setAttribute("points", "");
    }
    /**
   * A class used to illustrate state of the visualization on the main thread such as
   * selection or axis.
   *
   * @param {SVGElement} svg container for all svg elements
   */ constructor(svg){
        this.svg = svg;
        this.d3SVG = _d3Selection.select(this.svg);
        this.svg.style.width = "100%";
        this.svg.style.height = "100%";
        this.svg.style.position = "absolute";
        this.svg.style.zIndex = "1000";
        this.svg.style.pointerEvents = "none";
        this.svg.style.overflow = "visible";
        this._selectMarker = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this._selectMarker.setAttribute("fill", "rgba(124, 124, 247, 0.3)");
        this._selectMarker.setAttribute("stroke", "rgb(136, 128, 247)");
        this._selectMarker.setAttribute("stroke-width", 1);
        this._selectMarker.setAttribute("stroke-dasharray", "5,5");
        this._labelMarker = document.createElementNS("http://www.w3.org/2000/svg", "g");
    }
}
exports.default = SVGInteractor;

},{"./utilities":"8sDGp","d3-axis":"2g6gM","d3-scale":"UQ8g3","d3-selection":"gn9gd","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2g6gM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "axisTop", ()=>_axisJs.axisTop
);
parcelHelpers.export(exports, "axisRight", ()=>_axisJs.axisRight
);
parcelHelpers.export(exports, "axisBottom", ()=>_axisJs.axisBottom
);
parcelHelpers.export(exports, "axisLeft", ()=>_axisJs.axisLeft
);
var _axisJs = require("./axis.js");

},{"./axis.js":"lwARn","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"lwARn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "axisTop", ()=>axisTop
);
parcelHelpers.export(exports, "axisRight", ()=>axisRight
);
parcelHelpers.export(exports, "axisBottom", ()=>axisBottom
);
parcelHelpers.export(exports, "axisLeft", ()=>axisLeft
);
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
var top = 1, right = 2, bottom = 3, left = 4, epsilon = 0.000001;
function translateX(x) {
    return "translate(" + x + ",0)";
}
function translateY(y) {
    return "translate(0," + y + ")";
}
function number(scale) {
    return (d)=>+scale(d)
    ;
}
function center(scale, offset) {
    offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
    if (scale.round()) offset = Math.round(offset);
    return (d)=>+scale(d) + offset
    ;
}
function entering() {
    return !this.__axis;
}
function axis(orient, scale) {
    var tickArguments = [], tickValues = null, tickFormat = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5, k = orient === top || orient === left ? -1 : 1, x = orient === left || orient === right ? "x" : "y", transform = orient === top || orient === bottom ? translateX : translateY;
    function axis1(context) {
        var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : _identityJsDefault.default : tickFormat, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + offset, range1 = +range[range.length - 1] + offset, position = (scale.bandwidth ? center : number)(scale.copy(), offset), selection = context.selection ? context.selection() : context, path = selection.selectAll(".domain").data([
            null
        ]), tick = selection.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
        path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
        tick = tick.merge(tickEnter);
        line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
        text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
        if (context !== selection) {
            path = path.transition(context);
            tick = tick.transition(context);
            line = line.transition(context);
            text = text.transition(context);
            tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function(d) {
                return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform");
            });
            tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
                var p = this.parentNode.__axis;
                return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset);
            });
        }
        tickExit.remove();
        path.attr("d", orient === left || orient === right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
        tick.attr("opacity", 1).attr("transform", function(d) {
            return transform(position(d) + offset);
        });
        line.attr(x + "2", k * tickSizeInner);
        text.attr(x, k * spacing).text(format);
        selection.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
        selection.each(function() {
            this.__axis = position;
        });
    }
    axis1.scale = function(_) {
        return arguments.length ? (scale = _, axis1) : scale;
    };
    axis1.ticks = function() {
        return tickArguments = Array.from(arguments), axis1;
    };
    axis1.tickArguments = function(_) {
        return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis1) : tickArguments.slice();
    };
    axis1.tickValues = function(_) {
        return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis1) : tickValues && tickValues.slice();
    };
    axis1.tickFormat = function(_) {
        return arguments.length ? (tickFormat = _, axis1) : tickFormat;
    };
    axis1.tickSize = function(_) {
        return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis1) : tickSizeInner;
    };
    axis1.tickSizeInner = function(_) {
        return arguments.length ? (tickSizeInner = +_, axis1) : tickSizeInner;
    };
    axis1.tickSizeOuter = function(_) {
        return arguments.length ? (tickSizeOuter = +_, axis1) : tickSizeOuter;
    };
    axis1.tickPadding = function(_) {
        return arguments.length ? (tickPadding = +_, axis1) : tickPadding;
    };
    axis1.offset = function(_) {
        return arguments.length ? (offset = +_, axis1) : offset;
    };
    return axis1;
}
function axisTop(scale) {
    return axis(top, scale);
}
function axisRight(scale) {
    return axis(right, scale);
}
function axisBottom(scale) {
    return axis(bottom, scale);
}
function axisLeft(scale) {
    return axis(left, scale);
}

},{"./identity.js":"aXZUf","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aXZUf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(x) {
    return x;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"UQ8g3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scaleBand", ()=>_bandJsDefault.default
);
parcelHelpers.export(exports, "scalePoint", ()=>_bandJs.point
);
parcelHelpers.export(exports, "scaleIdentity", ()=>_identityJsDefault.default
);
parcelHelpers.export(exports, "scaleLinear", ()=>_linearJsDefault.default
);
parcelHelpers.export(exports, "scaleLog", ()=>_logJsDefault.default
);
parcelHelpers.export(exports, "scaleSymlog", ()=>_symlogJsDefault.default
);
parcelHelpers.export(exports, "scaleOrdinal", ()=>_ordinalJsDefault.default
);
parcelHelpers.export(exports, "scaleImplicit", ()=>_ordinalJs.implicit
);
parcelHelpers.export(exports, "scalePow", ()=>_powJsDefault.default
);
parcelHelpers.export(exports, "scaleSqrt", ()=>_powJs.sqrt
);
parcelHelpers.export(exports, "scaleRadial", ()=>_radialJsDefault.default
);
parcelHelpers.export(exports, "scaleQuantile", ()=>_quantileJsDefault.default
);
parcelHelpers.export(exports, "scaleQuantize", ()=>_quantizeJsDefault.default
);
parcelHelpers.export(exports, "scaleThreshold", ()=>_thresholdJsDefault.default
);
parcelHelpers.export(exports, "scaleTime", ()=>_timeJsDefault.default
);
parcelHelpers.export(exports, "scaleUtc", ()=>_utcTimeJsDefault.default
);
parcelHelpers.export(exports, "scaleSequential", ()=>_sequentialJsDefault.default
);
parcelHelpers.export(exports, "scaleSequentialLog", ()=>_sequentialJs.sequentialLog
);
parcelHelpers.export(exports, "scaleSequentialPow", ()=>_sequentialJs.sequentialPow
);
parcelHelpers.export(exports, "scaleSequentialSqrt", ()=>_sequentialJs.sequentialSqrt
);
parcelHelpers.export(exports, "scaleSequentialSymlog", ()=>_sequentialJs.sequentialSymlog
);
parcelHelpers.export(exports, "scaleSequentialQuantile", ()=>_sequentialQuantileJsDefault.default
);
parcelHelpers.export(exports, "scaleDiverging", ()=>_divergingJsDefault.default
);
parcelHelpers.export(exports, "scaleDivergingLog", ()=>_divergingJs.divergingLog
);
parcelHelpers.export(exports, "scaleDivergingPow", ()=>_divergingJs.divergingPow
);
parcelHelpers.export(exports, "scaleDivergingSqrt", ()=>_divergingJs.divergingSqrt
);
parcelHelpers.export(exports, "scaleDivergingSymlog", ()=>_divergingJs.divergingSymlog
);
parcelHelpers.export(exports, "tickFormat", ()=>_tickFormatJsDefault.default
);
var _bandJs = require("./band.js");
var _bandJsDefault = parcelHelpers.interopDefault(_bandJs);
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
var _linearJs = require("./linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _logJs = require("./log.js");
var _logJsDefault = parcelHelpers.interopDefault(_logJs);
var _symlogJs = require("./symlog.js");
var _symlogJsDefault = parcelHelpers.interopDefault(_symlogJs);
var _ordinalJs = require("./ordinal.js");
var _ordinalJsDefault = parcelHelpers.interopDefault(_ordinalJs);
var _powJs = require("./pow.js");
var _powJsDefault = parcelHelpers.interopDefault(_powJs);
var _radialJs = require("./radial.js");
var _radialJsDefault = parcelHelpers.interopDefault(_radialJs);
var _quantileJs = require("./quantile.js");
var _quantileJsDefault = parcelHelpers.interopDefault(_quantileJs);
var _quantizeJs = require("./quantize.js");
var _quantizeJsDefault = parcelHelpers.interopDefault(_quantizeJs);
var _thresholdJs = require("./threshold.js");
var _thresholdJsDefault = parcelHelpers.interopDefault(_thresholdJs);
var _timeJs = require("./time.js");
var _timeJsDefault = parcelHelpers.interopDefault(_timeJs);
var _utcTimeJs = require("./utcTime.js");
var _utcTimeJsDefault = parcelHelpers.interopDefault(_utcTimeJs);
var _sequentialJs = require("./sequential.js");
var _sequentialJsDefault = parcelHelpers.interopDefault(_sequentialJs);
var _sequentialQuantileJs = require("./sequentialQuantile.js");
var _sequentialQuantileJsDefault = parcelHelpers.interopDefault(_sequentialQuantileJs);
var _divergingJs = require("./diverging.js");
var _divergingJsDefault = parcelHelpers.interopDefault(_divergingJs);
var _tickFormatJs = require("./tickFormat.js");
var _tickFormatJsDefault = parcelHelpers.interopDefault(_tickFormatJs);

},{"./band.js":false,"./identity.js":false,"./linear.js":"lob4K","./log.js":false,"./symlog.js":false,"./ordinal.js":false,"./pow.js":false,"./radial.js":false,"./quantile.js":false,"./quantize.js":false,"./threshold.js":false,"./time.js":false,"./utcTime.js":false,"./sequential.js":false,"./sequentialQuantile.js":false,"./diverging.js":false,"./tickFormat.js":"ahQef","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"lob4K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "linearish", ()=>linearish
);
var _d3Array = require("d3-array");
var _continuousJs = require("./continuous.js");
var _continuousJsDefault = parcelHelpers.interopDefault(_continuousJs);
var _initJs = require("./init.js");
var _tickFormatJs = require("./tickFormat.js");
var _tickFormatJsDefault = parcelHelpers.interopDefault(_tickFormatJs);
function linearish(scale) {
    var domain = scale.domain;
    scale.ticks = function(count) {
        var d = domain();
        return _d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };
    scale.tickFormat = function(count, specifier) {
        var d = domain();
        return _tickFormatJsDefault.default(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };
    scale.nice = function(count) {
        if (count == null) count = 10;
        var d = domain();
        var i0 = 0;
        var i1 = d.length - 1;
        var start = d[i0];
        var stop = d[i1];
        var prestep;
        var step;
        var maxIter = 10;
        if (stop < start) {
            step = start, start = stop, stop = step;
            step = i0, i0 = i1, i1 = step;
        }
        while(maxIter-- > 0){
            step = _d3Array.tickIncrement(start, stop, count);
            if (step === prestep) {
                d[i0] = start;
                d[i1] = stop;
                return domain(d);
            } else if (step > 0) {
                start = Math.floor(start / step) * step;
                stop = Math.ceil(stop / step) * step;
            } else if (step < 0) {
                start = Math.ceil(start * step) / step;
                stop = Math.floor(stop * step) / step;
            } else break;
            prestep = step;
        }
        return scale;
    };
    return scale;
}
function linear() {
    var scale = _continuousJsDefault.default();
    scale.copy = function() {
        return _continuousJs.copy(scale, linear());
    };
    _initJs.initRange.apply(scale, arguments);
    return linearish(scale);
}
exports.default = linear;

},{"d3-array":"1yX2W","./continuous.js":"1LsCM","./init.js":"kp8lc","./tickFormat.js":"ahQef","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1yX2W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bisect", ()=>_bisectJsDefault.default
);
parcelHelpers.export(exports, "bisectRight", ()=>_bisectJs.bisectRight
);
parcelHelpers.export(exports, "bisectLeft", ()=>_bisectJs.bisectLeft
);
parcelHelpers.export(exports, "bisectCenter", ()=>_bisectJs.bisectCenter
);
parcelHelpers.export(exports, "ascending", ()=>_ascendingJsDefault.default
);
parcelHelpers.export(exports, "bisector", ()=>_bisectorJsDefault.default
);
parcelHelpers.export(exports, "count", ()=>_countJsDefault.default
);
parcelHelpers.export(exports, "cross", ()=>_crossJsDefault.default
);
parcelHelpers.export(exports, "cumsum", ()=>_cumsumJsDefault.default
);
parcelHelpers.export(exports, "descending", ()=>_descendingJsDefault.default
);
parcelHelpers.export(exports, "deviation", ()=>_deviationJsDefault.default
);
parcelHelpers.export(exports, "extent", ()=>_extentJsDefault.default
);
parcelHelpers.export(exports, "Adder", ()=>_fsumJs.Adder
);
parcelHelpers.export(exports, "fsum", ()=>_fsumJs.fsum
);
parcelHelpers.export(exports, "fcumsum", ()=>_fsumJs.fcumsum
);
parcelHelpers.export(exports, "group", ()=>_groupJsDefault.default
);
parcelHelpers.export(exports, "flatGroup", ()=>_groupJs.flatGroup
);
parcelHelpers.export(exports, "flatRollup", ()=>_groupJs.flatRollup
);
parcelHelpers.export(exports, "groups", ()=>_groupJs.groups
);
parcelHelpers.export(exports, "index", ()=>_groupJs.index
);
parcelHelpers.export(exports, "indexes", ()=>_groupJs.indexes
);
parcelHelpers.export(exports, "rollup", ()=>_groupJs.rollup
);
parcelHelpers.export(exports, "rollups", ()=>_groupJs.rollups
);
parcelHelpers.export(exports, "groupSort", ()=>_groupSortJsDefault.default
);
parcelHelpers.export(exports, "bin", ()=>_binJsDefault.default
) // Deprecated; use bin.
;
parcelHelpers.export(exports, "histogram", ()=>_binJsDefault.default
);
parcelHelpers.export(exports, "thresholdFreedmanDiaconis", ()=>_freedmanDiaconisJsDefault.default
);
parcelHelpers.export(exports, "thresholdScott", ()=>_scottJsDefault.default
);
parcelHelpers.export(exports, "thresholdSturges", ()=>_sturgesJsDefault.default
);
parcelHelpers.export(exports, "max", ()=>_maxJsDefault.default
);
parcelHelpers.export(exports, "maxIndex", ()=>_maxIndexJsDefault.default
);
parcelHelpers.export(exports, "mean", ()=>_meanJsDefault.default
);
parcelHelpers.export(exports, "median", ()=>_medianJsDefault.default
);
parcelHelpers.export(exports, "merge", ()=>_mergeJsDefault.default
);
parcelHelpers.export(exports, "min", ()=>_minJsDefault.default
);
parcelHelpers.export(exports, "minIndex", ()=>_minIndexJsDefault.default
);
parcelHelpers.export(exports, "mode", ()=>_modeJsDefault.default
);
parcelHelpers.export(exports, "nice", ()=>_niceJsDefault.default
);
parcelHelpers.export(exports, "pairs", ()=>_pairsJsDefault.default
);
parcelHelpers.export(exports, "permute", ()=>_permuteJsDefault.default
);
parcelHelpers.export(exports, "quantile", ()=>_quantileJsDefault.default
);
parcelHelpers.export(exports, "quantileSorted", ()=>_quantileJs.quantileSorted
);
parcelHelpers.export(exports, "quickselect", ()=>_quickselectJsDefault.default
);
parcelHelpers.export(exports, "range", ()=>_rangeJsDefault.default
);
parcelHelpers.export(exports, "rank", ()=>_rankJsDefault.default
);
parcelHelpers.export(exports, "least", ()=>_leastJsDefault.default
);
parcelHelpers.export(exports, "leastIndex", ()=>_leastIndexJsDefault.default
);
parcelHelpers.export(exports, "greatest", ()=>_greatestJsDefault.default
);
parcelHelpers.export(exports, "greatestIndex", ()=>_greatestIndexJsDefault.default
);
parcelHelpers.export(exports, "scan", ()=>_scanJsDefault.default
) // Deprecated; use leastIndex.
;
parcelHelpers.export(exports, "shuffle", ()=>_shuffleJsDefault.default
);
parcelHelpers.export(exports, "shuffler", ()=>_shuffleJs.shuffler
);
parcelHelpers.export(exports, "sum", ()=>_sumJsDefault.default
);
parcelHelpers.export(exports, "ticks", ()=>_ticksJsDefault.default
);
parcelHelpers.export(exports, "tickIncrement", ()=>_ticksJs.tickIncrement
);
parcelHelpers.export(exports, "tickStep", ()=>_ticksJs.tickStep
);
parcelHelpers.export(exports, "transpose", ()=>_transposeJsDefault.default
);
parcelHelpers.export(exports, "variance", ()=>_varianceJsDefault.default
);
parcelHelpers.export(exports, "zip", ()=>_zipJsDefault.default
);
parcelHelpers.export(exports, "every", ()=>_everyJsDefault.default
);
parcelHelpers.export(exports, "some", ()=>_someJsDefault.default
);
parcelHelpers.export(exports, "filter", ()=>_filterJsDefault.default
);
parcelHelpers.export(exports, "map", ()=>_mapJsDefault.default
);
parcelHelpers.export(exports, "reduce", ()=>_reduceJsDefault.default
);
parcelHelpers.export(exports, "reverse", ()=>_reverseJsDefault.default
);
parcelHelpers.export(exports, "sort", ()=>_sortJsDefault.default
);
parcelHelpers.export(exports, "difference", ()=>_differenceJsDefault.default
);
parcelHelpers.export(exports, "disjoint", ()=>_disjointJsDefault.default
);
parcelHelpers.export(exports, "intersection", ()=>_intersectionJsDefault.default
);
parcelHelpers.export(exports, "subset", ()=>_subsetJsDefault.default
);
parcelHelpers.export(exports, "superset", ()=>_supersetJsDefault.default
);
parcelHelpers.export(exports, "union", ()=>_unionJsDefault.default
);
parcelHelpers.export(exports, "InternMap", ()=>_internmap.InternMap
);
parcelHelpers.export(exports, "InternSet", ()=>_internmap.InternSet
);
var _bisectJs = require("./bisect.js");
var _bisectJsDefault = parcelHelpers.interopDefault(_bisectJs);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _bisectorJs = require("./bisector.js");
var _bisectorJsDefault = parcelHelpers.interopDefault(_bisectorJs);
var _countJs = require("./count.js");
var _countJsDefault = parcelHelpers.interopDefault(_countJs);
var _crossJs = require("./cross.js");
var _crossJsDefault = parcelHelpers.interopDefault(_crossJs);
var _cumsumJs = require("./cumsum.js");
var _cumsumJsDefault = parcelHelpers.interopDefault(_cumsumJs);
var _descendingJs = require("./descending.js");
var _descendingJsDefault = parcelHelpers.interopDefault(_descendingJs);
var _deviationJs = require("./deviation.js");
var _deviationJsDefault = parcelHelpers.interopDefault(_deviationJs);
var _extentJs = require("./extent.js");
var _extentJsDefault = parcelHelpers.interopDefault(_extentJs);
var _fsumJs = require("./fsum.js");
var _groupJs = require("./group.js");
var _groupJsDefault = parcelHelpers.interopDefault(_groupJs);
var _groupSortJs = require("./groupSort.js");
var _groupSortJsDefault = parcelHelpers.interopDefault(_groupSortJs);
var _binJs = require("./bin.js");
var _binJsDefault = parcelHelpers.interopDefault(_binJs);
var _freedmanDiaconisJs = require("./threshold/freedmanDiaconis.js");
var _freedmanDiaconisJsDefault = parcelHelpers.interopDefault(_freedmanDiaconisJs);
var _scottJs = require("./threshold/scott.js");
var _scottJsDefault = parcelHelpers.interopDefault(_scottJs);
var _sturgesJs = require("./threshold/sturges.js");
var _sturgesJsDefault = parcelHelpers.interopDefault(_sturgesJs);
var _maxJs = require("./max.js");
var _maxJsDefault = parcelHelpers.interopDefault(_maxJs);
var _maxIndexJs = require("./maxIndex.js");
var _maxIndexJsDefault = parcelHelpers.interopDefault(_maxIndexJs);
var _meanJs = require("./mean.js");
var _meanJsDefault = parcelHelpers.interopDefault(_meanJs);
var _medianJs = require("./median.js");
var _medianJsDefault = parcelHelpers.interopDefault(_medianJs);
var _mergeJs = require("./merge.js");
var _mergeJsDefault = parcelHelpers.interopDefault(_mergeJs);
var _minJs = require("./min.js");
var _minJsDefault = parcelHelpers.interopDefault(_minJs);
var _minIndexJs = require("./minIndex.js");
var _minIndexJsDefault = parcelHelpers.interopDefault(_minIndexJs);
var _modeJs = require("./mode.js");
var _modeJsDefault = parcelHelpers.interopDefault(_modeJs);
var _niceJs = require("./nice.js");
var _niceJsDefault = parcelHelpers.interopDefault(_niceJs);
var _pairsJs = require("./pairs.js");
var _pairsJsDefault = parcelHelpers.interopDefault(_pairsJs);
var _permuteJs = require("./permute.js");
var _permuteJsDefault = parcelHelpers.interopDefault(_permuteJs);
var _quantileJs = require("./quantile.js");
var _quantileJsDefault = parcelHelpers.interopDefault(_quantileJs);
var _quickselectJs = require("./quickselect.js");
var _quickselectJsDefault = parcelHelpers.interopDefault(_quickselectJs);
var _rangeJs = require("./range.js");
var _rangeJsDefault = parcelHelpers.interopDefault(_rangeJs);
var _rankJs = require("./rank.js");
var _rankJsDefault = parcelHelpers.interopDefault(_rankJs);
var _leastJs = require("./least.js");
var _leastJsDefault = parcelHelpers.interopDefault(_leastJs);
var _leastIndexJs = require("./leastIndex.js");
var _leastIndexJsDefault = parcelHelpers.interopDefault(_leastIndexJs);
var _greatestJs = require("./greatest.js");
var _greatestJsDefault = parcelHelpers.interopDefault(_greatestJs);
var _greatestIndexJs = require("./greatestIndex.js");
var _greatestIndexJsDefault = parcelHelpers.interopDefault(_greatestIndexJs);
var _scanJs = require("./scan.js");
var _scanJsDefault = parcelHelpers.interopDefault(_scanJs);
var _shuffleJs = require("./shuffle.js");
var _shuffleJsDefault = parcelHelpers.interopDefault(_shuffleJs);
var _sumJs = require("./sum.js");
var _sumJsDefault = parcelHelpers.interopDefault(_sumJs);
var _ticksJs = require("./ticks.js");
var _ticksJsDefault = parcelHelpers.interopDefault(_ticksJs);
var _transposeJs = require("./transpose.js");
var _transposeJsDefault = parcelHelpers.interopDefault(_transposeJs);
var _varianceJs = require("./variance.js");
var _varianceJsDefault = parcelHelpers.interopDefault(_varianceJs);
var _zipJs = require("./zip.js");
var _zipJsDefault = parcelHelpers.interopDefault(_zipJs);
var _everyJs = require("./every.js");
var _everyJsDefault = parcelHelpers.interopDefault(_everyJs);
var _someJs = require("./some.js");
var _someJsDefault = parcelHelpers.interopDefault(_someJs);
var _filterJs = require("./filter.js");
var _filterJsDefault = parcelHelpers.interopDefault(_filterJs);
var _mapJs = require("./map.js");
var _mapJsDefault = parcelHelpers.interopDefault(_mapJs);
var _reduceJs = require("./reduce.js");
var _reduceJsDefault = parcelHelpers.interopDefault(_reduceJs);
var _reverseJs = require("./reverse.js");
var _reverseJsDefault = parcelHelpers.interopDefault(_reverseJs);
var _sortJs = require("./sort.js");
var _sortJsDefault = parcelHelpers.interopDefault(_sortJs);
var _differenceJs = require("./difference.js");
var _differenceJsDefault = parcelHelpers.interopDefault(_differenceJs);
var _disjointJs = require("./disjoint.js");
var _disjointJsDefault = parcelHelpers.interopDefault(_disjointJs);
var _intersectionJs = require("./intersection.js");
var _intersectionJsDefault = parcelHelpers.interopDefault(_intersectionJs);
var _subsetJs = require("./subset.js");
var _subsetJsDefault = parcelHelpers.interopDefault(_subsetJs);
var _supersetJs = require("./superset.js");
var _supersetJsDefault = parcelHelpers.interopDefault(_supersetJs);
var _unionJs = require("./union.js");
var _unionJsDefault = parcelHelpers.interopDefault(_unionJs);
var _internmap = require("internmap");

},{"./bisect.js":"2jqf4","./ascending.js":"2iZSL","./bisector.js":"1BY0F","./count.js":false,"./cross.js":false,"./cumsum.js":false,"./descending.js":false,"./deviation.js":false,"./extent.js":false,"./fsum.js":false,"./group.js":false,"./groupSort.js":false,"./bin.js":false,"./threshold/freedmanDiaconis.js":false,"./threshold/scott.js":false,"./threshold/sturges.js":false,"./max.js":false,"./maxIndex.js":false,"./mean.js":false,"./median.js":false,"./merge.js":false,"./min.js":false,"./minIndex.js":false,"./mode.js":false,"./nice.js":false,"./pairs.js":false,"./permute.js":false,"./quantile.js":false,"./quickselect.js":false,"./range.js":false,"./rank.js":false,"./least.js":false,"./leastIndex.js":false,"./greatest.js":false,"./greatestIndex.js":false,"./scan.js":false,"./shuffle.js":false,"./sum.js":false,"./ticks.js":"iDfKX","./transpose.js":false,"./variance.js":false,"./zip.js":false,"./every.js":false,"./some.js":false,"./filter.js":false,"./map.js":false,"./reduce.js":false,"./reverse.js":false,"./sort.js":false,"./difference.js":false,"./disjoint.js":false,"./intersection.js":false,"./subset.js":false,"./superset.js":false,"./union.js":false,"internmap":false,"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2jqf4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bisectRight", ()=>bisectRight
);
parcelHelpers.export(exports, "bisectLeft", ()=>bisectLeft
);
parcelHelpers.export(exports, "bisectCenter", ()=>bisectCenter
);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _bisectorJs = require("./bisector.js");
var _bisectorJsDefault = parcelHelpers.interopDefault(_bisectorJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
const ascendingBisect = _bisectorJsDefault.default(_ascendingJsDefault.default);
const bisectRight = ascendingBisect.right;
const bisectLeft = ascendingBisect.left;
const bisectCenter = _bisectorJsDefault.default(_numberJsDefault.default).center;
exports.default = bisectRight;

},{"./ascending.js":"2iZSL","./bisector.js":"1BY0F","./number.js":"imr9T","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2iZSL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function ascending(a, b) {
    return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
exports.default = ascending;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1BY0F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
function bisector(f) {
    let delta = f;
    let compare1 = f;
    let compare2 = f;
    if (f.length !== 2) {
        delta = (d, x)=>f(d) - x
        ;
        compare1 = _ascendingJsDefault.default;
        compare2 = (d, x)=>_ascendingJsDefault.default(f(d), x)
        ;
    }
    function left(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
            if (compare1(x, x) !== 0) return hi;
            do {
                const mid = lo + hi >>> 1;
                if (compare2(a[mid], x) < 0) lo = mid + 1;
                else hi = mid;
            }while (lo < hi)
        }
        return lo;
    }
    function right(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
            if (compare1(x, x) !== 0) return hi;
            do {
                const mid = lo + hi >>> 1;
                if (compare2(a[mid], x) <= 0) lo = mid + 1;
                else hi = mid;
            }while (lo < hi)
        }
        return lo;
    }
    function center(a, x, lo = 0, hi = a.length) {
        const i = left(a, x, lo, hi - 1);
        return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }
    return {
        left,
        center,
        right
    };
}
exports.default = bisector;

},{"./ascending.js":"2iZSL","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"imr9T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "numbers", ()=>numbers
);
function number(x) {
    return x === null ? NaN : +x;
}
exports.default = number;
function* numbers(values, valueof) {
    if (valueof === undefined) {
        for (let value of values)if (value != null && (value = +value) >= value) yield value;
    } else {
        let index = -1;
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) yield value;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"iDfKX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tickIncrement", ()=>tickIncrement
);
parcelHelpers.export(exports, "tickStep", ()=>tickStep
);
var e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function ticks(start, stop, count) {
    var reverse, i = -1, n, ticks1, step;
    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0) return [
        start
    ];
    if (reverse = stop < start) n = start, start = stop, stop = n;
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];
    if (step > 0) {
        let r0 = Math.round(start / step), r1 = Math.round(stop / step);
        if (r0 * step < start) ++r0;
        if (r1 * step > stop) --r1;
        ticks1 = new Array(n = r1 - r0 + 1);
        while(++i < n)ticks1[i] = (r0 + i) * step;
    } else {
        step = -step;
        let r0 = Math.round(start * step), r1 = Math.round(stop * step);
        if (r0 / step < start) ++r0;
        if (r1 / step > stop) --r1;
        ticks1 = new Array(n = r1 - r0 + 1);
        while(++i < n)ticks1[i] = (r0 + i) / step;
    }
    if (reverse) ticks1.reverse();
    return ticks1;
}
exports.default = ticks;
function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
    if (error >= e10) step1 *= 10;
    else if (error >= e5) step1 *= 5;
    else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1LsCM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "identity", ()=>identity
);
parcelHelpers.export(exports, "copy", ()=>copy
);
parcelHelpers.export(exports, "transformer", ()=>transformer
);
var _d3Array = require("d3-array");
var _d3Interpolate = require("d3-interpolate");
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var unit = [
    0,
    1
];
function identity(x) {
    return x;
}
function normalize(a, b) {
    return (b -= a = +a) ? function(x) {
        return (x - a) / b;
    } : _constantJsDefault.default(isNaN(b) ? NaN : 0.5);
}
function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function(x) {
        return Math.max(a, Math.min(b, x));
    };
}
// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
    else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x) {
        return r0(d0(x));
    };
}
function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
    // Reverse descending domains.
    if (domain[j] < domain[0]) {
        domain = domain.slice().reverse();
        range = range.slice().reverse();
    }
    while(++i < j){
        d[i] = normalize(domain[i], domain[i + 1]);
        r[i] = interpolate(range[i], range[i + 1]);
    }
    return function(x) {
        var i = _d3Array.bisect(domain, x, 1, j) - 1;
        return r[i](d[i](x));
    };
}
function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
    var domain = unit, range = unit, interpolate = _d3Interpolate.interpolate, transform, untransform, unknown, clamp = identity, piecewise, output, input;
    function rescale() {
        var n = Math.min(domain.length, range.length);
        if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
        piecewise = n > 2 ? polymap : bimap;
        output = input = null;
        return scale;
    }
    function scale(x) {
        return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
    }
    scale.invert = function(y) {
        return clamp(untransform((input || (input = piecewise(range, domain.map(transform), _d3Interpolate.interpolateNumber)))(y)));
    };
    scale.domain = function(_) {
        return arguments.length ? (domain = Array.from(_, _numberJsDefault.default), rescale()) : domain.slice();
    };
    scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };
    scale.rangeRound = function(_) {
        return range = Array.from(_), interpolate = _d3Interpolate.interpolateRound, rescale();
    };
    scale.clamp = function(_) {
        return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
    };
    scale.interpolate = function(_) {
        return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t, u) {
        transform = t, untransform = u;
        return rescale();
    };
}
function continuous() {
    return transformer()(identity, identity);
}
exports.default = continuous;

},{"d3-array":"1yX2W","d3-interpolate":"6jJyi","./constant.js":"kIv0D","./number.js":"k9Lyx","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"6jJyi":[function(require,module,exports) {
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

},{"./value.js":"2GpMq","./array.js":"bQXK0","./basis.js":"enhcL","./basisClosed.js":"gdZAO","./date.js":"cCKgJ","./discrete.js":false,"./hue.js":false,"./number.js":"fZAq5","./numberArray.js":"l29YZ","./object.js":"hdyKg","./round.js":"8lHW7","./string.js":"Qre8m","./transform/index.js":false,"./zoom.js":false,"./rgb.js":"gHrgo","./hsl.js":false,"./lab.js":false,"./hcl.js":false,"./cubehelix.js":false,"./piecewise.js":false,"./quantize.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2GpMq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Color = require("d3-color");
var _rgbJs = require("./rgb.js");
var _rgbJsDefault = parcelHelpers.interopDefault(_rgbJs);
var _arrayJs = require("./array.js");
var _dateJs = require("./date.js");
var _dateJsDefault = parcelHelpers.interopDefault(_dateJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var _objectJs = require("./object.js");
var _objectJsDefault = parcelHelpers.interopDefault(_objectJs);
var _stringJs = require("./string.js");
var _stringJsDefault = parcelHelpers.interopDefault(_stringJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _numberArrayJs = require("./numberArray.js");
var _numberArrayJsDefault = parcelHelpers.interopDefault(_numberArrayJs);
exports.default = function(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? _constantJsDefault.default(b) : (t === "number" ? _numberJsDefault.default : t === "string" ? (c = _d3Color.color(b)) ? (b = c, _rgbJsDefault.default) : _stringJsDefault.default : b instanceof _d3Color.color ? _rgbJsDefault.default : b instanceof Date ? _dateJsDefault.default : _numberArrayJs.isNumberArray(b) ? _numberArrayJsDefault.default : Array.isArray(b) ? _arrayJs.genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _objectJsDefault.default : _numberJsDefault.default)(a, b);
};

},{"d3-color":"grhaa","./rgb.js":"gHrgo","./array.js":"bQXK0","./date.js":"cCKgJ","./number.js":"fZAq5","./object.js":"hdyKg","./string.js":"Qre8m","./constant.js":"aXv76","./numberArray.js":"l29YZ","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"gHrgo":[function(require,module,exports) {
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

},{"d3-color":"grhaa","./basis.js":"enhcL","./basisClosed.js":"gdZAO","./color.js":"1eZq9","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"enhcL":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"gdZAO":[function(require,module,exports) {
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

},{"./basis.js":"enhcL","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1eZq9":[function(require,module,exports) {
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

},{"./constant.js":"aXv76","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aXv76":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = (x)=>()=>x
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"bQXK0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "genericArray", ()=>genericArray
);
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);
var _numberArrayJs = require("./numberArray.js");
var _numberArrayJsDefault = parcelHelpers.interopDefault(_numberArrayJs);
exports.default = function(a, b) {
    return (_numberArrayJs.isNumberArray(b) ? _numberArrayJsDefault.default : genericArray)(a, b);
};
function genericArray(a, b) {
    var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
    for(i = 0; i < na; ++i)x[i] = _valueJsDefault.default(a[i], b[i]);
    for(; i < nb; ++i)c[i] = b[i];
    return function(t) {
        for(i = 0; i < na; ++i)c[i] = x[i](t);
        return c;
    };
}

},{"./value.js":"2GpMq","./numberArray.js":"l29YZ","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"l29YZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isNumberArray", ()=>isNumberArray
);
exports.default = function(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
    return function(t) {
        for(i = 0; i < n; ++i)c[i] = a[i] * (1 - t) + b[i] * t;
        return c;
    };
};
function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"cCKgJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(a, b) {
    var d = new Date;
    return a = +a, b = +b, function(t) {
        return d.setTime(a * (1 - t) + b * t), d;
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"fZAq5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(a, b) {
    return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"hdyKg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);
exports.default = function(a, b) {
    var i = {
    }, c = {
    }, k;
    if (a === null || typeof a !== "object") a = {
    };
    if (b === null || typeof b !== "object") b = {
    };
    for(k in b)if (k in a) i[k] = _valueJsDefault.default(a[k], b[k]);
    else c[k] = b[k];
    return function(t) {
        for(k in i)c[k] = i[k](t);
        return c;
    };
};

},{"./value.js":"2GpMq","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"Qre8m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
    return function() {
        return b;
    };
}
function one(b) {
    return function(t) {
        return b(t) + "";
    };
}
exports.default = function(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i1 = -1, s = [], q = []; // number interpolators
    // Coerce inputs to strings.
    a = a + "", b = b + "";
    // Interpolate pairs of numbers in a & b.
    while((am = reA.exec(a)) && (bm = reB.exec(b))){
        if ((bs = bm.index) > bi) {
            bs = b.slice(bi, bs);
            if (s[i1]) s[i1] += bs; // coalesce with previous string
            else s[++i1] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) {
            if (s[i1]) s[i1] += bm; // coalesce with previous string
            else s[++i1] = bm;
        } else {
            s[++i1] = null;
            q.push({
                i: i1,
                x: _numberJsDefault.default(am, bm)
            });
        }
        bi = reB.lastIndex;
    }
    // Add remains of b.
    if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i1]) s[i1] += bs; // coalesce with previous string
        else s[++i1] = bs;
    }
    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
        for(var i = 0, o; i < b; ++i)s[(o = q[i]).i] = o.x(t);
        return s.join("");
    });
};

},{"./number.js":"fZAq5","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8lHW7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(a, b) {
    return a = +a, b = +b, function(t) {
        return Math.round(a * (1 - t) + b * t);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kIv0D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function constants(x) {
    return function() {
        return x;
    };
}
exports.default = constants;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"k9Lyx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function number(x) {
    return +x;
}
exports.default = number;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"kp8lc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initRange", ()=>initRange
);
parcelHelpers.export(exports, "initInterpolator", ()=>initInterpolator
);
function initRange(domain, range) {
    switch(arguments.length){
        case 0:
            break;
        case 1:
            this.range(domain);
            break;
        default:
            this.range(range).domain(domain);
            break;
    }
    return this;
}
function initInterpolator(domain, interpolator) {
    switch(arguments.length){
        case 0:
            break;
        case 1:
            if (typeof domain === "function") this.interpolator(domain);
            else this.range(domain);
            break;
        default:
            this.domain(domain);
            if (typeof interpolator === "function") this.interpolator(interpolator);
            else this.range(interpolator);
            break;
    }
    return this;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"ahQef":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Array = require("d3-array");
var _d3Format = require("d3-format");
function tickFormat(start, stop, count, specifier) {
    var step = _d3Array.tickStep(start, stop, count), precision;
    specifier = _d3Format.formatSpecifier(specifier == null ? ",f" : specifier);
    switch(specifier.type){
        case "s":
            var value = Math.max(Math.abs(start), Math.abs(stop));
            if (specifier.precision == null && !isNaN(precision = _d3Format.precisionPrefix(step, value))) specifier.precision = precision;
            return _d3Format.formatPrefix(specifier, value);
        case "":
        case "e":
        case "g":
        case "p":
        case "r":
            if (specifier.precision == null && !isNaN(precision = _d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
            break;
        case "f":
        case "%":
            if (specifier.precision == null && !isNaN(precision = _d3Format.precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
            break;
    }
    return _d3Format.format(specifier);
}
exports.default = tickFormat;

},{"d3-array":"1yX2W","d3-format":"4XOv2","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"gn9gd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "create", ()=>_createJsDefault.default
);
parcelHelpers.export(exports, "creator", ()=>_creatorJsDefault.default
);
parcelHelpers.export(exports, "local", ()=>_localJsDefault.default
);
parcelHelpers.export(exports, "matcher", ()=>_matcherJsDefault.default
);
parcelHelpers.export(exports, "namespace", ()=>_namespaceJsDefault.default
);
parcelHelpers.export(exports, "namespaces", ()=>_namespacesJsDefault.default
);
parcelHelpers.export(exports, "pointer", ()=>_pointerJsDefault.default
);
parcelHelpers.export(exports, "pointers", ()=>_pointersJsDefault.default
);
parcelHelpers.export(exports, "select", ()=>_selectJsDefault.default
);
parcelHelpers.export(exports, "selectAll", ()=>_selectAllJsDefault.default
);
parcelHelpers.export(exports, "selection", ()=>_indexJsDefault.default
);
parcelHelpers.export(exports, "selector", ()=>_selectorJsDefault.default
);
parcelHelpers.export(exports, "selectorAll", ()=>_selectorAllJsDefault.default
);
parcelHelpers.export(exports, "style", ()=>_styleJs.styleValue
);
parcelHelpers.export(exports, "window", ()=>_windowJsDefault.default
);
var _createJs = require("./create.js");
var _createJsDefault = parcelHelpers.interopDefault(_createJs);
var _creatorJs = require("./creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);
var _localJs = require("./local.js");
var _localJsDefault = parcelHelpers.interopDefault(_localJs);
var _matcherJs = require("./matcher.js");
var _matcherJsDefault = parcelHelpers.interopDefault(_matcherJs);
var _namespaceJs = require("./namespace.js");
var _namespaceJsDefault = parcelHelpers.interopDefault(_namespaceJs);
var _namespacesJs = require("./namespaces.js");
var _namespacesJsDefault = parcelHelpers.interopDefault(_namespacesJs);
var _pointerJs = require("./pointer.js");
var _pointerJsDefault = parcelHelpers.interopDefault(_pointerJs);
var _pointersJs = require("./pointers.js");
var _pointersJsDefault = parcelHelpers.interopDefault(_pointersJs);
var _selectJs = require("./select.js");
var _selectJsDefault = parcelHelpers.interopDefault(_selectJs);
var _selectAllJs = require("./selectAll.js");
var _selectAllJsDefault = parcelHelpers.interopDefault(_selectAllJs);
var _indexJs = require("./selection/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _selectorJs = require("./selector.js");
var _selectorJsDefault = parcelHelpers.interopDefault(_selectorJs);
var _selectorAllJs = require("./selectorAll.js");
var _selectorAllJsDefault = parcelHelpers.interopDefault(_selectorAllJs);
var _styleJs = require("./selection/style.js");
var _windowJs = require("./window.js");
var _windowJsDefault = parcelHelpers.interopDefault(_windowJs);

},{"./create.js":false,"./creator.js":"a6062","./local.js":false,"./matcher.js":"hovSo","./namespace.js":"a23xG","./namespaces.js":"dDfgS","./pointer.js":false,"./pointers.js":false,"./select.js":"4pqgd","./selectAll.js":false,"./selection/index.js":"fK3Dl","./selector.js":"7VF9r","./selectorAll.js":"2SKTE","./selection/style.js":"GUHZ1","./window.js":"6di7h","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"a6062":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _namespaceJs = require("./namespace.js");
var _namespaceJsDefault = parcelHelpers.interopDefault(_namespaceJs);
var _namespacesJs = require("./namespaces.js");
function creatorInherit(name) {
    return function() {
        var document = this.ownerDocument, uri = this.namespaceURI;
        return uri === _namespacesJs.xhtml && document.documentElement.namespaceURI === _namespacesJs.xhtml ? document.createElement(name) : document.createElementNS(uri, name);
    };
}
function creatorFixed(fullname) {
    return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
}
exports.default = function(name) {
    var fullname = _namespaceJsDefault.default(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
};

},{"./namespace.js":"a23xG","./namespaces.js":"dDfgS","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"a23xG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _namespacesJs = require("./namespaces.js");
var _namespacesJsDefault = parcelHelpers.interopDefault(_namespacesJs);
exports.default = function(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return _namespacesJsDefault.default.hasOwnProperty(prefix) ? {
        space: _namespacesJsDefault.default[prefix],
        local: name
    } : name; // eslint-disable-line no-prototype-builtins
};

},{"./namespaces.js":"dDfgS","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"dDfgS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "xhtml", ()=>xhtml
);
var xhtml = "http://www.w3.org/1999/xhtml";
exports.default = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"hovSo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "childMatcher", ()=>childMatcher
);
exports.default = function(selector) {
    return function() {
        return this.matches(selector);
    };
};
function childMatcher(selector) {
    return function(node) {
        return node.matches(selector);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"4pqgd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./selection/index.js");
exports.default = function(selector) {
    return typeof selector === "string" ? new _indexJs.Selection([
        [
            document.querySelector(selector)
        ]
    ], [
        document.documentElement
    ]) : new _indexJs.Selection([
        [
            selector
        ]
    ], _indexJs.root);
};

},{"./selection/index.js":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"fK3Dl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "root", ()=>root
);
parcelHelpers.export(exports, "Selection", ()=>Selection
);
var _selectJs = require("./select.js");
var _selectJsDefault = parcelHelpers.interopDefault(_selectJs);
var _selectAllJs = require("./selectAll.js");
var _selectAllJsDefault = parcelHelpers.interopDefault(_selectAllJs);
var _selectChildJs = require("./selectChild.js");
var _selectChildJsDefault = parcelHelpers.interopDefault(_selectChildJs);
var _selectChildrenJs = require("./selectChildren.js");
var _selectChildrenJsDefault = parcelHelpers.interopDefault(_selectChildrenJs);
var _filterJs = require("./filter.js");
var _filterJsDefault = parcelHelpers.interopDefault(_filterJs);
var _dataJs = require("./data.js");
var _dataJsDefault = parcelHelpers.interopDefault(_dataJs);
var _enterJs = require("./enter.js");
var _enterJsDefault = parcelHelpers.interopDefault(_enterJs);
var _exitJs = require("./exit.js");
var _exitJsDefault = parcelHelpers.interopDefault(_exitJs);
var _joinJs = require("./join.js");
var _joinJsDefault = parcelHelpers.interopDefault(_joinJs);
var _mergeJs = require("./merge.js");
var _mergeJsDefault = parcelHelpers.interopDefault(_mergeJs);
var _orderJs = require("./order.js");
var _orderJsDefault = parcelHelpers.interopDefault(_orderJs);
var _sortJs = require("./sort.js");
var _sortJsDefault = parcelHelpers.interopDefault(_sortJs);
var _callJs = require("./call.js");
var _callJsDefault = parcelHelpers.interopDefault(_callJs);
var _nodesJs = require("./nodes.js");
var _nodesJsDefault = parcelHelpers.interopDefault(_nodesJs);
var _nodeJs = require("./node.js");
var _nodeJsDefault = parcelHelpers.interopDefault(_nodeJs);
var _sizeJs = require("./size.js");
var _sizeJsDefault = parcelHelpers.interopDefault(_sizeJs);
var _emptyJs = require("./empty.js");
var _emptyJsDefault = parcelHelpers.interopDefault(_emptyJs);
var _eachJs = require("./each.js");
var _eachJsDefault = parcelHelpers.interopDefault(_eachJs);
var _attrJs = require("./attr.js");
var _attrJsDefault = parcelHelpers.interopDefault(_attrJs);
var _styleJs = require("./style.js");
var _styleJsDefault = parcelHelpers.interopDefault(_styleJs);
var _propertyJs = require("./property.js");
var _propertyJsDefault = parcelHelpers.interopDefault(_propertyJs);
var _classedJs = require("./classed.js");
var _classedJsDefault = parcelHelpers.interopDefault(_classedJs);
var _textJs = require("./text.js");
var _textJsDefault = parcelHelpers.interopDefault(_textJs);
var _htmlJs = require("./html.js");
var _htmlJsDefault = parcelHelpers.interopDefault(_htmlJs);
var _raiseJs = require("./raise.js");
var _raiseJsDefault = parcelHelpers.interopDefault(_raiseJs);
var _lowerJs = require("./lower.js");
var _lowerJsDefault = parcelHelpers.interopDefault(_lowerJs);
var _appendJs = require("./append.js");
var _appendJsDefault = parcelHelpers.interopDefault(_appendJs);
var _insertJs = require("./insert.js");
var _insertJsDefault = parcelHelpers.interopDefault(_insertJs);
var _removeJs = require("./remove.js");
var _removeJsDefault = parcelHelpers.interopDefault(_removeJs);
var _cloneJs = require("./clone.js");
var _cloneJsDefault = parcelHelpers.interopDefault(_cloneJs);
var _datumJs = require("./datum.js");
var _datumJsDefault = parcelHelpers.interopDefault(_datumJs);
var _onJs = require("./on.js");
var _onJsDefault = parcelHelpers.interopDefault(_onJs);
var _dispatchJs = require("./dispatch.js");
var _dispatchJsDefault = parcelHelpers.interopDefault(_dispatchJs);
var _iteratorJs = require("./iterator.js");
var _iteratorJsDefault = parcelHelpers.interopDefault(_iteratorJs);
var root = [
    null
];
function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
}
function selection() {
    return new Selection([
        [
            document.documentElement
        ]
    ], root);
}
function selection_selection() {
    return this;
}
Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: _selectJsDefault.default,
    selectAll: _selectAllJsDefault.default,
    selectChild: _selectChildJsDefault.default,
    selectChildren: _selectChildrenJsDefault.default,
    filter: _filterJsDefault.default,
    data: _dataJsDefault.default,
    enter: _enterJsDefault.default,
    exit: _exitJsDefault.default,
    join: _joinJsDefault.default,
    merge: _mergeJsDefault.default,
    selection: selection_selection,
    order: _orderJsDefault.default,
    sort: _sortJsDefault.default,
    call: _callJsDefault.default,
    nodes: _nodesJsDefault.default,
    node: _nodeJsDefault.default,
    size: _sizeJsDefault.default,
    empty: _emptyJsDefault.default,
    each: _eachJsDefault.default,
    attr: _attrJsDefault.default,
    style: _styleJsDefault.default,
    property: _propertyJsDefault.default,
    classed: _classedJsDefault.default,
    text: _textJsDefault.default,
    html: _htmlJsDefault.default,
    raise: _raiseJsDefault.default,
    lower: _lowerJsDefault.default,
    append: _appendJsDefault.default,
    insert: _insertJsDefault.default,
    remove: _removeJsDefault.default,
    clone: _cloneJsDefault.default,
    datum: _datumJsDefault.default,
    on: _onJsDefault.default,
    dispatch: _dispatchJsDefault.default,
    [Symbol.iterator]: _iteratorJsDefault.default
};
exports.default = selection;

},{"./select.js":"aK9lB","./selectAll.js":"8U28K","./selectChild.js":"hBGg0","./selectChildren.js":"hnJ1V","./filter.js":"i1GfU","./data.js":"jIP7J","./enter.js":"27tIy","./exit.js":"6ubri","./join.js":"g7QcH","./merge.js":"fXm9Z","./order.js":"cmxvd","./sort.js":"4UUI2","./call.js":"bsAaT","./nodes.js":"jjFrN","./node.js":"gPGkg","./size.js":"coOTw","./empty.js":"8ybxO","./each.js":"9Y1px","./attr.js":"k8cb1","./style.js":"GUHZ1","./property.js":"f4q4V","./classed.js":"jd3ig","./text.js":"dVAdB","./html.js":"egFAg","./raise.js":"4Xi1m","./lower.js":"l1I8n","./append.js":"1GNgv","./insert.js":"3Xphl","./remove.js":"iNsSa","./clone.js":"jfNc9","./datum.js":"lMowl","./on.js":"ktlxw","./dispatch.js":"eZMTj","./iterator.js":"32Fgr","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"aK9lB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
var _selectorJs = require("../selector.js");
var _selectorJsDefault = parcelHelpers.interopDefault(_selectorJs);
exports.default = function(select) {
    if (typeof select !== "function") select = _selectorJsDefault.default(select);
    for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i)if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
        }
    }
    return new _indexJs.Selection(subgroups, this._parents);
};

},{"./index.js":"fK3Dl","../selector.js":"7VF9r","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"7VF9r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function none() {
}
exports.default = function(selector) {
    return selector == null ? none : function() {
        return this.querySelector(selector);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8U28K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
var _arrayJs = require("../array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _selectorAllJs = require("../selectorAll.js");
var _selectorAllJsDefault = parcelHelpers.interopDefault(_selectorAllJs);
function arrayAll(select) {
    return function() {
        return _arrayJsDefault.default(select.apply(this, arguments));
    };
}
exports.default = function(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = _selectorAllJsDefault.default(select);
    for(var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) {
            subgroups.push(select.call(node, node.__data__, i, group));
            parents.push(node);
        }
    }
    return new _indexJs.Selection(subgroups, parents);
};

},{"./index.js":"fK3Dl","../array.js":"9WejU","../selectorAll.js":"2SKTE","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"9WejU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
exports.default = array;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"2SKTE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function empty() {
    return [];
}
exports.default = function(selector) {
    return selector == null ? empty : function() {
        return this.querySelectorAll(selector);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"hBGg0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _matcherJs = require("../matcher.js");
var find = Array.prototype.find;
function childFind(match) {
    return function() {
        return find.call(this.children, match);
    };
}
function childFirst() {
    return this.firstElementChild;
}
exports.default = function(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : _matcherJs.childMatcher(match)));
};

},{"../matcher.js":"hovSo","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"hnJ1V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _matcherJs = require("../matcher.js");
var filter = Array.prototype.filter;
function children() {
    return Array.from(this.children);
}
function childrenFilter(match) {
    return function() {
        return filter.call(this.children, match);
    };
}
exports.default = function(match) {
    return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : _matcherJs.childMatcher(match)));
};

},{"../matcher.js":"hovSo","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"i1GfU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
var _matcherJs = require("../matcher.js");
var _matcherJsDefault = parcelHelpers.interopDefault(_matcherJs);
exports.default = function(match) {
    if (typeof match !== "function") match = _matcherJsDefault.default(match);
    for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i)if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
    }
    return new _indexJs.Selection(subgroups, this._parents);
};

},{"./index.js":"fK3Dl","../matcher.js":"hovSo","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"jIP7J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
var _enterJs = require("./enter.js");
var _constantJs = require("../constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0, node, groupLength = group.length, dataLength = data.length;
    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for(; i < dataLength; ++i)if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
    } else enter[i] = new _enterJs.EnterNode(parent, data[i]);
    // Put any non-null nodes that don’t fit into exit.
    for(; i < groupLength; ++i)if (node = group[i]) exit[i] = node;
}
function bindKey(parent, group, enter, update, exit, data, key) {
    var i, node, nodeByKeyValue = new Map, groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for(i = 0; i < groupLength; ++i)if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) exit[i] = node;
        else nodeByKeyValue.set(keyValue, node);
    }
    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for(i = 0; i < dataLength; ++i){
        keyValue = key.call(parent, data[i], i, data) + "";
        if (node = nodeByKeyValue.get(keyValue)) {
            update[i] = node;
            node.__data__ = data[i];
            nodeByKeyValue.delete(keyValue);
        } else enter[i] = new _enterJs.EnterNode(parent, data[i]);
    }
    // Add any remaining nodes that were not bound to data to exit.
    for(i = 0; i < groupLength; ++i)if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) exit[i] = node;
}
function datum(node) {
    return node.__data__;
}
exports.default = function(value, key) {
    if (!arguments.length) return Array.from(this, datum);
    var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
    if (typeof value !== "function") value = _constantJsDefault.default(value);
    for(var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j){
        var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
        bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
        // Now connect the enter nodes to their following update node, such that
        // appendChild can insert the materialized enter node before this node,
        // rather than at the end of the parent node.
        for(var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0)if (previous = enterGroup[i0]) {
            if (i0 >= i1) i1 = i0 + 1;
            while(!(next = updateGroup[i1]) && ++i1 < dataLength);
            previous._next = next || null;
        }
    }
    update = new _indexJs.Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
};
// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
    return typeof data === "object" && "length" in data ? data // Array, TypedArray, NodeList, array-like
     : Array.from(data); // Map, Set, iterable, string, or anything else
}

},{"./index.js":"fK3Dl","./enter.js":"27tIy","../constant.js":"1wZol","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"27tIy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EnterNode", ()=>EnterNode
);
var _sparseJs = require("./sparse.js");
var _sparseJsDefault = parcelHelpers.interopDefault(_sparseJs);
var _indexJs = require("./index.js");
exports.default = function() {
    return new _indexJs.Selection(this._enter || this._groups.map(_sparseJsDefault.default), this._parents);
};
function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
}
EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) {
        return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
        return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector) {
        return this._parent.querySelector(selector);
    },
    querySelectorAll: function(selector) {
        return this._parent.querySelectorAll(selector);
    }
};

},{"./sparse.js":"juhNo","./index.js":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"juhNo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(update) {
    return new Array(update.length);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1wZol":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(x) {
    return function() {
        return x;
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"6ubri":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _sparseJs = require("./sparse.js");
var _sparseJsDefault = parcelHelpers.interopDefault(_sparseJs);
var _indexJs = require("./index.js");
exports.default = function() {
    return new _indexJs.Selection(this._exit || this._groups.map(_sparseJsDefault.default), this._parents);
};

},{"./sparse.js":"juhNo","./index.js":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"g7QcH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
        enter = onenter(enter);
        if (enter) enter = enter.selection();
    } else enter = enter.append(onenter + "");
    if (onupdate != null) {
        update = onupdate(update);
        if (update) update = update.selection();
    }
    if (onexit == null) exit.remove();
    else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"fXm9Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
exports.default = function(context) {
    var selection = context.selection ? context.selection() : context;
    for(var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j){
        for(var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group0[i] || group1[i]) merge[i] = node;
    }
    for(; j < m0; ++j)merges[j] = groups0[j];
    return new _indexJs.Selection(merges, this._parents);
};

},{"./index.js":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"cmxvd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    for(var groups = this._groups, j = -1, m = groups.length; ++j < m;){
        for(var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;)if (node = group[i]) {
            if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
            next = node;
        }
    }
    return this;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"4UUI2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
exports.default = function(compare) {
    if (!compare) compare = ascending;
    function compareNode(a, b) {
        return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }
    for(var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group[i]) sortgroup[i] = node;
        sortgroup.sort(compareNode);
    }
    return new _indexJs.Selection(sortgroups, this._parents).order();
};
function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

},{"./index.js":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"bsAaT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"jjFrN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    return Array.from(this);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"gPGkg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j)for(var group = groups[j], i = 0, n = group.length; i < n; ++i){
        var node = group[i];
        if (node) return node;
    }
    return null;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"coOTw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    let size = 0;
    for (const node of this)++size; // eslint-disable-line no-unused-vars
    return size;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"8ybxO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    return !this.node();
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"9Y1px":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(callback) {
    for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j){
        for(var group = groups[j], i = 0, n = group.length, node; i < n; ++i)if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
    return this;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"k8cb1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _namespaceJs = require("../namespace.js");
var _namespaceJsDefault = parcelHelpers.interopDefault(_namespaceJs);
function attrRemove(name) {
    return function() {
        this.removeAttribute(name);
    };
}
function attrRemoveNS(fullname) {
    return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
    };
}
function attrConstant(name, value) {
    return function() {
        this.setAttribute(name, value);
    };
}
function attrConstantNS(fullname, value) {
    return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
    };
}
function attrFunction(name, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
    };
}
function attrFunctionNS(fullname, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
    };
}
exports.default = function(name, value) {
    var fullname = _namespaceJsDefault.default(name);
    if (arguments.length < 2) {
        var node = this.node();
        return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
};

},{"../namespace.js":"a23xG","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"GUHZ1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "styleValue", ()=>styleValue
);
var _windowJs = require("../window.js");
var _windowJsDefault = parcelHelpers.interopDefault(_windowJs);
function styleRemove(name) {
    return function() {
        this.style.removeProperty(name);
    };
}
function styleConstant(name, value, priority) {
    return function() {
        this.style.setProperty(name, value, priority);
    };
}
function styleFunction(name, value, priority) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
    };
}
exports.default = function(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
};
function styleValue(node, name) {
    return node.style.getPropertyValue(name) || _windowJsDefault.default(node).getComputedStyle(node, null).getPropertyValue(name);
}

},{"../window.js":"6di7h","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"6di7h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView; // node is a Document
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"f4q4V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function propertyRemove(name) {
    return function() {
        delete this[name];
    };
}
function propertyConstant(name, value) {
    return function() {
        this[name] = value;
    };
}
function propertyFunction(name, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
    };
}
exports.default = function(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"jd3ig":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function classArray(string) {
    return string.trim().split(/^|\s+/);
}
function classList(node) {
    return node.classList || new ClassList(node);
}
function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
    add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
            this._names.push(name);
            this._node.setAttribute("class", this._names.join(" "));
        }
    },
    remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
            this._names.splice(i, 1);
            this._node.setAttribute("class", this._names.join(" "));
        }
    },
    contains: function(name) {
        return this._names.indexOf(name) >= 0;
    }
};
function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while(++i < n)list.add(names[i]);
}
function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while(++i < n)list.remove(names[i]);
}
function classedTrue(names) {
    return function() {
        classedAdd(this, names);
    };
}
function classedFalse(names) {
    return function() {
        classedRemove(this, names);
    };
}
function classedFunction(names, value) {
    return function() {
        (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
}
exports.default = function(name, value) {
    var names = classArray(name + "");
    if (arguments.length < 2) {
        var list = classList(this.node()), i = -1, n = names.length;
        while(++i < n)if (!list.contains(names[i])) return false;
        return true;
    }
    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"dVAdB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function textRemove() {
    this.textContent = "";
}
function textConstant(value) {
    return function() {
        this.textContent = value;
    };
}
function textFunction(value) {
    return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
    };
}
exports.default = function(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"egFAg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function htmlRemove() {
    this.innerHTML = "";
}
function htmlConstant(value) {
    return function() {
        this.innerHTML = value;
    };
}
function htmlFunction(value) {
    return function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
    };
}
exports.default = function(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"4Xi1m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
}
exports.default = function() {
    return this.each(raise);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"l1I8n":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
exports.default = function() {
    return this.each(lower);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1GNgv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _creatorJs = require("../creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);
exports.default = function(name) {
    var create = typeof name === "function" ? name : _creatorJsDefault.default(name);
    return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
    });
};

},{"../creator.js":"a6062","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"3Xphl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _creatorJs = require("../creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);
var _selectorJs = require("../selector.js");
var _selectorJsDefault = parcelHelpers.interopDefault(_selectorJs);
function constantNull() {
    return null;
}
exports.default = function(name, before) {
    var create = typeof name === "function" ? name : _creatorJsDefault.default(name), select = before == null ? constantNull : typeof before === "function" ? before : _selectorJsDefault.default(before);
    return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
};

},{"../creator.js":"a6062","../selector.js":"7VF9r","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"iNsSa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
}
exports.default = function() {
    return this.each(remove);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"jfNc9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
exports.default = function(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"lMowl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"ktlxw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function contextListener(listener) {
    return function(event) {
        listener.call(this, event, this.__data__);
    };
}
function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {
            type: t,
            name: name
        };
    });
}
function onRemove(typename) {
    return function() {
        var on = this.__on;
        if (!on) return;
        for(var j = 0, i = -1, m = on.length, o; j < m; ++j)if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) this.removeEventListener(o.type, o.listener, o.options);
        else on[++i] = o;
        if (++i) on.length = i;
        else delete this.__on;
    };
}
function onAdd(typename, value, options) {
    return function() {
        var on = this.__on, o, listener = contextListener(value);
        if (on) {
            for(var j = 0, m = on.length; j < m; ++j)if ((o = on[j]).type === typename.type && o.name === typename.name) {
                this.removeEventListener(o.type, o.listener, o.options);
                this.addEventListener(o.type, o.listener = listener, o.options = options);
                o.value = value;
                return;
            }
        }
        this.addEventListener(typename.type, listener, options);
        o = {
            type: typename.type,
            name: typename.name,
            value: value,
            listener: listener,
            options: options
        };
        if (!on) this.__on = [
            o
        ];
        else on.push(o);
    };
}
exports.default = function(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
    if (arguments.length < 2) {
        var on = this.node().__on;
        if (on) for(var j = 0, m = on.length, o; j < m; ++j)for(i = 0, o = on[j]; i < n; ++i){
            if ((t = typenames[i]).type === o.type && t.name === o.name) return o.value;
        }
        return;
    }
    on = value ? onAdd : onRemove;
    for(i = 0; i < n; ++i)this.each(on(typenames[i], value, options));
    return this;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"eZMTj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _windowJs = require("../window.js");
var _windowJsDefault = parcelHelpers.interopDefault(_windowJs);
function dispatchEvent(node, type, params) {
    var window = _windowJsDefault.default(node), event = window.CustomEvent;
    if (typeof event === "function") event = new event(type, params);
    else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
    }
    node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
    return function() {
        return dispatchEvent(this, type, params);
    };
}
function dispatchFunction(type, params) {
    return function() {
        return dispatchEvent(this, type, params.apply(this, arguments));
    };
}
exports.default = function(type, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
};

},{"../window.js":"6di7h","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"32Fgr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function*() {
    for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j){
        for(var group = groups[j], i = 0, n = group.length, node; i < n; ++i)if (node = group[i]) yield node;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"46aZj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "channel", ()=>_channelJsonDefault.default
);
parcelHelpers.export(exports, "track", ()=>_trackJsonDefault.default
);
parcelHelpers.export(exports, "visualization", ()=>_visualizationJsonDefault.default
);
var _jsonschema = require("jsonschema");
var _visualizationJson = require("./visualization.json");
var _visualizationJsonDefault = parcelHelpers.interopDefault(_visualizationJson);
var _trackJson = require("./track.json");
var _trackJsonDefault = parcelHelpers.interopDefault(_trackJson);
var _channelJson = require("./channel.json");
var _channelJsonDefault = parcelHelpers.interopDefault(_channelJson);
const v = new _jsonschema.Validator();
v.addSchema(_channelJsonDefault.default, "/channel");
v.addSchema(_trackJsonDefault.default, "/track");
/**
 * Utility method that returns a boolean on whether the json is a valid specification.
 * console.errors the reason if it is not.
 * @param {Object} json specification
 * @returns boolean
 */ const isJSONValid = (json)=>{
    const validation = v.validate(json, _visualizationJsonDefault.default);
    if (!validation.valid) console.error(validation.errors);
    return validation.valid;
};
exports.default = isJSONValid;

},{"jsonschema":"1FHqv","./visualization.json":"dv2dO","./track.json":"gGG5W","./channel.json":"gGfj1","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}],"1FHqv":[function(require,module,exports) {
'use strict';
var Validator = module.exports.Validator = require('./validator');
module.exports.ValidatorResult = require('./helpers').ValidatorResult;
module.exports.ValidatorResultError = require('./helpers').ValidatorResultError;
module.exports.ValidationError = require('./helpers').ValidationError;
module.exports.SchemaError = require('./helpers').SchemaError;
module.exports.SchemaScanResult = require('./scan').SchemaScanResult;
module.exports.scan = require('./scan').scan;
module.exports.validate = function(instance, schema, options) {
    var v = new Validator();
    return v.validate(instance, schema, options);
};

},{"./validator":"lAuUg","./helpers":"5kpID","./scan":"bHmlS"}],"lAuUg":[function(require,module,exports) {
'use strict';
var urilib = require('url');
var attribute = require('./attribute');
var helpers = require('./helpers');
var scanSchema = require('./scan').scan;
var ValidatorResult = helpers.ValidatorResult;
var ValidatorResultError = helpers.ValidatorResultError;
var SchemaError = helpers.SchemaError;
var SchemaContext = helpers.SchemaContext;
//var anonymousBase = 'vnd.jsonschema:///';
var anonymousBase = '/';
/**
 * Creates a new Validator object
 * @name Validator
 * @constructor
 */ var Validator = function Validator1() {
    // Allow a validator instance to override global custom formats or to have their
    // own custom formats.
    this.customFormats = Object.create(Validator1.prototype.customFormats);
    this.schemas = {
    };
    this.unresolvedRefs = [];
    // Use Object.create to make this extensible without Validator instances stepping on each other's toes.
    this.types = Object.create(types);
    this.attributes = Object.create(attribute.validators);
};
// Allow formats to be registered globally.
Validator.prototype.customFormats = {
};
// Hint at the presence of a property
Validator.prototype.schemas = null;
Validator.prototype.types = null;
Validator.prototype.attributes = null;
Validator.prototype.unresolvedRefs = null;
/**
 * Adds a schema with a certain urn to the Validator instance.
 * @param schema
 * @param urn
 * @return {Object}
 */ Validator.prototype.addSchema = function addSchema(schema, base) {
    var self = this;
    if (!schema) return null;
    var scan = scanSchema(base || anonymousBase, schema);
    var ourUri = base || schema.$id || schema.id;
    for(var uri in scan.id)this.schemas[uri] = scan.id[uri];
    for(var uri in scan.ref)// If this schema is already defined, it will be filtered out by the next step
    this.unresolvedRefs.push(uri);
    // Remove newly defined schemas from unresolvedRefs
    this.unresolvedRefs = this.unresolvedRefs.filter(function(uri) {
        return typeof self.schemas[uri] === 'undefined';
    });
    return this.schemas[ourUri];
};
Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
    if (!Array.isArray(schemas)) return;
    for(var i = 0; i < schemas.length; i++)this.addSubSchema(baseuri, schemas[i]);
};
Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
    if (!schemas || typeof schemas != 'object') return;
    for(var p in schemas)this.addSubSchema(baseuri, schemas[p]);
};
/**
 * Sets all the schemas of the Validator instance.
 * @param schemas
 */ Validator.prototype.setSchemas = function setSchemas(schemas) {
    this.schemas = schemas;
};
/**
 * Returns the schema of a certain urn
 * @param urn
 */ Validator.prototype.getSchema = function getSchema(urn) {
    return this.schemas[urn];
};
/**
 * Validates instance against the provided schema
 * @param instance
 * @param schema
 * @param [options]
 * @param [ctx]
 * @return {Array}
 */ Validator.prototype.validate = function validate(instance, schema, options, ctx) {
    if (typeof schema !== 'boolean' && typeof schema !== 'object' || schema === null) throw new SchemaError('Expected `schema` to be an object or boolean');
    if (!options) options = {
    };
    // This section indexes subschemas in the provided schema, so they don't need to be added with Validator#addSchema
    // This will work so long as the function at uri.resolve() will resolve a relative URI to a relative URI
    var id = schema.$id || schema.id;
    var base = urilib.resolve(options.base || anonymousBase, id || '');
    if (!ctx) {
        ctx = new SchemaContext(schema, options, [], base, Object.create(this.schemas));
        if (!ctx.schemas[base]) ctx.schemas[base] = schema;
        var found = scanSchema(base, schema);
        for(var n in found.id){
            var sch = found.id[n];
            ctx.schemas[n] = sch;
        }
    }
    if (options.required && instance === undefined) {
        var result = new ValidatorResult(instance, schema, options, ctx);
        result.addError('is required, but is undefined');
        return result;
    }
    var result = this.validateSchema(instance, schema, options, ctx);
    if (!result) throw new Error('Result undefined');
    else if (options.throwAll && result.errors.length) throw new ValidatorResultError(result);
    return result;
};
/**
* @param Object schema
* @return mixed schema uri or false
*/ function shouldResolve(schema) {
    var ref = typeof schema === 'string' ? schema : schema.$ref;
    if (typeof ref == 'string') return ref;
    return false;
}
/**
 * Validates an instance against the schema (the actual work horse)
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @private
 * @return {ValidatorResult}
 */ Validator.prototype.validateSchema = function validateSchema(instance, schema, options, ctx) {
    var result = new ValidatorResult(instance, schema, options, ctx);
    // Support for the true/false schemas
    if (typeof schema === 'boolean') {
        if (schema === true) // `true` is always valid
        schema = {
        };
        else if (schema === false) // `false` is always invalid
        schema = {
            type: []
        };
    } else if (!schema) // This might be a string
    throw new Error("schema is undefined");
    if (schema['extends']) {
        if (Array.isArray(schema['extends'])) {
            var schemaobj = {
                schema: schema,
                ctx: ctx
            };
            schema['extends'].forEach(this.schemaTraverser.bind(this, schemaobj));
            schema = schemaobj.schema;
            schemaobj.schema = null;
            schemaobj.ctx = null;
            schemaobj = null;
        } else schema = helpers.deepMerge(schema, this.superResolve(schema['extends'], ctx));
    }
    // If passed a string argument, load that schema URI
    var switchSchema = shouldResolve(schema);
    if (switchSchema) {
        var resolved = this.resolve(schema, switchSchema, ctx);
        var subctx = new SchemaContext(resolved.subschema, options, ctx.path, resolved.switchSchema, ctx.schemas);
        return this.validateSchema(instance, resolved.subschema, options, subctx);
    }
    var skipAttributes = options && options.skipAttributes || [];
    // Validate each schema attribute against the instance
    for(var key in schema)if (!attribute.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
        var validatorErr = null;
        var validator = this.attributes[key];
        if (validator) validatorErr = validator.call(this, instance, schema, options, ctx);
        else if (options.allowUnknownAttributes === false) // This represents an error with the schema itself, not an invalid instance
        throw new SchemaError("Unsupported attribute: " + key, schema);
        if (validatorErr) result.importErrors(validatorErr);
    }
    if (typeof options.rewrite == 'function') {
        var value = options.rewrite.call(this, instance, schema, options, ctx);
        result.instance = value;
    }
    return result;
};
/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/ Validator.prototype.schemaTraverser = function schemaTraverser(schemaobj, s) {
    schemaobj.schema = helpers.deepMerge(schemaobj.schema, this.superResolve(s, schemaobj.ctx));
};
/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/ Validator.prototype.superResolve = function superResolve(schema, ctx) {
    var ref = shouldResolve(schema);
    if (ref) return this.resolve(schema, ref, ctx).subschema;
    return schema;
};
/**
* @private
* @param Object schema
* @param Object switchSchema
* @param SchemaContext ctx
* @return Object resolved schemas {subschema:String, switchSchema: String}
* @throws SchemaError
*/ Validator.prototype.resolve = function resolve(schema, switchSchema, ctx) {
    switchSchema = ctx.resolve(switchSchema);
    // First see if the schema exists under the provided URI
    if (ctx.schemas[switchSchema]) return {
        subschema: ctx.schemas[switchSchema],
        switchSchema: switchSchema
    };
    // Else try walking the property pointer
    var parsed = urilib.parse(switchSchema);
    var fragment = parsed && parsed.hash;
    var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
    if (!document || !ctx.schemas[document]) throw new SchemaError("no such schema <" + switchSchema + ">", schema);
    var subschema = helpers.objectGetPath(ctx.schemas[document], fragment.substr(1));
    if (subschema === undefined) throw new SchemaError("no such schema " + fragment + " located in <" + document + ">", schema);
    return {
        subschema: subschema,
        switchSchema: switchSchema
    };
};
/**
 * Tests whether the instance if of a certain type.
 * @private
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @param type
 * @return {boolean}
 */ Validator.prototype.testType = function validateType(instance, schema, options, ctx, type) {
    if (type === undefined) return;
    else if (type === null) throw new SchemaError('Unexpected null in "type" keyword');
    if (typeof this.types[type] == 'function') return this.types[type].call(this, instance);
    if (type && typeof type == 'object') {
        var res = this.validateSchema(instance, type, options, ctx);
        return res === undefined || !(res && res.errors.length);
    }
    // Undefined or properties not on the list are acceptable, same as not being defined
    return true;
};
var types = Validator.prototype.types = {
};
types.string = function testString(instance) {
    return typeof instance == 'string';
};
types.number = function testNumber(instance) {
    // isFinite returns false for NaN, Infinity, and -Infinity
    return typeof instance == 'number' && isFinite(instance);
};
types.integer = function testInteger(instance) {
    return typeof instance == 'number' && instance % 1 === 0;
};
types.boolean = function testBoolean(instance) {
    return typeof instance == 'boolean';
};
types.array = function testArray(instance) {
    return Array.isArray(instance);
};
types['null'] = function testNull(instance) {
    return instance === null;
};
types.date = function testDate(instance) {
    return instance instanceof Date;
};
types.any = function testAny(instance) {
    return true;
};
types.object = function testObject(instance) {
    // TODO: fix this - see #15
    return instance && typeof instance === 'object' && !Array.isArray(instance) && !(instance instanceof Date);
};
module.exports = Validator;

},{"url":"7qjc7","./attribute":"iVdIg","./helpers":"5kpID","./scan":"bHmlS"}],"7qjc7":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';
var punycode = require('punycode');
var util = require('./util');
exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;
exports.Url = Url;
function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
}
// Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, // Special case for a simple path URL
simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, // RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
delims = [
    '<',
    '>',
    '"',
    '`',
    ' ',
    '\r',
    '\n',
    '\t'
], // RFC 2396: characters not allowed for various reasons.
unwise = [
    '{',
    '}',
    '|',
    '\\',
    '^',
    '`'
].concat(delims), // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape = [
    '\''
].concat(unwise), // Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
nonHostChars = [
    '%',
    '/',
    '?',
    ';',
    '#'
].concat(autoEscape), hostEndingChars = [
    '/',
    '?',
    '#'
], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, // protocols that can allow "unsafe" and "unwise" chars.
unsafeProtocol = {
    'javascript': true,
    'javascript:': true
}, // protocols that never have a hostname.
hostlessProtocol = {
    'javascript': true,
    'javascript:': true
}, // protocols that always contain a // bit.
slashedProtocol = {
    'http': true,
    'https': true,
    'ftp': true,
    'gopher': true,
    'file': true,
    'http:': true,
    'https:': true,
    'ftp:': true,
    'gopher:': true,
    'file:': true
}, querystring = require('querystring');
function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && util.isObject(url) && url instanceof Url) return url;
    var u = new Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
}
Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    if (!util.isString(url)) throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'), splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#', uSplit = url.split(splitter), slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);
    var rest = url;
    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();
    if (!slashesDenoteHost && url.split('#').length === 1) {
        // Try fast path regexp
        var simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
                this.search = simplePath[2];
                if (parseQueryString) this.query = querystring.parse(this.search.substr(1));
                else this.query = this.search.substr(1);
            } else if (parseQueryString) {
                this.search = '';
                this.query = {
                };
            }
            return this;
        }
    }
    var proto = protocolPattern.exec(rest);
    if (proto) {
        proto = proto[0];
        var lowerProto = proto.toLowerCase();
        this.protocol = lowerProto;
        rest = rest.substr(proto.length);
    }
    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var slashes = rest.substr(0, 2) === '//';
        if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
        }
    }
    if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
        // there's a hostname.
        // the first instance of /, ?, ;, or # ends the host.
        //
        // If there is an @ in the hostname, then non-host chars *are* allowed
        // to the left of the last @ sign, unless some host-ending character
        // comes *before* the @-sign.
        // URLs are obnoxious.
        //
        // ex:
        // http://a@b@c/ => user:a@b host:c
        // http://a@b?@c => user:a host:c path:/?@c
        // v0.12 TODO(isaacs): This is not quite how Chrome does things.
        // Review our test case against browsers more comprehensively.
        // find the first instance of any hostEndingChars
        var hostEnd = -1;
        for(var i = 0; i < hostEndingChars.length; i++){
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
        }
        // at this point, either we have an explicit point where the
        // auth portion cannot go past, or the last @ char is the decider.
        var auth, atSign;
        if (hostEnd === -1) // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
        else // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
        // Now we have a portion which is definitely the auth.
        // Pull that off.
        if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
        }
        // the host is the remaining to the left of the first non-host char
        hostEnd = -1;
        for(var i = 0; i < nonHostChars.length; i++){
            var hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
        }
        // if we still have not hit it, then the entire thing is a host.
        if (hostEnd === -1) hostEnd = rest.length;
        this.host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);
        // pull out port.
        this.parseHost();
        // we've indicated that there is a hostname,
        // so even if it's empty, it has to be present.
        this.hostname = this.hostname || '';
        // if hostname begins with [ and ends with ]
        // assume that it's an IPv6 address.
        var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';
        // validate a little.
        if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for(var i = 0, l = hostparts.length; i < l; i++){
                var part = hostparts[i];
                if (!part) continue;
                if (!part.match(hostnamePartPattern)) {
                    var newpart = '';
                    for(var j = 0, k = part.length; j < k; j++)if (part.charCodeAt(j) > 127) // we replace non-ASCII char with a temporary placeholder
                    // we need this to make sure size of hostname is not
                    // broken by replacing non-ASCII by nothing
                    newpart += 'x';
                    else newpart += part[j];
                    // we test again with ASCII char only
                    if (!newpart.match(hostnamePartPattern)) {
                        var validParts = hostparts.slice(0, i);
                        var notHost = hostparts.slice(i + 1);
                        var bit = part.match(hostnamePartStart);
                        if (bit) {
                            validParts.push(bit[1]);
                            notHost.unshift(bit[2]);
                        }
                        if (notHost.length) rest = '/' + notHost.join('.') + rest;
                        this.hostname = validParts.join('.');
                        break;
                    }
                }
            }
        }
        if (this.hostname.length > hostnameMaxLen) this.hostname = '';
        else // hostnames are always lower case.
        this.hostname = this.hostname.toLowerCase();
        if (!ipv6Hostname) // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        this.hostname = punycode.toASCII(this.hostname);
        var p = this.port ? ':' + this.port : '';
        var h = this.hostname || '';
        this.host = h + p;
        this.href += this.host;
        // strip [ and ] from the hostname
        // the host field still retains them, though
        if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== '/') rest = '/' + rest;
        }
    }
    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for(var i = 0, l = autoEscape.length; i < l; i++){
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1) continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) esc = escape(ae);
        rest = rest.split(ae).join(esc);
    }
    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
        // got a fragment string.
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
        this.search = rest.substr(qm);
        this.query = rest.substr(qm + 1);
        if (parseQueryString) this.query = querystring.parse(this.query);
        rest = rest.slice(0, qm);
    } else if (parseQueryString) {
        // no query string, but parseQueryString still requested
        this.search = '';
        this.query = {
        };
    }
    if (rest) this.pathname = rest;
    if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) this.pathname = '/';
    //to support http.request
    if (this.pathname || this.search) {
        var p = this.pathname || '';
        var s = this.search || '';
        this.path = p + s;
    }
    // finally, reconstruct the href based on what has been validated.
    this.href = this.format();
    return this;
};
// format a parsed object into a url string
function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (util.isString(obj)) obj = urlParse(obj);
    if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
    return obj.format();
}
Url.prototype.format = function() {
    var auth = this.auth || '';
    if (auth) {
        auth = encodeURIComponent(auth);
        auth = auth.replace(/%3A/i, ':');
        auth += '@';
    }
    var protocol = this.protocol || '', pathname = this.pathname || '', hash = this.hash || '', host = false, query = '';
    if (this.host) host = auth + this.host;
    else if (this.hostname) {
        host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
        if (this.port) host += ':' + this.port;
    }
    if (this.query && util.isObject(this.query) && Object.keys(this.query).length) query = querystring.stringify(this.query);
    var search = this.search || query && '?' + query || '';
    if (protocol && protocol.substr(-1) !== ':') protocol += ':';
    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) host = '';
    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, function(match) {
        return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');
    return protocol + host + pathname + search + hash;
};
function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
}
Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
};
function urlResolveObject(source, relative) {
    if (!source) return relative;
    return urlParse(source, false, true).resolveObject(relative);
}
Url.prototype.resolveObject = function(relative) {
    if (util.isString(relative)) {
        var rel = new Url();
        rel.parse(relative, false, true);
        relative = rel;
    }
    var result = new Url();
    var tkeys = Object.keys(this);
    for(var tk = 0; tk < tkeys.length; tk++){
        var tkey = tkeys[tk];
        result[tkey] = this[tkey];
    }
    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;
    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
        result.href = result.format();
        return result;
    }
    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
        // take everything except the protocol from relative
        var rkeys = Object.keys(relative);
        for(var rk = 0; rk < rkeys.length; rk++){
            var rkey = rkeys[rk];
            if (rkey !== 'protocol') result[rkey] = relative[rkey];
        }
        //urlParse appends trailing / to urls like http://www.example.com
        if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) result.path = result.pathname = '/';
        result.href = result.format();
        return result;
    }
    if (relative.protocol && relative.protocol !== result.protocol) {
        // if it's a known url protocol, then changing
        // the protocol does weird things
        // first, if it's not file:, then we MUST have a host,
        // and if there was a path
        // to begin with, then we MUST have a path.
        // if it is file:, then the host is dropped,
        // because that's known to be hostless.
        // anything else is assumed to be absolute.
        if (!slashedProtocol[relative.protocol]) {
            var keys = Object.keys(relative);
            for(var v = 0; v < keys.length; v++){
                var k = keys[v];
                result[k] = relative[k];
            }
            result.href = result.format();
            return result;
        }
        result.protocol = relative.protocol;
        if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || '').split('/');
            while(relPath.length && !(relative.host = relPath.shift()));
            if (!relative.host) relative.host = '';
            if (!relative.hostname) relative.hostname = '';
            if (relPath[0] !== '') relPath.unshift('');
            if (relPath.length < 2) relPath.unshift('');
            result.pathname = relPath.join('/');
        } else result.pathname = relative.pathname;
        result.search = relative.search;
        result.query = relative.query;
        result.host = relative.host || '';
        result.auth = relative.auth;
        result.hostname = relative.hostname || relative.host;
        result.port = relative.port;
        // to support http.request
        if (result.pathname || result.search) {
            var p = result.pathname || '';
            var s = result.search || '';
            result.path = p + s;
        }
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
    }
    var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/', isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/', mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split('/') || [], relPath = relative.pathname && relative.pathname.split('/') || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
        result.hostname = '';
        result.port = null;
        if (result.host) {
            if (srcPath[0] === '') srcPath[0] = result.host;
            else srcPath.unshift(result.host);
        }
        result.host = '';
        if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
                if (relPath[0] === '') relPath[0] = relative.host;
                else relPath.unshift(relative.host);
            }
            relative.host = null;
        }
        mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }
    if (isRelAbs) {
        // it's absolute.
        result.host = relative.host || relative.host === '' ? relative.host : result.host;
        result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
        result.search = relative.search;
        result.query = relative.query;
        srcPath = relPath;
    // fall through to the dot-handling below.
    } else if (relPath.length) {
        // it's relative
        // throw away the existing file, and take the new path instead.
        if (!srcPath) srcPath = [];
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
    } else if (!util.isNullOrUndefined(relative.search)) {
        // just pull out the search.
        // like href='?foo'.
        // Put this after the other two cases because it simplifies the booleans
        if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            //occationaly the auth can get stuck only in host
            //this especially happens in cases like
            //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
            var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
            if (authInHost) {
                result.auth = authInHost.shift();
                result.host = result.hostname = authInHost.shift();
            }
        }
        result.search = relative.search;
        result.query = relative.query;
        //to support http.request
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
        result.href = result.format();
        return result;
    }
    if (!srcPath.length) {
        // no path at all.  easy.
        // we've already handled the other stuff above.
        result.pathname = null;
        //to support http.request
        if (result.search) result.path = '/' + result.search;
        else result.path = null;
        result.href = result.format();
        return result;
    }
    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === '';
    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for(var i = srcPath.length; i >= 0; i--){
        last = srcPath[i];
        if (last === '.') srcPath.splice(i, 1);
        else if (last === '..') {
            srcPath.splice(i, 1);
            up++;
        } else if (up) {
            srcPath.splice(i, 1);
            up--;
        }
    }
    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) for(; up--;)srcPath.unshift('..');
    if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) srcPath.unshift('');
    if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') srcPath.push('');
    var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/';
    // put the host back
    if (psychotic) {
        result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
        if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
        }
    }
    mustEndAbs = mustEndAbs || result.host && srcPath.length;
    if (mustEndAbs && !isAbsolute) srcPath.unshift('');
    if (!srcPath.length) {
        result.pathname = null;
        result.path = null;
    } else result.pathname = srcPath.join('/');
    //to support request.http
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
};
Url.prototype.parseHost = function() {
    var host = this.host;
    var port = portPattern.exec(host);
    if (port) {
        port = port[0];
        if (port !== ':') this.port = port.substr(1);
        host = host.substr(0, host.length - port.length);
    }
    if (host) this.hostname = host;
};

},{"punycode":"duSuz","./util":"8nk0t","querystring":"7oCJH"}],"duSuz":[function(require,module,exports) {
var global = arguments[3];
(function(root) {
    /** Detect free variables */ var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
    var freeModule = typeof module == 'object' && module && !module.nodeType && module;
    var freeGlobal = typeof global == 'object' && global;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) root = freeGlobal;
    /**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */ var punycode, /** Highest positive signed 32-bit float value */ maxInt = 2147483647, /** Bootstring parameters */ base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = '-', /** Regular expressions */ regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, /** Error messages */ errors = {
        'overflow': 'Overflow: input needs wider integers to process',
        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
        'invalid-input': 'Invalid input'
    }, /** Convenience shortcuts */ baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, /** Temporary variable */ key;
    /*--------------------------------------------------------------------------*/ /**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */ function error(type) {
        throw RangeError(errors[type]);
    }
    /**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */ function map(array, fn) {
        var length = array.length;
        var result = [];
        while(length--)result[length] = fn(array[length]);
        return result;
    }
    /**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */ function mapDomain(string, fn) {
        var parts = string.split('@');
        var result = '';
        if (parts.length > 1) {
            // In email addresses, only the domain name should be punycoded. Leave
            // the local part (i.e. everything up to `@`) intact.
            result = parts[0] + '@';
            string = parts[1];
        }
        // Avoid `split(regex)` for IE8 compatibility. See #17.
        string = string.replace(regexSeparators, '\x2E');
        var labels = string.split('.');
        var encoded = map(labels, fn).join('.');
        return result + encoded;
    }
    /**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */ function ucs2decode(string) {
        var output = [], counter = 0, length = string.length, value, extra;
        while(counter < length){
            value = string.charCodeAt(counter++);
            if (value >= 55296 && value <= 56319 && counter < length) {
                // high surrogate, and there is a next character
                extra = string.charCodeAt(counter++);
                if ((extra & 64512) == 56320) output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                else {
                    // unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value);
                    counter--;
                }
            } else output.push(value);
        }
        return output;
    }
    /**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */ function ucs2encode(array) {
        return map(array, function(value) {
            var output = '';
            if (value > 65535) {
                value -= 65536;
                output += stringFromCharCode(value >>> 10 & 1023 | 55296);
                value = 56320 | value & 1023;
            }
            output += stringFromCharCode(value);
            return output;
        }).join('');
    }
    /**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */ function basicToDigit(codePoint) {
        if (codePoint - 48 < 10) return codePoint - 22;
        if (codePoint - 65 < 26) return codePoint - 65;
        if (codePoint - 97 < 26) return codePoint - 97;
        return base;
    }
    /**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */ function digitToBasic(digit, flag) {
        //  0..25 map to ASCII a..z or A..Z
        // 26..35 map to ASCII 0..9
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }
    /**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */ function adapt(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for(; delta > baseMinusTMin * tMax >> 1; k += base)delta = floor(delta / baseMinusTMin);
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }
    /**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */ function decode(input) {
        // Don't use UCS-2
        var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, /** Cached calculation results */ baseMinusT;
        // Handle the basic code points: let `basic` be the number of input code
        // points before the last delimiter, or `0` if there is none, then copy
        // the first basic code points to the output.
        basic = input.lastIndexOf(delimiter);
        if (basic < 0) basic = 0;
        for(j = 0; j < basic; ++j){
            // if it's not a basic code point
            if (input.charCodeAt(j) >= 128) error('not-basic');
            output.push(input.charCodeAt(j));
        }
        // Main decoding loop: start just after the last delimiter if any basic code
        // points were copied; start at the beginning otherwise.
        for(index = basic > 0 ? basic + 1 : 0; index < inputLength;){
            // `index` is the index of the next character to be consumed.
            // Decode a generalized variable-length integer into `delta`,
            // which gets added to `i`. The overflow checking is easier
            // if we increase `i` as we go, then subtract off its starting
            // value at the end to obtain `delta`.
            for(oldi = i, w = 1, k = base;; k += base){
                if (index >= inputLength) error('invalid-input');
                digit = basicToDigit(input.charCodeAt(index++));
                if (digit >= base || digit > floor((maxInt - i) / w)) error('overflow');
                i += digit * w;
                t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                if (digit < t) break;
                baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) error('overflow');
                w *= baseMinusT;
            }
            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi == 0);
            // `i` was supposed to wrap around from `out` to `0`,
            // incrementing `n` each time, so we'll fix that now:
            if (floor(i / out) > maxInt - n) error('overflow');
            n += floor(i / out);
            i %= out;
            // Insert `n` at position `i` of the output
            output.splice(i++, 0, n);
        }
        return ucs2encode(output);
    }
    /**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */ function encode(input) {
        var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], /** `inputLength` will hold the number of code points in `input`. */ inputLength, /** Cached calculation results */ handledCPCountPlusOne, baseMinusT, qMinusT;
        // Convert the input in UCS-2 to Unicode
        input = ucs2decode(input);
        // Cache the length
        inputLength = input.length;
        // Initialize the state
        n = initialN;
        delta = 0;
        bias = initialBias;
        // Handle the basic code points
        for(j = 0; j < inputLength; ++j){
            currentValue = input[j];
            if (currentValue < 128) output.push(stringFromCharCode(currentValue));
        }
        handledCPCount = basicLength = output.length;
        // `handledCPCount` is the number of code points that have been handled;
        // `basicLength` is the number of basic code points.
        // Finish the basic string - if it is not empty - with a delimiter
        if (basicLength) output.push(delimiter);
        // Main encoding loop:
        while(handledCPCount < inputLength){
            // All non-basic code points < n have been handled already. Find the next
            // larger one:
            for(m = maxInt, j = 0; j < inputLength; ++j){
                currentValue = input[j];
                if (currentValue >= n && currentValue < m) m = currentValue;
            }
            // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
            // but guard against overflow
            handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) error('overflow');
            delta += (m - n) * handledCPCountPlusOne;
            n = m;
            for(j = 0; j < inputLength; ++j){
                currentValue = input[j];
                if (currentValue < n && ++delta > maxInt) error('overflow');
                if (currentValue == n) {
                    // Represent delta as a generalized variable-length integer
                    for(q = delta, k = base;; k += base){
                        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                        if (q < t) break;
                        qMinusT = q - t;
                        baseMinusT = base - t;
                        output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                        q = floor(qMinusT / baseMinusT);
                    }
                    output.push(stringFromCharCode(digitToBasic(q, 0)));
                    bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                    delta = 0;
                    ++handledCPCount;
                }
            }
            ++delta;
            ++n;
        }
        return output.join('');
    }
    /**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */ function toUnicode(input) {
        return mapDomain(input, function(string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
    }
    /**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */ function toASCII(input) {
        return mapDomain(input, function(string) {
            return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
        });
    }
    /*--------------------------------------------------------------------------*/ /** Define the public API */ punycode = {
        /**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */ 'version': '1.3.2',
        /**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */ 'ucs2': {
            'decode': ucs2decode,
            'encode': ucs2encode
        },
        'decode': decode,
        'encode': encode,
        'toASCII': toASCII,
        'toUnicode': toUnicode
    };
    /** Expose `punycode` */ // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) define('punycode', function() {
        return punycode;
    });
    else if (freeExports && freeModule) {
        if (module.exports == freeExports) freeModule.exports = punycode;
        else for(key in punycode)punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
    } else root.punycode = punycode;
})(this);

},{}],"8nk0t":[function(require,module,exports) {
'use strict';
module.exports = {
    isString: function(arg) {
        return typeof arg === 'string';
    },
    isObject: function(arg) {
        return typeof arg === 'object' && arg !== null;
    },
    isNull: function(arg) {
        return arg === null;
    },
    isNullOrUndefined: function(arg) {
        return arg == null;
    }
};

},{}],"7oCJH":[function(require,module,exports) {
'use strict';
exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":"3WtwQ","./encode":"i5gNM"}],"3WtwQ":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';
// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
module.exports = function(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {
    };
    if (typeof qs !== 'string' || qs.length === 0) return obj;
    var regexp = /\+/g;
    qs = qs.split(sep);
    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') maxKeys = options.maxKeys;
    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) len = maxKeys;
    for(var i = 0; i < len; ++i){
        var x = qs[i].replace(regexp, '%20'), idx = x.indexOf(eq), kstr, vstr, k, v;
        if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
        } else {
            kstr = x;
            vstr = '';
        }
        k = decodeURIComponent(kstr);
        v = decodeURIComponent(vstr);
        if (!hasOwnProperty(obj, k)) obj[k] = v;
        else if (isArray(obj[k])) obj[k].push(v);
        else obj[k] = [
            obj[k],
            v
        ];
    }
    return obj;
};
var isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],"i5gNM":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';
var stringifyPrimitive = function(v) {
    switch(typeof v){
        case 'string':
            return v;
        case 'boolean':
            return v ? 'true' : 'false';
        case 'number':
            return isFinite(v) ? v : '';
        default:
            return '';
    }
};
module.exports = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) obj = undefined;
    if (typeof obj === 'object') return map(objectKeys(obj), function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (isArray(obj[k])) return map(obj[k], function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
        else return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
    }).join(sep);
    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};
var isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};
function map(xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for(var i = 0; i < xs.length; i++)res.push(f(xs[i], i));
    return res;
}
var objectKeys = Object.keys || function(obj) {
    var res = [];
    for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    return res;
};

},{}],"iVdIg":[function(require,module,exports) {
'use strict';
var helpers = require('./helpers');
/** @type ValidatorResult */ var ValidatorResult = helpers.ValidatorResult;
/** @type SchemaError */ var SchemaError = helpers.SchemaError;
var attribute = {
};
attribute.ignoreProperties = {
    // informative properties
    'id': true,
    'default': true,
    'description': true,
    'title': true,
    // arguments to other properties
    'additionalItems': true,
    'then': true,
    'else': true,
    // special-handled properties
    '$schema': true,
    '$ref': true,
    'extends': true
};
/**
 * @name validators
 */ var validators = attribute.validators = {
};
/**
 * Validates whether the instance if of a certain type
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */ validators.type = function validateType(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var types = Array.isArray(schema.type) ? schema.type : [
        schema.type
    ];
    if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
        var list = types.map(function(v) {
            if (!v) return;
            var id = v.$id || v.id;
            return id ? '<' + id + '>' : v + '';
        });
        result.addError({
            name: 'type',
            argument: list,
            message: "is not of a type(s) " + list
        });
    }
    return result;
};
function testSchemaNoThrow(instance, options, ctx, callback, schema) {
    var throwError = options.throwError;
    var throwAll = options.throwAll;
    options.throwError = false;
    options.throwAll = false;
    var res = this.validateSchema(instance, schema, options, ctx);
    options.throwError = throwError;
    options.throwAll = throwAll;
    if (!res.valid && callback instanceof Function) callback(res);
    return res.valid;
}
/**
 * Validates whether the instance matches some of the given schemas
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */ validators.anyOf = function validateAnyOf(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var inner = new ValidatorResult(instance, schema, options, ctx);
    if (!Array.isArray(schema.anyOf)) throw new SchemaError("anyOf must be an array");
    if (!schema.anyOf.some(testSchemaNoThrow.bind(this, instance, options, ctx, function(res) {
        inner.importErrors(res);
    }))) {
        var list = schema.anyOf.map(function(v, i) {
            var id = v.$id || v.id;
            if (id) return '<' + id + '>';
            return v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
        });
        if (options.nestedErrors) result.importErrors(inner);
        result.addError({
            name: 'anyOf',
            argument: list,
            message: "is not any of " + list.join(',')
        });
    }
    return result;
};
/**
 * Validates whether the instance matches every given schema
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null}
 */ validators.allOf = function validateAllOf(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    if (!Array.isArray(schema.allOf)) throw new SchemaError("allOf must be an array");
    var result = new ValidatorResult(instance, schema, options, ctx);
    var self = this;
    schema.allOf.forEach(function(v, i) {
        var valid = self.validateSchema(instance, v, options, ctx);
        if (!valid.valid) {
            var id = v.$id || v.id;
            var msg = id || v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
            result.addError({
                name: 'allOf',
                argument: {
                    id: msg,
                    length: valid.errors.length,
                    valid: valid
                },
                message: 'does not match allOf schema ' + msg + ' with ' + valid.errors.length + ' error[s]:'
            });
            result.importErrors(valid);
        }
    });
    return result;
};
/**
 * Validates whether the instance matches exactly one of the given schemas
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null}
 */ validators.oneOf = function validateOneOf(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    if (!Array.isArray(schema.oneOf)) throw new SchemaError("oneOf must be an array");
    var result = new ValidatorResult(instance, schema, options, ctx);
    var inner = new ValidatorResult(instance, schema, options, ctx);
    var count = schema.oneOf.filter(testSchemaNoThrow.bind(this, instance, options, ctx, function(res) {
        inner.importErrors(res);
    })).length;
    var list = schema.oneOf.map(function(v, i) {
        var id = v.$id || v.id;
        return id || v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
    });
    if (count !== 1) {
        if (options.nestedErrors) result.importErrors(inner);
        result.addError({
            name: 'oneOf',
            argument: list,
            message: "is not exactly one from " + list.join(',')
        });
    }
    return result;
};
/**
 * Validates "then" or "else" depending on the result of validating "if"
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null}
 */ validators.if = function validateIf(instance, schema, options, ctx) {
    // Ignore undefined instances
    if (instance === undefined) return null;
    if (!helpers.isSchema(schema.if)) throw new Error('Expected "if" keyword to be a schema');
    var ifValid = testSchemaNoThrow.call(this, instance, options, ctx, null, schema.if);
    var result = new ValidatorResult(instance, schema, options, ctx);
    var res;
    if (ifValid) {
        if (schema.then === undefined) return;
        if (!helpers.isSchema(schema.then)) throw new Error('Expected "then" keyword to be a schema');
        res = this.validateSchema(instance, schema.then, options, ctx.makeChild(schema.then));
        result.importErrors(res);
    } else {
        if (schema.else === undefined) return;
        if (!helpers.isSchema(schema.else)) throw new Error('Expected "else" keyword to be a schema');
        res = this.validateSchema(instance, schema.else, options, ctx.makeChild(schema.else));
        result.importErrors(res);
    }
    return result;
};
function getEnumerableProperty(object, key) {
    // Determine if `key` shows up in `for(var key in object)`
    // First test Object.hasOwnProperty.call as an optimization: that guarantees it does
    if (Object.hasOwnProperty.call(object, key)) return object[key];
    // Test `key in object` as an optimization; false means it won't
    if (!(key in object)) return;
    while(object = Object.getPrototypeOf(object)){
        if (Object.propertyIsEnumerable.call(object, key)) return object[key];
    }
}
/**
 * Validates propertyNames
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */ validators.propertyNames = function validatePropertyNames(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var subschema = schema.propertyNames !== undefined ? schema.propertyNames : {
    };
    if (!helpers.isSchema(subschema)) throw new SchemaError('Expected "propertyNames" to be a schema (object or boolean)');
    for(var property in instance)if (getEnumerableProperty(instance, property) !== undefined) {
        var res = this.validateSchema(property, subschema, options, ctx.makeChild(subschema));
        result.importErrors(res);
    }
    return result;
};
/**
 * Validates properties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */ validators.properties = function validateProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var properties = schema.properties || {
    };
    for(var property in properties){
        var subschema = properties[property];
        if (subschema === undefined) continue;
        else if (subschema === null) throw new SchemaError('Unexpected null, expected schema in "properties"');
        if (typeof options.preValidateProperty == 'function') options.preValidateProperty(instance, property, subschema, options, ctx);
        var prop = getEnumerableProperty(instance, property);
        var res = this.validateSchema(prop, subschema, options, ctx.makeChild(subschema, property));
        if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
        result.importErrors(res);
    }
    return result;
};
/**
 * Test a specific property within in instance against the additionalProperties schema attribute
 * This ignores properties with definitions in the properties schema attribute, but no other attributes.
 * If too many more types of property-existence tests pop up they may need their own class of tests (like `type` has)
 * @private
 * @return {boolean}
 */ function testAdditionalProperty(instance, schema, options, ctx, property, result) {
    if (!this.types.object(instance)) return;
    if (schema.properties && schema.properties[property] !== undefined) return;
    if (schema.additionalProperties === false) result.addError({
        name: 'additionalProperties',
        argument: property,
        message: "is not allowed to have the additional property " + JSON.stringify(property)
    });
    else {
        var additionalProperties = schema.additionalProperties || {
        };
        if (typeof options.preValidateProperty == 'function') options.preValidateProperty(instance, property, additionalProperties, options, ctx);
        var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
        if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
        result.importErrors(res);
    }
}
/**
 * Validates patternProperties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */ validators.patternProperties = function validatePatternProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var patternProperties = schema.patternProperties || {
    };
    for(var property in instance){
        var test = true;
        for(var pattern in patternProperties){
            var subschema = patternProperties[pattern];
            if (subschema === undefined) continue;
            else if (subschema === null) throw new SchemaError('Unexpected null, expected schema in "patternProperties"');
            try {
                var regexp = new RegExp(pattern, 'u');
            } catch (_e) {
                // In the event the stricter handling causes an error, fall back on the forgiving handling
                // DEPRECATED
                regexp = new RegExp(pattern);
            }
            if (!regexp.test(property)) continue;
            test = false;
            if (typeof options.preValidateProperty == 'function') options.preValidateProperty(instance, property, subschema, options, ctx);
            var res = this.validateSchema(instance[property], subschema, options, ctx.makeChild(subschema, property));
            if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
            result.importErrors(res);
        }
        if (test) testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
    }
    return result;
};
/**
 * Validates additionalProperties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */ validators.additionalProperties = function validateAdditionalProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    // if patternProperties is defined then we'll test when that one is called instead
    if (schema.patternProperties) return null;
    var result = new ValidatorResult(instance, schema, options, ctx);
    for(var property in instance)testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
    return result;
};
/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.minProperties = function validateMinProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var keys = Object.keys(instance);
    if (!(keys.length >= schema.minProperties)) result.addError({
        name: 'minProperties',
        argument: schema.minProperties,
        message: "does not meet minimum property length of " + schema.minProperties
    });
    return result;
};
/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.maxProperties = function validateMaxProperties(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var keys = Object.keys(instance);
    if (!(keys.length <= schema.maxProperties)) result.addError({
        name: 'maxProperties',
        argument: schema.maxProperties,
        message: "does not meet maximum property length of " + schema.maxProperties
    });
    return result;
};
/**
 * Validates items when instance is an array
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */ validators.items = function validateItems(instance, schema, options, ctx) {
    var self = this;
    if (!this.types.array(instance)) return;
    if (!schema.items) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    instance.every(function(value, i) {
        var items = Array.isArray(schema.items) ? schema.items[i] || schema.additionalItems : schema.items;
        if (items === undefined) return true;
        if (items === false) {
            result.addError({
                name: 'items',
                message: "additionalItems not permitted"
            });
            return false;
        }
        var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
        if (res.instance !== result.instance[i]) result.instance[i] = res.instance;
        result.importErrors(res);
        return true;
    });
    return result;
};
/**
 * Validates minimum and exclusiveMinimum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.minimum = function validateMinimum(instance, schema, options, ctx) {
    if (!this.types.number(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
        if (!(instance > schema.minimum)) result.addError({
            name: 'minimum',
            argument: schema.minimum,
            message: "must be greater than " + schema.minimum
        });
    } else if (!(instance >= schema.minimum)) result.addError({
        name: 'minimum',
        argument: schema.minimum,
        message: "must be greater than or equal to " + schema.minimum
    });
    return result;
};
/**
 * Validates maximum and exclusiveMaximum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.maximum = function validateMaximum(instance, schema, options, ctx) {
    if (!this.types.number(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
        if (!(instance < schema.maximum)) result.addError({
            name: 'maximum',
            argument: schema.maximum,
            message: "must be less than " + schema.maximum
        });
    } else if (!(instance <= schema.maximum)) result.addError({
        name: 'maximum',
        argument: schema.maximum,
        message: "must be less than or equal to " + schema.maximum
    });
    return result;
};
/**
 * Validates the number form of exclusiveMinimum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.exclusiveMinimum = function validateExclusiveMinimum(instance, schema, options, ctx) {
    // Support the boolean form of exclusiveMinimum, which is handled by the "minimum" keyword.
    if (typeof schema.exclusiveMaximum === 'boolean') return;
    if (!this.types.number(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var valid = instance > schema.exclusiveMinimum;
    if (!valid) result.addError({
        name: 'exclusiveMinimum',
        argument: schema.exclusiveMinimum,
        message: "must be strictly greater than " + schema.exclusiveMinimum
    });
    return result;
};
/**
 * Validates the number form of exclusiveMaximum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.exclusiveMaximum = function validateExclusiveMaximum(instance, schema, options, ctx) {
    // Support the boolean form of exclusiveMaximum, which is handled by the "maximum" keyword.
    if (typeof schema.exclusiveMaximum === 'boolean') return;
    if (!this.types.number(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var valid = instance < schema.exclusiveMaximum;
    if (!valid) result.addError({
        name: 'exclusiveMaximum',
        argument: schema.exclusiveMaximum,
        message: "must be strictly less than " + schema.exclusiveMaximum
    });
    return result;
};
/**
 * Perform validation for multipleOf and divisibleBy, which are essentially the same.
 * @param instance
 * @param schema
 * @param validationType
 * @param errorMessage
 * @returns {String|null}
 */ var validateMultipleOfOrDivisbleBy = function validateMultipleOfOrDivisbleBy(instance, schema, options, ctx, validationType, errorMessage) {
    if (!this.types.number(instance)) return;
    var validationArgument = schema[validationType];
    if (validationArgument == 0) throw new SchemaError(validationType + " cannot be zero");
    var result = new ValidatorResult(instance, schema, options, ctx);
    var instanceDecimals = helpers.getDecimalPlaces(instance);
    var divisorDecimals = helpers.getDecimalPlaces(validationArgument);
    var maxDecimals = Math.max(instanceDecimals, divisorDecimals);
    var multiplier = Math.pow(10, maxDecimals);
    if (Math.round(instance * multiplier) % Math.round(validationArgument * multiplier) !== 0) result.addError({
        name: validationType,
        argument: validationArgument,
        message: errorMessage + JSON.stringify(validationArgument)
    });
    return result;
};
/**
 * Validates divisibleBy when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.multipleOf = function validateMultipleOf(instance, schema, options, ctx) {
    return validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "multipleOf", "is not a multiple of (divisible by) ");
};
/**
 * Validates multipleOf when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.divisibleBy = function validateDivisibleBy(instance, schema, options, ctx) {
    return validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "divisibleBy", "is not divisible by (multiple of) ");
};
/**
 * Validates whether the instance value is present.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.required = function validateRequired(instance, schema, options, ctx) {
    var result = new ValidatorResult(instance, schema, options, ctx);
    if (instance === undefined && schema.required === true) // A boolean form is implemented for reverse-compatibility with schemas written against older drafts
    result.addError({
        name: 'required',
        message: "is required"
    });
    else if (this.types.object(instance) && Array.isArray(schema.required)) schema.required.forEach(function(n) {
        if (getEnumerableProperty(instance, n) === undefined) result.addError({
            name: 'required',
            argument: n,
            message: "requires property " + JSON.stringify(n)
        });
    });
    return result;
};
/**
 * Validates whether the instance value matches the regular expression, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.pattern = function validatePattern(instance, schema, options, ctx) {
    if (!this.types.string(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var pattern = schema.pattern;
    try {
        var regexp = new RegExp(pattern, 'u');
    } catch (_e) {
        // In the event the stricter handling causes an error, fall back on the forgiving handling
        // DEPRECATED
        regexp = new RegExp(pattern);
    }
    if (!instance.match(regexp)) result.addError({
        name: 'pattern',
        argument: schema.pattern,
        message: "does not match pattern " + JSON.stringify(schema.pattern.toString())
    });
    return result;
};
/**
 * Validates whether the instance value is of a certain defined format or a custom
 * format.
 * The following formats are supported for string types:
 *   - date-time
 *   - date
 *   - time
 *   - ip-address
 *   - ipv6
 *   - uri
 *   - color
 *   - host-name
 *   - alpha
 *   - alpha-numeric
 *   - utc-millisec
 * @param instance
 * @param schema
 * @param [options]
 * @param [ctx]
 * @return {String|null}
 */ validators.format = function validateFormat(instance, schema, options, ctx) {
    if (instance === undefined) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    if (!result.disableFormat && !helpers.isFormat(instance, schema.format, this)) result.addError({
        name: 'format',
        argument: schema.format,
        message: "does not conform to the " + JSON.stringify(schema.format) + " format"
    });
    return result;
};
/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.minLength = function validateMinLength(instance, schema, options, ctx) {
    if (!this.types.string(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var hsp = instance.match(/[\uDC00-\uDFFF]/g);
    var length = instance.length - (hsp ? hsp.length : 0);
    if (!(length >= schema.minLength)) result.addError({
        name: 'minLength',
        argument: schema.minLength,
        message: "does not meet minimum length of " + schema.minLength
    });
    return result;
};
/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.maxLength = function validateMaxLength(instance, schema, options, ctx) {
    if (!this.types.string(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    // TODO if this was already computed in "minLength", use that value instead of re-computing
    var hsp = instance.match(/[\uDC00-\uDFFF]/g);
    var length = instance.length - (hsp ? hsp.length : 0);
    if (!(length <= schema.maxLength)) result.addError({
        name: 'maxLength',
        argument: schema.maxLength,
        message: "does not meet maximum length of " + schema.maxLength
    });
    return result;
};
/**
 * Validates whether instance contains at least a minimum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.minItems = function validateMinItems(instance, schema, options, ctx) {
    if (!this.types.array(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    if (!(instance.length >= schema.minItems)) result.addError({
        name: 'minItems',
        argument: schema.minItems,
        message: "does not meet minimum length of " + schema.minItems
    });
    return result;
};
/**
 * Validates whether instance contains no more than a maximum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */ validators.maxItems = function validateMaxItems(instance, schema, options, ctx) {
    if (!this.types.array(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    if (!(instance.length <= schema.maxItems)) result.addError({
        name: 'maxItems',
        argument: schema.maxItems,
        message: "does not meet maximum length of " + schema.maxItems
    });
    return result;
};
/**
 * Deep compares arrays for duplicates
 * @param v
 * @param i
 * @param a
 * @private
 * @return {boolean}
 */ function testArrays(v, i, a) {
    var j, len = a.length;
    for(j = i + 1; j < len; j++){
        if (helpers.deepCompareStrict(v, a[j])) return false;
    }
    return true;
}
/**
 * Validates whether there are no duplicates, when the instance is an Array.
 * @param instance
 * @return {String|null}
 */ validators.uniqueItems = function validateUniqueItems(instance, schema, options, ctx) {
    if (schema.uniqueItems !== true) return;
    if (!this.types.array(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    if (!instance.every(testArrays)) result.addError({
        name: 'uniqueItems',
        message: "contains duplicate item"
    });
    return result;
};
/**
 * Validate for the presence of dependency properties, if the instance is an object.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */ validators.dependencies = function validateDependencies(instance, schema, options, ctx) {
    if (!this.types.object(instance)) return;
    var result = new ValidatorResult(instance, schema, options, ctx);
    for(var property in schema.dependencies){
        if (instance[property] === undefined) continue;
        var dep = schema.dependencies[property];
        var childContext = ctx.makeChild(dep, property);
        if (typeof dep == 'string') dep = [
            dep
        ];
        if (Array.isArray(dep)) dep.forEach(function(prop) {
            if (instance[prop] === undefined) result.addError({
                // FIXME there's two different "dependencies" errors here with slightly different outputs
                // Can we make these the same? Or should we create different error types?
                name: 'dependencies',
                argument: childContext.propertyPath,
                message: "property " + prop + " not found, required by " + childContext.propertyPath
            });
        });
        else {
            var res = this.validateSchema(instance, dep, options, childContext);
            if (result.instance !== res.instance) result.instance = res.instance;
            if (res && res.errors.length) {
                result.addError({
                    name: 'dependencies',
                    argument: childContext.propertyPath,
                    message: "does not meet dependency required by " + childContext.propertyPath
                });
                result.importErrors(res);
            }
        }
    }
    return result;
};
/**
 * Validates whether the instance value is one of the enumerated values.
 *
 * @param instance
 * @param schema
 * @return {ValidatorResult|null}
 */ validators['enum'] = function validateEnum(instance, schema, options, ctx) {
    if (instance === undefined) return null;
    if (!Array.isArray(schema['enum'])) throw new SchemaError("enum expects an array", schema);
    var result = new ValidatorResult(instance, schema, options, ctx);
    if (!schema['enum'].some(helpers.deepCompareStrict.bind(null, instance))) result.addError({
        name: 'enum',
        argument: schema['enum'],
        message: "is not one of enum values: " + schema['enum'].map(String).join(',')
    });
    return result;
};
/**
 * Validates whether the instance exactly matches a given value
 *
 * @param instance
 * @param schema
 * @return {ValidatorResult|null}
 */ validators['const'] = function validateEnum(instance, schema, options, ctx) {
    if (instance === undefined) return null;
    var result = new ValidatorResult(instance, schema, options, ctx);
    if (!helpers.deepCompareStrict(schema['const'], instance)) result.addError({
        name: 'const',
        argument: schema['const'],
        message: "does not exactly match expected constant: " + schema['const']
    });
    return result;
};
/**
 * Validates whether the instance if of a prohibited type.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */ validators.not = validators.disallow = function validateNot(instance, schema, options, ctx) {
    var self = this;
    if (instance === undefined) return null;
    var result = new ValidatorResult(instance, schema, options, ctx);
    var notTypes = schema.not || schema.disallow;
    if (!notTypes) return null;
    if (!Array.isArray(notTypes)) notTypes = [
        notTypes
    ];
    notTypes.forEach(function(type) {
        if (self.testType(instance, schema, options, ctx, type)) {
            var id = type && (type.$id || type.id);
            var schemaId = id || type;
            result.addError({
                name: 'not',
                argument: schemaId,
                message: "is of prohibited type " + schemaId
            });
        }
    });
    return result;
};
module.exports = attribute;

},{"./helpers":"5kpID"}],"5kpID":[function(require,module,exports) {
'use strict';
var uri = require('url');
var ValidationError = exports.ValidationError = function ValidationError(message, instance, schema, path, name, argument) {
    if (Array.isArray(path)) {
        this.path = path;
        this.property = path.reduce(function(sum, item) {
            return sum + makeSuffix(item);
        }, 'instance');
    } else if (path !== undefined) this.property = path;
    if (message) this.message = message;
    if (schema) {
        var id = schema.$id || schema.id;
        this.schema = id || schema;
    }
    if (instance !== undefined) this.instance = instance;
    this.name = name;
    this.argument = argument;
    this.stack = this.toString();
};
ValidationError.prototype.toString = function toString() {
    return this.property + ' ' + this.message;
};
var ValidatorResult = exports.ValidatorResult = function ValidatorResult(instance, schema, options, ctx) {
    this.instance = instance;
    this.schema = schema;
    this.options = options;
    this.path = ctx.path;
    this.propertyPath = ctx.propertyPath;
    this.errors = [];
    this.throwError = options && options.throwError;
    this.throwFirst = options && options.throwFirst;
    this.throwAll = options && options.throwAll;
    this.disableFormat = options && options.disableFormat === true;
};
ValidatorResult.prototype.addError = function addError(detail) {
    var err;
    if (typeof detail == 'string') err = new ValidationError(detail, this.instance, this.schema, this.path);
    else {
        if (!detail) throw new Error('Missing error detail');
        if (!detail.message) throw new Error('Missing error message');
        if (!detail.name) throw new Error('Missing validator type');
        err = new ValidationError(detail.message, this.instance, this.schema, this.path, detail.name, detail.argument);
    }
    this.errors.push(err);
    if (this.throwFirst) throw new ValidatorResultError(this);
    else if (this.throwError) throw err;
    return err;
};
ValidatorResult.prototype.importErrors = function importErrors(res) {
    if (typeof res == 'string' || res && res.validatorType) this.addError(res);
    else if (res && res.errors) Array.prototype.push.apply(this.errors, res.errors);
};
function stringizer(v, i) {
    return i + ': ' + v.toString() + '\n';
}
ValidatorResult.prototype.toString = function toString(res) {
    return this.errors.map(stringizer).join('');
};
Object.defineProperty(ValidatorResult.prototype, "valid", {
    get: function() {
        return !this.errors.length;
    }
});
module.exports.ValidatorResultError = ValidatorResultError;
function ValidatorResultError(result) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, ValidatorResultError);
    this.instance = result.instance;
    this.schema = result.schema;
    this.options = result.options;
    this.errors = result.errors;
}
ValidatorResultError.prototype = new Error();
ValidatorResultError.prototype.constructor = ValidatorResultError;
ValidatorResultError.prototype.name = "Validation Error";
/**
 * Describes a problem with a Schema which prevents validation of an instance
 * @name SchemaError
 * @constructor
 */ var SchemaError = exports.SchemaError = function SchemaError1(msg, schema) {
    this.message = msg;
    this.schema = schema;
    Error.call(this, msg);
    Error.captureStackTrace(this, SchemaError1);
};
SchemaError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: SchemaError,
        enumerable: false
    },
    name: {
        value: 'SchemaError',
        enumerable: false
    }
});
var SchemaContext = exports.SchemaContext = function SchemaContext(schema, options, path, base, schemas) {
    this.schema = schema;
    this.options = options;
    if (Array.isArray(path)) {
        this.path = path;
        this.propertyPath = path.reduce(function(sum, item) {
            return sum + makeSuffix(item);
        }, 'instance');
    } else this.propertyPath = path;
    this.base = base;
    this.schemas = schemas;
};
SchemaContext.prototype.resolve = function resolve(target) {
    return uri.resolve(this.base, target);
};
SchemaContext.prototype.makeChild = function makeChild(schema, propertyName) {
    var path = propertyName === undefined ? this.path : this.path.concat([
        propertyName
    ]);
    var id = schema.$id || schema.id;
    var base = uri.resolve(this.base, id || '');
    var ctx = new SchemaContext(schema, this.options, path, base, Object.create(this.schemas));
    if (id && !ctx.schemas[base]) ctx.schemas[base] = schema;
    return ctx;
};
var FORMAT_REGEXPS = exports.FORMAT_REGEXPS = {
    'date-time': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
    'date': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
    'time': /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,
    'email': /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
    'ip-address': /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    'ipv6': /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
    // TODO: A more accurate regular expression for "uri" goes:
    // [A-Za-z][+\-.0-9A-Za-z]*:((/(/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?)?#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(/(/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])|/?%[0-9A-Fa-f]{2}|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*(#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?|/(/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)?)?
    'uri': /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,
    'uri-reference': /^(((([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:?)?)|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?))#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(([A-Za-z][+\-.0-9A-Za-z]*)?%[0-9A-Fa-f]{2}|[!$&-.0-9;=@_~]|[A-Za-z][+\-.0-9A-Za-z]*[!$&-*,;=@_~])(%[0-9A-Fa-f]{2}|[!$&-.0-9;=@-Z_a-z~])*((([/?](%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?#|[/?])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?|([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)?|[A-Za-z][+\-.0-9A-Za-z]*:?)?$/,
    'color': /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
    // hostname regex from: http://stackoverflow.com/a/1420225/5628
    'hostname': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
    'host-name': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
    'alpha': /^[a-zA-Z]+$/,
    'alphanumeric': /^[a-zA-Z0-9]+$/,
    'utc-millisec': function(input) {
        return typeof input === 'string' && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
    },
    'regex': function(input) {
        var result = true;
        try {
            new RegExp(input);
        } catch (e) {
            result = false;
        }
        return result;
    },
    'style': /\s*(.+?):\s*([^;]+);?/,
    'phone': /^\+(?:[0-9] ?){6,14}[0-9]$/
};
FORMAT_REGEXPS.regexp = FORMAT_REGEXPS.regex;
FORMAT_REGEXPS.pattern = FORMAT_REGEXPS.regex;
FORMAT_REGEXPS.ipv4 = FORMAT_REGEXPS['ip-address'];
exports.isFormat = function isFormat(input, format, validator) {
    if (typeof input === 'string' && FORMAT_REGEXPS[format] !== undefined) {
        if (FORMAT_REGEXPS[format] instanceof RegExp) return FORMAT_REGEXPS[format].test(input);
        if (typeof FORMAT_REGEXPS[format] === 'function') return FORMAT_REGEXPS[format](input);
    } else if (validator && validator.customFormats && typeof validator.customFormats[format] === 'function') return validator.customFormats[format](input);
    return true;
};
var makeSuffix = exports.makeSuffix = function makeSuffix(key) {
    key = key.toString();
    // This function could be capable of outputting valid a ECMAScript string, but the
    // resulting code for testing which form to use would be tens of thousands of characters long
    // That means this will use the name form for some illegal forms
    if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) return '.' + key;
    if (key.match(/^\d+$/)) return '[' + key + ']';
    return '[' + JSON.stringify(key) + ']';
};
exports.deepCompareStrict = function deepCompareStrict(a, b) {
    if (typeof a !== typeof b) return false;
    if (Array.isArray(a)) {
        if (!Array.isArray(b)) return false;
        if (a.length !== b.length) return false;
        return a.every(function(v, i) {
            return deepCompareStrict(a[i], b[i]);
        });
    }
    if (typeof a === 'object') {
        if (!a || !b) return a === b;
        var aKeys = Object.keys(a);
        var bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        return aKeys.every(function(v) {
            return deepCompareStrict(a[v], b[v]);
        });
    }
    return a === b;
};
function deepMerger(target, dst, e, i) {
    if (typeof e === 'object') dst[i] = deepMerge(target[i], e);
    else if (target.indexOf(e) === -1) dst.push(e);
}
function copyist(src, dst, key) {
    dst[key] = src[key];
}
function copyistWithDeepMerge(target, src, dst, key) {
    if (typeof src[key] !== 'object' || !src[key]) dst[key] = src[key];
    else if (!target[key]) dst[key] = src[key];
    else dst[key] = deepMerge(target[key], src[key]);
}
function deepMerge(target, src) {
    var array = Array.isArray(src);
    var dst = array && [] || {
    };
    if (array) {
        target = target || [];
        dst = dst.concat(target);
        src.forEach(deepMerger.bind(null, target, dst));
    } else {
        if (target && typeof target === 'object') Object.keys(target).forEach(copyist.bind(null, target, dst));
        Object.keys(src).forEach(copyistWithDeepMerge.bind(null, target, src, dst));
    }
    return dst;
}
module.exports.deepMerge = deepMerge;
/**
 * Validates instance against the provided schema
 * Implements URI+JSON Pointer encoding, e.g. "%7e"="~0"=>"~", "~1"="%2f"=>"/"
 * @param o
 * @param s The path to walk o along
 * @return any
 */ exports.objectGetPath = function objectGetPath(o, s) {
    var parts = s.split('/').slice(1);
    var k;
    while(typeof (k = parts.shift()) == 'string'){
        var n = decodeURIComponent(k.replace(/~0/, '~').replace(/~1/g, '/'));
        if (!(n in o)) return;
        o = o[n];
    }
    return o;
};
function pathEncoder(v) {
    return '/' + encodeURIComponent(v).replace(/~/g, '%7E');
}
/**
 * Accept an Array of property names and return a JSON Pointer URI fragment
 * @param Array a
 * @return {String}
 */ exports.encodePath = function encodePointer(a) {
    // ~ must be encoded explicitly because hacks
    // the slash is encoded by encodeURIComponent
    return a.map(pathEncoder).join('');
};
/**
 * Calculate the number of decimal places a number uses
 * We need this to get correct results out of multipleOf and divisibleBy
 * when either figure is has decimal places, due to IEEE-754 float issues.
 * @param number
 * @returns {number}
 */ exports.getDecimalPlaces = function getDecimalPlaces(number) {
    var decimalPlaces = 0;
    if (isNaN(number)) return decimalPlaces;
    if (typeof number !== 'number') number = Number(number);
    var parts = number.toString().split('e');
    if (parts.length === 2) {
        if (parts[1][0] !== '-') return decimalPlaces;
        else decimalPlaces = Number(parts[1].slice(1));
    }
    var decimalParts = parts[0].split('.');
    if (decimalParts.length === 2) decimalPlaces += decimalParts[1].length;
    return decimalPlaces;
};
exports.isSchema = function isSchema(val) {
    return typeof val === 'object' && val || typeof val === 'boolean';
};

},{"url":"7qjc7"}],"bHmlS":[function(require,module,exports) {
"use strict";
var urilib = require('url');
var helpers = require('./helpers');
module.exports.SchemaScanResult = SchemaScanResult;
function SchemaScanResult(found, ref) {
    this.id = found;
    this.ref = ref;
}
/**
 * Adds a schema with a certain urn to the Validator instance.
 * @param string uri
 * @param object schema
 * @return {Object}
 */ module.exports.scan = function scan(base, schema1) {
    function scanSchema(baseuri, schema) {
        if (!schema || typeof schema != 'object') return;
        // Mark all referenced schemas so we can tell later which schemas are referred to, but never defined
        if (schema.$ref) {
            var resolvedUri = urilib.resolve(baseuri, schema.$ref);
            ref[resolvedUri] = ref[resolvedUri] ? ref[resolvedUri] + 1 : 0;
            return;
        }
        var id = schema.$id || schema.id;
        var ourBase = id ? urilib.resolve(baseuri, id) : baseuri;
        if (ourBase) {
            // If there's no fragment, append an empty one
            if (ourBase.indexOf('#') < 0) ourBase += '#';
            if (found[ourBase]) {
                if (!helpers.deepCompareStrict(found[ourBase], schema)) throw new Error('Schema <' + ourBase + '> already exists with different definition');
                return found[ourBase];
            }
            found[ourBase] = schema;
            // strip trailing fragment
            if (ourBase[ourBase.length - 1] == '#') found[ourBase.substring(0, ourBase.length - 1)] = schema;
        }
        scanArray(ourBase + '/items', Array.isArray(schema.items) ? schema.items : [
            schema.items
        ]);
        scanArray(ourBase + '/extends', Array.isArray(schema.extends) ? schema.extends : [
            schema.extends
        ]);
        scanSchema(ourBase + '/additionalItems', schema.additionalItems);
        scanObject(ourBase + '/properties', schema.properties);
        scanSchema(ourBase + '/additionalProperties', schema.additionalProperties);
        scanObject(ourBase + '/definitions', schema.definitions);
        scanObject(ourBase + '/patternProperties', schema.patternProperties);
        scanObject(ourBase + '/dependencies', schema.dependencies);
        scanArray(ourBase + '/disallow', schema.disallow);
        scanArray(ourBase + '/allOf', schema.allOf);
        scanArray(ourBase + '/anyOf', schema.anyOf);
        scanArray(ourBase + '/oneOf', schema.oneOf);
        scanSchema(ourBase + '/not', schema.not);
    }
    function scanArray(baseuri, schemas) {
        if (!Array.isArray(schemas)) return;
        for(var i = 0; i < schemas.length; i++)scanSchema(baseuri + '/' + i, schemas[i]);
    }
    function scanObject(baseuri, schemas) {
        if (!schemas || typeof schemas != 'object') return;
        for(var p in schemas)scanSchema(baseuri + '/' + p, schemas[p]);
    }
    var found = {
    };
    var ref = {
    };
    scanSchema(base, schema1);
    return new SchemaScanResult(found, ref);
};

},{"url":"7qjc7","./helpers":"5kpID"}],"dv2dO":[function(require,module,exports) {
module.exports = JSON.parse("{\"schema\":\"https://json-schema.org/draft/2020-12/schema\",\"id\":\"/visualization\",\"title\":\"Visualization\",\"description\":\"A webgl visualization made of a sequence of tracks\",\"type\":\"object\",\"required\":[\"tracks\"],\"properties\":{\"labels\":{\"description\":\"set of labels to display on visualization, properties of labels can be any valid attribute for an svg text element\",\"examples\":[{\"x\":100,\"y\":200,\"text\":\"my favorite data point\",\"rotate\":-90},{\"x\":-1.1,\"y\":0,\"text\":\"Track 1\",\"color\":\"red\",\"fixedX\":true}],\"type\":\"array\",\"items\":{\"properties\":{\"x\":{\"description\":\"x coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if x dimension is categorical or genomic\",\"type\":\"number\"},\"y\":{\"description\":\"y coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if y dimension is categorical or genomic\",\"type\":\"number\"},\"fixedX\":{\"description\":\"fix the x coordinate of the label, so it does not move when panning/zooming left or right\",\"type\":\"boolean\"},\"fixedY\":{\"description\":\"fix the y coordinate of the label, so it does not move when panning/zooming up or down\",\"type\":\"boolean\"},\"required\":[\"x\",\"y\"]}}},\"xAxis\":{\"description\":\"location of x-axis\",\"enum\":[\"bottom\",\"top\",\"center\",\"none\",\"zero\"]},\"yAxis\":{\"description\":\"location of y-axis\",\"enum\":[\"left\",\"right\",\"center\",\"none\",\"zero\"]},\"tracks\":{\"description\":\"A track is a map from the data to a sequence of marks\",\"type\":\"array\",\"items\":{\"$ref\":\"/track\"}},\"defaultData\":{\"description\":\"A string of a csv href containing data or an object of inline data where each key is a column of values\",\"examples\":[\"http://example.com/data.csv\",{\"day\":[1,2],\"price\":[10,20]}],\"type\":[\"string\",\"object\"],\"additionalProperties\":true,\"minProperties\":1},\"width\":{\"description\":\"Width of the visualization in css units\",\"examples\":[\"400px\",\"100%\",\"10em\",\"600\"],\"type\":\"string\"},\"height\":{\"description\":\"Height of the visualization in css units\",\"examples\":[\"400px\",\"100%\",\"10em\",\"600\"],\"type\":\"string\"},\"margins\":{\"description\":\"Margins for the visualization; gives more space for labels and axis to render\",\"properties\":{\"top\":{\"description\":\"Top margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]},\"bottom\":{\"description\":\"Bottom margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]},\"left\":{\"description\":\"Left margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]},\"right\":{\"description\":\"Right margin of the visualization in css units\",\"type\":\"string\",\"examples\":[\"100px\",\"5%\",\"5em\"]}}}},\"allOf\":[{\"description\":\"if there is no default data for the visualization require each track to have data property\",\"if\":{\"not\":{\"required\":[\"defaultData\"]}},\"then\":{\"properties\":{\"tracks\":{\"items\":{\"required\":[\"data\"]}}}},\"else\":{}}]}");

},{}],"gGG5W":[function(require,module,exports) {
module.exports = JSON.parse("{\"schema\":\"https://json-schema.org/draft/2020-12/schema\",\"id\":\"/track\",\"title\":\"Track\",\"description\":\"A track to visualize\",\"type\":\"object\",\"required\":[\"mark\",\"x\",\"y\"],\"properties\":{\"data\":{\"description\":\"A string of a csv href containing data or an object of inline data where each key is an array of a data column\",\"type\":[\"string\",\"object\"],\"additionalProperties\":{\"type\":\"array\"},\"minProperties\":1},\"mark\":{\"description\":\"type of mark to visualize\",\"enum\":[\"point\",\"line\",\"area\",\"rect\",\"tick\",\"arc\"]},\"tooltips\":{\"description\":\"a number between 0 and 1 where 0 is no tooltips, 1 is always show, and, for example, 0.1 would be show tooltips when zoomed in to 10% of the domain\",\"type\":\"number\",\"minimum\":0,\"maximum\":1},\"x\":{\"description\":\"define the x coordinates of the marks\",\"type\":\"object\",\"allOf\":[{\"$ref\":\"/channel\"}],\"examples\":[{\"type\":\"genomic\",\"chrAttribute\":\"chr\",\"geneAttribute\":\"gene\",\"domain\":[\"chr2:100\",\"chr2:300\"]}]},\"y\":{\"description\":\"define the y coordinates of the marks\",\"type\":\"object\",\"allOf\":[{\"$ref\":\"/channel\"}],\"examples\":[{\"type\":\"quantitative\",\"attribute\":\"time\",\"domain\":[0,10]},{\"attribute\":\"sample\",\"type\":\"categorical\",\"cardinality\":10}]},\"color\":{\"description\":\"define the color of the marks, for fixed values can be any css3 color descriptor or a number that translates to a color in hex\",\"type\":\"object\",\"properties\":{\"colorScheme\":{\"description\":\"d3 continuous color scheme to use, see d3-scale-chromatic for options\",\"examples\":[\"interpolateBlues\",\"interpolateReds\",\"interpolateRainbow\"],\"type\":\"string\"}},\"examples\":[{\"value\":\"red\"},{\"value\":16581375},{\"attribute\":\"sample\",\"type\":\"categorical\",\"cardinality\":10,\"colorScheme\":\"interpolateBuGn\"}],\"allOf\":[{\"$ref\":\"/channel\"}]},\"size\":{\"description\":\"size of the mark, used only when mark type is point, use width or height for other mark types. The units of this channel correspond to 1/200th of the canvas e.g. a size of 100 is half the canvas.\",\"type\":\"object\",\"properties\":{\"maxSize\":{\"type\":\"number\"},\"minSize\":{\"type\":\"number\"},\"value\":{\"type\":\"number\"}},\"examples\":[{\"attribute\":\"population\",\"type\":\"quantitative\",\"domain\":[0,1000],\"maxSize\":10,\"minSize\":1}],\"allOf\":[{\"$ref\":\"/channel\"}]},\"width\":{\"description\":\"width of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the width of the canvas. This channel may be a genomic range type for arc tracks. If both height and width are specified for a tick mark, only width is used.\",\"type\":\"object\",\"properties\":{\"maxWidth\":{\"type\":\"number\"},\"minWidth\":{\"type\":\"number\"},\"value\":{\"type\":\"number\"}},\"allOf\":[{\"$ref\":\"/channel\"}]},\"height\":{\"description\":\"height of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the height of the canvas. This channel may be a genomic range type for arc tracks.\",\"type\":\"object\",\"properties\":{\"maxHeight\":{\"type\":\"number\"},\"minHeight\":{\"type\":\"number\"},\"value\":{\"type\":\"number\"}},\"allOf\":[{\"$ref\":\"/channel\"}]},\"opacity\":{\"description\":\"opacity of the mark, compatible with all mark types\",\"type\":\"object\",\"properties\":{\"minOpacity\":{\"type\":\"number\",\"minimum\":0,\"exclusiveMaximum\":1},\"value\":{\"type\":\"number\"}},\"allOf\":[{\"$ref\":\"/channel\"}]},\"shape\":{\"description\":\"shape of the mark, used only for point marks\",\"type\":\"object\",\"properties\":{\"value\":{\"enum\":[\"dot\",\"circle\",\"diamond\",\"triangle\"]}},\"allOf\":[{\"$ref\":\"/channel\"}]}}}");

},{}],"gGfj1":[function(require,module,exports) {
module.exports = JSON.parse("{\"schema\":\"https://json-schema.org/draft/2020-12/schema\",\"id\":\"/channel\",\"title\":\"Channel\",\"description\":\"A channel of a visualization\",\"type\":\"object\",\"properties\":{\"type\":{\"description\":\"type of attribute, genomic range only compatible with x, y, width and height\",\"enum\":[\"quantitative\",\"categorical\",\"genomic\",\"genomicRange\",\"inline\"]},\"attribute\":{\"description\":\"column of data frame to use for mapping channel\",\"type\":\"string\"},\"value\":{\"description\":\"if fixing a channel, specify with value\",\"type\":[\"string\",\"number\",\"boolean\"]},\"domain\":{\"description\":\"domain of attribute to use for mapping, required if type is quantitative\",\"type\":\"array\"},\"cardinality\":{\"description\":\"number of attribute values to use for mapping, required if type is categorical\",\"type\":\"integer\"},\"chrAttribute\":{\"description\":\"if type is genomic or genomicRange, the attribute that contains the chromosome id\",\"type\":\"string\"},\"startAttribute\":{\"description\":\"if type is genomicRange, the attribute that contains the start of the range\",\"type\":\"string\"},\"endAttribute\":{\"description\":\"if type is genomicRange, the attribute that contains the end of the range\",\"type\":\"string\"},\"genome\":{\"description\":\"genome being mapped\",\"enum\":[\"hg38\",\"hg19\",\"mm39\"]}},\"allOf\":[{\"description\":\"If type is genomic, require genomic attributes and forbid regular attributes\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"genomic\"}},\"required\":[\"type\"]}},{\"required\":[\"chrAttribute\",\"geneAttribute\",\"genome\"],\"not\":{\"required\":[\"attribute\",\"startAttribute\",\"endAttribute\"]},\"properties\":{\"domain\":{\"items\":[{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"},{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"}]}}}]},{\"description\":\"If type is genomicRange, require genomicRange attributes and forbid regular attribute\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"genomicRange\"}},\"required\":[\"type\"]}},{\"required\":[\"chrAttribute\",\"startAttribute\",\"endAttribute\",\"genome\"],\"not\":{\"required\":[\"attribute\",\"geneAttribute\"]},\"properties\":{\"domain\":{\"items\":[{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"},{\"type\":\"string\",\"pattern\":\"chr(\\\\d{1,2}|[XY]):\\\\d+\"}]}}}]},{\"description\":\"If type is quantitative, require domain and forbid cardinality\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"quantitative\"}},\"required\":[\"type\"]}},{\"required\":[\"domain\"],\"properties\":{\"domain\":{\"items\":[{\"type\":\"number\"},{\"type\":\"number\"}]}},\"not\":{\"required\":[\"cardinality\"]}}]},{\"description\":\"If type is categorical, require cardinality and forbid domain\",\"anyOf\":[{\"not\":{\"properties\":{\"type\":{\"const\":\"categorical\"}},\"required\":[\"type\"]}},{\"required\":[\"cardinality\"],\"not\":{\"required\":[\"domain\"]}}]},{\"description\":\"If value is defined, disallow other attributes\",\"anyOf\":[{\"not\":{\"properties\":{\"value\":{\"not\":{\"type\":\"null\"}}},\"required\":[\"value\"]}},{\"allOf\":[{\"not\":{\"required\":[\"attribute\"]}},{\"not\":{\"required\":[\"type\"]}},{\"not\":{\"required\":[\"domain\"]}},{\"not\":{\"required\":[\"cardinality\"]}}]}]},{\"description\":\"If value is not defined, require attribute or genomic attributes\",\"anyOf\":[{\"not\":{\"properties\":{\"value\":{\"type\":\"null\"}}}},{\"oneOf\":[{\"required\":[\"attribute\"]},{\"required\":[\"chrAttribute\",\"genome\"]}]}]}]}");

},{}],"90xhh":[function(require,module,exports) {
let workerURL = require('./helpers/get-worker-url');
let bundleURL = require('./helpers/bundle-url');
let url = bundleURL.getBundleURL('fZrfd') + "offscreen-webgl-worker.93069879.js" + "?" + Date.now();
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"./helpers/get-worker-url":"cn2gM","./helpers/bundle-url":"lgJ39"}],"cn2gM":[function(require,module,exports) {
"use strict";
module.exports = function(workerUrl, origin, isESM) {
    if (origin === self.location.origin) // If the worker bundle's url is on the same origin as the document,
    // use the worker bundle's own url.
    return workerUrl;
    else {
        // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.
        var source = isESM ? 'import ' + JSON.stringify(workerUrl) + ';' : 'importScripts(' + JSON.stringify(workerUrl) + ');';
        return URL.createObjectURL(new Blob([
            source
        ], {
            type: 'application/javascript'
        }));
    }
};

},{}],"jHhP4":[function(require,module,exports) {
let workerURL = require('./helpers/get-worker-url');
let bundleURL = require('./helpers/bundle-url');
let url = bundleURL.getBundleURL('fZrfd') + "data-processor-worker.2a6946c0.js" + "?" + Date.now();
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"./helpers/get-worker-url":"cn2gM","./helpers/bundle-url":"lgJ39"}],"6khvc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getIfChanged", ()=>getIfChanged
);
var _toolkit = require("@reduxjs/toolkit");
var _reducers = require("./reducers");
var _reducersDefault = parcelHelpers.interopDefault(_reducers);
const store = _toolkit.configureStore({
    reducer: _reducersDefault.default
});
let previousValues = {
};
/**
 * This utility method is meant to check if a part of the state in the global
 * store has changed since it was last called. It is useful in a store subscription
 * for updating components. Typically this would be done automatically by
 * react-redux or something else, but we do it ourselves. The main purpose is to
 * keep the redux pattern of only calling dispatch throughout the application,
 * and calling getState inside subscriptions only.
 *
 * @param {String} key of the state from the store
 * @returns null if value at key has not changed, the new value otherwise
 */ const getIfChanged = (key)=>{
    const currValue = store.getState()[key];
    if (key in previousValues) {
        if (previousValues[key] === currValue) return null;
        else previousValues[key] = currValue;
        return store.getState()[key];
    } else previousValues[key] = currValue;
};
exports.default = store;

},{"@reduxjs/toolkit":"lL1Ef","./reducers":"2CYeh","@parcel/transformer-js/src/esmodule-helpers.js":"9FYyo"}]},["6pGph","2nuXh"], "2nuXh", "parcelRequire9975")

//# sourceMappingURL=index.66944471.js.map
