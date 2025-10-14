import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1760482917827 implements MigrationInterface {
    name = 'InitialSchema1760482917827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "livro" ALTER COLUMN "imagem_capa" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "livro" ALTER COLUMN "imagem_capa" DROP NOT NULL`);
    }

}
