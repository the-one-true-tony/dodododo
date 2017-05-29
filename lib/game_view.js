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
