<template>
  <form>
    <div v-for="field of filters"  :item="field.id">
      <InputsCheckBox v-if="field.type === ProductTypePropertyType.CheckBox" :form="form" :data="field"></InputsCheckBox>
      <InputsNumberInput v-if="field.type === ProductTypePropertyType.NumberInput" :form="form" :data="field"></InputsNumberInput>
      <InputsSingleSelect v-if="[ProductTypePropertyType.NumberSelect, ProductTypePropertyType.StringSelect].includes(field.type)" :form="form" :data="field"></InputsSingleSelect>
      <InputsStringMultiSelect v-if="field.type === ProductTypePropertyType.StringMultiSelect" :form="form" :data="field"></InputsStringMultiSelect>
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
