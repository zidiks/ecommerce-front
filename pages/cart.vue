<template>
  <main class="content-width all-text-toUpperCase">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item>Корзина</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="cart-page__head">
      <h2 :class="`${isConfirmed ? '' : 'cart-page__hidden'}`">оформление заказа</h2>
      <h2 :class="`${isConfirmed ? 'cart-page__hidden' : ''}`">корзина ({{ calculation.totalItemsCount }})</h2>
      <div :class="`cart-page__${isConfirmed ? 'backward' : 'hidden'}`" @click="isConfirmed = false">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <section class="cart-page__wrapper fade-in" v-if="loaded">
      <section class="delivery">
        <form @submit.prevent="formSubmit">
          <div :class="`delivery__wrapper ${isConfirmed ? '' : 'cart-page__hidden'}`">
            <div class="delivery__contacts">
              <h3>контактная информация</h3>
              <input v-model="form.name" type="text" class="delivery__input" placeholder="ФИО">
              <input v-model="form.phone" type="text" class="delivery__input" placeholder="ТЕЛЕФОН">
              <input v-model="form.email" type="text" class="delivery__input" placeholder="E-MAIL">
            </div>
            <div class="delivery__type">
              <h3>варианты доставки</h3>
              <div class="delivery__radios">
                <label class="radio-button" v-for="item of deliveryMethods" :key="item._id">
                  <input type="radio" name="delivery-radio" :value="item" :id="item._id" v-model="form.delivery">
                  <div class="checkmark"></div>
                  <span>{{ item.name }}</span>
                </label>
              </div>
              <div v-if="form.delivery" class="delivery__dynamic">
                <div class="delivery__text" style="white-space: pre-line" v-html="form.delivery.description"></div>
                <div class="delivery__fields" v-for="field of form.delivery.fields" :key="field">
                  <input type="text" class="delivery__input" v-model="form.deliveryData[field]" :placeholder="field.toUpperCase()">
                </div>
              </div>
            </div>
            <div class="payment" v-if="form.delivery">
              <h3>варианты оплаты</h3>
              <div class="payment__option">
                <label class="radio-button" v-for="item of paymentMethods(form.delivery?.paymentMethods || [])" :key="item._id">
                  <input type="radio" name="payment-radio" :id="item._id" :value="item" v-model="form.payment">
                  <div class="checkmark"></div>
                  <span>{{ item.name }}</span>
                </label>
              </div>
              <div class="permission">
                <label class="checkbox">
                  <input type="checkbox" name="payment-checkbox" v-model="form.isConfirmed">
                  <span>даю согласие на обработку персональных данных</span>
                </label>
              </div>
            </div>
          </div>
          <div class="payment__button">
            <button v-if="!isConfirmed" :disabled="!cartContent.length" style="width: 100%" class="button" @click="confirmOrder()">ДАЛЕЕ</button>
            <button v-else :disabled="!cartContent.length || $v.$invalid" style="width: 100%" class="button">ПОДТВЕРДИТЬ</button>
          </div>
          <div :class="`${isConfirmed ? 'cart__tracking ' : 'cart-page__hidden'}`">
            <h2>статус заказа</h2>
            <p>
              Отследить статус заказа вы сможете у нас
              на сайте, перейдя по ссылке <u><nuxt-link class="link" to="/tracker">трекер заказа</nuxt-link></u>
            </p>
          </div>
        </form>
      </section>
      <section :class="`cart ${isConfirmed ? 'cart-page__hidden' : ''}`">
        <div class="cart__content">
          <div class="cart__item" v-for="item of cartContent" :key="item.product._id">
            <div class="cart__image">
              <img :src="baseUrl + '/storage/images/' + item.product.media[0]" :alt="item.product.name">
            </div>
            <div class="cart__item-description">
              <nuxt-link :to="'/products/' + item.product._id"><h3 class="link">{{ item.product.name }}</h3></nuxt-link>
              <div class="cart__item-price">
                <div class="cart__price-current">
                  {{ item.product.totalPrice }} BYN
                </div>
                <div v-if="item.product.price !== item.product.totalPrice" class="cart__price-old">
                  {{ item.product.price }} BYN
                </div>
              </div>
              <h4>X {{ item.count }}</h4>
              <div @click="$store.commit('localStorage/remove', item.product._id); fetchCart()" class="cart__remove-item">
                <u>Удалить</u>
              </div>
            </div>
          </div>
        </div>
        <div class="cart__sum">
          <div class="cart__sum-upper">
            <div class="cart__sum-item">
              <p>Cумма:</p>
              <p>{{ calculation.orderPrice }} BYN</p>
            </div>
            <div class="cart__sum-item">
              <p>Скидка:</p>
              <p>{{ calculation.totalDiscount }} BYN</p>
            </div>
          </div>
          <div class="cart__sum-lower">
            <div class="cart__sum-item">
              <p>Итого</p>
              <p>{{ calculation.totalPrice }} BYN</p>
            </div>
          </div>
        </div>
      </section>
    </section>
    <div style="height: 40rem" v-else>
      <Spinner></Spinner>
    </div>
  </main>
</template>

<script>
  import { BaseProductProperty } from "assets/shared/enums/base-product-property.enum";
  import { ComparisonOperator } from "assets/shared/enums/mongoose-query.enum";
  import { required, email } from 'vuelidate/lib/validators';

  const isTrue = (value) => value === true;

  export default {
    data() {
      return {
        loaded: false,
        cartContent: [],
        finalPrice: 0,
        discount: 5,
        isConfirmed: false,
        baseUrl: this.$config.baseUrl,
        calculation: {
          orderPrice: 0,
          totalItemsCount: 0,
          totalDiscount: 0,
          totalPrice: 0,
        },
        form: {
          name: '',
          phone: '',
          email: '',
          delivery: undefined,
          deliveryData: {},
          payment: undefined,
          isConfirmed: false,
        }
      }
    },
    watch: {
      delivery: {
        handler(value) {
          this.form.deliveryData = Object.fromEntries(value.fields.map(item => [[item], '']));
        },
        deep: true,
      }
    },
    validations() {
      return {
        form: {
          name: { required },
          phone: { required },
          email: { required, email },
          delivery: { required },
          payment: { required },
          isConfirmed: { required, isTrue },
        }
      }
    },
    computed: {
      delivery() {
        return this.form.delivery;
      },
      deliveryMethods() {
        return this.$store.state.methods.deliveryMethods;
      },
      vuexCart() {
        return this.$store.state.localStorage.products || [];
      }
    },
    methods: {
      resizeHandler() {
        if (window.innerWidth > 950) {
          this.isConfirmed = true
        }
      },
      async fetchCart() {
        const cartRes = await this.$api.products.getProducts({
          preview: true,
          baseProperties: {
            [BaseProductProperty.Id]: {
              [ComparisonOperator.in]: this.vuexCart || [],
            }
          },
          pagination: {
            page: 1,
            limit: this.vuexCart.length,
          }
        });
        this.cartContent = this.vuexCart.map(item => ({
          product: cartRes.data.find(resItem => resItem._id === item.id),
          count: item.count,
        }));
        this.calculation = await this.$api.orders.getCalculation(this.cartContent.map(item => ({ productId: item.product._id, count: item.count })));
        setTimeout(() => {
          this.loaded = true;
        }, 300);
      },
      paymentMethods(ids) {
        return this.$store.getters["methods/getPaymentsByIds"](ids);
      },
      confirmOrder: function() {
        this.isConfirmed = true;
      },
      async formSubmit() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          const payload = {
            customer: {
              phone: this.form.phone,
              name: this.form.name,
            },
            state: {
              label: 'Ожидание',
              color: 'neutral',
              description: 'Ожидайте звонка оператора',
            },
            delivery: {
              deliveryMethod: {
                name: this.form.delivery.name,
                description: this.form.delivery.description,
                fields: this.form.delivery.fields,
                paymentMethods: this.form.delivery.paymentMethods,
              },
              deliveryAddress: 'test',
              deliveryData: Object.entries(this.form.deliveryData).map(([name, value]) => ({name, value})),
              comment: 'test',
            },
            paymentMethod: {
              name: this.form.payment.name,
              description: this.form.payment.description,
            },
            cartItems: this.vuexCart.map(({ count, id }) => ({ count, productId: id })),
            historyList: [],
          }
          const newOrder = await this.$api.orders.addOrder(payload);
          console.log(newOrder);
        }
        return false;
      }
    },
    mounted() {
      this.fetchCart();
      window.addEventListener("resize", this.resizeHandler);
      if (window.innerWidth > 950) {
        this.isConfirmed = true
      }
    }
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
      outline: none!important;

      &-invalid {
        border-color: red;
      }

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
    padding: 1rem 0 1rem .5rem;

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
      & > * {
        width: 100%;
      }
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
      margin-bottom: 3rem;

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
