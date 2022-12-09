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
    <nav :class="`header__navbar${burgerShown ? '' : '-hidden'}`">
      <li class="link-li" v-for="item of headerNavLinks" :key="item.text">
        <nuxt-link :to="item.link" class="link">{{ item.text }}</nuxt-link>
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
      burgerShown: false,
    }
  },
  methods: {
    burgerButton: function() {
      return this.burgerShown = !this.burgerShown;
    }
  },
  mounted() {
    this.$root.$on('burgerButton', () => {
      this.burgerButton();
    })
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

      @include breakpoint(l) {
        padding: 1.25rem 0;
        border-bottom: $main-border;
      }
    }

    &__navbar {
      width: 100%;
      margin-top: 2rem;
      padding: 0.5rem 5rem;
      display: flex;
      justify-content: space-evenly;
      border-top: $main-border;
      border-bottom: $main-border;
      transition: 0.3s ease;
      overflow: hidden;

      @include breakpoint(l) {
        flex-direction: column;
        align-items: center;
        width: fit-content;
        padding: 0.5rem;
        height: calc(16rem);

        & li {
          font-size: 1.5rem
        }
      }

      &-hidden {
        @extend .header__navbar;

        @include breakpoint(l) {
          padding: 0;
          margin-top: 0;
          border: none;
          height: 0px;
          transition: 0.3s ease;
        }
      }
    }

    &__logo {
      display: flex;
      justify-content: center;
    }
  }
</style>
