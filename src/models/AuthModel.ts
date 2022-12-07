import type { Ref } from 'vue';
import type { User } from '@supabase/supabase-js';

export interface AuthUser {
  user: Ref<User | null>;
  login: ({ email, password }: LoginModel) => Promise<User | null>;
  loginWithRefreshToken: (token: any) => Promise<void>;
  isLoggedIn: () => boolean;
  logout: () => Promise<void>;
  register: ({
    email,
    password,
    ...meta
  }: RegisterModel) => Promise<User | null>;
  updateUser: (dataToUpdate: any) => Promise<User>;
  sendPasswordRestEmail: (email: string) => Promise<{}>;
  maybeHandleEmailConfirmation: (route: any) => Promise<void>;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel extends LoginModel {
  name: string;
}
