let todo = JSON.parse(localStorage.getItem("todo")) || [];
const title = document.getElementById("todoInput1");
const about = document.getElementById("todoInput2");
const listContainer = document.getElementById("list-container");
const noTasksMessage = document.querySelector(".no-tasks");
const addButton = document.querySelector(".add-btn");

let editIndex = -1;

function addTask() {
  if (title.value.trim() !== '' && about.value.trim() !== '') {
    if (editIndex === -1) {
      let newTask = { title: title.value, about: about.value };
      todo.push(newTask);
    } else {
      todo[editIndex] = { title: title.value, about: about.value };
      editIndex = -1;
      addButton.textContent = "+";
    }

    saveToLocalStorage();
    displayTasks();
    title.value = "";
    about.value = "";
    updateNoTasksMessage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function displayTasks() {
  listContainer.innerHTML = "";
  todo.forEach((task, index) => {
    let li = document.createElement("li");

    let titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;
    titleSpan.style.fontWeight = "bold";

    let aboutPara = document.createElement("p");
    aboutPara.textContent = task.about;
    aboutPara.style.margin = "5px 0";

    let editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.style.marginLeft = "10px";
    editBtn.onclick = function () {
      editTask(index);
    };

    let deleteBtn = document.createElement("delete-btn");
    deleteBtn.textContent = "X";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(titleSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(aboutPara);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    listContainer.appendChild(li);
  });

  updateNoTasksMessage();
}

function editTask(index) {
  title.value = todo[index].title;
  about.value = todo[index].about;
  editIndex = index;
  addButton.textContent = "✔";
}

function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}

function updateNoTasksMessage() {
  noTasksMessage.style.display = todo.length > 0 ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
  displayTasks();
  updateNoTasksMessage();
});
