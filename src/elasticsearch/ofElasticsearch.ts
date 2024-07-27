import { Model } from '@burand/functions/firestore';

import { Document } from '../interfaces/Document.js';

export function ofElasticsearch<T extends Model>(hit: Document<T>): T {
  return {
    ...hit._source,
    id: hit._id
  } as T;
}
