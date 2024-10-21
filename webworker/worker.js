function calc(value) {
    for (let index = 0; index < value; index++) {
        self.postMessage(index)
    }
}



self.addEventListener('message', (e) => {
    if (e.data.cmd === 'calc') {
        calc(e.data.value)
    }
})