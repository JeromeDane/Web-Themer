var dependencies = [
	'app/models/ThemeModel',
	'app/collections/ThemeCollection'
];

var WebThemer;


if(typeof(define) == 'function') {
	
	define(dependencies, function(ThemeModel, ThemeCollection) {
	
		return buildWebThemer(ThemeModel, ThemeCollection);
		
	});
}

function buildWebThemer(ThemeModel, ThemeCollection) {
	
	var Themer = new (function() {
		
		var _config = {
			bookmark:{
				url:'http://webthemer.jeromedane.com',
				title:'Web Themer Extension Data (do not modify) ',
				replacementPattern: /Web Themer Extension Data \(do not modify\) /
			}
		};
		var _data = [];
		var _themeCollection;
		
		/**
		 * Create the data storage bookmark 
		 */
		function _createBookmark(reply) {
			var url = _config.bookmark.url;
			var title = _config.bookmark.title + "{}";
			
			switch(_getBrowserName()) {
				case 'chrome':
					_sendRequest({ name:"createBookmark", url:url, title:title }, reply);
					break;
			}
		}
		
		function _getBookmark(reply) {
			var title = _config.bookmark.title;
			
			switch(_getBrowserName()) {
				case 'chrome':
					
					if(typeof(IN_BACKGROUND_PAGE) != 'undefined') {
						// we're on the background page, so just call the getBookmark function directly
						getBookmark(title, reply);
					} else {
						// send a request to the background page if we're not there
						_sendRequest({ name:"getBookmark", title:title }, function(bookmark) {
							reply(bookmark ? bookmark : false);
						});
					}
					break;
			}			
		}
		
		/**
		 * Get the stored bookmark data string 
		 */
		function _getBookmarkDataString(reply) {
			
			var dataString = "";
			var title = _config.bookmark.title;
			
			_getBookmark(function(bookmark) {
				if(!bookmark)
					reply(false);
				else {
					
					var title = '';
					
					// set title from bookmark based on browser
					switch(_getBrowserName()) {
						case 'chrome':
							title = bookmark.title;
							break;
					}
					
					var dataString = title.replace(_config.bookmark.replacementPattern, '');
					reply(dataString);
					
				}
			});
			
		}
		
		/**
		 * Return the basic name of the browser family
		 * 
		 * todo: implement detection for browsers other than chrome 
		 */
		function _getBrowserName() {
			return 'chrome';
		}
		
		function _loadData(reply) {
			
			function _report(data) {
				
				if(typeof(data.themes) == 'undefined') {
					data.themes = [];
				}
				_data = data;
				reply(data);
			}
			
			if(typeof(IN_BACKGROUND_PAGE) != 'undefined') {
				// we're on the background page, so just call the getBookmark function directly
				getData(function(data) {
					_report(data);
				});
			} else {
				_sendRequest({ name: 'getData' }, function(data) {
					_report(data);
				});
				
			}
			/*
			_getBookmarkDataString(function(dataString) {
				
				// check to see that data string was found
				if(dataString) {
					// set data object from JSON string
					_data = JSON.parse(dataString); 
					
					_validateData();
					
					reply(_data);
				} else {
					// create the data bookmark if data string was not found
					_createBookmark(function() {
						// reload data now that bookmark exists;
						_loadData(reply);
					});
				}
			});
			*/
		}
		function _validateData() {
			if(typeof(_data.themes) == 'undefined') {
				_data.themes = [
					{
						name:"Google",
						urlPattern:"https?:\\/\\/*\\google\\.com"
					},
					{
						name:"LifeHacker",
						urlPattern:"https?:\\/\\/*\\lifehacker\\.com"
					}
				];
			}
		}
		
		/**
		 *
		 * Send a request to the background script (used by Chrome browser) 
		 */
		function _sendRequest(params, reply) {
			
			chrome.extension.sendRequest(params, function(response) {
				if(typeof(reply) == 'function') {
					reply(response);
				}
			});
		}
		
		function _updateDataFromThemesCollection() {
			if(_themeCollection != null) {
				_data.themes = [];			
				_.each(_themeCollection.models, function(themeModel) {
					_data.themes.push(themeModel.toJSON()); 
				});
			}
		}
		
		return {
			init:function(reply) {
					
				// load personal data
				_loadData(function(data) {
				
					if(typeof(reply) == "function") {
						reply();				
					}
				});
			},
			loadData:function(reply) {
				return _loadData(reply);
			},
			getData:function() {
				return _data;
			},
			getThemeCollection:function() {
				
				if(_themeCollection == null) {
					_themeCollection = new ThemeCollection();
					
					// loop through raw theme data
					for(var i = 0; i < _data.themes.length; i++) {
						// build theme model object
						var theme = new ThemeModel(_data.themes[i]);
						_themeCollection.add(theme);
						
					}
				}
				
				return _themeCollection;
			},
			saveData:function(reply) {
				
				_updateDataFromThemesCollection();
				
				// save bookmark based on browser
				switch(_getBrowserName()) {
					case 'chrome':
						_sendRequest({ name:"saveData", data: _data}, function() {
							if(typeof(reply) == 'function')
								reply();
						});
						break;
				}
			},
			renderThemesView:function() {
				new com.jeromedane.webthemer.ThemeListView({ collection:this.getThemesCollection() });
			},
			getThemesForUrl:function(url, enabledOnly) {
				
				enabledOnly = typeof(enabledOnly) == 'undefined' ? false : enabledOnly; 
				var themes = [];
				
				for(var i = 0; i < _data.themes.length; i++) {
					var theme = _data.themes[i];
					var pattern = new RegExp(theme.urlPattern, "i");
					
					if((!enabledOnly || theme.enabled) && theme.css != '' && url.match(pattern)) {
						themes.push(theme);	
					}
				}
				
				return themes;
			},
			injectThemes:function() {
				
				
				var themes = this.getThemesForUrl(document.location.toString(), true);
				
				var html = '';
				for(var i = 0; i < themes.length; i++) {			
					html +=  "\n" + themes[i].css.replace(/</, '&lt;').replace(/>/, '&gt;') + "\n";
				}
					
				
				var styleWrapper = document.getElementById('webThemerCss');
				if(styleWrapper == null) {
					styleWrapper = document.createElement("style");
					styleWrapper.setAttribute('type', 'text/css');
					styleWrapper.setAttribute('id', 'webThemerCss');
					styleWrapper.innerHTML = html;
				}
				styleWrapper.innerHTML = html;
				if(document.body) {
					document.body.appendChild(styleWrapper);
				} else {
					document.getElementsByTagName('head')[0].appendChild(styleWrapper);
				}
				
				// update tab badge
				switch(_getBrowserName()) {
					case 'chrome':
						_sendRequest({ name:"updateBadge" });
						break;
				}
				
				
			}
		};
	})();
	
	WebThemer = Themer;
	
	return Themer;
	
}

