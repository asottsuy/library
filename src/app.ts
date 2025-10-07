import "reflect-metadata";
import express, { Request, Response } from "express";
import { myDataSource } from "./data-source";
import { Livro } from "./entity/Livro";
myDataSource
  .initialize()
  .then(async () => {
    const app = express();
    const port = 3000;
    app.use(express.json());

    app.get("/api/livros", async function (req: Request, res: Response) {
      const Livros = await myDataSource.getRepository(Livro).find();
      res.json(Livros);
    });

    app.get("/api/livros/:id", async function (req: Request, res: Response) {
      const results = await myDataSource.getRepository(Livro).findOneBy({
        id: parseInt(req.params.id),
      });
      return res.send(results);
    });

    app.post("/api/livros", async function (req: Request, res: Response) {
      const livro = await myDataSource
        .getRepository(Livro)
        .create(req.body);
      const results = await myDataSource.getRepository(Livro).save(livro);
      return res.send(results);
    });

    app.put("/api/livros/:id", async function (req: Request, res: Response) {
      const livro = await myDataSource.getRepository(Livro).findOneBy({
        id: parseInt(req.params.id),
      });
      if (livro) {
        myDataSource.getRepository(Livro).merge(livro, req.body);
        const results = await myDataSource.getRepository(Livro).save(livro);
        return res.send(results);
      } else {
        return res.status(404).send("Livro não encontrado!");
      }
    });

    app.delete(
      "/api/Livros/:id",
      async function (req: Request, res: Response) {
        const results = await myDataSource
          .getRepository(Livro)
          .delete(req.params.id);
        return res.send(results);
      }
    );




    app.listen(port, () => {
      console.log(`Library rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
