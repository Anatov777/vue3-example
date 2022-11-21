<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import type { Ref } from "vue";

import { useVuelidate } from "@vuelidate/core";
import { helpers, required, sameAs, minLength } from "@vuelidate/validators";

import BaseInput from "@/components/forms/BaseInput.vue";

const props = defineProps<{
  newPassword: string;
}>();

const emit = defineEmits<{
  (event: "update:newPassword", value: string): void;
  (event: "update:isValid", value: boolean): void;
}>();

const newPasswordModel: Ref<string> = ref(props.newPassword);
const newPasswordRepeatModel: Ref<string> = ref("");

const rules = computed(() => ({
  newPasswordModel: {
    required: helpers.withMessage("Поле не заполнено", required),
    minLength: helpers.withMessage(
      "Пароль должен быть минимум из 6-ти символов",
      minLength(6)
    ),
  },
  newPasswordRepeatModel: {
    required: helpers.withMessage("Поле не заполнено", required),
    sameAs: helpers.withMessage(
      "Пароли не совпадают",
      sameAs(newPasswordModel)
    ),
  },
}));

const state = reactive({
  newPasswordModel,
  newPasswordRepeatModel,
});
const v$ = useVuelidate(rules, state);

watch(
  v$,
  (newValue, oldValue) => {
    if (newValue.$invalid !== oldValue?.$invalid) {
      emit("update:isValid", !newValue.$invalid);
    }
  },
  { immediate: true }
);

const onInput = (event: any): void => {
  emit("update:newPassword", event);
};
</script>

<template>
  <BaseInput
    v-model="newPasswordModel"
    label="Пароль"
    input-type="password"
    :errors="v$.newPasswordModel.$silentErrors"
    :has-error="v$.newPasswordModel.$error"
    @update:modelValue="onInput($event)"
    @blur="v$.newPasswordModel.$touch()"
  />
  <BaseInput
    v-model="newPasswordRepeatModel"
    label="Повторите пароль"
    input-type="password"
    :errors="v$.newPasswordRepeatModel.$silentErrors"
    :has-error="v$.newPasswordRepeatModel.$error"
    @blur="v$.newPasswordRepeatModel.$touch()"
  />
</template>
