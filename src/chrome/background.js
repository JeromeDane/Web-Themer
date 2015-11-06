'use strict';

/**
 * Inject CSS into a tab, overwriting any existing styles previously
 * injected by this Extension
 */
function injectCss(tab) {
	var css = getCssForUrl(tab.url);
	chrome.tabs.sendMessage(tab.id, { type: "inject-css", data: css}, function(response) {});
}

// get the css to apply to a specific URL
function getCssForUrl(url) {
	var css = 'body { background: red !important; }';;
	return css;
	return "HERE: " + url;
};

function updateTabBadge(tab) {

	//var numThemes = Themer.getThemesForUrl(tab.url, true).length;

	var numThemes = Math.ceil(Math.random() * 10);

	chrome.browserAction.setBadgeText({
		text: numThemes > 0 ? numThemes + "" : "",
		tabId: parseInt(tab.id)
	});
	chrome.browserAction.setBadgeBackgroundColor({
		color: '#339933' // TODO: allow user to select badge color in options
	});

};

// update tab CSS AND badge when selected
chrome.tabs.onActivated.addListener(function(details) {
	chrome.tabs.get(details.tabId, function(tab) {
		injectCss(tab);
		updateTabBadge(tab);
	});
});

// listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener(function (request, sender, reply) {

	switch (request.type) {
		case 'get-css-for-url':
			reply(getCssForUrl(request.data));
			break;

		/*
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
		*/
	}
});
