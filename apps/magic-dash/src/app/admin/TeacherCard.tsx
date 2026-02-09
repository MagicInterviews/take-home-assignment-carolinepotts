"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { updateTeacher } from "./actions";
import { Card, Button, cn } from "@magic-dash/ui";
import { GradeLevelDisplay } from "@/app/components/GradeLevelDisplay";
import { GradeLevelCheckboxes } from "@/app/components/GradeLevelCheckboxes";

type Teacher = {
  id: string;
  name: string;
  active: boolean;
  organization_id: string;
  grade_levels: string[] | null;
};

type TeacherCardProps = {
  teacher: Teacher;
};

function SavingSpinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<string[]>(teacher.grade_levels ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setError(null);
  }

  function handleEdit() {
    setSelected(teacher.grade_levels ?? []);
    setError(null);
    setIsEditing(true);
  }

  function handleCancel() {
    if (!saving) {
      setSelected(teacher.grade_levels ?? []);
      setError(null);
      setIsEditing(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const result = await updateTeacher(teacher.id, { grade_levels: selected });
    if (result.success) {
      router.refresh();
      setIsEditing(false);
    } else {
      setError(result.error);
    }
    setSaving(false);
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Card.Title>{teacher.name}</Card.Title>
          {!isEditing && <GradeLevelDisplay grade_levels={teacher.grade_levels} />}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold border",
              teacher.active
                ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                : "border-amber-300 bg-amber-100 text-amber-700"
            )}
          >
            {teacher.active ? "Active" : "Inactive"}
          </span>
          {!isEditing && (
            <Button
              variant="secondary"
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs"
              aria-label="Edit grade levels"
            >
              <Pencil className="size-3.5" />
              <span>Edit</span>
            </Button>
          )}
        </div>
      </div>
      {isEditing && (
        <>
          <GradeLevelCheckboxes selected={selected} onToggle={toggle} disabled={saving} />
          <div className="flex flex-col items-end gap-2">
            <div className="flex min-h-8 flex-wrap items-center justify-end gap-2">
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
