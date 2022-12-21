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
        <div class="news__article" v-for="item of articles.data" :key="item.title">
          <div class="news__image">
            <img :src="`${baseUrl}/storage/images/${item.media}`" :alt="item.title">
          </div>
          <div class="news__text">
            <h2 class="news__text-header">{{ item.title }}</h2>
            <div class="news__text-content" v-html="item.content"></div>
            <nuxt-link :to="`/news/${item._id}`" class="news__text-link"><i><u>читать далее</u></i></nuxt-link>
          </div>
        </div>
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
      }
    },

    async fetch() {
      this.articles = await this.$api.articles.getArticles();
      console.log(this.articles);
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

      @include breakpoint(l) {
        padding-bottom: 2rem;
        border-bottom: $main-border;
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
      }

      &-content {
        width: 100%;
        max-height: 8.5rem;
        overflow: hidden;
        text-align: justify;
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
