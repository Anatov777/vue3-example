<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minLength, email } from "@vuelidate/validators";

import PasswordConfirmationFieldGroup from "@/components/forms/PasswordConfirmationFieldGroup.vue";
import BaseInput from "@/components/forms/BaseInput.vue";

const router = useRouter();
const { register } = useAuthUser();

const form = ref({
  name: "",
  email: "",
  password: "",
  isValidPassword: false,
});

const rules = computed(() => ({
  form: {
    name: {
      required: helpers.withMessage("Поле не заполнено", required),
      minLength: helpers.withMessage(
        "Имя должно быть минимум из 2-х символов",
        minLength(2)
      ),
    },
    email: {
      required: helpers.withMessage("Поле не заполнено", required),
      email: helpers.withMessage("Неверный формат Email", email),
    },
  },
}));

const state = reactive({
  form,
});
const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  try {
    const isValidForm = await v$.value.$validate();
    if (isValidForm && form.value.isValidPassword) {
      await register(form.value);
      router.push({
        name: "EmailConfirmation",
        query: { email: form.value.email },
      });
    }
  } catch (error: any) {
    alert(error.message);
  }
};
const onUpdatePasswordConfirmationFormValidation = (isValid: boolean) => {
  form.value.isValidPassword = isValid;
};
</script>
<template>
  <form class="max-w-lg m-auto" @submit.prevent="handleSubmit">
    <h1 class="text-3xl mb-5">Регистрация</h1>
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
    <button>Зарегистрироваться</button>
  </form>
</template>
