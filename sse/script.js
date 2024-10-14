const stop = document.getElementById('stop')
const start = document.getElementById('start')
const messages = document.getElementById('messages')

function log(msg) {
    const li = document.createElement('li')
    li.innerHTML = msg
    messages.appendChild(li)
}

let eventSource

start.addEventListener('click', () => {
    if (!window.EventSource) {
        alert('Браузер не поддерживает EVentSource')
        return
    }


    eventSource = new EventSource('http://localhost:8080')

    eventSource.addEventListener('open', (e) => {
        console.log('Событие: open');

        log('Событие: open')
    })


    eventSource.addEventListener('message', (e) => {
        const kyrs = JSON.parse(e.data)
        log(`Курс юиткоина к доллару: ${kyrs.data.last}. Разница с последнего изменения: ${kyrs.data.last_change}`)
    })

    eventSource.addEventListener('yubiley', (e) => {
        log(`Событие - юбилей. Данные: ${e.data}`)

    })

})

stop.addEventListener('click', () => {
    eventSource.close()
    log('Соединение закрыто')
})