import { EntitySchema } from 'typeorm';
import Category from '../models/Category.js';

const CategorySchema = new EntitySchema({
  name: 'Category',
  target: Category,
  columns: {
    id: {
      primary: true,
      type: 'string',
      generated: 'uuid'
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

export default CategorySchema;
