import ValidationError from '../errors/ValidationError.js';

class BaseEntity {
  getValidationSchema() {}
  getProperties() {}
  
  validate() {
    const result = this.getValidationSchema().validate(this.getProperties());
    if (result.error) {
      const message = result.error.details
        .reduce((acc, val) => acc += val.message + ' ', '')
        .replaceAll('"', '\'')
        .trim();

      const data = result.error.details.map((obj) => ({ [obj.context.key]: obj.message }));
      throw new ValidationError(message, data);
    }
  }
}

export default BaseEntity;
