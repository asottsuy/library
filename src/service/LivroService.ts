import { Livro } from "../entity/Livro";
import { Repository } from "typeorm";

export class LivroService {
  private repository: Repository<Livro>;

  constructor(repository: Repository<Livro>) {
    this.repository = repository;
  }

  async inserir(livro: Livro): Promise<Livro> {
    if (!livro.titulo?.trim()) throw { id: 400, msg: "O título é obrigatório" };
    // if (!livro.autor?.trim()) throw { id: 400, msg: "O autor é obrigatório" };
    if (!livro.ano_publicacao || livro.ano_publicacao <= 0)
      throw { id: 400, msg: "Ano de publicação inválido" };
    if (
      livro.quantidade_disponivel === undefined ||
      !Number.isInteger(livro.quantidade_disponivel) ||
      livro.quantidade_disponivel < 0
    )
      throw { id: 400, msg: "Quantidade disponível inválida" };

    // opcional: checar duplicidade
    const existente = await this.repository.findOne({
      where: { titulo: livro.titulo }, //, autor: livro.autor
    });
    if (existente) throw { id: 409, msg: "Este livro já está cadastrado" };

    return this.repository.save(livro);
  }

  async listar(): Promise<Livro[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Livro> {
      let livro = await this.repository.findOneBy({id: id});
      if (!livro) {
        throw ({ id: 404, msg: "Livro nao encontrado"});
      }

      return livro;
  }
}
