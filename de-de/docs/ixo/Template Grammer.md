# Template Grammar

IXO-Templates fügen Werte vorheriger Nodes in Text ein.

## Grundform

Nutze doppelte geschweifte Klammern:

`Hello, {{username}}`

Wenn context `username = "Alex"` enthält, wird daraus `Hello, Alex`.

## Bedingungen

Unterstützt werden `==`, `!=`, `>`, `<`, `>=`, `<=`, `AND`, `OR`.

Beispiel:

`{{score}} >= 60 AND {{name}} != ""`

## Sicherheit

Template-Werte sind Daten. Füge keine Secrets, Tokens oder Passwörter in nicht vertrauenswürdige Scripts oder Netzwerk-Actions ein.
