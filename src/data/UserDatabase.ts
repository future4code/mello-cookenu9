import knex from "knex";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "cookenu_user";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }

  public async follow(followId: string, followedId: string): Promise<void> {
    await this.getConnection()
      .insert({ user_follow_id: followId, user_followed_id: followedId })
      .into("cookenu_followers");
  }

  public async unfollow(unfollowedId: string): Promise<void> {
    await this.getConnection().raw(`
    DELETE from cookenu_followers
    WHERE user_followed_id = "${unfollowedId}"
    `);
  }
}
