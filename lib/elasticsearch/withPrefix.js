import { env } from 'node:process';
export function withPrefix(collection) {
    return `${env.ELASTIC_PREFIX}-${collection}`;
}
