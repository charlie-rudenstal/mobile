(function($) {

	var gestures = new CR.Gestures();
	$(gestures).on('swipeleft', function(e) {
		
		$('.nav').addClass('is-open');

	});

})(jQuery);


document.ontouchstart = function(e){ 
    e.preventDefault(); 
}


