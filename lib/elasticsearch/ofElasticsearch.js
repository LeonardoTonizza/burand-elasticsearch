export function ofElasticsearch(hit) {
    return {
        ...hit._source,
        id: hit._id
    };
}
