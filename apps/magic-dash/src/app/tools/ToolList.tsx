"use client";

import type { ToolItem } from "@/lib/tools";
import { SearchTextField } from "@magic-dash/ui";
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
  const normalizedQuery = query.trim().toLowerCase();

  const visibleTools = useMemo(() => {
    if (!normalizedQuery) return tools;

    return tools.filter((tool) => {
      const haystack = `${tool.name} ${tool.description ?? ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, tools]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {organizationName}
          </p>
          <h1 className="text-2xl font-semibold">Tools for {teacherName}</h1>
          <p className="text-sm text-gray-600">{tools.length} tools assigned</p>
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
      <div className="mt-6 grid gap-4">
        {visibleTools.length === 0 ? (
          <p className="text-sm text-gray-600">No tools match this search.</p>
        ) : (
          visibleTools.map((tool) => <ToolCard key={tool.id} tool={tool} canEdit={canEdit} />)
        )}
      </div>
    </div>
  );
}
