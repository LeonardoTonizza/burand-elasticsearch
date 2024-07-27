import { Model } from '@burand/functions/firestore';
import got, { Got } from 'got';
import { env } from 'node:process';

export abstract class ElasticIndexAbstract<T extends Model> {
  private api: Got;

  constructor(private collection: string) {
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

  abstract create(): Promise<void>;

  async bulkIndex(items: T[]): Promise<void> {
    const body = items
      .flatMap(post => {
        return [
          JSON.stringify({
            index: {
              _id: post.id,
              _index: `${env.ELASTIC_PREFIX}-${this.collection}`
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

  async delete(): Promise<void> {
    await this.api.delete(`${env.ELASTIC_PREFIX}-${this.collection}`);
  }
}