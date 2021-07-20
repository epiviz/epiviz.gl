import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer });

let previousValues = {};
/**
 * This utility method is meant to check if a part of the state in the global
 * store has changed since it was last called. It is useful in a store subscription
 * for updating components. Typically this would be done automatically by
 * react-redux or something else, but we do it ourselves. The main purpose is to
 * keep the redux pattern of only calling dispatch throughout the application,
 * and calling getState inside subscriptions only.
 *
 * @param {String} key of the state from the store
 * @returns null if value at key has not changed, the new value otherwise
 */
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
