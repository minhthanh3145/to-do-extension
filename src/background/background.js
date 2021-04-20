import("../io/itemDB.js").then(({ ItemDB }) => {
  import("../constants.js").then(({ Constants }) => {
    showMarkItemAsToReadNotification(
      ItemDB.addItemToDatabase,
      Constants,
      ItemDB.getRandomId
    );
    showMarkItemAsToDoNotification(
      ItemDB.addItemToDatabase,
      Constants,
      ItemDB.getRandomId
    );
  });
});

function showMarkItemAsToDoNotification(
  addItemToDatabase,
  Constants,
  getRandomId
) {
  chrome.contextMenus.create({
    title: "Mark as To Do",
    contexts: ["page", "selection", "image", "link"],
    onclick: (info) => {
      addItemToDatabase(
        Constants.TO_DO,
        getRandomId(),
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

function showMarkItemAsToReadNotification(
  addItemToDatabase,
  Constants,
  getRandomId
) {
  chrome.contextMenus.create({
    title: "Mark as To Read",
    contexts: ["page", "selection", "image", "link"],
    onclick: (info, tab) => {
      addItemToDatabase(
        Constants.TO_READ,
        getRandomId(),
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
