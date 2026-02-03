DO $$
DECLARE
    org_1_id UUID;
    org_2_id UUID;

    north_admin1_id UUID;
    north_admin2_id UUID;
    
    blue_admin1_id UUID;
    blue_admin2_id UUID;

BEGIN

    SELECT id INTO org_1_id FROM organizations WHERE name = 'North Ridge Schools';
    SELECT id INTO org_2_id FROM organizations WHERE name = 'Blue Valley District';

    SELECT insert_user('admin1@north-ridge.edu') INTO north_admin1_id;
    SELECT insert_user('admin2@north-ridge.edu') INTO north_admin2_id;

    SELECT insert_user('admin1@blue-valley.edu') INTO blue_admin1_id;
    SELECT insert_user('admin2@blue-valley.edu') INTO blue_admin2_id;
    
    INSERT INTO admins (id, user_id, organization_id, name) VALUES
    (
        uuid_generate_v4(),
        north_admin1_id,
        org_1_id,
        'Barney Pudowski'
    ),
    (
        uuid_generate_v4(),
        north_admin2_id,
        org_1_id,
        'Ron Bintscatsco'
    ),
    (
        uuid_generate_v4(),
        blue_admin1_id,
        org_2_id,
        'Linda Mitchell'
    ),
    (
        uuid_generate_v4(),
        blue_admin2_id,
        org_2_id,
        'Amanda Clarke'
    );
END $$;
