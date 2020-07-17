import knex from "knex";

export class UserDatabase {
    private tableName = "User";
    private connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_NAME,
        },
    });

    async createUser(id: string, name: string, email: string, password: string) {
        try {
            await this.connection.insert(
                {
                    id,
                    name,
                    email,
                    password
                }
            ).into(this.tableName);

        } catch (err) {
            throw new Error(err.sqlMessage || err.message)
        }
    }

 
 
}