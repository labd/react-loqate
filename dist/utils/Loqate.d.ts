import { AxiosInstance } from 'axios';
interface FindQuery {
    text: string;
    language: string;
    countries?: string[];
    limit?: number;
    containerId?: string;
}
declare class Loqate {
    key: string;
    baseUrl: string;
    _httpClient: AxiosInstance;
    constructor(key: string, baseUrl?: string);
    static create(key: string, baseUrl?: string): Loqate;
    retrieve(id: string): Promise<import("axios").AxiosResponse<any>>;
    find(query: FindQuery): Promise<import("axios").AxiosResponse<any>>;
}
export default Loqate;
