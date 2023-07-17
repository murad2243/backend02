const express = require("express")
const User = require("../Models/User")
const Router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

Router.post("/register", async (req,res)=>{

    try {
        const {name,email,gender,password} = req.body
        
        const newPassword = await bcrypt.hash(password,5)

        const user = await User.create({name,email,gender,password: newPassword})
        console.log(user);

        res.status(200).send(user)

    } catch (error) {
        console.log(error);
    }



})

Router.post("/login",async(req,res)=>{
    
    try {
        const {email,password}= req.body;
        const user = await User.findOne({email})
        if(!user){
            res.send("User not fount")
        }
console.log(user,user.password);
        const verify = await bcrypt.compare(password,user.password)
        console.log(verify);
        if(!verify){
            res.status(400).send("Wrong Credentials")

        }
        else{
            const token = await jwt.sign({userName: user.name},"key")
            console.log(verify);
            res.status(200).send({msg:"Login successful", token})
        }
        
    } catch (error) {
        console.log(error);
    }
})
Router.get("/login",(req,res)=>{
    res.send("check")
})



module.exports = Router