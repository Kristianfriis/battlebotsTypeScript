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

let attackHandler : AttackHandler = new AttackHandler();
let eventHandler : EventHandler = new EventHandler();
let testHandler : TestHandler = new TestHandler();

app.get('/joinbattle/:battleid', (req, res) => {eventHandler.joinBattle(req, res, clients)})
app.post("/attack", (req, res) => {attackHandler.AttackInBattleClient(req, res, clients)})
app.get('/test', (req, res) => {testHandler.events(req, res, clients)})

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
