const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/signup',async (req,res)=>{
    const {username, email, password} = req.body
    try{
        const existingUser = await User.findOne({email})
        if(existingUser)
          return res.status(400).json({success : false ,message:'user already exists '})
        const hashedPwd = await bcrypt.hash(password,10)
        const newUser = new User({username,email,password:hashedPwd})
        await newUser.save()

        const token = jwt.sign({userid:newUser._id},JWT_SECRET,{expiresIn : '1h'})
        res.status(201).json({success : true,token})
    }
    catch(err){
        console.error(err)
    res.status(500).json({success:false, message:'internal server error'})
    }
    
})

module.exports = router

router.post('/login',async (req,res)=>{
    const {email,password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:'user does not exist'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({success:false, message:'invalid credintials '})
        }
        const token = jwt.sign({userid : user._id},JWT_SECRET,{expiresIn:'1h'})
        return res.status(200).json({success:true , token})
    }
    catch(err){
        console.error(err)
        res.status(500).json({err:'internal server error'})
    }
})