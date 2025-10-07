import { Livro } from "../entity/Livro";

export class LivroRepository {
  private listaLivros: Livro[] = [];
  private static proximoId = 1;

  inserir(livroData: Omit<Livro, "id">): Livro {
    const novoLivro = new Livro();
        novoLivro.id = LivroRepository.proximoId++; // Gera e incrementa o ID
        novoLivro.titulo = livroData.titulo;
        novoLivro.ano_publicacao = livroData.ano_publicacao;
        novoLivro.genero = livroData.genero;
        novoLivro.quantidade_disponivel = livroData.quantidade_disponivel;

    this.listaLivros.push(novoLivro);
    return novoLivro;
  }
  
  listar(): Livro[] {
    return [...this.listaLivros];
  }
  
}
