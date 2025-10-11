import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Autor } from "./Autor";

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  titulo?: string;
  @Column({ type: "int", nullable: false, default: 0 })
  ano_publicacao?: number;
  @Column()
  genero?: string;
  @Column({ type: "int", nullable: false, default: 0 })
  quantidade_disponivel?: number;
  @Column({ type: "varchar", length: 255, nullable: true })
  imagem_capa!: string;

  @ManyToOne(() => Autor, (autor) => autor.livros, { eager: true })
  autor!: Autor;
}
