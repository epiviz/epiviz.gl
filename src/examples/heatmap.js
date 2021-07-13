import csv from "url:../data/heatmap.csv";

export default JSON.stringify(
  {
    xAxis: "top",
    defaultData: csv,
    tracks: [
      {
        tooltips: 1,
        mark: "rect",
        x: {
          attribute: "sample",
          type: "categorical",
          cardinality: 4,
          scale: "linear",
        },
        y: {
          attribute: "subject",
          type: "categorical",
          cardinality: 4,
          scale: "linear",
        },
        color: {
          attribute: "strength",
          type: "quantitative",
          domain: [0, 1],
          colorScheme: "interpolateReds",
        },
        width: {
          value: 200 / 4, // 200 divided by x cardinality will produce flush rects
        },
        height: {
          value: 200 / 4, // 200 divided by y cardinality will produce flush rects
        },
      },
    ],
  },
  null,
  2
);
