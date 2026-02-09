import { GRADE_LEVELS } from "@/lib/constants";

type GradeLevelCheckboxesProps = {
  selected: string[];
  onToggle: (level: string) => void;
  disabled?: boolean;
};

export function GradeLevelCheckboxes({
  selected,
  onToggle,
  disabled = false,
}: GradeLevelCheckboxesProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Grade levels
      </p>
      <div className="flex flex-wrap gap-3">
        {GRADE_LEVELS.map((level) => (
          <label key={level} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(level)}
              onChange={() => onToggle(level)}
              disabled={disabled}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span>{level}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
