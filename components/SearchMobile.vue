<template>
  <div class="search-mobile">
    <input enterkeyhint="search" v-model="value" ref="searchInput" class="search-mobile__input" placeholder="ВВЕДИТЕ ЗАПРОС" type="text">
    <div class="search-mobile__autocomplete">
      <div @click="onLinkClose" class="search-mobile__autocomplete-item" v-for="option of options">
        <nuxt-link :to="`/products/${option._id}`" class="search-mobile__autocomplete-item__text">
          <span>{{ option.name }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      value: "",
      options: [],
      timeout: undefined,
    }
  },
  watch: {
    value(value) {
      this.debounce(this.onSearch, value);
    }
  },
  methods: {
    onLinkClose() {
      this.$store.commit('drawers/closeSearch');
    },
    async onSearch(text) {
      if (text) {
        const res = await this.$api.products.autocomplete(text);
        this.options = res;
      } else {
        this.options = [];
      }
    },
    async debounce(func, arg) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(async () => { await func(arg) }, this.$config.env.debounceTime || 300);
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.searchInput.focus();
    }, 100);
  },
}
</script>
