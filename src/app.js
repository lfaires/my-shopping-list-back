import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/items', async (req,res) => {
    const result = await connection.query(`SELECT * FROM items`)
    const items = result.rows

    res.send(items)
})
export default app;
