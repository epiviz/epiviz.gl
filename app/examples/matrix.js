import csv from "url:./data/matrix.csv";

export default JSON.stringify(
  {
    margins: {
      left: "10%",
    },
    xAxis: "top",
    yAxis: "left",
    defaultData: csv,
    tracks: [
      {
        mark: "tick",
        x: {
          attribute: "x",
          type: "quantitative",
          domain: [0, 32738],
        },
        y: {
          attribute: "y",
          type: "quantitative",
          domain: [0, 2700],
        },
        color: {
          attribute: "value",
          type: "quantitative",
          domain: [0, 100],
          colorScheme: "interpolateReds",
        },
        opacity: {
          attribute: "value",
          type: "quantitative",
          minOpacity: 0.1,
          domain: [0, 100],
        },
        height: {
          value: 200 / 2700,
        },
        size: {
          value: 200 / 2700, // 200 divided by x cardinality will produce flush rects
        },
      },
    ],
  },
  null,
  2
);
