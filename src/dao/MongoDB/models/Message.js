import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";

const url = process.env.URLMONGODB

const messageSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    message: String
})

export class ManagerMssgMongoDB extends ManagerMongoDB {
    constructor(){
    super(url, messages, messageSchema)
    }
}