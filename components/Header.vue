<template>
  <header class="header">
    <div class="header__crutch">
      <div class="header__plug">

      </div>
      <div class="header__logo">
        <img src="~/static/Logo.svg">
      </div>
      <div class="header__number">

      </div>
    </div>
    <nav class="header__navbar">
      <li class="nav-link">КАТАЛОГ</li>
      <li class="nav-link">О НАС</li>
      <li class="nav-link">АКЦИИ</li>
      <li class="nav-link">ТРЕКЕР ЗАКАЗА</li>
      <li class="nav-link">КОРЗИНА</li>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__crutch {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    &__navbar {
      width: 100%;
      margin-top: 1rem;
      padding: 0.5rem 5rem;
      display: flex;
      justify-content: space-evenly;
      border-top: solid 0.5px #0B0B0B;
      border-bottom: solid 0.5px #0B0B0B;
      font-family: --main-font;
      font-weight: 400;
    }

    &__logo {
      display: flex;
      justify-content: center;
    }
  }
</style>
