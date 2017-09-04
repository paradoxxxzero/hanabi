import Particle from './particle'

export default class Rocket extends Particle {
  move(deltaT) {
    super.move(deltaT)
    if (this.speed[1] > 0) {
      return this.explode()
    }
  }

  shouldRemove(w, h) {
    return super.shouldRemove(w, h) || this.speed[1] > 0
  }

  explode() {
    const minV = Math.random() * 100
    return Array(~~(100 + 100 * Math.random())).fill().map(() => {
      const v = minV + Math.random() * 100
      const theta = Math.random() * 360

      return new Particle(
        this.pos,
        [v * Math.cos(theta), v * Math.sin(theta)],
        2,
        this.hue,
        10
      )
    })
  }
}

if (module.hot) {
  module.hot.accept('./particle')
}
