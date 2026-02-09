import { type GradeLevel, GRADE_LEVELS } from "@/lib/constants";

type GradeLevelDisplayProps = {
  grade_levels: string[] | null;
  label?: string;
};

export function GradeLevelDisplay({
  grade_levels,
  label = "Grade levels: ",
}: GradeLevelDisplayProps) {
  if (!grade_levels?.length) return null;

  const sorted = [...grade_levels].sort(
    (a, b) => GRADE_LEVELS.indexOf(a as GradeLevel) - GRADE_LEVELS.indexOf(b as GradeLevel)
  );

  return (
    <p className="pt-1 text-xs text-gray-600">
      <span className="font-medium text-gray-500">{label}</span>
      {sorted.join(", ")}
    </p>
  );
}
