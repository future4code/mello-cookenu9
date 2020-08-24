 import { Request, Response } from "express";
 import { UserDatabase } from "../data/UserDatabase";
 import { Authenticator } from "../services/Authenticator";
 import { BaseDatabase } from "../data/BaseDatabase";

 export default async function UnFollow(req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string;

        const autenticator = new Authenticator();
        const autenticatorData = autenticator.getData(token);

        const unfollowedId = req.body.unfollowedId as string;
        await new UserDatabase().unfollow(unfollowedId);
        
        res.status(200).send({
          message: "deixou de seguir",
        });
    }catch (err) {
        res.status(400).send({
          message: err.message,
        });
    }finally {
        await BaseDatabase.destroyConnection();
    }
 }
