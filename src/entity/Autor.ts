import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Livro } from "./Livro";

@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({nullable: true})
  nome?: string;
  @Column({nullable: true})
  nacionalidade?: string;
  @Column({nullable: false})
  biografia?: string;
  @ManyToMany(() => Livro, (livro) => livro.autores)
  livros?: Livro[]
}