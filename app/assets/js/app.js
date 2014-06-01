$(function() {

    var $magicLine = $("#menu #magic-line");
    function init(){
        if($magicLine.length == 1){
        if($(".current_page a").length == 1){
            $magicLine
                .width($(".current_page a").width() + 4)
                .css("left", $(".current_page a").position().left - 2)
                .css("top", $(".current_page a").position().top + 26);
        }

        $magicLine
            .data("origTop", Math.floor($magicLine.position().top))
            .data("origLeft", Math.floor($magicLine.position().left))
            .data("origWidth", $magicLine.width());
        

        }
        
    }
    init();
    window.onresize = function(event) {
        init();
    };
    $("#menu li").hover(function() {
        $el = $(this).find('a');
        
        if($el.position()){
            leftPos = Math.floor($el.position().left-2);
            topPos = Math.floor($el.position().top+26);
        } else {
            leftPos = -2;
            topPos = 28;
        }
        newWidth = $el.width()+4;
        $magicLine.stop().animate({
            left: leftPos,
            top: topPos,
            width: newWidth
        });
    }, function() {
        $magicLine.stop().animate({
            top: $magicLine.data("origTop"),
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });    
    });



    //games

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
      			setTimeout(function () {
                    li.addClass('yes-off').removeClass('yes');
                    $("#slownikGameBord li").addClass('off');
                }, 2000);
        	}
        });
      }, 1000);
	    
	  }
});