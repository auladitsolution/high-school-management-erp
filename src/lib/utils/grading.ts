/**
 * Bangladesh Education Board Secondary School Grading Engine
 * Computes GPA (0.0 to 5.0), Letter Grade, and Pass status
 */

export interface GradeResult {
  grade: "A+" | "A" | "A-" | "B" | "C" | "D" | "F";
  gradePoint: number;
  isPassed: boolean;
}

export function calculateBanglaGrade(totalMarks: number, fullMarks: number = 100): GradeResult {
  const percentage = (totalMarks / fullMarks) * 100;

  if (percentage >= 80) return { grade: "A+", gradePoint: 5.0, isPassed: true };
  if (percentage >= 70) return { grade: "A", gradePoint: 4.0, isPassed: true };
  if (percentage >= 60) return { grade: "A-", gradePoint: 3.5, isPassed: true };
  if (percentage >= 50) return { grade: "B", gradePoint: 3.0, isPassed: true };
  if (percentage >= 40) return { grade: "C", gradePoint: 2.0, isPassed: true };
  if (percentage >= 33) return { grade: "D", gradePoint: 1.0, isPassed: true };
  return { grade: "F", gradePoint: 0.0, isPassed: false };
}
