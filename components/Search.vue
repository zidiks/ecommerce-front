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
      return {
        burgerShownLocal: this.burgerShown,
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
        this.currentRoute = to;
      },
    },
    methods: {
      burgerButton() {
        this.$root.$emit('burgerButton');
      },
      rotateIcon(n) {
        return `transition: 0.3s; transform: rotate(${n}deg)`
      },
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
    props: [
      'burgerShown'
    ],
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

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
