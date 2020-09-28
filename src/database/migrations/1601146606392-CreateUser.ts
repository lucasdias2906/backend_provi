import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUser1601146606392 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'full_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'birthday',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'phone',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'street',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'number_house',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'active',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
