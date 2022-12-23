<template>
  <a-drawer
    placement="right"
    title="ФИЛЬТРЫ"
    :z-index="9991"
    :closable="true"
    width="90%"
    @close="closeFilter"
    :visible="visible"
  >
    filter
  </a-drawer>
</template>

<script>
  export default {
    computed: {
      visible() {
        return this.$store.state.drawers.filterState;
      }
    },
    methods: {
      closeFilter() {
        this.$store.commit('drawers/closeFilter');
      },
    }
  }
</script>
