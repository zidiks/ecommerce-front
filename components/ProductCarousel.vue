<template>
  <a-carousel class="fade-in" v-if="mountedState" :infinite="true" :slidesToShow="1" :dots="false" ref="slider" :after-change="sliderChange">
    <div class="slick-slide__inner" v-for="(item, index) of items" :key="index">
      <img class="slick-slide__image" :src="baseUrl + '/storage/images/' + item" alt="perfume">
    </div>
  </a-carousel>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: this.$config.baseUrl,
      mountedState: false,
    }
  },
  props: [
    'items',
    'current',
  ],
  methods: {
    sliderChange(index) {
      this.$emit('sliderChange', index);
    },
    prevChange(index) {
      this.$refs.slider.goTo(index);
    },
  },
  watch: {
    current(value) {
      this.prevChange(value);
    }
  },
  mounted() {
    this.mountedState = true;
  }
}
</script>
