//----------REQUERIDOS-------------
import express from "express"
import io from "socket.io"
import http from 'http'
import handlebars from 'express-handlebars'
import moment from 'moment'
import path from 'path'
import { Producto } from './producto'
import { CommonRoutesConfig } from './routes/common.route.config'
// import { UsersRoutes, router } from './routes/users.route.config'
import router  from './routes/users.route.config'
import { Archivo, Mensaje } from './mensaje'

import Server from './server/server'

const routes: Array<CommonRoutesConfig> = []

//------------CONF. SERVIDOR

const expressServer = Server.init(8080)
const server = http.createServer(expressServer.app)
expressServer.app.use(router)


// const app = express()
// app.set("port", process.env.PORT || 8080);
// var http = require("http").Server(app);
// let io = require("socket.io")(http);

//-----------VARIABLES-----------------

let chatMensajes = new Archivo('mensajes')
let productos: Producto [] = []
// routes.push(new UsersRoutes(server.app, productos))

expressServer.app.use(express.static('public'))

//------HANDLEBARS-----------------------------

expressServer.app.engine(
    "hbs", 
    handlebars({
        extname: ".hbs",
        defaultLayout: "main.hbs", 
        layoutsDir: path.join(__dirname,  '..', 'views'),
        partialsDir: path.join(__dirname, '..', 'views', 'partials')
    })
)

expressServer.app.set('views', path.join(__dirname, '..', 'views'))
expressServer.app.set('view engine', 'hbs')

//------SOCKET IO-------------------------------
let mensajes = [{
    "email": "hola@gmail.com",
    "fecha": "25/02/2021 04:53:33",
    "mensaje": "hola gente de coderhouse",
    "id": 1
    },
    {
        "email": "chau@gmail.com",
        "fecha": "25/02/2021 05:01:36",
        "mensaje": "hola gente de coderhouse y aledaños",
        "id": 2
    }]
// let mensajes = chatMensajes.leer()

// io.on("connection", function(socket: any) {
//     socket.emit('coneccion', 'Bienvenidx, por favor indique su nombre')
//     socket.emit("recargProd", productos)
//     // console.log(mensajes)
//     io.emit("recargMsg", mensajes)
    
//     socket.on('bienvenida', (data: any) => {
//         console.log(data);
//     });
    
    
//     socket.on("newProd", function(message: any) {
//         // console.log(message);
//         let id = (productos.length + 1).toString()
//         const {title, price, thumbnail, nombre} = message
//         const prod = {
//                     id,
//                     title,
//                     price: parseInt(price),
//                     thumbnail
//         }
//         productos.push(prod)
//         // io.broadcast.emit("recargar", productos)
//         io.emit("recargProd", productos)
//         console.log(`${nombre} ha agregado un producto`)
//         console.log(productos)
//     });
    
//     socket.on("newMsg", function (message: Mensaje) {
        
//         const { email, mensaje, id } = message
//         const fecha = moment().format('DD/MM/YYYY hh:mm:ss')
//         const msg = {
//                     id,
//                     email,
//                     fecha,
//                     mensaje
//         }
//         chatMensajes.guardar(msg)

//         io.emit("recargMsg", mensajes)
//         console.log(`${email} ha mandado un mensaje`)

//     });
    
// });


//------SERVER----------------------------------

server.listen(8080)

// server.start()

// http.listen(8080, () => {
//     console.log('escuchando en 8080')
// }).on('error', console.log);

