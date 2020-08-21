import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

interface Recipe {
  id: string;
  title: string;
  description: string;
  created_at: Date;
}

export default class RecipeDataBase extends BaseDatabase {
  	private static TABLE_NAME = "cookenu_recipe";

  	public async createRecipe(recipe: Recipe): Promise<void> {
  	  await this.getConnection()
  	    .insert({
  	      id: recipe.id,
  	      title: recipe.title,
  	      description: recipe.description,
  	      created_at: recipe.created_at,
  	    })
  	    .into(RecipeDataBase.TABLE_NAME);
  	}

  	public async getRecipeById(id: string): Promise<any> {
  	  const result = await this.getConnection()
  	    .select("*")
  	    .from(RecipeDataBase.TABLE_NAME)
  	    .where({ id });

  	  return result[0];
  	}

  	public async getRecipeFeed():Promise<any>{
		const result = await this.getConnection().raw(`
			SELECT * FROM cookenu_recipe
			JOIN cookenu_user
			ON  cookenu_recipe.user_id = cookenu_user.id;
			`)	
		console.log(result[0])
  		return result[0];
	}
}
