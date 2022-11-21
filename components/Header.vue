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
      <li class="link-li" v-for="item of headerNavLinks" :key="item">
        <nuxt-link :to="item.link" class="nav-link">{{ item.text }}</nuxt-link>
      </li>
    </nav>
  </header>
</template>

<script scoped>
export default {
  data: () => {
      return {
        headerNavLinks: [
        { text: 'ГЛАВНАЯ', link: '/'},
        { text: 'КАТАЛОГ', link: '/catalogue'},
        { text: 'О НАС', link: '/about'},
        { text: 'АКЦИИ', link: '/offers' },
        { text: 'ТРЕКЕР ЗАКАЗА', link: '/tracker'},
        { text: 'КОРЗИНА', link: '/cart'},
        ],
      }
  },
}
</script>


<style lang="scss" scoped>
  @import '~/assets/styles/global';

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
      margin-top: 2rem;
      padding: 0.5rem 5rem;
      display: flex;
      justify-content: space-evenly;
      border-top: solid 0.5px $BLACK;
      border-bottom: solid 0.5px $BLACK;
    }

    &__logo {
      display: flex;
      justify-content: center;
    }
  }
</style>
