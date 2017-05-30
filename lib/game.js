const movingLetter = require('./moving_letter');

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.gameTime = 0;
    this.letters = [];
    this.letters.push(new movingLetter);
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
      score.innerHTML = parseInt(timer.innerHTML) + 1000000;
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
    let lyrics;
    if(song === "sandstorm"){
      lyrics = [
        [2000, "D"],
        [3000, "D"],
        [3500, "D"],
        [4000, "D"],
        [6000, "D"],
        [8000, "D"],
        [10000, "D"],
        [12000, "D"]

      ];
    }

    const loadText = () => {

      if(lyrics.length > 0 && Math.abs(this.gameTime - lyrics[0][0]) <= 10){
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
          letterBox.innerHTML = String.fromCharCode(char + 32);
        }

        let container = document.getElementById("game-container");
        this.changeBackground(container);
        setTimeout(() => this.changeBackgroundBack(container), 100);
      }
    };

    window.addEventListener('keydown', keyPress);
  }

  changeBackground(e){
    let colors = ["red", "blue", "lightblue", "orange", "cyan"];
    let randomColor = colors[Math.floor(Math.random()* colors.length)];
    // e.style.backgroundColor = "#f9f8c0";
    e.style.backgroundColor = "#black";
  }

  changeBackgroundBack(e){
    e.style.backgroundColor = "black";
  }

}

module.exports = Game;
