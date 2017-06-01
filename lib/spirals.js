const HEX_DIGITS = "0123456789ABCDEF";

class Spirals {
  constructor(dimX, dimY, game){
    this.dimX = dimX;
    this.dimY = dimY;
    this.pos = this.randomCenter(this.dimX, this.dimY);
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

  randomCenter(x,y) {
    let newX = 125;
    let newY = y - 175;
    let plusOrMinus = Math.round(Math.random()) * 2 - 1;
    let plusOrMinus2 = Math.round(Math.random()) * 2 - 1;
    let radius = 65 + 30 * Math.random();
    let randomXRange = plusOrMinus * radius * Math.random();
    let randomYRange =
      plusOrMinus2 * Math.sqrt(Math.pow(radius, 2)  - Math.pow(randomXRange, 2));
    return [newX + randomXRange, newY + randomYRange];
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
      this.pos[0],
      this.pos[1],
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
