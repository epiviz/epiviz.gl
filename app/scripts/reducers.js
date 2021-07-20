import { createSlice } from "@reduxjs/toolkit";
import csv10 from "../examples/tsne-10th";

const controlsSlice = createSlice({
  name: "webglControls",
  initialState: {
    tool: "pan",
    schema: csv10,
    lockedX: false,
    lockedY: false,
  },
  reducers: {
    setSchema(state, action) {
      state.schema = action.payload;
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

export const { setSchema, setTool, setScroll } = controlsSlice.actions;

export default controlsSlice.reducer;
