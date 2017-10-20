import './index.sass'

import Firework from './firework'

class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.t0 = (new Date()).getTime()
    this.size()
  }
  get w() {
    return this.canvas.getBoundingClientRect().width
  }
  get h() {
    return this.canvas.getBoundingClientRect().height
  }
  size() {
    this.canvas.width = innerWidth
    this.canvas.height = innerHeight
  }
}

const canvas = new Canvas()
addEventListener('resize', canvas.size)

let fw = new Firework(canvas)

const draw = () => {
  fw.render()
  requestAnimationFrame(draw)
}
draw()


if (module.hot) {
  module.hot.accept('./firework', () => {
    fw = new Firework(canvas)
  })
  window.fw = fw
  window.Firework = Firework
}
