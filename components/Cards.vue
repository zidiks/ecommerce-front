<template>
  <div>
    <nuxt-link class="link card" :to="`/products/${item.name}`">
    <div :class="`card__image ${addClass}__image`">
      <img :src="item.img" :alt="item.name">
    </div>
    <div :class="`card__name ${addClass}__name`">
    {{ item.name }}
    </div>
    <div class="card__volume">
      {{ item.vol }}
    </div>
    <div class="card__price">
      {{ item.price }} BYN
    </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['item', 'addClass']
  }
</script>
