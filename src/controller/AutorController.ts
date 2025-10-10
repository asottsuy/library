import { Request, Response } from "express";
import { AutorService } from "../service/AutorService";

export class AutorController{
  private service: AutorService;
    
  constructor(service: AutorService){
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
  const {nome, nacionalidade, biografia} = req.body;

  try {
    const newAuthor = await this.service.inserir({
      nome,
      nacionalidade,
      biografia
    });
    res.status(201).json(newAuthor);
  } 
  catch (err: any) {
    res.status(err.id).json({ error: err.msg });
  }
  };

  listar = async (req: Request, res: Response): Promise<void> => {
    const authors = await this.service.listar();

    if (authors.length === 0) {
      res.status(200).json({
        message: "Nenhum autor encontrado.",
        data: []
      });
    }

    res.status(200).json(authors);
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try{ 
      const autor = await this.service.buscarPorId(id);
      res.json(autor);
    }
    catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const {nome, nacionalidade, biografia} = req.body;

    try{ 
      const AutorAtualizado = await this.service.atualizar(id, {nome, nacionalidade, biografia});
      res.json(AutorAtualizado);
    }
    catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  deletar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try{ 
      const autor = await this.service.deletar(id);
      res.json(autor);
    }
    catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };
}