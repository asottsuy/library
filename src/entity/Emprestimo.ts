import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Livro } from "./Livro";
// import { Leitor } from "./Leitor";
export enum StatusEmprestimo {
  ATIVO = "ATIVO",
  DEVOLVIDO = "DEVOLVIDO",
  ATRASADO = "ATRASADO",
}

@Entity()
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id?: number;

  //falta criar as entidade de Autor e Leitor
  //   @ManyToOne(() => Livro)
  //   livro: Livro;

  //   @ManyToOne(() => Leitor)
  //   leitor: Leitor;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  data_emprestimo?: Date;

  @Column({ type: "date" })
  data_prevista_devolucao?: Date;

  @Column({ type: "date", nullable: true })
  data_devolucao?: Date;

  @Column({
    type: "enum",
    enum: StatusEmprestimo,
    default: StatusEmprestimo.ATIVO,
  })
  status?: StatusEmprestimo;
}
