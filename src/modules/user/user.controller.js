import { userModel } from "../../../db/models/user.model.js";
import { productModel } from "../../../db/models/product.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let getAllUsers = async (req, res) => {
  try {
    const foundUser = await userModel.findOne({ email: req.params.email });
    if (foundUser && foundUser.role === "admin") {
      const users = await userModel.find();
      res.json({ message: "all users", users });
    } else {
       return res.json({ message: "User data", user: foundUser });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

let signUp = async (req, res) => {
  const found = await userModel.findOne({ email: req.body.email });
  if (found) {
    return res.json({ message: "user already exsit" });
  } else {
    const hashed = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashed;
    const addUser = await userModel.insertMany(req.body);
    res.json({ message: "user add successfully", addUser });
  }
};

let deleteUser = async (req, res) => {
  try {
    const foundAdmin = await userModel.findOne({ email: req.body.email });
    if (foundAdmin && foundAdmin.role === "admin") {
      const found = await userModel.findByIdAndDelete({ _id: req.params.id });
      if (found)
        return res.json({ message: "user deleted successfully", found });
    } else {
      res.json({ message: "your are not an admin" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

let updateUser = async (req, res) => {
  try {
    const foundAdmin = await userModel.findOne({ email: req.params.email });
    if (foundAdmin && foundAdmin.role === "admin") {
      const found = await userModel.findByIdAndUpdate(
        { _id: req.body._id },
        { ...req.body },
        { new: true }
      );
      if (found)
        return res.json({ message: "user updated successfully", found });
    } else {
     const updatedUser = await userModel.findByIdAndUpdate(
        req.body._id,
        { ...req.body },
        { new: true }
      );
      return res.json({ message: "Your profile was updated", user: updatedUser });
    }
  } catch (error) {
    res.json({ message: error });
  }
};



let login = async (req, res) => {
  const found = await userModel.findOne({ email: req.body.email });
  const JWT_SECRET = 'user';
  try {
    if (!found) {
      return res.json({ message: "user not exist" });
    } else {
      const foundPass = await bcrypt.compare(req.body.password, found.password);
      if (!foundPass) return res.json({ message: "user not exist" });
      
      const token = jwt.sign(
        {
          userId: found._id,
          email: found.email,
          role: found.role,
        },
        JWT_SECRET,
        { expiresIn: '1h' } 
      );

      res.json({message: "Welcome", token, 
        user: {
          email: found.email,
          role: found.role,
          username: found.username, 
        },
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};



let admin = async (req, res) => {
  const found = await userModel.findOne({ email: req.body.email });

  if (!found) {
    return res.json({ message: "user not exsit" });
  } else {
    const foundPass = await bcrypt.compare(req.body.password, found.password);

    if (!foundPass) return res.json({ message: "user not exsit" });
    res.json({ message: "welcome admin" });
  }
};

//=============================================

const addToCart = async (req, res) => {
  const isValidUser = await userModel.findOne({ email: req.body.email });
  const isValidProduct = await productModel.findOne({ _id: req.body._id });
  try {
    if (isValidProduct) {
      if (isValidUser && isValidUser.role === "user") {
        const existingItem = isValidUser.cart.find(
          (item) => item.product.toString() === req.body._id
        );

        if (existingItem) {
          existingItem.quantity += Number(req.body.quantity);
        } else {
          isValidUser.cart.push({
            product: req.body._id,
            quantity: req.body.quantity,
          });
        }
        await isValidUser.save();

        return res
          .status(200)
          .json({ message: "Product added to cart", cart: isValidUser.cart });
      } else {
        res.json({ message: "you are not user" });
      }
    } else return res.json({ Message: " product is invalid" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

const getCart = async (req, res) => {
  const foundUser = await userModel.findOne({ email: req.params.email });

  try {
    if (foundUser && foundUser.role === "user") {
      const userCart = foundUser.cart;
      res.json({ message: "userCart: ", userCart });
    } else {
      res.json({ message: "you are not user" });
    }
  } catch (error) {
    res.json({ message: "error fetching", error });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const foundUser = await userModel.findOne({ email: req.body.email });

    if (foundUser && foundUser.role === "user") {
      foundUser.cart = foundUser.cart.filter(
        (item) => item.product.toString() !== req.body._id
      );
      await foundUser.save();

      res.json({ message: "cart edited", cart: foundUser.cart });
    } else return res.json({ message: "your are not user" });
  } catch (error) {
    res.json({ message: "error catched" }, error);
  }
};

export {
  getAllUsers,
  signUp,
  deleteUser,
  updateUser,
  login,
  admin,
  addToCart,
  getCart,
  removeFromCart,
};
