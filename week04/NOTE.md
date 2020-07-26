# 学习笔记
## 状态机
>状态机由状态寄存器和组合逻辑电路构成，能够根据控制信号按照预先设定的状态进行状态转移，是协调相关信号动作,完成特定操作的控制中心。状态机分为摩尔（Moore）型状态机和米莉（Mealy）型状态机。 —— 百度百科

>在编程中，由多个状态函数处理特定状态的逻辑，并由一个控制函数，记录当前状态与控制状态函数的开始 —— 个人理解

```javascript
/*
 * 状态控制函数，对外交互的主要方法，多数由状态机外界触发
 */
function stateControl() {
  let state = waitingInput // 当前状态保存变量，值为当前状态对应的状态函数
  while(true) {
    state(getInput())
  }
}

/* 
 * 等待输入状态函数，等待用户输入
 */
function waitingInput(input) {
  if (input) {
    // logic code here to do some calculate
    return waitingOutput // 得到输入后，迁移状态到等待输出
  } else {
    return waitingInput // 未得到输入，继续保持当前状态
  }
}

/*
 * 等待输出状态函数，等待程序输出计算结果
 */
function waitingOutput(isFinish) {
  if (isFinish) {
    // logic code here to do some thing
    return waitingInput // 已输出，则迁移状态到等待输入
  } else {
    return waitingOutput // 未输出，继续保持当前状态
  }
}
```
