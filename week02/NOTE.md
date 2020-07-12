# 学习笔记

## BNF
** Backus-Naur Form (巴科斯-诺尔范式) **
>巴科斯-诺尔范式,以美国人巴科斯(Backus)和丹麦人诺尔(Naur)的名字命名的一种形式化的语法表示方法，用来描述语法的一种形式体系，是一种典型的元语言。又称巴科斯-诺尔形式(Backus-Naur form)。它不仅能严格地表示语法规则，而且所描述的语法是与上下文无关的。它具有语法简单，表示明确，便于语法分析和编译的特点。BNF表示语法规则的方式为：非终结符用尖括号括起。每条规则的左部是一个非终结符，右部是由非终结符和终结符组成的一个符号串，中间一般以“：：=”分开。具有相同左部的规则可以共用一个左部，各右部之间以直竖“|”隔开。--百度百科

+ ::= 表示一个定义的开始
+ <> 定义一个必选项， 同时也表示一个语法结构
+ [] 定义一个可选项
+ {} 定义一个项的重复次数

>```
<ME> ::= <Number> | <PE Block> | <ME> "*" <Number> | <ME> "/" <Number> |
<AE> ::= <ME> | <PE Block> | <AE> "+" <ME> | <AE> "-" <ME> |
<PE Block> ::= "(" <PE> ")"
<PE> ::= <Number> | <ME> | <AE> | <PE Block>
```
AE: Add Expression (加法)
ME: Mutiple Expression (乘法)
PE: Parentheses Expression (括号)

参考伪代码，BNF即描述编程语言中关键字、运算符行为的标准化的语言代码

## 编程语言
**基础分类**

+ 强类型：
  + Java
  + C/C++
  + C#
  + Python
  + GO
  + Switf
+ 弱类型：
  + JavaScript
  + VB
  + VBScript
  + PHP

+ 编译型：
  + C/C++
  + C#
  + Swiper
  + Go
  + Java
+ 解释性：
  + Python
  + JavaScript
  + VBScript

+ 数据描述：
  + JSON
  + CSS
  + SQL
  + XML
  + XAML
+ 编程：
  + C/C++
  + C#
  + Python
  + Ruby
  + Perl
  + ...

## JavaScript

最小原子
- 语法
	- Literal
		- null
		- undefined
		- ...
	- Variable
	- Keywords
		- null
		- if
		- else
		- ...
	- Whitespace
	- Line Terminator
- 运行时
	- Types
	- Execution Context

**基础类型**
- String
	- 编码方式
		- ASCII
		- unioncode
			- UTF-8
			> 默认用1byte(8bit)表示一个字符
			- UTF-16
			> 默认用2byte(16bit)表示一个字符
		- UCS
		- GB
			- GB2312
			- GBK(GB13000)
			- GB18030
		- ISO-8859
		- BIG5
- Number
	- IEEE 745 Double Float
		- Sign (1bit)
		- Exponent (11bit)
		- Fraction (52bit)
- Boolean
	- true
	- false
- Object
> 对象： 对万事万物不同维度的抽象
字段： 描述抽象状态的条目
行为： 状态的改变
（类比于生物学分类理解）
- Symbol
- null
- undefined