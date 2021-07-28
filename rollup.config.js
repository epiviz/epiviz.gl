import OMT from "@surma/rollup-plugin-off-main-thread";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [OMT(), nodeResolve()],
};
