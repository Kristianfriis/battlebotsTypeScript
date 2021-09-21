import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.json("hello there")
})

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});