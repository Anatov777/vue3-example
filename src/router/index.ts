import { createRouter, createWebHistory } from "vue-router";
import useAuthUser from "@/composables/UseAuthUser";
import type { RouteRecordRaw } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "EmailConfirmation",
      path: "/email-confirmation",
      component: () => import("@/views/EmailConfirmation.vue"),
    },
    {
      name: "Home",
      path: "/",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      name: "Profile",
      path: "/profile",
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/views/ProfileView.vue"),
    },
    {
      name: "Login",
      path: "/login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      name: "ForgotPassword",
      path: "/forgotPassword",
      component: () => import("@/views/ForgotPassword.vue"),
    },
    {
      name: "PasswordReset",
      path: "/password-reset",
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/views/RestorePassword.vue"),
    },
    {
      name: "Logout",
      path: "/logout",
      beforeEnter: async () => {
        const { logout } = useAuthUser();
        await logout();
        return { name: "Home" };
      },
    },
    {
      name: "Register",
      path: "/register",
      component: () => import("@/views/RegisterView.vue"),
    },
  ] as RouteRecordRaw[],
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  if (
    !isLoggedIn() &&
    to.meta.requiresAuth &&
    !Object.keys(to.query).includes("fromEmail")
  ) {
    return { name: "Login" };
  }
});

export default router;
