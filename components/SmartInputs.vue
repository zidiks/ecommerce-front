<template>
  <div>
    <form class="wrapper desktop-visibility">
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
    <form class="wrapper-mobile mobile-visibility">
      <div @click="openSort" class="wrapper-mobile__part">
        <span class="material-symbols-outlined">filter_list</span>
        <span class="wrapper-mobile__part__text">СОРТИРОВКА</span>
      </div>
      <SortDrawer></SortDrawer>
      <div  @click="openFilter" class="wrapper-mobile__part">
        <span class="material-symbols-outlined">sort</span>
        <span class="wrapper-mobile__part__text">ФИЛЬТРЫ</span>
      </div>
      <FilterDrawer></FilterDrawer>
    </form>
  </div>
</template>

<script>
import {ProductTypePropertyType} from "assets/shared/enums/product-property.enum";
import {generateFormControls} from "assets/shared/functions/generate-form-controls.func";
import SortDrawer from "./SortDrawer";
import FilterDrawer from "./FilterDrawer";

export default {
  components: {FilterDrawer, SortDrawer},
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
      })
    },
    openFilter() {
      this.$store.commit('drawers/openFilter');
    },
    openSort() {
      this.$store.commit('drawers/openSort');
    },
  },
}
</script>

<style lang="scss">
  .wrapper {
    justify-content: center;
    flex-wrap: wrap;
    padding: 2rem 0;
    display: flex;
    row-gap: 1.5rem;
    column-gap: 1.5rem;

    &-mobile {
      margin-top: 2rem;
      margin-bottom: 2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;

      &__part {
        padding-left: .4rem;
        display: flex;
        align-items: center;

        &__text {
          margin-left: .6rem;
          font-size: 1rem;
        }
      }
    }
  }
</style>
