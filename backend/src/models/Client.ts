import { Response } from "express";
import { Attack } from "./Attack";

export class Client{
    BattleId : number;
    Response : Response;
    Attacks : Attack[] = []

    constructor(battleId : number, response : Response){
        this.BattleId = battleId;
        this.Response = response
    }

    AddAttack(att : Attack){
        this.Attacks.push(att)
    }
}