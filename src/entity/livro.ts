import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  titulo?: string;
  @Column({ type: 'int', nullable: false, default: 0 })
  ano_publicacao?: number;
  @Column()
  genero?: string;
  @Column( {type: 'int', nullable: false, default: 0})
  quantidade_disponivel?: number;
  //  @Column({ type: 'varchar', length: 255, nullable: true })
  //  imagem_capa_url!: string;
  //  @Column() //precisa da entidade do autor para fazer a FK
  //  autor_id!: number;
}
