memoGame=function(a){var b=this;b.dom={core:null,images:null,board:null},b.data={boardWidth:4,boardHeight:2,imageCount:4,imageMaxCount:4,selected:0,firstClick:!1,firstNumber:null,secondNumber:null,firstIndexX:null,firstIndexY:null,secondIndexX:null,secondIndexY:null,tab:[],imgTab:[1,2,3,4,5,6],level:0},b.init=function(){if(b.dom.board=jQuery("#"+a),b.data.level++,b.dom.images=jQuery("#imagesCache"),0==b.dom.images.find("li").length){b.dom.images.hide(),b.dom.images.append("<li></li>");for(var c=1;c<=b.data.imageMaxCount;c++)b.dom.images.append('<li><img src="http://senei.github.io/barborka/assets/img/gry/thiles/boardThile_'+c+'.png" alt="memo'+c+'" /></li>')}b.checkLevel();for(var d=[],c=1;c<=b.data.imageCount;c++)d.push(c),d.push(c);for(var e=7-b.data.imageCount;--e;){var f=Math.floor(Math.random()*b.data.imgTab.length);b.data.imgTab.splice(f,1)}for(e=b.data.imageCount;--e;)b.randomizeArray(d);for(var g=0,c=0;c<b.data.boardHeight;c++){b.data.tab[c]=[];for(var h=0;h<b.data.boardWidth;h++)b.data.tab[c][h]=d[g++],b.dom.board.append("<li id='board_"+c+"_"+h+"' />"),height=$("#board_0_0").width(),$("#board_"+c+"_"+h).height(height)}b.dom.board.find("li").on("touchstart click",function(){b.checkClick($(this))})},b.checkLevel=function(){b.data.imgTab=[1,2,3,4,5,6],b.dom.board.find("li").remove(),b.data.selected=0,b.data.level>3&&(b.data.boardWidth=4,b.data.boardHeight=3,b.data.imageCount=6)},b.checkClick=function(a){var c=a.attr("id").split("_"),d=b.data.tab[c[1]][c[2]],e=b.dom.images.find("li").eq(d).find("img").clone();console.log(b.data.tab),console.log(d),b.dom.board.find("#"+a.attr("id")).html(e),b.data.firstClick?(b.data.secondNumber=b.data.tab[c[1]][c[2]],b.data.secondIndexX=c[1],b.data.secondIndexY=c[2],(b.data.firstIndexX!=b.data.secondIndexX||b.data.firstIndexY!=b.data.secondIndexY)&&(b.data.firstNumber==b.data.secondNumber?(b.data.selected++,b.dom.board.find("#board_"+b.data.firstIndexX+"_"+b.data.firstIndexY).unbind("click").css("cursor","default").addClass("blocked"),b.dom.board.find("#board_"+b.data.secondIndexX+"_"+b.data.secondIndexY).unbind("click").css("cursor","default").addClass("blocked"),b.data.selected==b.data.imageCount&&(alert("Wygrałeś! Gratulacje! lev:"+b.data.level),setTimeout(function(){b.init()},1e3))):(b.dom.board.find("li").unbind("click"),setTimeout(function(){b.hide()},1e3)),b.data.firstClick=!1)):(b.data.firstClick=!0,b.data.firstNumber=d,b.data.firstIndexX=c[1],b.data.firstIndexY=c[2])},b.randomizeArray=function(a){var b=a.length;if(0==b)return!1;for(;--b;){var c=Math.floor(Math.random()*(b+1)),d=a[b],e=a[c];a[b]=e,a[c]=d}},b.hide=function(){b.dom.board.find("#board_"+b.data.firstIndexX+"_"+b.data.firstIndexY).html(""),b.dom.board.find("#board_"+b.data.secondIndexX+"_"+b.data.secondIndexY).html(""),b.dom.board.find("li").not(".blocked").bind("click",function(){b.checkClick($(this))})}},$(function(){function a(){1==b.length&&(1==$(".current_page a").length&&b.width($(".current_page a").width()+4).css("left",$(".current_page a").position().left-2).css("top",$(".current_page a").position().top+26),b.data("origTop",Math.floor(b.position().top)).data("origLeft",Math.floor(b.position().left)).data("origWidth",b.width()))}var b=$("#menu #magic-line");a(),window.onresize=function(){a()},$("#menu li").hover(function(){$el=$(this).find("a"),$el.position()?(leftPos=Math.floor($el.position().left-2),topPos=Math.floor($el.position().top+26)):(leftPos=-2,topPos=28),newWidth=$el.width()+4,b.stop().animate({left:leftPos,top:topPos,width:newWidth})},function(){b.stop().animate({top:b.data("origTop"),left:b.data("origLeft"),width:b.data("origWidth")})}),$("ul.tabs li").on("touchstart click",function(){$("ul.tabs li").removeClass("selected"),$("ul.content li").removeClass("selected"),num=$("ul.tabs li").index(this),$("ul.tabs li").eq(num).addClass("selected"),$("ul.content li").eq(num).addClass("selected")}),$("#memoGame").length>0&&new memoGame("memoGame").init(),$("#slownikGameBord").length>0&&setTimeout(function(){$("#slownikGameBord li").removeClass("off"),$("#slownikGameBord li button").on("touchstart click",function(){var a=$(this).parent();a.hasClass("no-off")?(a.addClass("no").removeClass("no-off"),setTimeout(function(){a.addClass("no-off").removeClass("no")},1e3)):a.hasClass("yes-off")&&a.addClass("yes").removeClass("yes-off")})},1e3)});