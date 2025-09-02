import express from 'express'
import {addProduct,listProduct,removeProduct,singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const productRouter=express.Router()
//here upload.fields is used for cloudinary image uploads 
//here middle ware adminAuth gives access to admin 
productRouter.post('/add',adminAuth,upload.fields([{ name: 'image1',maxCount:1 },{ name: 'image2',maxCount:1 },{ name: 'image3',maxCount:1 },{ name: 'image4',maxCount:1 }]),addProduct)
productRouter.get('/list',listProduct)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post('/single',singleProduct)

export default productRouter
