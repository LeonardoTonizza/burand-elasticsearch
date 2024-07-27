export type Wildcard = {
  wildcard: {
    [x: string]: {
      value: unknown;
    };
  };
};

export function wildcard(field: string, value: unknown): Wildcard {
  return {
    wildcard: {
      [field]: {
        value
      }
    }
  };
}
