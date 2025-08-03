import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
  email: String,
  password: String,
    role:{
        type:String,
        enum: ['admin','user'],
        default:"user"
    },

    isConfirmed:{
        type: Boolean,
        default: false
    }
 
,cart: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Products',
      },
      quantity: {
        type: Number,
        
      }
    }
  ]},
  {
    timestamps:true, 
    versionKey:false 
});

export const userModel = mongoose.model("User", userSchema);
