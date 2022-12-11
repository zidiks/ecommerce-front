<template>
  <div>
    <div class="searchbox">
      <img src="~/static/Search.svg">
      <input class="searchbox__input" placeholder="поиск">
      <div class="burger">
        <div @click="burgerButton(); burgerShownLocal = !burgerShownLocal" :style="burgerShown ? rotateIcon(-90) : rotateIcon(0)">
          <div class="burger__line"></div>
          <div class="burger__line"></div>
          <div class="burger__line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
  export default {
    data() {
      return {burgerShownLocal: this.burgerShown}
    },

    methods: {
      burgerButton: function() {
        this.$root.$emit('burgerButton');
      },
      rotateIcon: function(n) {
        return `transition: 0.3s; transform: rotate(${n}deg)`
      }
    },

    props: [
      'burgerShown'
    ],
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  .searchbox {
    margin-top: 2rem;
    display: flex;
    width: 36rem;
    border-bottom: $main-border;

    @include breakpoint(l) {
      width: 100%;
    }

    & img {
      min-width: 1.5rem;
      padding: 0.5rem 0.5rem 0.5rem 0;
    }

    &__input, &__input:focus {
      padding: 0 0.5rem;
      border: none;
      font-size: 1rem;
      width: 100%;
      outline: none;
      &::placeholder {
        color: $DGRAY;
      }
    }
  }

  .burger {
    display: none;

    @include breakpoint(l) {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    & div {
      cursor: pointer;
    }

    &__line {
      margin: 5px 0;
      width: 22px;
      height: 1px;
      background-color: $BLACK;
    }
  }
</style>
