import { Request, Response } from "express";
import {Clients} from "../models/Clients"


export class TestHandler {
    events(request : Request, response : Response, C : Clients) {    
    
        const clientId = parseInt(request.params.battleid);
        console.log(C)
        C.addClient(response)

        response.send("added client")
    }
}
