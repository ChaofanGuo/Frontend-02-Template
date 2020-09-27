import {createElement} from "./framework";

console.log('main.js start')

let d = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'
]

// JSX code
// In JSX
//  lowercase tag means HTML tag;
//  tag start with uppercase means a custom Javascript class, and the first argument passed to the create function is class type
/*
let a = <div id="a">
  Hello World
  <div><span>a</span></div>
  <div><span>b</span></div>
  <div><span>c</span></div>
  </div>
 */
import {Carousel} from "./Carousel/carousel";
import {Timeline, Animation} from "./Carousel/animation";
window.animation = new Animation({ set a(v) {console.log(`a\'s value set to : ${v}`)}}, 'a', 0, 100, 1000, null)

let tl = new Timeline()
window.tl = tl

tl.start()

let a = <Carousel src = {d}/>

a.mountTo(document.body)
