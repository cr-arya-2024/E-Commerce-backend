import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

const app=express()
const port=process.env.PORT || 8000
connectDB()
connectCloudinary()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("API WORKING")
})


app.listen(port,()=>{
    console.log(`server is running on ${port} `);
})
