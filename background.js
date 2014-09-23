require.config({
	baseUrl: '',
	paths : {
		app: 'com/jeromedane/webthemer',
		jquery: 'com/jquery/jquery-1.8.2.min',
		jqueryui: 'com/jqueryui/js/jquery-ui-1.9.2.custom.min',
		stringutils: 'nl/stroep/stroep.core.StringUtil',
		underscore: 'com/underscore/underscore-1.4.2.min',
		backbone: 'com/backbone/backbone-0.9.2',
		template: 'com/jeromedane/Template',
		themer: 'com/jeromedane/webthemer/Themer',
	
	}
});

var IN_BACKGROUND_PAGE = true;

function getBookmark(searchTerm, reply) {
	
	chrome.bookmarks.search(searchTerm, function(result) {
		if(result.length > 0)
			reply(result[0]);
		else 
			reply(false);
			
	});
};
	
var dependencies = [
	'com/jeromedane/webthemer/Themer',
	'jquery',
	'jqueryui',
	'underscore',
	'backbone',
	'com/jeromedane/webthemer/bootstrap',
];
require(dependencies, function(Themer) {
	
	function createBookmark(url, title, reply) {
		var bookmark = {
			url:url,
			title:title
		};
		chrome.bookmarks.create(bookmark, reply);
		//updateAllTabBadges();
	}
	
	function updateBookmark(id, title, reply) {
		chrome.bookmarks.update(id, { title:title }, reply);
		updateAllTabs();
	}
	
	
	function updateAllTabs() {
		
		Themer.loadData(function() {
			chrome.windows.getAll(null, function(winObjs) {
			    for (var w = 0; w < winObjs.length; w++) {
					chrome.tabs.getAllInWindow(winObjs[w].id, function(tabs){
						
					    for (var i = 0; i < tabs.length; i++) {
					    	
					    	updateTabBadge(tabs[i]);
					    	injectTabCss(tabs[i]);
					    }
					});
				}
			});
		});
	}
	
	function injectTabCss(tab) {
		chrome.tabs.sendMessage(tab.id, "re-inject-css", function() {});
	}
	function updateTabBadge(tab) {
				
		var numThemes = Themer.getThemesForUrl(tab.url, true).length;
		
		chrome.browserAction.setBadgeText({
			text: numThemes > 0 ? numThemes + "" : "",
			tabId: parseInt(tab.id)
		});
		chrome.browserAction.setBadgeBackgroundColor({
			color: '#339933'
		});

	};
	
	// update tab badge when selected	
	chrome.tabs.onActivated.addListener(function(details) {
		chrome.tabs.get(details.tabId, function(tab) {
			updateTabBadge(tab);		
		});
	});
	
	chrome.extension.onRequest.addListener(function(request, sender, reply) {
		switch (request.name) {
			case 'createBookmark':
				createBookmark(request.url, request.title, reply);
				break;
			case 'getBookmark':
				getBookmark(request.title, reply);
				break;
			case 'updateBookmark':
				updateBookmark(request.id, request.title, reply);
				break;
			case 'updateBadge':
				chrome.tabs.get(sender.tab.id, function(tab) {
					updateTabBadge(tab);		
				});
				break;
			case 'updateAllTabBadges':
				return;	// deprecated
				updateAllTabBadges();
				break;
		}
	});
	
	updateAllTabs();
});