const addBtn = document.querySelector(".add-icon");
const shoppingLists = document.querySelector(".shopping-lists");
const input = document.querySelector("input");
let id = 0;

function onAdd(text) {
  const list = createElm(text);
  return list;
}

function createElm(text) {
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "list-item");
  listItem.setAttribute("data-id", `${id}`);
  listItem.innerHTML = `${text}
    <i class="fas fa-trash-alt" data-id=${id}></i>
  `;
  id++;
  shoppingLists.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    if (id) {
      const toBeDeleted = document.querySelector(`li[data-id="${id}"]`);
      toBeDeleted.remove();
    }
  });
  return listItem;
}

addBtn.addEventListener("click", () => {
  const content = input.value;
  if (content === "") {
    input.focus();
    return;
  }
  const list = onAdd(content);

  shoppingLists.appendChild(list);
  list.scrollIntoView();
  input.value = "";
  input.focus();
});

input.addEventListener("keydown", (event) => {
  const content = input.value;

  if (content === "") {
    input.focus();
    return;
  }

  if (event.key === "Enter") {
    const list = onAdd(content);

    shoppingLists.appendChild(list);
    list.scrollIntoView();
    input.value = "";
    input.focus();
  }
});
