-- Add UPDATE policy for profiles table so users can update their own profiles
CREATE POLICY "update own profile" 
ON public.profiles 
FOR UPDATE 
USING (id = auth.uid());

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (
    NEW.id, 
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Create trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();