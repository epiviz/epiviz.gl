import Supercluster from "supercluster";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { polygon } from "@turf/helpers";

class DataProcessor {
  constructor(data) {
    this.index = new Supercluster();
    this.points = [];
    // specific to t-SNE

    console.log("Reading data...");
    data.split("\n").forEach((line) => {
      const parts = line.split(",");
      const x = parseFloat(parts[1]);
      const y = parseFloat(parts[2]);
      if (!parts[0] || isNaN(x) || isNaN(y)) {
        return;
      }
      this.points.push({
        geometry: {
          coordinates: [x, y],
          sample: parts[0],
        },
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

    console.log(
      this.index.getClusters([smallerX, smallerY, largerX, largerY], zoom)
    );
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

    console.log(
      candidatePoints.filter((point) => {
        return booleanPointInPolygon(
          point.geometry.coordinates,
          boundingPolygon
        );
      })
    );
  }
}

export default DataProcessor;
