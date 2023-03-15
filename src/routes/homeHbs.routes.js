import { Router } from "express";
import productManager from "../controllers/ProductManager.js";

const homeHbs = Router()

homeHbs.get('/', async (req,res)=>{
    const productos = await productManager.getProducts()
  
    res.render("home",{
      titulo: "Productos en stock",
      productos 
    })
  })

export default homeHbs