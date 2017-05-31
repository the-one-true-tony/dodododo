const movingLetter = require('./moving_letter');

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.gameTime = 0;
    this.gameScore = 0;
    this.lyricsToScore = [];
    this.lyricsToScroll = [];
    this.letters = [];
    //FOR TESTING SYNC
    this.letters.push(new movingLetter("D", this));
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
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
    this.loadPlayer(song);
    this.loadScroller();
    this.loadScrollerText(song);
    this.setTimer();

    const animateCallback = () => {
      this.moveLetters();
      this.render();
    };
    console.log("hllo");
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
      if(lyrics.length > 0 && this.gameTime - lyrics[0][0] > 350){
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
      this.lyricsToScroll = [[16833,'d'],[16947,'d'],[17058,'d'],[17169,'d'],[17280,'d'],[20000,'D'],[20414,'d'],[20525,'d'],[20636,'d'],[20747,'d'],[20858,'d'],[23911,'d'],[24022,'d'],[24133,'d'],[24244,'d'],[24355,'d'],[24786,'d'],[24897,'d'],[25008,'d'],[25119,'d'],[25230,'d'],[25341,'d'],[25652,'d'],[25763,'d'],[25874,'d'],[25985,'d'],[26096,'d'],[26548,'d'],[26659,'d'],[26770,'d'],[26881,'d'],[26992,'d'],[27411,'d'],[27522,'d'],[27633,'d'],[27744,'d'],[27855,'d'],[27966,'d'],[28077,'d'],[28188,'d'],[28299,'d'],[28410,'d'],[28521,'d'],[28632,'d'],[28743,'d'],[28854,'d'],[28965,'d'],[29076,'d'],[29187,'d'],[29298,'d'],[31026,'d'],[31137,'d'],[31248,'d'],[31359,'d'],[31470,'d'],[31595,'d'],[31706,'d'],[31817,'d'],[31928,'d'],[32039,'d'],[32150,'d'],[32261,'d'],[32483,'D'],[32588,'D'],[32693,'D'],[32798,'D'],[32903,'D'],[33008,'D'],[33113,'D'],[33379,'D'],[33484,'D'],[33589,'D'],[33694,'D'],[33799,'D'],[33904,'D'],[34009,'D'],[34266,'d'],[34371,'d'],[34476,'d'],[34581,'d'],[34686,'d'],[34791,'d'],[34896,'d'],[35162,'d'],[35267,'d'],[35372,'d'],[35477,'d'],[35582,'d'],[35687,'d'],[35792,'d'],[36033,'D'],[36138,'D'],[36243,'d'],[36348,'d'],[36453,'d'],[36558,'d'],[36663,'d'],[36930,'d'],[37035,'d'],[37140,'d'],[37245,'d'],[37350,'d'],[37455,'d'],[37560,'d'],[37790,'D'],[37895,'D'],[38000,'d'],[38105,'d'],[38210,'d'],[38315,'d'],[38420,'d'],[38654,'d'],[38759,'d'],[38864,'d'],[38969,'d'],[39074,'d'],[39179,'d'],[39284,'d'],[39563,'D'],[39668,'D'],[39773,'D'],[39878,'D'],[39983,'D'],[40088,'D'],[40193,'D'],[40419,'d'],[40524,'d'],[40629,'d'],[40734,'d'],[40839,'d'],[40944,'d'],[41049,'d'],[41300,'d'],[41450,'d'],[41600,'d'],[41750,'d'],[41900,'d'],[42050,'d'],[42193,'d'],[42200,'d'],[42298,'d'],[42403,'d'],[42508,'d'],[42613,'d'],[42718,'d'],[42823,'d'],[43060,'D'],[43165,'D'],[43270,'d'],[43375,'d'],[43480,'d'],[43585,'d'],[43690,'d'],[43965,'d'],[44070,'d'],[44175,'d'],[44280,'d'],[44385,'d'],[44490,'d'],[44595,'d'],[44867,'D'],[44972,'D'],[45077,'d'],[45182,'d'],[45287,'d'],[45392,'d'],[45497,'d'],[45711,'d'],[45816,'d'],[45921,'d'],[46026,'d'],[46131,'d'],[46236,'d'],[46341,'d'],[46608,'D'],[46713,'D'],[46818,'D'],[46923,'D'],[47028,'D'],[47133,'D'],[47238,'D'],[47481,'d'],[47586,'d'],[47691,'d'],[47796,'d'],[47901,'d'],[48006,'d'],[48111,'d'],[48368,'d'],[48473,'d'],[48578,'d'],[48683,'d'],[48788,'d'],[48893,'d'],[48998,'d'],[49260,'d'],[49365,'d'],[49470,'d'],[49575,'d'],[49680,'d'],[49785,'d'],[49890,'d'],[50112,'D'],[50217,'D'],[50322,'d'],[50427,'d'],[50532,'d'],[50637,'d'],[50742,'d'],[51010,'d'],[51115,'d'],[51220,'d'],[51325,'d'],[51430,'d'],[51535,'d'],[51640,'d'],[51888,'D'],[51993,'D'],[52098,'d'],[52203,'d'],[52308,'d'],[52413,'d'],[52518,'d'],[52791,'d'],[52896,'d'],[53001,'d'],[53106,'d'],[53211,'d'],[53316,'d'],[53421,'d'],[53679,'D'],[53784,'D'],[53889,'D'],[53994,'D'],[54099,'D'],[54204,'D'],[54309,'D'],[54522,'d'],[54627,'d'],[54732,'d'],[54837,'d'],[54942,'d'],[55047,'d'],[55152,'d'],[55409,'d'],[55514,'d'],[55619,'d'],[55724,'d'],[55829,'d'],[55934,'d'],[56039,'d'],[56281,'d'],[56386,'d'],[56491,'d'],[56596,'d'],[56701,'d'],[56806,'d'],[56911,'d'],[57178,'D'],[57283,'D'],[57388,'d'],[57493,'d'],[57598,'d'],[57703,'d'],[57808,'d'],[58070,'d'],[58175,'d'],[58280,'d'],[58385,'d'],[58490,'d'],[58595,'d'],[58700,'d'],[58964,'D'],[59069,'D'],[59174,'d'],[59279,'d'],[59384,'d'],[59489,'d'],[59594,'d'],[59886,'d'],[59991,'d'],[60096,'d'],[60201,'d'],[60306,'d'],[60411,'d'],[60516,'d'],[60737,'D'],[60919,'d'],[61024,'d'],[61129,'d'],[61339,'d'],[61587,'d'],[61692,'d'],[61797,'d'],[61902,'d'],[62045,'d'],[62240,'D'],[62481,'D'],[62699,'d'],[62804,'d'],[62909,'d'],[63128,'d'],[63364,'d'],[63469,'d'],[63574,'d'],[63679,'d'],[63784,'d'],[64005,'d'],[64231,'D'],[64336,'D'],[64441,'D'],[64546,'D'],[64651,'D'],[64902,'D'],[65085,'d'],[65190,'d'],[65295,'d'],[65400,'d'],[65505,'d'],[65715,'d'],[66005,'d'],[66110,'d'],[66215,'d'],[66320,'d'],[66425,'d'],[66530,'d'],[66869,'d'],[66974,'d'],[67079,'d'],[67184,'d'],[67289,'d'],[67499,'d'],[67752,'D'],[67986,'d'],[68091,'d'],[68196,'d'],[68406,'d'],[68632,'d'],[68737,'d'],[68842,'d'],[68947,'d'],[69052,'d'],[69262,'D'],[69509,'D'],[69738,'d'],[69843,'d'],[69948,'d'],[70158,'d'],[70401,'d'],[70506,'d'],[70611,'d'],[70716,'d'],[70821,'d'],[71031,'d'],[71283,'D'],[71388,'D'],[71493,'D'],[71598,'D'],[71703,'D'],[71905,'D'],[72157,'d'],[72262,'d'],[72367,'d'],[72472,'d'],[72577,'d'],[72787,'d'],[73049,'d'],[73154,'d'],[73259,'d'],[73364,'d'],[73469,'d'],[73679,'d'],[73905,'d'],[74010,'d'],[74115,'d'],[74220,'d'],[74325,'d'],[74535,'D'],[74822,'D'],[74999,'d'],[75104,'d'],[75209,'d'],[75419,'d'],[75693,'d'],[75798,'d'],[75903,'d'],[76008,'d'],[76113,'d'],[76323,'D'],[76552,'D'],[76769,'d'],[76874,'d'],[76979,'d'],[77189,'d'],[77440,'d'],[77545,'d'],[77650,'d'],[77755,'d'],[77860,'d'],[78070,'D'],[78331,'D'],[78564,'d'],[78669,'d'],[78774,'d'],[78984,'d'],[79216,'d'],[79321,'d'],[79426,'d'],[79531,'d'],[79636,'d'],[79846,'D'],[80088,'D'],[80334,'d'],[80439,'d'],[80544,'d'],[80754,'D'],[80868,'D'],[81207,'d'],[81312,'d'],[81417,'d'],[81627,'D'],[81856,'D'],[82078,'d'],[82183,'d'],[82288,'d'],[82498,'D'],[82731,'D'],[82961,'d'],[83066,'d'],[83171,'d'],[83381,'D'],[83633,'D'],[83865,'d'],[83970,'d'],[84074,'D'],[84267,'d'],[84372,'d'],[84582,'D'],[84719,'d'],[84824,'d'],[85034,'D'],[85626,'d'],[85731,'d'],[85941,'D'],[86059,'d'],[86164,'d'],[86374,'D'],[86505,'d'],[86610,'d'],[86820,'D'],[86931,'d'],[87036,'d'],[87246,'D']];
      this.lyricsToScore = this.lyricsToScroll.slice(0) ;

    }
    let lyrics = this.lyricsToScroll.slice(0);

    const loadText = () => {
      if(lyrics.length > 0 && Math.abs(lyrics[0][0] - this.gameTime - 3000) <= 20){
        let letter = lyrics.shift()[1];
        this.letters.push(new movingLetter(letter, this));
      }
      //FOR TESTING SYNC
      // if(8000 - this.gameTime <= 20){
      //   debugger;
      // }
    };
    setInterval(()=> loadText() , 20);

  }

  remove(object){
    this.letters.slice(this.letters.indexOf(object), 1);
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > window.innerWidth) || (pos[1] > window.innerHeight);
  }

  handleKeyPress(e){
    let char = e.keyCode;
    let letterBox = document.getElementById("letterBox");
    if(char !== 16){
      if(e.shiftKey){
        letterBox.innerHTML = String.fromCharCode(char);
      } else if (char >=65 && char <= 90){
        char += 32;
        letterBox.innerHTML = String.fromCharCode(char);
      }
      console.log(char);
      setTimeout(() => (letterBox.innerHTML = ""), 100);
      this.handleScoring(String.fromCharCode(char));
      this.changeBackground();
    }
  }

  changeBackground(){
    let container = document.getElementById("game-container");
    let colors = ["red", "blue", "lightblue", "orange", "cyan"];
    let randomColor = colors[Math.floor(Math.random()* colors.length)];
    // container.style.backgroundColor = "#black";
    container.style.backgroundColor = "#2d1b4e";
    setTimeout(() => (container.style.background = "black"), 100);
  }

  handleScoring(char){
    let lyrics = this.lyricsToScore;
    let inputDelta = Math.abs(this.gameTime - lyrics[0][0]);
    // console.log(this.gameTime, lyrics[0][0]);
    while(lyrics.length > 0){
      if( inputDelta <= 200){
        if(char === lyrics[0][1]){
          this.gameScore += 4000;
          lyrics.shift();
        }
      } else if(inputDelta <= 350){
        console.log("MISS!");
        lyrics.shift();
      }
      break;

    }
  }

}

module.exports = Game;
