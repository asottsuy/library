import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id?: BigInt;
  @Column()
  nome?: string;
  @Column({nullable: false})
  nacionalidade?: string;
  //@column()
  //biografia?: string;
}