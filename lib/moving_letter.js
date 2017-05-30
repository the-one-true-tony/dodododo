class MovingLetter {
  constructor(options){
    this.pos = [300, 300];
    this.vel = [-1,0];
    this.color = "red";
    this.letter = "D";
    this.radius = 100;
  }

  render(ctx){
    console.log("RENDERED");
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.font="20px Georgia";
    ctx.fillText("Hello World!",400,400);
    // ctx.arc(
    //   0, 0, this.radius, 0, 2 * Math.PI, false
    // );
    // ctx.fill();

    // ctx.font = "85px Rubik";
    // ctx.strokeText(this.letter, this.pos);
  }

  move(){
    this.pos = [this.pos[0] -1, this.pos[1]-1];
    console.log("MOVED", this.pos);
    // if(this.game.isOutOfBounds(this.pos)){
    //   this.remove();
    // }
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingLetter;
