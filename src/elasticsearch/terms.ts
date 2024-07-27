export type Terms = {
  terms: {
    [x: string]: unknown[];
  };
};

export function terms(field: string, value: unknown[]): Terms {
  return {
    terms: {
      [field]: value
    }
  };
}
