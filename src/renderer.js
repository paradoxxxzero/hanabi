import Rocket from './rocket'

export default class Renderer {
  constructor(canvas) {
    this.particles = []
    this.canvas = canvas
  }

  render() {
    if (!this.lastT) {
      this.lastT = (new Date()).getTime()
      return
    }
    if (Math.random() > .9) {
      this.particles.push(new Rocket(
        [this.canvas.w * Math.random(), this.canvas.h],
        [50 * Math.random() - 25, -200 * Math.random() - 200],
        3,
        ~~(360 * Math.random())
      ))
    }
    const currentT = (new Date()).getTime()
    const deltaT = .1 // (currentT - this.lastT) / 250
    this.particles.map(particle => particle.move(deltaT))
      .filter(newParticles => !!newParticles)
      .forEach(newParticles => this.particles.push(...newParticles))
    this.particles.forEach(particle => particle.render(this.canvas.ctx))
    this.canvas.ctx.fillStyle = 'rgba(0, 0, 0, .08)'
    this.canvas.ctx.fillRect(0, 0, this.canvas.w, this.canvas.h)
    this.particles = this.particles.filter(particle =>
      !particle.shouldRemove(this.canvas.w, this.canvas.h))
    this.lastT = (new Date()).getTime()
  }
}

if (module.hot) {
  module.hot.accept('./rocket')
}
