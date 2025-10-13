import { Router } from "express";
import { EmprestimoController } from "../controller/EmprestimoController";

export const emprestimoRotas = (controller: EmprestimoController): Router => {
    const router = Router();

    router.post("/", controller.inserir);
    // router.get("/", controller.listar);
    // router.get('/:id', controller.buscarPorId);
    // router.put('/:id', controller.atualizar);
    // router.delete('/:id', controller.deletar);

    return router;
}