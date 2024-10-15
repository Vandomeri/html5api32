const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 3000 })
server.on("connection", connect => {

    connect.on('message', message => {
        const msg = JSON.parse(message.toString())

        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN)
                client.send(`${msg.nick}: ${msg.message}`)
        })

    })

    connect.send('Добро пожаловать в общий чат')
})