/**
 * Financial calculation utilities operating strictly in integer minor units (Paisa).
 * Prevents IEEE-754 floating-point inaccuracies in all school billing and accounting operations.
 */

export function takaToPaisa(taka: number | string): number {
  const num = typeof taka === "string" ? parseFloat(taka) : taka;
  if (isNaN(num)) return 0;
  return Math.round(num * 100);
}

export function paisaToTaka(paisa: number): number {
  return paisa / 100;
}

export function sumPaisa(...amounts: number[]): number {
  return amounts.reduce((acc, curr) => acc + (curr || 0), 0);
}

export function calculateDiscountPaisa(baseAmountPaisa: number, discountPercentage: number): number {
  if (discountPercentage <= 0) return 0;
  if (discountPercentage >= 100) return baseAmountPaisa;
  return Math.round((baseAmountPaisa * discountPercentage) / 100);
}
