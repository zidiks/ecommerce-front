<template>
  <main>
    <div class="content-width all-text-toUpperCase">
      <a-breadcrumb class="breadcrumbs">
        <a-breadcrumb-item><nuxt-link to="/">ГЛАВНАЯ</nuxt-link></a-breadcrumb-item>
        <a-breadcrumb-item>новости</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <section class="content-width article" v-if="articleObj && !$fetchState.pending">
      <div class="article__head all-text-toUpperCase">
        <h2>{{ articleObj.title }}</h2>
        <div class="article__head-description">
          {{ articleObj.description }}
        </div>
      </div>
      <div class="article__content">
        <div class="article__image">
          <img :src="`${baseUrl}/storage/images/${articleObj.media}`" :alt="articleObj.title">
        </div>
        <div class="article__text" v-html="articleObj.content"></div>
      </div>
      <div class="article__date">
        {{ `${articleDate.getDate()}-${articleDate.getMonth() + 1}-${articleDate.getFullYear()}, ${articleDate.getHours()}:${articleDate.getMinutes()}` }}
      </div>
    </section>
    <Spinner v-else-if="$fetchState.pending" />
    <Empty v-else />
  </main>
</template>

<script>
  export default {
    data() {
      return {
        articleId: this.$route.params.article,
        articleObj: null,
        baseUrl: this.$config.baseUrl,
        articleDate: null,
      }
    },

    async fetch() {
      this.articleObj = await this.$api.articles.getArticleById(this.articleId);
      this.articleDate = new Date(this.articleObj.updatedAt);
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  h2 {
    font-size: 2rem;

    @include breakpoint(l) {
      font-size: 1.5rem;
    }
  }

  .article {
    margin-top: 2rem;

    &__head {
      border-bottom: $main-border;
      padding-bottom: 1rem;

      &-description {
        font-size: 18px;

        @include breakpoint(l) {
          font-size: 1rem;
        }
      }
    }

    &__content {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      column-gap: 1.5rem;
      margin-top: 2rem;

      @include breakpoint(m) {
        grid-template-columns: 1fr;
        row-gap: 1rem;
      }
    }

    &__image {

      @include breakpoint(m) {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      & img {
        width: 100%;
        object-fit: contain;

        @include breakpoint(m) {
          width: 90%;
        }
      }
    }

    &__text {
      font-size: 18px;

      @include breakpoint(l) {
        font-size: 1rem;
      }
    }

    &__date {
      display: flex;
      justify-content: flex-end;
      padding: 1rem 5% 0 0;
      color: $DGRAY;
    }
  }
</style>
