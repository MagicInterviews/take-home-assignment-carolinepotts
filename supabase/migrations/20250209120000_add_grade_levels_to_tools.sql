-- Grade levels: pre-K, K, 1–12 (14 values). Keep in sync with app GradeLevel enum.
CREATE TYPE grade_level_enum AS ENUM (
  'pre-K', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
);

ALTER TABLE tools
  ADD COLUMN grade_levels grade_level_enum[] DEFAULT '{}';
