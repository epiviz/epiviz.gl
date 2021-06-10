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

  selectBox(bbox, zoom = 16) {
    console.log(bbox);
    console.log(this.index.getClusters(bbox, zoom));
    // return this.index.getClusters(bbox, zoom);
  }

  selectLasso(data, zoom = 16) {}
}

export default DataProcessor;
