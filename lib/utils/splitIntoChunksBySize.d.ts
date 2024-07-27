import { Model } from '@burand/functions/firestore';
export declare function splitIntoChunksBySize<T extends Model>(data: T[], limit: number): T[][];
