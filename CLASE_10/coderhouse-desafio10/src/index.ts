import express from 'express'
import { Producto } from './producto'
import {CommonRoutesConfig} from './rutas/common.route.config'
import {UsersRoutes} from './rutas/users.route.config'
import handlebars from 'express-handlebars'

const routes: Array<CommonRoutesConfig> = []
const app = express()


let productos: Producto [] = []
routes.push(new UsersRoutes(app, productos))

app.use(express.static('public'))


// app.get('/', function (req, res) {
//     res.render('main', { productos: productos, listExists: true});
//   });


app.engine(
    "hbs", 
    handlebars({
        extname: ".hbs",
        defaultLayout: "visualizar.hbs", 
        layoutsDir: "/usuarios/alumno/Documentos/code/backend/CLASE_10/coderhouse-desafio10/views/layouts",
        partialsDir: "/usuarios/alumno/Documentos/code/backend/CLASE_10/coderhouse-desafio10/views/partials"
    })
)

app.set('views', '/usuarios/alumno/Documentos/code/backend/CLASE_10/coderhouse-desafio10/views')
app.set('view engine', 'hbs')

app.listen(8080, () => {
    console.log('escuchando en 8080')
}).on('error', console.log);