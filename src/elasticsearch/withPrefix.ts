import { env } from 'node:process';

export function withPrefix(collection: string): string {
  return `${env.ELASTIC_PREFIX}-${collection}`;
}
