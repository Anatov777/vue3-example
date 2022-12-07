<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import useAuthUser from '@/composables/UseAuthUser';
import { useRouter } from 'vue-router';

import { useVuelidate } from '@vuelidate/core';
import { helpers, required, minLength, email } from '@vuelidate/validators';

import type { Router } from 'vue-router';
import type { LoginModel } from '@/models/AuthModel';
import type { Ref } from 'vue';

import BaseInput from '@/components/forms/BaseInput.vue';

const router: Router = useRouter();
const { login } = useAuthUser();

const form: Ref<LoginModel> = ref({
  email: '',
  password: '',
});

const rules = computed(() => ({
  form: {
    email: {
      required: helpers.withMessage('Поле не заполнено', required),
      email: helpers.withMessage('Неверный формат Email', email),
    },
    password: {
      required: helpers.withMessage('Поле не заполнено', required),
      minLength: helpers.withMessage(
        'Пароль должен быть минимум из 6-ти символов',
        minLength(6)
      ),
    },
  },
}));

const state = reactive({
  form,
});
const v$ = useVuelidate(rules, state);

const handleLogin = async () => {
  try {
    const isValidForm: boolean = await v$.value.$validate();
    if (isValidForm) {
      await login(form.value);
      router.push({ name: 'Profile' });
    }
  } catch (error: any) {
    alert(error.message);
  }
};
const loginAsGuest = async () => {
  try {
    await login({
      email: 'testsupabase@gmail.com',
      password: 'test12345',
    });
    router.push({ name: 'Profile' });
  } catch (error: any) {
    alert(error.message);
  }
};
</script>
<template>
  <div>
    <form class="form-base" @submit.prevent="handleLogin()">
      <h1 class="form-title">Вход</h1>
      <BaseInput
        v-model="form.email"
        label="Email"
        input-type="email"
        :errors="v$.form.email.$silentErrors"
        :has-error="v$.form.email.$error"
        @blur="v$.form.email.$touch()"
      />
      <BaseInput
        v-model="form.password"
        label="Пароль"
        input-type="password"
        :errors="v$.form.password.$silentErrors"
        :has-error="v$.form.password.$error"
        @blur="v$.form.password.$touch()"
      />
      <button class="mt-10 mb-5">Войти</button>
      <router-link to="/forgotPassword" class="link-primary">
        Забыли пароль?
      </router-link>
      <div class="link-primary text-xs max-w-fit ml-auto" @click="loginAsGuest">Войти как гость</div>
    </form>
  </div>
</template>
