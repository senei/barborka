$(function() {
	var $magicLine = $("#menu #magic-line");

	function init() {
		if ($magicLine.length == 1) {
			if ($(".current_page a").length == 1) {
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

	function active() {
		$el = $('li.active').find('a');

		if ($el.position()) {
			leftPos = Math.floor($el.position().left - 2);
			topPos = Math.floor($el.position().top + 26);
			newWidth = $el.width() + 4;
		} else {
			leftPos = -2;
			topPos = 28;
			newWidth = 0;
		}

		$magicLine.stop().animate({
			left: leftPos,
			top: topPos,
			width: newWidth
		});
	}
	init();
	window.onresize = function(event) {
		init();
	};
	$("#menu li").hover(function() {
		$el = $(this).find('a');
		if ($el.position()) {
			leftPos = Math.floor($el.position().left - 2);
			topPos = Math.floor($el.position().top + 26);
			newWidth = $el.width() + 4;
		} else {
			leftPos = -2;
			topPos = 28;
			newWidth = 0;
		}
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

	// Cache selectors
	var lastId,
		topMenu = $("header"),
		topMenuHeight = topMenu.outerHeight(),
		// All list items
		menuItems = topMenu.find("a[href^='/#']"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function() {
			var href = $(this).attr("href").slice(1);
			var item = $(href);
			if (item.length) {
				return item;
			}
		});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e) {
		var href = $(this).attr("href").slice(1),
			offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function() {
		// Get container scroll position
		var fromTop = $(this).scrollTop() + topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop)
				return this;
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";
		
		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
				.parent().removeClass("active")
				.end().filter("[href*='/#" + id + "']").parent().addClass("active");
			active();
		}
	});

	//games

	$('ul.tabs li').on('touchstart click', function() {
		$('ul.tabs li').removeClass('selected');
		$('ul.content li').removeClass('selected');
		//
		num = $('ul.tabs li').index(this);
		$('ul.tabs li').eq(num).addClass('selected');
		$('ul.content li').eq(num).addClass('selected');
	});

	if ($("section.games").length > 0) {
		// height = Math.floor($(window).height() / 3 - 180 / 3);
		// width = 40 + (height) * 4 + "px";
		// height = 40 + (height) * 3 + "px";
		// $("section.games").css('max-width', width).css('max-height', height);

		if ($("#memoGame").length > 0) {
			new memoGame('memoGame').init();
		}
		if ($("#slownikGameBord").length > 0) {
			new slowaGame('memoGame').init();	

			// setTimeout(function() {
			// 	$("#slownikGameBord li").removeClass('off');
			// 	$("#slownikGameBord li button").on('touchstart click', function() {
			// 		var li = $(this).parent();
			// 		if (li.hasClass('no-off')) {
			// 			li.addClass('no').removeClass('no-off');
			// 			setTimeout(function() {
			// 				li.addClass('no-off').removeClass('no');
			// 			}, 1000);
			// 		} else if (li.hasClass('yes-off')) {
			// 			li.addClass('yes').removeClass('yes-off');
			// 			setTimeout(function() {
			// 				li.addClass('yes-off').removeClass('yes');
			// 				$("#slownikGameBord li").addClass('off');
			// 			}, 2000);
			// 		}
			// 	});
			// }, 1000);

		}
	}
});
