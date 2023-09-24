import { Router } from "express"
import { MessageManager } from "../dao/models/messagesManager.js";
const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
    const {limit} = req.query
    try {
        const message = await MessageManager.findAll(limit);
        res.status(200).send({respuesta: 'OK', mensaje: message})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }})
messageRouter.post('/', async (req, res) => {
    const {email, message} = req.body
    try {
        const respuesta = await MessageManager.create({email, message});
        res.status(200).send({respuesta: 'Mensaje enviado', mensaje: respuesta})
    } catch (error){
        res.status(400).send({respuesta: 'Mensaje no enviado', mensaje: error})
    }})

export default messageRouter;