<template>
  <main class="content-width">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/catalogue">КАТАЛОГ</nuxt-link></a-breadcrumb-item>
    </a-breadcrumb>
    <section @mouseleave="setColumnData(1, [])" :style="`grid-template-columns: repeat(${maxDepth}, 1fr)`" class="structure">
      <div class="structure__column" v-for="(column, index) in renderColumns" :key="index">
        <div class="structure__column-wrapper">
          <div v-if="index === 0" @mouseover="setColumnData(index + 1, [])" class="structure__header fade-in-left">
            <h2>Все товары</h2>
          </div>
          <div v-else><h2>&nbsp;</h2></div>
          <div @mouseover="setColumnData(index + 1, item.children)" class="structure__item fade-in-left" v-for="item in column" :key="item.name">
            {{ item?.name }} <div v-if="item.children.length">&#x27A7;</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script scoped>
  import { catalogueTree } from "assets/shared/constants/shared";
  import { processCategoriesTreeFunc } from "assets/shared/functions/process-categories-tree.func";

  export default {
    data() {
      return {
        categoriesTree: undefined,
        maxDepth: 0,
        renderColumns: [],
        catalogueTree,
      }
    },
    async fetch() {
      const res = processCategoriesTreeFunc(this.catalogueTree);
      this.categoriesTree = res.tree;
      this.maxDepth = res.maxDepth;
      this.renderColumns = Array(this.maxDepth).fill([]);
      this.renderColumns[0] = this.categoriesTree.children;
    },
    methods: {
      setColumnData(depth, data) {
        for (let index = depth + 1; index < this.maxDepth; index++) {
          this.renderColumns[index] = [];
        }
        if (depth < this.maxDepth) {
          this.renderColumns[depth] = data;
          this.renderColumns.push([]);
          this.renderColumns.pop();
        }
      },
      clearAllColumns() {
        // console.log('mouse out');
        // for (let index = 1; index < this.maxDepth; index++) {
        //   this.renderColumns[index] = [];
        // }
      }
    },
  }
</script>

<style lang="scss">
  @import '~/assets/styles/global';


  .structure {
    display: grid;
    column-gap: 1rem;
    margin-top: 2rem;

    &__column {

      &-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        height: fit-content;
        row-gap: 1rem;

        & h2 {
          font-size: 1.75rem;
        }
      }
    }

    &__item {
      display: flex;
      justify-content: space-between;
      font-size: 1.25rem;
      cursor: pointer;
    }
  }
</style>
