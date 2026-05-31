# Template Grammar

IXO 模板可将前序节点的值插入文本。

## 基本形式

使用双大括号：

`Hello, {{username}}`

如果 context 中有 `username = "Alex"`，结果就是 `Hello, Alex`。

## 条件

支持 `==`, `!=`, `>`, `<`, `>=`, `<=`, `AND`, `OR`。

示例：

`{{score}} >= 60 AND {{name}} != ""`

## 安全

模板值会作为数据处理。不要把密码、令牌或个人信息放入不可信脚本或网络动作中。
