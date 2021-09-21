import express from "express";
import { Attack } from "./models/Attack";
import { Client } from "./models/Client"

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));



let clients : Client[] = []

clients.push(new Client(1000, null))

app.get("/", (req, res) => {
    res.json("hello there")
})

app.post("/attack", (req, res) => {
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
        }
    })

})

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
