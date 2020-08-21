import {Request, Response} from "express"
import RecipeDataBase from "../data/RecipeDataBase"

export default async function GetRecipeFeed(req: Request, res: Response) {
    try{
        const token= req.headers.authorization as string
        
        if(!token){
            throw new Error ("Token inválido")
        }       

        const recipeDb=new RecipeDataBase()
        const recipe= await recipeDb.getRecipeFeed()
        
        const recipeFeed = recipe.map((recipe: any)=>{
            return({
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                created_at: recipe.created_at,
                user_id: recipe.user_id,
                user_name: recipe.name
            })
        })
        res.status(200).send({
            message: "Feed de receitas:",
            recipeFeed
        })
    } catch (err) {
        res.status(400).send({
          message: err.message,
    });
    }
}