# IXO Engine

IXO Engine ist eine visuelle App-Engine, die nodebasierte Logik im Entry-Stil mit dem Canvas Builder verbindet. Nutzer verbinden Nodes zu Abläufen, gestalten echte Oberflächen im Canvas Builder und exportieren Projekte für Windows und Linux.

Aktueller Dokumentationsstand: V1.1.3.

## Grundprinzip

- Logic is represented as a node graph.
- Screens are designed visually in Canvas Builder.
- UI elements and nodes stay synchronized through Ref Key, Scene, and Binding data.
- Exported runtimes reuse editor project data to reduce behavior differences.
- Risky capabilities such as network access, file watching, and script execution require consent and permission checks first.

## Hauptarbeitsbereiche

| Area | Description |
|---|---|
| Node Workspace | Place and connect nodes to create execution flow. |
| Canvas Builder | Place and edit text, images, inputs, buttons, containers, and vector elements. |
| UI Viewer | Preview the screen from the user's perspective. |
| Inspector | Edit selected node or UI values. V1.1.3 uses a simplified default UI, with advanced mode available in settings. |
| Functions | Create custom function graphs and call them from function-call nodes or actions. |
| Scene Manager | Manage multiple screens as scenes. |
| Asset Manager | Manage images, sounds, icons, .ixo project snippets, and theme files. |
| Error Log Console | Review execution results, branch results, errors, and action logs. It is hidden by default and can be enabled in settings. |
| Settings | Manage network consent, log display, advanced mode, node handle size, themes, and export defaults. |

## Wichtige Änderungen in V1.1.3

- The update flow now moves directly to update application instead of only saving files to Downloads.
- F5 can open a separate preview window without exporting first.
- Fixed documentation buttons that did not open documents.
- Fixed Canvas Builder UI selection and property editing issues.
- Fixed text input value reflection.
- Fixed node search and Ctrl+F focus issues.
- Simplified Inspector UI; enable Advanced Mode in settings for detailed editing.
- Node connection handle size can be adjusted in settings.
- Network consent is shown inside IXO Engine instead of a native Windows dialog.
- Scene, Canvas Builder, Settings, and Function Editor open as browser-style tabs.
- Tabs support close buttons, double-click rename, and drag reorder.
- Canvas Builder responsive preview width and height can be adjusted.
- Global and local variables can be added, edited, and deleted.
- The current function editing location is easier to identify through function tabs.

## Browserartige Tabs

V1.1.3 manages Scene, Canvas Builder, Settings, and Function Editor in top tabs.

| Tab Type | Behavior |
|---|---|
| Scene tab | Switches scenes. Double-click to rename. |
| Canvas Builder tab | Opens the UI layout and editing surface. The original location shows an Open Canvas Builder button. |
| Settings tab | Opens settings in the same tab area as scenes. |
| Function tab | Shows the function graph currently being edited. |

## Canvas Builder

- Text, Image, Input, Button, Container, Vector, and Custom Button elements can be placed.
- UI changes update the linked node value or Ref Key.
- Press P on a selected UI element to move to the linked node.
- Responsive preview supports Desktop, Tablet, and Mobile modes and adjustable preview dimensions.

## Scene Manager

- Scenes represent separate screens.
- Nodes, UI, and local variables are managed per scene.
- Scene tabs can be renamed by double-clicking.
- Scene transitions are available through Go Scene actions and related node flows.

## Functions and Variables

- Functions can define a name, description, parameters, default values, and return Ref Key.
- Function-call nodes and Run Function actions can execute user-defined functions.
- Global variables are shared across scenes.
- Local variables are scoped to the current scene.
- Variables can be referenced in templates and changed with Set Variable actions.

## Action System

| Action | Description |
|---|---|
| Open URL | Opens an HTTPS URL in an external browser. |
| Run Function | Executes a user-defined function. |
| Set Variable | Changes a global variable, local variable, or input node value. |
| Toggle UI | Shows or hides a specific UI element. |
| Go Scene | Moves to another scene. |
| Play Sound | Plays a selected sound. |
| Request HTTPS | Runs an HTTPS request node. |

Network actions follow the same consent and URL security policy as network nodes.

## Sicherheitsübersicht

- Network-family nodes show a consent screen before first use.
- Only HTTPS URLs are allowed.
- Failed URL parsing, localhost, loopback, and private network addresses are blocked.
- Requests apply timeout and duplicate in-flight request protection.
- Sensitive URL data is masked in logs.
- Script nodes use restricted execution by default; full JavaScript mode requires project trust and a strong warning UI.
- File watcher nodes require separate user approval.

## Export

| Target | Description |
|---|---|
| Windows .exe | Creates a directly runnable Windows output. |
| Linux bundle / .zip | Creates a Linux executable bundle with required resources. |

Mobile export is generated as a separate workspace for Android APK and iOS IPA pipelines.

## Unterstützte Plattformen

| Platform | Status |
|---|---|
| Windows | Supported |
| Linux | Supported |
| macOS | Not officially supported yet |
