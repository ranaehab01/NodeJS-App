import { productModel } from "../../../db/models/product.model.js";
import { userModel } from "../../../db/models/user.model.js";

let getAllProducts = async (req, res) => {
     const foundAdmin = await userModel.findOne({email:req.params.email})
  try{
  
  if(foundAdmin && foundAdmin.role === "admin"){
 let products = await productModel.find().populate('createdBy');
  res.json({ message: "get all products" , products});
  }
  else{
    res.json({message:"you are not admin"})
  }
  }
catch(error){
    res.json({message:"Not found"},error)
  }
   
}



let deleteProduct = async(req,res)=>{
   const foundAdmin = await userModel.findOne({email:req.params.email})
try{
  if(foundAdmin && foundAdmin.role === "admin"){
const found = await productModel.findOneAndDelete({_id: req.body._id})
if(found) return(res.json({message: "product deleted successfully",found}))
  else{
res.json({message:"product is not exsit"})
}
}
else{
  res.json({message:"you are not admin"})
}
}

catch(error){
res.json({message: error})
}
}


let addProduct = async (req, res) => {
 
try{
const found = await userModel.findOne({ email: req.body.email });
  if (found) {
    const addProduct = await productModel.insertMany(req.body);
    res.json({ message: "product add successfully", addProduct });
  } 
  }
  catch(error)
 {
    res.json({ message: error });
  }
}


let updateProduct = async(req,res)=>{
const foundAdmin = await userModel.findOne({email:req.params.email})
try{

if(foundAdmin && foundAdmin.role === "admin"){
const found = await productModel.findByIdAndUpdate({_id: req.body._id},{...req.body},{new:true})

if(found) return(res.json({message: "product updated successfully",found}))
  else { res.json({message: "product not found"})}
}
else{
  res.json({message:"your are not admin"})
}
}catch(error){
     res.status(500).json({ message: error });
}

}

export{
    getAllProducts,
    updateProduct,
    addProduct,
    deleteProduct
}