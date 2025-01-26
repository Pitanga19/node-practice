const socket = io('http://192.168.0.134:3000'); // Dirección IP del servidor

// Obtener los elementos
const form = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageList = document.getElementById('messages-list');

// Enviar un mensaje
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageContent = messageInput.value.trim();
    
    if (messageContent) {
        socket.emit('chat message', messageContent); // Emitir mensaje a través de Socket.io
        messageInput.value = ''; // Limpiar campo de texto
    }
});

// Escuchar nuevos mensajes emitidos por el servidor
socket.on('chat message', (messageContent) => {
    const li = document.createElement('li');
    li.textContent = messageContent;
    messageList.appendChild(li);
});

// Cargar mensajes previos desde la API
fetch('/api/chat/messages')
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            data.messages.forEach((message) => {
                const li = document.createElement('li');
                li.textContent = message.content;
                messageList.appendChild(li);
            });
        } else {
            console.error('Error al cargar los mensajes');
        }
    })
    .catch((error) => {
        console.error('Error al cargar mensajes:', error);
    });
