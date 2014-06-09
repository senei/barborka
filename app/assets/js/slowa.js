
slowaGame = function (id) {
	var self = this;
	self.dom = {
		core: null,
		images: null,
		names: null,
		board: null
	};
	self.data = {
		level: 0,
		size: 0
	};

	self.init = function () {
		self.dom.images = jQuery('#slownikGame li');
		self.dom.board = jQuery("#slownikGameBord li");
    self.randomizeArray(self.dom.images);
    for (var i = 0; i < self.dom.images.length; i++) {
      self.dom.images.parent().append(self.dom.images[i]);
    };

		$(self.dom.board).find('button').on('touchstart click', function() {
			var li = $(this).parent();
			if (li.hasClass('no-off')) {
				li.addClass('no').removeClass('no-off');
				setTimeout(function() {
					li.addClass('no-off').removeClass('no');
				}, 1000);
			} else if (li.hasClass('yes-off')) {
				li.addClass('yes').removeClass('yes-off');
				setTimeout(function() {
					li.addClass('yes-off').removeClass('yes');
					$(self.dom.board).addClass('off');
					self.nextActive();
				}, 2000);
			}
		});

    self.setNames(self.dom.names);
	};

	window.onresize = function(event) {
		location.reload();
	};
	
	self.nextActive = function (object) {
		$(self.dom.images[0]).addClass('hide');
		setTimeout(function() {
		$(self.dom.images).parent().append(self.dom.images[0]);
		self.dom.images = jQuery('#slownikGame li');
		
		self.setNames(self.dom.names);

		}, 2000);

	};

	self.setNames = function (array) {
    
    self.dom.names = [
    	$(self.dom.images[0]).find("img").attr('name'),
    	$(self.dom.images[3]).find("img").attr('name'),
    	$(self.dom.images[6]).find("img").attr('name'),
    	$(self.dom.images[9]).find("img").attr('name')
    ];

    trueName = (self.dom.names[0]);
    self.randomizeArray(self.dom.names);

    for (var i = 0; i < self.dom.board.length; i++) {
			name = self.dom.names[i];
			if(trueName == name) {
				jQuery(self.dom.board[i]).attr('class', 'yes-off');
			} else {
				jQuery(self.dom.board[i]).attr('class', 'no-off');
			}
			jQuery(self.dom.board[i]).find('button').text(name);
		};
		setTimeout(function() {
    	self.dom.board.removeClass('off');
    }, 1000);
	};

	self.randomizeArray = function (array) { // Fisher-Yates method
		var counter = array.length, temp, index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        //
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
	};

	self.hide = function () {
		
	};
};
