import express from 'express'
import path from 'path'
import { Producto } from './producto'
import {CommonRoutesConfig} from './rutas/common.route.config'
import {UsersRoutes} from './rutas/users.route.config'


const routes: Array<CommonRoutesConfig> = []
const app = express()

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'ejs')

let productos: Producto [] = []
routes.push(new UsersRoutes(app, productos))

app.use(express.static('public'))


app.listen(8080, () => {
    console.log('escuchando en 8080')
}).on('error', console.log);