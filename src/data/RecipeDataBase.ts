import knex from 'knex'
import Knex from 'knex'
import { BaseDatabase } from './BaseDatabase'

export class RecipeDataBase extends BaseDatabase{
    private static TABLE_NAME = 'cookenu_recipe' 

    public async createRecipe(
        id: string,
        title: string,
        description: string,
        created_At: string
    ): Promise<void> {
        await this.getConnection()
          .insert({
            id,
            title,
            description,
            created_At,
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