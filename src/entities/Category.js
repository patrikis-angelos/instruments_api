import { EntitySchema } from 'typeorm';

const Category = new EntitySchema({
  name: 'Category',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: 'increment'
    },
    name: {
      type: 'varchar'
    },
    created_at: {
      type: 'timestamp',
      nullable: false
    },
    updated_at: {
      type: 'timestamp'
    }
  }
});

export default Category;
