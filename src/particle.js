export default class Particle {
  constructor(fw, pos, speed, weight, hue, lifespan) {
    this.fw = fw
    this.pos = pos
    this.speed = speed
    this.acceleration = [0, 9.8]
    this.weight = weight
    this.hue = hue
    this.lifespan = lifespan
    this.fullLifespan = lifespan
  }

  move(deltaT) {
    this.speed = this.speed.map((speed, i) =>
      speed + deltaT * this.acceleration[i] -
      this.fw.airFriction * speed)
    this.pos = this.pos.map((pos, i) =>
      pos + deltaT * this.speed[i])
    this.lifespan -= deltaT
  }

  render(ctx) {
    const [x, y] = this.pos
    const l = 100 * (this.lifespan / this.fullLifespan) * Math.abs(
      Math.cos(this.lifespan))

    ctx.save()
    ctx.fillStyle = `hsla(${ this.hue }, 100%, ${ l }%, 1)`
    ctx.fillRect(x, y, this.weight, this.weight)
    ctx.restore()
  }

  shouldRemove() {
    const [x, y] = this.pos
    const { w, h } = this.fw.canvas
    return 0 > x || x > w || 0 > y || y > h || this.lifespan < 0
  }
}
