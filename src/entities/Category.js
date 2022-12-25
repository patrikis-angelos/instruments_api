import { EntitySchema } from 'typeorm';

class Category {
  constructor(properties = {}) {
    this.id = properties.id;
    this.name = properties.name;
    this.createdAt = properties.createdAt;
    this.updatedAt = properties.updatedAt;
  }
}

export const CategorySchema = new EntitySchema({
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
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      nullable: false
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp'
    }
  }
});

export default Category;
