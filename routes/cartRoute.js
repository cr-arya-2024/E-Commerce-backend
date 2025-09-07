import express from "express";  
import { addToCart, updateCart, getUserCart } from "../controllers/cartController.js";
import { user } from "../middleware/auth.js";

const cartRouter = express.Router();
cartRouter.post("/add",user, addToCart);
cartRouter.post("/update",user, updateCart);
cartRouter.post("/get",user, getUserCart);
export default cartRouter;