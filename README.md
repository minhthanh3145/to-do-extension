# To do Web Extension

A to-do extension that demonstrates how to build a Chrome extension.

<img src="https://user-images.githubusercontent.com/16775806/115448347-d382b800-a243-11eb-8b1c-c59d18dfd564.png" width="400" height="400" />

## Objectives of onboarding
- Things that the on-boarding session should cover:
	- [x] How to add [browser action](https://developer.chrome.com/docs/extensions/reference/browserAction/) to the toolbar.
	- [x] How to open a simple [popup](https://developer.chrome.com/docs/extensions/reference/browserAction/#popup) when opening the extension.
	- [x] How to add [context menu](https://developer.chrome.com/docs/extensions/reference/contextMenus/) to a page.
	- [x] Data access to and from [local storage](https://developer.chrome.com/docs/extensions/reference/storage/).
	- [x] How to [notify](https://developer.chrome.com/docs/extensions/reference/notifications/) users when adding item through context menu.
  
## Objectives of extension

A to-do extension:
- A pop-up that can be opened through toolbar's icon or hot key (Ctrl + Shift + 1)
- Simple To Read/To do/Done UI.
	- Users can add/delete items from To Read/To Do.
	- Items written in markdown will be rendered to HTML. 
	- Users can check/uncheck a task to move between To do/To Read and Done.
- Items are persisted to local storage.
- Users can add any web page to To Read list through context menu.
- Users can add any text selection to To Do list through context menu.
- When Users add items through context menu, a notification will be prompted.
