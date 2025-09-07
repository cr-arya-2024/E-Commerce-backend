import express from "express";
import { COD} from '../controllers/orderController.js'
const router = express.Router();
router.post("/place", COD);