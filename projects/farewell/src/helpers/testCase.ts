// src/helpers/testCase.ts — the `tc` / `source` annotations every test carries (test-case-conventions.md).
export function caseAnnotations(id: string, source?: string): { type: string; description: string }[] {
  return [{ type: 'tc', description: id }, ...(source ? [{ type: 'source', description: source }] : [])];
}

// "N current leavers" as the wall writes it ("1 current leaver" for one card, seen 18 Oct 2026 — WALL-012 is in Review).
export function leaverCountText(n: number): string {
  return n === 1 ? '1 current leaver' : `${n} current leavers`;
}
