import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class favorites1659304326673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'favorites',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'artists',
            type: 'uuid',
            isArray: true,
          },
          {
            name: 'albums',
            type: 'uuid',
            isArray: true,
          },
          {
            name: 'tracks',
            type: 'uuid',
            isArray: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorites');
  }
}
