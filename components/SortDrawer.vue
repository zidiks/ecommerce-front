<template>
  <a-drawer
    placement="right"
    title="СОРТИРОВКА"
    :z-index="9991"
    :closable="true"
    width="90%"
    @close="closeSort"
    :visible="visible"
  >
    sort
  </a-drawer>
</template>

<script>
  export default {
    computed: {
      visible() {
        return this.$store.state.drawers.sortState;
      }
    },
    methods: {
      closeSort() {
        this.$store.commit('drawers/closeSort');
      }
    }
  }
</script>
