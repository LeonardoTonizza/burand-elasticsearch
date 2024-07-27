import { Model } from '@burand/functions/firestore';
import { Document } from '../interfaces/Document.js';
export declare function ofElasticsearch<TData, THit extends Model>(hit: Document<THit>): TData;
