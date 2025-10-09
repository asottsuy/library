import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

export class LivroController {
  private service: LivroService;

  constructor(service: LivroService) {
    this.service = service;
  }

  //post
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

  //get todos os livros.
  listar = async (req: Request, res: Response): Promise<void> => {
    const books = await this.service.listar();

    if (books.length === 0) {
      res.status(200).json({
        message: "Nenhum livro encontrado.",
        data: []
      });
    }

    res.status(200).json(books);
  }

  //get buscar por id
  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    
    try {
      const livro = await this.service.buscarPorId(id);
      res.json(livro);
    } catch ( err: any ) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  //put atualizar livro
  atualizar =  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id)
    const { titulo, ano_publicacao, genero, quantidade_disponivel } = req.body;

    try {
      const livroAtualizado = await this.service.atualizar(id, {titulo, ano_publicacao, genero, quantidade_disponivel});
      res.json(livroAtualizado);
    } catch (err: any) {

      res.status(err.id).json({ error: err.msg });
    }

  };

  deletar = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    console.log('id:',id);
    try {
      const livroDeletado = await this.service.deletar(id);
      res.json(livroDeletado);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg});
    }
  }



}
