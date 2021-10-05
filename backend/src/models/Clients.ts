import { Response } from "express";
import { Client } from "../models/Client"
import { BattleClient } from "./BattleClient";

export class Clients {
    clients : Client[]
    battleClients : BattleClient[] = []

    constructor(){
        this.clients = []
    }

    addBattleClient(battleId : number, res: Response){
        let bClient = undefined;

        if(this.battleClients.length !== 0){
            bClient = this.battleClients.find(x => x.BattleId === battleId)
        }

        if(bClient == undefined){
            console.log("no battle declared with battleId: " + battleId)
            
            var newBClient = new BattleClient(battleId)
            newBClient.addClient(battleId, res)
            console.log("created new battle for battleId: " + battleId + " and added client")

            this.battleClients.push(newBClient)
            console.log("added battleClient to battle: " + battleId)
            console.log(newBClient)
        } else {
            bClient.addClient(battleId, res)
            console.log("added client to battleId: " + battleId)
        }
    }
}
