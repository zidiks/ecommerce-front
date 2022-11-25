<template>
  <main>
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item>О НАС<span class="breadcrumbs-separator">/</span></a-breadcrumb-item>
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
      <div class="about__upper">
        <img src="~/assets/img/about-1.png" alt="perfume">
        <div class="about__text">
          <div>
            В НАШЕМ ИНТЕРНЕТ-МАГАЗИНЕ<br>
            ПРЕДСТАВЛЕНО БОЛЕЕ 1000 ЕДИНИЦ<br>
            ОРИГИНАЛЬНОЙ ПРОДУКЦИИ.
          </div>
          <div>
            В PRO.PERFUMER ВЫ СМОЖЕТЕ ПОДОБРАТЬ<br>
            АРОМАТЫ И ДЛЯ МУЖЧИН, И ДЛЯ ЖЕНЩИН.
          </div>
          <div>
            МЫ ОСУЩЕСТВЛЯЕМ БЕСПЛАТНУЮ<br>
            ДОСТАВКУ И ДАРИМ СКИДКИ<br>
            ПОСТОЯННЫМ КЛИЕНТАМЮ
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
        <h3>ОПЛАТА</h3>
        <p>
          НАЛИЧНЫМИ КУРЬЕРУ, НАЛОЖЕННЫМ ПЛАТЕЖОМ<br>
          БАНКОВСКОЙ КАРТОЙ ОНЛАЙН
        </p>
        <h3>ДОСТАВКА</h3>
        <p>КУРЬЕРОМ ПО МИНСКУ (БЕСПЛАТНО), ПОЧТА, ЕВРОПОЧТА</p>
      </div>
      <img src="~/assets/img/about-3.png" alt="perfume">
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
  }

  .about {
    width: 100%;
    margin-top: 2.5rem;
    padding-bottom: 2.5rem;
    font-size: 18px;
    border-bottom: $main-border;

    &__head {
      display: flex;
      gap: 18rem;
      padding-bottom: 2rem;
      border-bottom: $main-border;
    }

    &__upper {
      display: flex;
      margin-top: 2.5rem;
      justify-content: space-between;
      align-items: flex-end;

      & img {
        height: 100%;
      }
    }

    &__text {
      display: flex;
      flex-direction: column;
      align-self: center;
      padding: 4rem 5.5rem 0 0;

      & div {
        padding-top: 1.25rem;
      }
    }

    &__lower {
      display: flex;
      justify-content: flex-end;
      margin-top: 2.5rem;
    }

    &__inst {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-right: 6.25rem;
      font-size: 18px;

      & a {
        font-size: 30px;
        margin-bottom: 2rem;
        border-bottom: $main-border;
        width: fit-content;
      }
    }
  }

  .delivery {
    display: flex;
    justify-content: space-between;
    margin-top: 2.5rem;
    padding-bottom: 2.5rem;
    border-bottom: $main-border;

    &__text {

      & h2 {
        margin-bottom: 1.25rem;
      }

      & h3 {
        margin-top: 1.25rem;
        font-size: 25px;
      }

      & p {
        width: 36rem;
        padding-bottom: 1.25rem;
        font-size: 18px;
        border-bottom: $main-border;
      }
    }
  }

  .contacts {
    display: flex;
    margin-top: 2.5rem;
    gap: 16.5rem;
    font-size: 18px;
    line-height: 2rem;
  }
</style>
