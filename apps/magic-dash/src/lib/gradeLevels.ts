import { GRADE_LEVELS, type GradeLevel } from "@/lib/constants";

export function isValidGradeLevel(value: string): value is GradeLevel {
  return (GRADE_LEVELS as readonly string[]).includes(value);
}
