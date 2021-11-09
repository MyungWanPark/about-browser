const addBtn = document.querySelector(".add-icon");
const shoppingLists = document.querySelector(".shopping-lists");
const input = document.querySelector("input");
let id = 0;

function onAdd() {
  const content = input.value;

  if (content === "") {
    input.focus();
    return;
  }

  createElm(content);
}

function createElm(text) {
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "list-item");
  listItem.setAttribute("data-id", `${id}`);
  listItem.innerHTML = `${text}
    <i class="fas fa-trash-alt" data-id=${id}></i>
  `;
  id++;

  shoppingLists.appendChild(listItem);
  listItem.scrollIntoView();
  input.value = "";
  input.focus();
}

shoppingLists.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`li[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});
