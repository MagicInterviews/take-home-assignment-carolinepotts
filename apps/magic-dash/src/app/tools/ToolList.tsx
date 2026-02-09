"use client";

import { GRADE_LEVELS } from "@/lib/constants";
import type { ToolItem } from "@/lib/tools";
import { SearchTextField } from "@magic-dash/ui";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { ToolCard } from "./ToolCard";

type ToolListProps = {
  tools: ToolItem[];
  teacherName: string;
  organizationName: string;
  teacherActive: boolean;
  canEdit?: boolean;
};

export function ToolList({
  tools,
  teacherName,
  organizationName,
  teacherActive,
  canEdit = false,
}: ToolListProps) {
  const [query, setQuery] = useState("");
  const [selectedGradeLevels, setSelectedGradeLevels] = useState<string[]>([]);
  const normalizedQuery = query.trim().toLowerCase();

  const visibleTools = useMemo(() => {
    let result = tools;
    if (normalizedQuery) {
      result = result.filter((tool) => {
        const haystack = `${tool.name} ${tool.description ?? ""}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      });
    }
    if (selectedGradeLevels.length > 0) {
      result = result.filter((tool) =>
        selectedGradeLevels.every((g) => tool.grade_levels?.includes(g))
      );
    }
    return result;
  }, [normalizedQuery, selectedGradeLevels, tools]);

  const filtersActive = normalizedQuery.length > 0 || selectedGradeLevels.length > 0;
  const filtersAppliedCount = selectedGradeLevels.length;

  function toggleGradeLevel(level: string) {
    setSelectedGradeLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {organizationName}
          </p>
          <h1 className="text-2xl font-semibold">Tools for {teacherName}</h1>
          <p className="text-sm text-gray-600">
            {filtersActive
              ? `Showing ${visibleTools.length} of ${tools.length} tools`
              : `${tools.length} tools assigned`}
          </p>
        </div>
        <SearchTextField
          name="tool-search"
          onSubmit={(event) => event.preventDefault()}
          controlProps={{
            value: query,
            onChange: (event) => setQuery(event.currentTarget.value),
            placeholder: "Search tools",
          }}
        />
      </div>
      {!teacherActive && (
        <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          This teacher account is currently inactive. Access to tools may be limited.
        </div>
      )}
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
                  onClick={() => toggleGradeLevel(level)}
                  className={
                    selected
                      ? "inline-flex rounded-full border border-gray-700 bg-gray-700 px-2.5 py-1 text-xs font-medium text-white hover:bg-gray-600"
                      : "inline-flex rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                  }
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {visibleTools.length === 0 ? (
          <p className="text-sm text-gray-600">
            No tools match your{" "}
            {normalizedQuery && selectedGradeLevels.length > 0
              ? "search and filters."
              : normalizedQuery
              ? "search."
              : selectedGradeLevels.length > 0
              ? "filters."
              : "criteria."}
          </p>
        ) : (
          visibleTools.map((tool) => <ToolCard key={tool.id} tool={tool} canEdit={canEdit} />)
        )}
      </div>
    </div>
  );
}
