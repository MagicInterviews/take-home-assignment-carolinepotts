import type { ToolItem } from "@/lib/tools";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { updateTool } from "./actions";
import { Card, Button } from "@magic-dash/ui";
import { type GradeLevel, GRADE_LEVELS } from "@/lib/constants";

type ToolCardProps = {
  tool: ToolItem;
  canEdit: boolean;
};

function SavingSpinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );
}

export function ToolCard({ tool, canEdit }: ToolCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<string[]>(tool.grade_levels ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setError(null);
  }

  function handleEdit() {
    setSelected(tool.grade_levels ?? []);
    setError(null);
    setIsEditing(true);
  }

  function handleCancel() {
    if (!saving) {
      setSelected(tool.grade_levels ?? []);
      setError(null);
      setIsEditing(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const result = await updateTool(tool.id, { grade_levels: selected });
    if (result.success) {
      router.refresh();
      setIsEditing(false);
    } else {
      setError(result.error);
    }
    setSaving(false);
  }

  const showEditView = canEdit && isEditing;

  return (
    <Card className={canEdit ? "flex flex-col gap-4" : "space-y-2"}>
      <div className="flex items-start justify-between gap-2">
        <Card.Title className="min-w-0 flex-1">{tool.name}</Card.Title>
        {canEdit && !showEditView && (
          <Button
            variant="secondary"
            onClick={handleEdit}
            className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs"
            aria-label="Edit grade levels"
          >
            <Pencil className="size-3.5" />
            <span>Edit</span>
          </Button>
        )}
      </div>
      <div>
        <Card.Subtitle>{tool.description ?? "No description yet."}</Card.Subtitle>
        {!showEditView && tool.grade_levels && tool.grade_levels.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1">
            <span className="text-xs font-medium text-gray-500">Grade levels:</span>
            {[...(tool.grade_levels ?? [])]
              .sort(
                (a, b) =>
                  GRADE_LEVELS.indexOf(a as GradeLevel) - GRADE_LEVELS.indexOf(b as GradeLevel)
              )
              .map((level) => (
                <span
                  key={level}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700"
                >
                  {level}
                </span>
              ))}
          </div>
        )}
      </div>
      {showEditView && (
        <>
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
                    onChange={() => toggle(level)}
                    disabled={saving}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-wrap items-center justify-end gap-2 min-h-8">
              {saving ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-500">
                  <SavingSpinner />
                  Saving…
                </span>
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs"
                  >
                    <Save className="size-3.5" />
                    <span>Save</span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCancel}
                    className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs"
                  >
                    <X className="size-3.5" />
                    <span>Cancel</span>
                  </Button>
                </>
              )}
            </div>
            {error && (
              <p className="w-full text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
