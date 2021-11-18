const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    fallback: {
      "fs": false,
      'url': false,
      'buffer': false,
      'path': require.resolve("path-browserify"),
      'stream': require.resolve("stream-browserify"),
      'http': require.resolve("stream-http"),
      'https': require.resolve("https-browserify")
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
    ],
  },
}
