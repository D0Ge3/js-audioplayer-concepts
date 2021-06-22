const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),
  images: path.resolve(__dirname, '../src/images'),
  js: path.resolve(__dirname, '../src/js'),
  fonts: path.resolve(__dirname, '../src/fonts'),
}
