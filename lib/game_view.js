const Game = require('./game');

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
        songDropMenu.classList.add('hidden');
        resetGameButton.classList.remove('hidden');
      });

      const resetGameButton = document.createElement("button");
      resetGameButton.className = "startGameButton hidden";
      resetGameButton.innerHTML = "Reset";
      this.startModal.appendChild(resetGameButton);
      resetGameButton.addEventListener("click", () => {
        this.game.reset();
        resetGameButton.classList.add('hidden');
        startGameButton.classList.remove('hidden');
        songDropMenu.classList.remove('hidden');
        // this.game.musicPlayer.currentTime = 0;
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
      this.game.pause = false;
      this.modalVisible = false;
      this.startModal.classList.add('hidden');
      if(this.game.startTime > 0){
        this.game.restartTime = new Date().getTime();
        this.game.pauseDelta += this.game.restartTime - this.game.pauseTime;
        this.game.musicPlayer.play();
      }
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
    score.innerHTML = "SCORE: 0";
    scoreBox.appendChild(score);


    const clickMenuButton = () => {
      this.openModal();
      if(this.game.startTime){
        this.game.pause = true;
        this.game.pauseTime = new Date().getTime();
        this.game.musicPlayer.pause();
      }
    };


    const menuButton = document.createElement("button");
    menuButton.className = "menuButton";
    menuButton.innerHTML = "Menu";
    menu.appendChild(menuButton);
    menuButton.addEventListener("click", clickMenuButton);




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
