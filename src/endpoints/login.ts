import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";

export default async function Login (req: Request, res: Response){
    try {
      // Item b. Validação do email
      if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }
      
      //pega valores do body (postman)
      const userData = {
        email: req.body.email,
        password: req.body.password,
      };
      
      //Aqui vamos pegar o usuario pelo email. 
      //Assim recebemos o resto das informações dele, password, token
      const userDatabase = new UserDatabase();
      const user = await userDatabase.getUserByEmail(userData.email);
      
      //pega o password que voltou do banco e usa o metodo compare do hash manager 
      //compara a senha que veio do body com a senha que esta no banco (User Data / user)
      const isPasswordCorrect = await new HashManager().compare(userData.password, user.password )
     
      //se a senha não estiver correta..
      if (!isPasswordCorrect) {
        throw new Error("Invalid password");
      }
      
      //gera o token a partir do id
      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.id,
      });
      
      //devolve o token pro front utilizar e uma msg de sucesso
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