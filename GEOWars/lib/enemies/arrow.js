const MovingObject = require("../moving_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Util = require("../util");
class Arrow extends MovingObject {
  constructor(options) {
    super(options)
    this.pos = options.game.randomPosition();
    this.angle = 0;

    this.speed = 1;
    this.vel = options.velocity || Util.randomVec(this.speed);

  }

  move(timeDelta) {
    let rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    let deltaX = this.vel[0] * velocityScale;
    let deltaY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + deltaX, this.pos[1] + deltaY];
    
    if (this.game.isOutOfBounds(this.pos)) {
      Util.redirect(this,[1000, 600]) // HARD CODED
    }
  }

  

  draw(ctx) {
    let pos = this.pos;
    let shipLength = 8 * 2.2;
    let shipWidth = 6 * 2.2;
    let l = shipLength;
    let w = shipWidth;
    let movementDirection = Math.atan2(this.vel[0], -this.vel[1])

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI );

    ctx.beginPath();
    ctx.strokeStyle = "#f2ff00";
    ctx.lineWidth = 2;
    
    ctx.moveTo(0, -l / 2); //1
    ctx.lineTo(w/2, l/4); //2
    ctx.lineTo(w/6, l/2); //3
    ctx.lineTo(0, l/4); //4
    ctx.lineTo(-w/6, l/2); //5
    ctx.lineTo(-w/2, l/4); //6
    // ctx.lineTo(0, -l/2 ); //1

    // ctx.lineTo(); //1

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }

  // remove() {
  //   debugger;
  //   this.game.remove(this);
  // }
}



const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Arrow;