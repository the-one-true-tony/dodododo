class MovingLetter {
  constructor(options){
    this.color = "red";
    this.letter = "D";
    this.radius = 100;
    this.pos = [window.innerWidth, (window.innerHeight) - 145];
  }

  render(ctx){
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.font = "85px Rubik";
    ctx.fillText(this.letter, this.pos[0], this.pos[1]);
  }

  move(){
    const windowScale = (window.innerWidth - 90)/151;
    console.log(windowScale);
    this.pos = [this.pos[0] - windowScale, this.pos[1]];
    // if(this.game.isOutOfBounds(this.pos)){
    //   this.remove();
    // }
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingLetter;
