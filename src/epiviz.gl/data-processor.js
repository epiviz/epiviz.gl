import SpecificationProcessor from "./specification-processor";

import Flatbush from "flatbush";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { polygon } from "@turf/helpers";
import simplify from "@turf/simplify";
import GeometryMapper from "./geometry-mapper";

class DataProcessor {
  /**
   * A class meant to handle processing of data used in the scatterplot.
   *
   * @param {Array} data the processor is meant to handle and index
   */
  constructor(specification) {
    this.specification = specification;

    console.log("Loading data...");

    new SpecificationProcessor(specification, this.indexData.bind(this));
  }

  /**
   * Callback function that occurs after the specification processor has loaded the appropriate data
   *
   * @param {SpecificationProcessor} specificationHelper that is built in the constructor
   */
  indexData(specificationHelper) {
    let totalPoints = 0;

    for (const track of specificationHelper.tracks) {
      if (!track.hasOwnData) {
        // index at 1 means a header needs to be skipped
        totalPoints +=
          track.index === 1 ? track.data.length - 1 : track.data.length;
        break;
      }
    }
    specificationHelper.tracks
      .filter((track) => track.hasOwnData)
      .forEach(
        (track) =>
          (totalPoints +=
            track.index === 1 ? track.data.length - 1 : track.data.length)
      );

    this.index = new Flatbush(totalPoints);
    this.data = [];
    console.log("Reading data...");

    // Process the global data in the specification processor
    if (specificationHelper.data) {
      for (let track of specificationHelper.tracks) {
        if (!track.hasOwnData) {
          const geometryMapper = new GeometryMapper(specificationHelper, track);

          let currentPoint = track.getNextDataPoint();
          while (currentPoint) {
            geometryMapper.modifyGeometry(currentPoint.geometry);

            this.data[
              this.index.add(
                currentPoint.geometry.coordinates[0],
                currentPoint.geometry.coordinates[1],
                currentPoint.geometry.coordinates[0] +
                  currentPoint.geometry.dimensions[0],
                currentPoint.geometry.coordinates[1] +
                  currentPoint.geometry.dimensions[1]
              )
            ] = currentPoint;

            currentPoint = track.getNextDataPoint();
          }
          break;
        }
      }
    }

    // Process the data that is local to each track
    specificationHelper.tracks
      .filter((track) => track.hasOwnData)
      .forEach((track) => {
        const geometryMapper = new GeometryMapper(specificationHelper, track);

        let currentPoint = track.getNextDataPoint();
        while (currentPoint) {
          geometryMapper.modifyGeometry(currentPoint.geometry);

          this.data[
            this.index.add(
              currentPoint.geometry.coordinates[0],
              currentPoint.geometry.coordinates[1],
              currentPoint.geometry.coordinates[0] +
                currentPoint.geometry.dimensions[0],
              currentPoint.geometry.coordinates[1] +
                currentPoint.geometry.dimensions[1]
            )
          ] = currentPoint;

          currentPoint = track.getNextDataPoint();
        }
      });

    console.log("Indexing data...");
    this.index.finish();

    console.log("Data processing complete.");
  }

  /**
   * Find the closest point in the data to a given point.
   *
   * @param {Array} point of two floats to find closest point to
   * @param {Number} maxDistance only check points within a max distance
   * @returns closest point or undefined
   */
  getClosestPoint(point, maxDistance) {
    return this.data[
      this.index.neighbors(
        point[0],
        point[1],
        1,
        maxDistance === undefined ? Infinity : maxDistance
      )
    ];
  }

  /**
   * Get points within a bounding box.
   *
   * @param {Array} points Bounding rectangle in the format of [x1, y1, x2, y2]
   * @returns points in bounding box
   */
  selectBox(points) {
    const smallerX = Math.min(points[0], points[2]);
    const smallerY = Math.min(points[1], points[3]);
    const largerX = Math.max(points[0], points[2]);
    const largerY = Math.max(points[1], points[3]);

    return this.index
      .search(smallerX, smallerY, largerX, largerY)
      .map((i) => this.data[i]);
  }

  /**
   * Select points inside a given polygon. Simplify polygon with {@link @turf/simplify}
   * which may cause precision issues with very complex polygons. Uses {@link turf}
   * to determine what points are in polygon.
   *
   * @param {Array} points of a polygon to select points format: [x1,y1,x2,y2,x3,y3,...]
   * @returns points inside lasso
   */
  selectLasso(points) {
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

    const candidatePoints = this.selectBox([
      smallestX,
      smallestY,
      largestX,
      largestY,
    ]);

    const boundingPolygon = polygon([polygonPoints]);

    const simplifiedBoundingPolygon = simplify(boundingPolygon, {
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

export default DataProcessor;
