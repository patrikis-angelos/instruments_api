export default class CreateCategory1670173607264 {
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "category" (
        id SERIAL PRIMARY KEY,
        name VARCHAR( 50 ) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP
      );`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      'DROP TABLE "category";'
    );
  }
}
