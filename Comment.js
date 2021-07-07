var mongoose=require("mongoose");

var Comment= new mongoose.Schema({
    author: String,
    text: String
});

module.exports= mongoose.model("Comment", Comment);  