<template>
  <main>
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/catalogue">КАТАЛОГ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link v-if="productData?.category" :to="'/categories/' + productData.category._id">{{ productData.category.name }}</nuxt-link></a-breadcrumb-item>
    </a-breadcrumb>
    <Spinner v-if="$fetchState.pending"></Spinner>
    <Empty class="fade-in" v-if="$fetchState.error || (!$fetchState.pending && !productData)"></Empty>
    <section class="product fade-in" v-if="productData">
      <div class="pics">
        <div class="pics__side">
          <div class="pics__pic" v-for="item of 3" :key="item.src">

          </div>
        </div>
        <div class="pics__main">
          <img :src="productData?.media?.length ? baseUrl + '/storage/images/' + productData.media[0] : '_nuxt/static/no-image.png'" :alt="productData.name">
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
            <div :class="productData.price ? 'controls__price-old' : 'controls__hidden'">
              {{ productData.price + ' BYN' }}
            </div>
            <div class="controls__price-current">
              {{ productData.price + ' BYN' }}
            </div>
          </div>
          <div class="controls__buttons">
            <div @click="closeOverlay()" :class="isOverlay ? 'controls__message' : 'controls__hidden'">
              <div class="controls__overlay"></div>
              <div title="Скрыть уведомление">
                <img src="~/static/Alert.svg" alt="alert">
                <p>
                  ТОВАР УСПЕШНО<br>
                  ДОБАВЛЕН В КОРЗИНУ
                </p>
              </div>
            </div>
            <div class="controls__content">
              <div class="controls__amount">
                <div class="controls__less" @click="decrement()">-</div>
                <div class="controls__number">{{ amount }}</div>
                <div class="controls__more" @click="increment()">+</div>
              </div>
              <div class="controls__button">
                <div :class="isInCart ? 'controls__hidden' : 'button'" @click="addToCart()">в корзину</div>
                <nuxt-link :class="isInCart ? 'button-inversed' : 'controls__hidden'" to="/cart">оформить заказ</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="characteristics">
      <Product-collapse v-if="productData?.productProps?.length" :items="productData.productProps"/>
      <div class="characteristics__plug"></div>
    </section>
    <section class="also">
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
        amount: 1,
        isInCart: false,
        isOverlay: false,
        activeKey: ['0'],
        productData: null,
        similarData: [],
        baseUrl: this.$config.baseUrl,
      }
    },
    async fetch() {
      this.productData = await this.$api.products.getProductById(this.$route.params.product);
      const resSimilar = await this.$api.products.getProducts({
        preview: true,
        pagination: {
          page: 1,
          limit: 4,
        }
      });
      this.similarData = resSimilar.data;
    },
    methods: {
      increment: function() {
        this.isInCart = false;
        this.isOverlay = false;
        return this.amount++;
      },
      decrement: function() {
        if(this.amount > 1) {
          this.isInCart = false;
          this.isOverlay = false;
          return this.amount--;
        }
      },
      addToCart: function() {
        this.isInCart = true;
        this.isOverlay = this.isInCart;
        if(this.currentWidth <= 960)document.querySelector('body').style.overflow = 'hidden';
      },
      closeOverlay: function() {
        this.isOverlay = false;
        document.querySelector('body').style.overflow = 'visible';
      },
    },
  }
</script>

<style lang="scss">
  @import '~/assets/styles/global';

  .product {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    margin-top: 2.5rem;

    @include breakpoint(l) {
      display: flex;
      flex-direction: column;
      margin-top: 0;
    }
  }

  .pics {
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    column-gap: 2rem;

    @include breakpoint(l) {
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-end;
      align-items: center;
    }

    &__side {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      row-gap: 2rem;
      height: 30rem;
      @include breakpoint(l) {
        margin-top: 1rem;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 2rem;
        width: 10rem;
        height: 2rem;

        & div {
          border-radius: 50%;
        }
      }
    }

    &__pic {
      background-color: rgb(226, 226, 226); // Plug
      border: $main-border;
      cursor: pointer;
    }

    &__main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30rem;
      border: $main-border;

      @include breakpoint(l) {
        border: none;
        height: 16rem;
      }

      & img {
        height: 23rem;

        @include breakpoint(l) {
          height: 80%;
        }
      }
    }
  }

  .main-descr {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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

    &__overlay {
      position: fixed;
      z-index: 100;

      @include breakpoint(l) {
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        backdrop-filter: blur(4px);
        overflow: hidden;
      }
    }

    &__message {
      display: flex;
      font-size: 1rem;
      align-items: baseline;
      margin-left: 4rem;

      @include breakpoint(l) {
        margin: 0;
        width: 100%;
      }

      & div:last-child {
        display: flex;
        align-items: flex-start;
        position: relative;
        z-index: 200;
        gap: 1rem;
        cursor: pointer;

        @include breakpoint(l) {
          position: fixed;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          gap: 1rem;
          background-color: $WHITE;
          border: $main-border;
          width: 16rem;
          height: 5rem;
          padding-top: 1rem;
          padding-left: 1rem;
        }

        & img {
          margin-top: 0.25rem;
        }
      }
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 3rem;

      @include breakpoint(l) {
        align-items: center;
      }
    }

    &__content {
      display: flex;
      width: 100%;
      gap: 1.5rem;

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

      @include breakpoint(l) {

        & div, :last-child {
          width: 12.5rem;
          height: 3.5rem;

          @include breakpoint(xs) {
            width: 100%;
          }
        }
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
      width: 100%;
      height: 4rem;
      font-size: 1.25rem;
      border: $main-border;

      @include breakpoint(l) {
        min-width: 12rem;
        width: 12rem;
        height: 3.5rem;
      }

      @include breakpoint(xs) {
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);

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
