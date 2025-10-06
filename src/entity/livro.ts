import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Livro {
 @PrimaryGeneratedColumn()
 id!: number;
 @Column()
 titulo!: string;
 @Column()
 ano_publicacao!: string;
 @Column()
 genero!: string;
 @Column()
 copias_disponiveis!:number;
}