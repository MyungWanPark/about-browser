const addBtn = document.querySelector(".add-icon");
const shoppingList = document.querySelector(".shopping-list");
const input = document.querySelector("input");

function onAdd() {
  const content = input.value;

  if (content === "") {
    input.focus();
    return;
  }
  const list = createElm(content);
  return list;
}

function createElm(text) {
  const listItem = document.createElement("li");

  listItem.innerText = text;
  listItem.setAttribute("class", "lists");
  createIcon(listItem);
  return listItem;
}

function createIcon(list) {
  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-trash-alt");
  list.appendChild(icon);

  icon.addEventListener("click", (event) => {
    shoppingList.removeChild(event.target.parentNode);
  });
}

addBtn.addEventListener("click", () => {
  const list = onAdd();

  shoppingList.appendChild(list);
  list.scrollIntoView();
  input.value = "";
  input.focus();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const list = onAdd();

    shoppingList.appendChild(list);
    input.value = "";
    input.focus();
  }
});
