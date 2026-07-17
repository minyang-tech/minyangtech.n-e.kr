# IXO Engine Node Library

This document summarizes nodes and editor features available in IXO Engine V1.1.3.

## Status Labels

| Status | Meaning |
|---|---|
| Stable | Available in the current public build. |
| Protected | Available with security consent, permission checks, or restricted execution policy. |
| Editor | Provided as an editor feature rather than a runtime node. |

## Common Fields

| Field | Description |
|---|---|
| Label | Display name of the node or UI element. |
| Value | Default value calculated or passed by the node. |
| Ref Key | Name that other nodes or UI can reference as a template variable. |
| Group Label | Helper label for visually grouping nodes. |
| Scene | Screen unit that owns the node or UI element. |

## Node Groups

| Group | Main Nodes | Status |
|---|---|---|
| Core | Start, Condition Branch, Value Compare, Merge Data, Script | Stable / Protected for Script |
| Control | Repeat, Wait, Switch, Send Message, Receive Message, Scene Start, Break, Continue, Restart, Clone | Stable |
| Visual | Text Output, Image Output, Input, Button, Layout Box, UI Text, UI Image, UI Button, UI Container, movement, drawing, visibility | Stable |
| Data | Global Value, Local Storage, Constant Value, Global Variable, Local Variable | Stable / Editor |
| Network | HTTPS Request, Browser Open | Protected |
| System | System Info, Audio Play, File Watch, Sound Play, Stop Sounds, Volume, Speed, Background Music | Stable / Protected for File Watch |
| Logic | Formula, mouse/object/key checks, pointer hit, number check, AND, OR, NOT, touch support | Stable |
| Utility | Join Text, Random Value, Random Range, Stopwatch, Date Value, Text Length, Text Position, Replace Text, Case Convert, RGB to HEX, HEX Channel | Stable |

## Canvas Builder Integration

- Adding Text, Image, Button, Custom Button, Vector, Input, or Container in Canvas Builder creates or links the matching Visual node.
- Editing UI values in Inspector updates the linked node Value or Ref Key.
- Removing UI cleans up unnecessary linked nodes.
- Image assets can be dragged into Canvas Builder to create image UI and image nodes.
- .ixo assets can be dragged into Node Workspace or Canvas Builder to paste included nodes and UI into the current project.
- Press P to move from the selected UI element to its linked node.
- Responsive preview supports Desktop, Tablet, Mobile, and adjustable preview dimensions.

## Scene / Page

| Feature | Role | Status |
|---|---|---|
| Scene tabs | Switch scenes from browser-style tabs. | Stable |
| Scene rename | Double-click a scene tab to rename it. | Stable |
| Per-scene nodes | Nodes appear and run only in their own scene. | Stable |
| Per-scene UI | UI elements appear only in their own scene. | Stable |
| Local variables | Values scoped to the current scene. | Stable |
| Go Scene Action | Moves to another scene from a button action. | Stable |
| Scene Start Node | Starts a flow when a scene becomes active. | Stable |

## Network Security Policy

- Network nodes show consent before first use.
- Consent can be reviewed or revoked in Settings.
- Only HTTPS is allowed.
- URL parse failures, localhost, loopback, and private network addresses are blocked.
- Requests apply timeout and duplicate in-flight prevention.
- Logs mask sensitive URL details.
- Browser Open follows the same URL policy as external links.

## Editor Features

| Feature | Description |
|---|---|
| Ctrl+F node search | Searches by node name, translated name, type, and group. |
| Top tabs | Manage Scene, Canvas Builder, Settings, and Function Editor as tabs. |
| Tab reordering | Drag tabs to reorder them. |
| Advanced Mode | Switch between simplified and detailed editor UI in Settings. |
| Log display | Toggle the log panel in Settings. |
| Handle size | Adjust node connection handle size in Settings. |
