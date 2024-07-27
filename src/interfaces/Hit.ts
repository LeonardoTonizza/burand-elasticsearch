import { Model } from '@burand/functions/firestore';

import { Document } from './Document.js';

export interface Hit<T extends Model> extends Document<T> {
  _score: number;
}
