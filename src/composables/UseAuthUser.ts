import useSupabase from "@/composables/UseSupabase";
import { ref } from "vue";

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user: any = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();

  /**
   * Login with email and password
   */
  const login = async ({ email, password }: any) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return user;
  };

  /**
   * Login with refresh token
   * Useful for logging in after email confirmations
   */
  const loginWithRefreshToken = async (token: any) => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      refreshToken: token,
    });
    if (error) throw error;
    return user;
  };

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = supabase.auth.signOut();
    if (error) throw error;
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return !!user.value;
  };

  /**
   * Register
   */
  const register = async ({ email, password, ...meta }: any) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        //arbitrary meta data is passed as the second argument under a data key
        // to the Supabase signUp method
        data: meta,
        // the to redirect to after the user confirms their email
        emailRedirectTo: `${window.location.origin}/profile?fromEmail=registrationConfirmation"`,
      },
    });
    if (error) throw error;
    return user;
  };

  /**
   * Update user email, password, or meta data
   */
  const updateUser = async (data: any) => {
    const { user, error } = await supabase.auth.updateUser(data);
    if (error) throw error;
    return user;
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (email: any) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/password-reset",
    });
    if (error) throw error;
    return user;
  };

  /**
   * Will be useful for informing the application what to do
   * when Supabase redirects a user back to app
   * after confirming email address
   */
  const maybeHandleEmailConfirmation = async (route: any) => {};

  return {
    user,
    login,
    loginWithRefreshToken,
    isLoggedIn,
    logout,
    register,
    updateUser,
    sendPasswordRestEmail,
    maybeHandleEmailConfirmation,
  };
}
