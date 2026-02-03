CREATE OR REPLACE FUNCTION insert_user(
    user_email TEXT
)
RETURNS UUID AS $$
DECLARE
    user_id UUID;
    user_password TEXT := 'testtest';
BEGIN
    -- Generate a new UUID for the user
    user_id := uuid_generate_v4();

    -- Insert the user into auth.users
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
        '00000000-0000-0000-0000-000000000000'::uuid,
        user_id,
        'authenticated',
        'authenticated',
        user_email,
        crypt(user_password, gen_salt('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}'::jsonb,
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        ''
    );

    -- Insert or update auth.identities with the specified email
    INSERT INTO auth.identities (
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) VALUES (
        user_id::text,
        user_id,
        jsonb_build_object(
            'sub', user_id::text,
            'email', user_email,
            'email_verified', true,
            'provider', 'email'
        ),
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    );

    RETURN user_id;
END;
$$ LANGUAGE plpgsql;
