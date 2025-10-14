import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1760485611980 implements MigrationInterface {
    name = 'InitialSchema1760485611980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "autor" ("id" SERIAL NOT NULL, "nome" character varying, "nacionalidade" character varying, "biografia" character varying NOT NULL, CONSTRAINT "PK_51d3959df48c82010ae1c4907fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "livro" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "ano_publicacao" integer NOT NULL DEFAULT '0', "genero" character varying NOT NULL, "quantidade_disponivel" integer NOT NULL DEFAULT '0', "imagem_capa" character varying(255) NOT NULL, CONSTRAINT "PK_5601163ea69da49108c4f7854cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."emprestimo_status_enum" AS ENUM('ATIVO', 'DEVOLVIDO', 'ATRASADO')`);
        await queryRunner.query(`CREATE TABLE "emprestimo" ("id" SERIAL NOT NULL, "data_emprestimo" date NOT NULL DEFAULT ('now'::text)::date, "data_prevista_devolucao" date NOT NULL, "data_devolucao" date, "status" "public"."emprestimo_status_enum" NOT NULL DEFAULT 'ATIVO', "livroId" integer, "userId" integer, CONSTRAINT "PK_d8f9a723b1f2fd57102a5c424f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "livro_autores_autor" ("livroId" integer NOT NULL, "autorId" integer NOT NULL, CONSTRAINT "PK_de6d9d187fcc4fc1e6b028c0f82" PRIMARY KEY ("livroId", "autorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc0da8e5c279d67848c25be903" ON "livro_autores_autor" ("livroId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5922e9fdf31fa5d7fe9ab9216e" ON "livro_autores_autor" ("autorId") `);
        await queryRunner.query(`ALTER TABLE "emprestimo" ADD CONSTRAINT "FK_6a87b564046e0c3c735f5d21d98" FOREIGN KEY ("livroId") REFERENCES "livro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emprestimo" ADD CONSTRAINT "FK_21d06215bf9b1ed8786733c742f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livro_autores_autor" ADD CONSTRAINT "FK_bc0da8e5c279d67848c25be903c" FOREIGN KEY ("livroId") REFERENCES "livro"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "livro_autores_autor" ADD CONSTRAINT "FK_5922e9fdf31fa5d7fe9ab9216e6" FOREIGN KEY ("autorId") REFERENCES "autor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "livro_autores_autor" DROP CONSTRAINT "FK_5922e9fdf31fa5d7fe9ab9216e6"`);
        await queryRunner.query(`ALTER TABLE "livro_autores_autor" DROP CONSTRAINT "FK_bc0da8e5c279d67848c25be903c"`);
        await queryRunner.query(`ALTER TABLE "emprestimo" DROP CONSTRAINT "FK_21d06215bf9b1ed8786733c742f"`);
        await queryRunner.query(`ALTER TABLE "emprestimo" DROP CONSTRAINT "FK_6a87b564046e0c3c735f5d21d98"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5922e9fdf31fa5d7fe9ab9216e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc0da8e5c279d67848c25be903"`);
        await queryRunner.query(`DROP TABLE "livro_autores_autor"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "emprestimo"`);
        await queryRunner.query(`DROP TYPE "public"."emprestimo_status_enum"`);
        await queryRunner.query(`DROP TABLE "livro"`);
        await queryRunner.query(`DROP TABLE "autor"`);
    }

}
