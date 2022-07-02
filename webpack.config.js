const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: path.resolve(__dirname, "firebase")
      },
    ]
  },
  resolve: {
    extensions: [
        ".js", ".ts"
    ]
  }
}