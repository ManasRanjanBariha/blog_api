const { Op } = require("sequelize");
const User = require("../models/user")
const bcrypt=require('bcrypt');
const { use } = require("../routes/auth");
const generateToken = require("../utils/generateToken");
const responseFormatter =require('../utils/responseFormatter')

const register = async(req,res)=>{
    try{
        console.log(req.body);
        
        const {username,email,password} = req.body;
        if(!username||!email||!password)
        {
            return res.status(400).json(responseFormatter(400,false,"All fields are required"));
        }
        
        const existingUser=await User.findOne({
            where:{email}
        });
        if(existingUser){
            return res.status(400).json(responseFormatter(400,false,"Account already exists"));
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            username,email,password:hashedPassword
        });
        const token = generateToken({ id: newUser.id, email: newUser.email });
        res.status(201).json(responseFormatter(201,true,"User registered successfully",{user:{
            id:newUser.id,username:newUser.username,email:newUser.email
        },token}));
    }catch(err)
    {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
        
    }
    
}

const login=async (req,res)=>{
    try {
        const {identifier,password}=req.body;
        if(!identifier || !password){
            return res.status(400).json(responseFormatter(400,false,"All fields are required"));
        }
        const user=await User.findOne({
            where:{
                [Op.or]:[{email:identifier},{username:identifier}]
            },
        })
        if(!user){
            return res.status(404).json(responseFormatter(404,false,"User not found."));
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
        {
            return res.status(401).json(responseFormatter(401,false,"Invalid credentials."));
        }
        const token=generateToken({id:user.id,email:user.email});
        return res.status(200).json(responseFormatter(200,true,"Login successful.",{user:{
            id:user.id,username:user.username,email:user.email
        },token,
    }))
    } catch (err) {
        console.error("Error during rergistration:",err);
        res.status(500).json(responseFormatter(500,false,"Internal server error."))
        
    }
}

module.exports={register,login}