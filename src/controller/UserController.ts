import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;
    try{ 
        const novoUser = await this.service.inserir({ email, senha });
        res.status(201).json(novoUser);
    }
    catch(err:any) {
        res.status(err.id).json({ error: err.msg });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const usuarios = await this.service.listar();
    res.json(usuarios);
  };
}