-- Reuse existing grade_level_enum from add_grade_levels_to_tools migration.
ALTER TABLE teachers
  ADD COLUMN grade_levels grade_level_enum[] DEFAULT '{}';
