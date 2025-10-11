import { NextFunction, Request, Response } from "express";
import { LoginService } from "../../service/LoginService";

export class TokenMiddleware {
  private service: LoginService;

  constructor(service: LoginService) {
    this.service = service;
  }

  async verificarAcesso(req: Request, res: Response, next: NextFunction) {
    let token = req.get("Authorization") || req.get("Token");

    if (!token) {
      return res.status(401).json({ error: "Nenhum token informado!" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    try {
      console.log("Validar Token ", token);
      await this.service.validarToken(token);
      console.log("Token validado!");
      next();
    } catch (err: any) {
      console.log(err);
      res.status(err.id).json({ error: err.msg });
    }
  }
}
