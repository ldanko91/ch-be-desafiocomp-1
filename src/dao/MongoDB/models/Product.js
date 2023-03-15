import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";

const url = process.env.URLMONGODB

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    status: true,
    category: String,
    thumbnail:String
})

export class ManagerProdMongoDB extends ManagerMongoDB {
    constructor () { 
    super(url, product, productSchema)
    }
}