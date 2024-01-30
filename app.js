let id = 1;
let tasks = [];
let tasksDoing = [];
let tasksDone = [];

window.onload = function () {
  if (localStorage.getItem("usernameGravado")) {
    document.getElementById("nomeAaparecerNoEcra").innerHTML = localStorage.getItem("usernameGravado");
  }
  if (localStorage.getItem("id")) {
    id = localStorage.getItem("id");
  }
  if (localStorage.getItem("tasksToDo")) {
    tasks = JSON.parse(localStorage.getItem("tasksToDo"));
    tasks.forEach((task) => {
      addTaskToTable(task);
    });
  }
  if (localStorage.getItem("tasksDoing")) {
    tasksDoing = JSON.parse(localStorage.getItem("tasksDoing"));
    tasksDoing.forEach((task) => {
      addTaskToTable(task);
    });
  }
  if (localStorage.getItem("tasksDoing")) {
    tasksDone = JSON.parse(localStorage.getItem("tasksDone"));
    tasksDone.forEach((task) => {
      addTaskToTable(task);
    });
  }
};

function GuardarUsername() {
  let username = document.getElementById("username").value;
  localStorage.setItem("usernameGravado",username);
}

/* Função parar pausar o vídeo de fundo através da checkbox  */
function PausarVideo() {
  var video = document.getElementById("video-background");
  var pausarVideoCheckbox = document.getElementById("pausarVideoCheckBox");

  if (pausarVideoCheckbox.checked) {
    video.pause();
  } else {
    video.play();
  }
}

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


function criarTarefa() {
  openAddTaskModal();
}
// Evento para criar tarefa apenas clicar no botão s/ (). Se colocar () cria logo a tarefa
// A condição if é para não criar tarefa quando se carrega no botão de fechar o modal
let createTaskButton = document.getElementById("createTask");
if (createTaskButton) {
  createTaskButton.onclick = criarTarefa;
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
}
// Operacoes com tarefas

//With function or class?
//Construtor das tarefas

function Task(name, description) {
  this.name = name;
  this.description = description;
  this.id = (id++)+"task";
  this.status = "ToDo";
}
// Função para adicionar tarefa
function addTaskModal(event) {
  event.preventDefault();
  // Get the values from the form
  var taskName = document.getElementById("addTaskName").value;
  var taskDescription = document.getElementById("addTaskDescription").value;
  // Create a new task object
  let task = new Task(taskName, taskDescription);
  // See the attributes of the task object in the console
  console.log("Nome da Tarefa:", taskName);
  console.log("Descrição:", taskDescription);
  console.log("ID:", task.id);
  addTaskToTable(task);
  // Fechar o modal após adicionar a tarefa
  closeAddTaskModal();
  save();
}

function addTaskToTable(task) {
  
  var column = document.getElementById(task.status);
  // Create a new task element
  var newTaskElement = document.createElement("div");
  newTaskElement.className = "task";
  newTaskElement.textContent = task.name;
  newTaskElement.id = task.id;
  newTaskElement.draggable = true;

  // Add event listeners for drag and drop functionality to use CSS
  // to style the task element when it is being dragged
  newTaskElement.addEventListener("dragstart", () => {
    newTaskElement.classList.add("dragging");
  });
  newTaskElement.addEventListener("dragend", () => {
    newTaskElement.classList.remove("dragging");
  });
  // Append the task element to the ToDo column
  column.appendChild(newTaskElement);
  
  // Navigate to the URL when the task element is clicked (Edit)
  newTaskElement.addEventListener("click", (e) => {
    let clickedId = e.target.id; // Get the ID of the clicked task
    alert(clickedId);
    localStorage.setItem("idAtual",clickedId);
    // Redirect to the editTask.html page
    window.location.href = "./editTask.html";
  });
  // Add the task to the tasks array
  if (task.status === "ToDo") {
    tasks.push(task);
  } else if (task.status === "doing") {
    tasksDoing.push(task);
  } else if (task.status === "done") {
    tasksDone.push(task);
  }
}


// Add event listeners for drag and drop functionality to all columns
const containers = document.querySelectorAll(".coluna");
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging"); // The task we want to drop
    container.appendChild(draggable); // Drop the task in the column
  });
});
containers.forEach((container) => {
  container.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging"); // The task we want to drop
    container.appendChild(draggable); // Drop the task in the column

    let targetTaskId = draggable.id; // Get the id of the task we're dragging

    // Use the updated arrays when finding the task
    let targetTask =
      tasks.find((task) => task.id === targetTaskId) ||
      tasksDoing.find((task) => task.id === targetTaskId) ||
      tasksDone.find((task) => task.id === targetTaskId);

    if (targetTask) {
      let targetCurrentStatus = targetTask.status;
      console.log(targetCurrentStatus, " --");

      // Remove the task from the array based on the current status

      if (targetCurrentStatus === "ToDo") {
        tasks = tasks.filter((task) => task.id !== targetTaskId);
      } else if (targetCurrentStatus === "doing") {
        tasksDoing = tasksDoing.filter((task) => task.id !== targetTaskId);
      } else if (targetCurrentStatus === "done") {
        tasksDone = tasksDone.filter((task) => task.id !== targetTaskId);
      }
      // Update the status of the task based on the id of the container
      if (container.id === "ToDo") {
        targetTask.status = "ToDo";
        tasks.push(targetTask);
      } else if (container.id === "doing") {
        targetTask.status = "doing";
        tasksDoing.push(targetTask);
      } else if (container.id === "done") {
        targetTask.status = "done";
        tasksDone.push(targetTask);
      }
    }
    console.log(tasks);
    console.log(tasksDoing);
    console.log(tasksDone);
    // Save the updated arrays to local storage
  });
});
// Go to the editTask.html page when a task is clicked
function backToHome() {
  window.location.href = "./quadro.html";
}

function editTask() {
let idTask = localStorage.getItem("idAtual");

alert(idTask);

tasks.forEach((task) => {
    if(idTask == task.id) {
      alert(task.name);
      task.name = document.getElementById("taskName").value;
      alert(task.name);
      save();
    }
    }
    
  )};
  


function save() {
  localStorage.setItem("tasksToDo", JSON.stringify(tasks));
  localStorage.setItem("tasksDoing", JSON.stringify(tasksDoing));
  localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
}
