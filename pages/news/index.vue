<template>
  <main>
    <div class="content-width all-text-toUpperCase">
      <a-breadcrumb class="breadcrumbs">
        <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
        <a-breadcrumb-item>новости</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <section class="news content-width" v-if="articles && !$fetchState.pending">
      <div class="news__head all-text-toUpperCase">
        <h1>новости</h1>
      </div>
      <div class="news__content">
        <nuxt-link :to="`/news/${item._id}`" v-for="item of articles.data" :key="item.title">
          <div class="news__article">
            <div class="news__image">
              <img :src="`${baseUrl}/storage/images/${item.media}`" :alt="item.title">
            </div>
            <div class="news__text">
              <h2 class="news__text-header">{{ item.title }}</h2>
              <div class="news__text-content">{{ item.description }}</div>
              <div class="news__text-time">{{ formatDate(item.updatedAt) }}</div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </section>
    <Spinner v-else />
  </main>
</template>

<script>

  export default {
    data() {
      return {
        articles: null,
        baseUrl: this.$config.baseUrl,
        formatter: undefined,
      }
    },

    async fetch() {
      this.articles = await this.$api.articles.getArticles();
    },

    methods: {
      formatDate(date) {
        return process.browser && this.formatter ? this.formatter.format(new Date(date)) : '';
      }
    },

    mounted() {
      this.formatter = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  .news {

    &__head {
      border-bottom: $main-border;
      padding: 1.5rem 0;

      & h1 {
        font-size: 2.25rem;
      }
    }

    &__content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 2rem;
      width: 100%;
      margin-top: 2rem;

      @include breakpoint(l) {
        grid-template-columns: 1fr;
      }
    }

    &__article {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1rem;
      cursor: pointer;

      &:hover {
        .news__text-header {
          color: var(--data-color-hover);
        }
      }

      @include breakpoint(l) {
        padding-bottom: 2rem;
        border-bottom: $main-border;

        &:last-child {
          border: none;
        }
      }

      @include breakpoint(xs) {
        grid-template-columns: 1fr;
      }
    }

    &__image {

      & img {
        width: 100%;
        max-height: 90%;
        object-fit: contain;

        @include breakpoint(l) {
          max-height: 20rem;
          height: 100%;
        }
      }
    }

    &__text {
      display: flex;
      flex-direction: column;

      @include breakpoint(xs) {
        margin-top: 1.5rem;
      }

      &-header {
        font-size: 1.5rem;
        transition: color .3s;
      }

      &-content {
        color: var(--data-color-black);
        width: 100%;
        max-height: 8.5rem;
        overflow: hidden;
        text-align: justify;
      }

      &-time {
        margin-top: 1rem;
        opacity: 0.6;
        font-size: .8rem;
        color: var(--data-color-black);
      }

      &-link {

        color: $DGRAY;

        &:hover {
          color: gray;
        }
      }
    }
  }
</style>
