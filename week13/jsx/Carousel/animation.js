const TL_STATE = Symbol('tl-state')
const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ACTIVATE_ANIMATIONS = Symbol('animations')
const ANIMATION_POOL = Symbol('animations-pool')
const START_TIME = Symbol('add-time')
const PAUSE_START = Symbol('pause-state')
const PAUSE_TIME = Symbol('pause-time')

export class Timeline {
  constructor() {
    this[ACTIVATE_ANIMATIONS] = new Set()
    this[ANIMATION_POOL] = new Set()
    this[START_TIME] = new Map()
    this[TL_STATE] = StateEnum.ready
  }

  start() {
    if (this[TL_STATE] & StateEnum.finished) {
      this.reset()
    }
    let startTime = Date.now()
    this[ACTIVATE_ANIMATIONS] = new Set()
    startTime = Date.now()
    for(let animation of this[ANIMATION_POOL]) {
      this[ACTIVATE_ANIMATIONS].add(animation)
      this[START_TIME].set(animation, startTime)
    }
    this[TICK_HANDLER] = null
    this[PAUSE_TIME] = 0
    this[TICK] = () => {
      let now = Date.now()
      for(let animation of this[ACTIVATE_ANIMATIONS]) {
        let t = now - startTime - this[PAUSE_TIME] - animation.delay
        if (this[START_TIME].get(animation) > startTime) {
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay
        }
        if (t < 0) {
          t = 0
        }
        if (animation.duration < t) {
          this[ACTIVATE_ANIMATIONS].delete(animation)
          animation.receiveTime(animation.duration)
        } else {
          animation.receiveTime(t)
        }
      }
      if (this[ACTIVATE_ANIMATIONS].size) {
        this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
      } else {
        this[TL_STATE] = StateEnum.finished
      }
    }
    this[TICK]()
    this[TL_STATE] = StateEnum.rendering
  }

  pause() {
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
    this[TL_STATE] = StateEnum.pausing
  }

  resume() {
    if (this[TL_STATE] & StateEnum.pausing) {
      this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
      this[TICK]()
      this[TL_STATE] = StateEnum.rendering
    }
  }

  reset() {
    this[TL_STATE] = StateEnum.ready
    this[ACTIVATE_ANIMATIONS] = new Set()
    for(let animation of this[ANIMATION_POOL]) {
      animation.receiveTime(0)
    }
  }

  restart() {
    this.reset()
    this.start()
  }

  stop() {
    this.pause()
    this[TL_STATE] = StateEnum.finished
    this[ACTIVATE_ANIMATIONS] = new Set()
  }

  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = Date.now()
    }
    this[ANIMATION_POOL].add(animation)
    this[START_TIME].set(animation, startTime)
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timingFunction = v => v, template = v => v) {
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay ? delay : 0
    this.timingFunction = timingFunction ? timingFunction : v => v
    this.template = template ? template : v => v
  }

  receiveTime(time) {
    let range = this.endValue - this.startValue
    let progress = this.timingFunction(time / this.duration)
    this.object[this.property] = this.template(this.startValue + range * progress)
  }
}

const StateEnum = {
  ready: 1,
  rendering: 1 << 1,
  pausing: 1 << 2,
  finished: 1 << 3
}
