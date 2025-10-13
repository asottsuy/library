import { Request, Response } from "express";
import { EmprestimoService } from "../service/EmprestimoService";

export class EmprestimoController {
  private service: EmprestimoService;

  constructor(service: EmprestimoService) {
    this.service = service;
  }

  //post para criar emprestimo
  inserir = async (req: Request, res: Response): Promise<void> => {
    const {
        livro,
        user,
        data_prevista_devolucao,
    } = req.body;

    try {
      const newEmprestimo = await this.service.inserir({
        livro,
        user,
        data_prevista_devolucao,
      });
      res.status(201).json(newEmprestimo);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

}