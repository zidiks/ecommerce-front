<template>
  <div>
    <Search :burgerShown="burgerShown" class="search-mobile"/>
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
        <li class="link-li" v-for="item of headerNavLinks" :key="item.text" @click="currentWidth <= 960 ? burgerButton() : ''">
          <nuxt-link :to="item.link" class="link">{{ item.text }}</nuxt-link>
        </li>
      </nav>
      <div :class="`overlay${burgerShown ? '' : '-hidden'}`" @click="burgerButton()">
      </div>
    </header>
  </div>
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
      currentHeight: 0,
      currentWidth: 0,
    }
  },

  computed: {
    cssVars() {
      return {
        '--height': `${this.currentHeight + 200}px`
      }
    }
  },

  methods: {
    burgerButton: function() {
      this.burgerShown = !this.burgerShown;
      document.body.style.overflow = this.burgerShown && this.currentWidth <= 960 ? 'hidden' : 'visible';
    },
    getCurrentScreenSize: function() {
      this.currentHeight = window.innerHeight;
      this.currentWidth = window.innerWidth;
    }
  },

  beforeMount() {
    window.addEventListener('resize', this.getCurrentScreenSize)
  },

  mounted() {
    this.$root.$on('burgerButton', () => {
      this.burgerButton();
    });
    this.getCurrentScreenSize();
  },
}
</script>


<style lang="scss" scoped>
  @import '~/assets/styles/global';

  .search-mobile {
    display: none;
    position: relative;
    z-index: 80;

    @include breakpoint(l) {
      display: block;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__crutch {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      @include breakpoint(l) {
        position: relative;
        z-index: 80;
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

      @include breakpoint(l) {
        position: fixed;
        z-index: 100;
        flex-direction: column;
        align-items: center;
        width: fit-content;
        top: 15rem;
        padding: 0.5rem;
        height: calc(16rem);
        transition: 0.5s ease;
        overflow: hidden;
        white-space: nowrap;

        & li {
          font-size: 1.5rem;
          line-height: 1.5rem;
        }
      }

      &-hidden {
        @extend .header__navbar;

        @include breakpoint(l) {
          padding: 0;
          margin-top: 0;
          border: none;
          height: 0px;
          transition: 0.5s ease;
          margin-bottom: 0;
        }
      }
    }

    &__logo {
      display: flex;
      justify-content: center;
    }
  }

  .overlay {
    position: fixed;
    z-index: 50;
    width: 100vh;
    height: 110vh;
    transition: 0.5s ease;

    @include breakpoint(l) {
      background-color: $WHITE;
    }


    &-hidden {
      position: fixed;
      z-index: 50;
      top: 15rem;
      width: 100%;
      height: 0;
      transition: 0.5s ease;
    }
  }
</style>
