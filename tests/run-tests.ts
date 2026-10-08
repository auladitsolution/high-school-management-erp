import { takaToPaisa, paisaToTaka, sumPaisa, calculateDiscountPaisa } from "../src/lib/utils/currency";
import { toBanglaNumber, toEnglishNumber, formatCurrencyBn } from "../src/lib/utils/bangla";
import { calculateBanglaGrade } from "../src/lib/utils/grading";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${msg}`);
  }
}

console.log("=== Running Comprehensive Verification Test Suite ===");

// 1. Currency & Paisa Tests (Zero floating-point issues)
console.log("\n[1/3] Testing Integer Currency Precision...");
assert(takaToPaisa(1500) === 150000, "1500 Taka should equal 150000 Paisa");
assert(takaToPaisa("1250.50") === 125050, "1250.50 Taka string should equal 125050 Paisa");
assert(paisaToTaka(150000) === 1500, "150000 Paisa should convert back to 1500 Taka");
assert(sumPaisa(100000, 50000, 25050) === 175050, "Sum of paisa must be exact");
assert(calculateDiscountPaisa(100000, 10) === 10000, "10% discount on 100000 Paisa should be 10000 Paisa");
console.log("✓ Currency and integer precision tests passed.");

// 2. Bangla Numeral & Formatting Tests
console.log("\n[2/3] Testing Bengali Numerals & Formatting...");
assert(toBanglaNumber(12345) === "১২৩৪৫", "12345 must convert to ১২৩৪৫");
assert(toEnglishNumber("১২৩৪৫") === "12345", "১২৩৪৫ must convert to 12345");
assert(formatCurrencyBn(150000) === "৳ ১,৫০০.০০", "150000 Paisa must format to ৳ ১,৫০০.০০");
console.log("✓ Bengali numerals and currency formatting tests passed.");

// 3. Bangladesh Education Board Grading Tests
console.log("\n[3/3] Testing Bangladesh Education Board Grading System...");
const g1 = calculateBanglaGrade(85, 100);
assert(g1.grade === "A+" && g1.gradePoint === 5.0 && g1.isPassed === true, "85% must be A+ 5.0");

const g2 = calculateBanglaGrade(72, 100);
assert(g2.grade === "A" && g2.gradePoint === 4.0 && g2.isPassed === true, "72% must be A 4.0");

const g3 = calculateBanglaGrade(65, 100);
assert(g3.grade === "A-" && g3.gradePoint === 3.5 && g3.isPassed === true, "65% must be A- 3.5");

const g4 = calculateBanglaGrade(55, 100);
assert(g4.grade === "B" && g4.gradePoint === 3.0 && g4.isPassed === true, "55% must be B 3.0");

const g5 = calculateBanglaGrade(45, 100);
assert(g5.grade === "C" && g5.gradePoint === 2.0 && g5.isPassed === true, "45% must be C 2.0");

const g6 = calculateBanglaGrade(35, 100);
assert(g6.grade === "D" && g6.gradePoint === 1.0 && g6.isPassed === true, "35% must be D 1.0");

const g7 = calculateBanglaGrade(28, 100);
assert(g7.grade === "F" && g7.gradePoint === 0.0 && g7.isPassed === false, "28% must be F 0.0");
console.log("✓ Bangladesh Grading calculation tests passed.");

console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! 100% CORRECTNESS VERIFIED.");
