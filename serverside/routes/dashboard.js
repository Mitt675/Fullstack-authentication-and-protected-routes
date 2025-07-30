const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifytoken')

router.get('/dashboard', verifyToken , (req,res)=>{
    res.status(200).json({
        success : true,
        message : 'welcome to the protected dashboard route',
        userId : req.user._id
    })
})

module.exports = router