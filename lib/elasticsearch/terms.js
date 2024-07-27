export function terms(field, value) {
    return {
        terms: {
            [field]: value
        }
    };
}
