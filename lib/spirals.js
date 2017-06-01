const HEX_DIGITS = "0123456789ABCDEF";

class Spirals {
  constructor(dimX, dimY, game){
    this.dimX = dimX;
    this.dimY = dimY;
    this.centerX = this.randomCenter(this.dimX);
    this.centerY = this.randomCenter(this.dimY);
    this.game = game;
    this.color = this.randomColor();
  }

  randomColor() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += HEX_DIGITS[Math.floor((Math.random() * 16))];
    }
    return color;
  }

  randomCenter(num) {
    return num * Math.random();
  }

  moveRandom(maxX, maxY){
    let dx = (Math.random() * 2) - 1;
    let dy = (Math.random() * 2) - 1;

    this.centerX = Math.abs((this.centerX + (dx * this.radius * 0.1)) % maxX);
    this.centerY = Math.abs((this.centerY + (dy * this.radius) * 0.1) % maxY);
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      3,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = Spirals;
