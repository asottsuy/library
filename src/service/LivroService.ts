import { Livro } from "../entity/Livro";
import { Repository } from "typeorm";

export class LivroService {
  private repository: Repository<Livro>;

  constructor(repository: Repository<Livro>) {
    this.repository = repository;
  }

  async inserir(livro: Livro): Promise<Livro> {
    if (!livro.titulo || !livro.quantidade_disponivel) {
      throw { id: 400, msg: "Está faltando dados obrigatórios" };
    }
    return await this.repository.save(livro);
  }
}
