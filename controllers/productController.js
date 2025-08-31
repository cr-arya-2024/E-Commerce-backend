import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
//function for add product

const addProduct=async(req,res)=>{
    try {
        const {name,description,price,category,subCategory,sizes,bestseller}=req.body
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)

        console.log(name,description,price,category,subCategory,sizes,bestseller);
      
        //this part explains about url created by cloudinary to store in cloudinary
        let imagesUrl=await Promise.all(
            images.map(async(image)=>{
                // Upload image to cloudinary
                const result=await cloudinary.uploader.upload(image.path,{
                    resource_type:"image"
                }) 
                return result.secure_url
            })
        )
        console.log(imagesUrl);
        const productData={
            name,
            description,
            price:parseInt(price),
            category,
            subCategory,
            sizes:sizes.split(','),
            bestseller:bestseller==="true"?true:false,
            image:imagesUrl,
            date:Date.now()//this part is neccesary 
        }
        console.log(productData);
        const product=new productModel(productData)
        await product.save()
console.log(product);

        res.json({success:true,message:"Product added successfully"})
        
        
    } catch (error) {
        console.log(error);
        
        res.json({success:false,message:error.message})
    }

}
const listProduct=async(req,res)=>{

}
const removeProduct=async(req,res)=>{

}
const singleProduct=async(req,res)=>{

}
export  {addProduct,listProduct,removeProduct,singleProduct}