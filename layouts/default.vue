<template>
  <div class="container">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<style>
  :root {
    --main-font: url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
  }

  body {
    scroll-behavior: smooth;
  }

  .container {
    padding: 2vh 2vw 0% 2vw;
    min-height: 98vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>
