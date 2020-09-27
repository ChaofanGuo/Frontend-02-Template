import {Component} from "../framework";

export class Carousel extends Component {
  constructor() {
    super()
    this.attributes = Object.create(null)
  }

  setAttribute(name, value) {
    this.attributes[name] = value
  }

  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    for (let record of this.attributes.src) {
      let child = document.createElement('div')
      child.style.backgroundImage = `url(${record})`
      this.root.appendChild(child)
    }

    /*
    {
      // Auto Play
      let currentIndex = 0
      setInterval(() => {
        let children = this.root.children
        let nextIndex = (currentIndex + 1) % children.length
        let current = children[currentIndex]
        let next = children[nextIndex]

        next.style.transition = 'none'
        next.style.transform = `translateX(${(nextIndex - 1) * -500}px`
        setTimeout(() => {
          next.style.transition = ''
          current.style.transform = `translateX(${(currentIndex + 1) * -500}px)`
          next.style.transform = `translateX(${nextIndex * -500}px)`
          currentIndex = nextIndex
        }, 16)
      }, 1000)
    }
     */

    {
      // Manual Drag
      let position = 0
      this.root.addEventListener('mousedown', event => {
        let children = this.root.children
        let startX = event.clientX

        let move = event => {
          let delta = event.clientX - startX

          let current = position - Math.round((delta - delta % 500) / 500)

          for (let offset of [-1, 0, 1]) {
            let pos = current + offset
            pos = (pos + 4) % 4

            children[pos].style.transition = 'unset'
            children[pos].style.transform = `translateX(${pos * -500 + offset * 500 + delta % 500}px)`
          }
        }

        let up = event => {
          let delta = event.clientX - startX
          position = position - Math.round(delta / 500)

          for (let offset of [0, -Math.sign(Math.round(delta / 500) - delta + 250 * Math.sign(delta))]) {
            let pos = position + offset
            pos = (pos + 4) % 4

            children[pos].style.transition = ''
            children[pos].style.transform = `translateX(${pos * -500 + offset * 500}px)`
          }

          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
        }

        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
      })
    }
    return this.root
  }

  mountTo(parent) {
    parent.appendChild(this.render())
  }
}

