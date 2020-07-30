export const API_VERSIONS = [1];
export const API_ENDPOINTS = {
  v1: {
    https: 'https://api.enface.io/v1',
  },
};
export const MIN_IMAGE_SIZE = 10 * 1024;
export const RETRY_TIMEOUT = 2000;
export const IS_NODE_ENVIRONMENT = (
  typeof process === 'object'
  && typeof process.versions === 'object'
  && typeof process.versions.node !== 'undefined'
);
export const PASSWORD_MIN_LENGTH = 6;
