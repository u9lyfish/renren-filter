// all known 'data-stype' values
var banned_stype;

// number of article elements in last check. this is used to decide (more efficiently)
// whether page content has changed since last check
var article_num = 0;

// time (in milliseconds) between two rounds of check
var interval = 500;


loadConfig();
window.onload = detectChange();


/**
 * Load configuration from local storage
 */
function loadConfig() {
	banned_stype = ['102', '110'];
};

/**
 * 
 */
 function detectChange() { 
 	if (!banned_stype) {
 		return;
 	};

 	var newsfeed = document.getElementById('newsfeed-module-box');
 	if (!newsfeed) {
 		setTimeout('detectChange()', interval);
 		return;
 	};

 	var articles = newsfeed.getElementsByTagName('article');
 	if (!articles || article_num == articles.length) {
 		setTimeout('detectChange()', interval);
 		return;
 	};

 	article_num = articles.length;

 	for (var i = articles.length - 1; i >= 0; i--) {
 		var stype = articles[i].getElementsByTagName('figure')[0].getAttribute('data-stype');
 		if (banned_stype.indexOf(stype) >= 0 || (stype == 502 && 
 			articles[i].getElementsByTagName('div')[0].class == 'content' &&
 			articles[i].getElementsByTagName('div')[1].class == 'source')) 
 		{
 			articles[i].style.cssText = 'background-color: #EEE';
 		};
 	};

 	setTimeout('detectChange()', interval);
 };

