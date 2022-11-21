<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__nav">
        <li class="link-li" v-for="item of footerNavLinks" :key="item">
          <nuxt-link :to="item.link" class="nav-link">{{ item.text }}</nuxt-link>
        </li>
      </div>
      <div class="footer__logo">
        <img src="~/static/Logo.svg">
      </div>
      <div class="footer__contacts">
        <li class="link-li"><a class="nav-link" href="tel: +375336490154">+375 (33) 649 01 54</a></li>
        <li class="link-li"><a class="nav-link" id="email" href="mailto:pro.perfumer@gmail.com">PRO.PERFUMER@GMAIL.COM</a></li>
        <li class="link-li"><a class="nav-link" href="https://www.instagram.com/pro.perfumer/" target="_blank" rel="noreferrer noopener">
          INST: <u>@PRO.PERFUMER</u></a>
        </li>
      </div>
    </div>
    <div class="footer__rights">
      <p>© {{currentYear}} | PRO.PERFUMER. Все права защищены.</p>
    </div>
  </footer>
</template>

<script scoped>
  export default {
    data: () => {
      return {
        footerNavLinks: [
        { text: 'ГЛАВНАЯ', link: '/' },
        { text: 'КАТАЛОГ', link: '/catalogue'},
        { text: 'О НАС', link: '/about'},
        { text: 'КОРЗИНА', link: '/cart'},
        { text: 'ТРЕКЕР ЗАКАЗА', link: '/tracker'},
        ],
      }
    },
    computed: {
      currentYear: function() {
        return new Date().getFullYear();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  .footer {
    &__content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 2.5rem 0;
      border-top: solid 0.5px $BLACK;
      border-bottom: solid 0.5px $BLACK;
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
