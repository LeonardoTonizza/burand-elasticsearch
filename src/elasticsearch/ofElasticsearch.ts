import { Model } from '@burand/functions/firestore';

import { Document } from '../interfaces/Document.js';

export function ofElasticsearch<TData, THit extends Model>(hit: Document<THit>): TData {
  return {
    ...hit._source,
    id: hit._id
  } as TData;
}
