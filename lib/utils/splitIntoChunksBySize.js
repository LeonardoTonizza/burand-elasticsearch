export function splitIntoChunksBySize(data, limit) {
    const chunks = [];
    let currentChunk = [];
    let currentChunkSize = 0;
    for (const item of data) {
        if (currentChunkSize + 1 > limit) {
            chunks.push(currentChunk);
            currentChunk = [];
            currentChunkSize = 0;
        }
        currentChunk.push(item);
        currentChunkSize += 1;
    }
    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }
    return chunks;
}
