"use client";

import { GradeLevelFilterPills } from "@/app/components/GradeLevelFilterPills";
import { SearchTextField } from "@magic-dash/ui";
import { useMemo, useState } from "react";
import { TeacherCard } from "./TeacherCard";

type Teacher = {
  id: string;
  name: string;
  active: boolean;
  organization_id: string;
  grade_levels: string[] | null;
};

type TeacherListProps = {
  teachers: Array<Teacher>;
  organizationName: string;
};

export function TeacherList({ teachers, organizationName }: TeacherListProps) {
  const [query, setQuery] = useState("");
  const [selectedGradeLevels, setSelectedGradeLevels] = useState<string[]>([]);
  const normalizedQuery = query.trim().toLowerCase();

  const visibleTeachers = useMemo(() => {
    let result = teachers;
    if (normalizedQuery) {
      result = result.filter((teacher) => {
        const haystack = `${teacher.name}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      });
    }
    if (selectedGradeLevels.length > 0) {
      result = result.filter((teacher) =>
        selectedGradeLevels.every((g) => teacher.grade_levels?.includes(g))
      );
    }
    return result;
  }, [normalizedQuery, selectedGradeLevels, teachers]);

  const filtersActive = normalizedQuery.length > 0 || selectedGradeLevels.length > 0;

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
            Organization
          </p>
          <h1 className="text-2xl font-semibold">{organizationName}</h1>
          <p className="text-sm text-gray-600">
            {filtersActive
              ? `Showing ${visibleTeachers.length} of ${teachers.length} teachers`
              : `${teachers.length} teachers`}
          </p>
        </div>
        <SearchTextField
          name="teacher-search"
          onSubmit={(event) => event.preventDefault()}
          controlProps={{
            value: query,
            onChange: (event) => setQuery(event.currentTarget.value),
            placeholder: "Search teachers",
          }}
        />
      </div>
      <GradeLevelFilterPills
        selectedGradeLevels={selectedGradeLevels}
        onToggleGradeLevel={toggleGradeLevel}
      />
      <div className="mt-6 grid gap-4">
        {visibleTeachers.length === 0 ? (
          <p className="text-sm text-gray-600">
            No teachers match your{" "}
            {normalizedQuery && selectedGradeLevels.length > 0
              ? "search and filters."
              : normalizedQuery
              ? "search."
              : selectedGradeLevels.length > 0
              ? "filters."
              : "criteria."}
          </p>
        ) : (
          visibleTeachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)
        )}
      </div>
    </div>
  );
}
