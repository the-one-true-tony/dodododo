
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
