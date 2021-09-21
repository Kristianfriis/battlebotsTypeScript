import express from "express";
import { Attack } from "./models/Attack";
import { Client } from "./models/Client"

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));



let clients : Client[] = []

app.get("/", (req, res) => {
    res.json("hello there")
})

app.post("/attack", (req, res) => {
    // console.log(req.body)
    // let attckBody = JSON.parse(req.body)

    let attack : Attack = Object.assign(new Attack(), req.body)
    attack.Check()
})

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
