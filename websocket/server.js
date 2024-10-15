const WebSocket = require('ws')
const port = process.env.PORT || 4000;

const server = new WebSocket.Server({ port: port })

console.log(server)

server.on("connection", connect => {
    console.log(connect)
    connect.on('message', message => {
        const msg = JSON.parse(message.toString())

        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN)
                client.send(`${msg.nick}: ${msg.message}`)
        })

    })

    connect.send('Добро пожаловать в общий чат')
})