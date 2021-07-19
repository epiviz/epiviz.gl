(function () {
  importScripts("./offscreen-webgl-worker.1b7f1349.js");
  var $parcel$global = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  var parcelRequire = $parcel$global.parcelRequire3582;
  var $647b390bbe26a1e6bbc6a8c9e19f41d2$init = parcelRequire("33BxP");
  var $2e9e6b6c3378724b336406626f99a6bc$init = parcelRequire("1pY2N");
  $647b390bbe26a1e6bbc6a8c9e19f41d2$init();
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
  function $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$isObject(input) {
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
  function $0f23bf02f02182a25d9fb3497411f2a2$export$getCoords(coords) {
    if (Array.isArray(coords)) {
      return coords;
    }
    // Feature
    if (coords.type === "Feature") {
      if (coords.geometry !== null) {
        return coords.geometry.coordinates;
      }
    } else {
      // Geometry
      if (coords.coordinates) {
        return coords.coordinates;
      }
    }
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
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
  function $0f23bf02f02182a25d9fb3497411f2a2$export$getType(geojson, _name) {
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
  function $3e976843cd4c9e77226d53aeaa1c1494$export$default(geojson, options) {
    if (options === void 0) {
      options = {};
    }
    // Backwards compatible with v4.0
    var mutate = typeof options === "object" ? options.mutate : options;
    if (!geojson) throw new Error("geojson is required");
    var type = $0f23bf02f02182a25d9fb3497411f2a2$export$getType(geojson);
    // Store new "clean" points in this Array
    var newCoords = [];
    switch (type) {
      case "LineString":
        newCoords = $3e976843cd4c9e77226d53aeaa1c1494$var$cleanLine(geojson);
        break;
      case "MultiLineString":
      case "Polygon":
        $0f23bf02f02182a25d9fb3497411f2a2$export$getCoords(geojson).forEach(function (line) {
          newCoords.push($3e976843cd4c9e77226d53aeaa1c1494$var$cleanLine(line));
        });
        break;
      case "MultiPolygon":
        $0f23bf02f02182a25d9fb3497411f2a2$export$getCoords(geojson).forEach(function (polygons) {
          var polyPoints = [];
          polygons.forEach(function (ring) {
            polyPoints.push($3e976843cd4c9e77226d53aeaa1c1494$var$cleanLine(ring));
          });
          newCoords.push(polyPoints);
        });
        break;
      case "Point":
        return geojson;
      case "MultiPoint":
        var existing = {};
        $0f23bf02f02182a25d9fb3497411f2a2$export$getCoords(geojson).forEach(function (coord) {
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
      return {
        type: type,
        coordinates: newCoords
      };
    } else {
      if (mutate === true) {
        geojson.geometry.coordinates = newCoords;
        return geojson;
      }
      return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature({
        type: type,
        coordinates: newCoords
      }, geojson.properties, {
        bbox: geojson.bbox,
        id: geojson.id
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
  function $3e976843cd4c9e77226d53aeaa1c1494$var$cleanLine(line) {
    var points = $0f23bf02f02182a25d9fb3497411f2a2$export$getCoords(line);
    // handle "clean" segment
    if (points.length === 2 && !$3e976843cd4c9e77226d53aeaa1c1494$var$equals(points[0], points[1])) return points;
    var newPoints = [];
    var secondToLast = points.length - 1;
    var newPointsLength = newPoints.length;
    newPoints.push(points[0]);
    for (var i = 1; i < secondToLast; i++) {
      var prevAddedPoint = newPoints[newPoints.length - 1];
      if (points[i][0] === prevAddedPoint[0] && points[i][1] === prevAddedPoint[1]) continue; else {
        newPoints.push(points[i]);
        newPointsLength = newPoints.length;
        if (newPointsLength > 2) {
          if ($3e976843cd4c9e77226d53aeaa1c1494$var$isPointOnLineSegment(newPoints[newPointsLength - 3], newPoints[newPointsLength - 1], newPoints[newPointsLength - 2])) newPoints.splice(newPoints.length - 2, 1);
        }
      }
    }
    newPoints.push(points[points.length - 1]);
    newPointsLength = newPoints.length;
    if ($3e976843cd4c9e77226d53aeaa1c1494$var$equals(points[0], points[points.length - 1]) && newPointsLength < 4) throw new Error("invalid polygon");
    if ($3e976843cd4c9e77226d53aeaa1c1494$var$isPointOnLineSegment(newPoints[newPointsLength - 3], newPoints[newPointsLength - 1], newPoints[newPointsLength - 2])) newPoints.splice(newPoints.length - 2, 1);
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
  function $3e976843cd4c9e77226d53aeaa1c1494$var$equals(pt1, pt2) {
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
  function $3e976843cd4c9e77226d53aeaa1c1494$var$isPointOnLineSegment(start, end, point) {
    var x = point[0], y = point[1];
    var startX = start[0], startY = start[1];
    var endX = end[0], endY = end[1];
    var dxc = x - startX;
    var dyc = y - startY;
    var dxl = endX - startX;
    var dyl = endY - startY;
    var cross = dxc * dyl - dyc * dxl;
    if (cross !== 0) return false; else if (Math.abs(dxl) >= Math.abs(dyl)) return dxl > 0 ? startX <= x && x <= endX : endX <= x && x <= startX; else return dyl > 0 ? startY <= y && y <= endY : endY <= y && y <= startY;
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
  function $8c01138d69d86724c8da3c490800a12e$export$default(geojson) {
    if (!geojson) {
      throw new Error("geojson is required");
    }
    switch (geojson.type) {
      case "Feature":
        return $8c01138d69d86724c8da3c490800a12e$var$cloneFeature(geojson);
      case "FeatureCollection":
        return $8c01138d69d86724c8da3c490800a12e$var$cloneFeatureCollection(geojson);
      case "Point":
      case "LineString":
      case "Polygon":
      case "MultiPoint":
      case "MultiLineString":
      case "MultiPolygon":
      case "GeometryCollection":
        return $8c01138d69d86724c8da3c490800a12e$var$cloneGeometry(geojson);
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
  function $8c01138d69d86724c8da3c490800a12e$var$cloneFeature(geojson) {
    var cloned = {
      type: "Feature"
    };
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
    cloned.properties = $8c01138d69d86724c8da3c490800a12e$var$cloneProperties(geojson.properties);
    cloned.geometry = $8c01138d69d86724c8da3c490800a12e$var$cloneGeometry(geojson.geometry);
    return cloned;
  }
  /**
  * Clone Properties
  *
  * @private
  * @param {Object} properties GeoJSON Properties
  * @returns {Object} cloned Properties
  */
  function $8c01138d69d86724c8da3c490800a12e$var$cloneProperties(properties) {
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
        } else if (Array.isArray(value)) {
          // handle Array
          cloned[key] = value.map(function (item) {
            return item;
          });
        } else {
          // handle generic Object
          cloned[key] = $8c01138d69d86724c8da3c490800a12e$var$cloneProperties(value);
        }
      } else {
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
  function $8c01138d69d86724c8da3c490800a12e$var$cloneFeatureCollection(geojson) {
    var cloned = {
      type: "FeatureCollection"
    };
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
      return $8c01138d69d86724c8da3c490800a12e$var$cloneFeature(feature);
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
  function $8c01138d69d86724c8da3c490800a12e$var$cloneGeometry(geometry) {
    var geom = {
      type: geometry.type
    };
    if (geometry.bbox) {
      geom.bbox = geometry.bbox;
    }
    if (geometry.type === "GeometryCollection") {
      geom.geometries = geometry.geometries.map(function (g) {
        return $8c01138d69d86724c8da3c490800a12e$var$cloneGeometry(g);
      });
      return geom;
    }
    geom.coordinates = $8c01138d69d86724c8da3c490800a12e$var$deepSlice(geometry.coordinates);
    return geom;
  }
  /**
  * Deep Slice coordinates
  *
  * @private
  * @param {Coordinates} coords Coordinates
  * @returns {Coordinates} all coordinates sliced
  */
  function $8c01138d69d86724c8da3c490800a12e$var$deepSlice(coords) {
    var cloned = coords;
    if (typeof cloned[0] !== "object") {
      return cloned.slice();
    }
    return cloned.map(function (coord) {
      return $8c01138d69d86724c8da3c490800a12e$var$deepSlice(coord);
    });
  }
  /**
  * Callback for coordEach
  *
  * @callback coordEachCallback
  * @param {Array<number>} currentCoord The current coordinate being processed.
  * @param {number} coordIndex The current index of the coordinate being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
  * @param {number} geometryIndex The current index of the Geometry being processed.
  */
  /**
  * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
  *
  * @name coordEach
  * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
  * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
  * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
  * @returns {void}
  * @example
  * var features = turf.featureCollection([
  *   turf.point([26, 37], {"foo": "bar"}),
  *   turf.point([36, 53], {"hello": "world"})
  * ]);
  *
  * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
  *   //=currentCoord
  *   //=coordIndex
  *   //=featureIndex
  *   //=multiFeatureIndex
  *   //=geometryIndex
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$coordEach(geojson, callback, excludeWrapCoord) {
    // Handles null Geometry -- Skips this GeoJSON
    if (geojson === null) return;
    var j, k, l, geometry, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
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
    for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
      geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
      isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
      stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
      for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
        var multiFeatureIndex = 0;
        var geometryIndex = 0;
        geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
        // Handles null Geometry -- Skips this geometry
        if (geometry === null) continue;
        coords = geometry.coordinates;
        var geomType = geometry.type;
        wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
        switch (geomType) {
          case null:
            break;
          case "Point":
            if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
            coordIndex++;
            multiFeatureIndex++;
            break;
          case "LineString":
          case "MultiPoint":
            for (j = 0; j < coords.length; j++) {
              if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
              coordIndex++;
              if (geomType === "MultiPoint") multiFeatureIndex++;
            }
            if (geomType === "LineString") multiFeatureIndex++;
            break;
          case "Polygon":
          case "MultiLineString":
            for (j = 0; j < coords.length; j++) {
              for (k = 0; k < coords[j].length - wrapShrink; k++) {
                if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                coordIndex++;
              }
              if (geomType === "MultiLineString") multiFeatureIndex++;
              if (geomType === "Polygon") geometryIndex++;
            }
            if (geomType === "Polygon") multiFeatureIndex++;
            break;
          case "MultiPolygon":
            for (j = 0; j < coords.length; j++) {
              geometryIndex = 0;
              for (k = 0; k < coords[j].length; k++) {
                for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                  if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                  coordIndex++;
                }
                geometryIndex++;
              }
              multiFeatureIndex++;
            }
            break;
          case "GeometryCollection":
            for (j = 0; j < geometry.geometries.length; j++) if ($cbbd2e42bceedf1f57ecf044e40594fe$export$coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
            break;
          default:
            throw new Error("Unknown Geometry Type");
        }
      }
    }
  }
  /**
  * Callback for coordReduce
  *
  * The first time the callback function is called, the values provided as arguments depend
  * on whether the reduce method has an initialValue argument.
  *
  * If an initialValue is provided to the reduce method:
  *  - The previousValue argument is initialValue.
  *  - The currentValue argument is the value of the first element present in the array.
  *
  * If an initialValue is not provided:
  *  - The previousValue argument is the value of the first element present in the array.
  *  - The currentValue argument is the value of the second element present in the array.
  *
  * @callback coordReduceCallback
  * @param {*} previousValue The accumulated value previously returned in the last invocation
  * of the callback, or initialValue, if supplied.
  * @param {Array<number>} currentCoord The current coordinate being processed.
  * @param {number} coordIndex The current index of the coordinate being processed.
  * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
  * @param {number} featureIndex The current index of the Feature being processed.
  * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
  * @param {number} geometryIndex The current index of the Geometry being processed.
  */
  /**
  * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
  *
  * @name coordReduce
  * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
  * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
  * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
  * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
  * @returns {*} The value that results from the reduction.
  * @example
  * var features = turf.featureCollection([
  *   turf.point([26, 37], {"foo": "bar"}),
  *   turf.point([36, 53], {"hello": "world"})
  * ]);
  *
  * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
  *   //=previousValue
  *   //=currentCoord
  *   //=coordIndex
  *   //=featureIndex
  *   //=multiFeatureIndex
  *   //=geometryIndex
  *   return currentCoord;
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
    var previousValue = initialValue;
    $cbbd2e42bceedf1f57ecf044e40594fe$export$coordEach(geojson, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
      if (coordIndex === 0 && initialValue === undefined) previousValue = currentCoord; else previousValue = callback(previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
    }, excludeWrapCoord);
    return previousValue;
  }
  /**
  * Callback for propEach
  *
  * @callback propEachCallback
  * @param {Object} currentProperties The current Properties being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  */
  /**
  * Iterate over properties in any GeoJSON object, similar to Array.forEach()
  *
  * @name propEach
  * @param {FeatureCollection|Feature} geojson any GeoJSON object
  * @param {Function} callback a method that takes (currentProperties, featureIndex)
  * @returns {void}
  * @example
  * var features = turf.featureCollection([
  *     turf.point([26, 37], {foo: 'bar'}),
  *     turf.point([36, 53], {hello: 'world'})
  * ]);
  *
  * turf.propEach(features, function (currentProperties, featureIndex) {
  *   //=currentProperties
  *   //=featureIndex
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$propEach(geojson, callback) {
    var i;
    switch (geojson.type) {
      case "FeatureCollection":
        for (i = 0; i < geojson.features.length; i++) {
          if (callback(geojson.features[i].properties, i) === false) break;
        }
        break;
      case "Feature":
        callback(geojson.properties, 0);
        break;
    }
  }
  /**
  * Callback for propReduce
  *
  * The first time the callback function is called, the values provided as arguments depend
  * on whether the reduce method has an initialValue argument.
  *
  * If an initialValue is provided to the reduce method:
  *  - The previousValue argument is initialValue.
  *  - The currentValue argument is the value of the first element present in the array.
  *
  * If an initialValue is not provided:
  *  - The previousValue argument is the value of the first element present in the array.
  *  - The currentValue argument is the value of the second element present in the array.
  *
  * @callback propReduceCallback
  * @param {*} previousValue The accumulated value previously returned in the last invocation
  * of the callback, or initialValue, if supplied.
  * @param {*} currentProperties The current Properties being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  */
  /**
  * Reduce properties in any GeoJSON object into a single value,
  * similar to how Array.reduce works. However, in this case we lazily run
  * the reduction, so an array of all properties is unnecessary.
  *
  * @name propReduce
  * @param {FeatureCollection|Feature} geojson any GeoJSON object
  * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
  * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
  * @returns {*} The value that results from the reduction.
  * @example
  * var features = turf.featureCollection([
  *     turf.point([26, 37], {foo: 'bar'}),
  *     turf.point([36, 53], {hello: 'world'})
  * ]);
  *
  * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
  *   //=previousValue
  *   //=currentProperties
  *   //=featureIndex
  *   return currentProperties
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$propReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    $cbbd2e42bceedf1f57ecf044e40594fe$export$propEach(geojson, function (currentProperties, featureIndex) {
      if (featureIndex === 0 && initialValue === undefined) previousValue = currentProperties; else previousValue = callback(previousValue, currentProperties, featureIndex);
    });
    return previousValue;
  }
  /**
  * Callback for featureEach
  *
  * @callback featureEachCallback
  * @param {Feature<any>} currentFeature The current Feature being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  */
  /**
  * Iterate over features in any GeoJSON object, similar to
  * Array.forEach.
  *
  * @name featureEach
  * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
  * @param {Function} callback a method that takes (currentFeature, featureIndex)
  * @returns {void}
  * @example
  * var features = turf.featureCollection([
  *   turf.point([26, 37], {foo: 'bar'}),
  *   turf.point([36, 53], {hello: 'world'})
  * ]);
  *
  * turf.featureEach(features, function (currentFeature, featureIndex) {
  *   //=currentFeature
  *   //=featureIndex
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$featureEach(geojson, callback) {
    if (geojson.type === "Feature") {
      callback(geojson, 0);
    } else if (geojson.type === "FeatureCollection") {
      for (var i = 0; i < geojson.features.length; i++) {
        if (callback(geojson.features[i], i) === false) break;
      }
    }
  }
  /**
  * Callback for featureReduce
  *
  * The first time the callback function is called, the values provided as arguments depend
  * on whether the reduce method has an initialValue argument.
  *
  * If an initialValue is provided to the reduce method:
  *  - The previousValue argument is initialValue.
  *  - The currentValue argument is the value of the first element present in the array.
  *
  * If an initialValue is not provided:
  *  - The previousValue argument is the value of the first element present in the array.
  *  - The currentValue argument is the value of the second element present in the array.
  *
  * @callback featureReduceCallback
  * @param {*} previousValue The accumulated value previously returned in the last invocation
  * of the callback, or initialValue, if supplied.
  * @param {Feature} currentFeature The current Feature being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  */
  /**
  * Reduce features in any GeoJSON object, similar to Array.reduce().
  *
  * @name featureReduce
  * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
  * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
  * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
  * @returns {*} The value that results from the reduction.
  * @example
  * var features = turf.featureCollection([
  *   turf.point([26, 37], {"foo": "bar"}),
  *   turf.point([36, 53], {"hello": "world"})
  * ]);
  *
  * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
  *   //=previousValue
  *   //=currentFeature
  *   //=featureIndex
  *   return currentFeature
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$featureReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    $cbbd2e42bceedf1f57ecf044e40594fe$export$featureEach(geojson, function (currentFeature, featureIndex) {
      if (featureIndex === 0 && initialValue === undefined) previousValue = currentFeature; else previousValue = callback(previousValue, currentFeature, featureIndex);
    });
    return previousValue;
  }
  /**
  * Get all coordinates from any GeoJSON object.
  *
  * @name coordAll
  * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
  * @returns {Array<Array<number>>} coordinate position array
  * @example
  * var features = turf.featureCollection([
  *   turf.point([26, 37], {foo: 'bar'}),
  *   turf.point([36, 53], {hello: 'world'})
  * ]);
  *
  * var coords = turf.coordAll(features);
  * //= [[26, 37], [36, 53]]
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$coordAll(geojson) {
    var coords = [];
    $cbbd2e42bceedf1f57ecf044e40594fe$export$coordEach(geojson, function (coord) {
      coords.push(coord);
    });
    return coords;
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
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$geomEach(geojson, callback) {
    var i, j, g, geometry, stopG, geometryMaybeCollection, isGeometryCollection, featureProperties, featureBBox, featureId, featureIndex = 0, isFeatureCollection = geojson.type === "FeatureCollection", isFeature = geojson.type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
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
      geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
      featureProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
      featureBBox = isFeatureCollection ? geojson.features[i].bbox : isFeature ? geojson.bbox : undefined;
      featureId = isFeatureCollection ? geojson.features[i].id : isFeature ? geojson.id : undefined;
      isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
      stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
      for (g = 0; g < stopG; g++) {
        geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
        // Handle null Geometry
        if (geometry === null) {
          if (callback(null, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
          continue;
        }
        switch (geometry.type) {
          case "Point":
          case "LineString":
          case "MultiPoint":
          case "Polygon":
          case "MultiLineString":
          case "MultiPolygon":
            {
              if (callback(geometry, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
              break;
            }
          case "GeometryCollection":
            {
              for (j = 0; j < geometry.geometries.length; j++) {
                if (callback(geometry.geometries[j], featureIndex, featureProperties, featureBBox, featureId) === false) return false;
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
  /**
  * Callback for geomReduce
  *
  * The first time the callback function is called, the values provided as arguments depend
  * on whether the reduce method has an initialValue argument.
  *
  * If an initialValue is provided to the reduce method:
  *  - The previousValue argument is initialValue.
  *  - The currentValue argument is the value of the first element present in the array.
  *
  * If an initialValue is not provided:
  *  - The previousValue argument is the value of the first element present in the array.
  *  - The currentValue argument is the value of the second element present in the array.
  *
  * @callback geomReduceCallback
  * @param {*} previousValue The accumulated value previously returned in the last invocation
  * of the callback, or initialValue, if supplied.
  * @param {Geometry} currentGeometry The current Geometry being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  * @param {Object} featureProperties The current Feature Properties being processed.
  * @param {Array<number>} featureBBox The current Feature BBox being processed.
  * @param {number|string} featureId The current Feature Id being processed.
  */
  /**
  * Reduce geometry in any GeoJSON object, similar to Array.reduce().
  *
  * @name geomReduce
  * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
  * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
  * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
  * @returns {*} The value that results from the reduction.
  * @example
  * var features = turf.featureCollection([
  *     turf.point([26, 37], {foo: 'bar'}),
  *     turf.point([36, 53], {hello: 'world'})
  * ]);
  *
  * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
  *   //=previousValue
  *   //=currentGeometry
  *   //=featureIndex
  *   //=featureProperties
  *   //=featureBBox
  *   //=featureId
  *   return currentGeometry
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$geomReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    $cbbd2e42bceedf1f57ecf044e40594fe$export$geomEach(geojson, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
      if (featureIndex === 0 && initialValue === undefined) previousValue = currentGeometry; else previousValue = callback(previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId);
    });
    return previousValue;
  }
  /**
  * Callback for flattenEach
  *
  * @callback flattenEachCallback
  * @param {Feature} currentFeature The current flattened feature being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
  */
  /**
  * Iterate over flattened features in any GeoJSON object, similar to
  * Array.forEach.
  *
  * @name flattenEach
  * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
  * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
  * @example
  * var features = turf.featureCollection([
  *     turf.point([26, 37], {foo: 'bar'}),
  *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
  * ]);
  *
  * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
  *   //=currentFeature
  *   //=featureIndex
  *   //=multiFeatureIndex
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$flattenEach(geojson, callback) {
    $cbbd2e42bceedf1f57ecf044e40594fe$export$geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
      // Callback for single geometry
      var type = geometry === null ? null : geometry.type;
      switch (type) {
        case null:
        case "Point":
        case "LineString":
        case "Polygon":
          if (callback($f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature(geometry, properties, {
            bbox: bbox,
            id: id
          }), featureIndex, 0) === false) return false;
          return;
      }
      var geomType;
      // Callback for multi-geometry
      switch (type) {
        case "MultiPoint":
          geomType = "Point";
          break;
        case "MultiLineString":
          geomType = "LineString";
          break;
        case "MultiPolygon":
          geomType = "Polygon";
          break;
      }
      for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
        var coordinate = geometry.coordinates[multiFeatureIndex];
        var geom = {
          type: geomType,
          coordinates: coordinate
        };
        if (callback($f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$feature(geom, properties), featureIndex, multiFeatureIndex) === false) return false;
      }
    });
  }
  /**
  * Callback for flattenReduce
  *
  * The first time the callback function is called, the values provided as arguments depend
  * on whether the reduce method has an initialValue argument.
  *
  * If an initialValue is provided to the reduce method:
  *  - The previousValue argument is initialValue.
  *  - The currentValue argument is the value of the first element present in the array.
  *
  * If an initialValue is not provided:
  *  - The previousValue argument is the value of the first element present in the array.
  *  - The currentValue argument is the value of the second element present in the array.
  *
  * @callback flattenReduceCallback
  * @param {*} previousValue The accumulated value previously returned in the last invocation
  * of the callback, or initialValue, if supplied.
  * @param {Feature} currentFeature The current Feature being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
  */
  /**
  * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
  *
  * @name flattenReduce
  * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
  * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
  * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
  * @returns {*} The value that results from the reduction.
  * @example
  * var features = turf.featureCollection([
  *     turf.point([26, 37], {foo: 'bar'}),
  *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
  * ]);
  *
  * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
  *   //=previousValue
  *   //=currentFeature
  *   //=featureIndex
  *   //=multiFeatureIndex
  *   return currentFeature
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$flattenReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    $cbbd2e42bceedf1f57ecf044e40594fe$export$flattenEach(geojson, function (currentFeature, featureIndex, multiFeatureIndex) {
      if (featureIndex === 0 && multiFeatureIndex === 0 && initialValue === undefined) previousValue = currentFeature; else previousValue = callback(previousValue, currentFeature, featureIndex, multiFeatureIndex);
    });
    return previousValue;
  }
  /**
  * Callback for segmentEach
  *
  * @callback segmentEachCallback
  * @param {Feature<LineString>} currentSegment The current Segment being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
  * @param {number} geometryIndex The current index of the Geometry being processed.
  * @param {number} segmentIndex The current index of the Segment being processed.
  * @returns {void}
  */
  /**
  * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
  * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
  *
  * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
  * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
  * @returns {void}
  * @example
  * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
  *
  * // Iterate over GeoJSON by 2-vertex segments
  * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
  *   //=currentSegment
  *   //=featureIndex
  *   //=multiFeatureIndex
  *   //=geometryIndex
  *   //=segmentIndex
  * });
  *
  * // Calculate the total number of segments
  * var total = 0;
  * turf.segmentEach(polygon, function () {
  *     total++;
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$segmentEach(geojson, callback) {
    $cbbd2e42bceedf1f57ecf044e40594fe$export$flattenEach(geojson, function (feature$$1, featureIndex, multiFeatureIndex) {
      var segmentIndex = 0;
      // Exclude null Geometries
      if (!feature$$1.geometry) return;
      // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
      var type = feature$$1.geometry.type;
      if (type === "Point" || type === "MultiPoint") return;
      // Generate 2-vertex line segments
      var previousCoords;
      var previousFeatureIndex = 0;
      var previousMultiIndex = 0;
      var prevGeomIndex = 0;
      if ($cbbd2e42bceedf1f57ecf044e40594fe$export$coordEach(feature$$1, function (currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
        // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
        if (previousCoords === undefined || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
          previousCoords = currentCoord;
          previousFeatureIndex = featureIndex;
          previousMultiIndex = multiPartIndexCoord;
          prevGeomIndex = geometryIndex;
          segmentIndex = 0;
          return;
        }
        var currentSegment = $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$lineString([previousCoords, currentCoord], feature$$1.properties);
        if (callback(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) === false) return false;
        segmentIndex++;
        previousCoords = currentCoord;
      }) === false) return false;
    });
  }
  /**
  * Callback for segmentReduce
  *
  * The first time the callback function is called, the values provided as arguments depend
  * on whether the reduce method has an initialValue argument.
  *
  * If an initialValue is provided to the reduce method:
  *  - The previousValue argument is initialValue.
  *  - The currentValue argument is the value of the first element present in the array.
  *
  * If an initialValue is not provided:
  *  - The previousValue argument is the value of the first element present in the array.
  *  - The currentValue argument is the value of the second element present in the array.
  *
  * @callback segmentReduceCallback
  * @param {*} previousValue The accumulated value previously returned in the last invocation
  * of the callback, or initialValue, if supplied.
  * @param {Feature<LineString>} currentSegment The current Segment being processed.
  * @param {number} featureIndex The current index of the Feature being processed.
  * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
  * @param {number} geometryIndex The current index of the Geometry being processed.
  * @param {number} segmentIndex The current index of the Segment being processed.
  */
  /**
  * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
  * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
  *
  * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
  * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
  * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
  * @returns {void}
  * @example
  * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
  *
  * // Iterate over GeoJSON by 2-vertex segments
  * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
  *   //= previousSegment
  *   //= currentSegment
  *   //= featureIndex
  *   //= multiFeatureIndex
  *   //= geometryIndex
  *   //= segmentIndex
  *   return currentSegment
  * });
  *
  * // Calculate the total number of segments
  * var initialValue = 0
  * var total = turf.segmentReduce(polygon, function (previousValue) {
  *     previousValue++;
  *     return previousValue;
  * }, initialValue);
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$segmentReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    var started = false;
    $cbbd2e42bceedf1f57ecf044e40594fe$export$segmentEach(geojson, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
      if (started === false && initialValue === undefined) previousValue = currentSegment; else previousValue = callback(previousValue, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex);
      started = true;
    });
    return previousValue;
  }
  /**
  * Callback for lineEach
  *
  * @callback lineEachCallback
  * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
  * @param {number} featureIndex The current index of the Feature being processed
  * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
  * @param {number} geometryIndex The current index of the Geometry being processed
  */
  /**
  * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
  * similar to Array.forEach.
  *
  * @name lineEach
  * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
  * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
  * @example
  * var multiLine = turf.multiLineString([
  *   [[26, 37], [35, 45]],
  *   [[36, 53], [38, 50], [41, 55]]
  * ]);
  *
  * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
  *   //=currentLine
  *   //=featureIndex
  *   //=multiFeatureIndex
  *   //=geometryIndex
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$lineEach(geojson, callback) {
    // validation
    if (!geojson) throw new Error("geojson is required");
    $cbbd2e42bceedf1f57ecf044e40594fe$export$flattenEach(geojson, function (feature$$1, featureIndex, multiFeatureIndex) {
      if (feature$$1.geometry === null) return;
      var type = feature$$1.geometry.type;
      var coords = feature$$1.geometry.coordinates;
      switch (type) {
        case "LineString":
          if (callback(feature$$1, featureIndex, multiFeatureIndex, 0, 0) === false) return false;
          break;
        case "Polygon":
          for (var geometryIndex = 0; geometryIndex < coords.length; geometryIndex++) {
            if (callback($f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$lineString(coords[geometryIndex], feature$$1.properties), featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
          }
          break;
      }
    });
  }
  /**
  * Callback for lineReduce
  *
  * The first time the callback function is called, the values provided as arguments depend
  * on whether the reduce method has an initialValue argument.
  *
  * If an initialValue is provided to the reduce method:
  *  - The previousValue argument is initialValue.
  *  - The currentValue argument is the value of the first element present in the array.
  *
  * If an initialValue is not provided:
  *  - The previousValue argument is the value of the first element present in the array.
  *  - The currentValue argument is the value of the second element present in the array.
  *
  * @callback lineReduceCallback
  * @param {*} previousValue The accumulated value previously returned in the last invocation
  * of the callback, or initialValue, if supplied.
  * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
  * @param {number} featureIndex The current index of the Feature being processed
  * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
  * @param {number} geometryIndex The current index of the Geometry being processed
  */
  /**
  * Reduce features in any GeoJSON object, similar to Array.reduce().
  *
  * @name lineReduce
  * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
  * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
  * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
  * @returns {*} The value that results from the reduction.
  * @example
  * var multiPoly = turf.multiPolygon([
  *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
  *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
  * ]);
  *
  * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
  *   //=previousValue
  *   //=currentLine
  *   //=featureIndex
  *   //=multiFeatureIndex
  *   //=geometryIndex
  *   return currentLine
  * });
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$lineReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    $cbbd2e42bceedf1f57ecf044e40594fe$export$lineEach(geojson, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
      if (featureIndex === 0 && initialValue === undefined) previousValue = currentLine; else previousValue = callback(previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex);
    });
    return previousValue;
  }
  /**
  * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
  *
  * Negative indexes are permitted.
  * Point & MultiPoint will always return null.
  *
  * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
  * @param {Object} [options={}] Optional parameters
  * @param {number} [options.featureIndex=0] Feature Index
  * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
  * @param {number} [options.geometryIndex=0] Geometry Index
  * @param {number} [options.segmentIndex=0] Segment Index
  * @param {Object} [options.properties={}] Translate Properties to output LineString
  * @param {BBox} [options.bbox={}] Translate BBox to output LineString
  * @param {number|string} [options.id={}] Translate Id to output LineString
  * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
  * @example
  * var multiLine = turf.multiLineString([
  *     [[10, 10], [50, 30], [30, 40]],
  *     [[-10, -10], [-50, -30], [-30, -40]]
  * ]);
  *
  * // First Segment (defaults are 0)
  * turf.findSegment(multiLine);
  * // => Feature<LineString<[[10, 10], [50, 30]]>>
  *
  * // First Segment of 2nd Multi Feature
  * turf.findSegment(multiLine, {multiFeatureIndex: 1});
  * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
  *
  * // Last Segment of Last Multi Feature
  * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
  * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$findSegment(geojson, options) {
    // Optional Parameters
    options = options || ({});
    if (!$f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$isObject(options)) throw new Error("options is invalid");
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var segmentIndex = options.segmentIndex || 0;
    // Find FeatureIndex
    var properties = options.properties;
    var geometry;
    switch (geojson.type) {
      case "FeatureCollection":
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
      case "Feature":
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
      case "Point":
      case "MultiPoint":
        return null;
      case "LineString":
      case "Polygon":
      case "MultiLineString":
      case "MultiPolygon":
        geometry = geojson;
        break;
      default:
        throw new Error("geojson is invalid");
    }
    // Find SegmentIndex
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
      case "Point":
      case "MultiPoint":
        return null;
      case "LineString":
        if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$lineString([coords[segmentIndex], coords[segmentIndex + 1]], properties, options);
      case "Polygon":
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$lineString([coords[geometryIndex][segmentIndex], coords[geometryIndex][segmentIndex + 1]], properties, options);
      case "MultiLineString":
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$lineString([coords[multiFeatureIndex][segmentIndex], coords[multiFeatureIndex][segmentIndex + 1]], properties, options);
      case "MultiPolygon":
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$lineString([coords[multiFeatureIndex][geometryIndex][segmentIndex], coords[multiFeatureIndex][geometryIndex][segmentIndex + 1]], properties, options);
    }
    throw new Error("geojson is invalid");
  }
  /**
  * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
  *
  * Negative indexes are permitted.
  *
  * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
  * @param {Object} [options={}] Optional parameters
  * @param {number} [options.featureIndex=0] Feature Index
  * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
  * @param {number} [options.geometryIndex=0] Geometry Index
  * @param {number} [options.coordIndex=0] Coord Index
  * @param {Object} [options.properties={}] Translate Properties to output Point
  * @param {BBox} [options.bbox={}] Translate BBox to output Point
  * @param {number|string} [options.id={}] Translate Id to output Point
  * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
  * @example
  * var multiLine = turf.multiLineString([
  *     [[10, 10], [50, 30], [30, 40]],
  *     [[-10, -10], [-50, -30], [-30, -40]]
  * ]);
  *
  * // First Segment (defaults are 0)
  * turf.findPoint(multiLine);
  * // => Feature<Point<[10, 10]>>
  *
  * // First Segment of the 2nd Multi-Feature
  * turf.findPoint(multiLine, {multiFeatureIndex: 1});
  * // => Feature<Point<[-10, -10]>>
  *
  * // Last Segment of last Multi-Feature
  * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
  * // => Feature<Point<[-30, -40]>>
  */
  function $cbbd2e42bceedf1f57ecf044e40594fe$export$findPoint(geojson, options) {
    // Optional Parameters
    options = options || ({});
    if (!$f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$isObject(options)) throw new Error("options is invalid");
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var coordIndex = options.coordIndex || 0;
    // Find FeatureIndex
    var properties = options.properties;
    var geometry;
    switch (geojson.type) {
      case "FeatureCollection":
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
      case "Feature":
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
      case "Point":
      case "MultiPoint":
        return null;
      case "LineString":
      case "Polygon":
      case "MultiLineString":
      case "MultiPolygon":
        geometry = geojson;
        break;
      default:
        throw new Error("geojson is invalid");
    }
    // Find Coord Index
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
      case "Point":
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$point(coords, properties, options);
      case "MultiPoint":
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$point(coords[multiFeatureIndex], properties, options);
      case "LineString":
        if (coordIndex < 0) coordIndex = coords.length + coordIndex;
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$point(coords[coordIndex], properties, options);
      case "Polygon":
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[geometryIndex].length + coordIndex;
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$point(coords[geometryIndex][coordIndex], properties, options);
      case "MultiLineString":
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex].length + coordIndex;
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$point(coords[multiFeatureIndex][coordIndex], properties, options);
      case "MultiPolygon":
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex][geometryIndex].length - coordIndex;
        return $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$point(coords[multiFeatureIndex][geometryIndex][coordIndex], properties, options);
    }
    throw new Error("geojson is invalid");
  }
  /*
  (c) 2013, Vladimir Agafonkin
  Simplify.js, a high-performance JS polyline simplification library
  mourner.github.io/simplify-js
  */
  // to suit your point format, run search/replace for '.x' and '.y';
  // for 3D version, see 3d branch (configurability would draw significant performance overhead)
  // square distance between 2 points
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$getSqDist(p1, p2) {
    var dx = p1.x - p2.x, dy = p1.y - p2.y;
    return dx * dx + dy * dy;
  }
  // square distance from a point to a segment
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$getSqSegDist(p, p1, p2) {
    var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y;
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
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyRadialDist(points, sqTolerance) {
    var prevPoint = points[0], newPoints = [prevPoint], point;
    for (var i = 1, len = points.length; i < len; i++) {
      point = points[i];
      if ($9143ed0117c5e2d9ab3ca2a3f322fc7d$var$getSqDist(point, prevPoint) > sqTolerance) {
        newPoints.push(point);
        prevPoint = point;
      }
    }
    if (prevPoint !== point) newPoints.push(point);
    return newPoints;
  }
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyDPStep(points, first, last, sqTolerance, simplified) {
    var maxSqDist = sqTolerance, index;
    for (var i = first + 1; i < last; i++) {
      var sqDist = $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$getSqSegDist(points[i], points[first], points[last]);
      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }
    if (maxSqDist > sqTolerance) {
      if (index - first > 1) $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyDPStep(points, first, index, sqTolerance, simplified);
      simplified.push(points[index]);
      if (last - index > 1) $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
  }
  // simplification using Ramer-Douglas-Peucker algorithm
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyDouglasPeucker(points, sqTolerance) {
    var last = points.length - 1;
    var simplified = [points[0]];
    $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);
    return simplified;
  }
  // both algorithms combined for awesome performance
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplify(points, tolerance, highestQuality) {
    if (points.length <= 2) return points;
    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;
    points = highestQuality ? points : $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyRadialDist(points, sqTolerance);
    points = $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyDouglasPeucker(points, sqTolerance);
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
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$export$default(geojson, options) {
    // Optional parameters
    options = options || ({});
    if (!$f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$isObject(options)) throw new Error("options is invalid");
    var tolerance = options.tolerance !== undefined ? options.tolerance : 1;
    var highQuality = options.highQuality || false;
    var mutate = options.mutate || false;
    if (!geojson) throw new Error("geojson is required");
    if (tolerance && tolerance < 0) throw new Error("invalid tolerance");
    // Clone geojson to avoid side effects
    if (mutate !== true) geojson = $8c01138d69d86724c8da3c490800a12e$export$default(geojson);
    $cbbd2e42bceedf1f57ecf044e40594fe$export$geomEach(geojson, function (geom) {
      $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyGeom(geom, tolerance, highQuality);
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
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyGeom(geometry, tolerance, highQuality) {
    var type = geometry.type;
    // "unsimplyfiable" geometry types
    if (type === "Point" || type === "MultiPoint") return geometry;
    // Remove any extra coordinates
    $3e976843cd4c9e77226d53aeaa1c1494$export$default(geometry, true);
    var coordinates = geometry.coordinates;
    switch (type) {
      case "LineString":
        geometry["coordinates"] = $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyLine(coordinates, tolerance, highQuality);
        break;
      case "MultiLineString":
        geometry["coordinates"] = coordinates.map(function (lines) {
          return $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyLine(lines, tolerance, highQuality);
        });
        break;
      case "Polygon":
        geometry["coordinates"] = $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyPolygon(coordinates, tolerance, highQuality);
        break;
      case "MultiPolygon":
        geometry["coordinates"] = coordinates.map(function (rings) {
          return $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyPolygon(rings, tolerance, highQuality);
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
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyLine(coordinates, tolerance, highQuality) {
    return $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplify(coordinates.map(function (coord) {
      return {
        x: coord[0],
        y: coord[1],
        z: coord[2]
      };
    }), tolerance, highQuality).map(function (coords) {
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
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplifyPolygon(coordinates, tolerance, highQuality) {
    return coordinates.map(function (ring) {
      var pts = ring.map(function (coord) {
        return {
          x: coord[0],
          y: coord[1]
        };
      });
      if (pts.length < 4) {
        throw new Error("invalid polygon");
      }
      var simpleRing = $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplify(pts, tolerance, highQuality).map(function (coords) {
        return [coords.x, coords.y];
      });
      // remove 1 percent of tolerance until enough points to make a triangle
      while (!$9143ed0117c5e2d9ab3ca2a3f322fc7d$var$checkValidity(simpleRing)) {
        tolerance -= tolerance * 0.01;
        simpleRing = $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$simplify(pts, tolerance, highQuality).map(function (coords) {
          return [coords.x, coords.y];
        });
      }
      if (simpleRing[simpleRing.length - 1][0] !== simpleRing[0][0] || simpleRing[simpleRing.length - 1][1] !== simpleRing[0][1]) {
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
  function $9143ed0117c5e2d9ab3ca2a3f322fc7d$var$checkValidity(ring) {
    if (ring.length < 3) return false;
    // if the last point is the same as the first, it's not a triangle
    return !(ring.length === 3 && ring[2][0] === ring[0][0] && ring[2][1] === ring[0][1]);
  }
  $2e9e6b6c3378724b336406626f99a6bc$init();
  class $2147282c6e9e52b3312598841166bcdb$export$default {
    /**
    * A class meant to handle processing of data used in the scatterplot.
    *
    * ** Can currently only handle data in a [-180,180] x [-90, 90] range due
    * to use of {@link Supercluster}. May need to switch to KDBush at some point.
    *
    * @param {Array} data the processor is meant to handle and index
    */
    constructor(schema) {
      this.schema = this.index = new $df8fb0a35aa61306982e223b3fdb50ad$export$default();
      console.log("Loading data...");
      new ($647b390bbe26a1e6bbc6a8c9e19f41d2$init().default)(schema, this.indexData.bind(this));
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
      if (schemaHelper.xScale instanceof $2e9e6b6c3378724b336406626f99a6bc$init().GenomeScale) {
        modifyGeometry = point => {
          point.geometry.coordinates[0] = schemaHelper.xScale.toClipSpaceFromParts(point.geometry.coordinates[0][0], point.geometry.coordinates[0][1]);
        };
      }
      if (schemaHelper.yScale instanceof $2e9e6b6c3378724b336406626f99a6bc$init().GenomeScale) {
        // This is a way to check if x is also a genome scale, so we don't
        // include instanceof checks in the data loop
        if (modifyGeometry) {
          // x dimension is also a genome scale
          (point => {
            point.geometry.coordinates = [schemaHelper.xScale.toClipSpaceFromParts(point.geometry.coordinates[0][0], point.geometry.coordinates[0][1]), schemaHelper.yScale.toClipSpaceFromParts(point.geometry.coordinates[0][0], point.geometry.coordinates[0][1])];
          });
        } else {
          modifyGeometry = point => {
            point.geometry.coordinates[1] = schemaHelper.yScale.toClipSpaceFromParts(point.geometry.coordinates[0][0], point.geometry.coordinates[0][1]);
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
      schemaHelper.tracks.filter(track => track.hasOwnData).forEach(track => {
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
      const candidatePoints = this.index.getClusters([point[0] - 0.01, point[1] - 0.01, point[0] + 0.01, point[1] + 0.01], zoom);
      let closestPoint;
      let distanceToClosestPoint;
      for (const candidate of candidatePoints) {
        const dist = (candidate.geometry.coordinates[0] - point[0]) ** 2 + (candidate.geometry.coordinates[1] - point[1]) ** 2;
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
      polygonPoints.push([...polygonPoints[0]]);
      // First and last must be same position
      const candidatePoints = this.index.getClusters([smallestX, smallestY, largestX, largestY], zoom);
      const boundingPolygon = $f8afcd2ffd7e50afc2a4e6a9d6a8cb31$export$polygon([polygonPoints]);
      const simplifiedBoundingPolygon = $9143ed0117c5e2d9ab3ca2a3f322fc7d$export$default(boundingPolygon, {
        tolerance: 0.01,
        highQuality: false
      });
      return candidatePoints.filter(point => {
        return $bd7e548c741d8ed512ad135051375ae7$export$default(point.geometry.coordinates, simplifiedBoundingPolygon);
      });
    }
  }
  self.onmessage = message => {
    switch (message.data.type) {
      case "init":
        self.processor = new $2147282c6e9e52b3312598841166bcdb$export$default(message.data.schema);
        break;
      case "selectBox":
        postMessage({
          type: message.data.type,
          selection: self.processor.selectBox(message.data.points),
          bounds: message.data.points
        });
        break;
      case "selectLasso":
        postMessage({
          type: message.data.type,
          selection: self.processor.selectLasso(message.data.points),
          bounds: message.data.points
        });
        break;
      case "getClosestPoint":
        postMessage({
          type: message.data.type,
          point: self.processor.getClosestPoint(message.data.point)
        });
        break;
      default:
        console.error(`Received unknown message type: ${message.type}`);
    }
  };
})();

//# sourceMappingURL=data-processor-worker.6cc8b5b6.js.map
