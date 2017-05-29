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
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {


class Game {
  constructor(){


  }
  initializeEventListeners(){





    




  }



  changeBackground(e){
    let randomColor = this.colors[Math.floor(Math.random()*this.colors.length)];
    e.style.backgroundColor = "#f9f8c0";
  }

  changeBackgroundBack(e){
    e.style.backgroundColor = "white";
  }

}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class GameView{
  contructor(game, canvas){
    let cursorX;
    let cursorY;
    let colors = ["red", "blue", "lightblue", "orange", "cyan"];

    this.game = game;
    this.canvas = canvas;
  }

  setupCanvus() {
    this.loadMenu();

  }

  loadMenu(){
    const menu = document.createElement("section");
    menu.className = "menu";
    menu.innerHTML = "TEST";
    document.body.appendChild(menu);

    const windowSize = document.createElement("p");
    windowSize.setAttribute("id", "windowSize");
    windowSize.innerHTML = "w: h:";
    menu.appendChild(windowSize);

    const screenXY = document.createElement("p");
    screenXY.setAttribute("id", "screenXY");
    screenXY.innerHTML = "x: y:";
    menu.appendChild(screenXY);

    const cursorXY = document.createElement("p");
    cursorXY.setAttribute("id", "cursorXY");
    cursorXY.innerHTML = "x: y:";
    menu.appendChild(cursorXY);

    const menuButton = document.createElement("button");
    menuButton.className = "menuButton";
    menuButton.innerHTML = "Menu";
    menu.appendChild(menuButton);
    menuButton.addEventListener("click", ()=> console.log("hi"));

    window.onmousemove = function(e){
      this.cursorX = e.pageX;
      this.cursorY = e.pageY;

      document.getElementById('cursorXY')
        .innerHTML = "cx: " + this.cursorX + " cy: " + this.cursorY;
    };

    const formatSize = (num) => {
      let newNum = num.toString();
      while(newNum.length < 3){
        newNum = "0" + newNum;
      }
      return newNum;
    };

    window.addEventListener('resize', function(event){
      let width = formatSize(window.innerWidth) || 0;
      let height = formatSize(window.innerHeight) || 0;
      let screenX = formatSize(window.screenX) || 0;
      let screenY = formatSize(window.screenY) || 0;

      document.getElementById('windowSize')
        .innerHTML = "w: " + width + " h: " + height;
      document.getElementById('screenXY')
        .innerHTML = "x: " + screenX + " y: " + screenY;
    });

    const keyPress = (e) => {
      console.log("key");
      let char = e.keyCode;
      let letterBox = document.getElementById("letterBox");

      if(char !== 16){
        if(e.shiftKey){
          letterBox.innerHTML = String.fromCharCode(char);
        } else if (char >=65 && char <= 90  ){
          letterBox.innerHTML = String.fromCharCode(char + 32);
        }

        this.canvas = document.getElementById("canvas");
        this.changeBackground(this.canvas);
        setTimeout(
          this.changeBackgroundBack(this.canvas),
          100
        );
      }
    };

    window.addEventListener('keydown', keyPress);
  }

  start(){
    this.setupCanvus();
  }

}

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map