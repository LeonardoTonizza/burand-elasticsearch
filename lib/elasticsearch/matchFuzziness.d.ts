export type MatchFuzziness = {
    match: {
        [x: string]: {
            query: unknown;
            fuzziness: 'AUTO';
        };
    };
};
export declare function matchFuzziness(field: string, value: unknown): MatchFuzziness;
