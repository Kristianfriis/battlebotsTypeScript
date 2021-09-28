import { Request, Response } from "express";
import {Clients} from "../models/Clients"


export class EventHandler {
    clients : Clients

    constructor(c : Clients){
        this.clients = c;
    }
    events(request : Request, response : Response) {
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        }
        response.writeHead(200, headers)
    
        const clientId = parseInt(request.params.battleid);
    
        this.clients.addClient(response)
    
        request.on('close', () => {
            console.log(`${clientId} Connection Closed`)
            this.clients.clients = this.clients.clients.filter(c => c.BattleId !== clientId)
        })
    }
}
