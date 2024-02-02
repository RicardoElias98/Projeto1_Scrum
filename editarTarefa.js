let tasks = JSON.parse(localStorage.getItem("tasksToDo")) || [];
let tasksDoing = JSON.parse(localStorage.getItem("tasksDoing")) || [];
let tasksDone = JSON.parse(localStorage.getItem("tasksDone")) || [];

window.onload = function () {
  let nameTask = localStorage.getItem("nomeAtual");
  let descriptionTask = localStorage.getItem("descricaoAtual");
  document.getElementById("taskName").value = nameTask;
  document.getElementById("taskDescription").value = descriptionTask;
};

function editTask() {
  let idTask = localStorage.getItem("idAtual");

  tasks.forEach((task) => {
    if (idTask == task.id) {
      task.name = document.getElementById("taskName").value;
      task.description = document.getElementById("taskDescription").value;
      save();
    }
  });

  tasksDoing.forEach((task) => {
    if (idTask == task.id) {
      task.name = document.getElementById("taskName").value;
      task.description = document.getElementById("taskDescription").value;
      save();
    }
  });

  tasksDone.forEach((task) => {
    if (idTask == task.id) {
      task.name = document.getElementById("taskName").value;
      task.description = document.getElementById("taskDescription").value;
      save();
    }
  });
}

function deleteTask() {
  let idTask = localStorage.getItem("idAtual");

  tasks.forEach((task) => {
    if (idTask == task.id) {
      tasks.splice(idTask, 1);
      save();
    }
  });

  tasksDoing.forEach((task) => {
    if (idTask == task.id) {
      tasksDoing.splice(idTask, 1);
      save();
    }
  });

  tasksDone.forEach((task) => {
    if (idTask == task.id) {
      tasksDone.splice(idTask, 1);
      save();
    }
  });
}

function backToHome() {
  window.location.href = "./quadro.html";
}

function save() {
  localStorage.setItem("tasksToDo", JSON.stringify(tasks));
  localStorage.setItem("tasksDoing", JSON.stringify(tasksDoing));
  localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
}
