import './index.sass'

import Renderer from './renderer'

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

let renderer = new Renderer(canvas)
const draw = () => {
  renderer.render()
  requestAnimationFrame(draw)
}
draw()

if (module.hot) {
  module.hot.accept('./renderer', () => {
    renderer = new Renderer(canvas)
  })
  window.renderer = renderer
  window.Renderer = Renderer
}
