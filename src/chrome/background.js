"use strict";

chrome.extension.onRequest.addListener(function (request, sender, reply) {
	switch (request.name) {
		case 'injectScript':
			createBookmark(request.url, request.title, reply);
			break;
		case 'getBookmark':
			getBookmark(request.title, reply);
			break;
		case 'getData':
			getData(reply);
			break;
		case 'saveData':
			saveData(request.data, reply);
			break;
		case 'updateBookmark':
			updateBookmark(request.id, request.title, reply);
			break;
		case 'updateBadge':
			chrome.tabs.get(sender.tab.id, function (tab) {
				updateTabBadge(tab);
			});
			break;
		case 'updateAllTabBadges':
			return;	// deprecated
			updateAllTabBadges();
			break;
	}
});

console.log('test3');
