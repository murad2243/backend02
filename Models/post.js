const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: {type:String,require:true},
    body: {type:String,require:true},
    device: {type:String,require:true},
    creator:{type:String,require:true}
   
})

const Post = mongoose.model("post",postSchema)

module.exports = Post