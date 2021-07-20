const buildGrid = (cellsPerRow) => {
  const toReturn = [];
  for (let i = 0; i < cellsPerRow; i++) {
    for (let j = 0; j < cellsPerRow; j++) {
      toReturn.push(`${i / cellsPerRow},${j / cellsPerRow}`);
    }
  }
  return toReturn;
};

export default JSON.stringify(
  {
    margins: { top: "2em", bottom: "100px", left: "5%", right: "1em" },
    defaultData: ["x,y"].concat(buildGrid(5)),
    tracks: [
      {
        tooltips: 1,
        mark: "point",
        x: {
          attribute: "x",
          type: "quantitative",
          domain: [0, 1],
        },
        y: {
          attribute: "y",
          type: "quantitative",
          domain: [0, 1],
        },
        size: {
          value: 5,
        },
      },
    ],
  },
  null,
  2
);
