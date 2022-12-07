<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, email } from '@vuelidate/validators';

import useAuthUser from '@/composables/UseAuthUser';
import BaseInput from '@/components/forms/BaseInput.vue';

import type { Ref } from 'vue';

const { sendPasswordRestEmail } = useAuthUser();

interface ForgotPasswordModel {
  email: string;
}

const form: Ref<ForgotPasswordModel> = ref({
  email: '',
});

const rules = computed(() => ({
  form: {
    email: {
      required: helpers.withMessage('Поле не заполнено', required),
      email: helpers.withMessage('Неверный формат Email', email),
    },
  },
}));

const state = reactive({
  form,
});
const v$ = useVuelidate(rules, state);

const handlePasswordReset  = async (): Promise<void> => {
  try {
    const isValidForm: boolean = await v$.value.$validate();
    if (isValidForm) {
      await sendPasswordRestEmail(form.value.email);
      alert(`Password reset email sent to: ${form.value.email}`);
    }
  } catch (error: any) {
    alert(error.message);
  }
};
</script>
<template>
  <form class="form-base" @submit.prevent="handlePasswordReset()">
    <h1 class="form-title">Забыли пароль?</h1>
    <BaseInput
      v-model="form.email"
      label="Email"
      input-type="email"
      :errors="v$.form.email.$silentErrors"
      :has-error="v$.form.email.$error"
      @blur="v$.form.email.$touch()"
    />
    <button class="mt-10">Отправить письмо для сброса</button>
  </form>
</template>
