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
        $(gestures).on('swiping swipeend', handle); // swiping
        // swipeleft swiperight
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
                me.close();
            } else {
                me.open(side);
            }
        }

        function navClosedState() {
            this.swiping = function(args) {
                if(args.deltaX > 0) {
                    if(args.deltaX >= width) return;
                    navLeft.css('z-index', 0);
                    navLeft.css('display', 'block');
                } else {
                    if(args.deltaX <= -width) return;
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

            this.swipeend = function(args) {
                if(args.distanceX < 10) return;
                if(args.deltaX  > 0) {
                    me.open('left');
                } else {
                    me.open('right');
                }
            }
        }

        function navOpenState(side) {
            this.swiping = function(args) {
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

            this.swipeend = function(args) {
                if(args.distanceX < 10) return;
                if(args.deltaX  < 0 && side == 'left') {
                    me.close();
                } else if(args.deltaX > 0 && side =='right') {
                    me.close();
                }
            }
        }
    }

})(jQuery);