import { User } from "../entity/User";
import { Livro } from "../entity/Livro";
import { Emprestimo, StatusEmprestimo } from "../entity/Emprestimo";
import { Repository } from "typeorm";
import { myDataSource } from "../data-source";

export class EmprestimoService {
  private repository: Repository<Emprestimo>;
  private userRepository: Repository<User>;
  private livroRepository: Repository<Livro>;

  constructor(
    repository: Repository<Emprestimo>,
    userRepository: Repository<User>,
    livroRepository: Repository<Livro>
  ) {
    this.repository = repository;
    this.userRepository = userRepository;
    this.livroRepository = livroRepository;
  }

  //fazer emprestimo
  async inserir(emprestimo: Emprestimo): Promise<Emprestimo> {
    const livroEncontrado = await this.livroRepository.findOneBy({
      id: (emprestimo.livro as any).id || emprestimo.livro,
    });

    const userEncontrado = await this.userRepository.findOneBy({
      id: (emprestimo.user as any).id || emprestimo.user,
    });

    const emprestimoExistente = await this.repository.findOne({
      where: {
        user: { id: emprestimo.user?.id },
        livro: { id: emprestimo.livro?.id },
        status: StatusEmprestimo.ATIVO,
      },
    });
    const dataAtual = new Date();
    const dataPrevista = emprestimo.data_prevista_devolucao
      ? new Date(emprestimo.data_prevista_devolucao)
      : undefined;

    if (dataPrevista && dataPrevista < dataAtual)
      throw {
        id: 400,
        msg: "A data prevista de devolução não pode ser no passado",
      };
    if (emprestimoExistente)
      throw { id: 400, msg: "O usuário já possui este livro emprestado" };
    if (!livroEncontrado) throw { id: 400, msg: "Livro nao encontrado" };
    if (!userEncontrado) throw { id: 400, msg: "Usuário não encontrado" };
    if ((livroEncontrado.quantidade_disponivel || 0) <= 0)
      throw { id: 400, msg: "Não há exemplares disponíveis para empréstimo" };

    livroEncontrado.quantidade_disponivel =
      (livroEncontrado.quantidade_disponivel ?? 1) - 1;
    await this.livroRepository.save(livroEncontrado);

    const novoEmprestimo = this.repository.create({
      livro: livroEncontrado,
      user: userEncontrado,
      data_prevista_devolucao: emprestimo.data_prevista_devolucao,
      status: StatusEmprestimo.ATIVO,
    });

    return this.repository.save(novoEmprestimo);
  }

  //listar
  //faltar buscar o livro e o user na response
  async listar(): Promise<Emprestimo[]> {
    return await this.repository.find();
  }

  //buscar por id
  //faltar buscar o livro e o user na response
  async buscarPorId(id: number): Promise<Emprestimo> {
    let emprestimo = await this.repository.findOneBy({ id: id });
    if (!emprestimo) {
      throw { id: 404, msg: "Emprestimo nao encontrado" };
    }
    return emprestimo;
  }

  //atualizar status
  async atualizar(id: number, status: StatusEmprestimo): Promise<Emprestimo> {
    const emprestimo = await this.repository.findOne({
      where: { id },
      relations: ["livro", "user"],
    });
    if (!status) throw { id: 400, msg: "Esta faltando dados obrigatorios" };
    if (!emprestimo) throw { id: 404, msg: "Empréstimo não encontrado" };
    if (
      emprestimo.status === StatusEmprestimo.DEVOLVIDO &&
      status === StatusEmprestimo.DEVOLVIDO
    ) {
      throw { id: 400, msg: "Este empréstimo já foi devolvido anteriormente" };
    }
    if (!Object.values(StatusEmprestimo).includes(status)) {
      throw { id: 400, msg: "Status inválido" };
    }
    if (
      emprestimo.status === StatusEmprestimo.DEVOLVIDO &&
      status !== StatusEmprestimo.DEVOLVIDO
    ) {
      throw {
        id: 400,
        msg: "Não é possível alterar um empréstimo já finalizado",
      };
    }

    emprestimo.status = status;

    if (
      status === StatusEmprestimo.DEVOLVIDO ||
      status === StatusEmprestimo.ATRASADO
    ) {
      emprestimo.data_devolucao = new Date();

      if (emprestimo.livro) {
        emprestimo.livro.quantidade_disponivel =
          (emprestimo.livro.quantidade_disponivel ?? 0) + 1;
        await this.livroRepository.save(emprestimo.livro);
      }
    }

    return await this.repository.save(emprestimo);
  }

  //deletar emprestimo
  async deletar(id: number): Promise<Emprestimo> {
    let emprestimoDeletado = await this.repository.findOneBy({ id: id });

    if (!emprestimoDeletado || emprestimoDeletado == null) {
      throw { id: 404, msg: "Livro nao encontrado" };
    } else {
      await this.repository.remove(emprestimoDeletado);
      return emprestimoDeletado;
    }
  }
}
