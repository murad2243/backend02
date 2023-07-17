const express = require("express")
const User = require("../Models/User")
const postRoute = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const Post = require("../Models/post");

postRoute.post("/",authMiddleware, async(req,res)=>{

    try {
        const post = await Post.create({...req.body,creator:req.userName})

        res.status(200).send(post)
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }

})
postRoute.get("/",authMiddleware, async(req,res)=>{

    try {
        const query = req.query.device
        console.log(query);
        // console.log(req.userId);
        const user = req.userName
        console.log(user);
        const post = await Post.find({creator:user})
        if(query){
            const data = post.filter((el)=> el.device === query)
            res.status(200).send(data)
        }
        else{
            res.status(200).send(post)

        }

        
    } catch (error) {
        console.log(error);
        res.send(error)
    }

})

postRoute.delete("/delete/:postId",authMiddleware, async(req,res)=>{
    try {
        const {postId}= req.params
        const post = await Post.findByIdAndDelete({_id:postId})
        if(!post){
            res.status(400).send("post not fount")
        }
        else{
            res.status(200).send({msg:"Deleted",post})
        }
        
    } catch (error) {
        
    }

})
// postRoute("/update")
module.exports= postRoute