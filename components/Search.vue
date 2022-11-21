<template>
  <div class="searchbox">
    <img src="~/static/Search.svg">
    <input class="searchbox__input" placeholder="поиск">
  </div>
</template>

<script lang="ts" scoped>
  import { defineComponent, ref} from 'vue'

  export default defineComponent({
    setup() {
      const value = ref<string>('');
      return {
        value,
      };
    },
  })
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  .searchbox {
    margin: 2rem 0;
    display: flex;
    width: 36rem;
    border-bottom: solid 0.5px $BLACK;

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
    }
  }
</style>
