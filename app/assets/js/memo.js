
    memoGame = function (id) {
        var self = this;
        self.dom = {
            core: null,
            images: null,
            board: null
        };
        self.data = {
            boardWidth: 4,
            boardHeight: 2,
            imageCount: 4,
            imageMaxCount: 4,
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
            self.data.level ++;

            self.dom.images = jQuery('#imagesCache');
            if(self.dom.images.find('li').length == 0){
                self.dom.images.hide();
                self.dom.images.append('<li></li>');
                for (var i = 1; i <= self.data.imageMaxCount; i++) {
                    self.dom.images.append('<li><img src="/assets/img/gry/thiles/boardThile_' + i + '.png" alt="memo' + i + '" /></li>');
                    
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

            // if(self.data.boardWidth == 3) self.dom.board.css("width","550px"); 
            // else self.dom.board.css("width","720px"); 

            var counter = 0;
            for (var i = 0; i < self.data.boardHeight; i++) {
                self.data.tab[i] = [];
                for (var j = 0; j < self.data.boardWidth; j++) {
                    self.data.tab[i][j] = tabNumbers[counter++];
                    self.dom.board.append("<li id='board_"+i+"_"+j+"' />");
                    height = $('#board_0_0').width();
                    $('#board_'+ i + '_'+j).height(height);
                }
            }
            self.dom.board.find('li').on('touchstart click', function () {
                self.checkClick($(this));
            });
            
        };
        self.checkLevel = function () {
            self.data.imgTab = [1,2,3,4,5,6];
            self.dom.board.find('li').remove();
            self.data.selected = 0;
            //
            if (self.data.level > 3){
                self.data.boardWidth = 4;
                self.data.boardHeight = 3;
                self.data.imageCount = 6;
            }
        }
        
        self.checkClick = function (object) {
            var tabObject = (object.attr('id')).split('_');
            var number = self.data.tab[tabObject[1]][tabObject[2]];
            var img = self.dom.images.find('li').eq(number).find("img").clone();
            console.log(self.data.tab);
            console.log(number);
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
    