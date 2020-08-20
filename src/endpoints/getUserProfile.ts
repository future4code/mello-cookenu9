import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export default async function GetProfileUser (req: Request, res: Response){
    try {
        // token vindo do header, do postman. Precisa ser string
      const token = req.headers.authorization as string;
    
      //passa o token pelo getData pra pegar o id
      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);
        
      //Pega o usuario pelo id, que veio do autentication data 
      //aqui pega todos os valores do banco mesmo
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
        //await BaseDatabase.destroyConnection()
    }   
  };