import { Request, Response } from "express";
import { EmprestimoService } from "../service/EmprestimoService";
import { StatusEmprestimo } from "../entity/Emprestimo";

export class EmprestimoController {
  private service: EmprestimoService;

  constructor(service: EmprestimoService) {
    this.service = service;
  }

  //post para criar emprestimo
  inserir = async (req: Request, res: Response): Promise<void> => {
    const { livro, user, data_prevista_devolucao } = req.body;

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

  //listar emprestimos
  listar = async (req: Request, res: Response): Promise<void> => {
    const emprestimos = await this.service.listar();

    if (emprestimos.length === 0) {
      res.status(200).json({
        message: "Nenhum emprestimo realizado",
        data: [],
      });
    }
    res.status(200).json(emprestimos);
  };

  //get buscar por id
  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
      const livro = await this.service.buscarPorId(id);
      res.json(livro);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  //atualizar emprestimo
  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    try {
      const emprestimoAtualizado = await this.service.atualizar(id, status);
      res.json(emprestimoAtualizado);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  //deletar emprestimo
  deletar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
      const emprestimoDeletado = await this.service.deletar(id);
      res.json(emprestimoDeletado);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };
}
