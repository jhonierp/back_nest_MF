import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1723325346983 implements MigrationInterface {
    name = 'Init1723325346983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`lastName\` varchar(102) NOT NULL, \`avatarUrl\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}
