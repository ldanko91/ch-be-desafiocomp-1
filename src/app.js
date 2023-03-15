import 'dotenv/config'
import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import homeHbs from "./routes/homeHbs.routes.js"
import realTimeProducts from "./routes/realTimeProducts.routes.js";
import liveChat from './routes/chat.routes.js';
import __dirname from "./path.js";
import { engine } from "express-handlebars";
import * as path from 'path';
import { Server } from 'socket.io';
import productManager from "./controllers/ProductManager.js";
import { getManagerMssg } from './dao/daoManager.js';

const app = express();
// const PORT = 8080;

const managerMessg = getManagerMssg()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT)
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

const server = app.listen(app.get("port", () => {
  console.log(`Server on port ${app.get("port")}`)}
));

const io = new Server(server);

io.on("connection", async (socket)=> {
  console.log("cliente conectado")

  socket.on("message", async (info) => {
    await managerMessg.addElements([info])
    const messages = await managerMessg.getElements()
    console.log(messages)
    socket.emit("allMessages", messages)
  })
  
  socket.on("addItem", async info => {
    socket.emit("mssgAddProd", await productManager.addProduct(info, []))
    socket.emit("getProds", await productManager.getProducts())
    })

  socket.on("delItem", async id => {
    socket.emit("mssgDelProd", await productManager.deleteProductById(parseInt(id)))
    socket.emit("getProds", await productManager.getProducts())
    })
  
  socket.emit("getProds", await productManager.getProducts());
    
})


app.use("/", express.static(__dirname + "/public"));

app.use("/", homeHbs);
app.use("/api/products", routerProduct);
app.use("/api/carts", routerCart);
app.use("/realtimeproducts", realTimeProducts);
app.use("/chat", liveChat);