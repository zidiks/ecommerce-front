<template>
  <div class="content-width header__wrapper">
    <Search :burgerShown="burgerShown" class="search-mobile search-pc"/>
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
      <nav :class="`header__navbar${burgerShown ? '' : '-hidden'} header__navbar-desktop`">
        <li class="link-li" v-for="item of headerNavLinks" :key="item.text" @click="currentWidth <= 960 ? burgerButton() : '';">
          <nuxt-link :to="item.link" class="link-custom">{{ item.text }}</nuxt-link>
        </li>
      </nav>
      <div class="structure-wrapper" :style="``">
        <section
          :style="`grid-template-columns: repeat(${maxDepth + 1}, 100%); transform: translateX(-${currentColumn * 100}%); transition: 0.5s ease;`"
          class="structure-mobile"
          v-if="categoriesTree && !$fetchState.pending && burgerShown"
        >
          <nav :class="`header__navbar${burgerShown ? '' : '-hidden'}`">
            <li class="link-li" v-for="item of headerNavLinks" :key="item.text">
              <div class="link-custom" style="cursor: pointer;" v-if="item.catalogue" @click="currentColumn = 1">{{ item.text }}</div>
              <div v-else
                @click="currentWidth <= 960 ? burgerButton() : ''"
                >
                <nuxt-link :to="item.link" class="link-custom">{{ item.text }}</nuxt-link>
              </div>
            </li>
          </nav>
          <div
            class="structure__column"
            v-for="(column, index) in renderColumns"
            :key="index"
          >
            <div class="structure__column-wrapper">
              <div
                v-if="index === 0"
                class="structure__item fade-in structure__item-all"
                style="font-weight: 600"
                @click="routeWithQuery(),
                setColumnData(index + 1, [])"
              >
                <span>Все товары</span>
              </div>
              <div v-else class="structure__backward"
              @click="currentColumn = index">
                <img src="/category-item-arrow.svg" alt="backward arrow" style="transform: rotate(180deg)">
                <div>{{ backwardElement[index] }}</div>
              </div>
              <div
                :class="{ 'structure__item-active': activeItems.includes(item._id) }"
                class="structure__item fade-in"
                v-for="item in column"
                @click="setColumnData(index + 1, item.children, item._id),
                item.children.length ? '' : routeWithQuery(item._id),
                currentColumn = (index < maxDepth - 1? index + 2 : index + 1),
                backwardElement[index + 1] = item?.name"
                :key="item.name"
              >
                <span>{{ item?.name }}</span>
                <img v-if="item.children?.length" src="/category-item-arrow.svg" :alt="item?.name">
              </div>
              <div v-if="index === 0"
                @click="currentColumn = 0"
                class="structure__backward"
              >
                <img src="/category-item-arrow.svg" alt="backward arrow" style="transform: rotate(180deg)">
                <div>назад</div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
        { text: 'КАТАЛОГ', link: '/catalogue', catalogue: true},
        { text: 'О НАС', link: '/about'},
        { text: 'АКЦИИ', link: '/offers' },
        { text: 'ТРЕКЕР ЗАКАЗА', link: '/tracker'},
        { text: 'КОРЗИНА', link: '/cart'},
        ],
        burgerShown: false,
        currentHeight: 0,
        currentWidth: 0,
        renderColumns: [],
        activeItems: [],
        currentColumn: 0,
        backwardElement: [],
      }
    },

    computed: {
      categoriesTree () {
        return this.$store.state.categories.categoriesTree;
      },
      maxDepth () {
        return this.$store.state.categories.maxDepth;
      },
    },
    async fetch() {
      this.renderColumns = Array(this.maxDepth).fill([]);
      this.activeItems = Array(this.maxDepth).fill(null);
      this.renderColumns[0] = this.categoriesTree?.children || [];
    },

    methods: {
      burgerButton() {
        this.burgerShown = !this.burgerShown;
        document.body.style.overflow = this.burgerShown && this.currentWidth <= 960 ? 'hidden' : 'visible';
      },
      getCurrentScreenSize() {
        this.currentHeight = window.innerHeight;
        this.currentWidth = window.innerWidth;
      },
      setColumnData(depth, data, itemId) {
        this.activeItems[depth] = null;
        for (let index = depth + 1; index < this.maxDepth; index++) {
          this.renderColumns[index] = [];
          this.backwardElement[index] = [];
          this.activeItems[index] = null;
        }
        if (depth < this.maxDepth) {
          this.renderColumns[depth] = data;
          if (itemId) {
            this.activeItems[depth] = itemId;
            this.backwardElement[depth] = this.renderColumns[itemId];
          }
          this.renderColumns.push([]);
          this.renderColumns.pop();
        }
      },
      routeWithQuery(category) {
        this.$router.push({path: '/products', query: { category }})
      },
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

  .structure {

    &-wrapper {
      display: none;

      @include breakpoint(l) {
        display: flex;
        position: relative;
        z-index: 100;
        width: 15rem;
        overflow: hidden;
      }
    }

    &-mobile {
      display: grid;
      align-items: baseline;
    }

    &__item {
      display: flex;
      width: 100%;
      max-width: 15rem;
      font-size: 1.25rem;
      justify-content: space-between;

      &:hover {
        opacity: 0.9;
      }
    }

    &__backward {
      display: flex;
      gap: 1rem;
      font-weight: 600;
      font-size: 1.25rem;
      cursor: pointer;

      &:last-child {
        font-weight: 500;
      }
    }
  }

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
        padding: 0 4%;

        & li {
          margin: 0 0.25rem;
        }
      }

      @include breakpoint(l) {
        flex-direction: column;
        align-items: center;
        width: fit-content;
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

      &-desktop {
        @extend .header__navbar;

        @include breakpoint(l) {
          display: none
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
