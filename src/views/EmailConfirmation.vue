<template>
  <div>
    <h1 class="text-3xl">Спасибо за регистрацию!</h1>
    <p>
      Пожалуйста, подтвердите ваш Email для завершения регистрации:
      {{ $route.query.email }}
    </p>
  </div>
</template>
