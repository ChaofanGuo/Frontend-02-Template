学习笔记

## 浏览器绘制步骤

- 用户输入Url
- 根据Url通过Http协议**获得**对应的Html文本
- 解析Html文本**获得**文DOM树
- 解析样式文本节点**获得**带CSS的DOM树
- 根据DOM节点的CSS计算节点的排版**获得**带位置的DOM树
- 根据带位置的DOM树中的方位信息**绘制**页面


## Todo

- ToyBrowser代码的拆分整理
