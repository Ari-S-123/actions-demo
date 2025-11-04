/**
 * Add two numeric values with strict validation.
 *
 * @param {number} a - First addend; must be a finite number.
 * @param {number} b - Second addend; must be a finite number.
 * @returns {number} Sum of {@link a} and {@link b}.
 * @throws {TypeError} If either argument is not a finite number.
 */
export function sum(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("sum(a, b) requires two finite numbers");
  }

  return a + b;
}
