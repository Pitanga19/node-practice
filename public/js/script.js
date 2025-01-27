// node-practice/public/js/script.js

const socket = io('http://192.168.0.134:3000'); // Dirección IP del servidor

// Elementos del DOM
const usernameForm = document.getElementById('username-form');
const usernameInput = document.getElementById('username-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageList = document.getElementById('messages-list');

// Manejo del formulario de usuario
usernameForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();

    if (username) {
        // Enviar el nombre de usuario al servidor
        const response = await fetch('/api/users/findOrCreate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });
        const data = await response.json();

        if (data.success) {
            localStorage.setItem('userId', data.user.id);
            usernameForm.style.display = 'none';
            messageForm.style.display = 'block';
            alert(`Bienvenido, ${username}!`);
        } else {
            alert('Error al registrar el usuario');
        }
    }
});

// Manejo del formulario de mensajes
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageContent = messageInput.value.trim();

    if (messageContent) {
        const userId = localStorage.getItem('userId');
        console.log(`Sending data: message content: ${messageContent} - userId: ${userId}`)
        socket.emit('chat message', { messageContent: messageContent, userId: userId }); // Enviar mensaje con el userId
        messageInput.value = ''; // Limpiar campo de texto
    }
});

// Escuchar nuevos mensajes del servidor
socket.on('chat message', (message) => {
    const li = document.createElement('li');
    li.textContent = `${message.user.username}: ${message.content}`;
    messageList.appendChild(li);
});

// Cargar mensajes previos desde la API
fetch('/api/chat/messages')
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            data.messages.forEach((message) => {
                const li = document.createElement('li');
                li.textContent = `${message.user.username}: ${message.content}`;
                messageList.appendChild(li);
            });
        } else {
            console.error('Error al cargar los mensajes');
        }
    })
    .catch((error) => {
        console.error('Error al cargar mensajes:', error);
    });
