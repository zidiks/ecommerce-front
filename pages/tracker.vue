<template>
  <main class="content-width">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item>Трекер заказа</a-breadcrumb-item>
    </a-breadcrumb>
    <section class="tracker">
      <div class="tracker__head">
        <h1>ТРЕКЕР ЗАКАЗА</h1>
        <p>
          для того, что бы отследить статус заказа,
          укажите штрих-код и кликните по кнопке
          "Отследить посылку"
        </p>
        <div class="plug"></div>
      </div>
      <div class="tracker__content">
        <div class="tracker__input">
          <input placeholder="КОД ОТСЛЕЖИВАНИЯ">
        </div>
        <div class="tracker__button">
          <div class="button">ОТСЛЕДИТЬ ПОСЫЛКУ</div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @import '~/assets/styles/global';

  .tracker {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.5rem;

    @include breakpoint(l) {
      margin-top: 4rem;
    }

    &__head {
      display: grid;
      grid-template-columns: 0.8fr 1fr 0.8fr;
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
