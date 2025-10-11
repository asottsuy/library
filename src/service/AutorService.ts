import { Autor } from "../entity/Autor";
import { Repository } from "typeorm";

export class AutorService {
  private repository: Repository<Autor>;

  constructor(repository: Repository<Autor>) {
    this.repository = repository;
  }

  async inserir(autor: Autor): Promise<Autor> {
    if (!autor.nacionalidade || !autor.nome)
      throw { id: 400, msg: "Falta dados obrigatórios" };

    const existente = await this.repository.findOne({
      where: { nome: autor.nome },
    });
    if (existente) throw { id: 409, msg: "Este autor já está cadastrado" };

    return this.repository.save(autor);
  }

  async listar(): Promise<Autor[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Autor> {
      let autor = await this.repository.findOneBy({id: id});
      if (!autor) {
        throw ({ id: 404, msg: "Autor nao encontrado"});
      }

      return autor;
  }

  async atualizar(id: number, autor: Autor): Promise<Autor> {
    if (!autor.nome || !autor.nacionalidade || !autor.biografia) {
      throw ({id: 400, msg: "Esta faltando dados obrigatorios"});
    }

    let autorAlt = await this.repository.findOneBy({id: id});

    if (!autorAlt || autorAlt == null) {
      throw ({id: 404, msg: "Autor nao encontrado"});
    }

    else {
      autorAlt.nome = autor.nome
      autorAlt.nacionalidade = autor.nacionalidade
      autorAlt.biografia = autor.biografia

      return await this.repository.save(autorAlt)
    }

  }

  async deletar(id: number): Promise<Autor> {
    let autorDeletado = await this.repository.findOneBy({id: id});
    console.log('Autor deletado: ',autorDeletado);

    if (!autorDeletado || autorDeletado == null) {
      throw ({id: 404, msg: "Autor nao encontrado"});
    }

    else {
      await this.repository.remove(autorDeletado);
      return autorDeletado;
    }
  }
}
