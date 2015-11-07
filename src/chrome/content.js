'use strict';

console.log('hello from content 5');

(function(global) {

	// style dom element
	var style;

	// inject css into the tab
	function injectCss(css) {
		if(!style) {
			style = document.createElement('style');
			style.type = 'text/css';
			document.getElementsByTagName('html')[0].appendChild(style);
		}
		style.innerHTML = css;
	}

	// Get the tab's CSS from the background page
	function fetchCss(callback) {
		chrome.runtime.sendMessage({ type: "get-css-for-url", data: document.location.toString() }, function(response) {
		  callback(response);
		});
	}

	// listen for messages from the background page
	chrome.runtime.onMessage.addListener(function(message, sender, reply) {
		switch(message.type) {
			case 'inject-css':
				injectCss(message.data);
				break;
		}
	});

	// inject initial styles on page load
	fetchCss(function(css) {
		injectCss(css);
	});

})(this);
