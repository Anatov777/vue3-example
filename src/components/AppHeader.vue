<script setup lang="ts">
import useAuthUser from '@/composables/UseAuthUser';
import BurgerMenu from '@/components/BurgerMenu.vue';

import { ref, watch } from 'vue';
import type { Ref } from 'vue';

const isShowBurgerMenu: Ref<boolean> = ref(false);

console.log(this)

const { isLoggedIn } = useAuthUser();
</script>
<template>
  <header class="header">
    <nav class="header__menu">
      <ul class="header__list">
        <li v-if="isShowBurgerMenu" class="header__list-item">
          <BurgerMenu :is-logged-in="isLoggedIn()" />
        </li>
        <li class="header__list-item">
          <router-link :to="{ name: 'Home' }" class="header__link">
            Главная
          </router-link>
        </li>
        <li class="header__list-item">
          <router-link :to="{ name: 'Profile' }" class="header__link">
            Профиль
          </router-link>
        </li>
      </ul>
      <ul v-if="isLoggedIn()" class="header__list">
        <li class="header__list-item">
          <router-link :to="{ name: 'Logout' }" class="header__link">
            Выйти
          </router-link>
        </li>
      </ul>
      <ul v-else class="header__list">
        <li class="header__list-item">
          <router-link :to="{ name: 'Login' }" class="header__link">
            Вход
          </router-link>
        </li>
        <li class="header__list-item">
          <router-link :to="{ name: 'Register' }" class="header__link">
            Регистрация
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style lang="postcss">
.header {
  @apply bg-gray-700 text-white;
  &__menu {
    @apply flex justify-between;
  }
  &__list {
    @apply flex;
    &-item {
      @apply flex items-center;
    }
  }
  &__link {
    @apply hover:bg-gray-500;
    @apply transition-all ease-in-out duration-300 p-5;
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
