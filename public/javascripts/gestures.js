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
				state[e.type](eventArgs);
			}	
		 
			// Trigger the general event to handle both mousedown and touch
			var generalEvent = null;
			switch(e.type) {
				case 'touchstart': generalEvent = 'down'; break;
				case 'touchmove': generalEvent = 'move'; break;
				case 'touchend': generalEvent = 'up'; break;
			}

			if(state.hasOwnProperty(generalEvent)) {
				state[generalEvent](eventArgs); 
			}	
		}

		function defaultState() {
			this.down = function(e) {
				var startPoint = {x: e.clientX, y: e.clientY };
				state = new gestureState(startPoint);
			}
		}

		function gestureState(startPoint) {
			this.up = function(e) {
				var endPoint = {x: e.clientX, y: e.clientY };
				if(endPoint.x < startPoint.x) {
					$(me).trigger('swipeleft');
				} else if(endPoint.x > startPoint.x) {
					$(me).trigger('swiperight');
				}
				state = new defaultState();
			}			
		}

	}

})(jQuery);



