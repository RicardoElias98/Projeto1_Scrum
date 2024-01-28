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
      var nomeAaparecerNoEcraLabel = document.getElementById("nomeAaparecerNoEcra");

      // Atualiza o nome do utilizador
      nomeAaparecerNoEcraLabel.textContent = nomeUtilizadorInput.value;
    }
  }

  /* Função para mudar a tarefa de coluna de To Do para Doing*/
  function mudarDeColunaDeToDoParaDoing(){
    var tarefaAenviar = document.getElementById ('tarefa1');
    var colunaAreceber = document.getElementById('doing');

    tarefaAenviar.innerHTML = '<button type="button" class="botaoesq" onclick="mudarDeColunaDeDoingParaToDo()"> &larr; </button>Tarefa 1<button type="button" class="botao"> &rarr; </button>';
    colunaAreceber.appendChild(tarefaAenviar);
  }

  /* Função para mudar a tarefa de coluna de Doing para ToDo */
  function mudarDeColunaDeDoingParaToDo(){
    var tarefaAenviar = document.getElementById ('tarefa1');
    var colunaAreceber = document.getElementById('ToDo');

    tarefaAenviar.innerHTML = 'Tarefa 1 <button type="button" class="botao" onclick="mudarDeColunaDeToDoParaDoing()"> &rarr; </button>'
    colunaAreceber.appendChild(tarefaAenviar);
  }

  document.getElementById("botaoTarefa").onclick = criarTarefa;

   
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

// Função para adicionar tarefa
function addTaskModal() {
  var taskName = document.getElementById("addTaskName").value;
  var taskDescription = document.getElementById("taskNameDescription").value;

  // Aqui você pode fazer algo com os dados da tarefa, como adicioná-los a uma lista, armazená-los em um banco de dados, etc.
  console.log("Nome da Tarefa:", taskName);
  console.log("Descrição:", taskDescription);

  var taskNova = {
    name: taskName,
    description: taskDescription
  };

  criarTarefa(taskNova);

  // Fechar o modal após adicionar a tarefa
  closeAddTaskModal();
}

/* Criação de objetos - tarefas  - TESTE!!!!! */
var contador = 1;

function criarTarefa(taskNova) {
   openAddTaskModal();
  
   localStorage.setItem("task", taskNova);
   console.log("rkekleerk");
   contador++;
   localStorage.setItem("contador",contador);
}

