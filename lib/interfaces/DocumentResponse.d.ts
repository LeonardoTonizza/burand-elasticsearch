import { Model } from '@burand/functions/firestore';
import { Document } from './Document.js';
export interface DocumentResponse<T extends Model> extends Document<T> {
    _version: number;
    _seq_no: number;
    _primary_term: number;
    found: boolean;
}
