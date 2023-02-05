export default class CreateInstrument1675001717272 {

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "instrument" (
        id uuid DEFAULT uuid_generate_v4 (),
        PRIMARY KEY (id),
        name VARCHAR( 50 ) NOT NULL,
        description TEXT,
        images VARCHAR ARRAY,
        videos VARCHAR ARRAY,
        enabled BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP
      );`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      'DROP TABLE "instrument";'
    );
  }
}
