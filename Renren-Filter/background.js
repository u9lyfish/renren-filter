
// This is ensured to get url
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	executed = false;

	if (executed || tab.url.indexOf("http://www.renren.com/") != 0) {
		return;
	}

	var exec_code = " \
	window.onload = detectChange(); \
	function detectChange() {  \
		var interval = 500; \
		var newsfeed = document.getElementById('newsfeed-module-box'); \
		if (!newsfeed) { \
			setTimeout('detectChange()', interval); \
			return; \
		}; \
		\
		var article_num = 0; \
		var articles = newsfeed.getElementsByTagName('article'); \
		if (!articles || article_num == articles.length) { \
			setTimeout('detectChange()', interval); \
			return; \
		}; \
		\
		article_num = articles.length; \
		for (var i = articles.length - 1; i >= 0; i--) { \
			var stype = articles[i].getElementsByTagName('figure')[0].getAttribute('data-stype'); \
			if (!articles[i].getElementsByTagName('note')[0]) { \
				var note = document.createElement('note'); \
				note.innerHTML = stype; \
				articles[i].appendChild(note); \
			}; \
		}; \
		\
		setTimeout('detectChange()', interval); \
	};  \
	";

	chrome.tabs.executeScript(tabId, {code: exec_code});
	executed = true;
});

