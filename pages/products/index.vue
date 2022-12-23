<template>
  <main class="content-width all-text-toUpperCase">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/catalogue">КАТАЛОГ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item v-if="!categoryData">{{ categoryData?.name || 'ВСЕ ТОВАРЫ' }}</a-breadcrumb-item>
      <a-breadcrumb-item
        v-else
        v-for="item of categoryData.path"
        :key="item._id">
        <nuxt-link :to="'/products?category=' + item._id">{{ item.name }}</nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-if="categoryData">{{ categoryData.name }}</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="products__wrapper" v-if="productsContent && !$fetchState.pending && mountedState">
      <div v-if="refreshProductsState" class="refresh-overlay">
        <Spinner class="desktop-visibility"></Spinner>
      </div>
      <section>
        <SmartInputs :disabled="refreshProductsState" @valueChanges="debounce(queryChange, $event)" :baseFilters="baseFilters" :customFilters="customFilters"></SmartInputs>
      </section>
      <section class="products">
        <div class="products__content fade-in">
          <Cards
            class="products__card fade-in"
            v-for="item of productsContent"
            :item="item"
            :key="item.text"
            :addClass="ReusableClasses.CardBestsellers"
          />
        </div>
        <Pagination @valueChanges="pageChange($event)" :metadata="metadata"></Pagination>
      </section>
    </div>
    <div v-else>
      <Spinner></Spinner>
    </div>
  </main>
</template>

<script scoped>
import { pageNumbers } from 'assets/shared/constants/shared'
import { ReusableClasses } from "assets/shared/enums/reusable-classes.enum";
import { BaseProductProperty } from "assets/shared/enums/base-product-property.enum";
import { ComparisonOperator } from "assets/shared/enums/mongoose-query.enum";
import { ProductTypePropertyType } from "assets/shared/enums/product-property.enum";
import { validateFilters } from "assets/shared/functions/validate-query.func";
import {asyncTimeout} from "assets/shared/helpers/async-timeout.helper";

export default {
  data() {
    return {
      ReusableClasses,
      pageNumbers,
      productsContent: [],
      queryCategories: [],
      queryTypes: [],
      mountedState: false,
      refreshProductsState: false,
      categoryData: undefined,
      baseFilters: [],
      customFilters: [],
      timeout: undefined,
      metadata: undefined,
      paginationLimit: 40,
      lastQuery: undefined,
    }
  },
  computed: {
    brands() {
      return this.$store.state.brands.brands;
    },
    searchText() {
      return this.$store.state.sessionStorage.searchText;
    },
  },
  watch: {
    searchText() {
      this.pageChange(this.metadata.page || 1)
    }
  },
  methods: {
    async queryChange(value) {
      const basePropsQuery = validateFilters(value.basePropertiesForm);
      const customPropsQuery = validateFilters(value.customPropertiesForm);
      const sortQuery = value.sortForm.direction !== undefined && value.sortForm.property ? value.sortForm : undefined;
      const resProducts = await this.queryProducts(
        true,
        {
          page: 1,
          limit: this.paginationLimit,
        },
        basePropsQuery,
        customPropsQuery,
        sortQuery,
      );
      this.productsContent = resProducts.data;
      this.metadata = resProducts.metadata;
    },
    async pageChange(index) {
      const resProducts = await this.queryProducts(
        true,
        {
          page: index || 1,
          limit: this.paginationLimit,
        },
        this.lastQuery.baseProperties || {},
        this.lastQuery.customProperties || {},
        this.lastQuery.sort || undefined,
      );
      this.productsContent = resProducts.data;
      this.metadata = resProducts.metadata;
    },
    async debounce(func, arg) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(async () => { await func(arg) }, this.$config.env.debounceTime || 300);
    },
    async queryProducts(preview, pagination, basePropsQuery, customPropsQuery, sort) {
      this.refreshProductsState = true;
      this.lastQuery = {
        search: this.searchText || undefined,
        preview,
        pagination,
        baseProperties: Object.assign({
          [BaseProductProperty.Category]: this.queryCategories.length ? {
            [ComparisonOperator.in]: this.queryCategories,
          } : undefined,
          [BaseProductProperty.Type]: this.queryTypes.length ? {
            [ComparisonOperator.in]: this.queryTypes,
          } : undefined,
        }, basePropsQuery || {}),
        customProperties: customPropsQuery || {},
        sort,
      };
      const productsRes =  await this.$api.products.getProducts(this.lastQuery);
      await asyncTimeout(500);
      this.refreshProductsState = false;
      return productsRes;
    },
  },
  async fetch() {
    this.categoryData = this.$store.getters['categories/getById'](this.$route.query.category);
    const routeCategories = this.categoryData?.allCategoriesIds || [];
    const routeTypes = this.categoryData?.allProductTypeIds || [];
    this.queryCategories = Array.isArray(routeCategories) ? routeCategories : [routeCategories];
    this.queryTypes = Array.isArray(routeTypes) ? routeTypes : [routeTypes];
    const resProducts = await this.queryProducts(
      true,
      {
        page: 1,
        limit: this.paginationLimit,
      },
    );
    this.productsContent = resProducts.data;
    this.metadata = resProducts.metadata;
    const typesUniqueProperties = this.categoryData?.allProductTypeIds?.length
      ? await this.$api.types.getTypesUniqueProperties(this.categoryData?.allProductTypeIds || [])
      : [];
    this.baseFilters = [
      {
        code: 'brand',
        name: 'Бренд',
        stringifyId: '_id',
        stringifyLabel: 'name',
        default:  [],
        type: ProductTypePropertyType.StringMultiSelect,
        options: this.brands.map(item => ({ label: item.name, value: item._id })),
      },
      {
        code: 'totalPrice',
        name: 'Цена',
        type: ProductTypePropertyType.NumberInput,
        prefix: 'BYN',
      },
      {
        code: 'isNew',
        name: 'Новинка',
        default:  false,
        type: ProductTypePropertyType.CheckBox,
      },
    ];
    this.customFilters = typesUniqueProperties.map(item => ({
      code: item._id,
      name: item.name,
      type: item.type,
      options: item.options.map(option => ({ label: option, value: option })),
    }))
  },
  created() {
    this.$watch(
      () => this.$route.query,
      (toParams, previousParams) => {
        this.$fetch();
      }
    );
  },
  mounted() {
    setTimeout(() => {
      this.mountedState = true;
      this.refreshProductsState = false;
    }, 100);
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/global';

.products {
  width: 100%;
  margin-top: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__wrapper {
    position: relative;
    .refresh-overlay {
      z-index: 800;
      position: absolute;
      display: flex;
      padding-top: 8rem;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.8);
    }
  }

  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem 2rem;

    @include breakpoint(l) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem 2rem;
    }

    @include breakpoint(m) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include breakpoint(xxs) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    font-size: 1rem;
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

  &__name {
    font-size: 14px;
  }

  &__button {
    margin-top: 3.75rem;
  }
}
</style>
