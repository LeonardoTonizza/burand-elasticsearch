export type Term = {
    term: {
        [x: string]: unknown;
    };
};
export declare function term(field: string, value: unknown): Term;
