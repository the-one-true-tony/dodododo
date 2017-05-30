class MovingLetter {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.color = options.color;
    this.game = options.game;
    this.letter = options.letter;
  }

  draw(ctx){
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();

    // ctx.font = "85px Rubik";
    // ctx.strokeText(this.letter, this.pos);
  }

  move(){
    this.pos = [this.pos[0] -1, this.pos[1]];
    if(this.game.isOutOfBounds(this.pos)){
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingLetter;
