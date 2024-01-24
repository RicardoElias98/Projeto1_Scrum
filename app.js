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



