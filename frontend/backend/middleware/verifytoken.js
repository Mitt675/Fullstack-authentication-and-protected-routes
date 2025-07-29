const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req,res,next) =>{
    try{
        const authheader = req.headers('Autorization')

        if(!authheader){
            return res.status(401).json({sucess : false , message : 'authentication failed'})
        }
        const token = authheader.split(' ')[1]
        const decoded = jwt.verify(token , JWT_SECRET)
        req.user = decoded
        next()
    }
    catch (err){
        return res.status(401).json({sucess: false , message :'authentication failed'})
    }
}

module.exports = verifyToken