<template>
  <div>
    <div class="searchbox">
      <a-auto-complete
        v-model="value"
        :dataSource="showAutocomplete ? options : []"
        class="searchbox__autocomplete"
        @select="onSelect"
        @change="debounce(onSearch, $event)"
      >
        <a-input-search placeholder="ПОИСК">
          <template #enterButton>
            <button @click="onSelect()" class="searchbox__button">
              <img src="~/static/Search.svg">
            </button>
          </template>
        </a-input-search>
      </a-auto-complete>
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
        currentRoute: undefined,
      }
    },
    computed: {
      showAutocomplete() {
        if (process.browser) {
          return this.currentRoute?.name !== 'products' && !window.location.href.includes('/products/?category');
        }
        return true;
      }
    },
    watch: {
      $route(to, from) {
        if (from.name === 'products') {
          this.value = '';
          this.$store.commit('sessionStorage/setSearchText', '');
        }
        this.currentRoute = to;
      },
    },
    methods: {
      onSelect(value) {
        this.$router.push({path: `/products/`, query: { category: this.$store.getters["categories/getRoot"]._id }})
      },
      async onSearch(text) {
        this.$store.commit('sessionStorage/setSearchText', text);
        if (text) {
          const res = await this.$api.products.autocomplete(text);
          this.options = res.map(item => item.name);
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
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/global';

  .searchbox {
    margin-top: 2rem;
    width: 36rem;
    border-bottom: $main-border;
    &__button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    @include breakpoint(l) {
      width: 100%;
    }

    & img {
      min-width: 1.5rem;
      padding: 0.5rem 0.5rem 0.5rem 0;
    }
  }
</style>
