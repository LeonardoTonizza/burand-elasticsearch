import { Model } from '@burand/functions/firestore';
export declare abstract class ElasticIndexAbstract<T extends Model> {
    private collection;
    private api;
    constructor(collection: string);
    abstract create(): Promise<void>;
    bulkIndex(items: T[]): Promise<void>;
    delete(): Promise<void>;
}
