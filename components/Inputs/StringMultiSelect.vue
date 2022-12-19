<template>
  <a-select
    v-model:checked="form[property.code][ComparisonOperator.in]"
    mode="multiple"
    class="multiselect"
    :filter-option="filterFunc"
    :placeholder="property.name"
    :options="options"
    :max-tag-count="1"
    :field-names="{ label: 'label', value: 'value' }"
  ></a-select>
</template>

<script>
import { ref } from 'vue';
import {ComparisonOperator} from "assets/shared/enums/mongoose-query.enum";
export default {
  props: ['form', 'property'],
  data() {
    return {
      ComparisonOperator,
      options: ref(this.property.options || []),
    }
  },
  methods: {
    filterFunc(inputValue, option) {
      return (option.componentOptions.children[0].text || '').toLowerCase().includes(inputValue.toLowerCase());
    }
  },
}
</script>

<style lang="scss">
  .multiselect {
    min-width: 10rem;
    max-width: 15rem;
  }
</style>
