const express = require("express")
const app =  express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const cors = require("cors")


dotenv.config()
app.use(express.json())
app.use(cors()) 
app.use('/',userRoute)
mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("datbase connected"))

app.listen(4000,()=>console.log("port connected"))