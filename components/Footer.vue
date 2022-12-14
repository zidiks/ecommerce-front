<template>
  <footer class="footer content-width">
    <div class="footer__content">
      <div class="footer__nav">
        <li class="link-li" v-for="item of footerNavLinks" :key="item.text">
          <nuxt-link :to="item.link" class="link">{{ item.text }}</nuxt-link>
        </li>
      </div>
      <div class="footer__logo">
        <img src="~/static/Logo.svg">
      </div>
      <div class="footer__contacts">
        <li class="link-li"><a class="link" href="tel: +375336490154">+375 (33) 649 01 54</a></li>
        <li class="link-li"><a class="link" id="email" href="mailto:pro.perfumer@gmail.com">PRO.PERFUMER@GMAIL.COM</a></li>
        <li class="link-li"><a class="link" href="https://www.instagram.com/pro.perfumer/" target="_blank" rel="noreferrer noopener">
          INST: <u>@PRO.PERFUMER</u></a>
        </li>
      </div>
    </div>
    <div class="footer__rights">
      <p>© {{ currentYear }} | PRO.PERFUMER. Все права защищены.</p>
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
    margin-top: 6.25rem;
    padding-bottom: 2rem;
    @include breakpoint(l) {
      margin-top: 3.75rem;
    }

    &__content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 2.5rem 0;
      border-top: $main-border;
      border-bottom: $main-border;

      @include breakpoint(l) {
        grid-template-columns: 1fr;
        grid-template-areas:
                          'l'
                          'n'
                          'c';
        justify-items: center;
      }
    }

    &__nav {

      @include breakpoint(l) {
        grid-area: n;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.75rem 0;
        margin: 1.5rem 0;
        border-top: $main-border;
        border-bottom: $main-border;
        width: fit-content;

        & li {
          font-size: 1.5rem;
        }
      }
    }

    &__logo {
      display: flex;
      justify-content: center;
      align-items: center;

      @include breakpoint(l) {
        grid-area: l;
      }
    }

    &__contacts {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;

      @include breakpoint(l) {
        grid-area: c;
        align-items: center;
      }

      & a {
        font-style: --main-font;
        font-size: 1rem;
        color: #0B0B0B;
        user-select: text;

        @include breakpoint(l) {
          font-size: 18px;
        }

        @include breakpoint(xxs) {
          font-size: 1rem;
        }
      }
    }

    &__rights {
      font-size: 12px;
      width: 100%;
      text-align: center;
      margin-top: 2rem;
      color: #505155;
      p {
        margin-bottom: 0;
      }
    }
  }

  #email {
    font-size: 14px;

    @include breakpoint(l) {
      font-size: 18px;
    }

    @include breakpoint(xxs) {
      font-size: 14px;
    }
  }
</style>
