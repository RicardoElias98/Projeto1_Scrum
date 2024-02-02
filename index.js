const login = document.getElementById("login");
login.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("O username não pode ser vazio!");
  } else {
    localStorage.setItem("username", username);
    window.location.href = "./scrum-board.html";
  }
});

/* Função para ver a password através da checkbox */
function verPassword() {
  var passwordInput = document.getElementById("password");
  var verPasswordCheckbox = document.getElementById("verPasswordCheckbox");

  if (verPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
