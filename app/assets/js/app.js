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
		if ($("#memoGame").length > 0) {
			new memoGame('memoGame').init();
		}
		if ($("#slownikGameBord").length > 0) {
			new slowaGame('memoGame').init();	
		}
	}
	
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
		topMenuHeight = topMenu.outerHeight()+50,
		// All list items
		menuItems = topMenu.find("a[href*='#']"),
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
			offsetTop = href === "/#" ? 0 : $(href).offset().top - topMenuHeight + 1;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function() {
		if ($(".current_page").length == 0) {

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
		}
	});


});
