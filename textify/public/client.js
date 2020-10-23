const socket = io();
let name;
let textarea = document.querySelector('#textarea')
let submitbtn = document.querySelector('#submit')
    let messageArea = document.querySelector('.message__area')

    let userName = document.querySelector("#user")

    let photos = document.querySelector('#imagefile')
    let photoArea = document.querySelector(".photo__area")


    do {
        name = prompt('Please enter your name: ')
    } while (!name);



document.getElementById("phoneArea").innerHTML = name;
    submitbtn.addEventListener('click', (e) => {
        sendMessage(e.target.value)
    
    })
    
    function sendMessage(message) {
        let msg = {
            sender: name,
            message: textarea.value,
            user: userName.value,
        }

        //append message
        appendMessage(msg, 'outgoing')
        textarea.value = ''
        scrollToBottom()

        //send to server
        socket.emit('message', msg)
    }


    function appendMessage(msg, type) {
        let mainDiv = document.createElement('div')
        let className = type
        mainDiv.classList.add(className, 'message')

        let markup = `
        <h4>${msg.sender}</h4>
         <p>${msg.message}</p> 
    `
        
        
        mainDiv.innerHTML = markup

        messageArea.appendChild(mainDiv)
        document.getElementById("receiver").innerHTML = msg.user;
    }

    // Recieve messages 
    socket.on('message', (msg) => {
        appendMessage(msg, 'incoming')
        scrollToBottom()
    })

    function scrollToBottom() {
        messageArea.scrollTop = messageArea.scrollHeight
    }



/*......................................................photos................................................*/

photos.addEventListener('change', (e) => {
        sendPhoto(e.target.result)
    
})

function sendPhoto(image) {
    let img = {
        image: photos.result,
        user:userName.value
    }
    // Append 
    appendPhotos(img, 'outgoing')
    photos.result = ''
    scrollToBottom()

    // Send to server 
    socket.emit('image', img)

}

function appendPhotos(img, type) {
    let mainDiv1 = document.createElement('div')
    let className1 = type
    mainDiv1.classList.add(className1, 'image')

    let markup1 = `
        <h4>${img.user}</h4>
         <p>${img.image}</p> 
    `
    mainDiv1.innerHTML = markup1
    photoArea.appendChild(mainDiv1)
}

// Recieve messages 
socket.on('image', (img) => {
        appendMessage(img, 'incoming')
        scrollToBottom()
    })

function scrollToBottom() {
    photoArea.scrollTop = photoArea.scrollHeight
}



