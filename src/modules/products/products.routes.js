import express from 'express'
import {getAllProducts,updateProduct,addProduct,deleteProduct} from './products.controller.js'

export const productRoutes = express.Router()

productRoutes.use(express.json())

productRoutes.get("/product/:email",getAllProducts);

productRoutes.post("/product", addProduct);

productRoutes.delete('/product/:email', deleteProduct)

productRoutes.put('/product/:email', updateProduct)