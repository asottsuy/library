import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { Livro } from "./Livro";
import { User } from './User';
export enum StatusEmprestimo {
  ATIVO = "ATIVO",
  DEVOLVIDO = "DEVOLVIDO",
  ATRASADO = "ATRASADO",
}

@Entity()
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Livro)
  livro?: Livro;

  @ManyToOne(() => User)
  user?: User;

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
