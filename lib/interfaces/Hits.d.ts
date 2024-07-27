import { Model } from '@burand/functions/firestore';
import { Hit } from './Hit.js';
import { Total } from './Total.js';
export interface Hits<T extends Model> {
    total: Total;
    max_score: number;
    hits: Hit<T>[];
}
