import express, { Request, Response } from "express";
const cors = require('cors');
import { AttackHandler } from "./handlers/attackHandler";
import { EventHandler } from "./handlers/eventHandler";
import { TestHandler } from "./handlers/testHandler";
import {Clients } from "./models/Clients";

const app = express();
const port = 8080;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let clients : Clients = new Clients()

let attackHandler : AttackHandler = new AttackHandler(clients);
let eventHandler : EventHandler = new EventHandler(clients);
let testHandler : TestHandler = new TestHandler(clients);

app.get("/", (req, res) => {
    res.json("hello there")
})

app.get('/events/:battleid', eventHandler.events)
app.post("/attack", attackHandler.Attack)
app.get('/test', testHandler.events.bind(testHandler.events))

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
