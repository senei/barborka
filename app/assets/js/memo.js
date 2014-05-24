
    memoGame = function (id) {
        var self = this;
        self.dom = {
            core: null,
            images: null,
            board: null
        };
        self.data = {
            boardWidth: 3,
            boardHeight: 2,
            imageCount: 3,
            imageMaxCount: 6,
            selected: 0,
            firstClick: false,

            firstNumber: null,
            secondNumber: null,
            firstIndexX: null,
            firstIndexY: null,
            secondIndexX: null,
            secondIndexY: null,

            tab: [],
            imgTab: [1,2,3,4,5,6],
            level: 0

        };

        self.init = function () {
            self.dom.board = jQuery('#' + id);

            if ( self.dom.board.length > 0 ){
                self.data.level ++;

                self.dom.images = jQuery('#imagesCache');
                if(self.dom.images.find('li').length == 0){
                    self.dom.images.hide();
                    for (var i = 1; i <= self.data.imageMaxCount; i++) {
                        self.dom.images.append('<li><img width=160 src="/assets/img/thiles/boardThile_' + i + '.png" alt="memo' + i + '" /></li>');
                    }
                }

                self.checkLevel();
                
                var tabNumbers = [];
                for (var i = 1; i <= self.data.imageCount; i++) {
                    tabNumbers.push(i);
                    tabNumbers.push(i);
                }
                
                var iteration = 7 - self.data.imageCount;
                while (--iteration) {
                    var imgTabIndex = Math.floor( Math.random() * self.data.imgTab.length );
                    self.data.imgTab.splice(imgTabIndex, 1);
                }

                iteration = self.data.imageCount;
                while (--iteration) self.randomizeArray(tabNumbers);

                if(self.data.boardWidth == 3) self.dom.board.css("width","550px"); 
                else self.dom.board.css("width","720px"); 

                var counter = 0;
                for (var i = 0; i < self.data.boardHeight; i++) {
                    self.data.tab[i] = [];
                    for (var j = 0; j < self.data.boardWidth; j++) {
                        self.data.tab[i][j] = tabNumbers[counter++];
                        self.dom.board.append("<li id='board_"+i+"_"+j+"' />")
                    }
                }
                self.dom.board.find('li').on('touchstart click', function () {
                    self.checkClick($(this));
                });
            }
        };
        self.checkLevel = function () {
            self.data.imgTab = [1,2,3,4,5,6];
            self.dom.board.find('li').remove();
            self.data.selected = 0;
            //
            if (self.data.level > 6){
                self.data.boardWidth = 4;
                self.data.boardHeight = 3;
                self.data.imageCount = 6;
            } else if(self.data.level > 3){
                self.data.boardWidth = 4;
                self.data.imageCount = 4;
            }
        }
        
        self.checkClick = function (object) {
            var tabObject = (object.attr('id')).split('_');
            var number = self.data.tab[tabObject[1]][tabObject[2]];

            var img = '<img  width=160 src="/assets/img/thiles/boardThile_' + self.data.imgTab[number-1] + '.png" alt="memo' + number + '" />';
            self.dom.board.find('#' + object.attr('id')).html(img);
            if (!self.data.firstClick) {
                self.data.firstClick = true;
                self.data.firstNumber = number;
                self.data.firstIndexX = tabObject[1];
                self.data.firstIndexY = tabObject[2];
            } else { // second click
                self.data.secondNumber = self.data.tab[tabObject[1]][tabObject[2]];
                self.data.secondIndexX = tabObject[1];
                self.data.secondIndexY = tabObject[2];
                if (self.data.firstIndexX != self.data.secondIndexX || self.data.firstIndexY != self.data.secondIndexY) {
                    if (self.data.firstNumber == self.data.secondNumber) { // correct
                        self.data.selected++;
                        self.dom.board.find('#board_' + self.data.firstIndexX + '_' + self.data.firstIndexY).unbind('click').css('cursor', 'default').addClass('blocked');
                        self.dom.board.find('#board_' + self.data.secondIndexX + '_' + self.data.secondIndexY).unbind('click').css('cursor', 'default').addClass('blocked');
                        
                        

                        if (self.data.selected == self.data.imageCount) {
                            alert('Wygrałeś! Gratulacje! lev:'+self.data.level);
                            setTimeout(function () {
                                self.init();
                            }, 1000);
                        }
                    } else { // incorrect
                        self.dom.board.find('li').unbind('click');
                        setTimeout(function () {
                            self.hide();
                        }, 1000);
                    }
                    self.data.firstClick = false;
                }
            }
        };

        self.randomizeArray = function (array) { // Fisher-Yates method
            var i = array.length;
            if (i == 0) return false;
            while (--i) {
                var j = Math.floor(Math.random() * (i + 1));
                var tempi = array[i];
                var tempj = array[j];
                array[i] = tempj;
                array[j] = tempi;
            }
        };

        self.hide = function () {
            self.dom.board.find('#board_' + self.data.firstIndexX + '_' + self.data.firstIndexY).html('');
            self.dom.board.find('#board_' + self.data.secondIndexX + '_' + self.data.secondIndexY).html('');
            self.dom.board.find('li').not( ".blocked" ).bind('click', function () {
                self.checkClick($(this));
            });
        };
    };
    