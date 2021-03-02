const webpack = require("webpack");
const webpackMerge = require("webpack-merge").merge;

const TerserPlugin = require("terser-webpack-plugin");

const helpers = require("./helpers");
const commonConfig = require("./webpack.common.js");

module.exports = webpackMerge(commonConfig, {
  mode: "production",
  output: {
    path: helpers.root("dist"),
    filename: "[hash].[name].js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
});
