import strawberries from "url:./data/strawberries.csv";

export default JSON.stringify(
  {
    defaultData: strawberries,
    tracks: [
      {
        tooltips: 1,
        mark: "line",
        layout: "linear",
        x: {
          attribute: "day",
          type: "quantitative",
          domain: [1, 10],
        },
        y: {
          attribute: "price",
          type: "quantitative",
          domain: [0, 40],
          scale: "linear",
        },
        color: {
          value: "red",
        },
        shape: {
          value: "circle",
        },
      },
    ],
  },
  null,
  2
);
