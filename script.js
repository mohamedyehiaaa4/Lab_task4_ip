class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

const tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    // status icon for completed tasks
    const statusIcon = document.createElement("span");
    statusIcon.className = "status-icon";
    statusIcon.textContent = task.completed ? "✔️" : "";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.description;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", function () {
      task.toggleComplete();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "❌"; // cross symbol indicates removal

    deleteBtn.addEventListener("click", function () {
      // show 'wrong' icon and fade before deleting
      statusIcon.textContent = "❌";
      statusIcon.style.color = "red";
      li.classList.add("deleting");
      setTimeout(() => {
        tasks.splice(index, 1);
        renderTasks();
      }, 300);
    });

    li.appendChild(statusIcon);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const description = taskInput.value.trim();

  if (description === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = new Task(description);
  tasks.push(newTask);

  taskInput.value = "";
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});