<template>
  <a-select
    v-model:checked="form[property.code]"
    mode="multiple"
    class="multiselect"
    :placeholder="property.name"
    :options="options"
    :max-tag-count="1"
    @change="handleChange"
  ></a-select>
</template>

<script>
import { ref } from 'vue';
export default {
  props: ['form', 'property'],
  mounted() {
    console.log(this.data);
    console.log(this.form[this.property.code]);
  },
  data() {
    return {
      options: ref([
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'lucy2',
          label: 'Lucy2',
        },
        {
          value: 'lucy3',
          label: 'Lucy3',
        },
        {
          value: 'lucy4',
          label: 'Lucy4',
        },
        {
          value: 'lucy5',
          label: 'Lucy5',
        },
        {
          value: 'lucy6',
          label: 'Lucy6',
        },
        {
          value: 'lucy7',
          label: 'Lucy7',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
        {
          value: 'yiminghedawdawdaoidoawjiodjiawodia',
          label: 'yiminghedawdawdaoidoawjiodjiawodia',
        },
      ]),
    }
  },
  methods: {
    handleChange(value)  {
      console.log(`selected ${value}`);
    },
  },
}
</script>

<style lang="scss">
  .multiselect {
    min-width: 10rem;
    max-width: 15rem;
  }
</style>
