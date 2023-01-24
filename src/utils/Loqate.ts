import { Item } from '..';
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
  constructor(public key: string, public baseUrl: string = LOQATE_BASE_URL) {}

  public static create(key: string, baseUrl: string = LOQATE_BASE_URL): Loqate {
    return new Loqate(key, baseUrl);
  }

  public async retrieve(id: string): Promise<{ Items?: Item[] }> {
    const params = new URLSearchParams({ Id: id, Key: this.key });
    const url = `${this.baseUrl}/${LOQATE_RETRIEVE_URL}?${params.toString()}`;
    return fetch(url).then<{ Items?: Item[] }>((r) => r.json());
  }

  public async find(query: FindQuery): Promise<{ Items?: Item[] }> {
    const { text, countries = [], containerId, language, limit } = query;

    const params = new URLSearchParams({
      Text: text,
      Countries: countries.join(','),
      language,
      Key: this.key,
    });
    if (containerId) {
      params.set('Container', containerId);
    }
    if (limit) {
      params.set('limit', limit.toString());
    }
    const url = `${this.baseUrl}/${LOQATE_FIND_URL}?${params.toString()}`;
    const response = await fetch(url).then<{ Items?: Item[] }>((r) => r.json());

    const error = response?.Items?.find((item: any) => item.Error);
    if (error) {
      throw new Error(`Loqate error: ${JSON.stringify(error)}`);
    }

    return response;
  }
}

export default Loqate;
