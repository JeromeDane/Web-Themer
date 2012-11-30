function injectThemes() {
	var Themer = com.jeromedane.webthemer.Themer;
	Themer.init(function(){
		Themer.injectThemes();	
	});
	
}

if(typeof(chrome) != 'undefined' && typeof(chrome.extension) != 'undefined') {
	chrome.extension.onMessage.addListener(function(message, sender, reply) {
		switch(message) {
			case 're-inject-css':
				injectThemes();
				break
		}
	});
}
injectThemes();
