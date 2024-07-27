import { Model } from '@burand/functions/firestore';
import { Document } from '../interfaces/Document.js';
export declare function ofElasticsearch<T extends Model>(hit: Document<T>): T;
