import express from 'express'
import { createProduct, deletePost, updateProduct, allProducts, product } from '../controllers/product.controller.js';

const router = express.Router()

router.post("/create", createProduct)
router.delete("/delete/:id", deletePost)
router.put("/update/:id", updateProduct)
router.get("/", allProducts)
router.get("/:id", product)

export default router;