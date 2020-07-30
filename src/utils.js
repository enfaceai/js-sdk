import { IS_NODE_ENVIRONMENT } from './constants';

export const isUuid = string => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(string);
};

export const checkImages = async (images, minLength, minSize) => {
  if (
    !images
    || !Array.isArray(images)
    || minLength !== images.length
  ) {
    throw new Error(`images array of length ${minLength} required`);
  }
  return Promise.all(images.map((item, index) => {
    if (item instanceof Uint8Array) item = item.buffer;
    if (
      (IS_NODE_ENVIRONMENT
        && !(item instanceof ArrayBuffer))
      || (
        !IS_NODE_ENVIRONMENT
        && !(
          item instanceof ArrayBuffer
          || item instanceof File
          || item instanceof Blob
        )
      )
    ) {
      throw new Error(`Bad image [${index}] format`);
    }
    if (
      (
        item instanceof ArrayBuffer
        && item.byteLength < minSize
      )
      || (
        !IS_NODE_ENVIRONMENT
        && (
          item instanceof File
          || item instanceof Blob
        )
        && item.size < minSize
      )
    ) {
      throw new Error(`image [${index}] is too small`);
    }
    return IS_NODE_ENVIRONMENT
      ? item
      : new Blob([item], { type : 'image/jpeg' });
  }));
};

export const sleep = m => new Promise(r => setTimeout(r, m));
