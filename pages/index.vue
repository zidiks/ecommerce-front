<template>
  <main>
    <section class="slider">
      <h2>Slider division plug</h2>
    </section>
    <div class="divider">
      <span>АКТУАЛЬНЫЕ ПРЕДЛОЖЕНИЯ ЖДУТ ВАС</span>
    </div>
    <section class="bestsellers">
      <div class="bestsellers__head">
        <h2>ЛИДЕРЫ ПРОДАЖ</h2>
        <div class="bestsellers__controls">
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
      <div class="bestsellers__content">
        <Cards class="bestsellers__card" v-for="item of bestsellersContent" :addClass="addBestClass" :item="item" :key="item.text" />
      </div>
      <div class="bestsellers__button">
        <nuxt-link to="/catalogue">
          <div class="button">
            <span>ПЕРЕЙТИ В КАТАЛОГ</span>
          </div>
        </nuxt-link>
      </div>
    </section>
    <section class="strengths">
      <div class="strengths__item">
        <h3 class="strengths__header">КАЧЕСТВЕННЫЙ СЕРВИС</h3>
        <span>БЫСТРАЯ ОБРАБОТКА ЗАКАЗА</span>
      </div>
      <div class="strengths__item">
        <h3 class="strengths__header">ОРИГИНАЛЬНАЯ ПРОДУКЦИЯ</h3>
        <span>БОЛЕЕ 1000 ЕДИНИЦ</span>
      </div>
      <div class="strengths__item">
        <h3 class="strengths__header">ГИБКАЯ СИСТЕМА СКИДОК</h3>
        <span>ДЛЯ ПОСТОЯННЫХ ПОКУПАТЕЛЕЙ</span>
      </div>
      <div class="strengths__item">
        <h3 class="strengths__header">БЫСТРАЯ ДОСТАВКА</h3>
        <span>КРАТЧАЙШИЕ СРОКИ ДОСТАВКИ</span>
      </div>
    </section>
    <section class="latest">
      <div class="latest__head">
        <h2>НАШИ НОВИНКИ</h2>
        <div class="latest__descr">
          ПОДБОРКА СМЕЛЫХ АРОМАТОВ ДЛЯ ВАС.
          ПОЗНАКОМТЕСЬ С НОВЫМИ АРОМАТАМИ ПЕРВЫМИ.
        </div>
        <nuxt-link to="/catalogue">
          <div class="button">
            <span>СМОТРЕТЬ ВСЕ</span>
          </div>
        </nuxt-link>
      </div>
      <div class="latest__content">
        <Cards class="latest__card" v-for="item of latestContent" :item="item" :addClass="addLatestClass" :key="item.text" />
      </div>
    </section>
    <section class="discounts">
      <div class="discounts__head">
        <h2>АКЦИИ И СКИДКИ</h2>
        <div class="discounts__descr">
          В ОДНОМ ЗАКАЗЕ ВЫ МОЖЕТЕ ПОЛУЧИТЬ СКИДКУ УЖЕ ПРИ<br>
          ПЕРВОЙ ПОКУПКЕ.
        </div>
        <div class="discounts__plug">

        </div>
      </div>
      <div class="discounts__upper">
        <img src="~/assets/img/discounts-1.png" alt="perfume">
        <div class="discounts__info">
          <div>
            СКИДКА ЗА КОЛИЧЕСТВО<br>
            ПАРФЮМЕРИИ. БОЛЬШЕ ФЛАКОНОВ — <br>
            БОЛЬШЕ СКИДКА! НА ВТОРУЮ<br>
            И КАЖДУЮ ПОСЛЕДУЮЩУЮ ПОЗИЦИЮ<br>
            В ЗАКАЗЕ ВЫ ПОЛУЧАЕТЕ СКИДКУ<br>
            5 РУБЛЕЙ.
          </div>
          <div>
            - СКИДКИ НЕ СУММИРУЮТСЯ. ПОКУПАТЕЛЬ САМ ВЫБИРАЕТ НАИБОЛЕЕ
            ВЫГОДНЫЙ ДЛЯ СЕБЯ ВАРИАНТ СКИДКИ.
          </div>
        </div>
        <img src="~/assets/img/discounts-2.png" alt="perfume">
      </div>
      <div class="discounts__lower">
        <div class="discounts__inst">
          <a class="link" href="https://www.instagram.com/pro.perfumer/" target="_blank" rel="noreferrer noopener">@PRO.PERFUMER</a>
          <div>
            ПРИСОЕДИНЯЙТЕСЬ К НАМ<br>
            В <b>INSTAGRAM!</b> ВДОХНОВЛЯЙТЕСЬ<br>
            НОВЫМИ КОЛЛЕКЦИЯМИ,<br>
            УЗНАВАЙТЕ ПЕРВЫМИ О НОВОСТЯХ,<br>
            ПРИНИМАЙТЕ УЧАСТИЕ В АКЦИЯХ.
          </div>
        </div>
        <img src="~/assets/img/discounts-3.png" alt="perfume">
      </div>
    </section>
  </main>
</template>

<script scoped>
  import { bestsellersContent, latestContent } from '~/assets/shared/shared'

  export default {
    data: () => {
      return {
        addBestClass: 'bestsellers',
        bestsellersContent,
        addLatestClass: 'latest',
        latestContent,
      }
    }
  }
</script>

<style lang="scss">
  @import '~/assets/styles/global';

  h2 {
    font-size: 2rem;
  }

  .slider {
    margin-top: 1.5rem;
    text-align: center;
    width: 100%;
    height: 10rem;
    background-color: $DGRAY;
  }

  .divider {
    margin-top: 3rem;
    padding-bottom: 1rem;
    border-bottom: $main-border;
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .bestsellers {
    margin-top: 4rem;

    &__head {
      display: flex;
      justify-content: space-between;
    }

    &__controls {
      display: flex;
      column-gap: 1rem;
    }

    &__content {
      margin-top: 1rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 2rem;
    }

    &__card {
      font-size: 1rem;
    }

    &__image {
      width: 17rem;
      height: 19rem;
    }

    &__name {
      font-size: 14px;
    }

    &__button {
      margin-top: 2.25rem;
      display: flex;
      justify-content: center;
    }
  }

  .strengths {
    margin-top: 5.5rem;
    width: 100%;
    height: 9.5rem;
    background-color: $LGRAY;
    display: flex;
    align-items: center;

    &__item {
      height: 6rem;
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-right: $main-border;
      font-size: 14px;

      &:last-child {
        border: none;
      }

      & h3 {
        font-weight: 600;
        font-size: 17px;
      }
    }
  }

  .latest {
    margin-top: 6rem;

    &__head {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 3rem;
    }

    &__descr {
      font-size: 1rem;
    }

    &__content {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      font-size: 1rem;
    }

    &__image {
      width: 23rem;
      height: 29rem;
    }
  }

  .discounts {
    margin-top: 6rem;

    &__head {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 3rem;
      padding-bottom: 2rem;
      border-bottom: $main-border;
    }

    &__descr {
      font-size: 18px;
    }

    &__upper {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      & img {
        height: 100%;
      }
    }

    &__info {
      font-size: 18px;

      & div {
        padding: 5rem 10rem 0 2rem;
      }

      & div:last-child {
        font-size: 1rem;
      }
    }

    &__lower {
      margin-top: 2.5rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-items: stretch;

      & img {
        height: 100%;
      }
    }

    &__inst {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      font-size: 18px;

      & a {
        font-size: 30px;
        margin-bottom: 2rem;
        border-bottom: $main-border;
        width: fit-content;
      }
    }
  }
</style>
