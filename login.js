function GuardarUsername() {
  let username = document.getElementById("username").value;
  localStorage.setItem("usernameGravado", username);
}
