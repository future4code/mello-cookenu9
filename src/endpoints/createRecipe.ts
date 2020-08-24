import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import RecipeDataBase from "../data/RecipeDataBase"

export default async function Login(req: Request, res: Response) {
  try {
    if (!req.body.title || !req.body.description) {
      throw new Error("Todos os campos são obrigatórios");
    }
    const token = req.headers.authorization as string;

    if (!token) {
      throw new Error("Token inválido");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const recipeData = {
      id: id,
      title: req.body.title,
      description: req.body.description,
      created_at: new Date(),
    };
    
    const recipeDb = new RecipeDataBase();
    await recipeDb.createRecipe(recipeData);

    res.status(200).send({
      message: "Receita criada com sucesso",
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
}
