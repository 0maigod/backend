import express = require('express')

export default class Server {
    public app : express.Application
    
    constructor(private port: number) {
        this.app = express()
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('escuchando en 8080')
        }).on('error', console.log)
    }
    
    static init(port: number): Server {
        return new Server(port)
    }
}