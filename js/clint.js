const socket=io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer = document.getElementById('msg_container')

socket.on('connect', () => {
    console.log(socket.id);
})
var audio = new Audio('ting.mp3');

const append = (message,position)=>{
    const messgageElement = document.createElement('div');
    messgageElement.innerText = message;
    messgageElement.classList.add('message');
    messgageElement.classList.add(position);
    messageContainer.append(messgageElement);
    if(position=='left'){
    audio.play();
    }
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value=''
})
const user_name=prompt("Enter your name to join");
socket.emit('new-user-joined', user_name)

socket.on('user-joined', name => {
    // console.log("user joined", name);
    append(`${name} joined the chat`, 'right')
})
socket.on('receive', data => {
    // console.log("user joined", name);
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    // console.log("user joined", name);
    append(`${name}: left the chat`, 'right')
})