import express from "express";
import cors from "cors";

import connection from "./database.js";
import schema from './itemSchema.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/items', async (req,res) => {
    try{
        const result = await connection.query(`SELECT * FROM items`)
        const items = result.rows

        res.send(items)
        
    } catch (error){
        console.log(error)
        res.sendStatus(500)
    }
})

app.post('/items', async (req,res) => {
    const { error } = schema.validate(req.body)
    if(error) return res.sendStatus(401)

    const { text } = req.body
    
    try {
        await connection.query(`
            INSERT INTO items (text) 
            VALUES ($1)`,[text])

        res.sendStatus(200)

    } catch (error){
        console.log(error)
        res.sendStatus(500)
    }
})
export default app;
