import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1703238035416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE IF NOT EXISTS users
            (
                id CHAR(36) NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                age SMALLINT NOT NULL,
                email VARCHAR(50) NOT NULL,
                is_verified BOOLEAN NOT NULL DEFAULT FALSE,
                PRIMARY KEY (id)
            );
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                DROP TABLE IF EXISTS users
            `
        )
    }

}