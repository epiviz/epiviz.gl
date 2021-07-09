import SchemaProcessor from "./schema-processor";

import Supercluster from "supercluster";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { polygon } from "@turf/helpers";
import simplify from "@turf/simplify";
import { GenomeScale } from "./genome-sizes";

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

    new SchemaProcessor(schema, this.indexData.bind(this));
  }

  indexData(schemaHelper) {
    this.points = [];
    let modifyGeometry;

    if (schemaHelper.xScale instanceof GenomeScale) {
      modifyGeometry = (point) => {
        point.geometry.coordinates[0] =
          schemaHelper.xScale.toClipSpaceFromParts(
            point.geometry.coordinates[0][0],
            point.geometry.coordinates[0][1]
          );
      };
    }

    if (schemaHelper.yScale instanceof GenomeScale) {
      if (modifyGeometry) {
        // x dimension is also a genome scale
        (point) => {
          point.geometry.coordinates = [
            schemaHelper.xScale.toClipSpaceFromParts(
              point.geometry.coordinates[0][0],
              point.geometry.coordinates[0][1]
            ),
            schemaHelper.yScale.toClipSpaceFromParts(
              point.geometry.coordinates[0][0],
              point.geometry.coordinates[0][1]
            ),
          ];
        };
      } else {
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

    if (schemaHelper.data) {
      for (let track of schemaHelper.tracks) {
        if (!track.hasOwnData) {
          let currentPoint = track.getNextDataPoint();
          while (currentPoint) {
            if (modifyGeometry) {
              modifyGeometry(currentPoint);
            }
            this.points.push(currentPoint);
            currentPoint = track.getNextDataPoint();
          }
          break;
        }
      }
    }
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

    console.log(this.points);
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
