export type ActiveFilterValue = "active" | "inactive" | null;

type ActiveStatusFilterProps = {
  activeFilter: ActiveFilterValue;
  onActiveFilterChange: (value: ActiveFilterValue) => void;
};

const pillSelected =
  "inline-flex cursor-pointer rounded-full border border-gray-700 bg-gray-700 px-2.5 py-1 text-xs font-medium text-white hover:bg-gray-600";
const pillUnselected =
  "inline-flex cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100";

export function ActiveStatusFilter({
  activeFilter,
  onActiveFilterChange,
}: ActiveStatusFilterProps) {
  return (
    <div className="mt-4 pl-6">
      <p className="mb-2 text-xs font-medium text-gray-600">Status:</p>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["active", "Active only"],
            ["inactive", "Inactive only"],
          ] as const
        ).map(([value, label]) => {
          const selected = activeFilter === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onActiveFilterChange(selected ? null : value)}
              className={selected ? pillSelected : pillUnselected}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
