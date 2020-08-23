# 学习笔记

## Rang API
> 创建Range对象以相对Node更加灵活准确的方式操作DOM树
- Range() - 返回一个以全局（global） Document 作为起点与终点的 Range 对象。
- Range.collapsed - 返回一个表示 Range 的起始位置和终止位置是否相同的布尔值。
- Range.commonAncestorContainer - 返回完整包含 startContainer 和 endContainer 的、最深一级的节点。
- Range.endContainer - 返回包含 Range 终点的节点。
- Range.endOffset - 返回一个表示 Range 终点在 endContainer 中的位置的数字。
- Range.startContainer - 返回包含 Range 开始的节点。
- Range.startOffset - 返回一个表示 Range 起点在 startContainer 中的位置的数字。
- Range.setStart() - 设置 Range 的起点。
- Range.setEnd() - 设置 Range 的终点。
- Range.setStartBefore() - 以其它节点为基准，设置 Range 的起点。
- Range.setStartAfter() - 以其它节点为基准，设置 Range 的起点。
- Range.setEndBefore() - 以其它节点为基准，设置 Range 的终点。
- Range.setEndAfter() - 以其它节点为基准，设置 Range 的终点。
- Range.selectNode() - 使 Range 包含某个节点及其内容。
- Range.selectNodeContents() - 使 Range 包含某个节点的内容。
- Range.collapse() - 将 Range 折叠至其端点（boundary points，起止点，指起点或终点，下同）之一。
- Range.cloneContents() - 返回一个包含 Range 中所有节点的文档片段。
- Range.deleteContents() - 从文档中移除 Range 包含的内容。
- Range.extractContents() - 把 Range 的内容从文档树移动到一个文档片段中。
- Range.insertNode() - 在 Range 的起点处插入一个节点。
- Range.surroundContents() - 将 Range 的内容移动到一个新的节点中。
- Range.compareBoundaryPoints() - 比较两个 Range 的端点。
- Range.cloneRange() - 返回拥有和原 Range 相同的端点的克隆 Range 对象。
- Range.detach() - 将 Range 从使用状态中释放，改善性能。
- Range.toString() - 把 Range 的内容作为字符串返回。
- Range.compareNode() - 返回一个常量，表示节点是否在 Range 的前、后、中、外。
- Range.comparePoint() - 返回 -1、0、1，分别表示指定点（point）位于 Range 的前、中、后。
- Range.createContextualFragment() - 解析指定字符串（格式为 XML 或 HTML），并返回一个文档片段。
- Range.getBoundingClientRect() - 返回单个 ClientRect 对象，which bounds the entire content…he rectangles returned by range.getClientRects().
- Range.getClientRects() - 返回一个 ClientRect 对象的列表，that aggregates the results …tClientRects() for all the elements in the Range.
- Range.intersectsNode() - 返回布尔值，表示指定节点是否横断 Range。
- Range.isPointInRange() - 返回布尔值，表示指定点是否位于 Range 之中。
