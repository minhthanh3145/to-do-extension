import("../io/itemDB.js").then(({ ItemDB }) => {
  import("../constants.js").then(({ Constants }) => {
    showMarkItemAsToReadNotification();
    showMarkItemAsToDoNotification();

    function showMarkItemAsToDoNotification() {
      chrome.contextMenus.create({
        title: "Mark as To Do",
        contexts: ["page", "selection", "image", "link"],
        onclick: (info) => {
          ItemDB.addItemToDatabase(
            Constants.TO_DO,
            ItemDB.getRandomId(),
            info.selectionText ? info.selectionText : ""
          );
          chrome.notifications.create("", {
            iconUrl: "../../images/icon/list.png",
            type: "basic",
            title: "Marked as To Do",
            message: "A page has been added to To Do list",
          });
        },
      });
    }

    function showMarkItemAsToReadNotification() {
      chrome.contextMenus.create({
        title: "Mark as To Read",
        contexts: ["page", "selection", "image", "link"],
        onclick: (info, tab) => {
          ItemDB.addItemToDatabase(
            Constants.TO_READ,
            ItemDB.getRandomId(),
            "[" + tab.title + "](" + info.pageUrl + ")"
          );
          chrome.notifications.create("", {
            iconUrl: "../../images/icon/list.png",
            type: "basic",
            title: "Marked as to read",
            message: "A page has been added to To Read list",
          });
        },
      });
    }
  });
});
