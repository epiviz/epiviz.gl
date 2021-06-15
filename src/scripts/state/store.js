import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer });

const getIfChangedReducer = (reducer) => {
  let previousValues = { [reducer]: {} };
  return (key) => {
    const currValue = store.getState()[reducer][key];
    if (key in previousValues[reducer]) {
      if (previousValues[reducer][key] === currValue) {
        return null;
      } else {
        previousValues[reducer][key] = currValue;
      }
      return store.getState()[reducer][key];
    } else {
      previousValues[reducer][key] = currValue;
    }
  };
};

export { getIfChangedReducer };
export default store;
