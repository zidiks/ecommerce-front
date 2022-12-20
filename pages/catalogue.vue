<template>
  <main class="content-width all-text-toUpperCase">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/catalogue">КАТАЛОГ</nuxt-link></a-breadcrumb-item>
    </a-breadcrumb>
    <div v-if="categoriesTree && latestContent && !$fetchState.pending && mountedState">
      <section
        @mouseleave="setColumnData(1, [])"
        :style="`grid-template-columns: repeat(${maxDepth}, 1fr)`"
        class="structure"
      >
        <div
          class="structure__column"
          v-for="(column, index) in renderColumns"
          :key="index"
        >
          <div class="structure__column-wrapper">
            <div
              v-if="index === 0"
              @mouseover="setColumnData(index + 1, [])"
              class="structure__item fade-in-left-category"
              @click="routeWithQuery()"
            >
              <span>Все товары</span>
            </div>
            <div
              @mouseover="setColumnData(index + 1, item.children, item._id)"
              :class="{ 'structure__item-active': activeItems.includes(item._id) }"
              class="structure__item fade-in-left-category"
              v-for="item in column"
              @click="routeWithQuery(item._id)"
              :key="item.name"
            >
              <span>{{ item?.name }}</span>
              <img v-if="item.children?.length" src="/category-item-arrow.svg" :alt="item?.name">
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="latest-catalogue">
          <div class="latest-catalogue__head">
            <div>
              <h2>НАШИ НОВИНКИ</h2>
            </div>
          </div>
          <div class="fade-in" v-if="latestContent.length && !$fetchState.pending">
            <div class="latest-catalogue__content">
              <Cards class="latest-catalogue__card" :addClass="ReusableClasses.CardLatest" v-for="item of latestContent" :item="item" :key="item._id" />
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="structure-loading">
      <Spinner></Spinner>
    </div>
  </main>
</template>

<script scoped>
  import { BaseProductProperty } from "assets/shared/enums/base-product-property.enum";
  import { ComparisonOperator } from "assets/shared/enums/mongoose-query.enum";
  import { ReusableClasses } from "assets/shared/enums/reusable-classes.enum";

  export default {
    data() {
      return {
        ReusableClasses,
        renderColumns: [],
        activeItems: [],
        latestContent: [],
        mountedState: false,
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
      const resLatest = await this.$api.products.getProducts({
        preview: true,
        sort: {
          property: BaseProductProperty.CreatedAt,
          direction: -1,
        },
        pagination: {
          page: 1,
          limit: 4,
        },
        baseProperties: {
          [BaseProductProperty.IsNew]: {
            [ComparisonOperator.eq]: true
          }
        }
      });
      this.latestContent = resLatest.data;
    },
    mounted() {
      this.mountedState = true;
    },
    methods: {
      routeWithQuery(category) {
        this.$router.push({path: '/products', query: { category }})
      },
      setColumnData(depth, data, itemId) {
        this.activeItems[depth] = null;
        for (let index = depth + 1; index < this.maxDepth; index++) {
          this.renderColumns[index] = [];
          this.activeItems[index] = null;
        }
        if (depth < this.maxDepth) {
          this.renderColumns[depth] = data;
          if (itemId) {
            this.activeItems[depth] = itemId;
          }
          this.renderColumns.push([]);
          this.renderColumns.pop();
        }
      },
    },
  }
</script>

<style lang="scss">
@import '~/assets/styles/global';

.latest-catalogue {
  &__head {
    h2 {
      margin: 0;
      font-size: 1.8rem;
    }

    @include breakpoint(l) {
      display: flex;
      flex-direction: column;
    }
  }

  &__descr {
    font-size: 1rem;

    @include breakpoint(l) {
      max-width: 25rem;
    }
  }

  &__content {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    font-size: 1rem;
    gap: 2rem;

    @include breakpoint(m) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem
    }

    @include breakpoint(xxs) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    &:nth-child(5) {
      display: none;
    }

    @include breakpoint(m) {
      font-size: .8rem;
      &:nth-child(3) {
        display: none;
      }
    }

    @include breakpoint(xxs) {
      &:nth-child(2) {
        display: none;
      }
    }
  }

  &__image {
    width: 100%;
    aspect-ratio : 1 / 1.25;
    padding: 20%;

    & img {
      object-fit: contain;
      width:  100%;
      height: 100%;
    }
  }

  &__hidden {
    display: none;
  }
}

.structure {
  margin-bottom: 3rem;
  display: grid;
  column-gap: 3rem;
  margin-top: 4rem;
  min-height: 7.5rem;

  @include breakpoint(l) {
    display: none;
  }

  &-loading {
    min-height: 7.5rem;
    margin-bottom: 10rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-mobile {

    @include breakpoint(l) {
      display: grid;
    }

    &-wrapper {
      display: none;

      @include breakpoint(l) {
        display: block;
      }
    }
  }

  &__column {

    &-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      height: fit-content;
      row-gap: 1.5rem;

      & h2 {
        font-size: 1.75rem;
      }
    }
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 400;
    opacity: .7;

    &-active {
      opacity: 1;
      font-weight: 600;

      @include breakpoint(l) {
        opacity: .7;
        font-weight: 400;
      }
    }

    &-disabled {
      cursor: default !important;
    }

    &:hover {
      @extend .structure__item-active;
    }

    img {
      width: .8rem;
      height: .8rem;
    }
  }
}
</style>
