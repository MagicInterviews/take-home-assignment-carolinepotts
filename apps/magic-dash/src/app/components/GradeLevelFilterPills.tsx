import { GRADE_LEVELS } from "@/lib/constants";
import { Filter } from "lucide-react";

type GradeLevelFilterPillsProps = {
  selectedGradeLevels: string[];
  onToggleGradeLevel: (level: string) => void;
  /** When provided (e.g. when used with other filters like status), use this for the Filters (N) count. */
  totalFilterCount?: number;
};

export function GradeLevelFilterPills({
  selectedGradeLevels,
  onToggleGradeLevel,
  totalFilterCount,
}: GradeLevelFilterPillsProps) {
  const filtersAppliedCount = totalFilterCount ?? selectedGradeLevels.length;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Filter className="size-4" />
        <span>Filters ({filtersAppliedCount})</span>
      </div>
      <div className="mt-3 pl-6">
        <p className="mb-2 text-xs font-medium text-gray-600">Grade levels:</p>
        <div className="flex flex-wrap gap-2">
          {GRADE_LEVELS.map((level) => {
            const selected = selectedGradeLevels.includes(level);
            return (
              <button
                key={level}
                type="button"
                onClick={() => onToggleGradeLevel(level)}
                className={
                  selected
                    ? "inline-flex cursor-pointer rounded-full border border-gray-700 bg-gray-700 px-2.5 py-1 text-xs font-medium text-white hover:bg-gray-600"
                    : "inline-flex cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                }
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
