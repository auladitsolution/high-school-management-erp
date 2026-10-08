const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/**
 * Converts English number/string to Bengali numerals.
 * Example: 12345 -> ১২৩৪৫
 */
export function toBanglaNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = value.toString();
  return str.replace(/\d/g, (digit) => BANGLA_DIGITS[parseInt(digit, 10)]);
}

/**
 * Converts Bengali digits back to English digits.
 * Example: ১২৩৪৫ -> 12345
 */
export function toEnglishNumber(value: string): string {
  if (!value) return "";
  return value.replace(/[০-৯]/g, (char) => {
    return BANGLA_DIGITS.indexOf(char).toString();
  });
}

/**
 * Formats monetary amounts in Paisa into Bangladeshi Taka string.
 * Example: 500000 Paisa -> ৳ ৫,০০০.০০
 */
export function formatCurrencyBn(amountInPaisa: number, showSign: boolean = true): string {
  const taka = (amountInPaisa / 100).toFixed(2);
  const [whole, decimal] = taka.split(".");
  const formattedWhole = Number(whole).toLocaleString("en-IN");
  const banglaFormatted = `${toBanglaNumber(formattedWhole)}.${toBanglaNumber(decimal)}`;
  return showSign ? `৳ ${banglaFormatted}` : banglaFormatted;
}

/**
 * Formats a Date object to Bengali format.
 * Example: ২০২৪-১০-০৭
 */
export function formatBanglaDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  const day = toBanglaNumber(d.getDate().toString().padStart(2, "0"));
  const monthNames = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  const month = monthNames[d.getMonth()];
  const year = toBanglaNumber(d.getFullYear());

  return `${day} ${month}, ${year}`;
}
