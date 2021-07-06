import signals from "url:../data/signals.csv";

export default JSON.stringify(
  {
    defaultData: signals,
    tracks: [
      {
        tooltips: 1,
        mark: "tick",
        layout: "linear",
        x: {
          attribute: "time",
          type: "quantitative",
          domain: [0, 10],
          axis: "top",
        },
        y: {
          attribute: "sample",
          type: "categorical",
          cardinality: 3,
          axis: "left",
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
