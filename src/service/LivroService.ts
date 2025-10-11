import { Livro } from "../entity/Livro";
import { Autor } from "../entity/Autor";
import { Repository } from "typeorm";
import { AutorRepository } from '../repository/AutorRepository';

export class LivroService {
  private repository: Repository<Livro>;
  private autorRepository: Repository<Autor>;

  constructor(repository: Repository<Livro>, autorRepository: Repository<Autor>) {
    this.repository = repository;
    this.autorRepository = autorRepository;
  }

  //inserir livro
  async inserir(livro: Livro): Promise<Livro> {
    if (!livro.titulo?.trim()) throw { id: 400, msg: "O título é obrigatório" };

    if (!livro.ano_publicacao || livro.ano_publicacao <= 0)
      throw { id: 400, msg: "Ano de publicação inválido" };

    if (!livro.autor) {
      throw { id: 400, msg: "Autor faltando" };
    }

    if (
      livro.quantidade_disponivel === undefined ||
      !Number.isInteger(livro.quantidade_disponivel) ||
      livro.quantidade_disponivel < 0
    )
      throw { id: 400, msg: "Quantidade disponível inválida" };

    //verificando se livro já existe
    const existente = await this.repository.findOne({
      where: { titulo: livro.titulo },
    });
    if (existente) throw { id: 409, msg: "Este livro já está cadastrado" };

    // Verifica se o autor existe
    const autorEncontrado = await this.autorRepository.findOneBy({
      id: (livro.autor as any).id || livro.autor,
    });

    if (!autorEncontrado) throw { id: 404, msg: "Autor não encontrado" };

    // Cria o novo livro associando o autor existente
    const novoLivro = this.repository.create({
      ...livro,
      autor: autorEncontrado,
    });

    return this.repository.save(novoLivro);
  }

  //listar todos os livros
  async listar(): Promise<Livro[]> {
    return await this.repository.find();
  }

  //buscar livro por id
  async buscarPorId(id: number): Promise<Livro> {
    let livro = await this.repository.findOneBy({ id: id });
    if (!livro) {
      throw { id: 404, msg: "Livro nao encontrado" };
    }

    return livro;
  }

  //atualizar livro
  async atualizar(id: number, livro: Livro): Promise<Livro> {
    if (
      !livro.titulo ||
      !livro.ano_publicacao ||
      !livro.genero ||
      !livro.quantidade_disponivel
    ) {
      throw { id: 400, msg: "Esta faltando dados obrigatorios" };
    }

    let livroAlt = await this.repository.findOneBy({ id: id });

    if (!livroAlt || livroAlt == null) {
      throw { id: 404, msg: "Livro nao encontrado" };
    } else {
      livroAlt.titulo = livro.titulo;
      livroAlt.ano_publicacao = livro.ano_publicacao;
      livroAlt.genero = livro.genero;
      livroAlt.quantidade_disponivel = livro.quantidade_disponivel;
      return await this.repository.save(livroAlt);
    }
  }

  //deletar livro
  async deletar(id: number): Promise<Livro> {
    let livroDeletado = await this.repository.findOneBy({ id: id });
    console.log("livrodeletado: ", livroDeletado);

    if (!livroDeletado || livroDeletado == null) {
      throw { id: 404, msg: "Livro nao encontrado" };
    } else {
      await this.repository.remove(livroDeletado);
      return livroDeletado;
    }
  }
}
