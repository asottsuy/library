import { DataSource } from "typeorm";
export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "library-db",
  entities: ["src/entity/*.ts"],
  logging: true,
  dropSchema: false, //adicionar se quiser limpar o banco
  synchronize: true,
  subscribers: [],
  migrations: [],
});
