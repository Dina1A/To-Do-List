let todo = JSON.parse(localStorage.getItem("todo")) || [];
const title = document.getElementById("todoInput1");
const about = document.getElementById("todoInput2");
const listContainer = document.getElementById("list-container");
const noTasksMessage = document.querySelector(".no-tasks"); 

function addTask() {
  if (title.value.trim() !== '' && about.value.trim() !== '') {
    let newTask = { title: title.value, about: about.value };
    todo.push(newTask);
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

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(titleSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(aboutPara);
    li.appendChild(deleteBtn);

    listContainer.appendChild(li);
  });

  updateNoTasksMessage(); 
}

function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}

function updateNoTasksMessage() {
  if (todo.length > 0) {
    noTasksMessage.style.display = "none"; 
  } else {
    noTasksMessage.style.display = "block"; 
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayTasks();
  updateNoTasksMessage();
});
