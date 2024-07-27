export function match(field, value) {
    return {
        match: {
            [field]: value
        }
    };
}
