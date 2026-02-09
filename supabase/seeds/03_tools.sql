
DO $$
DECLARE
  north_teacher3_user_id UUID;
  north_teacher4_user_id UUID;
  north_teacher5_user_id UUID;
  blue_teacher1_user_id UUID;
  blue_teacher2_user_id UUID;
  blue_teacher3_user_id UUID;

  north_teacher3_id UUID;
  north_teacher4_id UUID;
  north_teacher5_id UUID;
  blue_teacher1_id UUID;
  blue_teacher2_id UUID;
  blue_teacher3_id UUID;

  lesson_planner_id UUID;
  behavior_tracker_id UUID;
  reading_coach_id UUID;
  math_practice_id UUID;
BEGIN
  SELECT id INTO north_teacher3_user_id FROM auth.users WHERE email = 'teacher3@north-ridge.edu';
  SELECT id INTO north_teacher4_user_id FROM auth.users WHERE email = 'teacher4@north-ridge.edu';
  SELECT id INTO north_teacher5_user_id FROM auth.users WHERE email = 'teacher5@north-ridge.edu';
  SELECT id INTO blue_teacher1_user_id FROM auth.users WHERE email = 'teacher1@blue-valley.edu';
  SELECT id INTO blue_teacher2_user_id FROM auth.users WHERE email = 'teacher2@blue-valley.edu';
  SELECT id INTO blue_teacher3_user_id FROM auth.users WHERE email = 'teacher3@blue-valley.edu';

  SELECT id INTO north_teacher3_id FROM teachers WHERE user_id = north_teacher3_user_id;
  SELECT id INTO north_teacher4_id FROM teachers WHERE user_id = north_teacher4_user_id;
  SELECT id INTO north_teacher5_id FROM teachers WHERE user_id = north_teacher5_user_id;
  SELECT id INTO blue_teacher1_id FROM teachers WHERE user_id = blue_teacher1_user_id;
  SELECT id INTO blue_teacher2_id FROM teachers WHERE user_id = blue_teacher2_user_id;
  SELECT id INTO blue_teacher3_id FROM teachers WHERE user_id = blue_teacher3_user_id;

  INSERT INTO tools (name, description, grade_levels)
  VALUES ('Lesson Planner', 'Build weekly lesson plans and share with your grade team.', ARRAY['K','1','2','3','4','5']::grade_level_enum[])
  RETURNING id INTO lesson_planner_id;

  INSERT INTO tools (name, description, grade_levels)
  VALUES ('Behavior Tracker', 'Log behavior incidents and generate quick summaries.', ARRAY['K','1','2','3','4','5','6','7','8','9','10','11','12']::grade_level_enum[])
  RETURNING id INTO behavior_tracker_id;

  INSERT INTO tools (name, description, grade_levels)
  VALUES ('Reading Coach', 'Personalized reading passages with progress tracking.', ARRAY['pre-K','K','1','2','3']::grade_level_enum[])
  RETURNING id INTO reading_coach_id;

  INSERT INTO tools (name, description, grade_levels)
  VALUES ('Math Practice', 'Adaptive math drills for daily warm-ups.', ARRAY['1','2','3','4','5','6']::grade_level_enum[])
  RETURNING id INTO math_practice_id;

  INSERT INTO teacher_tools (id, teacher_id, tool_id, disabled) VALUES
  (uuid_generate_v4(), north_teacher3_id, lesson_planner_id, true),
  (uuid_generate_v4(), north_teacher3_id, reading_coach_id, true),
  (uuid_generate_v4(), north_teacher4_id, behavior_tracker_id, true),
  (uuid_generate_v4(), north_teacher5_id, math_practice_id, true),
  (uuid_generate_v4(), blue_teacher1_id, lesson_planner_id, true),
  (uuid_generate_v4(), blue_teacher2_id, reading_coach_id, true),
  (uuid_generate_v4(), blue_teacher3_id, behavior_tracker_id, true);
END $$;
