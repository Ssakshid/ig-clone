const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const user = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../keys')
const requiredLogin = require("../middleware/requireLogin")



router.post('/signup',(req,res)=>{
   const {name,email,password} = req.body
   if(!email || !password || !name){
    return res.status(422).json({error:"please add all the fields"})
   }
   user.findOne({email:email})
   .then((saveduser)=>{
    if(saveduser){
        return res.status(422).json({error:"user already exists with that email"})
    }
    bcrypt.hash(password,12)
    .then(hashedpassword=>{
        const User = new user({
            email,
            password:hashedpassword,
            name
        })
        User.save()
        .then(User=>{
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    
   })
   .catch(err=>{
    console.log(err)
   })


})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    user.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
            return res.status(422).json({error:"Invalid credentials"})
        }
        bcrypt.compare(password,saveduser.password)
        .then(doMatch=>{
             if(doMatch){
            //     res.json({message:"successfully signed in"})
            const token = jwt.sign({_id:saveduser._id},JWT_SECRET)
            const{_id,name,email}=saveduser
            res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid credentials"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router