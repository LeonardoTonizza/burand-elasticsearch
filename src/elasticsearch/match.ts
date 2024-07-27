export type Match = {
  match: {
    [x: string]: unknown;
  };
};

export function match(field: string, value: unknown): Match {
  return {
    match: {
      [field]: value
    }
  };
}
