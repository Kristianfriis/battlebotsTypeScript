import { Request, Response } from "express";
import {Clients} from "../models/Clients"


export class TestHandler {
    C : Clients

    constructor(c : Clients){
        this.C = c;
        console.log(this.C)
    }
    events(request : Request, response : Response) {    
    
        const clientId = parseInt(request.params.battleid);
        console.log(this.C)
        this.C.addClient(response)

        response.send("added client")
    }
}
