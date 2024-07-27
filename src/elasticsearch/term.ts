export type Term = {
  term: {
    [x: string]: unknown;
  };
};

export function term(field: string, value: unknown): Term {
  return {
    term: {
      [field]: value
    }
  };
}
