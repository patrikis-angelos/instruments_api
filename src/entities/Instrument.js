import { EntitySchema } from 'typeorm';
import Joi from 'joi';

import BaseEntity from './BaseEntity.js';

class Instrument extends BaseEntity {
  constructor(properties = {}) {
    super();
    this.name = properties.name;
    this.description = properties.description;
    this.images = properties.images;
    this.videos = properties.videos;
    this.enabled = false;
  }
  
  getValidationSchema() {
    return Joi.object({
      name: Joi.string().max(50).required(),
      description: Joi.string(),
      images: Joi.array().items(Joi.string().uri()),
      videos: Joi.array().items(Joi.string().uri()),
      enabled: Joi.boolean()
    });
  }

  getProperties() {
    return {
      name: this.name,
      description: this.description,
      images: this.images,
      videos: this.videos,
      enabled: this.enabled
    };
  }
}

export const InstrumentSchema = new EntitySchema({
  name: 'Instrument',
  target: Instrument,
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid'
    },
    name: {
      type: 'varchar'
    },
    description: {
      type: 'text'
    },
    images: {
      type: 'varchar',
      array: true
    },
    videos: {
      type: 'varchar',
      array: true
    },
    enabled: {
      type: 'boolean'
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
    categories: {
      name: 'categories',
      target: 'Category',
      type: 'many-to-many',
      joinTable: {
        name: 'instrument_category',
        joinColumn: {
          name: 'instrument_id'
        },
        inverseJoinColumn: {
          name: 'category_id'
        }
      },
      inverseSide: 'Instrument',
      cascade: ['insert', 'update']
    }
  }
});

export default Instrument;
