window.onload = detectChange();
function detectChange() { 
	var interval = 500;
	var newsfeed = document.getElementById('newsfeed-module-box');
	if (!newsfeed) {
		setTimeout('detectChange()', interval);
		return;
	};
	
	var article_num = 0;
	var articles = newsfeed.getElementsByTagName('article');
	if (!articles || article_num == articles.length) {
		setTimeout('detectChange()', interval);
		return;
	};
	
	article_num = articles.length;
	for (var i = articles.length - 1; i >= 0; i--) {
		var stype = articles[i].getElementsByTagName('figure')[0].getAttribute('data-stype');
		if (stype == 102 || stype == 103 || stype == 104 || stype == 107 || stype == 110 || 
			stype == 1902 || stype == 1906 || stype == 1909 || 
			stype == 2003 || stype == 2004 || stype == 2005 || stype == 2006 || stype == 2035 || 
			stype == 3801 || stype == 3802 || 
			(stype == 502 && 
				articles[i].getElementsByTagName('div')[0].getAttribute('class') == 'content' && 
				articles[i].getElementsByTagName('div')[1].getAttribute('class') == 'source')) 
		{
			articles[i].parentNode.removeChild(articles[i]);
		};
	};

	setTimeout('detectChange()', interval);
}; 
