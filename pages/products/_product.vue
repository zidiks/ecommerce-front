<template>
  <main class="content-width all-text-toUpperCase">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/catalogue">КАТАЛОГ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link v-if="productData?.category" :to="'/categories/' + productData.category._id">{{ productData.category.name }}</nuxt-link></a-breadcrumb-item>
    </a-breadcrumb>
    <Spinner v-if="$fetchState.pending"></Spinner>
    <Empty class="fade-in" v-if="$fetchState.error || (!$fetchState.pending && !productData)"></Empty>
    <section class="product fade-in" v-if="productData && !$fetchState.pending">
      <div class="pics">
        <div class="pics__side">
          <div class="pics__wrapper" :style="`transform: translate${translateDirection}(${-(currentIndex - 1) * translateAmount}rem);`">
          <div :class="`pics__pic${currentIndex == index ? '-current' : ''}`"
            v-for="(item, index) of productData?.media" :key="item.src"
            @click="currentIndex = index">
            <img :src="baseUrl + '/storage/images/' + item" alt="perfume">
          </div>
          </div>
        </div>
        <div class="pics__main">
          <img :src="productData?.media?.length ? baseUrl + '/storage/images/' + productData.media[currentIndex] : '_nuxt/static/no-image.png'" :alt="productData.name">
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
            <div v-if="productData.price !== productData.totalPrice" class="controls__price-old">
              {{ productData.price + ' BYN' }}
            </div>
            <div class="controls__price-current">
              {{ productData.totalPrice + ' BYN' }}
            </div>
          </div>
          <div class="controls__content">
            <div class="controls__buttons">
              <div class="controls__button">
                <div v-if="!vuexProduct?.count" class="button-base" @click="addToCart()">в корзину</div>
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
    <section class="also" v-if="productData && !$fetchState.pending">
      <div class="also__head">
        <h2>похожие товары</h2>
        <div class="also__controls">
          <svg class="arrow-inactive" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="49.75" y="49.75" width="49.5" height="49.5" rx="24.75" transform="rotate(-180 49.75 49.75)" stroke="#0B0B0B" stroke-width="0.5"/>
            <rect class="arrow__back" x="45.9287" y="45.9285" width="41.8571" height="41.8571" rx="20.9286" transform="rotate(-180 45.9287 45.9285)" fill="#FEFEFE" stroke="#0B0B0B"/>
            <path d="M6.78934 24.6464C6.59407 24.8417 6.59407 25.1583 6.78934 25.3535L9.97132 28.5355C10.1666 28.7308 10.4832 28.7308 10.6784 28.5355C10.8737 28.3403 10.8737 28.0237 10.6784 27.8284L7.85 25L10.6784 22.1716C10.8737 21.9763 10.8737 21.6597 10.6784 21.4645C10.4832 21.2692 10.1666 21.2692 9.97132 21.4645L6.78934 24.6464ZM42.8572 24.5L7.14289 24.5L7.14289 25.5L42.8572 25.5L42.8572 24.5Z" fill="#0B0B0B"/>
          </svg>
          <svg class="arrow" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="49.75" y="49.75" width="49.5" height="49.5" rx="24.75" transform="rotate(-180 49.75 49.75)" stroke="#0B0B0B" stroke-width="0.5"/>
            <rect class="arrow__back" x="45.9285" y="45.9286" width="41.8571" height="41.8571" rx="20.9286" transform="rotate(-180 45.9285 45.9286)" fill="#FEFEFE" stroke="#0B0B0B"/>
            <path d="M43.354 25.3536C43.5493 25.1583 43.5493 24.8417 43.354 24.6465L40.1721 21.4645C39.9768 21.2692 39.6602 21.2692 39.465 21.4645C39.2697 21.6597 39.2697 21.9763 39.465 22.1716L42.2934 25L39.465 27.8284C39.2697 28.0237 39.2697 28.3403 39.465 28.5355C39.6602 28.7308 39.9768 28.7308 40.1721 28.5355L43.354 25.3536ZM7.00049 25.5L43.0005 25.5L43.0005 24.5L7.00049 24.5L7.00049 25.5Z" fill="#0B0B0B"/>
          </svg>
        </div>
      </div>
      <div class="also__content">
        <Cards class="also__card" v-for="item of similarData" :addClass="'also'" :key="item._id" :item="item" />
      </div>
      <div class="also__button">
        <nuxt-link class="button" to="/catalogue">перейти в каталог</nuxt-link>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    data () {
      return {
        productId: this.$route.params.product,
        amount: 1,
        isMessageShown: false,
        activeKey: ['0'],
        productData: null,
        currentIndex: 0,
        currentWidth: 0,
        translateDirection: 'Y',
        translateAmount: 10.5,
        similarData: [],
        baseUrl: this.$config.baseUrl,
      }
    },
    async fetch() {
      this.productData = await this.$api.products.getProductById(this.productId);
      const resSimilar = await this.$api.products.getProducts({
        preview: true,
        pagination: {
          page: 1,
          limit: 1,
        }
      });
      this.similarData = resSimilar.data;
    },
    computed: {
      vuexProduct() {
        return this.$store.getters["cart/getById"](this.productId);
      },
    },
    methods: {
      increment: function() {
        this.$store.commit('cart/increment', this.productId);
      },
      decrement: function() {
        this.$store.commit('cart/decrement', this.productId);
      },
      addToCart: function() {
        this.isMessageShown = true;
        this.$store.commit('cart/push', this.productId);
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
    }
  }
</script>

<style lang="scss">
  @import '~/assets/styles/global';

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
    //min-width: 28rem;

    @include breakpoint(l) {
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
        margin-top: 1rem;
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
        max-width: 16rem;
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
        max-width: 16rem;
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
