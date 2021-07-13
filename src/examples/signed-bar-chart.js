export default JSON.stringify(
  {
    defaultData: [
      "x,y,type",
      "1,10,a",
      "2,-10,b",
      "3,5,c",
      "4,15,b",
      "5,-15,a",
      "6,-1,c",
      "7,1,b",
      "8,15,c",
    ],
    xAxis: "zero",
    yAxis: "right",
    tracks: [
      {
        tooltips: 1,
        mark: "rect",
        layout: "linear",
        x: {
          attribute: "x",
          type: "quantitative",
          domain: [0, 10],
        },
        y: {
          value: 0,
          scale: "linear",
        },
        color: {
          attribute: "type",
          type: "categorical",
          cardinality: 3,
        },
        width: {
          value: 10,
        },
        height: {
          attribute: "y",
          type: "quantitative",
          domain: [-20, 20],
          minHeight: -100,
          maxHeight: 100,
        },
      },
    ],
  },
  null,
  2
);
