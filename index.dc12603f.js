(function () {
  var $parcel$global = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  function $parcel$export(e, n, v) {
    Object.defineProperty(e, n, {
      get: v,
      enumerable: true
    });
  }
  var parcelRequire = $parcel$global.parcelRequire3582;
  var parcelRequireName = "parcelRequire3582";
  var $parcel$modules = {};
  var $parcel$bundles = {};
  if (parcelRequire == null) {
    parcelRequire = function (name) {
      // Execute the bundle wrapper function if there is one registered.
      if ((name in $parcel$bundles)) {
        let wrapper = $parcel$bundles[name];
        delete $parcel$bundles[name];
        wrapper();
      }
      if ((name in $parcel$modules)) {
        return $parcel$modules[name];
      }
      // Try the node require function if it exists.
      // Do not use `require` to prevent Webpack from trying to bundle this call
      if (typeof module !== 'undefined' && typeof module.require === 'function') {
        return module.require(name);
      }
      var err = new Error("Cannot find module '" + name + "'");
      err.code = 'MODULE_NOT_FOUND';
      throw err;
    };
    parcelRequire.register = function register(id, exports) {
      $parcel$modules[id] = exports;
    };
    parcelRequire.registerBundle = function registerBundle(id, fn) {
      $parcel$bundles[id] = fn;
      $parcel$modules[id] = {};
    };
    $parcel$global[parcelRequireName] = parcelRequire;
  }
  function $parcel$bundleWrapper() {
    if ($parcel$bundleWrapper._executed) return;
    $parcel$bundleWrapper._executed = true;
    // ASSET: src/scripts/data-processor.js
    var $467f05d4fa8d08894f84e9cd2c03a15c$exports = {};
    function $2604e7ef843a7459f41771577fc9183c$export$default(ids, coords, nodeSize, left, right, depth) {
      if (right - left <= nodeSize) return;
      const m = left + right >> 1;
      $2604e7ef843a7459f41771577fc9183c$var$select(ids, coords, m, left, right, depth % 2);
      $2604e7ef843a7459f41771577fc9183c$export$default(ids, coords, nodeSize, left, m - 1, depth + 1);
      $2604e7ef843a7459f41771577fc9183c$export$default(ids, coords, nodeSize, m + 1, right, depth + 1);
    }
    function $2604e7ef843a7459f41771577fc9183c$var$select(ids, coords, k, left, right, inc) {
      while (right > left) {
        if (right - left > 600) {
          const n = right - left + 1;
          const m = k - left + 1;
          const z = Math.log(n);
          const s = 0.5 * Math.exp(2 * z / 3);
          const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
          const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
          const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
          $2604e7ef843a7459f41771577fc9183c$var$select(ids, coords, k, newLeft, newRight, inc);
        }
        const t = coords[2 * k + inc];
        let i = left;
        let j = right;
        $2604e7ef843a7459f41771577fc9183c$var$swapItem(ids, coords, left, k);
        if (coords[2 * right + inc] > t) $2604e7ef843a7459f41771577fc9183c$var$swapItem(ids, coords, left, right);
        while (i < j) {
          $2604e7ef843a7459f41771577fc9183c$var$swapItem(ids, coords, i, j);
          i++;
          j--;
          while (coords[2 * i + inc] < t) i++;
          while (coords[2 * j + inc] > t) j--;
        }
        if (coords[2 * left + inc] === t) $2604e7ef843a7459f41771577fc9183c$var$swapItem(ids, coords, left, j); else {
          j++;
          $2604e7ef843a7459f41771577fc9183c$var$swapItem(ids, coords, j, right);
        }
        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
      }
    }
    function $2604e7ef843a7459f41771577fc9183c$var$swapItem(ids, coords, i, j) {
      $2604e7ef843a7459f41771577fc9183c$var$swap(ids, i, j);
      $2604e7ef843a7459f41771577fc9183c$var$swap(coords, 2 * i, 2 * j);
      $2604e7ef843a7459f41771577fc9183c$var$swap(coords, 2 * i + 1, 2 * j + 1);
    }
    function $2604e7ef843a7459f41771577fc9183c$var$swap(arr, i, j) {
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    function $95ee0ba2038b6244cc7daa12c55ea0b3$export$default(ids, coords, minX, minY, maxX, maxY, nodeSize) {
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
    function $096d289fcf1fd1a3473712905d88d713$export$default(ids, coords, qx, qy, r, nodeSize) {
      const stack = [0, ids.length - 1, 0];
      const result = [];
      const r2 = r * r;
      while (stack.length) {
        const axis = stack.pop();
        const right = stack.pop();
        const left = stack.pop();
        if (right - left <= nodeSize) {
          for (let i = left; i <= right; i++) {
            if ($096d289fcf1fd1a3473712905d88d713$var$sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
          }
          continue;
        }
        const m = Math.floor((left + right) / 2);
        const x = coords[2 * m];
        const y = coords[2 * m + 1];
        if ($096d289fcf1fd1a3473712905d88d713$var$sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
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
    function $096d289fcf1fd1a3473712905d88d713$var$sqDist(ax, ay, bx, by) {
      const dx = ax - bx;
      const dy = ay - by;
      return dx * dx + dy * dy;
    }
    const $cec8aa2beba66738a8aba4c1486b720b$var$defaultGetX = p => p[0];
    const $cec8aa2beba66738a8aba4c1486b720b$var$defaultGetY = p => p[1];
    class $cec8aa2beba66738a8aba4c1486b720b$export$default {
      constructor(points, getX = $cec8aa2beba66738a8aba4c1486b720b$var$defaultGetX, getY = $cec8aa2beba66738a8aba4c1486b720b$var$defaultGetY, nodeSize = 64, ArrayType = Float64Array) {
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
        $2604e7ef843a7459f41771577fc9183c$export$default(ids, coords, nodeSize, 0, ids.length - 1, 0);
      }
      range(minX, minY, maxX, maxY) {
        return $95ee0ba2038b6244cc7daa12c55ea0b3$export$default(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
      }
      within(x, y, r) {
        return $096d289fcf1fd1a3473712905d88d713$export$default(this.ids, this.coords, x, y, r, this.nodeSize);
      }
    }
    const $df8fb0a35aa61306982e223b3fdb50ad$var$defaultOptions = {
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
      map: props => props
    };
    const $df8fb0a35aa61306982e223b3fdb50ad$var$fround = Math.fround || (tmp => x => {
      tmp[0] = +x;
      return tmp[0];
    })(new Float32Array(1));
    class $df8fb0a35aa61306982e223b3fdb50ad$export$default {
      constructor(options) {
        this.options = $df8fb0a35aa61306982e223b3fdb50ad$var$extend(Object.create($df8fb0a35aa61306982e223b3fdb50ad$var$defaultOptions), options);
        this.trees = new Array(this.options.maxZoom + 1);
      }
      load(points) {
        const {log, minZoom, maxZoom, nodeSize} = this.options;
        if (log) console.time('total time');
        const timerId = `prepare ${points.length} points`;
        if (log) console.time(timerId);
        this.points = points;
        // generate a cluster object for each point and index input points into a KD-tree
        let clusters = [];
        for (let i = 0; i < points.length; i++) {
          if (!points[i].geometry) continue;
          clusters.push($df8fb0a35aa61306982e223b3fdb50ad$var$createPointCluster(points[i], i));
        }
        this.trees[maxZoom + 1] = new $cec8aa2beba66738a8aba4c1486b720b$export$default(clusters, $df8fb0a35aa61306982e223b3fdb50ad$var$getX, $df8fb0a35aa61306982e223b3fdb50ad$var$getY, nodeSize, Float32Array);
        if (log) console.timeEnd(timerId);
        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
        // results in a cluster hierarchy across zoom levels
        for (let z = maxZoom; z >= minZoom; z--) {
          const now = +Date.now();
          // create a new set of clusters for the zoom and index them with a KD-tree
          clusters = this._cluster(clusters, z);
          this.trees[z] = new $cec8aa2beba66738a8aba4c1486b720b$export$default(clusters, $df8fb0a35aa61306982e223b3fdb50ad$var$getX, $df8fb0a35aa61306982e223b3fdb50ad$var$getY, nodeSize, Float32Array);
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
        const ids = tree.range($df8fb0a35aa61306982e223b3fdb50ad$var$lngX(minLng), $df8fb0a35aa61306982e223b3fdb50ad$var$latY(maxLat), $df8fb0a35aa61306982e223b3fdb50ad$var$lngX(maxLng), $df8fb0a35aa61306982e223b3fdb50ad$var$latY(minLat));
        const clusters = [];
        for (const id of ids) {
          const c = tree.points[id];
          clusters.push(c.numPoints ? $df8fb0a35aa61306982e223b3fdb50ad$var$getClusterJSON(c) : this.points[c.index]);
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
            children.push(c.numPoints ? $df8fb0a35aa61306982e223b3fdb50ad$var$getClusterJSON(c) : this.points[c.index]);
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
              skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
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
            tags = $df8fb0a35aa61306982e223b3fdb50ad$var$getClusterProperties(c);
            px = c.x;
            py = c.y;
          } else {
            const p = this.points[c.index];
            tags = p.properties;
            px = $df8fb0a35aa61306982e223b3fdb50ad$var$lngX(p.geometry.coordinates[0]);
            py = $df8fb0a35aa61306982e223b3fdb50ad$var$latY(p.geometry.coordinates[1]);
          }
          const f = {
            type: 1,
            geometry: [[Math.round(this.options.extent * (px * z2 - x)), Math.round(this.options.extent * (py * z2 - y))]],
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
          if (numPoints >= minPoints) {
            // enough points to form a cluster
            let wx = p.x * numPointsOrigin;
            let wy = p.y * numPointsOrigin;
            let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;
            // encode both zoom and point index on which the cluster originated -- offset by total length of features
            const id = (i << 5) + (zoom + 1) + this.points.length;
            for (const neighborId of neighborIds) {
              const b = tree.points[neighborId];
              if (b.zoom <= zoom) continue;
              b.zoom = zoom;
              // save the zoom (so it doesn't get processed twice)
              const numPoints2 = b.numPoints || 1;
              wx += b.x * numPoints2;
              // accumulate coordinates for calculating weighted center
              wy += b.y * numPoints2;
              b.parentId = id;
              if (reduce) {
                if (!clusterProperties) clusterProperties = this._map(p, true);
                reduce(clusterProperties, this._map(b));
              }
            }
            p.parentId = id;
            clusters.push($df8fb0a35aa61306982e223b3fdb50ad$var$createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));
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
      }
      // get index of the point from which the cluster originated
      _getOriginId(clusterId) {
        return clusterId - this.points.length >> 5;
      }
      // get zoom of the point from which the cluster originated
      _getOriginZoom(clusterId) {
        return (clusterId - this.points.length) % 32;
      }
      _map(point, clone) {
        if (point.numPoints) {
          return clone ? $df8fb0a35aa61306982e223b3fdb50ad$var$extend({}, point.properties) : point.properties;
        }
        const original = this.points[point.index].properties;
        const result = this.options.map(original);
        return clone && result === original ? $df8fb0a35aa61306982e223b3fdb50ad$var$extend({}, result) : result;
      }
    }
    function $df8fb0a35aa61306982e223b3fdb50ad$var$createCluster(x, y, id, numPoints, properties) {
      return {
        x: $df8fb0a35aa61306982e223b3fdb50ad$var$fround(x),
        // weighted cluster center; round for consistency with Float32Array index
        y: $df8fb0a35aa61306982e223b3fdb50ad$var$fround(y),
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
    function $df8fb0a35aa61306982e223b3fdb50ad$var$createPointCluster(p, id) {
      const [x, y] = p.geometry.coordinates;
      return {
        x: $df8fb0a35aa61306982e223b3fdb50ad$var$fround($df8fb0a35aa61306982e223b3fdb50ad$var$lngX(x)),
        // projected point coordinates
        y: $df8fb0a35aa61306982e223b3fdb50ad$var$fround($df8fb0a35aa61306982e223b3fdb50ad$var$latY(y)),
        zoom: Infinity,
        // the last zoom the point was processed at
        index: id,
        // index of the source feature in the original input array,
        parentId: -1
      };
    }
    function $df8fb0a35aa61306982e223b3fdb50ad$var$getClusterJSON(cluster) {
      return {
        type: 'Feature',
        id: cluster.id,
        properties: $df8fb0a35aa61306982e223b3fdb50ad$var$getClusterProperties(cluster),
        geometry: {
          type: 'Point',
          coordinates: [$df8fb0a35aa61306982e223b3fdb50ad$var$xLng(cluster.x), $df8fb0a35aa61306982e223b3fdb50ad$var$yLat(cluster.y)]
        }
      };
    }
    function $df8fb0a35aa61306982e223b3fdb50ad$var$getClusterProperties(cluster) {
      const count = cluster.numPoints;
      const abbrev = count >= 10000 ? `${Math.round(count / 1000)}k` : count >= 1000 ? `${Math.round(count / 100) / 10}k` : count;
      return $df8fb0a35aa61306982e223b3fdb50ad$var$extend($df8fb0a35aa61306982e223b3fdb50ad$var$extend({}, cluster.properties), {
        cluster: true,
        cluster_id: cluster.id,
        point_count: count,
        point_count_abbreviated: abbrev
      });
    }
    // longitude/latitude to spherical mercator in [0..1] range
    function $df8fb0a35aa61306982e223b3fdb50ad$var$lngX(lng) {
      return lng / 360 + 0.5;
    }
    function $df8fb0a35aa61306982e223b3fdb50ad$var$latY(lat) {
      const sin = Math.sin(lat * Math.PI / 180);
      const y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
      return y < 0 ? 0 : y > 1 ? 1 : y;
    }
    // spherical mercator to longitude/latitude
    function $df8fb0a35aa61306982e223b3fdb50ad$var$xLng(x) {
      return (x - 0.5) * 360;
    }
    function $df8fb0a35aa61306982e223b3fdb50ad$var$yLat(y) {
      const y2 = (180 - y * 360) * Math.PI / 180;
      return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
    }
    function $df8fb0a35aa61306982e223b3fdb50ad$var$extend(dest, src) {
      for (const id in src) dest[id] = src[id];
      return dest;
    }
    function $df8fb0a35aa61306982e223b3fdb50ad$var$getX(p) {
      return p.x;
    }
    function $df8fb0a35aa61306982e223b3fdb50ad$var$getY(p) {
      return p.y;
    }
    /**
    * @module helpers
    */
    /**
    * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
    *
    * @memberof helpers
    * @type {number}
    */
    var $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius = 6371008.8;
    /**
    * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
    *
    * @memberof helpers
    * @type {Object}
    */
    var $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$factors = {
      centimeters: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius * 100,
      centimetres: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius * 100,
      degrees: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius / 111325,
      feet: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius * 3.28084,
      inches: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius * 39.37,
      kilometers: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius / 1000,
      kilometres: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius / 1000,
      meters: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius,
      metres: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius,
      miles: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius / 1609.344,
      millimeters: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius * 1000,
      millimetres: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius * 1000,
      nauticalmiles: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius / 1852,
      radians: 1,
      yards: $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$earthRadius / 1.0936
    };
    /**
    * Area of measurement factors based on 1 square meter.
    *
    * @memberof helpers
    * @type {Object}
    */
    var $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$areaFactors = {
      acres: 0.000247105,
      centimeters: 10000,
      centimetres: 10000,
      feet: 10.763910417,
      hectares: 0.0001,
      inches: 1550.003100006,
      kilometers: 0.000001,
      kilometres: 0.000001,
      meters: 1,
      metres: 1,
      miles: 3.86e-7,
      millimeters: 1000000,
      millimetres: 1000000,
      yards: 1.195990046
    };
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
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature(geom, properties, options) {
      if (options === void 0) {
        options = {};
      }
      var feat = {
        type: "Feature"
      };
      if (options.id === 0 || options.id) {
        feat.id = options.id;
      }
      if (options.bbox) {
        feat.bbox = options.bbox;
      }
      feat.properties = properties || ({});
      feat.geometry = geom;
      return feat;
    }
    /**
    * Creates a {@link Point} {@link Feature} from a Position.
    *
    * @name point
    * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
    * @param {Object} [properties={}] an Object of key-value pairs to add as properties
    * @param {Object} [options={}] Optional Parameters
    * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
    * @param {string|number} [options.id] Identifier associated with the Feature
    * @returns {Feature<Point>} a Point feature
    * @example
    * var point = turf.point([-75.343, 39.984]);
    *
    * //=point
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$point(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      if (!coordinates) {
        throw new Error("coordinates is required");
      }
      if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
      }
      if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
      }
      if (!$f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$isNumber(coordinates[0]) || !$f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$isNumber(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
      }
      var geom = {
        type: "Point",
        coordinates: coordinates
      };
      return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature(geom, properties, options);
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
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$polygon(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
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
        coordinates: coordinates
      };
      return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature(geom, properties, options);
    }
    /**
    * Creates a {@link LineString} {@link Feature} from an Array of Positions.
    *
    * @name lineString
    * @param {Array<Array<number>>} coordinates an array of Positions
    * @param {Object} [properties={}] an Object of key-value pairs to add as properties
    * @param {Object} [options={}] Optional Parameters
    * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
    * @param {string|number} [options.id] Identifier associated with the Feature
    * @returns {Feature<LineString>} LineString Feature
    * @example
    * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
    * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
    *
    * //=linestring1
    * //=linestring2
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$lineString(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
      }
      var geom = {
        type: "LineString",
        coordinates: coordinates
      };
      return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature(geom, properties, options);
    }
    /**
    * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
    *
    * @name featureCollection
    * @param {Feature[]} features input features
    * @param {Object} [options={}] Optional Parameters
    * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
    * @param {string|number} [options.id] Identifier associated with the Feature
    * @returns {FeatureCollection} FeatureCollection of Features
    * @example
    * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
    * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
    * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
    *
    * var collection = turf.featureCollection([
    *   locationA,
    *   locationB,
    *   locationC
    * ]);
    *
    * //=collection
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$featureCollection(features, options) {
      if (options === void 0) {
        options = {};
      }
      var fc = {
        type: "FeatureCollection"
      };
      if (options.id) {
        fc.id = options.id;
      }
      if (options.bbox) {
        fc.bbox = options.bbox;
      }
      fc.features = features;
      return fc;
    }
    /**
    * Creates a {@link Feature<MultiLineString>} based on a
    * coordinate array. Properties can be added optionally.
    *
    * @name multiLineString
    * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
    * @param {Object} [properties={}] an Object of key-value pairs to add as properties
    * @param {Object} [options={}] Optional Parameters
    * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
    * @param {string|number} [options.id] Identifier associated with the Feature
    * @returns {Feature<MultiLineString>} a MultiLineString feature
    * @throws {Error} if no coordinates are passed
    * @example
    * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
    *
    * //=multiLine
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$multiLineString(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      var geom = {
        type: "MultiLineString",
        coordinates: coordinates
      };
      return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature(geom, properties, options);
    }
    /**
    * Creates a {@link Feature<MultiPoint>} based on a
    * coordinate array. Properties can be added optionally.
    *
    * @name multiPoint
    * @param {Array<Array<number>>} coordinates an array of Positions
    * @param {Object} [properties={}] an Object of key-value pairs to add as properties
    * @param {Object} [options={}] Optional Parameters
    * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
    * @param {string|number} [options.id] Identifier associated with the Feature
    * @returns {Feature<MultiPoint>} a MultiPoint feature
    * @throws {Error} if no coordinates are passed
    * @example
    * var multiPt = turf.multiPoint([[0,0],[10,10]]);
    *
    * //=multiPt
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$multiPoint(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      var geom = {
        type: "MultiPoint",
        coordinates: coordinates
      };
      return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature(geom, properties, options);
    }
    /**
    * Creates a {@link Feature<MultiPolygon>} based on a
    * coordinate array. Properties can be added optionally.
    *
    * @name multiPolygon
    * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
    * @param {Object} [properties={}] an Object of key-value pairs to add as properties
    * @param {Object} [options={}] Optional Parameters
    * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
    * @param {string|number} [options.id] Identifier associated with the Feature
    * @returns {Feature<MultiPolygon>} a multipolygon feature
    * @throws {Error} if no coordinates are passed
    * @example
    * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
    *
    * //=multiPoly
    *
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$multiPolygon(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      var geom = {
        type: "MultiPolygon",
        coordinates: coordinates
      };
      return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature(geom, properties, options);
    }
    /**
    * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
    * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
    *
    * @name radiansToLength
    * @param {number} radians in radians across the sphere
    * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
    * meters, kilometres, kilometers.
    * @returns {number} distance
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$radiansToLength(radians, units) {
      if (units === void 0) {
        units = "kilometers";
      }
      var factor = $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$factors[units];
      if (!factor) {
        throw new Error(units + " units is invalid");
      }
      return radians * factor;
    }
    /**
    * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
    * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
    *
    * @name lengthToRadians
    * @param {number} distance in real units
    * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
    * meters, kilometres, kilometers.
    * @returns {number} radians
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$lengthToRadians(distance, units) {
      if (units === void 0) {
        units = "kilometers";
      }
      var factor = $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$factors[units];
      if (!factor) {
        throw new Error(units + " units is invalid");
      }
      return distance / factor;
    }
    /**
    * Converts an angle in radians to degrees
    *
    * @name radiansToDegrees
    * @param {number} radians angle in radians
    * @returns {number} degrees between 0 and 360 degrees
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$radiansToDegrees(radians) {
      var degrees = radians % (2 * Math.PI);
      return degrees * 180 / Math.PI;
    }
    /**
    * isNumber
    *
    * @param {*} num Number to validate
    * @returns {boolean} true/false
    * @example
    * turf.isNumber(123)
    * //=true
    * turf.isNumber('foo')
    * //=false
    */
    function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$isNumber(num) {
      return !isNaN(num) && num !== null && !Array.isArray(num);
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
    function $0f23bf02f02182a25d9fb3497411f2a2$export$getCoord(coord) {
      if (!coord) {
        throw new Error("coord is required");
      }
      if (!Array.isArray(coord)) {
        if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
          return coord.geometry.coordinates;
        }
        if (coord.type === "Point") {
          return coord.coordinates;
        }
      }
      if (Array.isArray(coord) && coord.length >= 2 && !Array.isArray(coord[0]) && !Array.isArray(coord[1])) {
        return coord;
      }
      throw new Error("coord must be GeoJSON Point or an Array of numbers");
    }
    /**
    * Checks if coordinates contains a number
    *
    * @name containsNumber
    * @param {Array<any>} coordinates GeoJSON Coordinates
    * @returns {boolean} true if Array contains a number
    */
    function $0f23bf02f02182a25d9fb3497411f2a2$export$containsNumber(coordinates) {
      if (coordinates.length > 1 && $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$isNumber(coordinates[0]) && $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$isNumber(coordinates[1])) {
        return true;
      }
      if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return $0f23bf02f02182a25d9fb3497411f2a2$export$containsNumber(coordinates[0]);
      }
      throw new Error("coordinates must only contain numbers");
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
    function $0f23bf02f02182a25d9fb3497411f2a2$export$getGeom(geojson) {
      if (geojson.type === "Feature") {
        return geojson.geometry;
      }
      return geojson;
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
    function $bd7e548c741d8ed512ad135051375ae7$export$default(point, polygon, options) {
      if (options === void 0) {
        options = {};
      }
      // validation
      if (!point) {
        throw new Error("point is required");
      }
      if (!polygon) {
        throw new Error("polygon is required");
      }
      var pt = $0f23bf02f02182a25d9fb3497411f2a2$export$getCoord(point);
      var geom = $0f23bf02f02182a25d9fb3497411f2a2$export$getGeom(polygon);
      var type = geom.type;
      var bbox = polygon.bbox;
      var polys = geom.coordinates;
      // Quick elimination if point is not inside bbox
      if (bbox && $bd7e548c741d8ed512ad135051375ae7$var$inBBox(pt, bbox) === false) {
        return false;
      }
      // normalize to multipolygon
      if (type === "Polygon") {
        polys = [polys];
      }
      var insidePoly = false;
      for (var i = 0; i < polys.length && !insidePoly; i++) {
        // check if it is in the outer ring first
        if ($bd7e548c741d8ed512ad135051375ae7$var$inRing(pt, polys[i][0], options.ignoreBoundary)) {
          var inHole = false;
          var k = 1;
          // check for the point in any of the holes
          while (k < polys[i].length && !inHole) {
            if ($bd7e548c741d8ed512ad135051375ae7$var$inRing(pt, polys[i][k], !options.ignoreBoundary)) {
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
    function $bd7e548c741d8ed512ad135051375ae7$var$inRing(pt, ring, ignoreBoundary) {
      var isInside = false;
      if (ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]) {
        ring = ring.slice(0, ring.length - 1);
      }
      for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        var xi = ring[i][0];
        var yi = ring[i][1];
        var xj = ring[j][0];
        var yj = ring[j][1];
        var onBoundary = pt[1] * (xi - xj) + yi * (xj - pt[0]) + yj * (pt[0] - xi) === 0 && (xi - pt[0]) * (xj - pt[0]) <= 0 && (yi - pt[1]) * (yj - pt[1]) <= 0;
        if (onBoundary) {
          return !ignoreBoundary;
        }
        var intersect = yi > pt[1] !== yj > pt[1] && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi;
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
    function $bd7e548c741d8ed512ad135051375ae7$var$inBBox(pt, bbox) {
      return bbox[0] <= pt[0] && bbox[1] <= pt[1] && bbox[2] >= pt[0] && bbox[3] >= pt[1];
    }
    class $467f05d4fa8d08894f84e9cd2c03a15c$export$default {
      constructor(data) {
        this.index = new $df8fb0a35aa61306982e223b3fdb50ad$export$default();
        this.points = [];
        // specific to t-SNE
        console.log("Reading data...");
        data.split("\n").forEach(line => {
          const parts = line.split(",");
          const x = parseFloat(parts[1]);
          const y = parseFloat(parts[2]);
          if (!parts[0] || isNaN(x) || isNaN(y)) {
            return;
          }
          this.points.push({
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
      selectBox(points, zoom = 16) {
        const smallerX = Math.min(points[0], points[2]);
        const smallerY = Math.min(points[1], points[3]);
        const largerX = Math.max(points[0], points[2]);
        const largerY = Math.max(points[1], points[3]);
        console.log(this.index.getClusters([smallerX, smallerY, largerX, largerY], zoom));
      }
      selectLasso(points, zoom = 16) {
        let smallestX = Number.MAX_VALUE;
        let largestX = Number.MIN_VALUE;
        let smallestY = Number.MAX_VALUE;
        let largestY = Number.MIN_VALUE;
        const polygonPoints = [];
        for (let i = 0; i < points.length; i += 2) {
          if (points[i] < smallestX) smallestX = points[i];
          if (points[i] > largestX) largestX = points[i];
          if (points[i + 1] < smallestY) smallestY = points[i + 1];
          if (points[i + 1] > largestY) largestY = points[i + 1];
          polygonPoints.push([points[i], points[i + 1]]);
        }
        polygonPoints.push([...polygonPoints[0]]);
        // First and last must be same position
        const candidatePoints = this.index.getClusters([smallestX, smallestY, largestX, largestY], zoom);
        const boundingPolygon = $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$polygon([polygonPoints]);
        console.log(candidatePoints.filter(point => {
          return $bd7e548c741d8ed512ad135051375ae7$export$default(point.geometry.coordinates, boundingPolygon);
        }));
      }
    }
    $parcel$export($467f05d4fa8d08894f84e9cd2c03a15c$exports, "default", function () {
      return $467f05d4fa8d08894f84e9cd2c03a15c$export$default;
    });
    function $467f05d4fa8d08894f84e9cd2c03a15c$init() {
      return $467f05d4fa8d08894f84e9cd2c03a15c$exports;
    }
    parcelRequire.register("291vL", $467f05d4fa8d08894f84e9cd2c03a15c$init);
  }
  var $parcel$referencedAssets = ["291vL"];
  for (var $parcel$i = 0; $parcel$i < $parcel$referencedAssets.length; $parcel$i++) {
    parcelRequire3582.registerBundle($parcel$referencedAssets[$parcel$i], $parcel$bundleWrapper);
  }
})();

//# sourceMappingURL=index.dc12603f.js.map
