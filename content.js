function injectThemes() {
	buildWebThemer();
	WebThemer.init(function() {
		WebThemer.injectThemes();	
	});
	
}

if(typeof(chrome) != 'undefined' && typeof(chrome.extension) != 'undefined') {
	chrome.extension.onMessage.addListener(function(message, sender, reply) {
		switch(message) {
			case 're-inject-css':
				injectThemes();
				break;
		}
	});
}
injectThemes();
