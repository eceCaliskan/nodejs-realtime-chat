const socket = io('http://localhost:3000', { transports: ['websocket'] })

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const type = document.getElementById('typing')
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)


socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})


socket.on('user-connected', name => {
    appendMessage(`${data.name} connected`)
})


var timeout;

function timeoutFunction() {
    typing = false;
    socket.emit("typing", false);
}

socket.on('typing', data => {
    if (name) {
        show(`${data.name} typing...`)
    }
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})


//adding messages to the chat
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    //listen the input 
    const message = messageInput.value;
    appendMessage(`You: ${message}`)
        //show the message on my screen
    socket.emit('send-chat-message', message)
    messageInput.value = ""
})

messageInput.addEventListener('keyup', e => {
    console.log('happening');
    typing = true;
    socket.emit('typing', 'typing...');
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 2000);
})



function appendMessage(message) {
    type.innerText = ""
    const d = new Date();
    const messageElement = document.createElement('div');
    const messageText = document.createElement('p');


    messageElement.innerText = message;
    messageText.style.fontSize = '8px'
    messageText.style.textAlign = 'right'
    messageText.innerText += d;

    messageElement.append(messageText)
    messageContainer.append(messageElement)

}

function show(message) {

    type.innerText = message

}