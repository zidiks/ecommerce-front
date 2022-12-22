<template>
  <main class="content-width all-text-toUpperCase">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/tracker">Трекер заказа</nuxt-link></a-breadcrumb-item>
    </a-breadcrumb>
    <section class="tracker">
      <div class="tracker__head">
        <h2>Информация о заказе {{ trackingCode }}</h2>
      </div>
    </section>
    <Spinner v-if="$fetchState.pending"></Spinner>
    <Empty class="fade-in" v-if="$fetchState.error || (!$fetchState.pending && !orderData)"></Empty>
    <section class="order" v-if="orderData && !$fetchState.pending">
      <div class="order__header">
        <div class="order__header-status">
          <h3>Статус</h3>
          <span>{{ orderData.state.label }}</span>
        </div>
        <div class="order__header-date">
          <h3>Дата</h3>
          <span>{{ formatData(orderData.createdAt) }}</span>
        </div>
        <div class="order__header-customer">
          <h3>Имя</h3>
          <span>{{ orderData.customer.name }}</span>
        </div>
        <div class="order__header-phone">
          <h3>Телефон</h3>
          <span>{{ orderData.customer.phone }}</span>
        </div>
      </div>
      <div class="order__info">
        <div class="products">
          <h3>Товары</h3>
          <div
            class="card"
            v-for="item of orderData.cartItems"
            >
            <div class="card__image">
              <img :src="item.product?.media.length ? baseUrl + '/storage/images/' + item.product.media[0] : '/no-image.png'" :alt="item.product.name">
            </div>
            <div class="card__desc">
              {{ item.product.name }}
            </div>
            <div class="card__price">
              <div class="card__count">x {{ item.count }}</div>
              <div class="card__price">{{ item.product.totalPrice }} BYN</div>
            </div>
          </div>
          <h3>Итого</h3>
          <div class="total">
            <h4>Сумма: <span class="price">{{ orderData.subTotalPrice }} BYN</span></h4>
            <h4>Скидка: <span class="price">{{ orderData.totalDiscount }} BYN</span></h4>
            <h4>Итого: <span class="price">{{ orderData.totalPrice }} BYN</span></h4>
          </div>
          <h3>Доставка</h3>
          <div class="delivery">
            <h4>Способ доставки: {{ orderData.delivery.deliveryMethod.name }}</h4>
            <h4>Адрес доставки: {{ orderData.delivery.deliveryAddress }}</h4>
          </div>
          <h3>Оплата</h3>
          <div class="payment">
            <h4>Способ оплаты: {{ orderData.paymentMethod.name }}</h4>
          </div>
        </div>
        <div class="history">
          <h3 class="history__title">История заказа</h3>
          <div
            class="history__list"
            v-for="history of orderData.historyList"
            :key="history.time">
            <div class="history__list-time">{{ formatData(history.time) }}</div>
            <div class="history__list-type">{{ history.type }}</div>
            <div class="history__list-details">{{ history.details }}</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      trackingCode: this.$route.params.tracker,
      orderData: null,
      baseUrl: this.$config.baseUrl,
      formatter: undefined
    }
  },
  async fetch() {
    this.orderData = await this.$api.orders.getOrderByCode(this.trackingCode)
  },
  methods: {
    formatData(date) {
      return process.browser && this.formatter ? this.formatter.format(new Date(date)) : ''
    }
  },
  mounted() {
    this.formatter = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/global';

h3 {
  font-size: 1.3rem;
}
h4 {
  margin-bottom: 12px;
}

.order {
  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: $main-border;
    @include breakpoint(xs) {
      grid-template-columns: 1fr 1fr;
      div {
        margin-bottom: 1rem;
      }
    }
    div {
      margin-right: 1rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__info {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    margin-top: 1rem;
    padding-bottom: 1rem;
    @include breakpoint(l) {
      grid-template-columns: 1fr;
    }
    .products {
      h3 {
        padding: 0.6rem 0;
      }
      .card {
        display: grid;
        grid-template-columns: 0.6fr 1fr 0.8fr;
        grid-template-areas: "img desc price";
        padding: 1rem 1rem 1rem 0;
        border-bottom: $main-border;
        &__image {
          max-height: 100px;
          grid-area: img;
          border:0;
          img {
            height: 100%;
            background-size: cover;
          }
        }
        &__desc {
          grid-area: desc;
        }
        &__price {
          grid-area: price;
        }
      }
      .delivery {
        border-bottom: $main-border;
      }
      .total {
        border-bottom: $main-border;
        .price {
          font-size: 20px;
        }
        h4 {
          text-align: right;
        }
      }
      .payment {
        @include breakpoint(l) {
          border-bottom: $main-border;
        }
      }
    }
    .history {
      h3 {
        padding: 0.6rem 0 0 1.5rem;
        @include breakpoint(l) {
          padding: 0.6rem 0 0 0;
        }
      }
      &__list {
        padding: 1rem 1.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          "time type"
          "details details";
        @include breakpoint(l) {
          padding: 0.6rem 0 0 0;
        }
        &-time{
          grid-area: time;
        }
        &-type{
          grid-area: type;
        }
        &-details{
          margin-top: 0.3rem;
          padding-bottom: 0.4rem;
          grid-area: details;
          border-bottom: $main-border;
        }
      }
    }
  }
}

.tracker {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2.5rem;
  width: 100%;

  @include breakpoint(l) {
    margin-top: 4rem;
  }

  &__head {
    display: grid;
    grid-template-columns: 1fr;
    border-bottom: $main-border;

    @include breakpoint(l) {
      display: flex;
      flex-direction: column;
      max-width: 23rem;
      border: none;
    }

    & h1 {
      font-size: 2.25rem;
      line-height: 2rem;
    }

    & p {
      font-size: 1rem;
      line-height: 21px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    width: 29.5rem;

    @include breakpoint(l) {
      max-width: 23rem;
      width: 100%;
    }
  }

  &__button {
    margin-top: 2.5rem;
    width: 100%;
    button {
      width: 100%;
    }

    & div {
      width: 100%;
    }
  }

  &__input {
    width: 100%;

    & input {
      @extend .input-field;

    }
  }
}
</style>
