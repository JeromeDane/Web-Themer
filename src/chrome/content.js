"use strict";

console.log('hello world, from content');

chrome.extension.onMessage.addListener(function(message, sender, reply) {
	switch(message) {
		case 'inject-css':
			injectThemes();
			break;
	}
});