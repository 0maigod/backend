import express from "express"
import moment from 'moment'
import path from 'path'
import { Producto } from './producto'
import {CommonRoutesConfig} from './rutas/common.route.config'
import {UsersRoutes} from './rutas/users.route.config'
import handlebars from 'express-handlebars'
import { Mensaje } from './mensaje'
import knex from 'knex'
import options from './options-db'


const knexInstance = knex(options);
const routes: Array<CommonRoutesConfig> = []

const app = express()
app.set("port", process.env.PORT || 8080);
var http = require("http").Server(app);
let io = require("socket.io")(http);

let productos: Producto [] = []
routes.push(new UsersRoutes(app, productos))

app.use(express.static('public'))

//------DATABASE SQLITE3----------------------
try {
    knexInstance.schema.hasTable('mensajes').then(function (exists: any) {
        if (!exists) {
            return knexInstance.schema.createTable('mensajes', function (t: any) {
                t.increments('id').primary()
                t.string('email', 25)
                t.string('fecha', 25)
                t.string('mensaje', 150)
            });
        }
    });
} catch(e) {
  console.error(e);
};

//------HANDLEBARS-----------------------------

app.engine(
    "hbs", 
    handlebars({
        extname: ".hbs",
        defaultLayout: "ingresar.hbs", 
        layoutsDir: path.join(__dirname,  '..', 'views', 'layouts'),
        partialsDir: path.join(__dirname, '..', 'views', 'partials')
    })
)

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'hbs')

//------SOCKET IO-------------------------------

io.on("connection", function(socket: any) {
    socket.emit('coneccion', 'Bienvenidx, por favor indique su nombre')
    knexInstance<Mensaje>('mensajes').select('*')
        .then((messagesSolved: Mensaje[])=>io.emit("recargMsg", messagesSolved)   
    )
    
    socket.on('bienvenida', (data: any) => {
        console.log(data);
    });
    
    
    socket.on("newProd", function(message: any) {
        let id = (productos.length + 1).toString()
        const {title, price, thumbnail, nombre} = message
        const prod = {
                    id,
                    title,
                    price: parseInt(price),
                    thumbnail
        }
        productos.push(prod)
        io.emit("recargProd", productos)
        console.log(`${nombre} ha agregado un producto`)
        console.log(productos)
    });
    
    socket.on("newMsg", function (message: Mensaje) {
        
        const { email, mensaje } = message
        const fecha = moment().format('DD/MM/YYYY hh:mm:ss')
        const msg = {
                    email,
                    fecha,
                    mensaje
        }
        console.log('nuevo msg antes de ' + email)
        knexInstance<Mensaje>('mensajes').insert(msg)
            .then(function () {
                let mensajes = knexInstance<Mensaje>('mensajes').select('*')
                return  mensajes
            })
            .then(function (mensajes: Mensaje[]) {
                return io.emit("recargMsg", mensajes)
        })

    });
    
});


//------SERVER----------------------------------

http.listen(8080, () => {
    console.log('escuchando en 8080')
}).on('error', console.log);

