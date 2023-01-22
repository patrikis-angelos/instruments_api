class ValidationError extends Error {
  constructor(message, data = null) {
    super(message);
    this.name = 'ValidationError';
    this.data = data;
  }
}

export default ValidationError;
