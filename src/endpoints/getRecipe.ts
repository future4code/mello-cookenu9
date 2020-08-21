import { Request, Response } from "express";
import moment from "moment";
import RecipeDataBase from "../data/RecipeDataBase";

export default async function GetRecipeById(req: Request, res: Response) {
  try {
    const token = req.headers.authorization as string;
    const id = req.params.id as string;

    if (!token || !id) {
      throw new Error("Token ou id inválidos");
    }

    const recipeDb = new RecipeDataBase();
    const recipe = await recipeDb.getRecipeById(id);

    const recipeCreatedAt = recipe.created_at;
    res.status(200).send({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      created_at: moment(recipeCreatedAt, "DD/MM/YYYY"),
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
  //  finally{
  //await BaseDatabase.destroyConnection()
  //  }
}
