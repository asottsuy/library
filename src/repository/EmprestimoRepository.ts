import { Emprestimo } from "../entity/Emprestimo";

export class EmprestimoRepository {
  private listaEmprestimos: Emprestimo[] = [];
  private static proximoId = 1;

  inserir(emprestimoData: Omit<Emprestimo, "id">): Emprestimo {
    const novoEmprestimo = new Emprestimo();
        novoEmprestimo.id = EmprestimoRepository.proximoId++; // Gera e incrementa o ID
        novoEmprestimo.livro = emprestimoData.livro;
        novoEmprestimo.user = emprestimoData.user;
        novoEmprestimo.data_emprestimo = new Date();
        novoEmprestimo.data_prevista_devolucao = emprestimoData.data_prevista_devolucao;
        novoEmprestimo.status = emprestimoData.status;

    this.listaEmprestimos.push(novoEmprestimo);
    return novoEmprestimo;
  }
}