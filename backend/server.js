require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 7000

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// mongoose.connection.once("open", ()=>{
//     console.log("Connected to database");
//     app.listen(PORT, ()=>{
//         console.log("Server is running on port "+PORT);
//     })
    
// })

app.get("/", (req, res)=>{
    res.send('test')
})

app.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
})
