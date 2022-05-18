const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 8000;

// pass: y947QvKf2af3D7B
// user: Rasel 

// middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello From todoapp')
});

app.listen(port, () => {
    console.log(`ToDo App is running on PORT ${port}`)
});
