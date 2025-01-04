-- Drop the trigger and function if they exist
drop trigger if exists on_auth_user_created on auth.users;
DROP FUNCTION IF exists public.handle_new_user();

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
BEGIN
  INSERT INTO public.profiles (id, name, email, "profilePhoto")
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'name',       -- Default to an empty string
    NEW.raw_user_meta_data ->> 'email',      -- Default to an empty string
    NEW.raw_user_meta_data ->> 'avatar_url'  -- Default to an empty string
  );
  RETURN NEW;
END;
$$;

-- Create new trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
