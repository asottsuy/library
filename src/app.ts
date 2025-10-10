import "reflect-metadata";
import express, { Request, Response } from "express";
import { myDataSource } from "./data-source";
import { LivroService } from "./service/LivroService";
import { LivroController } from "./controller/LivroController";
import { livroRotas } from "./routes/livro.routes";
import { Livro } from "./entity/Livro";
import { AutorService } from "./service/AutorService";
import { AutorController } from "./controller/AutorController";
import { autorRotas } from "./routes/autor.routes";
import { Autor } from "./entity/autor";

myDataSource
  .initialize()
  .then(async () => {
    const app = express();
    const port = 3000;
    app.use(express.json());

    //Livro
    const livroRepository = myDataSource.getRepository(Livro);
    const livroService = new LivroService(livroRepository);
    const livroController = new LivroController(livroService);

    //Routes
    app.use('/api/livros', livroRotas(livroController));

    app.listen(port, () => {
      console.log(`Library rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
