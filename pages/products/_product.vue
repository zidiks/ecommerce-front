<template>
  <main>
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/catalogue">КАТАЛОГ</nuxt-link></a-breadcrumb-item>
      <!-- REMOVE SEX PLEASE -->
      <a-breadcrumb-item>{{ currentProduct.sex || 'SEX'}}</a-breadcrumb-item>
      <a-breadcrumb-item class="breadcrumbs__current">{{ currentProduct.name }}<span class="breadcrumbs-separator">/</span></a-breadcrumb-item>
    </a-breadcrumb>
    <section class="product">
      <div class="pics">
        <div class="pics__side">
          <div class="pics__pic" v-for="item of 3" :key="item.src">

          </div>
        </div>
        <div class="pics__main">
          <img :src="currentProduct.img" :alt="currentProduct.name">
        </div>
      </div>
      <div class="main-descr">
        <div class="main-descr__text">
          <h1>{{ currentProduct.name }}</h1>
          <h4>БРЕНД: {{ currentProduct.brand }}</h4>
          <h4>ДЛЯ КОГО: {{ currentProduct.sex }}</h4>
          <h4>ОБЪЕМ: {{ currentProduct.vol }}</h4>
        </div>
        <div class="controls">
          <div class="controls__price">
            <div :class="currentProduct.priceOld ? 'controls__price-old' : 'controls__hidden'">
              {{ currentProduct.priceOld + ' BYN' }}
            </div>
            <div class="controls__price-current">
              {{ currentProduct.price + ' BYN' }}
            </div>
          </div>
          <div class="controls__buttons">
            <div class="controls__amount">
              <div class="controls__less" @click="decrement()">-</div>
              <div class="controls__number">{{ amount }}</div>
              <div class="controls__more" @click="increment()">+</div>
            </div>
            <div class="controls__button">
              <div :class="isInCart ? 'controls__message' : 'controls__hidden'">
                <img src="~/static/Alert.svg" alt="alert">
                <div>ТОВАР УСПЕШНО<br>
                  ДОБАВЛЕН В КОРЗИНУ
                </div>
              </div>
              <div :class="isInCart ? 'button-inversed' : 'button'" @click="addToCart()">{{ isInCart ? 'оформить заказ' : 'добавить в корзину' }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="characteristics">
      <Product-collapse :item="currentProduct"/>
      <div class="characteristics__plug"></div>
    </section>
    <section class="also">
      <div class="also__head">
        <h2>вам может понравится</h2>
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
        <Cards class="also__card" v-for="item of productsContent.slice(0, 4)" :addClass="'also'" :key="item.text" :item="item" />
      </div>
      <div class="also__button">
        <nuxt-link class="button" to="/catalogue">перейти в каталог</nuxt-link>
      </div>
    </section>
  </main>
</template>

<script>
  import { productsContent, alsoContent } from '~/assets/shared/shared';

  export default {
    data: () => ({
      productsContent,
      amount: 1,
      isInCart: false,
      activeKey: ['0'],
    }),
    computed: {
      currentProduct: function() {
        return productsContent.filter(el => el.name == this.$route.params.product)[0];
      },
    },
    methods: {
      increment: function() {
        this.isInCart = false;
        return this.amount++;
      },
      decrement: function() {
        this.isInCart = false;
        if(this.amount > 1) return this.amount--;
      },
      addToCart: function() {
        return this.isInCart = true;
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
  }

  .pics {
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    column-gap: 2rem;

    &__side {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      row-gap: 2rem;
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

      & img {
        height: 23rem;
      }
    }
  }

  .main-descr {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__text {

      & h1 {
        font-size: 2.25rem;
        margin-bottom: 2rem;
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
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    &__buttons {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 3rem;
      gap: 2rem;
    }

    &__amount {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 4rem;
      font-size: 1.25rem;
      border: $main-border;
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
  }

  .also {
    margin-top: 4rem;

    &__head {
      display: flex;
      justify-content: space-between;
    }

    &__content {
      margin-top: 2.25rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 2rem;
    }

    &__card {
      font-size: 1rem;
    }

    &__image {
      height: 19rem;
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
