import express from "express";
import dbconnection from "./db/dbconnection.js";
import {userRoutes} from './src/modules/user/user.routes.js'
import { productRoutes } from "./src/modules/products/products.routes.js";

const app = express();

dbconnection

app.use(userRoutes)
 app.use(productRoutes)





app.listen(3000, () => {
  console.log("server is running");
});
