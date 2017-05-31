const movingLetter = require('./moving_letter');

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.gameTime = 0;
    this.gameScore = 0;
    this.lyricsToScore = [];
    this.lyricsToScroll = [];
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

    setInterval(() => animateCallback(), 20);
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

      let lyrics = this.lyricsToScore;
      if(lyrics.length > 0 && this.gameTime - lyrics[0][0] > 400){
        lyrics.shift();
      }
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
      this.lyricsToScroll = [
        [8000, "D"],
        [10000, "D"],
        [12000, "D"]
      ];
      this.lyricsToScore = this.lyricsToScroll.slice(0) ;

    }
    let lyrics = this.lyricsToScroll.slice(0);

    const loadText = () => {
      if(lyrics.length > 0 && Math.abs(lyrics[0][0] - this.gameTime - 3000) <= 20){
        let letter = lyrics.shift()[1];
        this.letters.push(new movingLetter(letter));
      }
      //FOR TESTING SYNC
      // if(8000 - this.gameTime <= 20){
      //   debugger;
      // }
    };
    setInterval(()=> loadText() , 20);

  }

  handleKeyPress(){
    const keyPress = (e) => {
      let char = e.keyCode;
      let letterBox = document.getElementById("letterBox");

      if(char !== 16){
        if(e.shiftKey){
          letterBox.innerHTML = String.fromCharCode(char);
        } else if (char >=65 && char <= 90){
          char += 32;
          letterBox.innerHTML = String.fromCharCode(char);
        }
        setTimeout(() => (letterBox.innerHTML = ""), 100);
        this.handleScoring(String.fromCharCode(char));
        this.changeBackground();
      }
    };

    window.addEventListener('keydown', keyPress);
  }

  changeBackground(){
    let container = document.getElementById("game-container");
    let colors = ["red", "blue", "lightblue", "orange", "cyan"];
    let randomColor = colors[Math.floor(Math.random()* colors.length)];
    container.style.backgroundColor = "#black";
    // container.style.backgroundColor = "#f9f8c0";
    setTimeout(() => (container.style.background = "black"), 100);
  }

  handleScoring(char){
    let lyrics = this.lyricsToScore;
    // console.log(this.gameTime, lyrics[0][0]);
    while(lyrics.length > 0){
      if(Math.abs(this.gameTime - lyrics[0][0]) <= 200){
        if(char === lyrics[0][1]){
          this.gameScore += 4000;
          lyrics.shift();
        }
      } else if(Math.abs(this.gameTime - lyrics[0][0]) <= 350){
        console.log("MISS!");
        lyrics.shift();
      } else {
        break;
      }
    }
  }

}

module.exports = Game;
