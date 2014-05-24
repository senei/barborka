jQuery( document ).ready(function( $ ) {
    $('ul.tabs li').on('touchstart click', function(){
        $('ul.tabs li').removeClass('selected');
        $('ul.content li').removeClass('selected');
        //
        num = $('ul.tabs li').index(this);
        $('ul.tabs li').eq(num).addClass('selected');
        $('ul.content li').eq(num).addClass('selected');
    });

    new memoGame('memoGame').init();
});