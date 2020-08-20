import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import Signup from './endpoints/signup';
import Login from './endpoints/login';
import GetUserProfile from './endpoints/getUserProfile'
import CreateRecipe from './endpoints/createRecipe'
dotenv.config();
const app = express();
app.use(express.json());

app.post("/user/signup",Signup)
app.post("/user/login", Login)
app.get("/user/profile", GetUserProfile)

app.post("/recipe", CreateRecipe)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
