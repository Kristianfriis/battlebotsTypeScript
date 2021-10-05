import { Attack } from "../models/Attack";
import { Message, MessageType } from "../models/Message";
import {Clients} from "../models/Clients"
import { Request, Response } from "express";

export class AttackHandler{
    Attack(req : Request, res : Response, clients : Clients) {
        console.log("attack registered")
        console.log(req.body)
        let attack : Attack = Object.assign(new Attack(), req.body)
        
        clients.clients.forEach(c => {
            if(c.BattleId == attack.battleId){
                console.log("adding attack to battle: " + c.BattleId)
                c.AddAttack(attack)
    
                if(c.Attacks.length === 2){
                    console.log(c.Attacks)
                }
                var messages : Message[] = [new Message("hi there", MessageType.Message, 0),new Message("hi there agian", MessageType.Message, 0)]
                clients.sendEventsToAll(messages, attack.battleId)
            }
        })

        res.status(200).send("attack registered for battle: " + attack.battleId)
    }    
    AttackInBattleClient(req : Request, res : Response, clients : Clients) {
        console.log("attack registered")
        console.log(req.body)
        let attack : Attack = Object.assign(new Attack(), req.body)
        console.log(clients)
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

