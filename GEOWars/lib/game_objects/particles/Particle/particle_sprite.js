const LineSprite = require("../../../game_engine/line_sprite")

class ParticleSprite extends LineSprite {
  constructor(transform, color, hue) {
    super(transform)
    // this.spawningScale = spawningScale
    this.rectLength = 15;
    this.rectWidth = 2;
    this.color = color
    this.hue = hue
  }

  draw(ctx) {
    let pos = this.transform.absolutePosition();
    let vel = this.transform.absoluteVelocity();
    let l = this.rectLength;
    let w = this.rectWidth;
    let movementDirection = Math.atan2(vel[0], -vel[1])

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = `${this.color},${this.hue})`;
    ctx.lineWidth = w;

    ctx.moveTo(0, 0); //1
    ctx.lineTo(0, l); //2

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

module.exports = ParticleSprite;