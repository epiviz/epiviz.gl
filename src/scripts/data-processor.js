import Supercluster from "supercluster";

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

  selectLasso(data, zoom = 16) {}
}

export default DataProcessor;
