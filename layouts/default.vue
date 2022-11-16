<template>
  <div class="container">
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
    padding: 1rem 0;
    width: 75rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
