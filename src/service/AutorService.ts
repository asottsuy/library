import {Autor} from "../entity/autor";
import {Repository} from "typeorm";

export class AutorService {
  private repository: Repository<Autor>;

  constructor(repository: Repository<Autor>) {
    this.repository = repository;
  }

  async inserir(autor: Autor): Promise<Autor> {
      if (!autor.nome?.trim()) { //manter o trim?
        throw { id: 400, msg: "O nome é obrigatório." };
      }
      //if (!autor.nacionalidade) não ta como obg nas instruçoes
      //  throw { id: 400, msg: "Nacionalidade inválida" };
      return await this.repository.save(autor);
  }

  async listar(): Promise<Autor[]> {
    return await this.repository.find();
  }

  async buscarPorId(id: number): Promise<Autor> {
    let autor = await this.repository.findOneBy({id: id});
    if(!autor) {
        throw ({id: 404, msg: "Autor não encontrado."});    
    }
    return autor;
  }

  async atualizar(id: number, autor: Autor): Promise<Autor>{
    if (!autor.nome?.trim()) { //manter o trim?
        throw { id: 400, msg: "O nome é obrigatório." };
    }
    let autorAlt = await this.repository.findOneBy({id: id});
    console.log("autor ", autorAlt)
    if (!autorAlt || autorAlt == null) {
      throw ({id: 404, msg: "Produto nao encontrado"});    
    }    
    else {
      autorAlt.nome = autor.nome;
      autorAlt.nacionalidade = autor.nacionalidade;
      return await this.repository.save(autorAlt);
    }
  }

  async deletar(id: number): Promise<Autor> {
    let autorDeletado = await this.repository.findOneBy({id: id});
    if (!autorDeletado) {
        throw ({id: 404, msg: "Autor não encontrado"});    
    }    
    else {
      await this.repository.remove(autorDeletado);
      return autorDeletado;
    }
  }
}