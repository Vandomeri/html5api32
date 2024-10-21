const test = document.getElementById('test')
const input = document.getElementById('input')


const worker = new Worker('./worker.js')

worker.addEventListener('message', (e) => {
    test.innerHTML = e.data
})


input.addEventListener('change', (e) => {
    worker.postMessage({
        cmd: 'calc',
        value: e.target.value
    })
})