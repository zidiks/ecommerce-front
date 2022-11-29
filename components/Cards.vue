<template>
  <div>
    <div :class="`card__image ${addClass}__image`">
      <img :src="item.img" :alt="item.name">
    </div>
    <div :class="`card__name ${addClass}__name`">
    {{ item.name.toUpperCase() }}
    </div>
    <div class="card__volume">
      {{ item.vol }}
    </div>
    <div class="card__price">
      {{ item.price }}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'addClass']
  }
</script>
