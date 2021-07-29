import OMT from "@surma/rollup-plugin-off-main-thread";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [OMT(), nodeResolve({ preferBuiltins: false }), commonjs()],
};
