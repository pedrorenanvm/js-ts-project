import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1730735941145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "license_plate",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "brand",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "model",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "km",
            type: "int",
            isNullable: false,
          },
          {
            name: "year",
            type: "int",
            isNullable: false,
          },
          {
            name: "items",
            type: "text",
            isArray: true,
            isNullable: false,
          },
          {
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
            isNullable: false,
          },
          {
            name: "status",
            type: "enum",
            enum: ["ativo", "inativo", "excluído"],
            default: "'ativo'",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars");
  }
}
