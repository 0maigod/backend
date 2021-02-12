import express from 'express'
import path from 'path'
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
        layoutsDir: path.join(__dirname,  '..', 'views', 'layouts'),
        partialsDir: path.join(__dirname, '..', 'views', 'partials')
    })
)

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'hbs')

app.listen(9090, () => {
    console.log('escuchando en 8080')
}).on('error', console.log);