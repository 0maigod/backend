const http = require('http')

const { fork } = require('child_process')

let visitas = 0

const server = http.createServer()

server.on('request', (req, res) => {
    let { url } = req
    if (url == '/calcular') {
        const computo = fork('./computo.js')
        computo.send('start')
        computo.on('message', sum => {
            res.end(`La suma es ${sum}`)
        })
    } else if (url == '/') {
        res.end('OK' + (++ visitas))
    }
})

const PORT = 8000

server.listen(PORT, err => {
    if (err) throw new Error(`Error en servidor: ${err}`)
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})