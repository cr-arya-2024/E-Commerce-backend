import userModel from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const creatToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// Route for user login
const loginUser=async(req,res)=>{
try {
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){return res.json({success:false,message:"user does not exist"})}
    //comparing the password  database and entered detail
    const matchPassword=await bcrypt.compare(password,user.password)
    if(matchPassword){
        const token=creatToken(user._id)
     res.json({success:true,token})
    }else{
         res.json({success:false,message:"check the password once"})
    }
} catch (error) {
    res.json({success:false,message:error.message})
    console.log(error);
    
}
}

//route for user registeration
const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const exist=await userModel.findOne({email})
        if(exist){
            return res.json({success:false,message:"User already exists"})
        }
        if(!validator.isEmail(email)){return res.json({success:false,message:"Plz enter a vaild email"})}
        if(password.lenght<  8){return res.json({success:false,message:"Plz enter a strong password"})}
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)

const newUser=new userModel({name,email,password:hashedPassword})
const user=await newUser.save()
const token=creatToken(user._id)
res.json({success:"true",token})
    } catch (error) {
       console.log(error);
       res.json({success:false,message:error.message})
        
    }
}
//route for admin login
const adminLogin=async(req,res)=>{

}
export {loginUser,registerUser,adminLogin}