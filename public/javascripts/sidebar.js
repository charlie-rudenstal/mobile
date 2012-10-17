(function($) {

    // Sliding headeres
    // http://jqueryfordesigners.com/iphone-like-sliding-headers/

    window.CR = window.CR || {};
    CR.Sidebar = Sidebar;

    function Sidebar(options) {

        var me = this;

        // Options
        var nav = $(options.nav);
        var main = $(options.main);
        var width = options.width || 255;

        // Default state
        var state = new navClosedState();

        // Using gestures to open/close menu
        var gestures = new CR.Gestures();
        $(gestures).on('swipeleft swiperight swiping', handle);
        
        function handle(e, args) {
            if(state.hasOwnProperty(e.type)) {
                state[e.type](args);
            }
        }

        me.open = function() {
            nav.css('-webkit-transition', '0.2s');
            nav.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
            main.css('-webkit-transition', '0.2s');
            main.css('-webkit-transform', 'translate3d(' + width + 'px, 0px, 0px)');
            state = new navOpenState();
        }

        me.close = function() {
            nav.css('-webkit-transition', '0.2s');
            nav.css('-webkit-transform', 'translate3d(-' + width + 'px, 0px, 0px)');
            main.css('-webkit-transition', '0.2s');
            main.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
            state = new navClosedState();
        }

        me.toggle = function() {
            if (state instanceof navOpenState) {
                me.close();
            } else {
                me.open();
            }
        }

        function navClosedState() {
            this.swiping = function(args) {
                if(args.deltaX < 0) args.deltaX = 0;
                if(args.deltaX > width) args.deltaX = width;
                var navPos = -width + args.deltaX;
                var mainPos = 0 + args.deltaX;
                nav.css('-webkit-transition', 'none');
                nav.css('-webkit-transform', 'translate3d(' + navPos + 'px, 0px, 0px)');
                main.css('-webkit-transition', 'none');            
                main.css('-webkit-transform', 'translate3d(' + mainPos + 'px, 0px, 0px)');
            }

            this.swiperight = function() {
                me.open();
            }

            this.swipeleft = function() {
                me.close();
            }
        }

        function navOpenState() {
            this.swiping = function(args) {
                if(args.deltaX < -width) args.deltaX = -width;
                if(args.deltaX > 0) args.deltaX = 0;
                var navPos = 0 + args.deltaX;
                var mainPos = width + args.deltaX;
                
                nav.css('-webkit-transition', 'none');
                nav.css('-webkit-transform', 'translate3d(' + navPos + 'px, 0px, 0px)');
                main.css('-webkit-transition', 'none');
                main.css('-webkit-transform', 'translate3d(' + mainPos + 'px, 0px, 0px)');
            }

            this.swiperight = function() {
                nav.css('-webkit-transition', '0.15s');
                nav.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
                main.css('-webkit-transition', '0.15s');
                main.css('-webkit-transform', 'translate3d(' + width + 'px, 0px, 0px)');
                
                state = new navOpenState();
            }

            this.swipeleft = function() {
                nav.css('-webkit-transition', '0.15s');
                main.css('-webkit-transition', '0.15s');
                nav.css('-webkit-transform', 'translate3d(-' + width + 'px, 0px, 0px)');
                main.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
                state = new navClosedState();
            }
        }
    }

})(jQuery);