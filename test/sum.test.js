import test from "node:test";
import assert from "node:assert/strict";

import { sum } from "../src/sum.js";

test("sum adds finite numbers", () => {
  assert.equal(sum(2, 3), 5);
  assert.equal(sum(-1, 1), 0);
});

test("sum rejects non-numeric inputs", () => {
  assert.throws(() => sum("2", 3), TypeError);
  assert.throws(() => sum(2, Number.POSITIVE_INFINITY), TypeError);
  assert.throws(() => sum(NaN, 0), TypeError);
});
