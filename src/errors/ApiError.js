class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }

  static notFound(message) {
    return new ApiError(message, 404);
  }

  static badRequest(message) {
    return new ApiError(message, 400);
  }
}

export default ApiError;
