import { Response } from "express";
import {createJsonToSend} from "../utils/helpers"
import { Client } from "../models/Client"
import { Message, MessageType } from "../models/Message";

export class Clients {
    clients : Client[]

    constructor(){
        this.clients = []
    }

    addClient(response : Response){
        this.clients.push(new Client(1000, response))
    }

    sendEventsToAll(messages : Message[]) {
        this.clients.forEach(client => {
            if(client.BattleId === 1000){
                client.Response.write(createJsonToSend(messages))
            }
        })
    }
}
