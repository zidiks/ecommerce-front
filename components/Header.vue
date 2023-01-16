<template>
  <div>
    <header class="mobile-visibility mobile-nav">
      <div @click="toggleMenu" class="mobile-nav__slot">
        <span class="mobile-nav__menu material-symbols-outlined" :class="{ 'mobile-nav__menu-active': visibleMenu }">menu</span>
      </div>
      <a-drawer
        placement="left"
        :closable="false"
        :z-index="997"
        width="100%"
        @close="onCloseMenu"
        :visible="visibleMenu"
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
            <div @click="onCloseMenu()" v-else>
              <nuxt-link :to="item.link" class="drawer-menu__item">
                <span class="drawer-menu__item__text">{{ item.text }}</span>
              </nuxt-link>
            </div>
          </div>
        </nav>
      </a-drawer>
      <div class="mobile-nav__slot">
        <nuxt-link to="/cart">
          <a-badge :count="cartCount" :offset="[-6,10]">
            <span class="mobile-nav__cart material-symbols-outlined">shopping_bag</span>
          </a-badge>
        </nuxt-link>
      </div>
      <div class="mobile-nav__slot">
        <nuxt-link to="/">
          <img class="mobile-nav__logo" src="~/static/small_logo.svg">
        </nuxt-link>
      </div>
      <div class="mobile-nav__slot">
        <nuxt-link to="/tracker">
          <span class="mobile-nav__tracker material-symbols-outlined">local_shipping</span>
        </nuxt-link>
      </div>
      <div @click="toggleSearch" class="mobile-nav__slot">
        <span class="mobile-nav__search material-symbols-outlined" :class="{ 'mobile-nav__search-active': visibleSearch }">search</span>
      </div>
      <a-drawer
        placement="right"
        :closable="false"
        :z-index="997"
        width="100%"
        @close="onCloseSearch"
        :visible="visibleSearch"
      >
        <nav class="drawer-menu">
          <SearchMobile v-if="visibleSearch"></SearchMobile>
        </nav>
      </a-drawer>
    </header>
    <div class="content-width header__wrapper desktop-visibility">
      <header class="header all-text-toUpperCase">
        <div class="header__crutch">
          <div class="header__plug">

          </div>
          <div class="header__logo">
            <nuxt-link to="/">
              <img src="~/static/Logo.svg">
            </nuxt-link>
          </div>
          <div class="header__number">

          </div>
        </div>
        <nav class="header__navbar">
          <li class="link-li" v-for="item of headerNavLinks" :key="item.text">
            <nuxt-link  v-if="item.badge" :to="item.link" class="link-custom">
              <a-badge :count="cartCount" :offset="[8,6]">
                <span>{{ item.text }}</span>
              </a-badge>
            </nuxt-link>
            <nuxt-link v-else :to="item.link" class="link-custom">
              <span>{{ item.text }}</span>
            </nuxt-link>
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
        { text: 'КОРЗИНА', link: '/cart', more: false, badge: true },
      ],
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit('drawers/toggleMenu');
    },
    toggleSearch() {
      this.$store.commit('drawers/toggleSearch');
    },
    onCloseMenu() {
      this.$store.commit('drawers/closeMenu');
    },
    onCloseSearch() {
      this.$store.commit('drawers/closeSearch');
    },
    openChild(id) {
      this.$store.commit('drawers/openNode', id);
    }
  },
  watch: {
    $route() {
      this.onCloseSearch();
      this.onCloseMenu();
    },
  },
  computed: {
    categoriesTree() {
      return this.$store.state.categories.categoriesTree;
    },
    visibleMenu() {
      return this.$store.state.drawers.menuState;
    },
    visibleSearch() {
      return this.$store.state.drawers.searchState;
    },
    cartCount() {
      return this.$store.state.localStorage.products.length;
    }
  },
  mounted() {
    const categoriesList = this.$store.state.categories.categoriesList;
    this.$store.commit('drawers/generateNodes', categoriesList);
  },
}
</script>


<style lang="scss" scoped>
  @import '@/assets/styles/global.scss';
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
          .ant-badge {
            font-size: inherit;
            line-height: inherit;
            color: inherit;
          }
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
