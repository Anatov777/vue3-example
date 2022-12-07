import { createClient } from '@supabase/supabase-js';
import useAuthUser from '@/composables/UseAuthUser';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import type { Ref } from 'vue';
import type { SupabaseClient, AuthChangeEvent, Session, User } from '@supabase/supabase-js';

const router: Router = useRouter();

const supabaseUrl: string = 'https://uaqzqqxxdevbotrtgbst.supabase.co';
const supabaseKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcXpxcXh4ZGV2Ym90cnRnYnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczNzExMTQsImV4cCI6MTk4Mjk0NzExNH0.23UEnQA3dJNTgN8Ae4_YPPHvrIktkVdzc-vhQgqQIy4';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null): void => {
  if (event === 'PASSWORD_RECOVERY') {
    router.push({ name: 'PasswordReset' });
  }
  const { user }: { user: Ref<User | null> } = useAuthUser();
  user.value = session?.user || null;
});

export default function useSupabase(): { supabase: SupabaseClient } {
  return { supabase };
}
