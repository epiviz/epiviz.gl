import csv10 from "url:./data/tsne_tenth.csv";

export default JSON.stringify(
  {
    defaultData: csv10,
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
        opacity: { value: 0.05 },
      },
    ],
  },
  null,
  2
);
