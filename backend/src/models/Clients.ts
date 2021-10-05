import { Response } from "express";
import {createJsonToSend} from "../utils/helpers"
import { Client } from "../models/Client"
import { Message, MessageType } from "../models/Message";
import { BattleClient } from "./BattleClient";

export class Clients {
    clients : Client[]
    battleClients : BattleClient[] = []

    constructor(){
        this.clients = []
    }

    addClient(response : Response){
        this.clients.push(new Client(1000, response))
    }

    addBattleClient(battleId : number, res: Response){
        console.log(this.battleClients)
        let bClient = undefined;

        if(this.battleClients.length !== 0){
            bClient = this.battleClients.find(x => x.BattleId === battleId)
        }

        if(bClient == undefined){
            var newBClient = new BattleClient(battleId)
            newBClient.addClient(battleId, res)
            this.battleClients.push(newBClient)
        } else {
            bClient.addClient(battleId, res)
        }
    }

    sendEventsToAll(messages : Message[], battleId : number) {
        this.clients.forEach(client => {
            if(client.BattleId === battleId){
                client.Response.write(createJsonToSend(messages))
            }
        })
    }

    sendEventsToBattle(messages : Message[], battleId : number){
        
    }
}
