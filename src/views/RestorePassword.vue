<script setup lang="ts">
import useAuthUser from "@/composables/UseAuthUser";
import { ref } from "vue";
import type { Ref } from "vue";

import PasswordConfirmationFieldGroup from "@/components/forms/PasswordConfirmationFieldGroup.vue";

const { updateUser } = useAuthUser();

const newPassword: Ref<string> = ref("");
const isValidForm: Ref<boolean> = ref(false);

const handlePasswordUpdate = async () => {
  if (isValidForm.value) {
    await updateUser({ password: newPassword.value });
  }
};
const onUpdatePasswordConfirmationFormValidation = (isValid: boolean) => {
  console.log("isValid", isValid);
  isValidForm.value = isValid;
};
</script>
<template>
  <form class="max-w-lg m-auto" @submit.prevent="handlePasswordUpdate()">
    <h1 class="text-3xl mb-5">Введите новый пароль</h1>
    <PasswordConfirmationFieldGroup
      v-model:newPassword="newPassword"
      @update:isValid="onUpdatePasswordConfirmationFormValidation($event)"
    />
    <button>Сохранить</button>
  </form>
</template>
