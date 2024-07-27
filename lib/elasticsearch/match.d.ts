export type Match = {
    match: {
        [x: string]: unknown;
    };
};
export declare function match(field: string, value: unknown): Match;
