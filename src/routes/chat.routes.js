import { Router } from "express";
import { getManagerMssg } from "../dao/daoManager.js";
const liveChat = Router()


liveChat.get('/', async (req,res)=>{
    res.render("chat", {
        titulo: "Chat en tiempo real",
        
      })
  })


export default liveChat