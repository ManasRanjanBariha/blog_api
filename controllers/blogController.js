const { Op, where } = require("sequelize");
const {User,Blog,Comment,Reply} = require("../models/")
const bcrypt=require('bcrypt');
const { use } = require("../routes/auth");
const generateToken = require("../utils/generateToken");
const responseFormatter =require('../utils/responseFormatter')

const createBlog=async(req,res) => {
    try {
        const {title,content}=req.body;
        const {id}=req.user;
        if(!title || !content){
            res.status(400).json(responseFormatter(400,false,"Missing required fields"));
        }
        
        const newBlog=await Blog.create({
            title,content,author_id:id,
        })
        res.status(200).json(responseFormatter(201,true,"Blog created successfully"));
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
}
const getAllBlogs=async(req,res) => {
    try {
        const allblogs=await Blog.findAll();
        res.status(200).json(responseFormatter(200,true,"Blog retrived Successfully",{blogs:allblogs}))
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
}

const getBlog=async(req,res) => {
    try {
       const {id}=req.params;
       console.log(id);

       const blog=await Blog.findByPk(id);
       if(!blog)
       {
        return res.status(404).json(responseFormatter(404,false,"Blog not found."));
       }
       const comments=await Comment.findAll(
       { where:{blog_id:id}}
       )
       const commentWithReplies=await Promise.all(comments.map(async(comment)=>{
        const replies=await Reply.findAll({
            where:{comment_id:comment.id}
        })
        return {
            comment,replies
        }
       }))

       res.status(200).json(responseFormatter(200,true,"Blog retrived Successfully",{blog,comments:commentWithReplies}))
        
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
}
const editBlog=async(req,res) => {
    try {
        const {id}=req.params;
        const{title,content}=req.body;
        if(!title|| !content){
            return res.status(400).json(responseFormatter(400,false,"Title and Content are required"));
        }
        const blog=await Blog.findByPk(id);
        if(!blog){
            return res.status(404).json(responseFormatter(404,false,"Blog not found"));
        }
        blog.title=title;
        blog.content=content;
        await blog.save();
        return res.status(200).json(responseFormatter(200,true,"Blog Updated Successfully"));
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
}
const deleteBlog=async(req,res) => {
    try {
        const {id}=req.params;
        const blog=await Blog.findByPk(id);
        if(!blog)
        {
            res.status(404).json(responseFormatter(404,false,"Blog not found"));
        }
        await blog.destroy();
        res.status(200).json(responseFormatter(200,true,"Blog deleted successfully"));
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
}
const getAllCommentOfBlog=async (req,res)=>{
    try {
        const {id}=req.params;
        const blog=await Blog.findByPk(id);
        if(!blog)
        {
            res.status(404).json(responseFormatter(404,false,"Blog not found"));
        }
        const comment=await Comment.findAll({
            where:{blog_id:id}
        });

        res.status(200).json(responseFormatter(201,true,"comment retrived successfully",{comment}));

        
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
    
  

}
const getComment=async (req,res)=>{
    try {
        const {id,comment_id}=req.params;
        const blog=await Blog.findByPk(id);
        // const {comment}=req.body;
        if(!blog)
        {
            res.status(404).json(responseFormatter(404,false,"Blog not found"));
        }
        const comment=await Comment.findByPk(comment_id);

        res.status(200).json(responseFormatter(201,true,"comment retrived successfully",{comment}));

        
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
}
const createComment=async (req,res)=>{
    try {
        const {id}=req.params;
        const userid=req.user.id;
        const {comment}=req.body;
        if(!comment){
            res.status(400).json(responseFormatter(400,false,"Comment is required"));
        }
        const blog=await Blog.findByPk(id);
        if(!blog)
        {
            res.status(404).json(responseFormatter(404,false,"Blog not found"));
        }
        const newComment=await Comment.create({
            user_id:userid,
            comment,
            blog_id:id
        });
        
        res.status(201).json(responseFormatter(201,true,"comment created successfully",{comment:newComment}));
        
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
}
const editComment=async (req,res)=>{
    try {
        const {id,comment_id}=req.params;
        const blog=await Blog.findByPk(id);
        const {comment}=req.body;
        if(!blog)
        {
            res.status(404).json(responseFormatter(404,false,"Blog not found"));
        }
        const oldComment=await Comment.findByPk(comment_id);
        oldComment.comment=comment;
        await oldComment.save();
        res.status(201).json(responseFormatter(201,true,"comment Updated successfully",{comment:oldComment}));
        
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
}
const deleteComment=async (req,res)=>{
    try {
        const {id,comment_id}=req.params;
        const blog=await Blog.findByPk(id);
        
        if(!blog)
        {
            res.status(404).json(responseFormatter(404,false,"Blog not found"));
        }
        const oldComment=await Comment.findByPk(comment_id);
       
        await oldComment.save();
        res.status(201).json(responseFormatter(201,true,"comment deleted successfully"));
        
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
    }
}

module.exports={
    createBlog,getBlog,getAllBlogs,editBlog,deleteBlog,createComment,editComment,getComment,
    getAllCommentOfBlog,deleteComment
}