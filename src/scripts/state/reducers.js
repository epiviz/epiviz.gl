import { combineReducers, createSlice } from "@reduxjs/toolkit";
import csv10 from "url:../../data/tsne_tenth.csv";

const controlsSlice = createSlice({
  name: "controls",
  initialState: {
    tool: "pan",
    dataset: csv10,
    lockedX: false,
    lockedY: false,
    viewport: {
      minX: -10,
      maxX: 10,
      minY: -10,
      maxY: 10,
      xRange: [-5, 5],
      yRange: [-5, 5],
    },
    selectionPoints: [],
  },
  reducers: {
    setDataset(state, action) {
      state.dataset = action.payload;
    },

    setTool(state, action) {
      state.tool = action.payload;
    },

    setScroll(state, action) {
      if (action.payload.axis === "x") {
        state.lockedX = action.payload.checked;
      } else if (action.payload.axis === "y") {
        state.lockedY = action.payload.checked;
      }
    },

    setViewport(state, action) {
      state.viewport = action.payload;
    },

    clearSelectionPoints(state) {
      state.selectionPoints = [];
    },

    addSelectionPoint(state, action) {
      state.selectionPoints.push(...action.payload);
    },

    setSecondSelectionPoint(state, action) {
      state.selectionPoints = state.selectionPoints
        .slice(0, 2)
        .concat(action.payload);
    },
  },
});

export const {
  setDataset,
  setTool,
  setScroll,
  setViewport,
  addSelectionPoint,
  clearSelectionPoints,
  setSecondSelectionPoint,
} = controlsSlice.actions;

const rootReducer = combineReducers({
  controls: controlsSlice.reducer,
});

export default rootReducer;
