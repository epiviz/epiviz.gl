import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import json from '@rollup/plugin-json';
import OMT from "@surma/rollup-plugin-off-main-thread";

export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [OMT(), resolve({ preferBuiltins: false }), commonjs(), json()],
};