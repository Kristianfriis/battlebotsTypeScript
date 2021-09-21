import express, { Request, Response } from "express";
const cors = require('cors');
import { Attack } from "./models/Attack";
import { Client } from "./models/Client"
import { Message, MessageType } from "./models/Message";

const app = express();
const port = 8080;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));



let clients : Client[] = []

app.get("/", (req, res) => {
    res.json("hello there")
})

app.get('/events/:battleid', eventsHandler)
app.post("/attack", attack)

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});



function eventsHandler(request : Request, response : Response) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    }
    response.writeHead(200, headers)

    const clientId = parseInt(request.params.battleid);

    clients.push(new Client(1000, response))

    request.on('close', () => {
        console.log(`${clientId} Connection Closed`)
        clients = clients.filter(c => c.BattleId !== clientId)
    })
}

function createJsonToSend(input : any) : string {
    return `data: ${JSON.stringify(input)}\n\n`
}

function attack(req : Request, res : Response) {
    console.log("attack registered" + req.body)
    console.log(req.body)
    let attack : Attack = Object.assign(new Attack(), req.body)
    
    clients.forEach(c => {
        if(c.BattleId == attack.battleId){
            console.log("adding attack to battle: " + c.BattleId)
            c.AddAttack(attack)

            if(c.Attacks.length === 2){
                console.log(c.Attacks)
            }
            var messages : Message[] = [new Message("hi there", MessageType.Message, 0),new Message("hi there agian", MessageType.Message, 0)]
            sendEventsToAll(messages)
        }
    })

}

function sendEventsToAll(messages : Message[]) {
    clients.forEach(client => {
        if(client.BattleId === 1000){
            client.Response.write(createJsonToSend(messages))
        }
    })
}
