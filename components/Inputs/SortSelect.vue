<template>
  <a-select
    v-model:value="sortValue"
    class="select"
    placeholder="Сортировать"
    :options="options"
    :field-names="{ label: 'label', value: 'value' }"
  ></a-select>
</template>

<script>
import { ref } from 'vue';
import { sortOptions } from "assets/shared/constants/sort-options.const";
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
  methods: {
    setSort() {
      const sortOption = sortOptions[this.sortValue] || undefined;
      this.sort.property = sortOption?.value?.property;
      this.sort.direction = sortOption?.value?.direction;
    }
  }
}
</script>

<style lang="scss">
  .select {
    min-width: 10rem;
    max-width: 15rem;
  }
</style>
