const express = require('express')
const mongoose = require('mongoose')
const router = require('./router/router.js')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json());

mongoose.connect("mongodb+srv://ashi:123ban@cluster0.o7ipcjf.mongodb.net/JobSeeker").then(()=>console.log("connection to db successfully")).catch((e)=>console.log(e))

app.use(router)

app.listen(8000,()=>{
	console.log("Server is connected")
})
