import { Model } from '@burand/functions/firestore';
import got, { Got } from 'got';
import { env } from 'node:process';

import { withPrefix } from './withPrefix.js';

export abstract class ElasticIndexAbstract<T extends Model> {
  protected api: Got;

  constructor(protected collection: string) {
    this.api = got.extend({
      prefixUrl: env.ELASTIC_URL,
      headers: {
        authorization: env.ELASTIC_AUTH
      },
      timeout: {
        request: 10_000 // 10 seconds
      },
      responseType: 'json'
    });
  }

  public abstract _mapping(): unknown;

  public async create(): Promise<void> {
    await this.api.put(withPrefix(this.collection), {
      json: this._mapping()
    });
  }

  public async bulkIndex(items: T[]): Promise<void> {
    const body = items
      .flatMap(post => {
        return [
          JSON.stringify({
            index: {
              _id: post.id,
              _index: withPrefix(this.collection)
            }
          }),
          JSON.stringify(post)
        ];
      })
      .join('\n');

    await this.api.post('_bulk', {
      headers: {
        'content-type': 'application/x-ndjson'
      },
      body: `${body}\n`
    });
  }

  public async delete(): Promise<void> {
    await this.api.delete(withPrefix(this.collection));
  }
}
