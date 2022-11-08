<script setup lang="ts">
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";
// Use necessary composables
const router = useRouter();
const { login } = useAuthUser();
// keep up with form data
const form = ref({
  email: "",
  password: "",
});
// call the proper login method from the AuthUser composable
// on the submit of the form
const handleLogin = async () => {
  try {
    await login(form.value);
    router.push({ name: "Profile" });
  } catch (error: any) {
    alert(error.message);
  }
};
</script>
<template>
  <div class="max-w-lg m-auto">
    <form @submit.prevent="handleLogin()">
      <h1 class="text-3xl mb-5">Login</h1>
      <label>Email <input v-model="form.email" type="email" /></label>
      <label>Password <input v-model="form.password" type="password" /></label>
      <button>Login</button>
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </form>
  </div>
</template>
