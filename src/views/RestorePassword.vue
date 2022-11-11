<script setup lang="ts">
import useAuthUser from "@/composables/UseAuthUser";
import { ref } from "vue";

import PasswordFields from "@/components/forms/PasswordFields.vue";

const { updateUser } = useAuthUser();

const newPassword = ref("");
const newPasswordRepeat = ref("");

const handlePasswordUpdate = async () => {
  //   await sendPasswordRestEmail(email.value);
  await updateUser({ password: newPassword.value });
};
const onInputNewPassword = async (newPasswordValue: string) => {
  newPassword.value = newPasswordValue;
};
const onInputNewPasswordRepeat = async (newPasswordRepeatValue: string) => {
  newPasswordRepeat.value = newPasswordRepeatValue;
};
</script>
<template>
  <form class="max-w-lg m-auto" @submit.prevent="handlePasswordUpdate()">
    <h1 class="text-3xl mb-5">Введите новый пароль</h1>
    NewPassword = {{ newPassword }} NewPasswordRepeat = {{ newPasswordRepeat }}
    <PasswordFields
      :newPassword="newPassword"
      :newPasswordRepeat="newPasswordRepeat"
      @inputNewPassword="onInputNewPassword($event)"
      @inputNewPasswordRepeat="onInputNewPasswordRepeat($event)"
    />
    <button>Сохранить</button>
  </form>
</template>
