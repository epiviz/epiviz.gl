export default JSON.stringify(
  {
    xAxis: "top",
    yAxis: "right",
    tracks: [
      {
        order: 1,
        data: ["day,price", "1,5", "2,15", "3,30"],
        tooltips: 1,
        mark: "area",
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
      {
        order: 2,
        data: ["day,price", "1,15", "2,25", "3,40"],
        tooltips: 1,
        mark: "area",
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
          value: "green",
        },
        shape: {
          value: "diamond",
        },
      },
    ],
  },
  null,
  2
);
