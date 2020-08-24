import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";

export default async function Login (req: Request, res: Response){
    try {
  
      if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }
      
      const userData = {
        email: req.body.email,
        password: req.body.password,
      };
     
      const userDatabase = new UserDatabase();
      const user = await userDatabase.getUserByEmail(userData.email);
      
      const isPasswordCorrect = await new HashManager().compare(userData.password, user.password )
     
      if (!isPasswordCorrect) {
        throw new Error("Invalid password");
      }
      
      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.id,
      });
    
      res.status(200).send({
        token,
        message: "Logado com sucesso"
      });

    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  };