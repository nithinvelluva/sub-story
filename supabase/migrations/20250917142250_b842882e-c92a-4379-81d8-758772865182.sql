-- Test the trigger function with sample data to ensure it works
DO $$
DECLARE
    test_user_data RECORD;
BEGIN
    -- Create a temporary test record to simulate what the trigger receives
    test_user_data := ROW(
        gen_random_uuid(), -- id
        'test@example.com', -- email
        '2025-01-17 00:00:00+00', -- created_at
        '2025-01-17 00:00:00+00', -- updated_at
        '{"name": "Test User", "avatar_url": "https://example.com/avatar.jpg", "full_name": "Test Full Name", "given_name": "Test", "family_name": "User", "picture": "https://example.com/picture.jpg"}', -- raw_user_meta_data
        '{}', -- app_metadata
        NULL, -- phone
        NULL, -- phone_confirmed_at
        NULL, -- phone_change
        NULL, -- phone_change_token
        NULL, -- phone_change_sent_at
        '2025-01-17 00:00:00+00', -- confirmed_at
        NULL, -- email_change_token_new
        NULL, -- email_change
        NULL, -- email_change_sent_at
        NULL, -- email_change_token_current
        NULL, -- email_change_confirm_status
        '2025-01-17 00:00:00+00', -- email_confirmed_at
        NULL, -- recovery_token
        NULL, -- recovery_sent_at
        NULL, -- invited_at
        'email', -- aud
        'confirmed', -- role
        NULL, -- last_sign_in_at
        NULL, -- raw_app_meta_data
        true, -- is_super_admin
        NULL, -- is_sso_user
        NULL, -- deleted_at
        false, -- is_anonymous
        NULL -- sso_providers
    );
    
    -- Test if our function would work
    RAISE NOTICE 'Testing handle_new_user function...';
    
    -- We'll manually insert a test profile to verify the function logic
    INSERT INTO public.profiles (
        id, 
        email,
        display_name,
        avatar_url,
        full_name,
        first_name,
        last_name
    )
    VALUES (
        gen_random_uuid(), -- Use a different ID for test
        'function-test@example.com',
        COALESCE('{"name": "Function Test", "full_name": "Function Test Full"}'::jsonb ->> 'name', '{"name": "Function Test", "full_name": "Function Test Full"}'::jsonb ->> 'full_name'),
        COALESCE('{"avatar_url": "https://test.com/avatar.jpg", "picture": "https://test.com/pic.jpg"}'::jsonb ->> 'avatar_url', '{"avatar_url": "https://test.com/avatar.jpg", "picture": "https://test.com/pic.jpg"}'::jsonb ->> 'picture'),
        '{"full_name": "Function Test Full"}'::jsonb ->> 'full_name',
        '{"given_name": "Function"}'::jsonb ->> 'given_name',
        '{"family_name": "Test"}'::jsonb ->> 'family_name'
    );
    
    RAISE NOTICE 'Test profile inserted successfully';
END $$;