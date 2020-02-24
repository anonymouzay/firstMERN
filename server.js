const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require('config');

// ROUTES

const postRoutes = require('./routes/route.post');

const app = express();

const PORT = config.get('port');
const DBURI = config.get('mongoUri');

app.use(cors());
app.use(express.json());

const start= async ()=>{
    try{
        await mongoose.connect(DBURI,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("Connection with Atlas established"))
    }
    catch(e){
        console.log("ERROR : "+e)
    }
}

start();

app.use("/post",postRoutes);

app.listen(PORT,()=>console.log(` Server started on port : ${PORT}`))