import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3030;

interface Producto {
  title: string
  price: number
  thumbnail: string
  id: number
}

let datos = fs.readFileSync('./BBDD/productos.txt', 'utf-8')

let visRandom = 0

let visItem = 0

const productos: Producto = JSON.parse(datos)

const getItems = (productos: Producto) => {
  visItem ++
  if (productos instanceof Array){
    let items = productos.map((producto) => producto.title)
    let resp = `{ items: ${JSON.stringify(items)}, cantidad: ${items.length} }`
    return resp
  }
}

const getItemRandom = (productos: Producto) => {
  visRandom ++
  if (productos instanceof Array) {
    let itemNum = Math.floor(Math.random() * (productos.length - 1)) + 1
    let item = productos[itemNum]['title']
    let resp = `{ item: {${item}} }`
    return resp
  }
}

const getVisitas = () => {
    let resp = `{ visitas : { items: ${visItem}, item: ${visRandom} } }`
    return resp
}


app.get('/', (req, res) => res.send('Express + TypeScript Servidor Joya'));
app.get('/items', (req, res) => res.send(getItems(productos)));
app.get('/item-random', (req, res) => res.send(getItemRandom(productos)));
app.get('/visitas', (req, res) => res.send(getVisitas()));




app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});