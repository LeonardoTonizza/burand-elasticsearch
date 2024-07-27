export type Wildcard = {
    wildcard: {
        [x: string]: {
            value: unknown;
        };
    };
};
export declare function wildcard(field: string, value: unknown): Wildcard;
