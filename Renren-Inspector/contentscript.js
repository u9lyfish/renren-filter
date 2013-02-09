// all known 'data-stype' values
var known_stype;

// number of article elements in last check. this is used to decide (more efficiently)
// whether page content has changed since last check
var article_num = 0;

// time (in milliseconds) between two rounds of check
var interval = 500;

// fetch latest gist content, update known_stype and start detecting webpage content
fetchStypeList(updateStypeList);

/**
 * Performs an XMLHttpRequest to GitHub's API to get latest list of data-stype values.
 */
function fetchStypeList(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        callback(null);
      }
    }
  }
  // Note that any URL fetched here must be matched by a permission in
  // the manifest.json file!
  var url = 'https://api.github.com/gists/4730574';
  xhr.open('GET', url, true);
  xhr.send();
};

/**
 * Update array known_stype and call detectChange().
 */
function updateStypeList(response) {
	if (response == null) {
		return;
	};

	var content = response["files"]["renren-feed-data_stype-relation"]["content"];
	known_stype = content.split(/[^0-9]+/);		// use non-numeric characters as delimiters
	window.onload = detectChange();
};

/**
 * 
 */
function detectChange() { 
	if (!known_stype) {
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
		if (stype && known_stype.indexOf(stype) < 0) {
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
