# Template Grammar

IXO のテンプレートは、前のノードの値をテキストへ挿入します。

## 基本形

二重波括弧を使います。

`Hello, {{username}}`

context に `username = "Alex"` があれば、結果は `Hello, Alex` になります。

## 条件式

`==`, `!=`, `>`, `<`, `>=`, `<=`, `AND`, `OR` をサポートします。

例:

`{{score}} >= 60 AND {{name}} != ""`

## 安全性

テンプレート値はデータとして扱われます。秘密情報、トークン、パスワードを信頼できない Script や Network Action に入れないでください。
