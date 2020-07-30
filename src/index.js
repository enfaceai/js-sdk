import { API_VERSIONS, API_ENDPOINTS, IS_NODE_ENVIRONMENT } from './constants';
import { EnfaceApi } from './api';
import { isUuid } from './utils';

const CreateEnfaceApi = ({
  version = API_VERSIONS[API_VERSIONS.length - 1],
  token,
  url,
} = {}) => {
  if (!isUuid(token)) throw new Error('Bad API key format');
  if (!url) {
    version = +version;
    if (!API_VERSIONS.includes(version)) {
      throw new Error(`You have specified a non-existent version of Enface API: ${version}. Available versions: ${API_VERSIONS.join(', ')}`);
    }
    url = API_ENDPOINTS[`v${version}`].https;
  }
  return new EnfaceApi({ token, apiUrl : url });
};

IS_NODE_ENVIRONMENT || (window.createEnfaceApi = CreateEnfaceApi);
export const createEnfaceApi = CreateEnfaceApi;
