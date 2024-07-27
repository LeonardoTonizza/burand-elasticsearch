import { Model } from '@burand/functions/firestore';
export interface Document<T extends Model> {
    _index: string;
    _type: string;
    _id: string;
    _source: T;
}
