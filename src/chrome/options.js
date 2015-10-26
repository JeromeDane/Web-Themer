
"use strict";

var OptionsView = require('../views/options');

document.addEventListener("DOMContentLoaded", function() {
	var optionsView = new OptionsView({
		el: document.body
	});
	optionsView.render();
});
