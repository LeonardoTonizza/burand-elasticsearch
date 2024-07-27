export function wildcard(field, value) {
    return {
        wildcard: {
            [field]: {
                value
            }
        }
    };
}
