<template>
  <main class="content-width">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item>Корзина</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="cart-page__head">
      <h2 :class="`${isConfirmed ? '' : 'cart-page__hidden'}`">оформление заказа</h2>
      <h2 :class="`${isConfirmed ? 'cart-page__hidden' : ''}`">корзина ({{ cartContent.length }})</h2>
      <div :class="`cart-page__${isConfirmed ? 'backward' : 'hidden'}`" @click="isConfirmed = false">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <section class="cart-page__wrapper">
      <section class="delivery">
        <div :class="`delivery__wrapper ${isConfirmed ? '' : 'cart-page__hidden'}`">
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
        </div>
        </div>
        <div class="payment__button">
            <div class="button" @click="confirmOrder()">{{ isConfirmed ? 'оформить' : 'подтвердить' }} заказ</div>
        </div>
        <div :class="`${isConfirmed ? 'cart__tracking ' : 'cart-page__hidden'}`">
          <h2>статус заказа</h2>
          <p>
            Отследить статус заказа вы сможете у нас
            на сайте, перейдя по ссылке <u><nuxt-link class="link" to="/tracker">трекер заказа</nuxt-link></u>
          </p>
        </div>
      </section>
      <section :class="`cart ${isConfirmed ? 'cart-page__hidden' : ''}`">
        <div class="cart__content">
          <div class="cart__item" v-for="item of cartContent" :key="item.product._id">
            <div class="cart__image">
              <img :src="baseUrl + '/storage/images/' + item.product.media[0]" :alt="item.product.name">
            </div>
            <div class="cart__item-description">
              <h3>{{ item.product.name }}</h3>
              <div class="cart__item-price">
                <div class="cart__price-current">
                  {{ item.product.totalPrice }} BYN
                </div>
                <div v-if="item.product.price !== item.product.totalPrice" class="cart__price-old">
                  {{ item.product.price }} BYN
                </div>
              </div>
              <h4>объем: {{ 50 }}</h4>
              <h4>кол-во, шт: {{ item.count }}</h4>
              <div @click="$store.commit('cart/remove',item.product._id); $fetch()" class="cart__remove-item">
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
  import { deliveryMethods } from 'assets/shared/constants/shared'
  import { BaseProductProperty } from "assets/shared/enums/base-product-property.enum";
  import { ComparisonOperator } from "assets/shared/enums/mongoose-query.enum";

  export default {
    data() {
      return {
        cartContent: [],
        deliveryMethods,
        finalPrice: 0,
        discount: 5,
        currentDeliveryID: 0,
        isConfirmed: false,
        baseUrl: this.$config.baseUrl,
      }
    },
    async fetch() {
      const vuexCart = this.$store.state.cart.products;
      const cartRes = await this.$api.products.getProducts({
          preview: true,
          baseProperties: {
            [BaseProductProperty.Id]: {
              [ComparisonOperator.in]: vuexCart.map(product => product.id),
            }
          },
          pagination: {
            page: 1,
            limit: vuexCart.length,
          }
        });
      this.cartContent = vuexCart.map(item => ({
        product: cartRes.data.find(resItem => resItem._id === item.id),
        count: item.count,
      }));
    },
    methods: {
      setCurrentDeliveryID: function(index) {
        this.currentDeliveryID = index;
      },
      confirmOrder: function() {
        this.isConfirmed = true;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  .cart-page {

    &__backward {

      @include breakpoint(l) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 50%;
        padding: 0.5rem;
        aspect-ratio: 1/1;
        width: fit-content;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
          background-color: $LGRAY;
        }

        & div {
          height: 3px;
          background-color: $BLACK;

          &:nth-child(1) {
            width: 1rem;
            transform: rotate(-45deg)
          }

          &:nth-child(2) {
            width: 1.5rem;
            margin: 3.5px 0 3.5px 1px;
          }

          &:nth-child(3) {
            width: 1rem;
            transform: rotate(45deg)
          }
        }
      }
    }

    &__head {
      @extend .cart-page__wrapper;
      margin-top: 2.5rem;

      & h2 {
        font-size: 2rem;

        &:nth-child(1) {

          @include breakpoint(l) {
            margin-top: 1.75rem;
          }
        }

        @include breakpoint(xxs) {
          font-size: 1.75rem;
        }
      }
    }

    &__wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2.25rem;

      @include breakpoint(l) {
        display: flex;
        flex-direction: column-reverse;
        column-gap: 0;
      }

      & h3 {
        font-size: 26px;

        @include breakpoint(l) {
          font-size: 22px;
        }
      }
    }

    &__hidden {

      @include breakpoint(l) {
        display: none;
      }
    }
  }

  .delivery {
    margin-top: 3.75rem;

    @include breakpoint(l) {
      margin: 0;
    }

    @include breakpoint(xxs) {
      margin-top: 1rem;
    }

    &__contacts {
      & h3 {
        margin-bottom: 2.5rem;
        align-self: flex-start;
      }

      @include breakpoint(l) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    &__input {
      @extend .input-field;
      margin-bottom: 0.5rem;

      @include breakpoint(l) {
        justify-content: center;
        max-width: 24rem;
      }
    }

    &__type {
      margin-top: 3.75rem;

      & h3 {
        align-self: flex-start;
      }

      @include breakpoint(l) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    &__radios {
      display: flex;
      flex-direction: column;
      margin-top: 2.5rem;

      @include breakpoint(l) {
        max-width: 24rem;
        width: 100%;
        margin-top: 0.5rem;

      }
    }

    &__dynamic {
      margin-top: 2rem;

      @include breakpoint(l) {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 24rem;
      }
    }

    &__text {
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    &__fields {
      width: 100%;
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
    margin-left: 0.25rem;

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

    @include breakpoint(l) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    & h2 {
        align-self: flex-start;
      }

    &__option {

      @include breakpoint(l) {
        max-width: 24rem;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      margin-top: 3rem;

      @include breakpoint(l) {
        margin-top: 2rem;
      }

      & div {
        width: 100%;

        @include breakpoint(l) {
          width: 23rem;
        }
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

    @include breakpoint(l) {
      margin-top: 2rem;
    }

    &__content {

      @include breakpoint(l) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    &__item {
      display: flex;
      border-top: $main-border;
      width: 100%;
      padding: 2rem 0;

      @include breakpoint(l) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        max-width: 24rem;
        padding-inline: 50%;
      }

      @include breakpoint(xs) {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding-inline: 0;
      }

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

      @include breakpoint(xxs) {

      }

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

      @include breakpoint(l) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

    & h2 {
        align-self: flex-start;
      }

      & p {
        width: 80%;
        font-size: 18px;

        @include breakpoint(l) {
          margin-top: 1rem;
          max-width: 24rem;
        }

        & a {
            font-size: 18px;
        }
      }
    }

    &__hidden {
      display: none;
    }
  }
</style>
