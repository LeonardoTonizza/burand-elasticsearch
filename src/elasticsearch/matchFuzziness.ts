export type MatchFuzziness = {
  match: {
    [x: string]: {
      query: unknown;
      fuzziness: 'AUTO';
    };
  };
};

export function matchFuzziness(field: string, value: unknown): MatchFuzziness {
  return {
    match: {
      [field]: {
        query: value,
        fuzziness: 'AUTO'
      }
    }
  };
}
