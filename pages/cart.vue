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
            <label class="radio-button" v-for="(item, index) of deliveryMethods" :key="index">
              <input type="radio" name="delivery-radio" @click="setCurrentDeliveryID(index)" :id="index" :checked="index === 0 ? true : false">
              <div class="checkmark"></div>
              <span>{{ item.name }}</span>
            </label>
          </div>
          <div :class="currentDeliveryID == index ? 'delivery__dynamic' : 'cart__hidden'" v-for="(item, index) of deliveryMethods" :key="item.name">
            <div class="delivery__text" v-html="item.description"></div>
            <div class="delivery__fields" v-for="field of item.fields" :key="field.name">
              <input type="text" class="delivery__input" :placeholder="field.name">
            </div>
          </div>
        </div>
        <div class="payment">
          <h2>варианты оплаты</h2>
          <div class="payment__option">
            <label class="radio-button">
              <input type="radio" name="payment-radio" :disabled="currentDeliveryID === 0 ? false : true">
              <div class="checkmark"></div>
              <span>наличными КУРЬЕРУ ПРИ ПОЛУЧЕНИИ</span>
            </label>
            <label class="radio-button">
              <input type="radio" name="payment-radio" :disabled="currentDeliveryID !== 0 ? false : true">
              <div class="checkmark"></div>
              <span>наложенным платежем</span>
            </label>
          </div>
          <div class="permission">
            <label class="checkbox">
              <input type="checkbox" name="payment-checkbox">
              <span>даю согласие на обработку персональных данных</span>
            </label>
          </div>
          <div class="payment__button">
            <div class="button">ПОДТВЕРДИТЬ ЗАКАЗ</div>
          </div>
        </div>
        <div class="cart__tracking">
          <h2>статус заказа</h2>
          <p>
            Отследить статус заказа вы сможете у нас
            на сайте, перейдя по ссылке <u><nuxt-link class="link" to="/tracker">трекер заказа</nuxt-link></u>
          </p>
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
  import { cartContent, deliveryMethods } from '~/assets/shared/shared'

  export default {
    data: () => ({
      cartContent,
      deliveryMethods,
      finalPrice: 0,
      discount: 5,
      currentDeliveryID: 0,
    }),
    methods: {
      setFinalPrice: function() {
        cartContent.forEach(item => {
          this.finalPrice += item.price * item.amount;
        });
        this.finalPrice = this.finalPrice.toFixed(2);
      },
      setCurrentDeliveryID: function(index) {
        this.currentDeliveryID = index;
        console.log(this.currentDeliveryID);
      },
      consoleLogger: function(any) {
        console.log(any);
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

    &__dynamic {
      margin-top: 2rem;
    }

    &__text {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }

  .checkmark {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 23px;
    height: 23px;
    border: 2px solid black;
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
    gap: 1rem;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: 18px;
    border-bottom: $main-border;
    user-select: none;
    transition: 0.3s;
    padding: 1rem 0;

    &:last-child {
      border: none;
    }

    &:hover {
      background-color: $LGRAY;
    }

    & input {
      display: none;

      &:checked ~ .checkmark:after  {
        display: block;
      }

      &:disabled ~ .checkmark {
        border: 2px solid $DGRAY;

        &:after {
          background: $WHITE;
        }
      }

      &:disabled ~ span {
        color: $DGRAY;
      }
    }

    & .checkmark {
      display: flex;
      align-items: center;
      justify-content: center;
      &:after {
        width: 11px;
        height: 11px;
        background: $BLACK;
      }
    }
  }

  .payment {
    margin-top: 2rem;

    &__button {
      margin-top: 3rem;

      & div {
        width: 100%;
      }
    }
  }

  .permission {
    margin-top: 3rem;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    width: fit-content;

    & input {
      width: 22px;
      height: 22px;
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

    &__tracking {
      margin-top: 5.5rem;

      & p {
        width: 80%;
        font-size: 18px;
      }
    }

    &__hidden {
      display: none;
    }
  }
</style>
