const http = require('http')

function sendData(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    })

    let i = 0

    let interval = setInterval(write, 1000)

    write()
    function write() {
        i++

        if (i % 5 === 0) {
            res.write(`event: yubiley\ndata: У нас юбилей ${i} запрос \n\n`)

            return
        }

        res.write(`data: ${i} \n\n`)
    }
}

http.createServer((req, res) => {
    if (req.url = '/') {
        sendData(req, res)
        return
    }
}).listen(8080)