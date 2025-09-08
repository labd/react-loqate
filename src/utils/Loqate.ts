import { Item, LoqateErrorItem } from '..';
import {
  LOQATE_BASE_URL,
  LOQATE_FIND_URL,
  LOQATE_RETRIEVE_URL,
} from '../constants/loqate';
import { LoqateError, ReactLoqateError } from '../error';

interface FindQuery {
  text: string;
  language: string;
  countries?: string[];
  limit?: number;
  containerId?: string;
  origin?: string;
  bias?: boolean;
}

type LoqateResponse = { Items?: Item[] | LoqateErrorItem[] };
type LoqateNoErrorResponse = { Items?: Item[] };
class Loqate {
  constructor(
    public key: string,
    public baseUrl: string = LOQATE_BASE_URL
  ) {}

  public static create(key: string, baseUrl: string = LOQATE_BASE_URL): Loqate {
    return new Loqate(key, baseUrl);
  }

  public async retrieve(id: string): Promise<LoqateNoErrorResponse> {
    const params = new URLSearchParams({ Id: id, Key: this.key });
    const url = `${this.baseUrl}/${LOQATE_RETRIEVE_URL}?${params.toString()}`;
    const res = await fetch(url).then<LoqateResponse>((r) => r.json());
    const noLoqateErrosRes = this.handleErrors(res);

    if (noLoqateErrosRes.Items && !noLoqateErrosRes.Items?.length) {
      throw new ReactLoqateError({
        code: 'NO_ITEMS_RETRIEVED',
        message: `Loqate retrieve API did not return any address items for the provided ID ${id}`,
      });
    }

    return noLoqateErrosRes;
  }

  public async find(query: FindQuery): Promise<LoqateNoErrorResponse> {
    const {
      text,
      countries = [],
      containerId,
      language,
      limit,
      origin,
      bias,
    } = query;

    const params = new URLSearchParams({
      Text: text,
      Countries: countries.join(','),
      language,
      Key: this.key,
      Origin: origin ? origin : '',
      Bias: bias ? 'true' : 'false',
    });

    if (containerId) {
      params.set('Container', containerId);
    }
    if (limit) {
      params.set('limit', limit.toString());
    }
    const url = `${this.baseUrl}/${LOQATE_FIND_URL}?${params.toString()}`;
    const response = await fetch(url).then<LoqateResponse>((r) => r.json());

    return this.handleErrors(response);
  }

  private handleErrors = (res: LoqateResponse): LoqateNoErrorResponse => {
    const firstItem: Item | LoqateErrorItem | undefined = res?.Items?.[0];
    if (firstItem && Object.hasOwn(firstItem, 'Error')) {
      throw new LoqateError(firstItem as LoqateErrorItem);
    }

    return res as LoqateNoErrorResponse;
  };
}

export default Loqate;
