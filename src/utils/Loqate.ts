import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import {
  LOQATE_BASE_URL,
  LOQATE_FIND_URL,
  LOQATE_RETRIEVE_URL,
} from '../constants/loqate';

interface FindQuery {
  text: string;
  language: string;
  countries?: string[];
  limit?: number;
  containerId?: string;
}

class Loqate {
  public _httpClient: AxiosInstance;

  constructor(public key: string, public baseUrl: string = LOQATE_BASE_URL) {
    this._httpClient = axios.create({
      baseURL: baseUrl,
      params: {
        Key: key,
      },
      paramsSerializer: params =>
        qs.stringify(params, {
          arrayFormat: 'comma',
        }),
    });
  }

  public static create(key: string, baseUrl: string = LOQATE_BASE_URL) {
    return new Loqate(key, baseUrl);
  }

  public retrieve(id: string) {
    return this._httpClient.get(LOQATE_RETRIEVE_URL, {
      params: {
        Id: id,
      },
    });
  }

  public find(query: FindQuery) {
    const { text, countries = [], containerId, language, limit } = query;

    return this._httpClient.get(LOQATE_FIND_URL, {
      params: {
        Text: text,
        Countries: countries,
        Container: containerId,
        limit,
        language,
      },
    });
  }
}

export default Loqate;
