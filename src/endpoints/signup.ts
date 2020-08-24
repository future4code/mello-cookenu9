import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";

export default async function Signup(req: Request, res: Response) {
  try {
  
    if (!req.body.email || req.body.email.indexOf("@") === -1) {
      throw new Error("Invalid email");
    }

    if (!req.body.password || req.body.password.length < 6) {
      throw new Error("Invalid password");
    }

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const hashPassword = await new HashManager().hash(userData.password);

    const userDb = new UserDatabase();
    await userDb.createUser(id, userData.name, userData.email, hashPassword);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({
      id,
    });

    res.status(200).send({
      message: "Usuário criado com sucesso!",
      token,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
}
