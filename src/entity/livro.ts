import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  titulo?: string;
  @Column({ type: 'int' })
  ano_publicacao?: number;
  @Column()
  genero?: string;
  @Column()
  quantidade_disponivel?: number;
  //  @Column()
  //  imagem_capa_url!: string;
  //  @Column() //precisa da entidade do autor para fazer a FK
  //  autor_id!: number;
}
