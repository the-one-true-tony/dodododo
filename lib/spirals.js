const HEX_DIGITS = "0123456789ABCDEF";

class Spirals {
  constructor(dimX, dimY, game){
    this.dimX = dimX;
    this.dimY = dimY;
    this.pos = this.randomCenter(this.dimX, this.dimY);
    this.game = game;
    this.radius = 4 * Math.random();
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
    newX += randomXRange;
    newY += randomYRange;
    // this.calcInitialVelocity(newX, newY);
    return [newX, newY];
  }

  // calcInitialVelocity(x, y){
  //   let centerX = 125;
  //   let centerY = this.dimY - 175;
  //   centerX > x ? this.vel[0] = 3.5 : this.vel[0] = - 3.5;
  //   centerY > y ? this.vel[1] = 3.5 : this.vel[1] = - 3.5;
  // }

  move(){
    // let dx = (Math.random() * 2) - 1;
    // let dy = (Math.random() * 2) - 1;
    var toDist   = this.dimX * 0.86;
    var stirDist = this.dimX * 0.125;
    var blowDist = this.dimX * 0.5;
    let friction = 0.97;
    let centerX = 125;
    let centerY = this.dimY - 175;
    let X = this.pos[0];
    let Y = this.pos[1];
    // let X = centerX;
    // let Y = centerY;
    let vX = Math.cos(20*Math.random())*Math.random()*34;
    let vY = Math.sin(20*Math.random())*Math.random()*34;
    let dX = X - centerX;
    let dY = Y - centerY;
    let d = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)) || 0.001;
    // dX /= d;
    // dY /= d;
    //
    // let xMoveDist = Math.sqrt((cDist*cDist) - (yDist*yDist))/cDist;
    // let yMoveDist =  Math.sqrt((cDist*cDist) - (xDist*xDist))/cDist;
    //
    // if(X >= centerX){
    //   this.vel[0] -= 0.01*cDist - 0.2;
    // } else if(X <= centerX){
    //   this.vel[0] += 0.01*cDist + 0.2;
    // }
    //
    // if(Y >= centerY){
    //   this.vel[1] -= 0.01*cDist + 0.2;
    // } else if (Y <= centerY){
    //   this.vel[1] += 0.01*cDist - 0.2;
    // }
    vX *= friction;
    vY *= friction;
    // let avgVX = Math.abs( vX );
    // let avgVY = Math.abs( vY );
    // let avgV = (avgVX + avgVY) * 0.5;
    //
    // if(avgVX < 0.1) vX *= Math.random() *3;
    // if(avgVY < 0.1) vY *= Math.random() *3;

    if(this.game.keyDown){
      if ( d < this.dimX * 0.5 ){
        let blowAcc = ( 1 - ( d / this.dimX ) ) * 2;
        vX += dX * blowAcc + 0.5 - Math.random();
        vY += dY * blowAcc + 0.5 - Math.random();
      }
    }

    if ( d < toDist ){
      var toAcc = ( 1 - ( d / toDist ) ) * this.dimX * 0.0008;
      vX -= dX * toAcc;
      vY -= dY * toAcc;
    }

    // if ( d < stirDist ){
    //   var mAcc = ( 1 - ( d / stirDist ) ) * this.dimX * 0.00026;
    //   vX += mouseVX * mAcc;
    //   vY += mouseVY * mAcc;
    // }
    let nextX = X + vX;
    let nextY = Y + vY;

    // if(nextX > this.dimX){
    //   nextX = this.dimX;
    //   vX *= -1;
    // } else if (nextX < 0){
    //   nextX = 0;
    //   vX *= -1;
    // }
    //
    // if(nextY > this.dimY){
    //   nextY = this.dimY;
    //   vY *= -1;
    // } else if (nextY < 0){
    //   nextY = 0;
    //   vY *= -1;
    // }
    // this.vX = vX;
    // this.vY = vY;
    this.pos = [nextX, nextY];
    // console.log(this.pos, this.vel);
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }
}

module.exports = Spirals;
