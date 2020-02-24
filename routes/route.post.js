// IMPORTING ROUTER
const router = require('express').Router();

// IMPORTING MODULES
const Posts = require("../models/posts.model")

// ALL POSTS
router.get("/",(req,res)=>{
    Posts.find().sort({_id:-1}) 
        .then((post)=>res.json(post))
        .catch((error)=> res.status(400).json(`Error while tring to get all postsl; Err: ${error}` ))

})

// GET POST BY ID
router.get("/:id",(req,res)=>{
    Posts.findById(req.params.id)
        .then( (post)=>{ res.status(201).json(post) } )
        .catch((e)=> res.status(400).json(`Error while tring toget post by id; Err: ${e}`) )
});

// POSTS ADD NEW
router.post('/add', (req,res)=>{
  
        const newPost = new Posts({
            title:req.body.title,
            p:req.body.p,
            auther:req.body.auther
        });
        newPost.save().
            then(()=>{res.json("Successfully addded new post")})
            .catch((e)=>res.status(400).json(`Error while tryiing to add new post; Err:${e} `))
})

// GET POST BY ID AND UPDATE IT
router.put("/update/:id",(req,res)=>{
    Posts.findById(req.params.id)
        .then((post)=>{
            post.title=req.body.title;
            post.p=req.body.p;
            post.auther=req.body.auther;
            post.upvote=req.body.upvote;
            post.downvote=req.body.downvote;
            post.categories=req.body.categories;
            post.comments=req.body.comments;
            post.save()
                .then(()=>res.status(201).json(post))
                .catch((e)=>res.status(400).json(`Error while tring to save post; Err: ${e}`))
            
        })
        .catch((e)=>{
            res.status(400).json(`Error while tring to get and update post; Err: ${e}`)
        })
})

// GET POST BY ID AND DELETE
router.delete("/delete/:id",(req,res)=>{
    Posts.findByIdAndDelete(req.params.id)
        .then(()=> res.status(201).json(`Post deleted successfully`))
        .catch((e)=>res.status(400).json(`Error while tring to delete the post`))
})
module.exports = router;