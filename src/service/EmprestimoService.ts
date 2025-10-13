import { User } from "../entity/User";
import { Livro } from "../entity/Livro";
import { Emprestimo, StatusEmprestimo } from '../entity/Emprestimo';
import { Repository } from "typeorm";

export class EmprestimoService {
  private repository: Repository<Emprestimo>;
  private userRepository: Repository<User>;
  private livroRepository: Repository<Livro>;

  constructor(
        repository: Repository<Emprestimo>,
        userRepository: Repository<User>,
        livroRepository: Repository<Livro>,
    ) {
    this.repository = repository;
    this.userRepository = userRepository;
    this.livroRepository = livroRepository;
  }

  async inserir(emprestimo: Emprestimo): Promise<Emprestimo> {

    const livroEncontrado = await this.livroRepository.findOneBy({
        id: (emprestimo.livro as any).id || emprestimo.livro,
    });

    const userEncontrado = await this.userRepository.findOneBy({
        id: (emprestimo.user as any).id || emprestimo.user,
    });
    
    if (!livroEncontrado) throw { id: 400, msg: "Livro nao encontrado" };
    if (!userEncontrado) throw {id: 400, msg: "Usuário não encontrado"};

    
    const novoEmprestimo = this.repository.create({
      livro : livroEncontrado,
      user : userEncontrado,
      data_prevista_devolucao: emprestimo.data_prevista_devolucao,
      status: StatusEmprestimo.ATIVO,
    });

    return this.repository.save(novoEmprestimo);
  }
}