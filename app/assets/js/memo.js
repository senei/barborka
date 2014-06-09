
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
            imageMaxCount: 29,
            selected: 0,
            firstClick: false,

            firstNumber: null,
            secondNumber: null,
            firstIndexX: null,
            firstIndexY: null,
            secondIndexX: null,
            secondIndexY: null,

            tab: [],
            imgTab: [
                0,1,2,3,4,5,
                6,7,8,9,10,11,
                12,13,14,15,16,17,
                18,19,20,21,22,23,
                24,25,26,27,28 ],
            level: 0,
            size: 0

        };

        self.init = function () {
            self.dom.board = jQuery('#' + id);
            self.data.level ++;

            self.dom.images = jQuery('#imagesCache');
            // if(self.dom.images.find('li').length == 0){
            //     self.dom.images.hide();
            //     self.dom.images.append('<li></li>');
            //     for (var i = 1; i <= self.data.imageMaxCount; i++) {
            //         self.dom.images.append('<li><img src="/assets/img/gry/thiles/karta_' + i + '.png" alt="memo_' + i + '" /></li>');
                    
            //     }
            // }

            self.checkLevel();
            
            var tabNumbers = [];
            for (var i = 1; i <= self.data.imageCount; i++) {
                tabNumbers.push(i);
                tabNumbers.push(i);
            }
            
            iteration = self.data.imageCount;
            while (--iteration) self.randomizeArray(tabNumbers);

            var iteration = 29 - self.data.imageCount;
            while (--iteration) {
                var imgTabIndex = Math.floor( Math.random() * self.data.imgTab.length );
                self.data.imgTab.splice(imgTabIndex, 1);
            }

            var counter = 0;
            for (var i = 0; i < self.data.boardHeight; i++) {
                self.data.tab[i] = [];
                for (var j = 0; j < self.data.boardWidth; j++) {
                    self.data.tab[i][j] = tabNumbers[counter++];
                    self.dom.board.append("<li id='board_"+i+"_"+j+"' class='memo_"+(counter%3)+"'/>");
                    
                    // if(self.data.size == 0){
                    //     height = $(window).height()-180;
                    //     console.log(height);
                    //     if(height / 3 < self.data.size) self.data.size = height / 3;
                    //     width = 40+(self.data.size)*4+"px";
                    //     self.dom.board.css('max-width',width);
                    // }
                    self.data.size = $('#board_0_0').width();
                    $('#board_'+ i + '_'+j).height(self.data.size);
                }
            }
            var gornik = self.dom.images.find('li').eq(0).find("img").clone();
            self.dom.board.append(gornik);
            
            // if(self.data.boardWidth == 3) self.dom.board.css("margin-top", "0px");
            // else self.dom.board.css("margin-top", (self.data.size/2) + "px");

            self.dom.board.find('li').on('touchstart click', function () {
                self.checkClick($(this));
            });
            
        };

        window.onresize = function(event) {
            location.reload();
        };
        self.checkLevel = function () {
            self.data.imgTab = [
                0,1,2,3,4,5,
                6,7,8,9,10,11,
                12,13,14,15,16,17,
                18,19,20,21,22,23,
                24,25,26,27,28 ];
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
            var img = self.dom.images.find('li').eq(self.data.imgTab[number]).find("img").clone();
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
                        setTimeout(function () {
                            self.dom.board.find('#board_' + self.data.firstIndexX + '_' + self.data.firstIndexY).unbind('click').css('cursor', 'default').addClass('blocked');
                            self.dom.board.find('#board_' + self.data.secondIndexX + '_' + self.data.secondIndexY).unbind('click').css('cursor', 'default').addClass('blocked');
                        });                       
                        if (self.data.selected == self.data.imageCount) {
                           $('div.gornik')
                                .css('background-position-x', "0%")
                                .css('bottom',0); 
                            setTimeout(function () {
                                $('div.gornik')
                                    .css('background-position-x', "100%")
                                    .css('width', "340px")
                                    .css('height', "340px");
                                setTimeout(function () {
                                $('div.gornik')
                                    .css('background-position-x', "0%")
                                    .css('width', "320px")
                                    .css('height', "320px")
                                    .css('bottom',-400); 
                                 self.init();
                                }, 2000);
                                 //self.init();
                            }, 2000);
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
    