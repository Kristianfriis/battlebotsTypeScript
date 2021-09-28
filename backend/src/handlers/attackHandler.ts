import { Attack } from "../models/Attack";
import { Message, MessageType } from "../models/Message";
import {Clients} from "../models/Clients"
import { Request, Response } from "express";

export class AttackHandler{
    clients : Clients

    constructor(c : Clients){
        this.clients = c;
    }

    Attack(req : Request, res : Response) {
        console.log("attack registered" + req.body)
        console.log(req.body)
        let attack : Attack = Object.assign(new Attack(), req.body)
        
        this.clients.clients.forEach(c => {
            if(c.BattleId == attack.battleId){
                console.log("adding attack to battle: " + c.BattleId)
                c.AddAttack(attack)
    
                if(c.Attacks.length === 2){
                    console.log(c.Attacks)
                }
                var messages : Message[] = [new Message("hi there", MessageType.Message, 0),new Message("hi there agian", MessageType.Message, 0)]
                this.clients.sendEventsToAll(messages)
            }
        })
    }    
    Test(req : Request, res : Response){
        res.send("HIT")
    }
}

