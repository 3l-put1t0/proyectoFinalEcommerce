const socket = io();

let user = '';
let chatBox = document.getElementById('chatBox');
const container_user = document.getElementById('container_user');

let addNameUser = document.createElement('h2');
addNameUser.className = 'nameUser';
// Ventana de inicio para registrar el nombre si el usuario no esta registrado
Swal.fire({
    title: "CHAT",
    input: "text",
    text: "Ingresa un nombre",
    icon: "success",
    inputValidator: (value) => {
        return !value && '!Es obligatorio escribir un nombre para ingresar al chat'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value.trim();
    user = user.toUpperCase();
    addNameUser.innerText = `---> USUARIO: ${user}`;
});

const salto = document.createElement('br')
container_user.append(salto);
container_user.append(addNameUser);
container_user.append(salto);
// Escucha los eventos y envía la información
chatBox.addEventListener('keyup', event => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            console.log('Ingreso: ', chatBox.value);
            socket.emit('message', {
                user,
                message: chatBox.value,
            });
            chatBox.value = "";
        }
    }
});

// Se carga y se visualiza la interracción entre los usuarios
socket.on('messageLogs', data => {
    let loadMessage = document.getElementById("messageLogs");
    let message = "";
    data.forEach(element => {
        message += `<p><strong>${element.user}:</strong> ${element.message}</p>`;
    });
    loadMessage.innerHTML = message;
});