import { Model } from '@burand/functions/firestore';
import { Got } from 'got';
import { SearchResponse } from '../interfaces/SearchResponse.js';
export declare class ElasticAbstract<T extends Model> {
    protected collection: string;
    protected api: Got;
    constructor(collection: string);
    add({ id, ...rest }: T): Promise<void>;
    update({ id, ...doc }: T): Promise<void>;
    updateByQuery(query: unknown, script: unknown): Promise<void>;
    delete(id: string): Promise<void>;
    search<U extends T = T>(query: unknown): Promise<SearchResponse<U>>;
    getById<U extends T = T>(id: string): Promise<U>;
    getByIds<U extends T = T>(ids: string[]): Promise<U[]>;
}
