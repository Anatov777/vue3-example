<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { Ref } from "vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps<{
  newPassword: string;
  newPasswordRepeat: string;
}>();

const emit = defineEmits<{
  (event: "inputNewPassword", newPassword: string): void;
  (event: "inputNewPasswordRepeat", newPasswordRepeat: string): void;
}>();

const newPasswordModel: Ref<string> = ref(props.newPassword);
const newPasswordRepeatModel: Ref<string> = ref(props.newPasswordRepeat);

const rules = computed(() => ({
  newPasswordModel: {
    required,
  },
  newPasswordRepeatModel: {
    required,
  },
}));

const state = reactive({
  newPasswordModel,
  newPasswordRepeatModel,
});
const v$ = useVuelidate(rules, state);
</script>

<template>
  <label>
    Пароль
    <input
      v-model="newPasswordModel"
      type="password"
      @input="emit('inputNewPassword', newPasswordModel)"
    />
  </label>
  <label>
    Повторите пароль
    <input
      v-model="newPasswordRepeatModel"
      type="password"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{
        'border-red-500':
          v$.newPasswordRepeatModel.$dirty && v$.newPasswordRepeatModel.$error,
      }"
      @blur="v$.newPasswordRepeatModel.$touch"
      @input="emit('inputNewPasswordRepeat', newPasswordRepeatModel)"
    />
  </label>
  <p
    v-if="v$.newPasswordRepeatModel.$dirty && v$.newPasswordRepeatModel.$error"
    class="text-red-500 text-xs italic mb-3"
  >
    Please choose a password.
  </p>
</template>
