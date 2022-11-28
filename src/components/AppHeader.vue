<script setup lang="ts">
import useAuthUser from '@/composables/UseAuthUser';
const { isLoggedIn } = useAuthUser();
</script>
<template>
  <header class="header">
    <ul class="header__list">
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
  </header>
</template>
<style lang="postcss">
.header {
  @apply flex bg-gray-700 text-white justify-between;
  &__list {
    @apply flex;
    &-item {
      @apply flex items-center;
    }
  }
  &__link {
    @apply p-5;
    @apply hover:bg-gray-500;
    @apply transition-all ease-in-out duration-300;
  }
}
</style>
