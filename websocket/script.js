const statusField = document.getElementById('status')
const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')
const nickInput = document.getElementById('nickname')
const ws = new WebSocket('wss://html5api32.onrender.com:3000')

function printMessage(message) {
    const li = document.createElement('li')
    li.innerHTML = message
    messages.appendChild(li)
}

ws.addEventListener('open', () => {
    statusField.innerHTML = 'ONLINE'
})

ws.addEventListener('close', () => {
    statusField.innerHTML = 'DISCONNECTED'
})

ws.addEventListener('message', (message) => {
    printMessage(message.data)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = {
        nick: nickInput.value,
        message: input.value
    }
    ws.send(JSON.stringify(data))
    input.value = ''
})