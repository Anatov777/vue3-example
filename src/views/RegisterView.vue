<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, minLength, email } from '@vuelidate/validators';

import type { Router } from 'vue-router';
import type { RegisterModel } from '@/models/AuthModel';
import type { Ref } from 'vue';

import useAuthUser from '@/composables/UseAuthUser';
import PasswordConfirmationFieldGroup from '@/components/forms/PasswordConfirmationFieldGroup.vue';
import BaseInput from '@/components/forms/BaseInput.vue';

const router: Router = useRouter();
const { register } = useAuthUser();

const form: Ref<RegisterModel> = ref({
  name: '',
  email: '',
  password: '',
});
const isValidPassword: Ref<boolean> = ref(false);

const rules = computed(() => ({
  form: {
    name: {
      required: helpers.withMessage('Поле не заполнено', required),
      minLength: helpers.withMessage(
        'Имя должно быть минимум из 2-х символов',
        minLength(2)
      ),
    },
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

const handleSubmit = async (): Promise<void> => {
  try {
    const isValidForm = await v$.value.$validate();
    if (isValidForm && isValidPassword.value) {
      await register(form.value);
      router.push({
        name: 'EmailConfirmation',
        query: { email: form.value.email },
      });
    }
  } catch (error: any) {
    alert(error.message);
  }
};
const onUpdatePasswordConfirmationFormValidation = (isValid: boolean): void => {
  isValidPassword.value = isValid;
};
</script>
<template>
  <form class="form-base" @submit.prevent="handleSubmit">
    <h1 class="form-title">Регистрация</h1>
    <BaseInput
      v-model="form.name"
      label="Имя"
      input-type="text"
      :errors="v$.form.name.$silentErrors"
      :has-error="v$.form.name.$error"
      @blur="v$.form.name.$touch()"
    />
    <BaseInput
      v-model="form.email"
      label="Email"
      input-type="email"
      :errors="v$.form.email.$silentErrors"
      :has-error="v$.form.email.$error"
      @blur="v$.form.email.$touch()"
    />
    <PasswordConfirmationFieldGroup
      v-model:newPassword="form.password"
      @update:isValid="onUpdatePasswordConfirmationFormValidation($event)"
    />
    <button class="mt-10">Зарегистрироваться</button>
  </form>
</template>
