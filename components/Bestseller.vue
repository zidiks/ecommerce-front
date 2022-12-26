<template>
  <section v-if="bestsellersContent.length && !$fetchState.pending" class="content-width fade-in">
  <div class="bestsellers">
    <div class="bestsellers__head">
      <h2>РЕКОМЕНДУЕМ</h2>
      <div class="bestsellers__controls desktop-visibility">
        <div class="prev" @click="prevBlock()">
          <svg class="arrow-inactive" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="49.75" y="49.75" width="49.5" height="49.5" rx="24.75" transform="rotate(-180 49.75 49.75)" stroke="#0B0B0B" stroke-width="0.5"/>
            <rect class="arrow__back" x="45.9287" y="45.9285" width="41.8571" height="41.8571" rx="20.9286" transform="rotate(-180 45.9287 45.9285)" fill="#FEFEFE" stroke="#0B0B0B"/>
            <path d="M6.78934 24.6464C6.59407 24.8417 6.59407 25.1583 6.78934 25.3535L9.97132 28.5355C10.1666 28.7308 10.4832 28.7308 10.6784 28.5355C10.8737 28.3403 10.8737 28.0237 10.6784 27.8284L7.85 25L10.6784 22.1716C10.8737 21.9763 10.8737 21.6597 10.6784 21.4645C10.4832 21.2692 10.1666 21.2692 9.97132 21.4645L6.78934 24.6464ZM42.8572 24.5L7.14289 24.5L7.14289 25.5L42.8572 25.5L42.8572 24.5Z" fill="#0B0B0B"/>
          </svg>
        </div>
        <div class="next" @click="nextBlock()">
          <svg class="arrow" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="49.75" y="49.75" width="49.5" height="49.5" rx="24.75" transform="rotate(-180 49.75 49.75)" stroke="#0B0B0B" stroke-width="0.5"/>
            <rect class="arrow__back" x="45.9285" y="45.9286" width="41.8571" height="41.8571" rx="20.9286" transform="rotate(-180 45.9285 45.9286)" fill="#FEFEFE" stroke="#0B0B0B"/>
            <path d="M43.354 25.3536C43.5493 25.1583 43.5493 24.8417 43.354 24.6465L40.1721 21.4645C39.9768 21.2692 39.6602 21.2692 39.465 21.4645C39.2697 21.6597 39.2697 21.9763 39.465 22.1716L42.2934 25L39.465 27.8284C39.2697 28.0237 39.2697 28.3403 39.465 28.5355C39.6602 28.7308 39.9768 28.7308 40.1721 28.5355L43.354 25.3536ZM7.00049 25.5L43.0005 25.5L43.0005 24.5L7.00049 24.5L7.00049 25.5Z" fill="#0B0B0B"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="bestsellers__content">
      <div class="bestsellers__controls mobile-visibility">
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
      <Cards class="bestsellers__card" :addClass="ReusableClasses.CardBestsellers" v-for="item of bestsellersContent[page]" :item="item" :key="item._id" />
    </div>
    <div class="bestsellers__button desktop-visibility">
      <nuxt-link to="/catalogue" class="button">
        <button class="button">ПЕРЕЙТИ В КАТАЛОГ</button>
      </nuxt-link>
    </div>
  </div>
  </section>
</template>

<script>
import {ReusableClasses} from "../assets/shared/enums/reusable-classes.enum";
import {BaseProductProperty} from "../assets/shared/enums/base-product-property.enum";
import {ComparisonOperator} from "../assets/shared/enums/mongoose-query.enum";

export default {
  data() {
    return {
      ReusableClasses,
      bestsellersContent: [],
      itemsPerPage: 2,
      page: 0,
      total: 4,
    }
  },
  async fetch() {
    const resBestsellers = await this.$api.products.getProducts({
      preview: true,
      pagination: {
        page: 1,
        limit: this.total
      },
      baseProperties: {
        [BaseProductProperty.IsRec]: {
          [ComparisonOperator.eq]: true
        }
      }
    });
    this.bestsellersContent = resBestsellers.data;
  },
  methods: {
    nextBlock() {
      if (this.page >= this.bestsellersContent.length-1) return
      this.page += 1;
    },

    sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
      this.bestsellersContent = res
  },
    prevBlock() {
      if (this.page === 0) return
      this.page -= 1;
    }
  },
  mounted() {
    this.sliceIntoChunks(this.bestsellersContent, this.itemsPerPage)
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/global';

.bestsellers {
  margin-top: 4rem;

  &__head {
    display: flex;
    justify-content: space-between;

    @include breakpoint(l) {
      flex-direction: column;
    }
  }

  &__controls {
    display: flex;
    column-gap: 1rem;

    @include breakpoint(l) {
      position: absolute;
      z-index: 10;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;

      & svg {
        margin-bottom: calc(2rem + 1rem + 14px);
        min-width: 2.25rem;
        width: 2.25rem;

        @include breakpoint(m) {
          margin-bottom: calc(2rem + .7rem + 12px);
        }
      }
    }
  }

  &__content {
    position: relative;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 2rem;
    width: 100%;

    @include breakpoint(l) {
      grid-template-columns: repeat(3, 1fr);
      padding: 0 3rem;
    }

    @include breakpoint(m) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include breakpoint(xxs) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    font-size: 1rem;
    z-index: 11;

    @include breakpoint(l) {
      &:nth-child(4) {
        display: none;
      }
    }

    @include breakpoint(m) {
      font-size: .7rem;
      &:nth-child(3) {
        display: none;
      }
    }

    @include breakpoint(xxs) {
      &:nth-child(2) {
        display: none;
      }
    }
  }

  &__image {
    width: 100%;
    aspect-ratio : 1 / 1.25;
    padding: 20%;
    & img {
      object-fit: contain;
      width:  100%;
      height: 100%;
    }
  }

  &__name {
    font-size: 14px;
    @include breakpoint(m) {
      font-size: 12px;
    }
  }

  &__button {
    margin-top: 2.25rem;
    display: flex;
    justify-content: center;
  }
}
</style>
