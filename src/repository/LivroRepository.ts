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
        novoLivro.imagem_capa = livroData?.imagem_capa;
        novoLivro.autores = livroData.autores;

    this.listaLivros.push(novoLivro);
    return novoLivro;
  }
  
  listar(): Livro[] {
    return [...this.listaLivros];
  }

  buscarPorId(id: number): Livro | undefined {
    return this.listaLivros.find(l => l.id === id);
  }

  atualizar(id: number, livro: Omit<Livro, 'id'>): Livro | undefined {
    const index = this.listaLivros.findIndex(l => l.id === id);

    if (index === -1) return undefined;

    const livroAtualizado = new Livro();
      livroAtualizado.titulo = livro.titulo,
      livroAtualizado.ano_publicacao = livro.ano_publicacao,
      livroAtualizado.genero = livro.genero,
      livroAtualizado.quantidade_disponivel = livro.quantidade_disponivel;

    this.listaLivros[index] = livroAtualizado;
    return livroAtualizado
  }

  deletar(id: number): Livro | undefined {
    const index = this.listaLivros.findIndex(l => l.id === id);
    //retorna o incice do livro encontrado
    if (index === -1) return undefined;

    return this.listaLivros.splice(index, 1)[0];
  }
  
}
