import csv from "url:./data/tsne.csv";

export default JSON.stringify(
  {
    xAxis: "none",
    yAxis: "none",
    defaultData: csv,
    tracks: [
      {
        tooltips: 0.01,
        mark: "point",
        layout: "linear",
        x: {
          attribute: "x",
          type: "quantitative",
          domain: [-10, 10],
          scale: "linear",
        },
        y: {
          attribute: "y",
          type: "quantitative",
          domain: [-10, 10],
          scale: "linear",
        },
        color: {
          attribute: "sample",
          type: "categorical",
          cardinality: 32,
          colorScheme: "interpolateRainbow",
        },
        opacity: { value: 0.7 },
      },
    ],
  },
  null,
  2
);
