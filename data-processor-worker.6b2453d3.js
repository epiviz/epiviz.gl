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
})({"../../node_modules/kdbush/src/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortKD;

function sortKD(ids, coords, nodeSize, left, right, depth) {
  if (right - left <= nodeSize) return;
  const m = left + right >> 1;
  select(ids, coords, m, left, right, depth % 2);
  sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
  sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}

function select(ids, coords, k, left, right, inc) {
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      select(ids, coords, k, newLeft, newRight, inc);
    }

    const t = coords[2 * k + inc];
    let i = left;
    let j = right;
    swapItem(ids, coords, left, k);
    if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);

    while (i < j) {
      swapItem(ids, coords, i, j);
      i++;
      j--;

      while (coords[2 * i + inc] < t) i++;

      while (coords[2 * j + inc] > t) j--;
    }

    if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);else {
      j++;
      swapItem(ids, coords, j, right);
    }
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
}

function swapItem(ids, coords, i, j) {
  swap(ids, i, j);
  swap(coords, 2 * i, 2 * j);
  swap(coords, 2 * i + 1, 2 * j + 1);
}

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
},{}],"../../node_modules/kdbush/src/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;

function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
  const stack = [0, ids.length - 1, 0];
  const result = [];
  let x, y;

  while (stack.length) {
    const axis = stack.pop();
    const right = stack.pop();
    const left = stack.pop();

    if (right - left <= nodeSize) {
      for (let i = left; i <= right; i++) {
        x = coords[2 * i];
        y = coords[2 * i + 1];
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
      }

      continue;
    }

    const m = Math.floor((left + right) / 2);
    x = coords[2 * m];
    y = coords[2 * m + 1];
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
    const nextAxis = (axis + 1) % 2;

    if (axis === 0 ? minX <= x : minY <= y) {
      stack.push(left);
      stack.push(m - 1);
      stack.push(nextAxis);
    }

    if (axis === 0 ? maxX >= x : maxY >= y) {
      stack.push(m + 1);
      stack.push(right);
      stack.push(nextAxis);
    }
  }

  return result;
}
},{}],"../../node_modules/kdbush/src/within.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = within;

function within(ids, coords, qx, qy, r, nodeSize) {
  const stack = [0, ids.length - 1, 0];
  const result = [];
  const r2 = r * r;

  while (stack.length) {
    const axis = stack.pop();
    const right = stack.pop();
    const left = stack.pop();

    if (right - left <= nodeSize) {
      for (let i = left; i <= right; i++) {
        if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
      }

      continue;
    }

    const m = Math.floor((left + right) / 2);
    const x = coords[2 * m];
    const y = coords[2 * m + 1];
    if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
    const nextAxis = (axis + 1) % 2;

    if (axis === 0 ? qx - r <= x : qy - r <= y) {
      stack.push(left);
      stack.push(m - 1);
      stack.push(nextAxis);
    }

    if (axis === 0 ? qx + r >= x : qy + r >= y) {
      stack.push(m + 1);
      stack.push(right);
      stack.push(nextAxis);
    }
  }

  return result;
}

function sqDist(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}
},{}],"../../node_modules/kdbush/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sort = _interopRequireDefault(require("./sort"));

var _range = _interopRequireDefault(require("./range"));

var _within = _interopRequireDefault(require("./within"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultGetX = p => p[0];

const defaultGetY = p => p[1];

class KDBush {
  constructor(points, getX = defaultGetX, getY = defaultGetY, nodeSize = 64, ArrayType = Float64Array) {
    this.nodeSize = nodeSize;
    this.points = points;
    const IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;
    const ids = this.ids = new IndexArrayType(points.length);
    const coords = this.coords = new ArrayType(points.length * 2);

    for (let i = 0; i < points.length; i++) {
      ids[i] = i;
      coords[2 * i] = getX(points[i]);
      coords[2 * i + 1] = getY(points[i]);
    }

    (0, _sort.default)(ids, coords, nodeSize, 0, ids.length - 1, 0);
  }

  range(minX, minY, maxX, maxY) {
    return (0, _range.default)(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
  }

  within(x, y, r) {
    return (0, _within.default)(this.ids, this.coords, x, y, r, this.nodeSize);
  }

}

exports.default = KDBush;
},{"./sort":"../../node_modules/kdbush/src/sort.js","./range":"../../node_modules/kdbush/src/range.js","./within":"../../node_modules/kdbush/src/within.js"}],"../../node_modules/supercluster/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _kdbush = _interopRequireDefault(require("kdbush"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultOptions = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: false,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: false,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: props => props // props => ({sum: props.my_value})

};

const fround = Math.fround || (tmp => x => {
  tmp[0] = +x;
  return tmp[0];
})(new Float32Array(1));

class Supercluster {
  constructor(options) {
    this.options = extend(Object.create(defaultOptions), options);
    this.trees = new Array(this.options.maxZoom + 1);
  }

  load(points) {
    const {
      log,
      minZoom,
      maxZoom,
      nodeSize
    } = this.options;
    if (log) console.time('total time');
    const timerId = `prepare ${points.length} points`;
    if (log) console.time(timerId);
    this.points = points; // generate a cluster object for each point and index input points into a KD-tree

    let clusters = [];

    for (let i = 0; i < points.length; i++) {
      if (!points[i].geometry) continue;
      clusters.push(createPointCluster(points[i], i));
    }

    this.trees[maxZoom + 1] = new _kdbush.default(clusters, getX, getY, nodeSize, Float32Array);
    if (log) console.timeEnd(timerId); // cluster points on max zoom, then cluster the results on previous zoom, etc.;
    // results in a cluster hierarchy across zoom levels

    for (let z = maxZoom; z >= minZoom; z--) {
      const now = +Date.now(); // create a new set of clusters for the zoom and index them with a KD-tree

      clusters = this._cluster(clusters, z);
      this.trees[z] = new _kdbush.default(clusters, getX, getY, nodeSize, Float32Array);
      if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
    }

    if (log) console.timeEnd('total time');
    return this;
  }

  getClusters(bbox, zoom) {
    let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
    const minLat = Math.max(-90, Math.min(90, bbox[1]));
    let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
    const maxLat = Math.max(-90, Math.min(90, bbox[3]));

    if (bbox[2] - bbox[0] >= 360) {
      minLng = -180;
      maxLng = 180;
    } else if (minLng > maxLng) {
      const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
      const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
      return easternHem.concat(westernHem);
    }

    const tree = this.trees[this._limitZoom(zoom)];

    const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
    const clusters = [];

    for (const id of ids) {
      const c = tree.points[id];
      clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
    }

    return clusters;
  }

  getChildren(clusterId) {
    const originId = this._getOriginId(clusterId);

    const originZoom = this._getOriginZoom(clusterId);

    const errorMsg = 'No cluster with the specified id.';
    const index = this.trees[originZoom];
    if (!index) throw new Error(errorMsg);
    const origin = index.points[originId];
    if (!origin) throw new Error(errorMsg);
    const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
    const ids = index.within(origin.x, origin.y, r);
    const children = [];

    for (const id of ids) {
      const c = index.points[id];

      if (c.parentId === clusterId) {
        children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
      }
    }

    if (children.length === 0) throw new Error(errorMsg);
    return children;
  }

  getLeaves(clusterId, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;
    const leaves = [];

    this._appendLeaves(leaves, clusterId, limit, offset, 0);

    return leaves;
  }

  getTile(z, x, y) {
    const tree = this.trees[this._limitZoom(z)];

    const z2 = Math.pow(2, z);
    const {
      extent,
      radius
    } = this.options;
    const p = radius / extent;
    const top = (y - p) / z2;
    const bottom = (y + 1 + p) / z2;
    const tile = {
      features: []
    };

    this._addTileFeatures(tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom), tree.points, x, y, z2, tile);

    if (x === 0) {
      this._addTileFeatures(tree.range(1 - p / z2, top, 1, bottom), tree.points, z2, y, z2, tile);
    }

    if (x === z2 - 1) {
      this._addTileFeatures(tree.range(0, top, p / z2, bottom), tree.points, -1, y, z2, tile);
    }

    return tile.features.length ? tile : null;
  }

  getClusterExpansionZoom(clusterId) {
    let expansionZoom = this._getOriginZoom(clusterId) - 1;

    while (expansionZoom <= this.options.maxZoom) {
      const children = this.getChildren(clusterId);
      expansionZoom++;
      if (children.length !== 1) break;
      clusterId = children[0].properties.cluster_id;
    }

    return expansionZoom;
  }

  _appendLeaves(result, clusterId, limit, offset, skipped) {
    const children = this.getChildren(clusterId);

    for (const child of children) {
      const props = child.properties;

      if (props && props.cluster) {
        if (skipped + props.point_count <= offset) {
          // skip the whole cluster
          skipped += props.point_count;
        } else {
          // enter the cluster
          skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped); // exit the cluster
        }
      } else if (skipped < offset) {
        // skip a single point
        skipped++;
      } else {
        // add a single point
        result.push(child);
      }

      if (result.length === limit) break;
    }

    return skipped;
  }

  _addTileFeatures(ids, points, x, y, z2, tile) {
    for (const i of ids) {
      const c = points[i];
      const isCluster = c.numPoints;
      let tags, px, py;

      if (isCluster) {
        tags = getClusterProperties(c);
        px = c.x;
        py = c.y;
      } else {
        const p = this.points[c.index];
        tags = p.properties;
        px = lngX(p.geometry.coordinates[0]);
        py = latY(p.geometry.coordinates[1]);
      }

      const f = {
        type: 1,
        geometry: [[Math.round(this.options.extent * (px * z2 - x)), Math.round(this.options.extent * (py * z2 - y))]],
        tags
      }; // assign id

      let id;

      if (isCluster) {
        id = c.id;
      } else if (this.options.generateId) {
        // optionally generate id
        id = c.index;
      } else if (this.points[c.index].id) {
        // keep id if already assigned
        id = this.points[c.index].id;
      }

      if (id !== undefined) f.id = id;
      tile.features.push(f);
    }
  }

  _limitZoom(z) {
    return Math.max(this.options.minZoom, Math.min(+z, this.options.maxZoom + 1));
  }

  _cluster(points, zoom) {
    const clusters = [];
    const {
      radius,
      extent,
      reduce,
      minPoints
    } = this.options;
    const r = radius / (extent * Math.pow(2, zoom)); // loop through each point

    for (let i = 0; i < points.length; i++) {
      const p = points[i]; // if we've already visited the point at this zoom level, skip it

      if (p.zoom <= zoom) continue;
      p.zoom = zoom; // find all nearby points

      const tree = this.trees[zoom + 1];
      const neighborIds = tree.within(p.x, p.y, r);
      const numPointsOrigin = p.numPoints || 1;
      let numPoints = numPointsOrigin; // count the number of points in a potential cluster

      for (const neighborId of neighborIds) {
        const b = tree.points[neighborId]; // filter out neighbors that are already processed

        if (b.zoom > zoom) numPoints += b.numPoints || 1;
      }

      if (numPoints >= minPoints) {
        // enough points to form a cluster
        let wx = p.x * numPointsOrigin;
        let wy = p.y * numPointsOrigin;
        let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null; // encode both zoom and point index on which the cluster originated -- offset by total length of features

        const id = (i << 5) + (zoom + 1) + this.points.length;

        for (const neighborId of neighborIds) {
          const b = tree.points[neighborId];
          if (b.zoom <= zoom) continue;
          b.zoom = zoom; // save the zoom (so it doesn't get processed twice)

          const numPoints2 = b.numPoints || 1;
          wx += b.x * numPoints2; // accumulate coordinates for calculating weighted center

          wy += b.y * numPoints2;
          b.parentId = id;

          if (reduce) {
            if (!clusterProperties) clusterProperties = this._map(p, true);
            reduce(clusterProperties, this._map(b));
          }
        }

        p.parentId = id;
        clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));
      } else {
        // left points as unclustered
        clusters.push(p);

        if (numPoints > 1) {
          for (const neighborId of neighborIds) {
            const b = tree.points[neighborId];
            if (b.zoom <= zoom) continue;
            b.zoom = zoom;
            clusters.push(b);
          }
        }
      }
    }

    return clusters;
  } // get index of the point from which the cluster originated


  _getOriginId(clusterId) {
    return clusterId - this.points.length >> 5;
  } // get zoom of the point from which the cluster originated


  _getOriginZoom(clusterId) {
    return (clusterId - this.points.length) % 32;
  }

  _map(point, clone) {
    if (point.numPoints) {
      return clone ? extend({}, point.properties) : point.properties;
    }

    const original = this.points[point.index].properties;
    const result = this.options.map(original);
    return clone && result === original ? extend({}, result) : result;
  }

}

exports.default = Supercluster;

function createCluster(x, y, id, numPoints, properties) {
  return {
    x: fround(x),
    // weighted cluster center; round for consistency with Float32Array index
    y: fround(y),
    zoom: Infinity,
    // the last zoom the cluster was processed at
    id,
    // encodes index of the first child of the cluster and its zoom level
    parentId: -1,
    // parent cluster id
    numPoints,
    properties
  };
}

function createPointCluster(p, id) {
  const [x, y] = p.geometry.coordinates;
  return {
    x: fround(lngX(x)),
    // projected point coordinates
    y: fround(latY(y)),
    zoom: Infinity,
    // the last zoom the point was processed at
    index: id,
    // index of the source feature in the original input array,
    parentId: -1 // parent cluster id

  };
}

function getClusterJSON(cluster) {
  return {
    type: 'Feature',
    id: cluster.id,
    properties: getClusterProperties(cluster),
    geometry: {
      type: 'Point',
      coordinates: [xLng(cluster.x), yLat(cluster.y)]
    }
  };
}

function getClusterProperties(cluster) {
  const count = cluster.numPoints;
  const abbrev = count >= 10000 ? `${Math.round(count / 1000)}k` : count >= 1000 ? `${Math.round(count / 100) / 10}k` : count;
  return extend(extend({}, cluster.properties), {
    cluster: true,
    cluster_id: cluster.id,
    point_count: count,
    point_count_abbreviated: abbrev
  });
} // longitude/latitude to spherical mercator in [0..1] range


function lngX(lng) {
  return lng / 360 + 0.5;
}

function latY(lat) {
  const sin = Math.sin(lat * Math.PI / 180);
  const y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
  return y < 0 ? 0 : y > 1 ? 1 : y;
} // spherical mercator to longitude/latitude


function xLng(x) {
  return (x - 0.5) * 360;
}

function yLat(y) {
  const y2 = (180 - y * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}

function extend(dest, src) {
  for (const id in src) dest[id] = src[id];

  return dest;
}

function getX(p) {
  return p.x;
}

function getY(p) {
  return p.y;
}
},{"kdbush":"../../node_modules/kdbush/src/index.js"}],"../scripts/data-processor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _supercluster = _interopRequireDefault(require("supercluster"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataProcessor =
/*#__PURE__*/
function () {
  function DataProcessor(data) {
    var _this = this;

    _classCallCheck(this, DataProcessor);

    this.index = new _supercluster.default();
    this.points = []; // specific to t-SNE

    console.log("Reading data...");
    data.split("\n").forEach(function (line) {
      var parts = line.split(",");
      var x = parseFloat(parts[1]);
      var y = parseFloat(parts[2]);

      if (!parts[0] || isNaN(x) || isNaN(y)) {
        return;
      }

      _this.points.push({
        geometry: {
          coordinates: [x, y],
          sample: parts[0]
        }
      });
    });
    console.log("Indexing data...");
    this.index.load(this.points);
    console.log("Data ready.");
  }

  _createClass(DataProcessor, [{
    key: "selectBox",
    value: function selectBox(points) {
      var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
      var smallerX = Math.min(points[0], points[2]);
      var smallerY = Math.min(points[1], points[3]);
      var largerX = Math.max(points[0], points[2]);
      var largerY = Math.max(points[1], points[3]);
      console.log(this.index.getClusters([smallerX, smallerY, largerX, largerY], zoom));
    }
  }, {
    key: "selectLasso",
    value: function selectLasso(data) {
      var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
    }
  }]);

  return DataProcessor;
}();

var _default = DataProcessor;
exports.default = _default;
},{"supercluster":"../../node_modules/supercluster/index.js"}],"../scripts/data-processor-worker.js":[function(require,module,exports) {
"use strict";

var _dataProcessor = _interopRequireDefault(require("./data-processor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

self.onmessage = function (message) {
  switch (message.data.type) {
    case "init":
      self.processor = new _dataProcessor.default(message.data.data);
      break;

    case "selectBox":
      self.processor.selectBox(message.data.points);
      break;

    case "selectLasso":
      self.processor.selectLasso(message.data);

    default:
      console.error("Received unknown message type: ".concat(e));
  }
};
},{"./data-processor":"../scripts/data-processor.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53693" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../scripts/data-processor-worker.js"], null)
//# sourceMappingURL=/data-processor-worker.6b2453d3.js.map