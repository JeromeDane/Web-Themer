
module.exports = {
  entry: {
    background: './src/chrome/background.js',
    content: './src/chrome/content.js',
    options: './src/chrome/options.js'
  },
  output: {
		path: "./build/",
		filename: "[name].js"
	},
  module: {
    loaders: [
      //{ test: /\.scss$/, loaders: ["style", "css", "sass"] },
      //{ test: /\.scss$/, loaders: ["style", "css", "sass"] },
      //{ test: /\.scss$/, loader: "sass" },
      { test: /\.md$/, loader: "html!markdown" },
    	{ test: /\.html$/, loader: "underscore-template-loader" }
    ]
  },
  devtool: 'source-map'
};
