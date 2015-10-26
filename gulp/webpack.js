"use strict";

var webpack = require('webpack');

// run webpack, applying project specific settings
module.exports = function(buildType, config, callback) {
	config['dev-tools'] = 'source-map';
	config.output = {
		path: "./build/" + buildType,
		filename: "[name].js"
	};
	config.module = config.module || {};
	config.module.loaders = config.module.loaders || [];
	config.module.loaders.push({
		test: /\.scss$/,
        loaders: ["style", "css", "sass"]
	});
	config.module.loaders.push(
		{ test: /\.html$/, loader: "underscore-template-loader" }
	);
	/*
	config.module.loaders.push(
		//{test: /\.png$/, loader: "url-loader?mimetype=image/png"},
	);
	*/
	webpack(config, callback);
};
