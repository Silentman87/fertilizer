const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./routes/useroute')
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    console.log('connnected: ')
 })
 .catch(()=>{
     console.log('not connected: ')
 })

 app.use('/',userRoutes);

 const port = process.env.PORT || 5000
 app.listen(port,()=>{
    console.log(`server is running at ${port}`)
 });