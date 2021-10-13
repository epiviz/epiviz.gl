import "./offscreen-webgl-worker.e8c441ad.js";
import $4RALn$flatbush from "flatbush";
import $4RALn$turfbooleanpointinpolygon from "@turf/boolean-point-in-polygon";
import {polygon as $4RALn$polygon} from "@turf/helpers";
import $4RALn$turfsimplify from "@turf/simplify";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire9975"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire9975"] = parcelRequire;
}
import "./offscreen-webgl-worker.e8c441ad.js";
parcelRequire.register("1gKLQ", function(module, exports) {

var $f7SeR = parcelRequire("f7SeR");
self.onmessage = (message)=>{
    switch(message.data.type){
        case "init":
            self.processor = new $f7SeR.default(message.data.specification);
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

});
parcelRequire.register("f7SeR", function(module, exports) {

$parcel$export(module.exports, "default", () => $b031951f7e49db88$export$9099ad97b570f7c);

var $6Izoz = parcelRequire("6Izoz");





var $k8JKT = parcelRequire("k8JKT");
class $b031951f7e49db88$var$DataProcessor {
    /**
   * A class meant to handle processing of data used in the scatterplot.
   *
   * @param {Array} data the processor is meant to handle and index
   */ constructor(specification){
        this.specification = specification;
        console.log("Loading data...");
        new $6Izoz.default(specification, this.indexData.bind(this));
    }
    /**
   * Callback function that occurs after the specification processor has loaded the appropriate data
   *
   * @param {SpecificationProcessor} specificationHelper that is built in the constructor
   */ indexData(specificationHelper) {
        let totalPoints = 0;
        for (const track of specificationHelper.tracks)if (!track.hasOwnData) {
            // index at 1 means a header needs to be skipped
            totalPoints += track.index === 1 ? track.data.length - 1 : track.data.length;
            break;
        }
        specificationHelper.tracks.filter((track1)=>track1.hasOwnData
        ).forEach((track1)=>totalPoints += track1.index === 1 ? track1.data.length - 1 : track1.data.length
        );
        this.index = new $4RALn$flatbush(totalPoints);
        this.data = [];
        console.log("Reading data...");
        // Process the global data in the specification processor
        if (specificationHelper.data) {
            for (let track1 of specificationHelper.tracks)if (!track1.hasOwnData) {
                const geometryMapper = new $k8JKT.default(specificationHelper, track1);
                let currentPoint = track1.getNextDataPoint();
                while(currentPoint){
                    geometryMapper.modifyGeometry(currentPoint.geometry);
                    this.data[this.index.add(currentPoint.geometry.coordinates[0], currentPoint.geometry.coordinates[1], currentPoint.geometry.coordinates[0] + currentPoint.geometry.dimensions[0], currentPoint.geometry.coordinates[1] + currentPoint.geometry.dimensions[1])] = currentPoint;
                    currentPoint = track1.getNextDataPoint();
                }
                break;
            }
        }
        // Process the data that is local to each track
        specificationHelper.tracks.filter((track1)=>track1.hasOwnData
        ).forEach((track1)=>{
            const geometryMapper = new $k8JKT.default(specificationHelper, track1);
            let currentPoint = track1.getNextDataPoint();
            while(currentPoint){
                geometryMapper.modifyGeometry(currentPoint.geometry);
                this.data[this.index.add(currentPoint.geometry.coordinates[0], currentPoint.geometry.coordinates[1], currentPoint.geometry.coordinates[0] + currentPoint.geometry.dimensions[0], currentPoint.geometry.coordinates[1] + currentPoint.geometry.dimensions[1])] = currentPoint;
                currentPoint = track1.getNextDataPoint();
            }
        });
        console.log("Indexing data...");
        this.index.finish();
        console.log("Data processing complete.");
    }
    /**
   * Find the closest point in the data to a given point. Only finds point if it is
   * sufficiently close.
   *
   * @param {Array} point of two floats to find closest point to
   * @returns closest point or undefined
   */ getClosestPoint(point) {
        return this.data[this.index.neighbors(point[0], point[1], 1)];
    }
    /**
   * Get points within a bounding box.
   *
   * @param {Array} points Bounding rectangle in the format of [x1, y1, x2, y2]
   * @returns points in bounding box
   */ selectBox(points) {
        const smallerX = Math.min(points[0], points[2]);
        const smallerY = Math.min(points[1], points[3]);
        const largerX = Math.max(points[0], points[2]);
        const largerY = Math.max(points[1], points[3]);
        return this.index.search(smallerX, smallerY, largerX, largerY).map((i)=>this.data[i]
        );
    }
    /**
   * Select points inside a given polygon. Simplify polygon with {@link @turf/simplify}
   * which may cause precision issues with very complex polygons. Uses {@link turf}
   * to determine what points are in polygon.
   *
   * @param {Array} points of a polygon to select points format: [x1,y1,x2,y2,x3,y3,...]
   * @returns points inside lasso
   */ selectLasso(points) {
        let smallestX = Number.POSITIVE_INFINITY;
        let largestX = Number.NEGATIVE_INFINITY;
        let smallestY = Number.POSITIVE_INFINITY;
        let largestY = Number.NEGATIVE_INFINITY;
        const polygonPoints = [];
        for(let i = 0; i < points.length; i += 2){
            if (points[i] < smallestX) smallestX = points[i];
            if (points[i] > largestX) largestX = points[i];
            if (points[i + 1] < smallestY) smallestY = points[i + 1];
            if (points[i + 1] > largestY) largestY = points[i + 1];
            polygonPoints.push([
                points[i],
                points[i + 1]
            ]);
        }
        polygonPoints.push([
            ...polygonPoints[0]
        ]); // First and last must be same position
        const candidatePoints = this.selectBox([
            smallestX,
            smallestY,
            largestX,
            largestY, 
        ]);
        const boundingPolygon = $4RALn$polygon([
            polygonPoints
        ]);
        const simplifiedBoundingPolygon = $4RALn$turfsimplify(boundingPolygon, {
            tolerance: 0.01,
            highQuality: false
        });
        return candidatePoints.filter((point)=>{
            return $4RALn$turfbooleanpointinpolygon(point.geometry.coordinates, simplifiedBoundingPolygon);
        });
    }
}
var $b031951f7e49db88$export$9099ad97b570f7c = $b031951f7e49db88$var$DataProcessor;

});
parcelRequire.register("k8JKT", function(module, exports) {

$parcel$export(module.exports, "default", () => $ea980c0fb6ed0c6a$export$9099ad97b570f7c);

var $lHxH2 = parcelRequire("lHxH2");

var $cwgQF = parcelRequire("cwgQF");
class $ea980c0fb6ed0c6a$var$GeometryMapper {
    /**
   * A class meant to modify data points from the getNextDataPoint method of the {@link Track} object
   * to geometries that coincide with their visibility on the canvas i.e. with a proper width, height,
   * x and y. This class is NOT meant to be used by the WebGLDrawer for rendering. It is solely used
   * by the DataProcessor to properly index the data.
   *
   * @param {SpecificationProcessor} specificationObject of the visualization for these geometries
   * @param {Track} trackObject containing track info for track that these geometries are a part of
   */ constructor(specificationObject, trackObject){
        this.specificationObject = specificationObject;
        this.trackObject = trackObject;
        this.track = trackObject.track;
        this.xScale = this.specificationObject.xScale;
        this.yScale = this.specificationObject.yScale;
        const viewportForSpecification = $cwgQF.getViewportForSpecification(specificationObject.specification);
        if (specificationObject.xScale.isGenomeScale) this.xDomainWidth = 1;
        else this.xDomainWidth = (viewportForSpecification[1] - viewportForSpecification[0]) / 2;
        if (specificationObject.yScale.isGenomeScale) this.yDomainHeight = 1;
        else this.yDomainHeight = (viewportForSpecification[3] - viewportForSpecification[2]) / 2;
    }
    /**
   * Modifies a geometry object in place based on the specification.
   *
   * @param {Object} geometry an object of the form {dimensions: Array(2), coordinates: Array(2)}
   */ modifyGeometry(geometry) {
        if (this.xScale.isGenomeScale) {
            // transforms x part into a standard format
            if (this.trackObject.track.x.type === "genomicRange") this._modifyGenomicRangeX(geometry);
            geometry.coordinates[0] = this.xScale(geometry.coordinates[0]);
        }
        this._modifyStandardX(geometry);
        if (this.yScale.isGenomeScale) {
            // transforms y part into a standard format
            if (this.trackObject.track.y.type === "genomicRange") this._modifyGenomicRangeY(geometry);
            geometry.coordinates[1] = this.yScale(geometry.coordinates[1]);
        }
        this._modifyStandardY(geometry);
    }
    _modifyStandardX(geometry) {
        if (geometry.dimensions[0]) // Transform width from the data point into visible width on the canvas
        geometry.dimensions[0] *= this.xDomainWidth * $lHxH2.SIZE_UNITS;
        // If there is no width, give very small width for flatbush indexing
        geometry.dimensions[0] = geometry.dimensions[0] || 0.0000000001;
    }
    _modifyStandardY(geometry) {
        if (geometry.dimensions[1]) // Transform height from the data point into visible height on the canvas
        geometry.dimensions[1] *= this.yDomainHeight * $lHxH2.SIZE_UNITS;
        // If there is no height, give very small height for flatbush indexing
        geometry.dimensions[1] = geometry.dimensions[1] || 0.0000000001;
    }
    _modifyGenomicRangeX(geometry) {
        if (this.trackObject.track.mark === "arc") {
            /**
       * Geometry is in the form
       * {
       *   coordinates: [[[chr1,gene1], [chr2,gene2]], <y-coord handled in _modifyGenomicRangeY>]
       *   dimensions: [[[chr3,gene3], [chr3,gene3]], <height handled in _modifyGenomicRangeY>]
       * }
       *
       * and is transformed to
       * {
       *   coordinates: [x-coord between -1 and 1, <y handled elsewhere>]
       *   dimensions: [width, <height handled elsewhere>]
       * }
       */ const standardized = $lHxH2.transformGenomicRangeArcToStandard({
                x: geometry.coordinates[0],
                y: 0,
                width: geometry.dimensions[0],
                height: 0
            }, this.specificationObject.xScale, this.specificationObject.yScale);
            geometry.coordinates[0] = standardized.x;
            geometry.dimensions[0] = standardized.width;
        } else {
            /**
       * Geometry is in the form
       * {
       *   coordinates: [[[chr1,gene1], [chr2,gene2]], <y-coord handled in _modifyGenomicRangeY>]
       *   dimensions: [<ignored value>, <height handled elsewhere>]
       * }
       *
       * and is transformed to
       * {
       *   coordinates: [x-coord between -1 and 1, <y handled elsewhere>]
       *   dimensions: [width, <height handled elsewhere>]
       * }
       */ const standardized = $lHxH2.transformGenomicRangeToStandard({
                x: geometry.coordinates[0],
                y: 0
            }, this.specificationObject.xScale, this.specificationObject.yScale);
            geometry.coordinates[0] = standardized.x;
            geometry.dimensions[0] = standardized.width;
        }
    }
    _modifyGenomicRangeY(geometry) {
        // See comments in _modifyGenomicRangeX
        if (this.trackObject.track.mark === "arc") {
            const standardized = $lHxH2.transformGenomicRangeArcToStandard({
                x: 0,
                y: geometry.coordinates[1],
                width: 0,
                height: geometry.coordinates[1]
            }, this.specificationObject.xScale, this.specificationObject.yScale);
            geometry.coordinates[1] = standardized.y;
            geometry.dimensions[1] = standardized.height;
        } else {
            const standardized = $lHxH2.transformGenomicRangeToStandard({
                x: 0,
                y: geometry.coordinates[1]
            }, this.specificationObject.xScale, this.specificationObject.yScale);
            geometry.coordinates[1] = standardized.y;
            geometry.dimensions[1] = standardized.height;
        }
    }
}
var $ea980c0fb6ed0c6a$export$9099ad97b570f7c = $ea980c0fb6ed0c6a$var$GeometryMapper;

});




parcelRequire("1gKLQ");

//# sourceMappingURL=data-processor-worker.f54163b0.js.map
