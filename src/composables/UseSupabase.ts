import { createClient } from "@supabase/supabase-js";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

const router = useRouter();

// these can come from an environment variable if desired
// not required however as they are 100% exposed on the client side anyway
// and that's ok, Supabase expects this (security is provided by Row Level Security)
const supabaseUrl = "https://uaqzqqxxdevbotrtgbst.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcXpxcXh4ZGV2Ym90cnRnYnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczNzExMTQsImV4cCI6MTk4Mjk0NzExNH0.23UEnQA3dJNTgN8Ae4_YPPHvrIktkVdzc-vhQgqQIy4";

// setup client
const supabase: any = createClient(supabaseUrl, supabaseKey);

// setup auth state listener
supabase.auth.onAuthStateChange((event: any, session: any) => {
  console.log("onAuthStateChange", event, session);
  if (event === "PASSWORD_RECOVERY") {
    router.push({ name: "PasswordReset" });
  }
  // the "event" is a string indicating what trigger the state change (ie. SIGN_IN, SIGN_OUT, etc)
  // the session contains info about the current session most importanly the user dat
  const { user } = useAuthUser();

  // if the user exists in the session we're logged in
  // and we can set our user reactive ref
  user.value = session?.user || null;
});

// expose supabase client
export default function useSupabase() {
  return { supabase };
}
