const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 8000;

// middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ckoi6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db("todo_app").collection("todolist");


        // POST API 
        app.post("/todolist", async (req, res) => {
            const todolist = req.body;
            const result = await todoCollection.insertOne(todolist);
            res.send(result);
        });

        // GET API 
        app.get('/todolist', async (req, res) => {
            const query = req.query;
            const cursor = todoCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // GET API 
        app.delete('/todolist/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await todoCollection.deleteOne(query);
            res.send(result);
        })


    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello From todoapp')
});

app.listen(port, () => {
    console.log(`ToDo App is running on PORT ${port}`)
});
