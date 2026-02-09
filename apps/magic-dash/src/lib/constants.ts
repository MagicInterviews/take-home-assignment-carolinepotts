/**
 * Grade levels (pre-K through 12). Keep in sync with Postgres grade_level_enum.
 */
export enum GradeLevel {
  PreK = "pre-K",
  K = "K",
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Eleven = "11",
  Twelve = "12",
}

/** Ordered list for validation and UI iteration (derived from enum definition order). */
export const GRADE_LEVELS: GradeLevel[] = Object.values(GradeLevel) as GradeLevel[];
