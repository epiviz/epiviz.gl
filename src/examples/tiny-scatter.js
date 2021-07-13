export default JSON.stringify(
  {
    defaultData: ["day,price", "1,10", "2,22", "3,35", "4,20"],
    tracks: [
      {
        tooltips: 1,
        mark: "point",
        layout: "linear",
        x: {
          attribute: "day",
          type: "quantitative",
          domain: [0, 5],
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
