import Toolbar from "./toolbar";
import Handler from "./handler";
import store, { getIfChanged } from "./state/store";

import csv100 from "url:../data/tsne_hundreth.csv";

import { setDataset } from "./state/reducers";

const axios = require("axios");

class App {
  /*
      The App class is meant to emulate an app that may use the webgl canvas as a component
  */
  constructor() {
    this.container = document.querySelector(".rendering-container");

    this.handler = new Handler(this.container);
    this.handler.setOptions({
      viewport: [-10, 10, -10, 10],
      currentXRange: [-5, 5],
      currentYRange: [-5, 5],
    });

    this.handler.addToDOM();

    this.store = store;
    this.store.subscribe(this.subscription.bind(this));
    this.store.dispatch(setDataset(csv100));

    this.toolbar = new Toolbar(this.store.dispatch);
    this.toolbar.init();
  }

  subscription() {
    const currState = this.store.getState();
    const dataset = getIfChanged("dataset");
    if (dataset) {
      console.log(`Loading ${dataset} ...`);
      axios.get(dataset).then((response) => {
        console.log("Loaded");
        this.handler.setData(
          response.data
            .split("\n")
            .slice(1)
            .map((csvStr) => csvStr.split(",")),
          (row) =>
            // row is a single element of the array passed above, users choose what row looks like by passing the array in the format they wish
            [parseFloat(row[1]), parseFloat(row[2])],
          (row) => 16777215 // mapping row to color should return hex code as integer
        );
      });
    }

    this.handler.setOptions({ ...currState });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
