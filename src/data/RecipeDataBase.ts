import { BaseDatabase } from './BaseDatabase'

interface Recipe{
    id: string,
    title: string,
    description: string,
    created_at: Date
}

export class RecipeDataBase extends BaseDatabase{
    private static TABLE_NAME = 'cookenu_recipe' 

    public async createRecipe(
       recipe: Recipe
    ): Promise<void> {
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
}