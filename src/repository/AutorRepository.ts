import {Autor} from "../entity/autor";

export class AutorRepository {
    private listaAutores: Autor[] = [];
    private static proximoId: number = 1;

    inserir(autorData: Omit<Autor, "id">): Autor {
        const novoAutor = new Autor();
            novoAutor.id = AutorRepository.proximoId++;
            novoAutor.nome = autorData.nome;
            novoAutor.nacionalidade = autorData.nacionalidade,
            novoAutor.biografia;

    this.listaAutores.push(novoAutor);
    return novoAutor;
  }

    listar(): Autor[] {
        return [...this.listaAutores];
    }

    buscarPorId(id: number): Autor | undefined{
        return this.listaAutores.find(p => p.id === id);
    }

    atualizar(id: number, autor: Omit<Autor, 'id'>): Autor | undefined{
        const index = this.listaAutores.findIndex(l => l.id === id);
        
        if (index === -1) return undefined;

        const autorAtualizado = new Autor();
            autorAtualizado.nome = autor.nome,
            autorAtualizado.nacionalidade = autor.nacionalidade,
            autorAtualizado.biografia = autor.biografia;
    }

    deletar(id: number): Autor | undefined {
        const index = this.listaAutores.findIndex(l => l.id === id);
        //retorna o incice do autor encontrado
        if (index === -1) return undefined;

        return this.listaAutores.splice(index, 1)[0];
}
}