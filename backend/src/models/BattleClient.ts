import { Attack } from "./Attack";
import { Client } from "./Client";
import { Message } from "./Message";
import {createJsonToSend} from "../utils/helpers"
import { Response } from "express";

export class BattleClient {
    BattleId : number;
    Clients : Client[] = [];
    Attacks : Attack[] = [];

    constructor(battleId : number){
        this.BattleId = battleId;
    }

    addClient(battleId : number, res: Response){
        this.Clients.push(new Client(battleId, res))
    }

    addAttack(a : Attack){
        this.Attacks.push(a)
    }
    sendEventsToClients(messages : Message[]) {
        this.Clients.forEach(client => {
                client.Response.write(createJsonToSend(messages))
            })
    }
}

