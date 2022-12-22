<template>
  <div>
    <header class="mobile-visibility mobile-nav">
      <div @click="toggleDrawer" class="mobile-nav__slot-left">
        <span class="mobile-nav__menu material-symbols-outlined" :class="{ 'mobile-nav__menu-active': visible }">menu</span>
      </div>
      <a-drawer
        placement="left"
        :closable="false"
        width="100%"
        @close="onClose"
        :visible="visible"
      >
        <nav class="drawer-menu">
          <div v-for="item of headerNavLinks" :key="item.text">
            <div @click="openChild(categoriesTree._id)" v-if="item.more" class="drawer-menu__item">
              <span class="drawer-menu__item__text">{{ item.text }}</span>
              <span class="drawer-menu__item__arrow">
                <span class="material-symbols-outlined">chevron_right</span>
              </span>
              <DrawerCatalogue :data="categoriesTree"></DrawerCatalogue>
            </div>
            <div @click="onClose()" v-else>
              <nuxt-link :to="item.link" class="drawer-menu__item">
                <span class="drawer-menu__item__text">{{ item.text }}</span>
              </nuxt-link>
            </div>
          </div>
        </nav>
      </a-drawer>
      <div class="mobile-nav__slot-center">
        <img class="mobile-nav__logo" src="~/static/small_logo.svg">
      </div>
      <div class="mobile-nav__slot-right">
        <span class="mobile-nav__search material-symbols-outlined">search</span>
      </div>
    </header>
    <div class="content-width header__wrapper desktop-visibility">
      <header class="header all-text-toUpperCase">
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
          <li class="link-li" v-for="item of headerNavLinks" :key="item.text">
            <nuxt-link :to="item.link" class="link-custom">{{ item.text }}</nuxt-link>
          </li>
        </nav>
        <Search class="search" />
      </header>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      headerNavLinks: [
        { text: 'ГЛАВНАЯ', link: '/', more: false },
        { text: 'КАТАЛОГ', link: '/catalogue', more: true },
        { text: 'О НАС', link: '/about', more: false },
        { text: 'Новости', link: '/news', more: false },
        { text: 'ТРЕКЕР ЗАКАЗА', link: '/tracker', more: false },
        { text: 'КОРЗИНА', link: '/cart', more: false },
      ],
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.commit('mobile-catalogue/toggleDrawer');
    },
    onClose() {
      this.$store.commit('mobile-catalogue/closeDrawer');
    },
    openChild(id) {
      this.$store.commit('mobile-catalogue/openNode', id);
    }
  },
  computed: {
    categoriesTree() {
      return this.$store.state.categories.categoriesTree;
    },
    visible() {
      return this.$store.state["mobile-catalogue"].drawerState;
    },
  },
  mounted() {
    const categoriesList = this.$store.state.categories.categoriesList;
    this.$store.commit('mobile-catalogue/generateNodes', categoriesList);
  },
}
</script>


<style lang="scss" scoped>
  @import '@/assets/styles/global';
  @import '@/assets/styles/components/mobile-nav.scss';

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
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);
      bottom: calc(-50vh - 1px);
      max-height: 50vh;
    }
  }

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__wrapper {
      padding-top: 2rem;
    }

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
      justify-content: space-around;
      border-top: $main-border;
      border-bottom: $main-border;

      .link-li {
        position: relative;
        a.nuxt-link-exact-active {
          &::before {
            z-index: 900;
            position: absolute;
            width: 100%;
            height: 2px;
            left: 0;
            bottom: -1px;
            content: '';
            background: var(--data-color-black);

            @include breakpoint(l) {
              display: none;
            }
          }

          @include breakpoint(l) {
            font-weight: 600;
          }
        }
        .link-custom {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0.5rem;
          text-decoration: none;
          color: var(--data-color-black);
        }
        &:hover > a::before {
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          bottom: -1px;
          content: '';
          background: var(--data-color-black);

          @include breakpoint(l) {
            display: none;
          }
        }
      }

      @include breakpoint(xl) {
        justify-content: space-around;
        padding: 0 1.9%;

        & li {
          margin: 0 0.25rem;
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
