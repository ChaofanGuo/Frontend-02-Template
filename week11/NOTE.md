学习笔记

## Proxy

```javascript
let proxy = new Proxy(obj, handler)
```
使用传入的handler代理obj所对应的事件，从而对目标对象状态变更进行监听和处理
```javascript
let obj = {
  a: 1, b: 1
}
let proxy = new Proxy(obj, {
  get(target, prop){
    // do something else
    return target[prop]
  },
  set(target, prop, value) {
    // do something else
    target[prop] = value
  }
})
```
如数据验证
```javascript
let _person = {
  name: null,
  age: null
}

let person = new Proxy(_person, {
  get(target, prop) {
    return target[prop] + (prop === 'age' ? '岁' : '')
  },
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw Error('age should be a Number')
    }
    return Reflect.set(target, prop, value)
  }
})
```
