import { Model } from '@burand/functions/firestore';
import got, { Got } from 'got';
import { env } from 'node:process';

import { DocumentResponse } from '../interfaces/DocumentResponse.js';
import { SearchResponse } from '../interfaces/SearchResponse.js';
import { ofElasticsearch } from './ofElasticsearch.js';

export class ElasticAbstract<T extends Model> {
  private api: Got;

  constructor(private collection: string) {
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

  public async add({ id, ...rest }: T): Promise<void> {
    await this.api.put(`_doc/${id}`, {
      json: rest
    });
  }

  public async update({ id, ...doc }: T): Promise<void> {
    await this.api.post(`_update/${id}`, {
      json: { doc }
    });
  }

  async updateByQuery(query: unknown, script: unknown): Promise<void> {
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

  public async delete(id: string): Promise<void> {
    await this.api.delete(`_doc/${id}`);
  }

  public search<U extends T = T>(query: unknown): Promise<SearchResponse<U>> {
    return this.api.post<SearchResponse<U>>('_search', {
      json: query,
      resolveBodyOnly: true
    });
  }

  public async getById<U extends T = T>(id: string): Promise<U> {
    const hit = await this.api.get<DocumentResponse<U>>(`_doc/${id}`, {
      resolveBodyOnly: true
    });

    return ofElasticsearch(hit);
  }

  public async getByIds<U extends T = T>(ids: string[]): Promise<U[]> {
    const { hits } = await this.search<U>({
      query: {
        terms: { _id: ids }
      }
    });

    return hits.hits.map(hit => ofElasticsearch(hit));
  }
}
