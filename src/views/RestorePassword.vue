<script setup lang="ts">
import useAuthUser from "@/composables/UseAuthUser";
import { ref } from "vue";

const { updateUser } = useAuthUser();

const newPassword = ref("");
const newPasswordRepeat = ref("");

const handlePasswordUpdate = async () => {
  //   await sendPasswordRestEmail(email.value);
  //   alert(`Password reset email sent to: ${email.value}`);
  await updateUser({ password: newPassword.value });
  alert("Пароль изменен!");
};
</script>
<template>
  <form class="max-w-lg m-auto" @submit.prevent="handlePasswordUpdate()">
    <h1 class="text-3xl mb-5">Введите новый пароль</h1>
    <label>
      Пароль
      <input
        v-model="newPassword"
        type="password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <label>
      Повторите пароль
      <input
        v-model="newPasswordRepeat"
        type="password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        :class="{ 'border-red-500': true }"
      />
    </label>
    <p class="text-red-500 text-xs italic mb-3">Please choose a password.</p>
    <button>Сохранить</button>
  </form>
</template>
