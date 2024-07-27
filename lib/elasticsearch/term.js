export function term(field, value) {
    return {
        term: {
            [field]: value
        }
    };
}
