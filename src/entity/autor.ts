import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
  @OneToMany(() => Livro, (livro) => livro.autor, {nullable: false})
  livros?: Livro[]
}