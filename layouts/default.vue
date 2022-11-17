<template>
  <div class="container content-width">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<style lang="scss">
  #__nuxt, #__layout {
    height: 100%;
  }

  .container {
    height: 100%;
    padding: 2rem 0 1rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
