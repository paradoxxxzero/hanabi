
const friction = .05

export default class Particle {
  constructor(pos, speed, weight, hue, lifespan) {
    this.pos = pos
    this.speed = speed
    this.acceleration = [0, 9.8]
    this.weight = weight
    this.hue = hue
    this.lifespan = lifespan || Infinity
  }

  move(deltaT) {
    this.speed = this.speed.map((speed, i) =>
      speed + deltaT * this.acceleration[i] -
      friction * speed)
    this.pos = this.pos.map((pos, i) =>
      pos + deltaT * this.speed[i])
    this.lifespan -= deltaT
  }

  render(ctx) {
    const [x, y] = this.pos
    let l = 50
    if (this.lifespan !== Infinity) {
      l = this.lifespan * 10
    }

    ctx.save()
    ctx.fillStyle = `hsla(${ this.hue }, 100%, ${ l }%, 1)`
    ctx.fillRect(x, y, this.weight, this.weight)
    ctx.restore()
  }

  shouldRemove(w, h) {
    const [x, y] = this.pos
    return 0 > x || x > w || 0 > y || y > h || this.lifespan < 0
  }
}
