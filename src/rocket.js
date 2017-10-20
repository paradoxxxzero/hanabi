import Particle from './particle'
import { rnd } from './util'

export default class Rocket {
  constructor(fw, pos, speed, weight, hue, maxHeight) {
    this.fw = fw
    this.pos = pos
    this.speed = speed
    this.weight = weight
    this.hue = hue
    this.dead = false
    this.maxHeight = maxHeight
  }

  move(deltaT) {
    this.pos = this.pos.map((pos, i) =>
      pos + deltaT * this.speed[i])
    if (this.pos[1] < (1 - this.maxHeight) * this.fw.canvas.h) {
      return this.explode()
    }
  }

  shouldRemove() {
    return this.dead
  }

  explode() {
    this.dead = true
    return Array(rnd(this.fw.minParticles, this.fw.maxParticles))
      .fill().map(() => {
        const v = rnd(this.fw.minBurstSpeed, this.fw.maxBurstSpeed)
        const theta = rnd(0, 360)

        return new Particle(
          this.fw,
          this.pos,
          [v * Math.cos(theta), v * Math.sin(theta)],
          2,
          this.hue,
          rnd(this.fw.minLifeSpan, this.fw.maxLifeSpan)
        )
      })
  }

  render(ctx) {
    const [x, y] = this.pos

    ctx.save()
    ctx.fillStyle = `hsla(${ this.hue }, 100%, 50%, 1)`
    ctx.fillRect(x, y, this.weight, this.weight)
    ctx.restore()
  }
}

if (module.hot) {
  module.hot.accept('./particle')
}
