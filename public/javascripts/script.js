(function($) {

	// Sliding headeres
	// http://jqueryfordesigners.com/iphone-like-sliding-headers/





	var gestures = new CR.Gestures();
	$(gestures).on('swipeleft swiperight swiping', handle);

	var state = new navClosedState();

	function handle(e, args) {
		if(state.hasOwnProperty(e.type)) {
			state[e.type](args);
		}	
	}

	var menuWidth = 255;

	function navClosedState() {
		this.swiping = function(args) {
			if(args.deltaX < 0) args.deltaX = 0;
			if(args.deltaX > menuWidth) args.deltaX = menuWidth;

			var navPos = -menuWidth + args.deltaX;
			var mainPos = 0 + args.deltaX;
			
			$('.nav, .main').css('-webkit-transition', 'none');
			$('.nav').css('-webkit-transform', 'translate3d(' + navPos + 'px, 0px, 0px)');
			$('.main').css('-webkit-transform', 'translate3d(' + mainPos + 'px, 0px, 0px)');
		}

		this.swiperight = function() {
			$('.nav, .main').css('-webkit-transition', '0.15s');
			$('.nav').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
			$('.main').css('-webkit-transform', 'translate3d(' + menuWidth + 'px, 0px, 0px)');
			$('body').addClass('is-nav-open');
			state = new navOpenState();
		}

		this.swipeleft = function() {
			$('.nav, .main').css('-webkit-transition', '0.15s');
			$('.nav').css('-webkit-transform', 'translate3d(-' + menuWidth + 'px, 0px, 0px)');
			$('.main').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
			$('body').removeClass('is-nav-open');
			state = new navClosedState();
		}

	}

	function navOpenState() {
		this.swiping = function(args) {
			if(args.deltaX < -menuWidth) args.deltaX = -menuWidth;
			if(args.deltaX > 0) args.deltaX = 0;
			
			var navPos = 0 + args.deltaX;
			var mainPos = menuWidth + args.deltaX;
			
			$('.nav, .main').css('-webkit-transition', 'none');
			$('.nav').css('-webkit-transform', 'translate3d(' + navPos + 'px, 0px, 0px)');
			$('.main').css('-webkit-transform', 'translate3d(' + mainPos + 'px, 0px, 0px)');
		}

		this.swiperight = function() {
			$('.nav, .main').css('-webkit-transition', '0.15s');
			$('.nav').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
			$('.main').css('-webkit-transform', 'translate3d(' + menuWidth + 'px, 0px, 0px)');
			$('body').addClass('is-nav-open');
			state = new navOpenState();
		}

		this.swipeleft = function() {
			$('.nav, .main').css('-webkit-transition', '0.15s');
			$('.nav').css('-webkit-transform', 'translate3d(-' + menuWidth + 'px, 0px, 0px)');
			$('.main').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
			$('body').removeClass('is-nav-open');
			state = new navClosedState();
		}
	}

})(jQuery);


// document.ontouchstart = function(e){ 
// 	if(e.changedTouches[0]; 
//     //e.preventDefault(); 
// }


