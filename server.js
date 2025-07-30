const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./frontend/backend/routes/auth')
const dashBoard = require('./frontend/backend/routes/dashboard')
const path = require('path')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/dashboard',dashBoard)
app.use(express.static(path.join(__dirname,'..')))

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'..','index.html'))
})

const mongUri = process.env.MONGO_URL

if(!mongUri){
    console.error('mongo url not found')
    // process.exit(1)
}


mongoose.connect(mongUri)
.then(()=> console.log('MongoDB connection established'))
.catch((err)=> console.error('MongoDB connection error:', err))

const PORT = process.env.PORT 

app.listen(PORT , ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})