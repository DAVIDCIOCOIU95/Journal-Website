const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/compose", (req, res) => {
    console.log(req.user);
    if(req.isAuthenticated())
    res.render("compose");
    else {
        res.redirect('/users/login');
    }
});

router.post("/delete", (req, res) => {
    console.log(req.user);
    
    Post.findByIdAndRemove(req.body.buttondelete, function(err) {
        if(!err) {
            console.log("Removed");
            res.redirect("/");
        }
    });
});

router.post("/compose", (req, res) => {
    console.log(req.user);
    
    const post = new Post( {
        title: req.body.title,
        body: req.body.body,
        user: req.user.username
    });

    post.save(function (err) {
        if(!err) {
            console.log('Your data has been saved!');
            res.redirect("/");
            
        } else {
            alert("There's been an error saving your data.");
            console.log('Error saving data');
        }
    });
});

router.post("/edit", (req, res) => {
    // When button edit clicked search for the id
    Post.findOne({_id: req.body.buttonEdit}, function(err, post) {
        res.render("edit", {post: post});
    });
   
});

router.post("/edit/update", (req, res) => {
   Post.findOneAndUpdate(
       {_id: req.body.postId},
       {title: req.body.title, body: req.body.body},
       function(err, found) {
        if(!err){
            res.redirect("/");
          }
       });
   
});

module.exports = router;


