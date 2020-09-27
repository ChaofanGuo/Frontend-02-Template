import {Carousel} from "./Carousel/carousel";
import {Timeline, Animation} from "./Carousel/animation";
import {ease} from "./ease";

let tl = new Timeline()
window.tl = tl
console.log('main.js start')
tl.add(new Animation(
  document.querySelector('#el').style,
  'transform',
  0,
  500,
  1000,
  0,
  ease,
  v => `translateX(${v}px)`))

document.querySelector('#start').addEventListener('click', event => tl.start())
document.querySelector('#pause').addEventListener('click', event => tl.pause())
document.querySelector('#resume').addEventListener('click', event => tl.resume())
document.querySelector('#reset').addEventListener('click', event => tl.reset())
document.querySelector('#restart').addEventListener('click', event => tl.restart())
document.querySelector('#stop').addEventListener('click', event => tl.stop())
