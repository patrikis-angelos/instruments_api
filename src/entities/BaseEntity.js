import ValidationError from '../errors/ValidationError.js';

class BaseEntity {
  #properties
  
  constructor(properties) {
    this.#properties = properties
  }

  validate() {
    const result = this.validationSchema().validate(this.#properties);
    console.log(result.error);
    if (result.error) {
      const message = result.error.details
        .reduce((acc, val) => acc += val.message + ' ', '')
        .replaceAll('\"', '\'')
        .trim();

      const data = result.error.details.map((obj) => ({ [obj.context.key]: obj.message }));
      throw new ValidationError(message, data);
    }
  }
}

export default BaseEntity;
