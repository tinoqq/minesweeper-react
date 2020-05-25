import { API_ERROR } from './constants';

export const createApiError = (e, tag) => ({
  type: API_ERROR,
  tag,
  e,
});
