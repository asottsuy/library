import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}