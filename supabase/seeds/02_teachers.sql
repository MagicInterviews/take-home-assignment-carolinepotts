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
  
  INSERT INTO teachers (id, user_id, organization_id, name, active) VALUES
  (
    uuid_generate_v4(),
    north_teacher1_id,
    org_1_id,
    'Priya Shah',
    true
  ),
  (
    uuid_generate_v4(),
    north_teacher2_id,
    org_1_id,
    'Samuel Brooks',
    false
  ),
  (
    uuid_generate_v4(),
    north_teacher3_id,
    org_1_id,
    'Monica Patel',
    true
  ),
  (
    uuid_generate_v4(),
    north_teacher4_id,
    org_1_id,
    'Fatima Hassan',
    true
  ),
  (
    uuid_generate_v4(),
    north_teacher5_id,
    org_1_id,
    'David Li',
    true
  ),
  (
    uuid_generate_v4(),
    north_teacher6_id,
    org_1_id,
    'Claire Novak',
    true
  ),
  (
    uuid_generate_v4(),
    blue_teacher1_id,
    org_2_id,
    'Elliot Kim',
    false
  ),
  (
    uuid_generate_v4(),
    blue_teacher2_id,
    org_2_id,
    'Rosa Diaz',
    true
  ),
  (
    uuid_generate_v4(),
    blue_teacher3_id,
    org_2_id,
    'Hannah Wang',
    true
  ),
  (
    uuid_generate_v4(),
    blue_teacher4_id,
    org_2_id,
    'Mateo Cruz',
    true
  ),
  (
    uuid_generate_v4(),
    blue_teacher5_id,
    org_2_id,
    'Lena Müller',
    true
  ),
  (
    uuid_generate_v4(),
    blue_teacher6_id,
    org_2_id,
    'Omar El-Sayed',
    true
  );
END $$;