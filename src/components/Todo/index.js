import store from "../../redux/store";
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "../../redux/actionTypes";

const input = document.querySelector(".todo-title");
const todoForm = document.querySelector(".todo-form");
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value.length < 1) {
    return;
  }
  store.dispatch({ type: ADD_TODO, title: input.value });
  input.value = "";
});

function createBtnDelete(index) {
  const btnDelete = document.createElement("button");
  btnDelete.innerHTML = "X";
  btnDelete.setAttribute("type", "button");
  btnDelete.addEventListener("click", function () {
    store.dispatch({
      type: REMOVE_TODO,
      index: index
    });
  });
  return btnDelete;
}
function createCheckbox(index) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("change", function () {
    store.dispatch({
      type: TOGGLE_TODO,
      index: index
    });
  });
  return checkBox;
}
// render
function render() {
  const todosList = document.querySelector(".todos-list");
  const todos = store.getState().todos;
  todosList.innerHTML = "";
  todos.forEach((el, index) => {
    const li = document.createElement("li");
    const btnDelete = createBtnDelete(index);
    const checkBox = createCheckbox(index);
    li.innerHTML = `<span>${el.title}</span>`;

    if (el.done) {
      li.classList.add("done");
      checkBox.checked = true;
    }
    li.appendChild(checkBox);
    li.appendChild(btnDelete);
    todosList.appendChild(li);
  });
  document.querySelector(".total-todos").innerHTML = store.getState()[
    "totalTodo"
  ];
}

render();
store.subscribe(render);