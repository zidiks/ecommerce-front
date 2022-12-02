<template>
  <main>
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item>Корзина<span class="breadcrumbs-separator">/</span></a-breadcrumb-item>
    </a-breadcrumb>
    <div class="cart-page__head">
          <h2>оформление заказа</h2>
          <h2>корзина ({{ cartContent.length }})</h2>
      </div>
    <section class="cart-page__wrapper">
      <section class="delivery">
        <div class="delivery__contacts">
          <h3>контактная информация</h3>
          <input type="text" class="delivery__input" placeholder="ФИО">
          <input type="text" class="delivery__input" placeholder="ТЕЛЕФОН">
          <input type="text" class="delivery__input" placeholder="E-MAIL">
        </div>
        <div class="delivery__type">
          <h3>варианты доставки</h3>
          <div class="delivery__radios">
            <label class="radio-button">
              <input type="radio" name="delivery-radio" id="1" checked>
              <div class="checkmark"></div>
              <span>курьером по МИНСКУ</span>
            </label>
            <label class="radio-button">
              <input type="radio" name="delivery-radio" id="2">
              <div class="checkmark"></div>
              <span>ПОЧТА</span>
            </label>
            <label class="radio-button">
              <input type="radio" name="delivery-radio" id="3">
              <div class="checkmark"></div>
              <span>ЕВРОПОЧТА</span>
            </label>
          </div>
        </div>
      </section>
      <section class="cart">
        <div class="cart__content">
          <div class="cart__item" v-for="item of cartContent" :key="item.name">
            <div class="cart__image">
              <img :src="item.img" :alt="item.name">
            </div>
            <div class="cart__item-description">
              <h3>{{ item.name }}</h3>
              <div class="cart__item-price">
                <div class="cart__price-current">
                  {{ item.price }} BYN
                </div>
                <div :class="item.priceOld ? 'cart__price-old' : 'cart__hidden'">
                  {{ item.priceOld }} BYN
                </div>
              </div>
              <h4>объем: {{ item.vol }}</h4>
              <h4>кол-во, шт: {{ item.amount }}</h4>
              <div class="cart__remove-item">
                <u>Удалить</u>
              </div>
            </div>
          </div>
        </div>
        <div class="cart__sum">
          <div class="cart__sum-upper">
            <div class="cart__sum-item">
              <p>Cумма:</p>
              <p>{{ finalPrice }} BYN</p>
            </div>
            <div class="cart__sum-item">
              <p>Скидка:</p>
              <p>{{ discount }} BYN</p>
            </div>
          </div>
          <div class="cart__sum-lower">
            <div class="cart__sum-item">
              <p>Итого</p>
              <p>{{ (finalPrice - discount).toFixed(2) }} BYN</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
  import { cartContent } from '~/assets/shared/shared'

  export default {
    data: () => ({
      cartContent,
      finalPrice: 0,
      discount: 5,
    }),
    methods: {
      setFinalPrice: function() {
        cartContent.forEach(item => {
          this.finalPrice += item.price * item.amount;
        });
        this.finalPrice = this.finalPrice.toFixed(2);
      }
    },
    beforeMount() {
      this.setFinalPrice();
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  .cart-page {
    &__head {
      @extend .cart-page__wrapper;
      margin-top: 2.5rem;
    }

    &__wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2.25rem;

      & h3 {
        font-size: 26px;
      }
    }
  }

  .delivery {
    margin-top: 3.75rem;

    &__contacts {
      & h3 {
        margin-bottom: 2.5rem;
      }
    }

    &__input {
      @extend .input-field;
      margin-bottom: 0.5rem;
    }

    &__type {
      margin-top: 3.75rem;
    }

    &__radios {
      display: flex;
      flex-direction: column;
      margin-top: 2.5rem;
    }
  }

  .checkmark {
    position: absolute;
    margin-left: 0.5rem;
    width: 20px;
    height: 20px;
    border: $main-border;
    border-radius: 50%;
    background-color: $WHITE;

    &:after {
      content: '';
      position: absolute;
      display: none;
      border-radius: 50%;
    }
  }

  .radio-button {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: 18px;
    border-bottom: $main-border;
    user-select: none;
    transition: 0.3s;
    padding: 1rem 0;

    &:nth-child(3) {
      border: none;
    }

    &:hover {
      background-color: $LGRAY;
    }

    & span {
      margin-left: 2.5rem;
    }

    & input {
      display: none;

      &:checked ~ .checkmark:after  {
        display: block;
      }
    }

    & .checkmark {
      display: flex;
      align-items: center;
      justify-content: center;
      &:after {
        width: 10px;
        height: 10px;
        background: $BLACK;
      }
    }
  }

  .cart {
    margin-top: 8.7rem;

    &__item {
      display: flex;
      //gap: 3.5rem;
      border-top: $main-border;
      padding: 2rem 0;

      & h4 {
        font-size: 18px;
      }

      &-price {
        display: flex;
        gap: 2rem;
        margin-bottom: 1.5rem;
        font-size: 1.25rem;
      }
    }

    &__price {

      &-old {
        text-decoration: line-through;
        color: $DGRAY;
      }
    }

    &__image {
      display: flex;
      justify-content: center;
      width: 12.5rem;
      height: 13rem;
      padding: 0 2rem;

      & img {
        height: 80%;
      }
    }

    &__remove-item {
      margin-top: 2rem;
      font-size: 18px;
      color: $DGRAY;
      cursor: pointer;
    }

    &__sum {

      &-upper {
        padding-top: 2rem;
        border-top: $main-border;
      }

      &-lower {
        padding-top: 1rem;
        border-top: $main-border;
        font-weight: 600;
      }

      &-item {
        display: flex;
        justify-content: space-between;
        font-size: 20px;

        & p {
          margin-bottom: 1rem;
        }
      }
    }

    &__hidden {
      display: none;
    }
  }
</style>
