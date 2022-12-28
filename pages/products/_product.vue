<template>
  <main class="content-width all-text-toUpperCase">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/catalogue">КАТАЛОГ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item
        v-for="item of categoryData?.path || []"
        :key="item._id">
        <nuxt-link :to="'/products?category=' + item._id">{{ item.name }}</nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <nuxt-link
          v-if="productData?.category"
          :to="'/products?category=' + productData.category._id"
        >
          {{ productData.category.name }}
        </nuxt-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <Spinner v-if="$fetchState.pending"></Spinner>
    <Empty class="fade-in" v-if="$fetchState.error || (!$fetchState.pending && !productData)"></Empty>
    <section class="product fade-in" v-if="productData && !$fetchState.pending">
      <div class="pics">
        <div class="pics__side">
          <div class="pics__wrapper" :style="`transform: translate${translateDirection}(${-(currentIndex - 1) * translateAmount}rem);`">
            <div :class="`pics__pic${currentIndex == index ? '-current' : ''}`"
              v-for="(item, index) of productData?.media" :key="index"
              @click="prevChange(index)">
              <img :src="baseUrl + '/storage/images/' + item" alt="perfume">
            </div>
          </div>
        </div>
        <div class="pics__main">
          <img class="desktop-visibility" :src="productData?.media?.length ? baseUrl + '/storage/images/' + productData.media[currentIndex] : '_nuxt/static/no-image.png'" :alt="productData.name">
          <div class="mobile-visibility mobile-slider">
            <ProductCarousel @sliderChange="sliderChange" v-if="!$fetchState.pending && productData" :current="currentIndex" :items="productData?.media || []"></ProductCarousel>
            <Spinner v-else></Spinner>
          </div>
        </div>
      </div>
      <div class="main-descr">
        <div class="main-descr__text">
          <h1>{{ productData.name }}</h1>
          <h4>БРЕНД: {{ productData.brand.name }}</h4>
          <h5 v-if="productData.description">{{ productData.description }}</h5>
        </div>
        <div class="controls">
          <div class="controls__price">
            <div v-if="productData.price !== productData.totalPrice && productData.isStock" class="controls__price-old">
              {{ productData.price + ' BYN' }}
            </div>
            <div v-if="productData.isStock" class="controls__price-current">
              {{ productData.totalPrice + ' BYN' }}
            </div>
            <div v-if="!productData.isStock" class="controls__price-current">
              нет в наличии
            </div>
          </div>
          <div class="controls__content">
            <div class="controls__buttons">
              <div class="controls__button">
                <button v-if="!vuexProduct?.count" class="button-base" @click="addToCart()"><span class="all-text-toUpperCase">в корзину</span></button>
                <nuxt-link v-if="vuexProduct?.count" class="button-inversed" to="/cart"><span class="fade-in">оформить заказ</span></nuxt-link>
              </div>
              <div class="controls__amount fade-in" v-if="vuexProduct?.count">
                  <div class="controls__less" @click="decrement()">-</div>
                  <div class="controls__number">{{ vuexProduct?.count || 0 }}</div>
                  <div class="controls__more" @click="increment()">+</div>
              </div>
            </div>
            <div class="controls__message-wrapper">
                <div v-if="vuexProduct?.count && isMessageShown" class="controls__message fade-in"  @click="isMessageShown = false" title="Скрыть уведомление">
                  <img src="~/static/Alert.svg" alt="alert">
                  <p>
                    ТОВАР УСПЕШНО<br>
                    ДОБАВЛЕН В КОРЗИНУ
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
      <section class="characteristics" v-if="productData && !$fetchState.pending">
        <Product-collapse v-if="productData?.productProps?.length" :items="productData.productProps"/>
        <div class="characteristics__plug"></div>
      </section>
    </section>
  </main>
</template>

<script>
  export default {
    head() {
      return {
        title: this.$fetchState.pending ? 'Loading...' : `${this.productData?.name} - купить в ${this.$config.env.header.title}` || this.$config.env.header.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.$fetchState.pending ? this.$config.env.header.description : this.productData?.description || this.$config.env.header.description,
          }
        ]
      }
    },
    data () {
      return {
        productId: this.$route.params.product,
        amount: 1,
        isMessageShown: false,
        activeKey: ['0'],
        productData: null,
        categoryData: undefined,
        currentIndex: 0,
        currentWidth: 0,
        translateDirection: 'Y',
        translateAmount: 10.5,
        baseUrl: this.$config.baseUrl,
        mountedState: false,
      }
    },
    async fetch() {
      this.productData = await this.$api.products.getProductById(this.productId);
      this.categoryData = this.$store.getters['categories/getById'](this.productData?.categoryId);
    },
    computed: {
      vuexProduct() {
        return this.$store.getters["localStorage/getById"](this.productId);
      },
    },
    methods: {
      sliderChange(index) {
        this.currentIndex = index;
      },
      prevChange(index) {
        this.currentIndex = index;
      },
      increment: function() {
        this.$store.commit('localStorage/increment', this.productId);
      },
      decrement: function() {
        this.$store.commit('localStorage/decrement', this.productId);
      },
      addToCart: function() {
        this.isMessageShown = true;
        this.$store.commit('localStorage/push', this.productId);
      },
      getCurrentWidth: function() {
        this.currentWidth = window.innerWidth;
        this.setWidthDependVariables();
      },
      setWidthDependVariables: function() {
        if(this.currentWidth > 960) {
          this.translateDirection = 'Y';
          this.translateAmount = 10.5;
        } else {
          this.translateDirection = 'X';
          this.translateAmount = 4.5;
        }
      },
    },

    beforeMount() {
      this.getCurrentWidth();
    },

    mounted() {
      window.addEventListener('resize', this.getCurrentWidth);
      this.mountedState = true;
    }
  }
</script>

<style lang="scss">
  @import '~/assets/styles/global';


  .mobile-slider {
    width: 100%;
    height: 100%;
    .ant-carousel,
    .slick-slider,
    .slick-list,
    .slick-track {
      width: 100%;
      height: 100%;
    }

    .slick-active {
      pointer-events: none !important;
    }

    .slick-slide {
      & > div {
        width: 100%;
        height: 100%;
      }
      &__inner {
        width: 100%;
        height: 100%;
      }
      &__image {
        margin: auto;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  .product {
    display: grid;
    grid-template-areas:
          "p d"
          "c d";
    column-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2.5rem;

    @include breakpoint(l) {
      display: flex;
      flex-direction: column;
      margin-top: 0;
    }
  }

  .pics {
    grid-area: p;
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    column-gap: 2rem;

    @include breakpoint(l) {
      margin-top: 1rem;
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-end;
      align-items: center;
      min-width: 0;
    }

    &__side {
      height: 30rem;
      overflow: hidden;

      @include breakpoint(l) {
        margin-top: 2rem;
        height: auto;
        border-radius: 25px;
        width: 12.3rem;

        & div {
          border-radius: 50%;
        }
      }
    }

    &__wrapper {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 2rem;
      transition: 0.5s;

      @include breakpoint(l) {
        display: flex;
        gap: 1.47rem;
        width: max-content;
      }
    }

    &__pic {
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid 1px rgba(0, 0, 0, 0.3);
      height: 8.5rem;
      cursor: pointer;
      transition: transform 0.5s;

      @include breakpoint(l) {
        height: 3rem;
        width: 3rem;
        overflow: hidden;
      }

      &-current {
        @extend .pics__pic;
        margin: 0;
        border: $BLACK solid 1px;
      }

      & img {
        height: 90%;
        max-width: 100%;
        aspect-ratio: 1/1.25;
        object-fit: contain;

        @include breakpoint(l) {
          object-fit: cover;
        }
      }
    }

    &__main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30rem;
      width: 100%;
      max-width: 100%;
      border: $main-border;

      @include breakpoint(l) {
        border: none;
        height: 16rem;
      }

      & img {
        height: 90%;
        max-width: 90%;
        aspect-ratio: 1/1.25;
        object-fit: contain;

        @include breakpoint(l) {
          height: 80%;
        }
      }
    }
  }

  .main-descr {
    display: flex;
    flex-direction: column;
    grid-area: d;

    &__text {

      @include breakpoint(l) {
        margin-top: 1.25rem;
      }

      & h1 {
        font-size: 2.25rem;
        margin-bottom: 2rem;

        @include breakpoint(l) {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
      }

      & h5 {
        font-size: .8rem;
      }

      & h4 {
        font-size: 1.25rem;
      }
    }
  }

  .controls {
    display: flex;
    flex-direction: column;
    user-select: none;

    &__price {
      display: flex;
      gap: 2rem;
      font-size: 2rem;
      margin-top: 1rem;

      @include breakpoint(l) {
        font-size: 22px;
      }

      &-current {
        display: block;
      }

      &-old {
        text-decoration: line-through;
        color: $DGRAY;
      }
    }

    &__hidden {
      display: none;
    }

    &__message {
      display: flex;
      font-size: 1rem;
      align-items: baseline;
      margin-top: 1rem;
      gap: 1rem;
      cursor: pointer;

      @include breakpoint(l) {
        margin: 0;
        width: 100%;
        justify-content: center;
        background-color: white;
      }

      & img {
        position: relative;
        top: 0.25rem;
      }

      &-wrapper {

        @include breakpoint(l) {
          height: fit-content;
          height: 5rem;
        }
      }
    }

    &__content {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 1rem;

      @include breakpoint(l) {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1.5rem;
        justify-content: center;
      }
    }

    &__buttons {
      display: flex;
      margin-top: 3rem;
      justify-content: space-between;
      gap: 1rem;

      @include breakpoint(l) {
        justify-content: center;
      }

      @include breakpoint(xs) {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
      }
    }

    &__button {
      display: flex;
      flex-direction: column;
      max-width: 20rem;
      width: 100%;

      @include breakpoint(l) {
        max-width: 15rem;
        width: 100%;
      }

      @include breakpoint(xs) {
        max-width: 100%;
        width: 100%;
      }
    }

    &__amount {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 4rem;
      font-size: 1.25rem;
      border: $main-border;
      max-width: 10rem;
      width: 100%;

      @include breakpoint(l) {
        min-width: 12rem;
        width: 100%;
      }

      @include breakpoint(xs) {
        height: 3rem;
        max-width: 100%;
        width: 100%;
        justify-content: space-evenly;
      }
    }

    &__less, &__more {
      cursor: pointer;
      text-align: center;
      width: 2rem;
      border-radius: 50%;
      transition: 0.3s;

      &:hover {
        background-color: $LGRAY;
      }
    }
  }

  .characteristics {
    grid-area: c;
    display: grid;

    @include breakpoint(l) {
      grid-template-columns: 1fr;
      grid-template-rows: 10fr 0.1fr;
    }
  }

  .also {
    margin-top: 4rem;

    &__head {
      display: flex;
      justify-content: space-between;

      @include breakpoint(l) {
        flex-direction: column;
      }

        & h2 {

          @include breakpoint(xs) {
            font-size: 1.5rem;
          }

          @include breakpoint(xxs) {
            font-size: 1.25rem;
          }
        }
    }

    &__controls {

      @include breakpoint(l) {
        display: flex;
        position: relative;
        justify-content: space-between;
        top: 9rem;
        width: 100%;
        height: 0;

        & svg {
          min-width: 2.25rem;
          min-height: 2.25rem;
          width: 2.25rem;
          height: 2.25rem;
        }
      }

      @include breakpoint(xs) {
        top: 12rem;
      }

      @include breakpoint(xxs) {
        top: 6.5rem;
      }
    }

    &__content {
      margin-top: 2.25rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 2rem;

      @include breakpoint(l) {
        grid-template-columns: repeat(3, 1fr);
        padding: 0 3rem;
      }

      @include breakpoint(m) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include breakpoint(xs) {
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
      margin-top: 2.5rem;
      display: flex;
      justify-content: center;
    }
  }
</style>
