DO $$
DECLARE
  org_1_id UUID;
  org_2_id UUID;

  north_teacher1_id UUID;
  north_teacher2_id UUID;
  north_teacher3_id UUID;
  north_teacher4_id UUID;
  north_teacher5_id UUID;
  north_teacher6_id UUID;

  blue_teacher1_id UUID;
  blue_teacher2_id UUID;
  blue_teacher3_id UUID;
  blue_teacher4_id UUID;
  blue_teacher5_id UUID;
  blue_teacher6_id UUID;
BEGIN

  SELECT id INTO org_1_id FROM organizations WHERE name = 'North Ridge Schools';
  SELECT id INTO org_2_id FROM organizations WHERE name = 'Blue Valley District';

  SELECT insert_user('teacher1@north-ridge.edu') INTO north_teacher1_id;
  SELECT insert_user('teacher2@north-ridge.edu') INTO north_teacher2_id;
  SELECT insert_user('teacher3@north-ridge.edu') INTO north_teacher3_id;
  SELECT insert_user('teacher4@north-ridge.edu') INTO north_teacher4_id;
  SELECT insert_user('teacher5@north-ridge.edu') INTO north_teacher5_id;
  SELECT insert_user('teacher6@north-ridge.edu') INTO north_teacher6_id;

  SELECT insert_user('teacher1@blue-valley.edu') INTO blue_teacher1_id;
  SELECT insert_user('teacher2@blue-valley.edu') INTO blue_teacher2_id;
  SELECT insert_user('teacher3@blue-valley.edu') INTO blue_teacher3_id;
  SELECT insert_user('teacher4@blue-valley.edu') INTO blue_teacher4_id;
  SELECT insert_user('teacher5@blue-valley.edu') INTO blue_teacher5_id;
  SELECT insert_user('teacher6@blue-valley.edu') INTO blue_teacher6_id;
  
  INSERT INTO teachers (id, user_id, organization_id, name, active, grade_levels) VALUES
  (
    uuid_generate_v4(),
    north_teacher1_id,
    org_1_id,
    'Priya Shah',
    true,
    ARRAY['K','1','2']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    north_teacher2_id,
    org_1_id,
    'Samuel Brooks',
    false,
    ARRAY['3','4','5']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    north_teacher3_id,
    org_1_id,
    'Monica Patel',
    true,
    ARRAY['pre-K','K']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    north_teacher4_id,
    org_1_id,
    'Fatima Hassan',
    true,
    ARRAY['6','7','8']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    north_teacher5_id,
    org_1_id,
    'David Li',
    true,
    ARRAY['9','10','11','12']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    north_teacher6_id,
    org_1_id,
    'Claire Novak',
    true,
    '{}'::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    blue_teacher1_id,
    org_2_id,
    'Elliot Kim',
    false,
    ARRAY['1','2','3']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    blue_teacher2_id,
    org_2_id,
    'Rosa Diaz',
    true,
    ARRAY['K','1','2','3','4','5']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    blue_teacher3_id,
    org_2_id,
    'Hannah Wang',
    true,
    ARRAY['4','5','6']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    blue_teacher4_id,
    org_2_id,
    'Mateo Cruz',
    true,
    ARRAY['7','8']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    blue_teacher5_id,
    org_2_id,
    'Lena Müller',
    true,
    ARRAY['pre-K','K','1']::grade_level_enum[]
  ),
  (
    uuid_generate_v4(),
    blue_teacher6_id,
    org_2_id,
    'Omar El-Sayed',
    true,
    ARRAY['10','11','12']::grade_level_enum[]
  );
END $$;