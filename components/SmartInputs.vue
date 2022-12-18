<template>
  <form class="wrapper">
    <div v-for="field of filters"  :item="field.id">
      <InputsCheckBox v-if="field.type === ProductTypePropertyType.CheckBox" :form="form" :property="field"></InputsCheckBox>
      <InputsNumberInput v-if="field.type === ProductTypePropertyType.NumberInput" :form="form"  :property="field"></InputsNumberInput>
      <InputsStringMultiSelect v-if="[ProductTypePropertyType.NumberSelect, ProductTypePropertyType.StringSelect, ProductTypePropertyType.StringMultiSelect].includes(field.type)" :form="form"  :property="field"></InputsStringMultiSelect>
    </div>
  </form>
</template>

<script>
import {ProductTypePropertyType} from "assets/shared/enums/product-property.enum";

export default {
  props: ['filters'],
  data() {
    return {
      ProductTypePropertyType,
      baseUrl: this.$config.baseUrl,
      form: Object.fromEntries(this.filters.map(filter => [filter.code, filter.default || null])),
    }
  },
  watch: {
    form: {
      handler() {
        this.changedForm();
      },
      deep: true,
    },
  },
  methods: {
    changedForm() {
      this.$emit('valueChanges', this.form);
    }
  },
  mounted() {
    console.log(this.form);
  },
}
</script>

<style lang="scss">
  .wrapper {
    justify-content: center;
    padding: 2rem 0;
    display: flex;
    column-gap: 1rem;
  }
</style>
