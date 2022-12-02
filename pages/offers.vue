<template>
  <main>
    Special offers page plug
    <div class="test">
      <label class="radio-button">
        <input type="radio" name="delivery-radio" id="1" checked>
        <span>курьером по МИНСКУ</span>
      </label>
      <label class="radio-button">
        <input type="radio" name="delivery-radio" id="2">
        <span>ПОЧТА</span>
      </label>
      <label class="radio-button">
        <input type="radio" name="delivery-radio" id="3">

        <span>ЕВРОПОЧТА</span>
      </label>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  @import '~/assets/styles/global';

  .test {
    display: flex;
    flex-direction: column;
    margin-top: 2.5rem;
  }

  .radio-button {
    display: flex;
    cursor: pointer;
    margin: 1rem 0;
    font-size: 2rem;

    & input {
      display: none;
    }
  }
</style>
