<template>
  <main class="content-width">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/catalogue">КАТАЛОГ</nuxt-link></a-breadcrumb-item>
    </a-breadcrumb>
    <section v-if="categoriesTree && !$fetchState.pending" @mouseleave="setColumnData(1, [])" :style="`grid-template-columns: repeat(${maxDepth}, 1fr)`" class="structure">
      <div class="structure__column" v-for="(column, index) in renderColumns" :key="index">
        <div class="structure__column-wrapper">
          <div v-if="index === 0" @mouseover="setColumnData(index + 1, [])" class="structure__item fade-in-left-category">
            <span>Все товары</span>
          </div>
          <div @mouseover="setColumnData(index + 1, item.children, item._id)" :class="{ 'structure__item-active': activeItems.includes(item._id) }" class="structure__item fade-in-left-category" v-for="item in column" :key="item.name">
            <span>{{ item?.name }}</span>
            <img v-if="item.children?.length" src="/category-item-arrow.svg" :alt="item?.name">
          </div>
        </div>
      </div>
    </section>
    <div v-else class="structure-loading">
      <Spinner></Spinner>
    </div>
  </main>
</template>

<script scoped>
  import { processCategoriesTreeFunc } from "assets/shared/functions/process-categories-tree.func";

  export default {
    data() {
      return {
        categoriesTree: undefined,
        maxDepth: 0,
        renderColumns: [],
        activeItems: [],
      }
    },
    async fetch() {
      const categoriesTreeData = await this.$api.categories.getCategoriesTree();
      const res = processCategoriesTreeFunc(categoriesTreeData);
      this.categoriesTree = res.tree;
      this.maxDepth = res.maxDepth > 3 ? res.maxDepth : 3;
      this.renderColumns = Array(this.maxDepth).fill([]);
      this.activeItems = Array(this.maxDepth).fill(null);
      this.renderColumns[0] = this.categoriesTree?.children || [];
    },
    methods: {
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


  .structure {
    display: grid;
    column-gap: 3rem;
    margin-top: 4rem;
    min-height: 7.5rem;

    &-loading {
      min-height: 7.5rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
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
