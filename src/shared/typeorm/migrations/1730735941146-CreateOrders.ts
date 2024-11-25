import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateOrdersTable1730735941145 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'status', type: 'varchar', default: `'Aberto'` },
                { name: 'dataPedido', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'valorTotal', type: 'decimal', precision: 10, scale: 2, default: 0 },
                { name: 'cep', type: 'varchar', isNullable: true },
                { name: 'cidade', type: 'varchar', isNullable: true },
                { name: 'uf', type: 'varchar', isNullable: true },
                { name: 'dataCancelamento', type: 'timestamp', isNullable: true },
                { name: 'dataInicial', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'dataFinal', type: 'timestamp', isNullable: true },
                
                // Chaves estrangeiras
                { name: 'customerId', type: 'uuid', isNullable: true },
                { name: 'carId', type: 'uuid', isNullable: true },
            ],
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['customerId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['carId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onDelete: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }
}
