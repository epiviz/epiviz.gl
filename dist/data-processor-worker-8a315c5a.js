/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./schema-processor-f1eba86e', './utilities-bf9f0c79'], function (schemaProcessor, utilities) { 'use strict';

    function sortKD(ids, coords, nodeSize, left, right, depth) {
        if (right - left <= nodeSize) return;

        const m = (left + right) >> 1;

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

            if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);
            else {
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

            sortKD(ids, coords, nodeSize, 0, ids.length - 1, 0);
        }

        range(minX, minY, maxX, maxY) {
            return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
        }

        within(x, y, r) {
            return within(this.ids, this.coords, x, y, r, this.nodeSize);
        }
    }

    const defaultOptions = {
        minZoom: 0,   // min zoom to generate clusters on
        maxZoom: 16,  // max zoom level to cluster the points on
        minPoints: 2, // minimum points to form a cluster
        radius: 40,   // cluster radius in pixels
        extent: 512,  // tile extent (radius is calculated relative to it)
        nodeSize: 64, // size of the KD-tree leaf node, affects performance
        log: false,   // whether to log timing info

        // whether to generate numeric ids for input features (in vector tiles)
        generateId: false,

        // a reduce function for calculating custom cluster properties
        reduce: null, // (accumulated, props) => { accumulated.sum += props.sum; }

        // properties to use for individual points when running the reducer
        map: props => props // props => ({sum: props.my_value})
    };

    const fround = Math.fround || (tmp => ((x) => { tmp[0] = +x; return tmp[0]; }))(new Float32Array(1));

    class Supercluster {
        constructor(options) {
            this.options = extend(Object.create(defaultOptions), options);
            this.trees = new Array(this.options.maxZoom + 1);
        }

        load(points) {
            const {log, minZoom, maxZoom, nodeSize} = this.options;

            if (log) console.time('total time');

            const timerId = `prepare ${  points.length  } points`;
            if (log) console.time(timerId);

            this.points = points;

            // generate a cluster object for each point and index input points into a KD-tree
            let clusters = [];
            for (let i = 0; i < points.length; i++) {
                if (!points[i].geometry) continue;
                clusters.push(createPointCluster(points[i], i));
            }
            this.trees[maxZoom + 1] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);

            if (log) console.timeEnd(timerId);

            // cluster points on max zoom, then cluster the results on previous zoom, etc.;
            // results in a cluster hierarchy across zoom levels
            for (let z = maxZoom; z >= minZoom; z--) {
                const now = +Date.now();

                // create a new set of clusters for the zoom and index them with a KD-tree
                clusters = this._cluster(clusters, z);
                this.trees[z] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);

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
            const {extent, radius} = this.options;
            const p = radius / extent;
            const top = (y - p) / z2;
            const bottom = (y + 1 + p) / z2;

            const tile = {
                features: []
            };

            this._addTileFeatures(
                tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
                tree.points, x, y, z2, tile);

            if (x === 0) {
                this._addTileFeatures(
                    tree.range(1 - p / z2, top, 1, bottom),
                    tree.points, z2, y, z2, tile);
            }
            if (x === z2 - 1) {
                this._addTileFeatures(
                    tree.range(0, top, p / z2, bottom),
                    tree.points, -1, y, z2, tile);
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
                        skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                        // exit the cluster
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
                    geometry: [[
                        Math.round(this.options.extent * (px * z2 - x)),
                        Math.round(this.options.extent * (py * z2 - y))
                    ]],
                    tags
                };

                // assign id
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
            const {radius, extent, reduce, minPoints} = this.options;
            const r = radius / (extent * Math.pow(2, zoom));

            // loop through each point
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                // if we've already visited the point at this zoom level, skip it
                if (p.zoom <= zoom) continue;
                p.zoom = zoom;

                // find all nearby points
                const tree = this.trees[zoom + 1];
                const neighborIds = tree.within(p.x, p.y, r);

                const numPointsOrigin = p.numPoints || 1;
                let numPoints = numPointsOrigin;

                // count the number of points in a potential cluster
                for (const neighborId of neighborIds) {
                    const b = tree.points[neighborId];
                    // filter out neighbors that are already processed
                    if (b.zoom > zoom) numPoints += b.numPoints || 1;
                }

                if (numPoints >= minPoints) { // enough points to form a cluster
                    let wx = p.x * numPointsOrigin;
                    let wy = p.y * numPointsOrigin;

                    let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;

                    // encode both zoom and point index on which the cluster originated -- offset by total length of features
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

                } else { // left points as unclustered
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
        }

        // get index of the point from which the cluster originated
        _getOriginId(clusterId) {
            return (clusterId - this.points.length) >> 5;
        }

        // get zoom of the point from which the cluster originated
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

    function createCluster(x, y, id, numPoints, properties) {
        return {
            x: fround(x), // weighted cluster center; round for consistency with Float32Array index
            y: fround(y),
            zoom: Infinity, // the last zoom the cluster was processed at
            id, // encodes index of the first child of the cluster and its zoom level
            parentId: -1, // parent cluster id
            numPoints,
            properties
        };
    }

    function createPointCluster(p, id) {
        const [x, y] = p.geometry.coordinates;
        return {
            x: fround(lngX(x)), // projected point coordinates
            y: fround(latY(y)),
            zoom: Infinity, // the last zoom the point was processed at
            index: id, // index of the source feature in the original input array,
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
        const abbrev =
            count >= 10000 ? `${Math.round(count / 1000)  }k` :
            count >= 1000 ? `${Math.round(count / 100) / 10  }k` : count;
        return extend(extend({}, cluster.properties), {
            cluster: true,
            cluster_id: cluster.id,
            point_count: count,
            point_count_abbreviated: abbrev
        });
    }

    // longitude/latitude to spherical mercator in [0..1] range
    function lngX(lng) {
        return lng / 360 + 0.5;
    }
    function latY(lat) {
        const sin = Math.sin(lat * Math.PI / 180);
        const y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
        return y < 0 ? 0 : y > 1 ? 1 : y;
    }

    // spherical mercator to longitude/latitude
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

    /**
     * @module helpers
     */
    /**
     * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
     *
     * @name feature
     * @param {Geometry} geometry input geometry
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature} a GeoJSON Feature
     * @example
     * var geometry = {
     *   "type": "Point",
     *   "coordinates": [110, 50]
     * };
     *
     * var feature = turf.feature(geometry);
     *
     * //=feature
     */
    function feature(geom, properties, options) {
        if (options === void 0) { options = {}; }
        var feat = { type: "Feature" };
        if (options.id === 0 || options.id) {
            feat.id = options.id;
        }
        if (options.bbox) {
            feat.bbox = options.bbox;
        }
        feat.properties = properties || {};
        feat.geometry = geom;
        return feat;
    }
    /**
     * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
     *
     * @name polygon
     * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
     * @param {Object} [properties={}] an Object of key-value pairs to add as properties
     * @param {Object} [options={}] Optional Parameters
     * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
     * @param {string|number} [options.id] Identifier associated with the Feature
     * @returns {Feature<Polygon>} Polygon Feature
     * @example
     * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
     *
     * //=polygon
     */
    function polygon(coordinates, properties, options) {
        if (options === void 0) { options = {}; }
        for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
            var ring = coordinates_1[_i];
            if (ring.length < 4) {
                throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
            }
            for (var j = 0; j < ring[ring.length - 1].length; j++) {
                // Check if first point of Polygon contains two numbers
                if (ring[ring.length - 1][j] !== ring[0][j]) {
                    throw new Error("First and last Position are not equivalent.");
                }
            }
        }
        var geom = {
            type: "Polygon",
            coordinates: coordinates,
        };
        return feature(geom, properties, options);
    }
    /**
     * isObject
     *
     * @param {*} input variable to validate
     * @returns {boolean} true/false
     * @example
     * turf.isObject({elevation: 10})
     * //=true
     * turf.isObject('foo')
     * //=false
     */
    function isObject(input) {
        return !!input && input.constructor === Object;
    }

    /**
     * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
     *
     * @name getCoord
     * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
     * @returns {Array<number>} coordinates
     * @example
     * var pt = turf.point([10, 10]);
     *
     * var coord = turf.getCoord(pt);
     * //= [10, 10]
     */
    function getCoord(coord) {
        if (!coord) {
            throw new Error("coord is required");
        }
        if (!Array.isArray(coord)) {
            if (coord.type === "Feature" &&
                coord.geometry !== null &&
                coord.geometry.type === "Point") {
                return coord.geometry.coordinates;
            }
            if (coord.type === "Point") {
                return coord.coordinates;
            }
        }
        if (Array.isArray(coord) &&
            coord.length >= 2 &&
            !Array.isArray(coord[0]) &&
            !Array.isArray(coord[1])) {
            return coord;
        }
        throw new Error("coord must be GeoJSON Point or an Array of numbers");
    }
    /**
     * Unwrap coordinates from a Feature, Geometry Object or an Array
     *
     * @name getCoords
     * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
     * @returns {Array<any>} coordinates
     * @example
     * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
     *
     * var coords = turf.getCoords(poly);
     * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
     */
    function getCoords(coords) {
        if (Array.isArray(coords)) {
            return coords;
        }
        // Feature
        if (coords.type === "Feature") {
            if (coords.geometry !== null) {
                return coords.geometry.coordinates;
            }
        }
        else {
            // Geometry
            if (coords.coordinates) {
                return coords.coordinates;
            }
        }
        throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
    }
    /**
     * Get Geometry from Feature or Geometry Object
     *
     * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
     * @returns {Geometry|null} GeoJSON Geometry Object
     * @throws {Error} if geojson is not a Feature or Geometry Object
     * @example
     * var point = {
     *   "type": "Feature",
     *   "properties": {},
     *   "geometry": {
     *     "type": "Point",
     *     "coordinates": [110, 40]
     *   }
     * }
     * var geom = turf.getGeom(point)
     * //={"type": "Point", "coordinates": [110, 40]}
     */
    function getGeom(geojson) {
        if (geojson.type === "Feature") {
            return geojson.geometry;
        }
        return geojson;
    }
    /**
     * Get GeoJSON object's type, Geometry type is prioritize.
     *
     * @param {GeoJSON} geojson GeoJSON object
     * @param {string} [name="geojson"] name of the variable to display in error message (unused)
     * @returns {string} GeoJSON type
     * @example
     * var point = {
     *   "type": "Feature",
     *   "properties": {},
     *   "geometry": {
     *     "type": "Point",
     *     "coordinates": [110, 40]
     *   }
     * }
     * var geom = turf.getType(point)
     * //="Point"
     */
    function getType(geojson, _name) {
        if (geojson.type === "FeatureCollection") {
            return "FeatureCollection";
        }
        if (geojson.type === "GeometryCollection") {
            return "GeometryCollection";
        }
        if (geojson.type === "Feature" && geojson.geometry !== null) {
            return geojson.geometry.type;
        }
        return geojson.type;
    }

    // http://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
    // modified from: https://github.com/substack/point-in-polygon/blob/master/index.js
    // which was modified from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    /**
     * Takes a {@link Point} and a {@link Polygon} or {@link MultiPolygon} and determines if the point
     * resides inside the polygon. The polygon can be convex or concave. The function accounts for holes.
     *
     * @name booleanPointInPolygon
     * @param {Coord} point input point
     * @param {Feature<Polygon|MultiPolygon>} polygon input polygon or multipolygon
     * @param {Object} [options={}] Optional parameters
     * @param {boolean} [options.ignoreBoundary=false] True if polygon boundary should be ignored when determining if
     * the point is inside the polygon otherwise false.
     * @returns {boolean} `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon
     * @example
     * var pt = turf.point([-77, 44]);
     * var poly = turf.polygon([[
     *   [-81, 41],
     *   [-81, 47],
     *   [-72, 47],
     *   [-72, 41],
     *   [-81, 41]
     * ]]);
     *
     * turf.booleanPointInPolygon(pt, poly);
     * //= true
     */
    function booleanPointInPolygon(point, polygon, options) {
        if (options === void 0) { options = {}; }
        // validation
        if (!point) {
            throw new Error("point is required");
        }
        if (!polygon) {
            throw new Error("polygon is required");
        }
        var pt = getCoord(point);
        var geom = getGeom(polygon);
        var type = geom.type;
        var bbox = polygon.bbox;
        var polys = geom.coordinates;
        // Quick elimination if point is not inside bbox
        if (bbox && inBBox(pt, bbox) === false) {
            return false;
        }
        // normalize to multipolygon
        if (type === "Polygon") {
            polys = [polys];
        }
        var insidePoly = false;
        for (var i = 0; i < polys.length && !insidePoly; i++) {
            // check if it is in the outer ring first
            if (inRing(pt, polys[i][0], options.ignoreBoundary)) {
                var inHole = false;
                var k = 1;
                // check for the point in any of the holes
                while (k < polys[i].length && !inHole) {
                    if (inRing(pt, polys[i][k], !options.ignoreBoundary)) {
                        inHole = true;
                    }
                    k++;
                }
                if (!inHole) {
                    insidePoly = true;
                }
            }
        }
        return insidePoly;
    }
    /**
     * inRing
     *
     * @private
     * @param {Array<number>} pt [x,y]
     * @param {Array<Array<number>>} ring [[x,y], [x,y],..]
     * @param {boolean} ignoreBoundary ignoreBoundary
     * @returns {boolean} inRing
     */
    function inRing(pt, ring, ignoreBoundary) {
        var isInside = false;
        if (ring[0][0] === ring[ring.length - 1][0] &&
            ring[0][1] === ring[ring.length - 1][1]) {
            ring = ring.slice(0, ring.length - 1);
        }
        for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
            var xi = ring[i][0];
            var yi = ring[i][1];
            var xj = ring[j][0];
            var yj = ring[j][1];
            var onBoundary = pt[1] * (xi - xj) + yi * (xj - pt[0]) + yj * (pt[0] - xi) === 0 &&
                (xi - pt[0]) * (xj - pt[0]) <= 0 &&
                (yi - pt[1]) * (yj - pt[1]) <= 0;
            if (onBoundary) {
                return !ignoreBoundary;
            }
            var intersect = yi > pt[1] !== yj > pt[1] &&
                pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi;
            if (intersect) {
                isInside = !isInside;
            }
        }
        return isInside;
    }
    /**
     * inBBox
     *
     * @private
     * @param {Position} pt point [x,y]
     * @param {BBox} bbox BBox [west, south, east, north]
     * @returns {boolean} true/false if point is inside BBox
     */
    function inBBox(pt, bbox) {
        return (bbox[0] <= pt[0] && bbox[1] <= pt[1] && bbox[2] >= pt[0] && bbox[3] >= pt[1]);
    }

    // To-Do => Improve Typescript GeoJSON handling
    /**
     * Removes redundant coordinates from any GeoJSON Geometry.
     *
     * @name cleanCoords
     * @param {Geometry|Feature} geojson Feature or Geometry
     * @param {Object} [options={}] Optional parameters
     * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated
     * @returns {Geometry|Feature} the cleaned input Feature/Geometry
     * @example
     * var line = turf.lineString([[0, 0], [0, 2], [0, 5], [0, 8], [0, 8], [0, 10]]);
     * var multiPoint = turf.multiPoint([[0, 0], [0, 0], [2, 2]]);
     *
     * turf.cleanCoords(line).geometry.coordinates;
     * //= [[0, 0], [0, 10]]
     *
     * turf.cleanCoords(multiPoint).geometry.coordinates;
     * //= [[0, 0], [2, 2]]
     */
    function cleanCoords(geojson, options) {
        if (options === void 0) { options = {}; }
        // Backwards compatible with v4.0
        var mutate = typeof options === "object" ? options.mutate : options;
        if (!geojson)
            throw new Error("geojson is required");
        var type = getType(geojson);
        // Store new "clean" points in this Array
        var newCoords = [];
        switch (type) {
            case "LineString":
                newCoords = cleanLine(geojson);
                break;
            case "MultiLineString":
            case "Polygon":
                getCoords(geojson).forEach(function (line) {
                    newCoords.push(cleanLine(line));
                });
                break;
            case "MultiPolygon":
                getCoords(geojson).forEach(function (polygons) {
                    var polyPoints = [];
                    polygons.forEach(function (ring) {
                        polyPoints.push(cleanLine(ring));
                    });
                    newCoords.push(polyPoints);
                });
                break;
            case "Point":
                return geojson;
            case "MultiPoint":
                var existing = {};
                getCoords(geojson).forEach(function (coord) {
                    var key = coord.join("-");
                    if (!existing.hasOwnProperty(key)) {
                        newCoords.push(coord);
                        existing[key] = true;
                    }
                });
                break;
            default:
                throw new Error(type + " geometry not supported");
        }
        // Support input mutation
        if (geojson.coordinates) {
            if (mutate === true) {
                geojson.coordinates = newCoords;
                return geojson;
            }
            return { type: type, coordinates: newCoords };
        }
        else {
            if (mutate === true) {
                geojson.geometry.coordinates = newCoords;
                return geojson;
            }
            return feature({ type: type, coordinates: newCoords }, geojson.properties, {
                bbox: geojson.bbox,
                id: geojson.id,
            });
        }
    }
    /**
     * Clean Coords
     *
     * @private
     * @param {Array<number>|LineString} line Line
     * @returns {Array<number>} Cleaned coordinates
     */
    function cleanLine(line) {
        var points = getCoords(line);
        // handle "clean" segment
        if (points.length === 2 && !equals(points[0], points[1]))
            return points;
        var newPoints = [];
        var secondToLast = points.length - 1;
        var newPointsLength = newPoints.length;
        newPoints.push(points[0]);
        for (var i = 1; i < secondToLast; i++) {
            var prevAddedPoint = newPoints[newPoints.length - 1];
            if (points[i][0] === prevAddedPoint[0] &&
                points[i][1] === prevAddedPoint[1])
                continue;
            else {
                newPoints.push(points[i]);
                newPointsLength = newPoints.length;
                if (newPointsLength > 2) {
                    if (isPointOnLineSegment(newPoints[newPointsLength - 3], newPoints[newPointsLength - 1], newPoints[newPointsLength - 2]))
                        newPoints.splice(newPoints.length - 2, 1);
                }
            }
        }
        newPoints.push(points[points.length - 1]);
        newPointsLength = newPoints.length;
        if (equals(points[0], points[points.length - 1]) && newPointsLength < 4)
            throw new Error("invalid polygon");
        if (isPointOnLineSegment(newPoints[newPointsLength - 3], newPoints[newPointsLength - 1], newPoints[newPointsLength - 2]))
            newPoints.splice(newPoints.length - 2, 1);
        return newPoints;
    }
    /**
     * Compares two points and returns if they are equals
     *
     * @private
     * @param {Position} pt1 point
     * @param {Position} pt2 point
     * @returns {boolean} true if they are equals
     */
    function equals(pt1, pt2) {
        return pt1[0] === pt2[0] && pt1[1] === pt2[1];
    }
    /**
     * Returns if `point` is on the segment between `start` and `end`.
     * Borrowed from `@turf/boolean-point-on-line` to speed up the evaluation (instead of using the module as dependency)
     *
     * @private
     * @param {Position} start coord pair of start of line
     * @param {Position} end coord pair of end of line
     * @param {Position} point coord pair of point to check
     * @returns {boolean} true/false
     */
    function isPointOnLineSegment(start, end, point) {
        var x = point[0], y = point[1];
        var startX = start[0], startY = start[1];
        var endX = end[0], endY = end[1];
        var dxc = x - startX;
        var dyc = y - startY;
        var dxl = endX - startX;
        var dyl = endY - startY;
        var cross = dxc * dyl - dyc * dxl;
        if (cross !== 0)
            return false;
        else if (Math.abs(dxl) >= Math.abs(dyl))
            return dxl > 0 ? startX <= x && x <= endX : endX <= x && x <= startX;
        else
            return dyl > 0 ? startY <= y && y <= endY : endY <= y && y <= startY;
    }

    /**
     * Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
     * ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
     *
     * @name clone
     * @param {GeoJSON} geojson GeoJSON Object
     * @returns {GeoJSON} cloned GeoJSON Object
     * @example
     * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
     *
     * var lineCloned = turf.clone(line);
     */
    function clone(geojson) {
        if (!geojson) {
            throw new Error("geojson is required");
        }
        switch (geojson.type) {
            case "Feature":
                return cloneFeature(geojson);
            case "FeatureCollection":
                return cloneFeatureCollection(geojson);
            case "Point":
            case "LineString":
            case "Polygon":
            case "MultiPoint":
            case "MultiLineString":
            case "MultiPolygon":
            case "GeometryCollection":
                return cloneGeometry(geojson);
            default:
                throw new Error("unknown GeoJSON type");
        }
    }
    /**
     * Clone Feature
     *
     * @private
     * @param {Feature<any>} geojson GeoJSON Feature
     * @returns {Feature<any>} cloned Feature
     */
    function cloneFeature(geojson) {
        var cloned = { type: "Feature" };
        // Preserve Foreign Members
        Object.keys(geojson).forEach(function (key) {
            switch (key) {
                case "type":
                case "properties":
                case "geometry":
                    return;
                default:
                    cloned[key] = geojson[key];
            }
        });
        // Add properties & geometry last
        cloned.properties = cloneProperties(geojson.properties);
        cloned.geometry = cloneGeometry(geojson.geometry);
        return cloned;
    }
    /**
     * Clone Properties
     *
     * @private
     * @param {Object} properties GeoJSON Properties
     * @returns {Object} cloned Properties
     */
    function cloneProperties(properties) {
        var cloned = {};
        if (!properties) {
            return cloned;
        }
        Object.keys(properties).forEach(function (key) {
            var value = properties[key];
            if (typeof value === "object") {
                if (value === null) {
                    // handle null
                    cloned[key] = null;
                }
                else if (Array.isArray(value)) {
                    // handle Array
                    cloned[key] = value.map(function (item) {
                        return item;
                    });
                }
                else {
                    // handle generic Object
                    cloned[key] = cloneProperties(value);
                }
            }
            else {
                cloned[key] = value;
            }
        });
        return cloned;
    }
    /**
     * Clone Feature Collection
     *
     * @private
     * @param {FeatureCollection<any>} geojson GeoJSON Feature Collection
     * @returns {FeatureCollection<any>} cloned Feature Collection
     */
    function cloneFeatureCollection(geojson) {
        var cloned = { type: "FeatureCollection" };
        // Preserve Foreign Members
        Object.keys(geojson).forEach(function (key) {
            switch (key) {
                case "type":
                case "features":
                    return;
                default:
                    cloned[key] = geojson[key];
            }
        });
        // Add features
        cloned.features = geojson.features.map(function (feature) {
            return cloneFeature(feature);
        });
        return cloned;
    }
    /**
     * Clone Geometry
     *
     * @private
     * @param {Geometry<any>} geometry GeoJSON Geometry
     * @returns {Geometry<any>} cloned Geometry
     */
    function cloneGeometry(geometry) {
        var geom = { type: geometry.type };
        if (geometry.bbox) {
            geom.bbox = geometry.bbox;
        }
        if (geometry.type === "GeometryCollection") {
            geom.geometries = geometry.geometries.map(function (g) {
                return cloneGeometry(g);
            });
            return geom;
        }
        geom.coordinates = deepSlice(geometry.coordinates);
        return geom;
    }
    /**
     * Deep Slice coordinates
     *
     * @private
     * @param {Coordinates} coords Coordinates
     * @returns {Coordinates} all coordinates sliced
     */
    function deepSlice(coords) {
        var cloned = coords;
        if (typeof cloned[0] !== "object") {
            return cloned.slice();
        }
        return cloned.map(function (coord) {
            return deepSlice(coord);
        });
    }

    /**
     * Callback for geomEach
     *
     * @callback geomEachCallback
     * @param {Geometry} currentGeometry The current Geometry being processed.
     * @param {number} featureIndex The current index of the Feature being processed.
     * @param {Object} featureProperties The current Feature Properties being processed.
     * @param {Array<number>} featureBBox The current Feature BBox being processed.
     * @param {number|string} featureId The current Feature Id being processed.
     */

    /**
     * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
     *
     * @name geomEach
     * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
     * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
     * @returns {void}
     * @example
     * var features = turf.featureCollection([
     *     turf.point([26, 37], {foo: 'bar'}),
     *     turf.point([36, 53], {hello: 'world'})
     * ]);
     *
     * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
     *   //=currentGeometry
     *   //=featureIndex
     *   //=featureProperties
     *   //=featureBBox
     *   //=featureId
     * });
     */
    function geomEach(geojson, callback) {
      var i,
        j,
        g,
        geometry,
        stopG,
        geometryMaybeCollection,
        isGeometryCollection,
        featureProperties,
        featureBBox,
        featureId,
        featureIndex = 0,
        isFeatureCollection = geojson.type === "FeatureCollection",
        isFeature = geojson.type === "Feature",
        stop = isFeatureCollection ? geojson.features.length : 1;

      // This logic may look a little weird. The reason why it is that way
      // is because it's trying to be fast. GeoJSON supports multiple kinds
      // of objects at its root: FeatureCollection, Features, Geometries.
      // This function has the responsibility of handling all of them, and that
      // means that some of the `for` loops you see below actually just don't apply
      // to certain inputs. For instance, if you give this just a
      // Point geometry, then both loops are short-circuited and all we do
      // is gradually rename the input until it's called 'geometry'.
      //
      // This also aims to allocate as few resources as possible: just a
      // few numbers and booleans, rather than any temporary arrays as would
      // be required with the normalization approach.
      for (i = 0; i < stop; i++) {
        geometryMaybeCollection = isFeatureCollection
          ? geojson.features[i].geometry
          : isFeature
          ? geojson.geometry
          : geojson;
        featureProperties = isFeatureCollection
          ? geojson.features[i].properties
          : isFeature
          ? geojson.properties
          : {};
        featureBBox = isFeatureCollection
          ? geojson.features[i].bbox
          : isFeature
          ? geojson.bbox
          : undefined;
        featureId = isFeatureCollection
          ? geojson.features[i].id
          : isFeature
          ? geojson.id
          : undefined;
        isGeometryCollection = geometryMaybeCollection
          ? geometryMaybeCollection.type === "GeometryCollection"
          : false;
        stopG = isGeometryCollection
          ? geometryMaybeCollection.geometries.length
          : 1;

        for (g = 0; g < stopG; g++) {
          geometry = isGeometryCollection
            ? geometryMaybeCollection.geometries[g]
            : geometryMaybeCollection;

          // Handle null Geometry
          if (geometry === null) {
            if (
              callback(
                null,
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false
            )
              return false;
            continue;
          }
          switch (geometry.type) {
            case "Point":
            case "LineString":
            case "MultiPoint":
            case "Polygon":
            case "MultiLineString":
            case "MultiPolygon": {
              if (
                callback(
                  geometry,
                  featureIndex,
                  featureProperties,
                  featureBBox,
                  featureId
                ) === false
              )
                return false;
              break;
            }
            case "GeometryCollection": {
              for (j = 0; j < geometry.geometries.length; j++) {
                if (
                  callback(
                    geometry.geometries[j],
                    featureIndex,
                    featureProperties,
                    featureBBox,
                    featureId
                  ) === false
                )
                  return false;
              }
              break;
            }
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
        // Only increase `featureIndex` per each feature
        featureIndex++;
      }
    }

    /*
     (c) 2013, Vladimir Agafonkin
     Simplify.js, a high-performance JS polyline simplification library
     mourner.github.io/simplify-js
    */

    // to suit your point format, run search/replace for '.x' and '.y';
    // for 3D version, see 3d branch (configurability would draw significant performance overhead)

    // square distance between 2 points
    function getSqDist(p1, p2) {
      var dx = p1.x - p2.x,
        dy = p1.y - p2.y;

      return dx * dx + dy * dy;
    }

    // square distance from a point to a segment
    function getSqSegDist(p, p1, p2) {
      var x = p1.x,
        y = p1.y,
        dx = p2.x - x,
        dy = p2.y - y;

      if (dx !== 0 || dy !== 0) {
        var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
          x = p2.x;
          y = p2.y;
        } else if (t > 0) {
          x += dx * t;
          y += dy * t;
        }
      }

      dx = p.x - x;
      dy = p.y - y;

      return dx * dx + dy * dy;
    }
    // rest of the code doesn't care about point format

    // basic distance-based simplification
    function simplifyRadialDist(points, sqTolerance) {
      var prevPoint = points[0],
        newPoints = [prevPoint],
        point;

      for (var i = 1, len = points.length; i < len; i++) {
        point = points[i];

        if (getSqDist(point, prevPoint) > sqTolerance) {
          newPoints.push(point);
          prevPoint = point;
        }
      }

      if (prevPoint !== point) newPoints.push(point);

      return newPoints;
    }

    function simplifyDPStep(points, first, last, sqTolerance, simplified) {
      var maxSqDist = sqTolerance,
        index;

      for (var i = first + 1; i < last; i++) {
        var sqDist = getSqSegDist(points[i], points[first], points[last]);

        if (sqDist > maxSqDist) {
          index = i;
          maxSqDist = sqDist;
        }
      }

      if (maxSqDist > sqTolerance) {
        if (index - first > 1)
          simplifyDPStep(points, first, index, sqTolerance, simplified);
        simplified.push(points[index]);
        if (last - index > 1)
          simplifyDPStep(points, index, last, sqTolerance, simplified);
      }
    }

    // simplification using Ramer-Douglas-Peucker algorithm
    function simplifyDouglasPeucker(points, sqTolerance) {
      var last = points.length - 1;

      var simplified = [points[0]];
      simplifyDPStep(points, 0, last, sqTolerance, simplified);
      simplified.push(points[last]);

      return simplified;
    }

    // both algorithms combined for awesome performance
    function simplify(points, tolerance, highestQuality) {
      if (points.length <= 2) return points;

      var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

      points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
      points = simplifyDouglasPeucker(points, sqTolerance);

      return points;
    }

    /**
     * Takes a {@link GeoJSON} object and returns a simplified version. Internally uses
     * [simplify-js](http://mourner.github.io/simplify-js/) to perform simplification using the Ramer-Douglas-Peucker algorithm.
     *
     * @name simplify
     * @param {GeoJSON} geojson object to be simplified
     * @param {Object} [options={}] Optional parameters
     * @param {number} [options.tolerance=1] simplification tolerance
     * @param {boolean} [options.highQuality=false] whether or not to spend more time to create a higher-quality simplification with a different algorithm
     * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
     * @returns {GeoJSON} a simplified GeoJSON
     * @example
     * var geojson = turf.polygon([[
     *   [-70.603637, -33.399918],
     *   [-70.614624, -33.395332],
     *   [-70.639343, -33.392466],
     *   [-70.659942, -33.394759],
     *   [-70.683975, -33.404504],
     *   [-70.697021, -33.419406],
     *   [-70.701141, -33.434306],
     *   [-70.700454, -33.446339],
     *   [-70.694274, -33.458369],
     *   [-70.682601, -33.465816],
     *   [-70.668869, -33.472117],
     *   [-70.646209, -33.473835],
     *   [-70.624923, -33.472117],
     *   [-70.609817, -33.468107],
     *   [-70.595397, -33.458369],
     *   [-70.587158, -33.442901],
     *   [-70.587158, -33.426283],
     *   [-70.590591, -33.414248],
     *   [-70.594711, -33.406224],
     *   [-70.603637, -33.399918]
     * ]]);
     * var options = {tolerance: 0.01, highQuality: false};
     * var simplified = turf.simplify(geojson, options);
     *
     * //addToMap
     * var addToMap = [geojson, simplified]
     */
    function simplify$1(geojson, options) {
      // Optional parameters
      options = options || {};
      if (!isObject(options)) throw new Error("options is invalid");
      var tolerance = options.tolerance !== undefined ? options.tolerance : 1;
      var highQuality = options.highQuality || false;
      var mutate = options.mutate || false;

      if (!geojson) throw new Error("geojson is required");
      if (tolerance && tolerance < 0) throw new Error("invalid tolerance");

      // Clone geojson to avoid side effects
      if (mutate !== true) geojson = clone(geojson);

      geomEach(geojson, function (geom) {
        simplifyGeom(geom, tolerance, highQuality);
      });
      return geojson;
    }

    /**
     * Simplifies a feature's coordinates
     *
     * @private
     * @param {Geometry} geometry to be simplified
     * @param {number} [tolerance=1] simplification tolerance
     * @param {boolean} [highQuality=false] whether or not to spend more time to create a higher-quality simplification with a different algorithm
     * @returns {Geometry} output
     */
    function simplifyGeom(geometry, tolerance, highQuality) {
      var type = geometry.type;

      // "unsimplyfiable" geometry types
      if (type === "Point" || type === "MultiPoint") return geometry;

      // Remove any extra coordinates
      cleanCoords(geometry, true);

      var coordinates = geometry.coordinates;
      switch (type) {
        case "LineString":
          geometry["coordinates"] = simplifyLine(
            coordinates,
            tolerance,
            highQuality
          );
          break;
        case "MultiLineString":
          geometry["coordinates"] = coordinates.map(function (lines) {
            return simplifyLine(lines, tolerance, highQuality);
          });
          break;
        case "Polygon":
          geometry["coordinates"] = simplifyPolygon(
            coordinates,
            tolerance,
            highQuality
          );
          break;
        case "MultiPolygon":
          geometry["coordinates"] = coordinates.map(function (rings) {
            return simplifyPolygon(rings, tolerance, highQuality);
          });
      }
      return geometry;
    }

    /**
     * Simplifies the coordinates of a LineString with simplify-js
     *
     * @private
     * @param {Array<number>} coordinates to be processed
     * @param {number} tolerance simplification tolerance
     * @param {boolean} highQuality whether or not to spend more time to create a higher-quality
     * @returns {Array<Array<number>>} simplified coords
     */
    function simplifyLine(coordinates, tolerance, highQuality) {
      return simplify(
        coordinates.map(function (coord) {
          return { x: coord[0], y: coord[1], z: coord[2] };
        }),
        tolerance,
        highQuality
      ).map(function (coords) {
        return coords.z ? [coords.x, coords.y, coords.z] : [coords.x, coords.y];
      });
    }

    /**
     * Simplifies the coordinates of a Polygon with simplify-js
     *
     * @private
     * @param {Array<number>} coordinates to be processed
     * @param {number} tolerance simplification tolerance
     * @param {boolean} highQuality whether or not to spend more time to create a higher-quality
     * @returns {Array<Array<Array<number>>>} simplified coords
     */
    function simplifyPolygon(coordinates, tolerance, highQuality) {
      return coordinates.map(function (ring) {
        var pts = ring.map(function (coord) {
          return { x: coord[0], y: coord[1] };
        });
        if (pts.length < 4) {
          throw new Error("invalid polygon");
        }
        var simpleRing = simplify(pts, tolerance, highQuality).map(function (
          coords
        ) {
          return [coords.x, coords.y];
        });
        //remove 1 percent of tolerance until enough points to make a triangle
        while (!checkValidity(simpleRing)) {
          tolerance -= tolerance * 0.01;
          simpleRing = simplify(pts, tolerance, highQuality).map(function (
            coords
          ) {
            return [coords.x, coords.y];
          });
        }
        if (
          simpleRing[simpleRing.length - 1][0] !== simpleRing[0][0] ||
          simpleRing[simpleRing.length - 1][1] !== simpleRing[0][1]
        ) {
          simpleRing.push(simpleRing[0]);
        }
        return simpleRing;
      });
    }

    /**
     * Returns true if ring has at least 3 coordinates and its first coordinate is the same as its last
     *
     * @private
     * @param {Array<number>} ring coordinates to be checked
     * @returns {boolean} true if valid
     */
    function checkValidity(ring) {
      if (ring.length < 3) return false;
      //if the last point is the same as the first, it's not a triangle
      return !(
        ring.length === 3 &&
        ring[2][0] === ring[0][0] &&
        ring[2][1] === ring[0][1]
      );
    }

    class DataProcessor {
      /**
       * A class meant to handle processing of data used in the scatterplot.
       *
       * ** Can currently only handle data in a [-180,180] x [-90, 90] range due
       * to use of {@link Supercluster}. May need to switch to KDBush at some point.
       *
       * @param {Array} data the processor is meant to handle and index
       */
      constructor(schema) {
        this.schema = this.index = new Supercluster();

        console.log("Loading data...");

        new schemaProcessor.SchemaProcessor(schema, this.indexData.bind(this));
      }

      /**
       * Callback function that occurs after the schema processor has loaded the appropriate data
       *
       * @param {SchemaProcessor} schemaHelper that is built in the constructor
       */
      indexData(schemaHelper) {
        this.points = [];
        let modifyGeometry;

        // If we are using genome scales, we need to map the coordinates correctly
        // We build mapping functions based on what needs to occur for each data
        // point in order to avoid lots of checks in the potentially very long
        // data loop.
        if (schemaHelper.xScale instanceof utilities.GenomeScale) {
          modifyGeometry = (point) => {
            point.geometry.coordinates[0] =
              schemaHelper.xScale.toClipSpaceFromParts(
                point.geometry.coordinates[0][0],
                point.geometry.coordinates[0][1]
              );
          };
        }

        if (schemaHelper.yScale instanceof utilities.GenomeScale) {
          // This is a way to check if x is also a genome scale, so we don't
          // include instanceof checks in the data loop
          if (modifyGeometry) ; else {
            modifyGeometry = (point) => {
              point.geometry.coordinates[1] =
                schemaHelper.yScale.toClipSpaceFromParts(
                  point.geometry.coordinates[0][0],
                  point.geometry.coordinates[0][1]
                );
            };
          }
        }

        console.log("Reading data...");

        // Process the global data in the schema processor
        if (schemaHelper.data) {
          for (let track of schemaHelper.tracks) {
            if (!track.hasOwnData) {
              let currentPoint = track.getNextDataPoint();
              while (currentPoint) {
                if (modifyGeometry) {
                  // only call if we need to
                  modifyGeometry(currentPoint);
                }
                this.points.push(currentPoint);
                currentPoint = track.getNextDataPoint();
              }
              break;
            }
          }
        }

        // Process the data that is local to each track
        schemaHelper.tracks
          .filter((track) => track.hasOwnData)
          .forEach((track) => {
            let currentPoint = track.getNextDataPoint();
            while (currentPoint) {
              if (modifyGeometry) {
                modifyGeometry(currentPoint);
              }
              this.points.push(currentPoint);
              currentPoint = track.getNextDataPoint();
            }
          });

        console.log("Indexing data...");
        this.index.load(this.points);

        console.log("Data processing complete.");
      }

      /**
       * Find the closest point in the data to a given point. Only finds point if it is
       * sufficiently close.
       *
       * @param {Array} point of two floats to find closest point to
       * @param {Integer} zoom to pass to supercluster
       * @returns closest point or undefined
       */
      getClosestPoint(point, zoom = 16) {
        const candidatePoints = this.index.getClusters(
          [point[0] - 0.01, point[1] - 0.01, point[0] + 0.01, point[1] + 0.01],
          zoom
        );

        let closestPoint;
        let distanceToClosestPoint;
        for (const candidate of candidatePoints) {
          const dist =
            (candidate.geometry.coordinates[0] - point[0]) ** 2 +
            (candidate.geometry.coordinates[1] - point[1]) ** 2;
          if (!closestPoint || dist < distanceToClosestPoint) {
            closestPoint = candidate;
            distanceToClosestPoint = dist;
          }
        }

        return closestPoint;
      }

      /**
       * Get points within a bounding box.
       *
       * @param {Array} points Bounding rectangle in the format of [x1, y1, x2, y2]
       * @param {Integer} zoom to pass to supercluster
       * @returns points in bounding box
       */
      selectBox(points, zoom = 16) {
        const smallerX = Math.min(points[0], points[2]);
        const smallerY = Math.min(points[1], points[3]);
        const largerX = Math.max(points[0], points[2]);
        const largerY = Math.max(points[1], points[3]);

        return this.index.getClusters([smallerX, smallerY, largerX, largerY], zoom);
      }

      /**
       * Select points inside a given polygon. Simplify polygon with {@link @turf/simplify}
       * which may cause precision issues with very complex polygons. Uses {@link turf}
       * to determine what points are in polygon.
       *
       * @param {Array} points of a polygon to select points format: [x1,y1,x2,y2,x3,y3,...]
       * @param {Integer} zoom to pass to supercluster
       * @returns points inside lasso
       */
      selectLasso(points, zoom = 16) {
        let smallestX = Number.POSITIVE_INFINITY;
        let largestX = Number.NEGATIVE_INFINITY;
        let smallestY = Number.POSITIVE_INFINITY;
        let largestY = Number.NEGATIVE_INFINITY;
        const polygonPoints = [];
        for (let i = 0; i < points.length; i += 2) {
          if (points[i] < smallestX) smallestX = points[i];
          if (points[i] > largestX) largestX = points[i];
          if (points[i + 1] < smallestY) smallestY = points[i + 1];
          if (points[i + 1] > largestY) largestY = points[i + 1];
          polygonPoints.push([points[i], points[i + 1]]);
        }

        polygonPoints.push([...polygonPoints[0]]); // First and last must be same position

        const candidatePoints = this.index.getClusters(
          [smallestX, smallestY, largestX, largestY],
          zoom
        );

        const boundingPolygon = polygon([polygonPoints]);

        const simplifiedBoundingPolygon = simplify$1(boundingPolygon, {
          tolerance: 0.01,
          highQuality: false,
        });

        return candidatePoints.filter((point) => {
          return booleanPointInPolygon(
            point.geometry.coordinates,
            simplifiedBoundingPolygon
          );
        });
      }
    }

    /**
     * The data processor worker is meant to be an interface between the main thread
     * containing the {@link WebGLVis} a {@link DataProcessor}. It's main purpose
     * is to receive messages from the WebGLVis, call the appropriate method of
     * the DataProcessor, then post a message of the results of the method back to
     * the WebGLVis.
     */

    self.onmessage = (message) => {
      switch (message.data.type) {
        case "init":
          self.processor = new DataProcessor(message.data.schema);
          break;
        case "selectBox":
          postMessage({
            type: message.data.type,
            selection: self.processor.selectBox(message.data.points),
            bounds: message.data.points,
          });
          break;
        case "selectLasso":
          postMessage({
            type: message.data.type,
            selection: self.processor.selectLasso(message.data.points),
            bounds: message.data.points,
          });
          break;
        case "getClosestPoint":
          postMessage({
            type: message.data.type,
            point: self.processor.getClosestPoint(message.data.point),
          });
          break;
        default:
          console.error(`Received unknown message type: ${message.type}`);
      }
    };

});
