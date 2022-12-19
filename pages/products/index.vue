<template>
  <main class="content-width">
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
    <div  v-if="productsContent && !$fetchState.pending && mountedState">
      <section>
        <SmartInputs @valueChanges="queryChange($event)" :baseFilters="baseFilters" :customFilters="customFilters"></SmartInputs>
      </section>
      <section class="products">
        <div class="products__content">
          <Cards
            class="products__card fade-in"
            v-for="item of productsContent"
            :item="item"
            :key="item.text"
            :addClass="ReusableClasses.CardBestsellers"
          />
        </div>
        <div class="products__controls">
          <svg class="arrow-inactive" width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="49.75" y="49.75" width="49.5" height="49.5" rx="24.75" transform="rotate(-180 49.75 49.75)" stroke="#0B0B0B" stroke-width="0.5"/>
            <rect class="arrow__back" x="45.9287" y="45.9285" width="41.8571" height="41.8571" rx="20.9286" transform="rotate(-180 45.9287 45.9285)" fill="#FEFEFE" stroke="#0B0B0B"/>
            <path d="M6.78934 24.6464C6.59407 24.8417 6.59407 25.1583 6.78934 25.3535L9.97132 28.5355C10.1666 28.7308 10.4832 28.7308 10.6784 28.5355C10.8737 28.3403 10.8737 28.0237 10.6784 27.8284L7.85 25L10.6784 22.1716C10.8737 21.9763 10.8737 21.6597 10.6784 21.4645C10.4832 21.2692 10.1666 21.2692 9.97132 21.4645L6.78934 24.6464ZM42.8572 24.5L7.14289 24.5L7.14289 25.5L42.8572 25.5L42.8572 24.5Z" fill="#0B0B0B"/>
          </svg>
          <div class="products__pages">
            <li class="link-li" v-for="item of pageNumbers" :key="item.id">
              <span :class="item == 1 ? 'link' : 'link-inactive'">{{ item }}</span>
            </li>
          </div>
          <svg class="arrow" width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="49.75" y="49.75" width="49.5" height="49.5" rx="24.75" transform="rotate(-180 49.75 49.75)" stroke="#0B0B0B" stroke-width="0.5"/>
            <rect class="arrow__back" x="45.9285" y="45.9286" width="41.8571" height="41.8571" rx="20.9286" transform="rotate(-180 45.9285 45.9286)" fill="#FEFEFE" stroke="#0B0B0B"/>
            <path d="M43.354 25.3536C43.5493 25.1583 43.5493 24.8417 43.354 24.6465L40.1721 21.4645C39.9768 21.2692 39.6602 21.2692 39.465 21.4645C39.2697 21.6597 39.2697 21.9763 39.465 22.1716L42.2934 25L39.465 27.8284C39.2697 28.0237 39.2697 28.3403 39.465 28.5355C39.6602 28.7308 39.9768 28.7308 40.1721 28.5355L43.354 25.3536ZM7.00049 25.5L43.0005 25.5L43.0005 24.5L7.00049 24.5L7.00049 25.5Z" fill="#0B0B0B"/>
          </svg>
        </div>
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
import {validateFilters} from "assets/shared/functions/validate-query.func";

export default {
  data: () => ({
      ReusableClasses,
      pageNumbers,
      productsContent: [],
      queryCategories: [],
      queryTypes: [],
      mountedState: false,
      categoryData: undefined,
      baseFilters: [],
      customFilters: [],
    }
  ),
  computed: {
    brands() {
      return this.$store.state.brands.brands;
    },
  },
  methods: {
    async queryChange(value) {
      console.log('New query: ', value);
      const basePropsQuery = validateFilters(value.basePropertiesForm);
      const customPropsQuery = validateFilters(value.customPropertiesForm);
      console.log(basePropsQuery);
      console.log(customPropsQuery);
      const resProducts = await this.queryProducts(
        true,
        {
          page: 1,
          limit: 20,
        },
        basePropsQuery,
        customPropsQuery,
      );
      this.productsContent = resProducts.data;
    },
    async queryProducts(preview, pagination, basePropsQuery, customPropsQuery) {
      return  await this.$api.products.getProducts({
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
      });
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
        limit: 20,
      },
    );
    this.productsContent = resProducts.data;
    const typesUniqueProperties = await this.$api.types.getTypesUniqueProperties(this.categoryData.allProductTypeIds || []);
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
    )
  },
  mounted() {
    setTimeout(() => {
      this.mountedState = true
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

  &__controls {
    display: flex;
    align-items: center;
    margin-top: 4rem;
    gap: 3.5rem;

    @include breakpoint(xs) {
      gap: 1rem;
    }
  }

  &__pages {
    display: flex;
    gap: 1rem;

    @include breakpoint(xs) {
      gap: 0.5rem;
    }

    @include breakpoint(xxs) {
      gap: 0.25rem;
    }
  }
}
</style>
