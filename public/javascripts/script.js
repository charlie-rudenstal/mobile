(function($) {

	var gestures = new CR.Gestures();
	$(gestures).on('swipeleft', onSwipeLeft);
	$(gestures).on('swiperight', onSwipeRight);

	function onSwipeLeft() {
		$('body').removeClass('is-nav-open');
	}

	function onSwipeRight() {
		$('body').addClass('is-nav-open');
	}

})(jQuery);


document.ontouchstart = function(e){ 
    e.preventDefault(); 
}


