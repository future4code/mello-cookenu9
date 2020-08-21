import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export default async function Follow(req: Request, res: Response) {
  try {
    const token = req.headers.authorization as string;
    const autenticator = new Authenticator();

    const autenticatorData = autenticator.getData(token);
    const followId = autenticatorData.id;

    const followedId = req.body.followedId as string;

    await new UserDatabase().follow(followId, followedId);

    res.status(200).send({
      message: "seguido com sucesso",
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
}
