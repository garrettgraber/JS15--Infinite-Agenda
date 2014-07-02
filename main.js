





$(document).on('ready', function() {

	var lastScroll = 0;

	var addHtml = '<div class="page-text">Adding text</div>';

	var addHtmlToPage = function(htmlIn) {
		console.log("addHtmlToPage function has fired");
		$('#main-container').append(htmlIn);
	};

	$(window).on('scroll', function() {


		var docHeight = $(document).height();
		var winHeight = $(window).height();
		var scrollDoc = $(document).scrollTop();
		var scrollWin = $(window).scrollTop();
		console.log('document height: ' + docHeight);
		console.log('window height: ' + winHeight);
		console.log('document scroll position: ' + scrollDoc);
		console.log('window scroll position: ' + scrollWin);
		var winHeightPlusScrollPos = scrollWin + winHeight;
		console.log('window height + scroll position: ' + winHeightPlusScrollPos);
		var distanceFromBottom = docHeight - winHeightPlusScrollPos;
		console.log('distance from the bottom: ' + distanceFromBottom);

		if ( (distanceFromBottom < 40 && scrollWin > lastScroll) || (distanceFromBottom === 0 && scrollDoc === scrollWin) ) {
			console.log('Adding text');
			
			addHtmlToPage(addHtml);
			
			/*
			$("#main-container").append('<div class="page-text">Adding text</div>');
			*/
		}
		lastScroll = scrollWin;
	});

});