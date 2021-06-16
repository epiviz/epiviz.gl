import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer });

let previousValues = {};
const getIfChanged = (key) => {
  const currValue = store.getState()[key];
  if (key in previousValues) {
    if (previousValues[key] === currValue) {
      return null;
    } else {
      previousValues[key] = currValue;
    }
    return store.getState()[key];
  } else {
    previousValues[key] = currValue;
  }
};

export { getIfChanged };
export default store;
