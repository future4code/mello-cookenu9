import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export default async function Follow(req: Request, res: Response) {
  try {
    // token vindo do header, do postman. Precisa ser string
    const token = req.headers.authorization as string;

    // Item de verificação
    if (!token) {
      throw new Error("Token inválido");
    }

    const autenticator = new Authenticator();

    const autenticatorData = autenticator.getData(token);

    const followId = autenticatorData.id;

    //recebendo valores do body (postman)
    const followedId = req.body.followedId as string;

    // Item de verificação
    if (!followedId) {
      throw new Error("usuário inválido");
    }

    await new UserDatabase().follow(followId, followedId);

    res.status(200).send({
      message: "Followed successfully",
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
}
