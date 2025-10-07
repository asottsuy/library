import { Router } from "express";
import { LivroController } from "../controller/LivroController";

export const livroRotas = (controller: LivroController): Router => {
  const router = Router();

  router.post("/", controller.inserir);
  router.get('/', controller.listar);

  return router;
};
