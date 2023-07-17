const express = require("express")
const app = express()
require('dotenv').config()
const Router = require("./Routes/register")
const mongoose = require("mongoose")
app.use(express.json())
const postRoute = require("./Routes/postRoute")




app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/users",Router)
app.use("/posts",postRoute)



app.listen(8080,async()=>{

    await mongoose.connect(process.env.base_link)
    console.log('conneted');

})