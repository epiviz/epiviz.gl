import Supercluster from "supercluster";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { polygon } from "@turf/helpers";
import simplify from "@turf/simplify";
import { deserialize } from "./utilities";

class DataProcessor {
  // Can currently only handle data in a [-180, 180] x [-90, 90] range
  constructor(data, mapPointToSpace) {
    this.index = new Supercluster();
    this.points = [];

    const mapper = deserialize(mapPointToSpace);

    console.log("Reading data...");
    data.forEach((row) => {
      this.points.push({
        geometry: {
          coordinates: mapper(row),
        },
      });
    });

    console.log("Indexing data...");
    this.index.load(this.points);

    console.log("Data ready.");
  }

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

  selectBox(points, zoom = 16) {
    const smallerX = Math.min(points[0], points[2]);
    const smallerY = Math.min(points[1], points[3]);
    const largerX = Math.max(points[0], points[2]);
    const largerY = Math.max(points[1], points[3]);

    return this.index.getClusters([smallerX, smallerY, largerX, largerY], zoom);
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
