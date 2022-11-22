<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

type InputType = 'text' | 'number' | 'tel' | 'email' | 'password';

interface Props {
  id?: string;
  modelValue?: any;
  label: string;
  inputType?: InputType;
  placeholderText?: string;
  hasError: boolean;
  errors: any[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: '',
  inputType: 'text',
  hasError: false,
  errors: [] as any,
});

const emit = defineEmits<{
  (event: 'update:modelValue', inputValue: any): void;
  (event: 'blur', value: any): void;
}>();

const isShowPassword: Ref<boolean> = ref(false);

const initInputType = computed<string>(() => {
  if (props.inputType === 'password') {
    return isShowPassword.value ? 'text' : 'password';
  }
  return props.inputType;
});

const onInput = async (event: InputEvent | Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
};
const onBlur = async (event: FocusEvent) => {
  emit('blur', event);
};
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
  customOptions: {},
};
</script>

<template>
  <div class="base-input mb-5">
    <label v-if="!!label" class="base-input__label" :for="id">
      {{ label }}
    </label>

    <div class="base-input__field">
      <div class="base-input__field-wrap">
        <input
          :id="id || uuidv4()"
          class="base-input__input"
          :class="{ error: hasError }"
          :value="modelValue"
          :type="initInputType"
          :placeholder="placeholderText"
          v-bind="$attrs"
          @input="onInput($event)"
          @blur="onBlur($event)"
        />

        <div v-if="inputType === 'password'" class="base-input__eye">
          <img
            src="@/assets/images/eye.svg"
            alt="Посмотреть"
            @click="isShowPassword = !isShowPassword"
          />
        </div>
      </div>
      <template v-if="hasError">
        <template v-for="error in errors" :key="error.$uid">
          <transition name="fade">
            <div class="text-red-500 text-xs italic mb-3">
              {{ error.$message }}
            </div>
          </transition>
        </template>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.base-input {
  &__field-wrap {
    position: relative;
  }
  &__eye {
    display: flex;
    align-items: center;
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
