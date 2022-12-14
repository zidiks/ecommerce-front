<template>
  <div class="slider">
    <a-carousel :infinite="true" v-if="mountedState" :dots="false" :slidesToShow="3" :slidesToScroll="3" :responsive="responsive" dots-class="slick-dots" class="fade-in slider__a-carousel" arrows>
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <Control-arrow :arrowDirection="'-180'" />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <Control-arrow :arrowDirection="'0'" />
        </div>
      </template>
      <nuxt-link :to="'/news/' + item._id" class="slick-slide-item" v-for="item of items" :key="item._id">
        <h3>{{ item.title }}</h3>
        <img :src="item?.media ? baseUrl + '/storage/images/' + item.media : '/no-image.png'" :alt="item.title">
      </nuxt-link>
    </a-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: this.$config.baseUrl,
        mountedState: false,
        responsive: [
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false,
              dots: true,
            }
          },
          {
            breakpoint: 768,
            settings: {
              centerMode: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            }
          },
        ]
      }
    },
    props: [
      'items',
    ],
    mounted() {
      this.mountedState = true;
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  .slider {
    width: 100%;
    height: 100%;
    &__a-carousel {
      width: 100%;
      height: 100%;
      .slick-slider {
        height: 30rem;
      }
    }
  }

  .ant-carousel {
    &:deep(.slick-slider) {
      @extend .content-width;
      height: 100%;
    }

    &:deep(.slick-slide) {
      height: 100%;
      overflow: hidden;
      padding: 0 0.3%;
      &> div {
        width: 100%;
        height: 100%;
      }
    }

    &:deep(.slick-slide-item) {
      height: 100%;
      width: 100%;
      position: relative;
      padding: 1.5rem;
      background: var(--data-color-black);
      box-sizing: border-box;
      h3 {
        top: 3rem;
        left: 0;
        position: absolute;
        width: 100%;
        text-align: center;
        color: white;
        font-weight: bold;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    &:deep(.slick-list) {
      height: 100%;
    }

    &:deep(.slick-dots) {
      position: relative;
      height: auto;
    }

    &:deep(.slick-prev) {
      transform: translateX(1.4rem);
    }

    &:deep(.slick-next) {
      transform: translateX(-1.4rem);
    }

    &:deep(.slick-track) {
      height: 100%;
    }

    &:deep(.slick-dots) {
      transform: translateY(1.6rem);
      display: flex !important;
      justify-content: center;
      li {
        height: 1rem !important;
        width: 1rem !important;
        margin: 0 .3rem;
        border-radius: 0.8rem;
        border: solid 1px var(--data-color-black);
        background: var(--data-color-white);
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        button {
          transition: none !important;
          background: transparent;
          width: .8rem;
          height: .8rem;
          border-radius: 100%;
        }

        &.slick-active {
          border: solid 2px var(--data-color-black);
        }
      }
    }

    &:deep(.slick-arrow.custom-slick-arrow) {
      display: flex !important;
      align-items: center;
      justify-content: center;
    }

    &:deep(.slick-slide.slick-active) {
      @include breakpoint(l) {
        pointer-events: none !important;
      }
    }
  }
</style>
