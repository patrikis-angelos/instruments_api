import { EntitySchema } from 'typeorm';
import Joi from 'joi';

import BaseEntity from './BaseEntity.js';

class Category extends BaseEntity {
  constructor(properties = {}) {
    super();
    this.name = properties.name;
  }
  
  getValidationSchema() {
    return Joi.object({
      name: Joi.string().max(50).required()
    });
  }

  getProperties() {
    return {
      name: this.name
    };
  }
}

export const CategorySchema = new EntitySchema({
  name: 'Category',
  target: Category,
  columns: {
    id: {
      primary: true,
      type: 'varchar',
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
  },
  relations: {
    instruments: {
      name: 'instruments',
      target: 'Instrument',
      type: 'many-to-many',
      inverseSide: 'Category',
      joinTable: {
        name: 'instrument_category',
        joinColumn: {
          name: 'category_id'
        },
        inverseJoinColumn: {
          name: 'instrument_id'
        }
      },
      cascade: false
    }
  }
});

export const CategoryValidation =  Joi.object({
  name: Joi.string().max(50).required()
});

export default Category;
