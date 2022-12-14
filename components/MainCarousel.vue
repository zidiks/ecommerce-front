<template>
  <div class="slider">
    <a-carousel v-if="mountedState" class="fade-in slider__a-carousel" arrows>
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
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mountedState: false,
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

    &:deep(.slick-list) {
      height: 100%;
    }

    .slick-arrow {
      @include breakpoint(l) {
        display: none;
      }
    }
  }
</style>
