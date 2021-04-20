import { ItemDB } from "../io/itemDB.js";
import { Constants } from "../constants.js";

// Load items from database and display them on opening popup
(() => {
  ItemDB.getItemsFromDatabase(function (items) {
    for (const [id, item] of Object.entries(items[Constants.TO_READ])) {
      $("#toread-items").append(buildItem(id, item.text, Constants.TO_READ));
    }
    for (const [id, item] of Object.entries(items[Constants.TO_DO])) {
      $("#todo-items").append(buildItem(id, item.text, Constants.TO_DO));
    }
    for (const [id, item] of Object.entries(items[Constants.DONE])) {
      $("#done-items").append(buildItem(id, item.text, Constants.DONE));
    }
  });
})();

$("#add-toread-item").click(function () {
  let id = ItemDB.getRandomId();
  let item = $("<div></div>") // Create a div
    .attr("id", id) // with a randomized ID
    .append(
      buildTextArea(id, Constants.TO_READ) // that has a textarea element
    );
  $("#toread-items").append(item); // add the div with the above logic to the list of to-read items
});

$("#add-todo-item").click(function () {
  let id = ItemDB.getRandomId();
  let item = $("<div></div>") // Create a div
    .attr("id", id) // with a randomized ID
    .append(
      buildTextArea(id, Constants.TO_DO) // that has a textarea element
    );
  $("#todo-items").append(item); // add the div with the above logic to the list of to-read items
});

function buildItem(id, text, type) {
  return $("<div></div>")
    .addClass("item-container")
    .append(
      // We have two layers of div so that we can replace everything starting from second-layer without changing the perceived location of the item
      $("<div></div>")
        .attr("id", id)
        .addClass("grid-container")
        .append(buildCheckboxPart(id, text, type))
        .append(buildDeleteIconPart(id, type))
    );
}

function buildCheckboxPart(id, text, type) {
  let chkId = "chkb_" + id;
  return $("<div></div>")
    .attr("class", "checkbox_container")
    .append(
      $("<input>")
        .attr("id", chkId)
        .prop("checked", type == Constants.DONE)
        .attr("type", "checkbox")
        .click(function () {
          let isChecked = $(this).prop("checked");
          if (isChecked == true) {
            // if a click makes the item checked, then it should be moved to Done
            handleCheckItemAsDone(id, text, type);
          } else {
            // otherwise move it back to the original list
            handleCheckItemAsUndone(id);
          }
        })
    )
    .append(buildCheckboxLabel(text, chkId, id, type));
}

function buildCheckboxLabel(text, chkId, id, type) {
  return $("<div></div>")
    .html(marked(text))
    .addClass("item-label")
    .attr("for", chkId)
    .click(function () {
      // Get text of current label
      let labelText = text;
      // Build a textarea with that text
      let textArea = buildTextArea(id, type);
      textArea.val(labelText);
      // Add textarea to the first-level div
      $("#" + id)
        .parent()
        .append(textArea);
      // Remove the second-level div
      $("#" + id).remove();
    });
}

function handleCheckItemAsDone(id, text, type) {
  $("#done-items").append(buildItem(id, text, Constants.DONE));
  $("#" + id).remove();
  ItemDB.moveItemToDoneInDatabase(type, id);
}

function handleCheckItemAsUndone(id) {
  ItemDB.getItemInDatabase(Constants.DONE, id, (item) => {
    $("#" + id).remove();
    ItemDB.moveItemBackToOriginalTypeInDatabase(Constants.DONE, id);
    if (item.originalType == Constants.TO_DO) {
      $("#todo-items").append(buildItem(id, item.text, Constants.TO_DO));
    } else {
      $("#toread-items").append(buildItem(id, item.text, Constants.TO_READ));
    }
  });
}

function buildDeleteIconPart(id, type) {
  return $("<img></img>")
    .addClass("delete-icon")
    .attr("src", "../../images/icon/x.svg")
    .click(function () {
      $("#" + id).remove();
      ItemDB.removeItemFromDatabase(type, id);
    });
}

function buildTextArea(id, type) {
  const onTextChange = function () {
    let txtAreatext = $(this).val(); // we get its text
    $(this) // create a to-do item with the same text and add to its parent
      .parent()
      .append(buildItem(id, txtAreatext, type));
    $(this).remove(); // and remove the textarea from its parent
    ItemDB.addItemToDatabase(type, id, txtAreatext);
  };
  return $("<textarea></textarea>")
    .addClass("item-textarea")
    .blur(onTextChange);
}
