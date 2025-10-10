import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Leitor {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({nullable: false})
  nome?: string;
  @Column({nullable: false})
  email?: string;
  @Column({nullable: false})
  senha?: string;
  @Column()
  telefone?: string;
}