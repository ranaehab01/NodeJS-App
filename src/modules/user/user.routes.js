 import express from "express"
 import {getAllUsers,signUp,deleteUser,updateUser,login,admin,addToCart,getCart,removeFromCart} from './user.controller.js'
import { verifyJWT } from "../../../middlewares/verifyJWT.js";

export const userRoutes = express.Router();

userRoutes.use(express.json());

 userRoutes.get("/user/:email",verifyJWT, getAllUsers);
 
 userRoutes.post("/user/signUp", signUp );
 
 userRoutes.delete('/user/:id',verifyJWT,deleteUser)
 
 userRoutes.put('/user/:email',verifyJWT,updateUser )
 
 userRoutes.post("/user/login", login);

userRoutes.post("/user/admin", admin);

userRoutes.post("/user/cart/add", addToCart);

userRoutes.get("/user/cart/:email", getCart);

userRoutes.delete('/user/cart/remove',removeFromCart)