import OMT from "@surma/rollup-plugin-off-main-thread";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [OMT(), nodeResolve({ preferBuiltins: false }), commonjs(), json()],
};
