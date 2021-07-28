import webWorkerLoader from "rollup-plugin-web-worker-loader";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "esm",
  },
  plugins: [webWorkerLoader()],
};

/**
 * Note: Currently we just copy the webworker files into the dist directory, so they do not get
 * optimized. This seems to work fine, but a more permananent solution would be to update the
 * webworkers to be imported like the plugin recommends:
 *
 * https://github.com/darionco/rollup-plugin-web-worker-loader
 *
 * This is not done at the moment to avoid issues with parcel
 */
