import { Request, Response } from "express";
import {Clients} from "../models/Clients"


export class EventHandler {
    events(request : Request, response : Response, clients : Clients) {
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        }
        response.writeHead(200, headers)
    
        const clientId = parseInt(request.params.battleid);
    
        clients.addClient(response)
    
        request.on('close', () => {
            console.log(`${clientId} Connection Closed`)
            clients.clients = clients.clients.filter(c => c.BattleId !== clientId)
        })
    }

    joinBattle(request : Request, response : Response, clients : Clients){
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        }
        response.writeHead(200, headers)
    
        const battleid = parseInt(request.params.battleid);
    
        clients.addBattleClient(battleid, response)
    
        request.on('close', () => {
            console.log(`${battleid} Connection Closed`)
            clients.clients = clients.clients.filter(c => c.BattleId !== battleid)
        })
    }
}
