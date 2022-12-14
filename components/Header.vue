<template>
  <div>
    <Search :burgerShown="burgerShown" class="search-mobile search-pc"/>
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
      <nav @mouseleave="dropdown()" :class="`header__navbar${burgerShown ? '' : '-hidden'}`">
        <li @mouseenter="dropdown(item.dropdown)" class="link-li" :class="{ 'link-li-active': dropdownOpen && item.dropdown }" v-for="item of headerNavLinks" :key="item.text" @click="currentWidth <= 960 ? burgerButton() : ''; dropdown(false)">
          <nuxt-link :to="item.link" class="link-custom">{{ item.text }}</nuxt-link>
        </li>
        <div @mouseenter="dropdownFocus = true" @mouseleave="dropdownFocus = false" class="dropdown" :class="{ 'dropdown-active': dropdownOpen }">
          <Search class="search dropdown-search" />
        </div>
      </nav>
      <div :class="`overlay${burgerShown ? '' : '-hidden'}`">
      </div>
      <Search class="search" />
    </header>
  </div>
</template>

<script scoped>
export default {
  data: () => {
    return {
      headerNavLinks: [
      { text: 'ГЛАВНАЯ', link: '/'},
      { text: 'КАТАЛОГ', link: '/catalogue', dropdown: true},
      { text: 'О НАС', link: '/about'},
      { text: 'АКЦИИ', link: '/offers' },
      { text: 'ТРЕКЕР ЗАКАЗА', link: '/tracker'},
      { text: 'КОРЗИНА', link: '/cart'},
      ],
      dropdownOpen: false,
      dropdownFocus: false,
      burgerShown: false,
      currentHeight: 0,
      currentWidth: 0,
    }
  },

  methods: {
    dropdown(value = false) {
      setTimeout(() => {
        if (!this.dropdownFocus) {
          this.dropdownOpen = !!value;
        }
      }, 200);
    },
    burgerButton() {
      this.burgerShown = !this.burgerShown;
      document.body.style.overflow = this.burgerShown && this.currentWidth <= 960 ? 'hidden' : 'visible';
    },
    getCurrentScreenSize() {
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

  .dropdown {
    z-index: 800;
    position: absolute;
    width: 100%;
    height: 50vh;
    max-height: 0;
    left: 0;
    bottom: -1px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(1.6rem);
    overflow: hidden;
    transition: .3s;
    transform-origin: top;
    &-search {
      width: 100%;
      display: flex !important;
      justify-content: center;
    }
    &-active {
      box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.2);
      bottom: calc(-50vh - 1px);
      max-height: 50vh;
    }
  }

  .header {
    position: relative;
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
      position: relative;
      width: 100%;
      margin-top: 2rem;
      padding: 0 5rem;
      display: flex;
      justify-content: center;
      border-top: $main-border;
      border-bottom: $main-border;

      .link-li {
        position: relative;
        .link-custom {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0.5rem;
          text-decoration: none;
          color: var(--data-color-black);
        }
        &:hover::before {
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -1px;
          content: '';
          background: var(--data-color-black);
        }
        &-active {
          &::before {
            z-index: 900;
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -1px;
            content: '';
            background: var(--data-color-black);
          }
        }
      }

      @include breakpoint(xl) {
        justify-content: space-around;
        padding: 0.5rem 4%;

        & li {
          margin: 0 0.25rem;
        }
      }

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
          height: 0;
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

  .search {
    display: block;

    @include breakpoint(l) {
      display: none;
    }
  }
</style>
