import express from 'express'
import path from 'path'
import { Producto } from '../producto'
import { CommonRoutesConfig } from './common.route.config'
import  bodyParser from 'body-parser'

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

export class UsersRoutes extends CommonRoutesConfig {
    productos: Producto []
    constructor(app: express.Application, productos: Producto []) {
        super(app, 'UsersRoutes')
        this.productos = productos
    }
    configureRoutes() {

        this.app.route('/ingresar')
        .get((req: express.Request, res: express.Response) =>{
            res.status(200).render('pages/ingresar', {
            })
        })
        .post(urlencodedParser,(req: express.Request, res: express.Response) => {
            let id = (this.productos.length + 1).toString()
            // console.log(req.body)
            const {title, price, thumbnail} = req.body
            const prod = {
                    id,
                    title,
                    price: parseInt(price),
                    thumbnail
            }
            this.productos.push(prod)
            res.status(200).render('pages/ingresar', {
            })
        })

        this.app.route('/productos/vista')
        .get((req: express.Request, res: express.Response) =>{
            res.status(200).render('pages/index', {
                productos: this.productos,
            });;
        })

        this.app.route('/api/productos')
        .get((req: express.Request, res: express.Response) =>{
            if(this.productos.length === 0){
                res.status(404).send(`{error: 'no hay productos cargados'}`)
                return
            }
            res.status(200).json(this.productos)
        })
        .post(jsonParser,(req: express.Request, res: express.Response) => {
            let id = (this.productos.length + 1).toString()
            const {title, price, thumbnail} = req.body
            const prod = {
                    id,
                    title,
                    price: parseInt(price),
                    thumbnail
            }
            this.productos.push(prod)
            res.status(200).json(prod)
        })

        this.app.route('/api/productos/:id')
        .get((req: express.Request, res: express.Response) =>{
            const id = req.params.id
            const prod = this.productos.find( prod => prod.id === id)
            if (!prod){
                res.send(`{error: 'producto no encontrado'}`)
                return
            }
            res.status(200).json(prod)
        })
        .put(jsonParser, (req: express.Request, res: express.Response) =>{
            const id = req.params.id
            let prod = this.productos.find( prod => prod.id === id)
            if (!prod){
                res.send(`{error: 'producto no encontrado'}`)
                return
            }
            this.productos = this.productos.filter( prod => prod.id !== id)
            const {title, price, thumbnail} = req.body
            prod = {
                    id,
                    title,
                    price: parseInt(price),
                    thumbnail
            }
            this.productos.push(prod)
            res.status(200).json(prod)
        })
        .delete((req: express.Request, res: express.Response) =>{
            const id = req.params.id
            const prod = this.productos.find( prod => prod.id === id)
            if(!prod){
                res.sendStatus(404)
                return
            }
            this.productos = this.productos.filter( prod => prod.id !== id)
            res.send(prod)
        })

        return this.app
    }
}


    
    
