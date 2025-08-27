import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'

const app=express()
const port=process.env.PORT || 8000
connectDB()
app.listen(port,()=>{
    console.log('server is running on 8000');
})
