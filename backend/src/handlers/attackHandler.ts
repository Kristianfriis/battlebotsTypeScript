import { Attack } from "../models/Attack";
import { Message, MessageType } from "../models/Message";
import {Clients} from "../models/Clients"
import { Request, Response } from "express";

export class AttackHandler{  
    AttackInBattleClient(req : Request, res : Response, clients : Clients) {
        console.log("attack registered")
        console.log(req.body)
        let attack : Attack = Object.assign(new Attack(), req.body)

        clients.battleClients.forEach(bc => {
            if(bc.BattleId == attack.battleId){
                console.log("adding attack to battle: " + bc.BattleId)
                bc.addAttack(attack)

                if(bc.Attacks.length === 2){
                    let msgs : Message[] = [];
                    bc.Attacks.forEach(a => {
                        msgs.push(new Message(a.robotId + " Attack with " + a.name, MessageType.Attack, a.effect))
                    })

                    bc.sendEventsToClients(msgs)
                }
            }
        })
    
        res.status(200).send("attack registered for battle: " + attack.battleId)
    }    
}

