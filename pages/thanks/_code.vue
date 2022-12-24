<template>
  <main class="content-width">
    <section class="new-order">
      <span style="user-select: none" class="material-symbols-outlined new-order__icon">check_circle</span>
      <h2 style="user-select: none" class="all-text-toUpperCase">ЗАКАЗ ОФОРМЛЕН</h2>
      <p style="user-select: none" class="all-text-toUpperCase">Ваш код заказа</p>
      <p class="new-order__code">{{ trackingCode }}</p>
      <p style="user-select: none" class="all-text-toUpperCase">Отслеживать статус заказа можно в разделе <nuxt-link to="/tracker"><u>ТРЕКЕР ЗАКАЗА</u></nuxt-link></p>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      trackingCode: this.$route.params.code,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/styles/variables";
  .new-order {
    padding-top: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    @include breakpoint(l) {
      padding-top: 3rem;
    }
    h2 {
      text-align: center;
    }
    p {
      text-align: center;
    }
    &__code {
      font-size: 2.5rem;
      font-weight: 600;
    }
    &__icon {
      text-align: center;
      margin-bottom: 1rem;
      color:  #4ac99b;
      font-size: 5rem;
    }
    u {
      font-weight: bold;
      color: var(--data-color-black);
    }
  }
</style>
