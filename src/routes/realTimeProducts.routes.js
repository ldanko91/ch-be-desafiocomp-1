import { Router } from "express";
import productManager from "../controllers/ProductManager.js";
const realTimeProducts = Router()

realTimeProducts.get('/', async (req,res)=>{
    let products = await productManager.getProducts();
    res.render("realtimeproducts", {
        titulo: "Productos en tiempo real",
        products
      })
  })


export default realTimeProducts