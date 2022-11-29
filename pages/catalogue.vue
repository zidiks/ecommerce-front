<template>
  <main>
    <a-breadcrumb class="breadcrumbs">
      <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item><nuxt-link to="/catalogue">КАТАЛОГ</nuxt-link></a-breadcrumb-item>
      <a-breadcrumb-item>ВСЕ<span class="breadcrumbs-separator">/</span></a-breadcrumb-item>
    </a-breadcrumb>
    <section class="filters">
      <div class="filters__left">
        Filters division plug
      </div>
      <div class="filters__right">
        Sort division plug
      </div>
    </section>
    <section class="products">
      <div class="products__content">
        <Cards class="card products__card" v-for="item of productsContent" :item="item" :addClass="addClass" :key="item.text" />
      </div>
      <div class="products__button">
        <div class="button-inversed">
          <span>ПОКАЗАТЬ БОЛЬШЕ</span>
        </div>
      </div>
      <div class="products__controls">
        <svg class="arrow-inactive" width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="49.75" y="49.75" width="49.5" height="49.5" rx="24.75" transform="rotate(-180 49.75 49.75)" stroke="#0B0B0B" stroke-width="0.5"/>
          <rect class="arrow__back" x="45.9287" y="45.9285" width="41.8571" height="41.8571" rx="20.9286" transform="rotate(-180 45.9287 45.9285)" fill="#FEFEFE" stroke="#0B0B0B"/>
          <path d="M6.78934 24.6464C6.59407 24.8417 6.59407 25.1583 6.78934 25.3535L9.97132 28.5355C10.1666 28.7308 10.4832 28.7308 10.6784 28.5355C10.8737 28.3403 10.8737 28.0237 10.6784 27.8284L7.85 25L10.6784 22.1716C10.8737 21.9763 10.8737 21.6597 10.6784 21.4645C10.4832 21.2692 10.1666 21.2692 9.97132 21.4645L6.78934 24.6464ZM42.8572 24.5L7.14289 24.5L7.14289 25.5L42.8572 25.5L42.8572 24.5Z" fill="#0B0B0B"/>
        </svg>
        <div class="products__pages">
          <li class="link-li" v-for="item of pageNumbers" :key="item.id">
            <span :class="item == 1 ? 'link' : 'link-inactive'">{{ item }}</span>
          </li>
        </div>
        <svg class="arrow" width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="49.75" y="49.75" width="49.5" height="49.5" rx="24.75" transform="rotate(-180 49.75 49.75)" stroke="#0B0B0B" stroke-width="0.5"/>
          <rect class="arrow__back" x="45.9285" y="45.9286" width="41.8571" height="41.8571" rx="20.9286" transform="rotate(-180 45.9285 45.9286)" fill="#FEFEFE" stroke="#0B0B0B"/>
          <path d="M43.354 25.3536C43.5493 25.1583 43.5493 24.8417 43.354 24.6465L40.1721 21.4645C39.9768 21.2692 39.6602 21.2692 39.465 21.4645C39.2697 21.6597 39.2697 21.9763 39.465 22.1716L42.2934 25L39.465 27.8284C39.2697 28.0237 39.2697 28.3403 39.465 28.5355C39.6602 28.7308 39.9768 28.7308 40.1721 28.5355L43.354 25.3536ZM7.00049 25.5L43.0005 25.5L43.0005 24.5L7.00049 24.5L7.00049 25.5Z" fill="#0B0B0B"/>
        </svg>
      </div>
    </section>
  </main>
</template>

<script scoped>
  export default {
    data: () => ({
        pageNumbers: [
          1, 2, 3, 4, 5, 6, 7, 8,
        ],
        addClass: 'products',
        productsContent: [
          {
            name: 'Montale Oud Tobacco',
            img: require('~/assets/img/montale-tobacco.png'),
            vol: '50 МЛ.',
            price: '166.90 BYN',
          },
          {
            name: 'Versace Versense',
            img: require('~/assets/img/versace-versense.png'),
            vol: '50 МЛ.',
            price: '179.60 BYN',
          },
          {
            name: 'Bvlgari Rose Goldea',
            img: require('~/assets/img/bulgari-rose.png'),
            vol: '20 МЛ.',
            price: '212.60 BYN',
          },
          {
            name: 'Oscar de la Renta Bella Blanca',
            img: require('~/assets/img/oscar-delarenta.png'),
            vol: '100 МЛ.',
            price: '239.10 BYN',
          },
          {
            name: 'Benetton United Dreams Men Aim...',
            img: require('~/assets/img/benetton-united.png'),
            vol: '60 МЛ.',
            price: '58.00 BYN',
          },
          {
            name: 'Antonio Banderas Her Secret Te...',
            img: require('~/assets/img/antonio-banderas.png'),
            vol: '50 МЛ.',
            price: '61.60 BYN',
          },
          {
            name: 'Christian Dior Homme Intense',
            img: require('~/assets/img/dior-homme.png'),
            vol: '50 МЛ.',
            price: '412.10 BYN',
          },
          {
            name: 'Montale Roses Elixir',
            img: require('~/assets/img/montale-roses.png'),
            vol: '50 МЛ.',
            price: '120.50 BYN',
          },
          {
            name: 'Zarkoperfume PINK MOLeCULE 09...',
            img: require('~/assets/img/zarkoperfume-pink.png'),
            vol: '30 МЛ.',
            price: '144.60 BYN',
          },
          {
            name: 'Hugo Boss Alive',
            img: require('~/assets/img/hugo-alive.png'),
            vol: '80 МЛ.',
            price: '308.40 BYN',
          },
          {
            name: 'Gucci Flora Emerald Gardenia',
            img: require('~/assets/img/gucci-flora.png'),
            vol: '20 МЛ.',
            price: '212.60 BYN',
          },
          {
            name: 'Nishane Hacivat',
            img: require('~/assets/img/nishane-hacivat.png'),
            vol: '50 МЛ.',
            price: '350.80 BYN',
          },
          {
            name: 'Lalique Encre Noire Sport',
            img: require('~/assets/img/lalique-encre.png'),
            vol: '100 МЛ.',
            price: '120.50 BYN',
          },
          {
            name: 'Byredo Bal d\'Afrique',
            img: require('~/assets/img/byredo-bal.png'),
            vol: '50 МЛ.',
            price: '451.60 BYN',
          },
          {
            name: 'Yves Saint Laurent Jumpsuit',
            img: require('~/assets/img/yves-jumpsuit.png'),
            vol: '125 МЛ.',
            price: '1057.60 BYN',
          },
          {
            name: 'Jo Malone London Scarlet Popp...',
            img: require('~/assets/img/malone-london.png'),
            vol: '100 МЛ.',
            price: '677.40 BYN',
          },
        ]
      }
    ),
  }
</script>

<style lang="scss">
  @import '~/assets/styles/global';

  .filters {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    border-bottom: $main-border;

    &__left, &__right {
      font-size: 2rem;
      background-color: $DGRAY;
    }
  }

  .products {
    width: 100%;
    margin-top: 2.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__content {
    display: grid;
    grid-template: repeat(4, 1fr) / repeat(4, 1fr);
    gap: 4rem 2rem;
    }

    &__card {
      font-size: 1rem;
    }

    &__image {
      width: 100%;
      height: 19rem;

      & img {
        max-height: 70%;
      }
    }

    &__name {
      font-size: 14px;
    }

    &__button {
      margin-top: 3.75rem;
    }

    &__controls {
      display: flex;
      align-items: center;
      margin-top: 1.25rem;
      gap: 3.5rem;
    }

    &__pages {
      display: flex;
      gap: 1rem;
    }
  }
</style>
