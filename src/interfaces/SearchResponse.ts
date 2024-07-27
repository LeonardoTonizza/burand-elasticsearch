import { Model } from '@burand/functions/firestore';

import { Hits } from './Hits.js';
import { Shards } from './Shards.js';

export interface SearchResponse<T extends Model> {
  took: number;
  timed_out: boolean;
  _shards: Shards;
  hits: Hits<T>;
}
