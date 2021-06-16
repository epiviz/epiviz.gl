import { createSlice } from "@reduxjs/toolkit";
import csv10 from "url:../../data/tsne_tenth.csv";

const controlsSlice = createSlice({
  name: "webglControls",
  initialState: {
    tool: "pan",
    dataset: csv10,
    lockedX: false,
    lockedY: false,
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
  setSelectionQueried,
  setTooltipAnchor,
} = controlsSlice.actions;

export default controlsSlice.reducer;
