(function($) {

	// Sliding headeres
	// http://jqueryfordesigners.com/iphone-like-sliding-headers/
	$(function() {

		var sidebar = new CR.Sidebar({ left: '.nav-left', right: '.nav-right', main: '.main' });

        $("#btnSidebar").on('touchend mouseup', function() {
            sidebar.toggle('left');
            e.preventDefault();
        })

	});

})(jQuery);


document.ontouchmove = function(e){ 
	//if(e.changedTouches[0]; 
    e.preventDefault(); 
}


