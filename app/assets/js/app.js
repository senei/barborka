jQuery( document ).ready(function( $ ) {
    $('ul.tabs li').on('touchstart click', function(){
        $('ul.tabs li').removeClass('selected');
        $('ul.content li').removeClass('selected');
        //
        num = $('ul.tabs li').index(this);
        $('ul.tabs li').eq(num).addClass('selected');
        $('ul.content li').eq(num).addClass('selected');
    });
    if ( $("#memoGame").length > 0 ){
	    new memoGame('memoGame').init();
	  }
    if ( $("#slownikGameBord").length > 0 ){
	    setTimeout(function () {
				$("#slownikGameBord li").removeClass('off');
				$("#slownikGameBord li button").on('touchstart click', function(){
					var li = $(this).parent();
        	if(li.hasClass('no-off')){
						li.addClass('no').removeClass('no-off');
						setTimeout(function () {
							li.addClass('no-off').removeClass('no');
      			}, 1000);
        	} else if (li.hasClass('yes-off')) {
						li.addClass('yes').removeClass('yes-off');
      			
        	}
        });
      }, 1000);
	    
	  }
});