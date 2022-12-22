<template>
  <main class="content-width all-text-toUpperCase">
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item>О НАС</a-breadcrumb-item>
    </a-breadcrumb>
    <section class="about">
      <div class="about__head">
        <h2>О НАС</h2>
        <div class="about__head-descr">
          PRO.PERFUMER – ЭТО ИНТЕРНЕТ-МАГАЗИН<br>
          С БОЛЬШИМ ВЫБОРОМ ПАРФЮМА<br>
          ОТ ИЗВЕСТНЫХ БРЕНДОВ.<br>
        </div>
      </div>
      <div class="mobile-separator"></div>
      <div class="about__upper">
        <img src="~/assets/img/about-1.png" alt="perfume">
        <div class="about__text">
          <div>
            В НАШЕМ ИНТЕРНЕТ-МАГАЗИНЕ<br>
            ПРЕДСТАВЛЕНО БОЛЕЕ 1000 ЕДИНИЦ<br>
            ПАРФЮМЕРНОЙ ПРОДУКЦИИ.
          </div>
          <div>
            В PRO.PERFUMER ВЫ СМОЖЕТЕ ПОДОБРАТЬ<br>
            АРОМАТЫ И ДЛЯ МУЖЧИН, И ДЛЯ ЖЕНЩИН.
          </div>
          <div>
            МЫ ОСУЩЕСТВЛЯЕМ БЕСПЛАТНУЮ<br>
            ДОСТАВКУ И ДАРИМ СКИДКИ<br>
            ПОСТОЯННЫМ КЛИЕНТАМ.
          </div>
        </div>
        <img src="~/assets/img/about-2.png" alt="perfume">
      </div>
      <div class="about__lower">
        <div class="about__inst">
          <a class="link" href="https://www.instagram.com/pro.perfumer/" target="_blank" rel="noreferrer noopener">@PRO.PERFUMER</a>
          <div>
            ПРИСОЕДИНЯЙТЕСЬ К НАМ<br>
            В <b>INSTAGRAM!</b> ВДОХНОВЛЯЙТЕСЬ<br>
            НОВЫМИ КОЛЛЕКЦИЯМИ,<br>
            УЗНАВАЙТЕ ПЕРВЫМИ О НОВОСТЯХ,<br>
            ПРИНИМАЙТЕ УЧАСТИЕ В АКЦИЯХ.
          </div>
        </div>
      </div>
    </section>
    <section class="delivery">
      <div class="delivery__text">
        <h2>ОПЛАТА И ДОСТАВКА</h2>
        <div class="mobile-separator"></div>
        <h3>ОПЛАТА</h3>
        <p>
          НАЛИЧНЫМИ КУРЬЕРУ, НАЛОЖЕННЫМ ПЛАТЕЖОМ<br>
          БАНКОВСКОЙ КАРТОЙ ОНЛАЙН
        </p>
        <h3>ДОСТАВКА</h3>
        <p>КУРЬЕРОМ ПО МИНСКУ (БЕСПЛАТНО), ПОЧТА, ЕВРОПОЧТА</p>
      </div>
      <div class="delivery__image">
        <img src="~/assets/img/about-3.png" alt="perfume">
      </div>
    </section>
    <section class="contacts">
      <h2>КОНТАКТЫ</h2>
      <div>
        ПО ВСЕМ ИНТЕРЕСУЮЩИМ ВОПРОСАМ<br>
        ЗВОНИТЕ <a class="link" href="tel: +375336490154"><u>+375 (33) 649 01 54</u></a><br>
        ИЛИ ПИШИТЕ НА ЭЛЕКТРОННУЮ ПОЧТУ<br>
        <a class="link" id="email" href="mailto:pro.perfumer@gmail.com"><u>PRO.PERFUMER@GMAIL.COM</u></a>
      </div>
    </section>
  </main>
</template>

<script scoped>

</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  h2 {
    font-size: 2rem;

    @include breakpoint(l) {
      font-size: 1.5rem;
    }
  }

  .about {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 2.5rem;
    padding-bottom: 2.5rem;
    font-size: 18px;
    border-bottom: $main-border;

    @include breakpoint(l) {
      align-items: center;
      border: none;
      font-size: 1rem;
    }

    &__head {
      display: flex;
      gap: 18rem;
      padding-bottom: 2rem;
      border-bottom: $main-border;

      @include breakpoint(l) {
        width: 100%;
        flex-direction: column;
        gap: 0;
        border: none;
      }
    }

    &__upper {
      display: flex;
      align-items: flex-end;
      margin-top: 2.5rem;

      @include breakpoint(l) {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
      }

      & img {
        height: 100%;

        &:first-child {

          @include breakpoint(xl) {
            width: 40%;
          }

          @include breakpoint(l) {
            width: auto;
          }
        }

        &:last-child {

          @include breakpoint(l) {
            align-self: flex-end;
            margin-top: 1.25rem;
          }
        }
        @include breakpoint(l) {
          height: 13rem;
        }
      }
    }

    &__text {
      width: 100%;
      padding: 0 2rem;

      @include breakpoint(xl) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 14px;
      }

      @include breakpoint(l) {
        padding: 0;
        font-size: 14px;
        align-items: center;
      }

      & div {
        padding-top: 1.25rem;

        @include breakpoint(l) {

          &:nth-child(2) {
            max-width: 16rem;
          }
        }
      }
    }

    &__lower {
      display: flex;
      justify-content: flex-end;
      margin-top: 2.5rem;

      @include breakpoint(l) {
        width: 100%;
        justify-content: start;
      }
    }

    &__inst {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-right: 6.25rem;
      font-size: 18px;

      @include breakpoint(l) {
        padding: 0;
        font-size: 14px;
        width: 24rem;
      }

      & a {
        font-size: 30px;
        margin-bottom: 2rem;
        border-bottom: $main-border;
        width: fit-content;

        @include breakpoint(l) {
          font-size: 18px;
        }
      }
    }
  }

  .delivery {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2.5rem;
    padding-bottom: 2.5rem;
    border-bottom: $main-border;

    @include breakpoint(l) {
      display: flex;
      flex-direction: column;
      border: none;
    }

    &__text {
      display: flex;
      flex-direction: column;
      padding-right: 1rem;

      @include breakpoint(l) {
        display: flex;
        flex-direction: column;
        padding: 0;
        width: 100%;
      }

      & h2 {
        margin-bottom: 1.25rem;

        @include breakpoint(l) {

        }
      }

      & h3 {
        margin-top: 1.25rem;
        font-size: 25px;


      }

      & p {
        width: 100%;
        padding-bottom: 1.25rem;
        font-size: 18px;
        border-bottom: $main-border;

        @include breakpoint(l) {
          font-size: 14px;
          padding: 0;
          border: none;
        }
      }
    }

    &__image {
      display: flex;
      width: 100%;
      justify-content: flex-end;

      @include breakpoint(l) {
        justify-content: center;
      }

      & img {
        width: 100%;
        padding-left: 5rem;

        @include breakpoint(l) {
          max-height: 20rem;
          object-fit: contain;
          padding: 0;
        }
      }
    }
  }

  .contacts {
    display: flex;
    margin-top: 2.5rem;
    gap: 16.5rem;
    font-size: 18px;
    line-height: 2rem;

    @include breakpoint(l) {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    & h2, div {
      max-width: 24rem;
    }

    & div, div > a {
      font-size: 1rem;

      @include breakpoint(l) {
        font-size: 13px;
      }

      @include breakpoint(xxs) {
        font-size: 11px;
      }
    }
  }
</style>
