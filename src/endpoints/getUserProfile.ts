import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export default async function GetProfileUser (req: Request, res: Response){
    try {
      
      const token = req.headers.authorization as string;
    
      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);
    
      const userDb = new UserDatabase();
      const user = await userDb.getUserById(authenticationData.id);
      
      res.status(200).send({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }finally{
        await BaseDatabase.destroyConnection()
    }   
  };