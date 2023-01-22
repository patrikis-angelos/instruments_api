import ApiError from '../errors/ApiError.js';

export const validateUuid = (id) => {
  if (!id.match( /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/ )) {
    throw ApiError.badRequest('Invalid id');
  }
};
