const {Schema,model} = require('mongoose');

const postSchema = new Schema({
    title:{type:String,minlength:5,required:true},
    categories:[{body:String}],
    upvote:{type:Number},
    downvote:{type:Number},
    p:{type:String,minlength:40,required:true},
    comments:[{body:String}],
    auther:{type:String,required:true}
},
{
    timestamps:true
});

module.exports = model("Posts",postSchema);