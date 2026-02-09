import type { ToolItem } from "@/lib/tools";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { updateTool } from "./actions";
import { Card, Button } from "@magic-dash/ui";
import { GradeLevelDisplay } from "@/app/components/GradeLevelDisplay";
import { GradeLevelCheckboxes } from "@/app/components/GradeLevelCheckboxes";

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
        {!showEditView && <GradeLevelDisplay grade_levels={tool.grade_levels} />}
      </div>
      {showEditView && (
        <>
          <GradeLevelCheckboxes selected={selected} onToggle={toggle} disabled={saving} />
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
