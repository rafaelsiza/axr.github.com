String.prototype.parseURL = function() {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(url) {
		return url.link(url);
	});
};

String.prototype.parseUsername = function() {
	return this.replace(/[@]+[A-Za-z0-9-_]+/, function(u) {
		var username = u.replace("@","")
		return u.link("http://twitter.com/"+username);
	});
};

String.prototype.parseHashtag = function() {
	return this.replace(/[#]+[A-Za-z0-9-_]+/, function(t) {
		var tag = t.replace("#","%23")
		return t.link("http://search.twitter.com/search?q="+tag);
	});
};


$(function(){
	
	var hash = location.hash;
	var $manifiesto = $("#manifiesto");
	
	if (hash === "#!/manifiesto") {
		$manifiesto.slideDown();
	}
	
	var $manifiestoButton = $("#intro .manifiesto").live("click", function() {
		$manifiesto.slideDown();
	});
	
	var $shareOnSocialNetworks = $("#container > #intro > ul.social > li > a").live("click", function(event) {
		event.preventDefault();
		var page = $(this).attr("href");
		var winH = $(window).height();
	    var winW = $(window).width();
		var popUpHeight = 245;
		var popUpWidth = 730;
		var top = (winH - popUpHeight) / 2;
		var left = (winW - popUpWidth) / 2;
		var options= "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=" + popUpWidth + ", height=" + popUpHeight + ", top= " + top + ", left=" + left;
		window.open(page,"",options);
	});
	
	var $goToTop = $("#container > footer > a").live("click", function(event){
		event.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 800);
	});
	
	$.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?count=1&include_rts=t&screen_name=axrproject&callback=?",
	        function(tweet){
				var $tweet = tweet[0].text.parseURL().parseUsername().parseHashtag();
	        	$("#container > footer > .activity > .last_tweet > p:first").html($tweet);
			}
	);
});