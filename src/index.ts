import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";

import Signup from "./endpoints/signup";
import Login from "./endpoints/login";
import GetUserProfile from "./endpoints/getUserProfile";
import CreateRecipe from "./endpoints/createRecipe";
import GetRecipeById from "./endpoints/getRecipe";
import GetUserById from "./endpoints/getUserById";
import GetRecipeFeed from "./endpoints/getRecipeFeed"
import Follow from "./endpoints/follow";
import UnFollow from "./endpoints/unfollow";
import RecipeDataBase from "./data/RecipeDataBase";



dotenv.config();
const app = express();
app.use(express.json());

app.post("/user/signup", Signup);
app.post("/user/login", Login);
app.get("/user/profile", GetUserProfile);

app.get("/user/:id", GetUserById);

app.post("/user/follow", Follow);
app.post("/user/unfollow", UnFollow);

app.post("/recipe", CreateRecipe);
app.get("/recipe/:id", GetRecipeById);
app.get("/user/feed", GetRecipeFeed )


const server = app.listen(process.env.PORT || 3306, () => {
  	if (server) {
  	  const address = server.address() as AddressInfo;
  	  console.log(`Server is running in http://localhost:${address.port}`);
  	} else {
  	  console.error(`Failure upon starting server.`);
  	}
});
