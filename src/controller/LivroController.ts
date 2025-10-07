import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

export class LivroController {
  private service: LivroService;

  constructor(service: LivroService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { titulo, ano_publicacao, genero, quantidade_disponivel } = req.body;

    try {
      const newBook = await this.service.inserir({
        titulo,
        ano_publicacao,
        genero,
        quantidade_disponivel,
      });
      res.status(201).json(newBook);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };
}
