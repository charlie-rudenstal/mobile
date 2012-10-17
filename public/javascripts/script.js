(function($) {

	// Sliding headeres
	// http://jqueryfordesigners.com/iphone-like-sliding-headers/
	$(function() {

		var sidebar = new CR.Sidebar({ nav: '.nav', main: '.main' });

        $("#btnSidebar").on('touchend click', function() {
            sidebar.toggle();
            e.preventDefault();
        })

	});

})(jQuery);


document.ontouchmove = function(e){ 
	//if(e.changedTouches[0]; 
    e.preventDefault(); 
}


