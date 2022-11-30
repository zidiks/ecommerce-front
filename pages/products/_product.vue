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
              <div class="button" @click="addToCart()">ДОБАВИТЬ В КОРЗИНУ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import { productsContent } from '~/assets/shared/shared';

  export default {
    data: () => ({
      productsContent,
      amount: 1,
      isInCart: false,
    }),
    computed: {
      currentProduct: function () {
        return productsContent.filter(el => el.name == this.$route.params.product)[0];
      },
    },
    methods: {
      increment: function() {
        return this.amount++;
      },
      decrement: function() {
        if(this.amount > 1) return this.amount--;
      },
      addToCart: function() {
        return this.isInCart = true;
      },
    },
  }
</script>

<style lang="scss" scoped>
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
</style>
