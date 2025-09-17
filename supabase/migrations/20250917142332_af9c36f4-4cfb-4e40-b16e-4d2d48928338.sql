-- Update existing profile with the correct Google auth data
-- This is a one-time fix for existing users who signed up before the trigger was added
UPDATE public.profiles 
SET 
  display_name = 'Nithin Vvn',
  avatar_url = 'https://lh3.googleusercontent.com/a/ACg8ocI_SlNKzhxH_goZw9EIVkhKO3-T4KfeYr6tF5J-vq7ijF6ai53LTA=s96-c',
  full_name = 'Nithin Vvn'
WHERE id = '83863f46-0026-4d3e-a359-499402148139';