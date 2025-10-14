import { DataSource } from "typeorm";
import "dotenv/config"

//local
// export const myDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "password",
//   database: "library-db",
//   entities: ["src/entity/*.ts"],
//   logging: true,
//   dropSchema: false, //adicionar se quiser limpar o banco
//   synchronize: true,
//   subscribers: [],
//   migrations: ["src/migration/*.ts"],
// });

//prod
export const myDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    entities: [__dirname + '/entity/*.js'],
    migrations: [__dirname + '/migration/*.js'],
});