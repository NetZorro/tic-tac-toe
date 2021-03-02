const webpackMerge = require("webpack-merge").merge;
const webpack = require("webpack");
const commonConfig = require("./webpack.common.js");
const helpers = require("./helpers");

const type = "dev";

module.exports = webpackMerge(commonConfig, {
  mode: "development",
  output: {
    path: helpers.root("dist"),
    filename: "[name].js",
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
      exclude: /^vendor.*\.js$/i,
    }),
  ],
});
