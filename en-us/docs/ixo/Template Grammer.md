# Template Grammar

IXO templates insert values from previous nodes into text.

## Basic form

Use double braces:

`Hello, {{username}}`

If the context has `username = "Alex"`, the result is `Hello, Alex`.

## Conditions

Conditions support `==`, `!=`, `>`, `<`, `>=`, `<=`, `AND`, and `OR`.

Example:

`{{score}} >= 60 AND {{name}} != ""`

## Safety

Template values are treated as data. Do not paste secrets, tokens, or passwords into untrusted scripts or network actions.
