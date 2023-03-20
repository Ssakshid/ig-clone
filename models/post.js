const mongoose = require("mongoose")
var Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"no photo"
    },
    postedBy:{
         type:ObjectId,
         ref:"user"
    }
})

mongoose.model("Post",postSchema)