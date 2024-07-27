import got from 'got';
import { env } from 'node:process';
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
    async bulkIndex(items) {
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
    async delete() {
        await this.api.delete(`${env.ELASTIC_PREFIX}-${this.collection}`);
    }
}
