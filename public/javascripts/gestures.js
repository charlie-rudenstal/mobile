(function($) {

	window.CR = window.CR || {};
	CR.Gestures = Gestures;

	function Gestures() {

		var me = this;
		var state = new defaultState();

		$(onLoad);

		function onLoad() {
			$(window).on('mousedown mouseup mousemove touchstart touchend touchmove', handle);		
		}

		function handle(e) {
			if(state.hasOwnProperty(e.type)) {
				state[e.type](e);
			}
		}

		function handle(e) {
			var eventArgs = {};
			if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend') {
				eventArgs = e.originalEvent.changedTouches[0]; 
			} else {
				eventArgs = e;
			}

			if(state.hasOwnProperty(e.type)) {
				// Trigger the specific event for touch
				state[e.type](e, eventArgs);
			}	
		 
			// Trigger the general event to handle both mousedown and touch
			var generalEvent = null;
			switch(e.type) {
				case 'touchstart': generalEvent = 'down'; break;
				case 'touchmove': generalEvent = 'move'; break;
				case 'touchend': generalEvent = 'up'; break;
				case 'mousedown': generalEvent = 'down'; break;
				case 'mousemove': generalEvent = 'move'; break;
				case 'mouseup': generalEvent = 'up'; break;
			}

			if(state.hasOwnProperty(generalEvent)) {
				state[generalEvent](e, eventArgs); 
			}	
		}

		function defaultState() {
			this.down = function(e, args) {
				var startPoint = {x: args.clientX, y: args.clientY };
				state = new gestureState(startPoint);
				// e.preventDefault();
			}
		}

		function gestureState(startPoint) {
			this.move = function(e, args) {
				var endPoint = {x: args.clientX, y: args.clientY };
				var args = {};
				args.deltaX = endPoint.x - startPoint.x;
				args.deltaY = endPoint.y - startPoint.y;
				args.distanceX = Math.abs(args.deltaX);
				args.distanceY = Math.abs(args.deltaY);
				

				$(me).trigger('swiping', args);

				// if(args.distanceY == 0) {
				// 	e.preventDefault();
				// }
			}

			this.up = function(e, args) {
				var endPoint = {x: args.clientX, y: args.clientY };
				var args = {};
				args.deltaX = endPoint.x - startPoint.x;
				args.deltaY = endPoint.y - startPoint.y;
				args.distanceX = Math.abs(args.deltaX);
				args.distanceY = Math.abs(args.deltaY);
			
				// No vertical moment
				// And enough of horizontal moment, triggers swipeLeft and swipeRight 
				if(args.distanceY < 30) {
					if(args.deltaX < 0) {
						$(me).trigger('swipeleft');
					} else if(args.deltaX > 0) {
						$(me).trigger('swiperight');
					}
					// e.preventDefault();
				}
				state = new defaultState();
			}			
		}

	}

})(jQuery);



