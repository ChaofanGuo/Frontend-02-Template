学习笔记
## 选择器
- at-rules
    - @charset
    - @import
    - @media
    - @page
    - @counter-style
    - @keyframes
    - @fontface
    - @support
    - @namespace
- rule
    - selector
        - selector-group
        - selector
            - \>
            - \<sp\>
            - \+
            - \~
        - simple-selector
            - type
            - \*
            _ .
            - #
            - []
            - :
            - ::
            - :not()
    - declaration
        - key
            - variables
            - properties
        - value
            - calc
            - length
            - height
            - ...

## 思考
first-line选择器选择的内容是排版后的第一行文字内容，如果对行进行盒模型或float之类的样式修改，有可能造成文字换行，这是浏览器需要重新选择首行元素，并重新排版，则有可能造成死循环。并且这时如果不重新选择首行会造成语义错误

而first-letter选择器选择的是内容的第一个字符，对字符进行盒模型或float之类样式的修改，不会因为元素的重排导致元素重新选择计算，同时也不会改变伪元素选择器的语义
