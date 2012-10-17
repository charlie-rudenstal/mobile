(function($) {

    // Sliding headeres
    // http://jqueryfordesigners.com/iphone-like-sliding-headers/

    window.CR = window.CR || {};
    CR.Sidebar = Sidebar;

    function Sidebar(options) {

        var me = this;

        // Options
        var navLeft = $(options.left);
        var navRight = $(options.right);
        var main = $(options.main);
        var width = options.width || 255;

        // Default state
        var state = new navClosedState();

        // Using gestures to open/close menu
        var gestures = new CR.Gestures();
        $(gestures).on('swipeleft swiperight swiping', handle); // swiping
        
        function handle(e, args) {
            if(state.hasOwnProperty(e.type)) {
                state[e.type](args);
            }
        }

        me.open = function(side) {
            main.css('-webkit-transition', '0.2s');
            
            // Wait before making the sidebar selectable
            // otherwise a click on the menuicon might
            // select the search input box
            if(side == 'left') {
                navLeft.css('display', 'block');
                navRight.css('display', 'none');
                navLeft.css('z-index', 0);
                main.css('-webkit-transform', 'translate3d(' + width + 'px, 0px, 0px)');
                state = new navOpenState('left');
            } else {
                navLeft.css('display', 'none');
                navRight.css('display', 'block');
                navRight.css('z-index', 0);
                main.css('-webkit-transform', 'translate3d(' + -width + 'px, 0px, 0px)');
                state = new navOpenState('right');
            }
        }

        me.close = function() {
            navLeft.css('z-index', -1);
            navRight.css('z-index', -1);
            main.css('-webkit-transition', '0.2s');
            main.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
            state = new navClosedState();
        }

        me.toggle = function(side) {
            if (state instanceof navOpenState) {
                me.close(side);
            } else {
                me.open(side);
            }
        }

        function navClosedState() {
            this.swiping = function(args) {
                if(args.deltaX > 0) {
                    navLeft.css('z-index', 0);
                    navLeft.css('display', 'block');
                } else {
                    navRight.css('z-index', 0);
                    navRight.css('display', 'block');
                }

                var mainPos = args.deltaX;
                main.css('-webkit-transition', 'none'); 
                main.css('-webkit-transform', 'translate3d(' + mainPos + 'px, 0px, 0px)');
            }

            this.swiperight = function() {
                me.open('left');
            }

            this.swipeleft = function() {
                me.open('right');
            }
        }

        function navOpenState(side) {
            this.swiping = function(args) {
                // if(placement == 'left') {
                //     if(args.deltaX < -width) args.deltaX = -width;
                //     if(args.deltaX > 0) args.deltaX = 0;
                //     var mainPos = width + args.deltaX;
                // } else {
                //     if(args.deltaX < 0) args.deltaX = 0;
                //     if(args.deltaX > width) args.deltaX = width;    
                //     var mainPos = -width + args.deltaX;
                // }
                
                if(side == 'left') {  
                    if(args.deltaX < -width) return;
                    if(args.deltaX > 0) return;
                    navLeft.css('z-index', -1);
                    var mainPos = width + args.deltaX;         
                } else {
                    if(args.deltaX < 0) return;
                    if(args.deltaX > width) return;  
                    navRight.css('z-index', -1);
                    var mainPos = -width + args.deltaX;
                }
                 
                main.css('-webkit-transition', 'none');
                main.css('-webkit-transform', 'translate3d(' + mainPos + 'px, 0px, 0px)');      
            }

            this.swipeleft = function() {
                me.close();
            }

            this.swiperight = function() {
                me.close();
            }
        }
    }

})(jQuery);