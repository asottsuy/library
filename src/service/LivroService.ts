import { Livro } from "../entity/Livro";
import { Autor } from "../entity/Autor";
import { Repository, In } from "typeorm";
import { AutorRepository } from "../repository/AutorRepository";
import { myDataSource } from "../data-source";

export class LivroService {
  private repository: Repository<Livro>;
  private autorRepository: Repository<Autor>;

  constructor(
    repository: Repository<Livro>,
    autorRepository: Repository<Autor>
  ) {
    this.repository = repository;
    this.autorRepository = autorRepository;
  }

  //inserir livro
  async inserir(livro: Livro): Promise<Livro> {
    if (!livro.titulo?.trim()) throw { id: 400, msg: "O título é obrigatório" };

    if (!livro.ano_publicacao || livro.ano_publicacao <= 0)
      throw { id: 400, msg: "Ano de publicação inválido" };

    if (!livro.autores) {
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
    const autorIds: number[] = livro.autores as number[];
    const autoresEncontrados = await this.autorRepository.findBy({
      id: In(autorIds),
    });

    if (autoresEncontrados.length !== autorIds.length)
      throw { id: 404, msg: "1 ou mais autores nao encontrados" };

    // Cria o novo livro associando o autor existente
    const novoLivro = this.repository.create({
      ...livro,
      autores: autoresEncontrados,
    });

    return this.repository.save(novoLivro);
  }

  //listar todos os livros
  async listar(): Promise<Livro[]> {
    const livros = await myDataSource.getRepository(Livro).find({
      relations: ["autores"],
    });

    return livros;
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

    const livroAlt = await this.repository.findOne({
      where: { id },
      relations: ["autores"], // ✅ garante que autores já venham carregados
    });

    if (!livroAlt) {
      throw { id: 404, msg: "Livro nao encontrado" };
    }
    livroAlt.titulo = livro.titulo;
    livroAlt.ano_publicacao = livro.ano_publicacao;
    livroAlt.genero = livro.genero;
    livroAlt.quantidade_disponivel = livro.quantidade_disponivel;

    if (livro.autores && livro.autores.length > 0) {
      const autoresEncontrados = await this.autorRepository.findBy({
        id: In(livro.autores as number[]),
      });

      if (autoresEncontrados.length !== (livro.autores as number[]).length) {
        throw { id: 404, msg: "Um ou mais autores não encontrados" };
      }

      livroAlt.autores = autoresEncontrados; // ✅ array de entidades
    }
    return await this.repository.save(livroAlt);
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
