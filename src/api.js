import { sleep, checkImages } from './utils';
import { RETRY_TIMEOUT, MIN_IMAGE_SIZE } from './constants';

export class EnfaceApi {
  constructor({ apiUrl, token }) {
    this.apiUrl = apiUrl;
    this.token = token;
  }

  _request = async ({ uri, post }) => {
    console.log(`[EnfaceApi.request] to ${this.apiUrl}${uri}`);
    let result = await fetch(`${this.apiUrl}${uri}`, {
      method: 'post',
      body: post,
      headers: post instanceof FormData
        ? post.getHeaders()
        : {
          'Content-Type': 'application/json',
          'Content-Length': post.length,
        },
    });
    let response;
    try {
      response = await result.text();
      result = JSON.parse(response);
      if (result.status === 'error') {
        console.error('[EnfaceApi.request] error response', response);
        return response;
      }
      return result;
    } catch (error) {
      console.error('[EnfaceApi.request] bad response', response);
      throw new Error(`Bad response: ${error}`);
    }
  };

  _process = async (uri, post) => {
    try {
      post instanceof FormData
        ? post.append('token', this.token)
        : post = JSON.stringify({ ...post, token: this.token });
      return await this._request({ uri, post });
    } catch (error) {
      console.error('[EnfaceApi.request] failed', error);
      throw error;
    }
  };

  _checkImages = async (images, minLength, minSize) => {
    try {
      Array.isArray(images) || (images = [images]);
      return await checkImages(images, minLength, minSize);
    } catch (error) {
      console.error('[EnfaceApi.checkImages]', error);
      return false;
    }
  };

  detect = async params => {
    params.images = await this._checkImages(params.images, 1, MIN_IMAGE_SIZE);
    if (!params.images) return;
    const form = new FormData();
    params.bbox && form.append('bbox', 'true');
    params.bbox_pro && form.append('bbox_pro', 'true');
    params.multi && form.append('multi', 'true');
    params.feature_check && params.feature_check.forEach(item => form.append('feature_check', item));
    params.thumb && form.append('thumb', 'true');
    params.images.forEach((image, index) => form.append('images', image, `${index}.jpg`));
    return this._process('/detect', form);
  };

  compare = async params => {
    params.images = await this._checkImages(params.images, 1, MIN_IMAGE_SIZE);
    if (!params.images) return;
    const form = new FormData();
    params.bbox && form.append('bbox', 'true');
    params.bbox_pro && form.append('bbox_pro', 'true');
    params.bbox_real && form.append('bbox_real', 'true');
    params.multi && form.append('multi', 'true');
    params.feature_check && params.feature_check.forEach(item => form.append('feature_check', item));
    params.thumb && form.append('thumb', 'true');
    params.threshold && form.append('threshold', params.threshold);
    params.images.forEach((image, index) => form.append('images', image, `${index}.jpg`));
    return this._process('/compare', form);
  };

  personSearch = async params => {
    const images = await this._checkImages(params.image, 1, MIN_IMAGE_SIZE);
    if (!images) return;
    [params.image] = images;
    const form = new FormData();
    params.new_person_threshold && form.append('new_person_threshold', params.new_person_threshold);
    params.new_person_square_min && form.append('new_person_square_min', params.new_person_square_min);
    params.new_person_yaw_max && form.append('new_person_yaw_max', params.new_person_yaw_max);
    params.person_list_search && form.append('person_list_search', params.person_list_search);
    params.person_list_add && form.append('person_list_add', params.person_list_add);
    params.group_id && form.append('group_id', params.group_id);
    params.source_id && form.append('source_id', params.source_id);
    params.thumb && form.append('thumb', 'true');
    params.bbox && form.append('bbox', 'true');
    params.bbox_pro && form.append('bbox_pro', 'true');
    params.multi && form.append('multi', 'true');
    params.feature_check && params.feature_check.forEach(item => form.append('feature_check', item));
    params.normalized && form.append('normalized', 'true');
    params.drop_image && form.append('drop_image', 'true');
    form.append('results', params.results || 1);
    form.append('image', params.image, '0.jpg');
    return this._process('/action', form);
  };

  personCreate = async params => {
    const images = await this._checkImages(params.image, 1, MIN_IMAGE_SIZE);
    if (!images) return;
    [params.image] = images;
    const form = new FormData();
    params.new_person_threshold && form.append('new_person_threshold', params.new_person_threshold);
    params.new_person_square_min && form.append('new_person_square_min', params.new_person_square_min);
    params.new_person_yaw_max && form.append('new_person_yaw_max', params.new_person_yaw_max);
    params.list_id && form.append('list_id', params.list_id);
    params.replace_person_id && form.append('replace_person_id', params.replace_person_id);
    params.fields && params.fields.forEach(item => form.append('fields', item));
    params.feature_check && params.feature_check.forEach(item => form.append('feature_check', item));
    params.multi && form.append('multi', 'true');
    params.normalized && form.append('normalized', 'true');
    params.drop_image && form.append('drop_image', 'true');
    params.bbox && form.append('bbox', 'true');
    params.bbox_pro && form.append('bbox_pro', 'true');
    params.thumb && form.append('thumb', 'true');
    form.append('image', params.image, '0.jpg');
    return this._process('/person/create', form);
  };

  tokenCreate = params => {
    const fields = {};
    params.valid_days && (fields.valid_days = params.valid_days);
    params.expires && (fields.expires = params.expires);
    return this._process('/token/create', fields);
  };

  tokenDelete = params => {
    return this._process('/token/delete', {
      token_id: params.token_id,
    });
  };

  tokenUpdate = params => {
    const fields = {};
    params.valid_days && (fields.valid_days = params.valid_days);
    params.expires && (fields.expires = params.expires);
    return this._process('/token/update', {
      token_id: params.token_id,
      ...fields,
    });
  };

  sourceGroupCreate = params => {
    const fields = {};
    params.person_list_search && (fields.person_list_search = params.person_list_search);
    return this._process('/source/group/create', {
      name: params.name,
      ...fields,
    });
  };

  sourceGroupDelete = params => {
    return this._process('/source/group/delete', {
      group_id: params.group_id,
    });
  };

  sourceGroupUpdate = params => {
    const fields = {};
    params.name && (fields.name = params.name);
    params.person_list_search && (fields.person_list_search = params.person_list_search);
    return this._process('/source/group/update', {
      group_id: params.group_id,
      ...fields,
    });
  };

  sources = params => {
    return this._process('/sources', {
      group_id: params.group_id,
    });
  };

  sourceCreate = params => {
    const fields = {};
    params.new_person_threshold && (fields.new_person_threshold = params.new_person_threshold);
    params.new_person_square_min && (fields.new_person_square_min = params.new_person_square_min);
    params.new_person_yaw_max && (fields.new_person_yaw_max = params.new_person_yaw_max);
    params.person_list_add && (fields.person_list_add = params.person_list_add);
    params.feature_check && (fields.feature_check = params.feature_check);
    return this._process('/source/create', {
      group_id: params.group_id,
      name: params.name,
      ...fields,
    });
  };

  sourceDelete = params => {
    return this._process('/source/delete', {
      group_id: params.group_id,
      source_id: params.source_id,
    });
  };

  sourceUpdate = params => {
    const fields = {};
    params.name && (fields.name = params.name);
    params.new_person_threshold && (fields.new_person_threshold = params.new_person_threshold);
    params.new_person_square_min && (fields.new_person_square_min = params.new_person_square_min);
    params.new_person_yaw_max && (fields.new_person_yaw_max = params.new_person_yaw_max);
    params.person_list_add && (fields.person_list_add = params.person_list_add);
    params.feature_check && (fields.feature_check = params.feature_check);
    return this._process('/source/update', {
      group_id: params.name,
      source_id: params.source_id,
      ...fields,
    });
  };

  person = params => {
    return this._process('/person', {
      list_id: params.list_id,
      person_id: params.person_id,
    });
  };

  personLists = () => {
    return this._process('/person/lists', {});
  };

  personListCreate = params => {
    return this._process('/person/list/create', {
      name: params.name,
    });
  };

  personListDelete = params => {
    const fields = {};
    params.list_id && (fields.list_id = params.list_id);
    params.name && (fields.name = params.name);
    return this._process('/person/list/delete', {
      ...fields,
    });
  };

  personListUpdate = params => {
    return this._process('/person/list/update', {
      list_id: params.list_id,
      name: params.name,
    });
  };

  personDelete = params => {
    const fields = {};
    params.list_id && (fields.list_id = params.list_id);
    return this._process('/person/delete', {
      person_id: params.person_id,
      ...fields,
    });
  };

  personUpdate = params => {
    const fields = {};
    params.list_id && (fields.list_id = params.list_id);
    params.fields && (fields.fields = params.fields);
    params.drop_image && (fields.drop_image = params.drop_image);
    return this._process('/person/update', {
      person_id: params.person_id,
      ...fields,
    });
  };

  facesOnImageCount = async params => {
    const result = await this.apiDetect({
      images: params.images,
      bbox: true,
      multi: true,
    });
    return result.results
    && Array.isArray(result.results)
    && Array.isArray(result.results[0])
      ? result.results[0].length
      : 0;
  };

  guaranteed = async (func, params) => {
    let result = null;
    do {
      try {
        result = await func(params);
      } catch {
        await sleep(RETRY_TIMEOUT);
      }
    } while (result === null);
    return result;
  };
}
