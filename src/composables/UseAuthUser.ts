import useSupabase from '@/composables/UseSupabase';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { User } from '@supabase/supabase-js';
import type { LoginModel, RegisterModel, AuthUser } from '@/models/AuthModel';

const user: Ref<User | null> = ref(null);

export default function useAuthUser(): AuthUser {
  const { supabase } = useSupabase();

  const login = async ({
    email,
    password,
  }: LoginModel): Promise<User | null> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  };

  /**
   * Login with refresh token
   * Useful for logging in after email confirmations
   */
  const loginWithRefreshToken = async (token: any) => {
    // const { user, error } = await supabase.auth.signInWithOAuth({
    //   refreshToken: token,
    // });
    // if (error) throw error;
    // return user;
  };

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = (): boolean => {
    return !!user.value;
  };

  const register = async ({
    email,
    password,
    ...meta
  }: RegisterModel): Promise<User | null> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: meta,
        emailRedirectTo: `${window.location.origin}/profile?fromEmail=registrationConfirmation"`,
      },
    });
    if (error) throw error;
    return data.user;
  };

  const updateUser = async (dataToUpdate: any) => {
    const { data, error } = await supabase.auth.updateUser(dataToUpdate);
    if (error) throw error;
    return data.user;
  };

  const sendPasswordRestEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/password-reset',
    });
    if (error) throw error;
    return data;
  };

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
