let id = 1;
let tasks = [];
let tasksDoing = [];
let tasksDone = [];
const containers = document.querySelectorAll(".coluna");

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  window.location.href = "./index.html";
});

window.onload = function () {
  if (localStorage.getItem("username")) {
    document.getElementById("nomeAaparecerNoEcra").innerHTML =
      localStorage.getItem("username");
  }
  if (localStorage.getItem("id")) {
    id = localStorage.getItem("id");
  }
  if (localStorage.getItem("tasksToDo")) {
    tasks = JSON.parse(localStorage.getItem("tasksToDo"));
    tasks.forEach((task) => {
      createElements(task);
    });
  }
  if (localStorage.getItem("tasksDoing")) {
    tasksDoing = JSON.parse(localStorage.getItem("tasksDoing"));
    tasksDoing.forEach((task) => {
      createElements(task);
    });
  }
  if (localStorage.getItem("tasksDoing")) {
    tasksDone = JSON.parse(localStorage.getItem("tasksDone"));
    tasksDone.forEach((task) => {
      createElements(task);
    });
  }
};

/* Função para ver a password através da checkbox */
function VerPassword() {
  var passwordInput = document.getElementById("password");
  var verPasswordCheckbox = document.getElementById("verPasswordCheckbox");

  if (verPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

// Funções do modal, janela que aparece quando clicamos no botão "Adicionar tarefa"
// Função para abrir o modal
function openAddTaskModal() {
  document.getElementById("addTaskModal").style.display = "block";
  document.querySelector(".modal-background").style.display = "block";
}

// Função para fechar o modal
function closeAddTaskModal() {
  document.getElementById("addTaskModal").style.display = "none";
  document.querySelector(".modal-background").style.display = "none";
  document.getElementById("addTaskName").value = "";
  document.getElementById("addTaskDescription").value = "";
}
// Operacoes com tarefas

//With function or class?
//Construtor das tarefas
function Task(name, description) {
  this.name = name;
  this.description = description;
  this.id = id++ + "task";
  this.status = "ToDo";
  localStorage.setItem("id", id);
}
// Função para adicionar tarefa
function addTaskModal(event) {
  event.preventDefault();
  // Get the values from the form
  var taskName = document.getElementById("addTaskName").value;
  var taskDescription = document.getElementById("addTaskDescription").value;
  // Create a new task object
  let task = new Task(taskName, taskDescription);
  addTaskToTable(task);
  // Fechar o modal após adicionar a starefa
  closeAddTaskModal();
  save();
}

function addTaskToTable(task) {
  // Create a new task element
  createElements(task);
  // Add the task to the tasks array
  if (task.status === "ToDo") {
    tasks.push(task);
  } else if (task.status === "doing") {
    tasksDoing.push(task);
  } else if (task.status === "done") {
    tasksDone.push(task);
  }
  save();
}
// Function to create the task elements, uppdate table
function createElements(task) {
  // Find the column that the task belongs to
  var column = document.getElementById(task.status);
  // Create a new task element
  var newTaskElement = document.createElement("div");
  newTaskElement.className = "task";
  newTaskElement.textContent = task.name;
  newTaskElement.id = task.id;
  newTaskElement.description = task.description;
  newTaskElement.draggable = true;

  // Add event listeners for drag and drop functionality to use CSS
  newTaskElement.addEventListener("dragstart", () => {
    newTaskElement.classList.add("dragging");
  });
  newTaskElement.addEventListener("dragend", () => {
    newTaskElement.classList.remove("dragging");
  });
  newTaskElement.addEventListener("click", (e) => {
    // Redirect to the editTask.html page
    let clickedId = e.target.id; // Get the ID of the clicked task
    let clickedName = e.target.textContent;
    let clickedDescription = e.target.description;
    //alert(clickedId);
    localStorage.setItem("idAtual", clickedId);
    localStorage.setItem("nomeAtual", clickedName);
    localStorage.setItem("descricaoAtual", clickedDescription);
    //document.getElementById("taskName").value = clickedName;
    window.location.href = "./edit-task.html";
    //alert(clickedName);
  });
  column.appendChild(newTaskElement);
}

function editTask() {
  let idTask = localStorage.getItem("idAtual");

  alert(idTask);

  tasks.forEach((task) => {
    if (idTask == task.id) {
      task.name = document.getElementById("taskName").value;
      save();
    }
  });

  tasksDoing.forEach((task) => {
    if (idTask == task.id) {
      task.name = document.getElementById("taskName").value;
      save();
    }
  });

  tasksDone.forEach((task) => {
    if (idTask == task.id) {
      task.name = document.getElementById("taskName").value;
      save();
    }
  });
}

// Add event listeners for drag and drop functionality to all columns
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  container.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging"); // The task we want to drop
    container.appendChild(draggable); // Drop the task in the column
    let targetTaskId = draggable.id; // Get the id of the task we're dragging
    let targetTask = verify(targetTaskId); // Verify if the task exists
    if (targetTask) {
      // If the task exists
      let targetCurrentStatus = targetTask.status; // Remove the task from the array based on the current status
      eliminateTask(targetCurrentStatus, targetTaskId); // Update the status of the task based on the id of the container
      addTaskToArray(container, targetTask);
    }
    // Save the updated arrays to local storage
    save();
  });
});
// Add the task to the correct array based on the id of the container
function addTaskToArray(container, targetTask) {
  if (container.id === "ToDo") {
    targetTask.status = "ToDo";
    tasks.push(targetTask);
    save();
  } else if (container.id === "doing") {
    targetTask.status = "doing";
    tasksDoing.push(targetTask);
    save();
  } else if (container.id === "done") {
    targetTask.status = "done";
    tasksDone.push(targetTask);
    save();
  }
}
// Go to the editTask.html page when a task is clicked
function backToHome() {
  window.location.href = "./quadro.html";
}
function save() {
  localStorage.setItem("tasksToDo", JSON.stringify(tasks));
  localStorage.setItem("tasksDoing", JSON.stringify(tasksDoing));
  localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
}
// Verify if the task exists
function verify(targetTaskId) {
  let targetTask =
    tasks.find((task) => task.id === targetTaskId) ||
    tasksDoing.find((task) => task.id === targetTaskId) ||
    tasksDone.find((task) => task.id === targetTaskId);
  return targetTask;
}
// Remove the task from the array based on the current status
function eliminateTask(targetCurrentStatus, targetTaskId) {
  if (targetCurrentStatus === "ToDo") {
    tasks = tasks.filter((task) => task.id !== targetTaskId);
  } else if (targetCurrentStatus === "doing") {
    tasksDoing = tasksDoing.filter((task) => task.id !== targetTaskId);
  } else if (targetCurrentStatus === "done") {
    tasksDone = tasksDone.filter((task) => task.id !== targetTaskId);
  }
}