let id = 1;
let tasks = [];
let tasksDoing = [];
let tasksDone = [];

window.onload = function () {
  console.log("corri");
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
  this.id = id++;
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
  var newButton = document.createElement('button');
  newButton.className = "newButton";
  newButton.innerHTML = '&rarr;';
  newTaskElement.className = "task";
  newTaskElement.textContent = task.name;
  newTaskElement.id = task.id;
  tasks.push(task);
  newTaskElement.appendChild(newButton);
  newButton.onclick = function (event) {
    event.stopPropagation();
    alert("para a coluna DOING");
    task.status="doing";
    tasksDoing.push(task);
    let indiceID = (newTaskElement.id)-1;
    tasks.splice(indiceID,1)
    save();
    location.reload();
  }

  
  
  

  column.appendChild(newTaskElement);
  
  // Navigate to the URL when the task element is clicked (Edit)
  newTaskElement.addEventListener("click", (e) => {
    let clickedId = e.target.id; // Get the ID of the clicked task
    alert("TESTE");
    localStorage.setItem("idAtual",clickedId);
    // Redirect to the editTask.html page
    window.location.href = "./editTask.html";
  });
}

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
