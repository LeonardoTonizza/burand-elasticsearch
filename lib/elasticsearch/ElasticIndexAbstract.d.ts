import { Model } from '@burand/functions/firestore';
import { Got } from 'got';
export declare abstract class ElasticIndexAbstract<T extends Model> {
    protected collection: string;
    protected api: Got;
    constructor(collection: string);
    abstract _mapping(): unknown;
    create(): Promise<void>;
    bulkIndex(items: T[]): Promise<void>;
    delete(): Promise<void>;
}
