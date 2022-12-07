<template>
  <div class="content-width">
    <Search class="search-mobile"/>
    <Header />
    <div class="page-wrap">
      <Search class="search" />
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  #__nuxt, #__layout {
    height: 100%;
  }

  .page-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search {
    display: block;

    @include breakpoint(l) {
      display: none;
    }

    &-mobile {
      display: none;

      @include breakpoint(l) {
        display: block;
      }
    }
  }
</style>
