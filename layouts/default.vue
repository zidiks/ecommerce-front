<template>
  <div class="content-width">
    <Header />
    <div class="page-wrap">
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
  }
</style>
