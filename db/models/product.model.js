import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  quantity:Number,
  image:String,
 createdBy:{
type: mongoose.Types.ObjectId,
ref:'userModel'
 }

 },{ versionKey:false
 });

export const productModel =mongoose.model("Products",productSchema)