import signals from "url:../data/signals.csv";

export default JSON.stringify(
  {
    defaultData: signals,
    xAxis: "top",
    yAxis: "left",
    tracks: [
      {
        tooltips: 1,
        mark: "tick",
        layout: "linear",
        x: {
          attribute: "time",
          type: "quantitative",
          domain: [0, 10],
        },
        y: {
          attribute: "sample",
          type: "categorical",
          cardinality: 3,
        },
        color: {
          attribute: "strength",
          type: "quantitative",
          domain: [0, 1],
          colorScheme: "interpolateCool",
        },
        height: {
          value: 10,
        },
      },
    ],
  },
  null,
  2
);
