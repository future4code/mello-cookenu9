import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";

export default async function Signup(req: Request, res: Response){
    try {
      // Item b. Validação do email
      if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }
  
      // Item c. Validação da senha
      if (!req.body.password || req.body.password.length < 6) {
        throw new Error("Invalid password");
      }
      
      //recebendo valores do body (postman)
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      
      //gera id
      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();
      
      //gera hash a partir da senha vinda do body
      const hashPassword= await new HashManager().hash(userData.password)
      
      //cria o usuario
      const userDb = new UserDatabase();      
      await userDb.createUser(id, userData.name, userData.email, hashPassword);
      
      //gera o token a partir do id
      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id,
      });
      
      //devolve o token pro front 
      res.status(200).send({
        message: "Usuário criado com sucesso!",
        token
      });
      
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });

