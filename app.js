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

/* Função após carregar no ENTER */
function updateLabel(event) {
  if (event.key == "Enter") {
    var nomeUtilizadorInput = document.getElementById("nomeUtilizador");
    var nomeAaparecerNoEcraLabel = document.getElementById(
      "nomeAaparecerNoEcra"
    );

    // Atualiza o nome do utilizador
    nomeAaparecerNoEcraLabel.textContent = nomeUtilizadorInput.value;
  }
}

/* Função para mudar a tarefa de coluna de To Do para Doing*/
function mudarDeColunaDeToDoParaDoing() {
  var tarefaAenviar = document.getElementById("tarefa1");
  var colunaAreceber = document.getElementById("doing");

  tarefaAenviar.innerHTML =
    '<button type="button" class="botaoesq" onclick="mudarDeColunaDeDoingParaToDo()"> &larr; </button>Tarefa 1<button type="button" class="botao"> &rarr; </button>';
  colunaAreceber.appendChild(tarefaAenviar);
}

/* Função para mudar a tarefa de coluna de Doing para ToDo */
function mudarDeColunaDeDoingParaToDo() {
  var tarefaAenviar = document.getElementById("tarefa1");
  var colunaAreceber = document.getElementById("ToDo");

  tarefaAenviar.innerHTML =
    'Tarefa 1 <button type="button" class="botao" onclick="mudarDeColunaDeToDoParaDoing()"> &rarr; </button>';
  colunaAreceber.appendChild(tarefaAenviar);
}

/* Criação de objetos - tarefas  - TESTE!!!!! */
var contador = 1;

function criarTarefa() {
  openAddTaskModal();
  const tarefa1 = {
    nome: "Revisão" + contador,
    descricao: "fazer até dia 29!",
  };
  localStorage.setItem("task", tarefa1.nome);
  console.log("rkekleerk");
  contador++;
  localStorage.setItem("contador", contador);
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
let tasks = [];
let tasksDoing = [];
let tasksDone = [];
let id = 1;
//With function or class?
//Construtor das tarefas
function Task(name, description) {
  this.name = name;
  this.description = description;
  this.id = "task" + id++;
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
}

function addTaskToTable(task) {
  var todoColumn = document.getElementById("ToDo");

  // Create a new task element
  var newTaskElement = document.createElement("div");
  newTaskElement.className = "tarefa";
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
  todoColumn.appendChild(newTaskElement);
  todoColumn.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
  });
  // Navigate to the URL when the task element is clicked (Edit)
  document.querySelector(".tarefa").addEventListener("click", (e) => {
    const clickedId = e.target.id; // Get the ID of the clicked task
    // Redirect to the editTask.html page
    window.location.href = "./editTask.html";
  });
  // Add the task to the tasks array
  tasks.push(task);
}

// Função para remover tarefa
function removeTask(taskId) {
  // Remove the task from the tasks array
  tasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  // Remove the task element from the DOM if it exists
  var taskElement = document.getElementById(taskId);
  if (taskElement) {
    taskElement.remove();
  } else {
    console.log("Task element not found");
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
  });
});

function backToHome() {
  window.location.href = "./quadro.html";
}

function printAllTasksID() {
  let taskss = document.tasks;
}

const btn_login = document.getElementById("btn-login");
const username = document.getElementById("username");
btn_login.addEventListener("click", () => {
  localStorage.setItem("username", username.value);
  console.log(username.value);
  localStorage.getItem("username");
});
