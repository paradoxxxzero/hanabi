import Rocket from './rocket'
import { rnd } from './util'

export default class Firework {
  constructor(canvas) {
    this.particles = []
    this.canvas = canvas

    this.minLifeSpan = 5
    this.maxLifeSpan = 15
    this.minBurstSpeed = 50
    this.maxBurstSpeed = 200
    this.minParticles = 200
    this.maxParticles = 800

    this.airFriction = .05

    this.frequency = .025
  }

  render() {
    if (!this.lastT) {
      this.lastT = (new Date()).getTime()
      return
    }
    const currentT = (new Date()).getTime()
    const deltaT = (currentT - this.lastT) / 250
    this.lastT = (new Date()).getTime()

    if (Math.random() > 1 - this.frequency) {
      this.particles.push(new Rocket(this,
        [rnd(0, this.canvas.w), this.canvas.h],
        [rnd(-25, 25), -rnd(200, 400)],
        3,
        rnd(0, 360),
        rnd(70, 90) / 100
      ))
    }
    this.particles.map(particle => particle.move(deltaT))
      .filter(newParticles => !!newParticles)
      .forEach(newParticles => this.particles.push(...newParticles))

    this.canvas.ctx.fillStyle = 'rgba(0, 0, 0, .09)'
    // this.canvas.ctx.globalCompositeOperation = 'source-in'
    this.canvas.ctx.fillRect(0, 0, this.canvas.w, this.canvas.h)
    this.particles.forEach(particle => particle.render(this.canvas.ctx))
    this.particles = this.particles.filter(particle =>
      !particle.shouldRemove(this.canvas.w, this.canvas.h))
  }
}

if (module.hot) {
  module.hot.accept('./rocket')
}
