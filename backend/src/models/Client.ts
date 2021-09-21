import { Response } from "express";

export class Client{
    BattleId : number;
    Response : Response;

    constructor(battleId : number, response : Response){
        this.BattleId = battleId;
        this.Response = response
    }
}