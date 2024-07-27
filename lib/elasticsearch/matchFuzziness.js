export function matchFuzziness(field, value) {
    return {
        match: {
            [field]: {
                query: value,
                fuzziness: 'AUTO'
            }
        }
    };
}
