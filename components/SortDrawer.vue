<template>
  <a-drawer
    placement="right"
    title="СОРТИРОВКА"
    class="mobile-sort"
    :z-index="991"
    :closable="true"
    width="90%"
    @close="closeSort"
    :visible="visible"
  >
    <div v-for="item of options" class="mobile-sort__item all-text-toUpperCase" :key="item.value">
      <input :id="item.label" class="mobile-sort__item__input" type="radio" :value="item.value" v-model="sortValue">
      <label :for="item.label" class="mobile-sort__item__label">{{ item.label }}</label>
    </div>
  </a-drawer>
</template>

<script>
  import {ref} from "vue";
  import {sortOptions} from "assets/shared/constants/sort-options.const";

  export default {
    props: ['sort'],
    data() {
      return {
        options: ref(Object.entries(sortOptions).map(([key, data]) => ({ label: data.label, value: key === 'default' ? undefined : key })) || []),
        sortValue: undefined,
      }
    },
    watch: {
      sortValue: {
        handler() {
          this.setSort();
        },
      },
    },
    computed: {
      visible() {
        return this.$store.state.drawers.sortState;
      }
    },
    methods: {
      closeSort() {
        this.$store.commit('drawers/closeSort');
      },
      setSort() {
        const sortOption = sortOptions[this.sortValue] || undefined;
        this.sort.property = sortOption?.value?.property;
        this.sort.direction = sortOption?.value?.direction;
        this.closeSort();
      }
    }
  }
</script>
