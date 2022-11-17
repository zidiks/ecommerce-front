<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__nav">
        <li class="nav-link">ГЛАВНАЯ</li>
        <li class="nav-link">КАТАЛОГ</li>
        <li class="nav-link">О НАС</li>
        <li class="nav-link">КОРЗИНА</li>
        <li class="nav-link">ТРЕКЕР ЗАКАЗА</li>
      </div>
      <div class="footer__logo">
        <img src="~/static/Logo.svg">
      </div>
      <div class="footer__contacts">
        <li class="nav-link"><a href="tel: +375336490154">+375 (33) 649 01 54</a></li>
        <li class="nav-link"><a id="email" href="mailto:pro.perfumer@gmail.com">PRO.PERFUMER@GMAIL.COM</a></li>
        <li class="nav-link"><a href="https://www.instagram.com/pro.perfumer/" target="_blank" rel="noreferrer noopener">
          INST: <u>@PRO.PERFUMER</u></a>
        </li>
      </div>
    </div>
    <div class="footer__rights">
      <p v-html="rightsText"></p>
    </div>
  </footer>
</template>

<script scoped>
  export default {
    computed: {
      rightsText: function() {
        return `© ${new Date().getFullYear()} | PRO.PERFUMER. Все права защищены.`
      }
    }
  }
</script>

<style lang="scss">
  .footer {

    &__content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 2.5rem 0;
      border-top: solid 0.5px #0B0B0B;
      border-bottom: solid 0.5px #0B0B0B;
    }

    &__logo {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__contacts {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;

      & a {
        font-style: --main-font;
        font-size: 16px;
        color: #0B0B0B;
        user-select: text;
      }
    }

    &__rights {
      font-size: 12px;
      width: 100%;
      text-align: center;
      margin-top: 2rem;
      color: #505155;
    }
  }

  #email {
    font-size: 14px;
  }
</style>
