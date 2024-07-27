import got from 'got';
import { env } from 'node:process';
import { ofElasticsearch } from './ofElasticsearch.js';
export class ElasticAbstract {
    collection;
    api;
    constructor(collection) {
        this.collection = collection;
        this.api = got.extend({
            prefixUrl: `${env.ELASTIC_URL}/${env.ELASTIC_PREFIX}-${this.collection}`,
            headers: {
                authorization: `${env.ELASTIC_AUTH}`
            },
            timeout: {
                request: 10_000 // 10 seconds
            },
            responseType: 'json'
        });
    }
    async add({ id, ...rest }) {
        await this.api.put(`_doc/${id}`, {
            json: rest
        });
    }
    async update({ id, ...doc }) {
        await this.api.post(`_update/${id}`, {
            json: { doc }
        });
    }
    async updateByQuery(query, script) {
        await this.api.post('_update_by_query', {
            searchParams: {
                conflicts: 'proceed'
            },
            json: {
                query,
                script
            }
        });
    }
    async delete(id) {
        await this.api.delete(`_doc/${id}`);
    }
    search(query) {
        return this.api.post('_search', {
            json: query,
            resolveBodyOnly: true
        });
    }
    async getById(id) {
        const hit = await this.api.get(`_doc/${id}`, {
            resolveBodyOnly: true
        });
        return ofElasticsearch(hit);
    }
    async getByIds(ids) {
        const { hits } = await this.search({
            query: {
                terms: { _id: ids }
            }
        });
        return hits.hits.map(hit => ofElasticsearch(hit));
    }
}
