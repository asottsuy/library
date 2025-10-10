import { Router } from 'express';
import { LoginController } from '../controller/LoginController';

export const loginRotas = (controller: LoginController): Router => {
  const router = Router();

  router.post('/', controller.realizarLogin);
  return router;
};