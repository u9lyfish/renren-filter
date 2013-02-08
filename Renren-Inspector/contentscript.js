
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
	var known_stype = 
	[
	102, 103, 104, 107, 110, 
	210, 
	501, 502, 
	601, 602, 
	701, 702, 708, 709, 
	801, 807, 
	1101, 1804, 1902, 1903, 1904, 1906, 1907, 1909, 
	2002, 2003, 2004, 2005, 2006, 2008, 2012, 2013, 2032, 2035, 2036, 
	2401, 
	3707, 3732, 3733, 
	3801, 3802, 3803, 
	8182, 8185, 8186, 
	8301, 8302, 
	9802,
	9999 
	];

	for (var i = articles.length - 1; i >= 0; i--) {
		var stype = articles[i].getElementsByTagName('figure')[0].getAttribute('data-stype');
		if (known_stype.indexOf(parseInt(stype)) < 0) {
			articles[i].style.cssText = 'border: 1px solid red';
		};
		if (articles[i].getElementsByTagName('note').length == 0) {
			var note = document.createElement('note');
			note.innerText = stype;
			articles[i].appendChild(note);
		};
	};

	setTimeout('detectChange()', interval);
};
