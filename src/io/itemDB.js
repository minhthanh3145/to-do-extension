function getItemsFromDatabase(callback) {
  chrome.storage.local.get(["items"], function (res) {
    callback(res.items);
  });
}
function addItemToDatabase(type, id, text) {
  getItemsFromDatabase(function (items) {
    if (!items) {
      items = {};
    }
    if (!items[type]) {
      items[type] = {};
    }
    items[type][id] = {
      text: text,
      originalType: type,
    };
    chrome.storage.local.set({ items: items });
  });
}

function removeItemFromDatabase(type, id) {
  chrome.storage.local.get(["items"], function (res) {
    let items = res.items;
    if (items && items[type]) {
      delete items[type][id];
    }
    chrome.storage.local.set({ items: items });
  });
}

function getItemInDatabase(type, id, callback) {
  chrome.storage.local.get(["items"], function (res) {
    let items = res.items;
    let item;
    if (items && items[type]) {
      item = items[type][id];
    }
    callback(item);
  });
}

function moveItemBackToOriginalTypeInDatabase(type, id) {
  chrome.storage.local.get(["items"], function (res) {
    let items = res.items;
    let item;
    if (items && items[type]) {
      item = items[type][id];
      delete items[type][id];
      chrome.storage.local.set({ items: items });
      addItemToDatabase(item.originalType, id, item.text);
    }
  });
}

function moveItemToDoneInDatabase(type, id) {
  chrome.storage.local.get(["items"], function (res) {
    let items = res.items;
    let item;
    if (items && items[type]) {
      item = items[type][id];
      delete items[type][id];
      if (!items["done-item"]) {
        items["done-item"] = {};
      }
      items["done-item"][id] = item;
    }
    chrome.storage.local.set({ items: items });
  });
}

// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters
// after the decimal.
let getRandomId = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const ItemDB = {
  getItemInDatabase,
  getItemsFromDatabase,
  addItemToDatabase,
  removeItemFromDatabase,
  getRandomId,
  moveItemBackToOriginalTypeInDatabase,
  moveItemToDoneInDatabase,
};
