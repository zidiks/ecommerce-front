<template>
  <form class="wrapper">
    <div>
      <InputsSortSelect :sort="sortForm"></InputsSortSelect>
    </div>
    <div v-for="field of baseFilters || []"  :key="field.id">
      <InputsCheckBox v-if="field.type === ProductTypePropertyType.CheckBox" :form="basePropertiesForm" :property="field"></InputsCheckBox>
      <InputsNumberInput v-if="[ProductTypePropertyType.NumberInput, ProductTypePropertyType.NumberSelect].includes(field.type)" :form="basePropertiesForm"  :property="field"></InputsNumberInput>
      <InputsStringMultiSelect v-if="[ProductTypePropertyType.StringSelect, ProductTypePropertyType.StringMultiSelect].includes(field.type)" :form="basePropertiesForm"  :property="field"></InputsStringMultiSelect>
    </div>
    <div v-for="field of customFilters || []"  :key="field.id">
      <InputsCheckBox v-if="field.type === ProductTypePropertyType.CheckBox" :form="customPropertiesForm" :property="field"></InputsCheckBox>
      <InputsNumberInput v-if="[ProductTypePropertyType.NumberInput, ProductTypePropertyType.NumberSelect].includes(field.type)" :form="customPropertiesForm"  :property="field"></InputsNumberInput>
      <InputsStringMultiSelect v-if="[ProductTypePropertyType.StringSelect, ProductTypePropertyType.StringMultiSelect].includes(field.type)" :form="customPropertiesForm"  :property="field"></InputsStringMultiSelect>
    </div>
  </form>
</template>

<script>
import {ProductTypePropertyType} from "assets/shared/enums/product-property.enum";
import {generateFormControls} from "assets/shared/functions/generate-form-controls.func";

export default {
  props: ['baseFilters', 'customFilters'],
  data() {
    return {
      ProductTypePropertyType,
      baseUrl: this.$config.baseUrl,
      basePropertiesForm: generateFormControls(this.baseFilters || []),
      customPropertiesForm: generateFormControls(this.customFilters || []),
      sortForm: {
        property: null,
        direction: 1,
      },
    }
  },
  watch: {
    basePropertiesForm: {
      handler() {
        this.changedForm();
      },
      deep: true,
    },
    customPropertiesForm: {
      handler() {
        this.changedForm();
      },
      deep: true,
    },
    sortForm: {
      handler() {
        this.changedForm();
      },
      deep: true,
    },
  },
  methods: {
    changedForm() {
      this.$emit('valueChanges', {
        basePropertiesForm: this.basePropertiesForm,
        customPropertiesForm: this.customPropertiesForm,
        sortForm: this.sortForm,
      });
    }
  },
}
</script>

<style lang="scss">
  .wrapper {
    justify-content: center;
    padding: 2rem 0;
    display: flex;
    column-gap: 1.5rem;
  }
</style>
