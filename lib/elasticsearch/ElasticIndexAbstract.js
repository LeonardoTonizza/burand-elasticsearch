import got from 'got';
import { env } from 'node:process';
import { withPrefix } from './withPrefix.js';
export class ElasticIndexAbstract {
    collection;
    api;
    constructor(collection) {
        this.collection = collection;
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
    async create() {
        await this.api.put(withPrefix(this.collection), {
            json: this._mapping()
        });
    }
    async bulkIndex(items) {
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
    async delete() {
        await this.api.delete(withPrefix(this.collection));
    }
}
