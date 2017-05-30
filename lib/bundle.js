/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const GameView = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.height = window.innerHeight;
  canvasEl.width = window.innerWidth;
  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx);
  new GameView(game, ctx).start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const movingLetter = __webpack_require__(3);

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.gameTime = 0;
    this.gameScore = 0;
    this.lyrics = [];
    this.letters = [];
  }

  moveLetters(){
    this.letters.forEach(letter => {
      letter.move();
    });
  }

  render(){
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.letters.forEach(function (letter) {
      letter.render(this.ctx);
    }.bind(this));
  }

  play(song){
    this.loadPlayer(song);
    this.loadScroller();
    this.loadScrollerText(song);
    this.setTimer();
    this.handleKeyPress();

    const animateCallback = () => {
      this.moveLetters();
      this.render();
    };
    //TODO: set this speed to calculate moment timings
    setInterval(()=>animateCallback(), 50);
  }



  setTimer(){
    const timer = document.getElementById("timer");
    const score = document.getElementById("score");
    const startTime = new Date().getTime();

    const updateTimer = setInterval(() => {
      let currentTime = new Date().getTime();
      this.gameTime = currentTime - startTime;
      timer.innerHTML = this.gameTime;
      // score.innerHTML = parseInt(timer.innerHTML) + 1000000;
      score.innerHTML = "SCORE: " + this.gameScore;
    }, 20);
  }

  loadPlayer(song){
    const musicPlayer = document.createElement("AUDIO");
    const song1 = document.createElement("source");
    song1.setAttribute("src", `${song}.mp3`);
    song1.setAttribute("type", "audio/mpeg");
    musicPlayer.appendChild(song1);
    musicPlayer.play();
  }
  loadScroller(){
    const ddd = document.createElement("section");
    ddd.className = "dododo-area";
    document.body.appendChild(ddd);

    const marquee = document.createElement("section");
    marquee.className = "marquee";
    ddd.appendChild(marquee);

    const letterBox = document.createElement("section");
    letterBox.setAttribute("id", "letterBox");
    letterBox.className = "letter-box";
    marquee.appendChild(letterBox);
  }

  loadScrollerText(song){
    if(song === "sandstorm"){
      this.lyrics = [
        [8000, "D"],
        [10000, "D"],
        [12000, "D"]
      ];
    }
    let lyrics = this.lyrics.slice(0);

    const loadText = () => {
      if(lyrics.length > 0 && Math.abs(lyrics[0][0] - this.gameTime - 5000) <= 20){
        let letter = lyrics.shift()[1];
        this.letters.push(new movingLetter(letter));
      }
    };
    setInterval( ()=> loadText() , 20);

  }

  handleKeyPress(){
    const keyPress = (e) => {
      let char = e.keyCode;
      let letterBox = document.getElementById("letterBox");

      if(char !== 16){
        if(e.shiftKey){
          letterBox.innerHTML = String.fromCharCode(char);
        } else if (char >=65 && char <= 90  ){
          char += 32;
          letterBox.innerHTML = String.fromCharCode(char);
        }
        setTimeout(() => (letterBox.innerHTML = ""), 100);
        this.handleScoring(char);
        this.changeBackground();
      }
    };

    window.addEventListener('keydown', keyPress);
  }

  changeBackground(){
    let container = document.getElementById("game-container");
    let colors = ["red", "blue", "lightblue", "orange", "cyan"];
    let randomColor = colors[Math.floor(Math.random()* colors.length)];
    // container.style.backgroundColor = "#black";
    container.style.backgroundColor = "#f9f8c0";
    setTimeout(() => (container.style.background = "black"), 100);
  }

}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

class GameView{
  constructor(game){
    let modalVisible = true;
    let songChoice;
    let startModal;
    let cursorX;
    let cursorY;

    this.game = game;
  }

  start(){
    this.loadStartModal();
    this.loadMenu();
  }

  loadStartModal(){
    if(!this.startModal){
      this.startModal = document.createElement("div");
      this.startModal.setAttribute("id", "startModal");
      this.startModal.className = "startModal";
      document.body.appendChild(this.startModal);

      const startGameButton = document.createElement("button");
      startGameButton.className = "startGameButton";
      startGameButton.innerHTML = "Start";
      this.startModal.appendChild(startGameButton);
      startGameButton.addEventListener("click", () => {
        this.songChoice = songDropMenu.options[songDropMenu.selectedIndex].text;
        this.closeModal();
        this.renderGame();
        startGameButton.classList.add('hidden');
      });

      const songDropMenu = document.createElement("select");
      songDropMenu.className = "songDropMenu";

      const song1 = new Option();
      song1.value = 1;
      song1.text = "sandstorm";
      songDropMenu.options.add(song1);

      const song2 = new Option();
      song2.value = 2;
      song2.text = "closer";
      songDropMenu.options.add(song2);

      this.startModal.appendChild(songDropMenu);

      const closeModalButton = document.createElement("button");
      closeModalButton.className = "startGameButton";
      closeModalButton.innerHTML = "Close";
      this.startModal.appendChild(closeModalButton);
      closeModalButton.addEventListener("click", () => {
        this.closeModal();
      });
    }

  }
  openModal(){
    if(this.modalVisible === false){
      this.modalVisible = true;
      this.startModal.classList.remove('hidden');
    }
  }

  closeModal(){
    if(this.startModal){
      this.modalVisible = false;
      this.startModal.classList.add('hidden');
    }
  }

  renderGame(){
    this.game.play(this.songChoice);
  }

  loadMenu(){
    const menu = document.createElement("section");
    menu.className = "menu";
    document.body.appendChild(menu);

    const scoreBox = document.createElement("section");
    scoreBox.className = "scoreBox";
    document.body.appendChild(scoreBox);

    // const windowSize = document.createElement("p");
    // windowSize.setAttribute("id", "windowSize");
    // windowSize.innerHTML = "w: h:";
    // menu.appendChild(windowSize);
    //
    // const screenXY = document.createElement("p");
    // screenXY.setAttribute("id", "screenXY");
    // screenXY.innerHTML = "x: y:";
    // menu.appendChild(screenXY);

    const cursorXY = document.createElement("p");
    cursorXY.setAttribute("id", "cursorXY");
    cursorXY.innerHTML = "x: y:";
    menu.appendChild(cursorXY);

    const timer = document.createElement("p");
    timer.className = "timer";
    timer.setAttribute("id", "timer");
    timer.innerHTML = "timer";
    menu.appendChild(timer);

    const score = document.createElement("p");
    score.className = "score";
    score.setAttribute("id", "score");
    score.innerHTML = "score";
    scoreBox.appendChild(score);

    const menuButton = document.createElement("button");
    menuButton.className = "menuButton";
    menuButton.innerHTML = "Menu";
    menu.appendChild(menuButton);
    menuButton.addEventListener("click", ()=> this.openModal());

    window.onmousemove = function(e){
      this.cursorX = e.pageX;
      this.cursorY = e.pageY;

      document.getElementById('cursorXY')
        .innerHTML = "cx: " + this.cursorX + " cy: " + this.cursorY;
    };

    // const formatSize = (num) => {
    //   let newNum = num.toString();
    //   while(newNum.length < 3){
    //     newNum = "0" + newNum;
    //   }
    //   return newNum;
    // };

    // window.addEventListener('resize', function(event){
    //   let width = formatSize(window.innerWidth) || 0;
    //   let height = formatSize(window.innerHeight) || 0;
    //   let screenX = formatSize(window.screenX) || 0;
    //   let screenY = formatSize(window.screenY) || 0;
    //
    //   document.getElementById('windowSize')
    //     .innerHTML = "w: " + width + " h: " + height;
    //   document.getElementById('screenXY')
    //     .innerHTML = "x: " + screenX + " y: " + screenY;
    // });
  }

}

module.exports = GameView;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class MovingLetter {
  constructor(options){
    this.vel = [-1,0];
    this.color = "red";
    this.letter = "D";
    this.radius = 100;
    this.pos = [window.innerWidth, (window.innerHeight)* .72];
  }

  render(ctx){
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.font = "85px Rubik";
    ctx.fillText(this.letter, this.pos[0], this.pos[1]);
  }

  move(){
    this.pos = [this.pos[0] -10, this.pos[1]];
    // if(this.game.isOutOfBounds(this.pos)){
    //   this.remove();
    // }
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingLetter;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map