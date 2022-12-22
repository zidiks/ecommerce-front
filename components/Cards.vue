<template>
  <div>
    <nuxt-link class="link card" :to="`/products/${item._id}`">
    <div :class="`card__image ${addClass}__image`">
      <img :src="item?.media?.length ? baseUrl + '/storage/images/' + item.media[0] : '/no-image.png'" :alt="item.name">
    </div>
    <div :class="`card__name ${addClass}__name`">
    {{ item.name }}
    </div>
    <div class="card__price">
      <span class="card__price-old" v-if="item.price !== item.totalPrice"><s>{{ item.price }}</s></span>
      <span>{{ item.totalPrice }} BYN</span>
    </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['item', 'addClass'],
    data() {
      return {
        baseUrl: this.$config.baseUrl,
      }
    }
  }
</script>
