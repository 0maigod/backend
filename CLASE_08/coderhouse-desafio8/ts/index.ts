import express from 'express'
import { Producto } from './producto'

const app = express()

app.use(express.json())


const productos: Producto [] = []

app.get('/api/productos' , (req, res) => {
    if(productos.length === 0){
        res.send(`{error: 'no hay productos cargados'}`)
    }
    res.json(productos)
})

app.post('/api/productos' , (req, res) => {
    let id = (productos.length + 1).toString()
    const {title, price, thumbnail} = req.body
    const prod = {
        id,
        title,
        price,
        thumbnail
    }
    productos.push(prod)
    res.json(prod)
    res.sendStatus(200)
})

app.get('/api/productos/:id', (req, res) => {
    const id = req.params.id
    const prod = productos.find( prod => prod.id === id)
    if (!prod){
        res.send(`{error: 'producto no encontrado'}`)
    }
    res.json(prod)
})

app.listen(8080, () => {
    console.log('escuchando en 8080')
}).on('error', console.log);