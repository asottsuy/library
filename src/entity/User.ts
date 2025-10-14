import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Emprestimo } from "./Emprestimo";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    nome?: string;
    @Column({ unique: true })
    email?: string;
    @Column()
    senha?: string;
    @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.user)
    emprestimos?: Emprestimo[]
}