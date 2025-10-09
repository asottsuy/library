import { Router } from 'express';
import { UserController } from '../controller/UserController';

export const userRotas = (controller: UserController): Router => {
  const router = Router();

  router.post('/', controller.inserir);
  router.get('/', controller.listar);
  return router;
};