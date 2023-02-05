export default class CreateInstrumentCategory1675002933944 {

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "instrument_category" (
        instrument_id UUID,
        category_id UUID,

        CONSTRAINT fk_instrument_id FOREIGN KEY (instrument_id) REFERENCES instrument(id),
        CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category(id)
      );`
    );
    await queryRunner.query(
      `CREATE INDEX idx_instrument_id ON instrument_category(instrument_id);
       CREATE INDEX idx_category_id ON instrument_category(category_id);`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      'DROP TABLE "instrument_category";'
    );
  }
}
