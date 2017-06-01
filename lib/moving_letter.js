class MovingLetter {
  constructor(letter, game){
    this.game = game;
    this.color = "red";
    this.letter = letter;
    this.pos = [window.innerWidth, (window.innerHeight) - 143];
    // this.pos = [window.innerWidth, (window.innerHeight) - 157];
  }

  render(ctx){
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.font = "85px Rubik";
    ctx.fillText(this.letter, this.pos[0], this.pos[1]);
  }

  move(){
    const windowScale = (window.innerWidth - 90)/151;
    this.pos = [this.pos[0] - windowScale, this.pos[1]];
    if(this.game.isOutOfBounds(this.pos)){
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingLetter;
