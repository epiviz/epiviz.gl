import Supercluster from "supercluster";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { polygon } from "@turf/helpers";
import simplify from "@turf/simplify";

class DataProcessor {
  // Can currently only handle data in a [-180, 180] x [-90, 90] range
  /**
   * A class meant to handle processing of data used in the scatterplot.
   *
   * ** Can currently only handle data in a [-180,180] x [-90, 90] range due
   * to use of {@link Supercluster}. May need to switch to KDBush at some point.
   *
   * @param {Array} data the processor is meant to handle and index
   * @param {Function} mapPointToSpace a function that takes an element
   *  from the data and maps it to an array with three elements such that
   *  the first two elements correspond to a coordinate in 2D space, and
   *  the third element is an object containing item metadata.
   */
  constructor(data, mapPointToSpace) {
    this.index = new Supercluster();
    this.points = [];

    console.log("Reading data...");
    data.forEach((row) => {
      const mapped = mapPointToSpace(row);
      this.points.push({
        geometry: {
          coordinates: mapped.slice(0, 2),
        },
        ...mapped[2],
      });
    });

    console.log("Indexing data...");
    this.index.load(this.points);

    console.log("Data ready.");
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

    polygonPoints.push([...polygonPoints[0]]); // First and last must be same position

    const candidatePoints = this.index.getClusters(
      [smallestX, smallestY, largestX, largestY],
      zoom
    );

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
