export type Terms = {
    terms: {
        [x: string]: unknown[];
    };
};
export declare function terms(field: string, value: unknown[]): Terms;
